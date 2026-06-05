---
title: React TypeScript 规范
version: 2.0.0
lastUpdated: 2026-06-03
priority: 🔴 基础规范（强制执行）
maintainer: bulls-cows team
---

# React TypeScript 规范

本规范定义 TypeScript 在 React 项目中的类型使用约定。

---

## 一、类型注解要求

- **参数**：函数参数必须明确类型
- **返回值**：函数返回值必须明确类型
- **变量**：变量声明必须明确类型（尤其初始值为空时）

---

## 二、Props 类型定义

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

## 三、禁止使用 `any`

**禁止**使用 `any` 类型，应使用以下替代：

- `unknown`：用于类型不确定的场景
- `Record<string, unknown>`：用于动态键值对对象
- 具体类型/接口：定义准确的数据结构

```typescript
// ✅ 正确
const data: unknown = JSON.parse(raw)
const userInfo: IUserInfo = { id: '1', name: 'test' }
const config: Record<string, unknown> = { key: 'value' }

// ❌ 错误
const data: any = JSON.parse(raw) // 禁止
```

---

## 四、useState 类型注解

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

## 五、useRef 类型注解

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

## 六、事件处理类型

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

## 七、Children 类型

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

## 八、组件返回类型

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

## 九、类型导入

- 使用 `import type` 导入纯类型，减少运行时依赖

```typescript
// ✅ 正确：type-only 导入
import type { IUserInfo, ITableConfig } from '@src/types'
import { useState, useEffect } from 'react'

// 值和类型同时导入时分开写
import type { User } from '@src/types'
import { apiGetUser } from '@src/api/user'
```

**规则**：

- 仅用于类型导入时使用 `import type`
- 值和类型同时导入时分开写（`import type` 和 `import` 分两行）

---

## 十、泛型组件

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

## 十一、类型文件组织

- **全局类型**：放在 `src/types/` 目录下（如 `src/types/user.d.ts`）
- **组件私有类型**：放在组件同级目录或组件文件内 `export interface`
- **全局注入**：在 `src/types/index.ts` 中统一导出，便于项目全局引用
- **命名规范**：类型别名和接口以 `I` 前缀 + PascalCase（详见 [../naming.md](../naming.md)）

```
src/
├── types/
│   ├── user.d.ts      # 全局用户类型
│   ├── api.d.ts       # 接口响应类型
│   └── index.ts       # 统一导出
└── components/
    └── UserCard/
        ├── index.tsx
        └── types.ts   # 组件私有类型
```

---

## 十二、类型压制（不推荐）

**不推荐**使用 `as any`、`@ts-ignore`、`@ts-expect-error` 等类型压制操作。应优先通过完善类型定义解决类型问题，仅在特殊场景（如第三方库类型缺失、历史代码迁移过渡期）中使用。

```typescript
// ❌ 不推荐
const data = response as any
// @ts-ignore
const value = obj.property

// ✅ 正确：完善类型定义
interface IApiResponse {
  data: IUserInfo
}
const { data } = response as IApiResponse
```

---

## 十三、相关模块引用

| 内容       | 详见                                   |
| ---------- | -------------------------------------- |
| 组件开发   | [component-dev.md](./component-dev.md) |
| Hooks 规范 | [hooks.md](./hooks.md)                 |
| 状态管理   | [state.md](./state.md)                 |
| JSX 规范   | [jsx.md](./jsx.md)                     |
| 命名规范   | [../naming.md](../naming.md)           |
