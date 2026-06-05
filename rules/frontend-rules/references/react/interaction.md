---
title: React 组件交互与通信规范
version: 2.0.0
lastUpdated: 2026-06-03
priority: 🔴 基础规范（强制执行）
maintainer: bulls-cows team
---

# React 组件交互与通信规范

> 本规范涵盖 React 组件对外接口（Props/回调）及组件间数据通信约定，结构与 Vue2/Vue3 `interaction.md` 对齐。
>
> TypeScript 类型定义详见 [typescript.md](./typescript.md#一props-类型定义)；状态管理 API（useState/useReducer）详见 [state.md](./state.md)。

---

## 一、Props 规范

### 1. 单向数据流

- Props 是**只读**的，**禁止**在子组件内直接修改 props
- 数据流向：父 → 子（通过 props），子 → 父（通过回调函数）
- 如需修改父级状态，必须通过回调通知父组件修改

```typescript
// ❌ 错误：直接修改 props
const UserCard = ({ user }: IUserCardProps) => {
  user.name = '张三' // 禁止
  return <div>{user.name}</div>
}

// ✅ 正确：通过回调通知父组件修改
const UserCard = ({ user, onUserChange }: IUserCardProps) => {
  const handleClick = () => {
    onUserChange?.({ ...user, name: '张三' })
  }
  return <button onClick={handleClick}>{user.name}</button>
}
```

### 2. 参数解构

Props **必须**在参数中解构使用：

```typescript
// ✅ 正确：Props 在参数中解构
const UserCard = ({ userId, userName, isActive = false }: IUserCardProps) => {
  return <div>{userName}</div>
}

// ❌ 错误：不解构，直接使用 props.xxx
const UserCard = (props: IUserCardProps) => {
  return <div>{props.userName}</div>
}
```

### 3. 默认值（解构默认值）

```typescript
// ✅ 正确：解构时设置默认值
const UserCard = ({ showAvatar = true, maxCount = 10 }: IUserCardProps) => {
  // ...
}

// ❌ 错误：在函数体内判断
const UserCard = (props: IUserCardProps) => {
  const showAvatar = props.showAvatar ?? true
  // ...
}
```

### 4. 布尔 Props 简写

- 值为 `true` 时省略属性值

```tsx
// ✅ 正确：省略 true
<UserCard isActive />
<Button disabled />

// ❌ 错误：显式写 true
<UserCard isActive={true} />
<Button disabled={true} />
```

### 5. 字符串 Props

- 字符串值使用引号，不需要花括号

```tsx
// ✅ 正确：字符串用引号
<UserCard name="张三" />

// ❌ 错误：字符串用花括号
<UserCard name={'张三'} />
```

---

## 二、回调事件规范

### 1. 命名规范

- 回调 props 使用 `on` + 事件名（PascalCase），与原生事件命名保持一致
- 内部事件处理函数使用 `handle` + 事件名

```typescript
// ✅ 正确：回调 props 使用 onXxx
interface IUserCardProps {
  userId: string
  onSelect?: (userId: string) => void  // 对外暴露的回调
  onRemove?: (userId: string) => void
}

// ✅ 正确：内部处理函数使用 handleXxx
const UserList = ({ onSelect }: IUserListProps) => {
  const handleClick = (userId: string) => {
    onSelect?.(userId)
  }
  return <button onClick={() => handleClick('123')}>选择</button>
}

// ❌ 错误：命名不规范
interface IUserCardProps {
  click: (id: string) => void  // 应为 onClick 或 onXxxClick
  remove: () => void
}
```

### 2. 事件回调传递

- 直接传递引用，避免无意义的箭头函数包裹（除非需要传参）
- 传递给 memo 子组件的回调必须用 `useCallback` 包裹

```tsx
// ✅ 正确：直接传递引用
<ChildComponent onSelect={handleSelect} />

// ✅ 正确：需要参数时使用箭头函数
<button onClick={() => onDeleteItem(item.id)}>删除</button>

// ❌ 错误：无意义的箭头函数包裹
<button onClick={() => onClickSubmit()}>提交</button>

// ✅ 正确：传递给 memo 子组件的回调用 useCallback
const MemoizedChild = React.memo(ChildComponent)
const Parent = () => {
  const handleClick = useCallback((id: string) => {
    // ...
  }, [])
  return <MemoizedChild onClick={handleClick} />
}
```

### 3. 事件处理类型

详见 [typescript.md](./typescript.md#四事件处理类型)（`React.ChangeEvent`、`React.MouseEvent` 等泛型事件类型）。

---

## 三、对外暴露（Imperative Handles）

### 1. useImperativeHandle 规则

React 推荐以**声明式**方式通信，但以下场景允许通过 `useImperativeHandle` 暴露命令式 API：

- 表单组件暴露 `validate()` / `reset()` / `getValues()`
- 弹窗/抽屉组件暴露 `open()` / `close()`
- 滚动容器暴露 `scrollTo()`

```typescript
import { useRef, useImperativeHandle, forwardRef } from 'react'

interface IUserFormHandle {
  validate: () => Promise<boolean>
  reset: () => void
  getValues: () => IFormValues
}

interface IUserFormProps {
  initialValues?: Partial<IFormValues>
}

const UserForm = forwardRef<IUserFormHandle, IUserFormProps>(
  ({ initialValues }, ref) => {
    const formRef = useRef<HTMLFormElement>(null)

    const validate = async () => { /* ... */ return true }
    const reset = () => { /* ... */ }
    const getValues = () => { /* ... */ return {} as IFormValues }

    useImperativeHandle(ref, () => ({
      validate,
      reset,
      getValues,
    }))

    return <form ref={formRef}>...</form>
  },
)

UserForm.displayName = 'UserForm'

// 父组件使用
const Parent = () => {
  const formRef = useRef<IUserFormHandle>(null)

  const handleSubmit = async () => {
    const isValid = await formRef.current?.validate() ?? false
    if (isValid) {
      const values = formRef.current?.getValues()
      // ...
    }
  }

  return (
    <>
      <UserForm ref={formRef} />
      <button onClick={handleSubmit}>提交</button>
    </>
  )
}
```

### 2. 使用限制

- **禁止滥用**：仅暴露父组件业务必须调用的方法，不应暴露内部状态实现
- **必须配合 `forwardRef`**：函数组件不能直接接收 `ref`，必须用 `forwardRef` 包裹
- **必须显式声明 displayName**：`forwardRef` 会丢失组件名，调试时需要 displayName
- **优先声明式**：能用 props/回调实现的，不要用 imperative handle

---

## 四、组件间通信

### 1. 状态提升（Parent Lifting）

**适用场景**：兄弟组件或跨 2 层以内组件共享状态。

- 将状态提升到最近的共同父组件
- 父组件通过 Props 向下传递状态和回调
- 子组件通过回调向上通知状态变化

```typescript
// ✅ 正确：状态提升到父组件
const Parent = () => {
  const [selectedId, setSelectedId] = useState<string>('')

  return (
    <div>
      <ChildA selectedId={selectedId} />
      <ChildB onSelect={setSelectedId} />
    </div>
  )
}
```

详见 [state.md](./state.md#六状态提升与跨组件通信)。

### 2. Context（跨层级共享）

**适用场景**：

- 共享 3 层以上深层组件的状态（避免 Prop Drilling）
- 主题、用户信息、国际化、权限等"全局"语义的状态
- 中等复杂度的跨组件通信（重度复杂请用状态管理库）

**反模式**：

- ❌ 用 Context 共享高频变化的状态（会导致所有消费组件重渲染）
- ❌ 用 Context 替代 props 传递业务数据（业务数据应保持显式数据流）

```typescript
import { createContext, useContext, useReducer } from 'react'

// 详见 state.md 第四章：Context + useReducer 共享状态
```

详见 [state.md](./state.md#四context--usereducer-共享状态)。

### 3. Render Props（动态组件渲染）

**适用场景**：跨组件复用渲染逻辑，而非复用状态。

```typescript
interface IListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
}

const List = <T,>({ items, renderItem }: IListProps<T>) => {
  return <ul>{items.map((item, index) => renderItem(item, index))}</ul>
}

// 使用
<List<IUserInfo>
  items={userList}
  renderItem={(user) => <UserCard key={user.id} user={user} />}
/>
```

### 4. Compound Components（复合组件）

**适用场景**：组件 API 复杂、需要灵活组合（如 Tabs、Select、Form、Table）。

```typescript
// 通过 Context 让子组件隐式获取父组件状态
const TabsContext = createContext<ITabsContext | null>(null)

interface ITabsProps {
  defaultActiveKey: string
  children: React.ReactNode
}

const Tabs = ({ defaultActiveKey, children }: ITabsProps) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey)

  return (
    <TabsContext.Provider value={{ activeKey, setActiveKey }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

const TabPane = ({ tabKey, children }: ITabPaneProps) => {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabPane 必须在 Tabs 内使用')
  if (ctx.activeKey !== tabKey) return null
  return <div className="tab-pane">{children}</div>
}

Tabs.TabPane = TabPane

// 使用：API 灵活、可读性强
<Tabs defaultActiveKey="user">
  <Tabs.TabPane tabKey="user">用户信息</Tabs.TabPane>
  <Tabs.TabPane tabKey="order">订单信息</Tabs.TabPane>
</Tabs>
```

### 5. 自定义 Hook 共享逻辑

**适用场景**：跨组件复用有状态逻辑（而非 UI）。

```typescript
// 复用业务逻辑
const useUserList = () => {
  const [users, setUsers] = useState<IUserInfo[]>([])
  const [loading, setLoading] = useState(false)

  const fetchUsers = useCallback(async () => { /* ... */ }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return { users, loading, refetch: fetchUsers }
}

// 多个组件共享同一份逻辑（但各自独立的状态）
const UserTable = () => {
  const { users, loading } = useUserList()
  return <Table data={users} loading={loading} />
}

const UserSelect = () => {
  const { users, loading } = useUserList()
  return <Select options={users} loading={loading} />
}
```

> Hooks 通用规范详见 [@rules/frontend-rules/references/common-hooks.md](../common-hooks.md)。

---

## 五、状态管理选型决策树

| 场景                    | 推荐方案                           | 说明                         |
| ----------------------- | ---------------------------------- | ---------------------------- |
| 单组件内部状态          | `useState` / `useReducer`          | 简单、零开销                 |
| 父子通信                | Props + 回调                       | 显式数据流，最易追踪         |
| 兄弟/2 层以内           | 状态提升                           | 提升到共同父组件             |
| 跨 3 层以上、中等复杂度 | Context                            | 主题、用户、权限等"全局"语义 |
| 跨多组件、状态逻辑复杂  | Context + `useReducer`             | 集中状态管理                 |
| 跨模块、大型应用        | Zustand / Jotai / Redux Toolkit    | 选其一，团队保持一致         |
| 服务端状态（API 数据）  | TanStack Query (React Query) / SWR | 区分客户端状态与服务端状态   |

### 选型原则

- **优先用 useState/useReducer + Props**：能不引入 Context 就不引入
- **服务端状态与客户端状态分离**：API 缓存、loading、error 用 TanStack Query；UI 状态用 useState/全局状态库
- **避免过早抽象**：状态管理库是为解决复杂度而生的，简单场景引入反而增加复杂度
- **团队一致性优先**：选定一个库（如 Zustand）就坚持用，不要混用 Redux + Zustand + Jotai

### Zustand 简单示例

```typescript
import { create } from 'zustand'

interface IUserStore {
  user: IUserInfo | null
  isAuthenticated: boolean
  login: (user: IUserInfo) => void
  logout: () => void
}

const useUserStore = create<IUserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))

// 使用：按需订阅，避免全量重渲染
const userName = useUserStore((state) => state.user?.name)
```

---

## 六、全局事件总线（Event Bus）

**适用场景**：跨组件、无父子关系的松耦合通信（如：全局通知、跨模块刷新、第三方库回调）。

**推荐方案**：

- 小型项目：使用 `mitt` 库
- 中大型项目：优先用状态管理库（Zustand/Redux）替代

```typescript
import mitt, { type Emitter } from 'mitt'

type TAppEvents = {
  'user:login': IUserInfo
  'user:logout': void
  'cart:updated': { count: number }
  'notification:show': { type: 'success' | 'error'; message: string }
}

// 全局事件总线
export const eventBus: Emitter<TAppEvents> = mitt<TAppEvents>()

// 订阅
const ComponentA = () => {
  useEffect(() => {
    const handler = (user: IUserInfo) => {
      console.log('用户登录:', user)
    }
    eventBus.on('user:login', handler)
    return () => {
      eventBus.off('user:login', handler) // 必须清理
    }
  }, [])
}

// 发布
const ComponentB = () => {
  const handleLogin = () => {
    eventBus.emit('user:login', { id: '1', name: '张三' })
  }
}
```

### 使用限制

- **必须清理订阅**：`useEffect` 返回的清理函数中调用 `eventBus.off`，避免内存泄漏
- **必须类型化**：使用 TypeScript 泛型约束事件 payload（如上 `TAppEvents`）
- **命名规范**：`模块:动作`（如 `user:login`、`cart:updated`）
- **避免滥用**：能用状态管理的不要用事件总线，事件流难追踪

---

## 七、相关模块引用

| 内容                | 详见                                               |
| ------------------- | -------------------------------------------------- |
| TypeScript 类型     | [typescript.md](./typescript.md)                   |
| 组件开发规范        | [component-dev.md](./component-dev.md)             |
| Hooks 规范          | [hooks.md](./hooks.md)                             |
| 状态管理 API        | [state.md](./state.md)                             |
| JSX 规范            | [jsx.md](./jsx.md)                                 |
| Hooks 通用规范      | [../common-hooks.md](../common-hooks.md)           |
| TypeScript 通用规范 | [../common-typescript.md](../common-typescript.md) |
| 命名规范            | [../naming.md](../naming.md)                       |
| 约束清单            | [../constraints.md](../constraints.md)             |
