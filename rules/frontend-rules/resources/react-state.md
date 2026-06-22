# React 状态管理规范

本规范涵盖 React 中状态的选择策略、更新方式、结构设计及共享状态管理。

---

## 一、状态选择策略

| 场景                       | 推荐方式               | 说明                     |
| -------------------------- | ---------------------- | ------------------------ |
| 单一组件局部状态           | `useState`             | 简单状态管理             |
| 复杂状态逻辑（多子值关联） | `useReducer`           | 状态转换逻辑复杂时       |
| 跨组件共享状态（浅层）     | Context + `useState`   | 组件树层级较浅时         |
| 跨组件共享状态（复杂）     | Context + `useReducer` | 状态逻辑复杂、多处消费时 |
| 全局状态管理               | Redux / Zustand 等     | 大型应用或跨模块状态     |

---

## 二、useState 规范

### 用于局部组件状态

```typescript
// ✅ 正确：局部状态
const [count, setCount] = useState(0)
const [isVisible, setIsVisible] = useState(false)
```

### 扁平化状态结构

- 保持状态扁平，避免深层嵌套
- 相关状态可分组，但不宜过深

```typescript
// ✅ 正确：扁平状态
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [isLoading, setIsLoading] = useState(false)

// ❌ 错误：深层嵌套
const [form, setForm] = useState({
  user: {
    profile: {
      name: '',
      contact: {
        email: '',
        phone: '',
      },
    },
  },
})
```

### 函数式更新

- 当新状态依赖旧状态时，使用函数式更新

```typescript
// ✅ 正确：函数式更新
setCount((prev) => prev + 1)

// ❌ 错误：直接依赖闭包中的旧值（可能过时）
setCount(count + 1)
```

### 延迟初始化

- 对于昂贵的初始化计算，使用延迟初始化函数

```typescript
// ✅ 正确：延迟初始化
const [data, setData] = useState(() => {
  return expensiveComputation()
})

// ❌ 错误：每次渲染都执行
const [data, setData] = useState(expensiveComputation())
```

---

## 三、useReducer 规范

### 用于复杂状态逻辑

- 当状态包含多个子值或下一个状态依赖前一个状态时
- 当状态逻辑复杂时

```typescript
// ✅ 正确：useReducer 处理复杂表单状态
interface IFormState {
  values: IFormValues
  errors: Record<string, string>
  isValid: boolean
  isSubmitting: boolean
}

type TFormAction =
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'SUBMIT' }
  | { type: 'SUBMIT_SUCCESS' }

const formReducer = (state: IFormState, action: TFormAction): IFormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      }
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      }
    case 'SUBMIT':
      return { ...state, isSubmitting: true }
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, isValid: true }
    default:
      return state
  }
}

const [formState, dispatch] = useReducer(formReducer, {
  values: {},
  errors: {},
  isValid: false,
  isSubmitting: false,
})
```

---

## 四、Context + useReducer 共享状态

### 跨组件树共享状态

```typescript
// ✅ 正确：Context + useReducer 管理共享状态
import { createContext, useContext, useReducer } from 'react'

interface IAppState {
  user: IUserInfo | null
  isAuthenticated: boolean
}

type TAppAction =
  | { type: 'LOGIN'; user: IUserInfo }
  | { type: 'LOGOUT' }

const appReducer = (state: IAppState, action: TAppAction): IAppState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.user, isAuthenticated: true }
    case 'LOGOUT':
      return { user: null, isAuthenticated: false }
    default:
      return state
  }
}

interface IAppContext {
  state: IAppState
  dispatch: React.Dispatch<TAppAction>
}

const AppContext = createContext<IAppContext | null>(null)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    isAuthenticated: false,
  })

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext 必须在 AppProvider 内使用')
  }
  return context
}
```

---

## 五、状态更新规范

### 不可变性原则

- **禁止**直接修改状态对象/数组
- 使用展开运算符创建新对象，使用 `map`/`filter` 创建新数组

```typescript
// ✅ 正确：对象不可变更新
setUser((prev) => ({ ...prev, name: '张三' }))

// ❌ 错误：直接修改状态
user.name = '张三'
setUser(user)

// ✅ 正确：数组不可变更新
setList((prev) => [...prev, newItem])
setList((prev) => prev.filter((item) => item.id !== id))
setList((prev) => prev.map((item) => (item.id === id ? { ...item, name: '新名称' } : item)))

// ❌ 错误：直接修改数组
list.push(newItem)
setList(list)
```

### 派生状态计算

- 派生状态应在渲染时计算或使用 `useMemo`
- **不要**将派生状态存入 state

```typescript
// ✅ 正确：渲染时计算
const isAllSelected = selectedIds.length === dataList.length

// ✅ 正确：useMemo 缓存计算
const totalPrice = useMemo(() => {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
}, [cartItems])

// ❌ 错误：将派生状态存入 state
const [totalPrice, setTotalPrice] = useState(0)
useEffect(() => {
  setTotalPrice(cartItems.reduce((sum, item) => sum + item.price, 0))
}, [cartItems])
```

---

## 六、状态提升与跨组件通信

详见 [interaction.md](./react-interaction.md)（状态提升、Context 共享、Render Props、Compound Components、自定义 Hook 共享、状态管理选型、全局事件总线）。

---

## 七、相关模块引用

| 内容       | 详见                                   |
| ---------- | -------------------------------------- |
| 组件交互   | [interaction.md](./react-interaction.md)     |
| Hooks 规范 | [hooks.md](./react-hooks.md)                 |
| 组件开发   | [component-dev.md](./react-component-dev.md) |
| TypeScript | [typescript.md](./react-typescript.md)       |
