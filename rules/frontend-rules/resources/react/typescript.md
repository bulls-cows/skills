# React TypeScript 规范

> TypeScript 通用规则（类型注解、禁用 any、类型命名、import type、类型文件组织、类型压制）详见 [typescript.md](../common/typescript.md)，本文件仅承载 React 特有内容。

## 前置阅读

- [typescript.md](../common/typescript.md) — TypeScript 通用规范

---

## 一、Props 类型定义

### 使用 interface / type

- Props 类型以 `I` 前缀 + PascalCase 命名

```typescript
// ✅ 正确：接口定义 Props
interface IUserCardProps {
  userId: string
  userName: string
  isActive?: boolean
  onSelect?: (userId: string) => void
}

// ✅ 正确：类型别名定义 Props
type TUserCardProps = {
  userId: string
  userName: string
  isActive?: boolean
}
```

### Props 使用示例

```typescript
interface IUserCardProps {
  userId: string
  userName: string
  isActive?: boolean
}

const UserCard = ({ userId, userName, isActive = false }: IUserCardProps) => {
  return <div className={isActive ? 'active' : ''}>{userName}</div>
}
```

---

## 二、useState 类型注解

- useState 必须显式标注类型（尤其初始值为空时）

```typescript
// ✅ 正确：显式标注类型
const [userName, setUserName] = useState<string>('')
const [userList, setUserList] = useState<IUserInfo[]>([])
const [isLoading, setIsLoading] = useState<boolean>(false)
const [selectedUser, setSelectedUser] = useState<IUserInfo | null>(null)

// 可选：类型推断（当初始值已明确时）
const [count, setCount] = useState(0) // 推断为 number

// ❌ 不推荐：无初始值时未标注类型
const [data, setData] = useState() // 推断为 undefined，应明确类型
```

---

## 三、useRef 类型注解

- DOM 引用必须显式标注元素类型
- 可变值引用标注具体类型

```typescript
// ✅ 正确：DOM 引用
const inputRef = useRef<HTMLInputElement>(null)
const formRef = useRef<HTMLFormElement>(null)

// ✅ 正确：可变值引用
const timerRef = useRef<number | null>(null)
const countRef = useRef(0) // 类型推断为 number

// ❌ 错误：未标注类型
const inputRef = useRef(null) // 推断为 RefObject<null>
```

---

## 四、事件处理类型

- 使用 React 提供的泛型事件类型

```typescript
// ✅ 正确：显式事件类型
const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value)
}

const onClickSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()
  // ...
}

const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    handleSubmit()
  }
}

const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  // ...
}
```

---

## 五、Children 类型

- 使用 `React.ReactNode` 作为 children 类型

```typescript
interface ICardProps {
  title: string
  children: React.ReactNode
}

const Card = ({ title, children }: ICardProps) => {
  return (
    <div className="card">
      <div className="card__header">{title}</div>
      <div className="card__body">{children}</div>
    </div>
  )
}
```

---

## 六、组件返回类型

- 优先使用显式返回类型
- 可使用 `React.FC` 或 `JSX.Element`

```typescript
// ✅ 正确：显式返回类型
const UserCard = ({ userId }: IUserCardProps): JSX.Element => {
  return <div>{userId}</div>
}

// ✅ 正确：使用 React.FC（可选）
const UserCard: React.FC<IUserCardProps> = ({ userId }) => {
  return <div>{userId}</div>
}

// ❌ 错误：无返回类型
const UserCard = ({ userId }: IUserCardProps) => {
  return <div>{userId}</div>
}
```

---

## 七、泛型组件

- 泛型组件使用 `<T,>` 语法（末尾逗号避免 JSX 解析歧义）

```typescript
// ✅ 正确：泛型组件语法
interface IListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

const List = <T,>({ items, renderItem }: IListProps<T>): JSX.Element => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

// 使用
<List<IUserInfo>
  items={userList}
  renderItem={(user) => <span>{user.name}</span>}
/>
```

---

## 八、相关模块引用

| 内容                | 详见                                     |
| ------------------- | ---------------------------------------- |
| TypeScript 通用规范 | [typescript.md](../common/typescript.md) |
| 组件开发            | [component-dev.md](./component-dev.md)   |
| Hooks 规范          | [hooks.md](./hooks.md)                   |
| 状态管理            | [state.md](./state.md)                   |
| JSX 规范            | [jsx.md](./jsx.md)                       |
| 命名规范            | [naming.md](../common/naming.md)         |
