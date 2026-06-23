# React JSX 规范

本规范涵盖 JSX 的语法规范、条件渲染、列表渲染、事件处理、属性传递及样式使用。

---

## 一、自闭合标签

- 无子元素的标签 **必须**使用自闭合语法

```tsx
// ✅ 正确：自闭合
<img src={avatar} alt="头像" />
<input type="text" />
<br />
<hr />

// ❌ 错误：不必要的闭合标签
<img src={avatar} alt="头像"></img>
<input type="text"></input>
```

---

## 二、条件渲染

### 优先使用三元或逻辑与运算符

```tsx
// ✅ 正确：三元运算符
<div>{isLoading ? <Spinner /> : <Content />}</div>

// ✅ 正确：逻辑与运算符
<div>{hasError && <ErrorMessage />}</div>

// ❌ 错误：复杂嵌套三元（难以阅读）
<div>
  {isLoading
    ? <Spinner />
    : hasError
      ? <ErrorMessage />
      : isEmpty
        ? <Empty />
        : <Content />}
</div>
```

### 复杂条件提前返回

- 当条件复杂时，使用提前返回或抽离为变量

```tsx
// ✅ 正确：提前返回抽离
const renderContent = () => {
  if (isLoading) return <Spinner />
  if (hasError) return <ErrorMessage />
  if (isEmpty) return <Empty />
  return <Content />
}

return <div>{renderContent()}</div>
```

---

## 三、列表渲染

### 使用 `.map()` 渲染列表

- **必须**提供唯一且稳定的 `key`（禁止使用 `index`）

```tsx
// ✅ 正确：使用唯一 ID 作为 key
<ul>
  {userList.map((user) => (
    <li key={user.id}>{user.name}</li>
  ))}
</ul>

// ❌ 错误：使用 index 作为 key
<ul>
  {userList.map((user, index) => (
    <li key={index}>{user.name}</li>
  ))}
</ul>
```

---

## 四、事件处理

### 命名规范

- **对外回调 Props**：`on` + 事件名（PascalCase），如 `onSelect`、`onUserChange`，与原生事件命名保持一致
- **组件内部处理函数**：`on` + 事件名 或 `handle` + 事件名（PascalCase），团队内保持一致即可
- 优先使用箭头函数定义事件处理函数

```tsx
// ✅ 正确：对外 onXxx，对内 onXxx / handleXxx 均可
interface IUserListProps {
  onSelect?: (userId: string) => void
}

const UserList = ({ onSelect }: IUserListProps) => {
  const handleSelect = (userId: string) => onSelect?.(userId)
  return <button onClick={() => handleSelect('123')}>选择</button>
}

// ❌ 错误：命名模糊、缺少动作动词
const click = () => { /* ... */ }
const clickBtn = () => { /* ... */ }
```

### 传递参数

- 避免在 JSX 中直接写箭头函数（除非需要传递参数）

```tsx
// ✅ 正确：直接传递引用
<button onClick={onClickSubmit}>提交</button>

// ✅ 正确：需要参数时使用箭头函数
<button onClick={() => onDeleteItem(item.id)}>删除</button>

// ❌ 错误：无意义的箭头函数包裹
<button onClick={() => onClickSubmit()}>提交</button>
```

---

## 五、Props 传递

### 使用 camelCase

- JSX 属性使用 camelCase

```tsx
// ✅ 正确：camelCase
<UserCard userId="123" isActive={true} onSelect={handleSelect} />

// ❌ 错误：kebab-case（HTML 属性风格）
<UserCard user-id="123" is-active={true} />
```

### 布尔 Props 简写

- 值为 `true` 时，省略属性值

```tsx
// ✅ 正确：省略 true
<UserCard isActive />
<Button disabled />

// ❌ 错误：显式写 true
<UserCard isActive={true} />
<Button disabled={true} />
```

### 字符串 Props

- 字符串值使用引号，不需要花括号

```tsx
// ✅ 正确：字符串用引号
<UserCard name="张三" />

// ❌ 错误：字符串用花括号
<UserCard name={'张三'} />
```

### 解构传递 Props

- 优先在组件参数中解构 Props

```tsx
// ✅ 正确：参数解构
const UserCard = ({ userId, userName, isActive }: IUserCardProps) => {
  return <div>{userName}</div>
}

// ❌ 错误：不解构
const UserCard = (props: IUserCardProps) => {
  return <div>{props.userName}</div>
}
```

---

## 六、Children 与组合

### 优先使用组合而非继承

```tsx
// ✅ 正确：组合方式
const Card = ({ title, children }: ICardProps) => {
  return (
    <div className="card">
      <div className="card__header">{title}</div>
      <div className="card__body">{children}</div>
    </div>
  )
}

// 使用：通过 children 组合，而非继承
<Card title="用户信息">
  <UserInfo userId="123" />
</Card>
```

---

## 七、Fragments

- 返回多个元素时使用 `<>...</>` 简写

```tsx
// ✅ 正确：Fragment 简写
const UserList = () => {
  return (
    <>
      <h1>用户列表</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  )
}

// ❌ 错误：不必要的 div 包裹
const UserList = () => {
  return (
    <div>
      <h1>用户列表</h1>
      <ul>...</ul>
    </div>
  )
}
```

---

## 八、JSX 中的注释

- 使用 `{/* 注释 */}` 格式

```tsx
const UserCard = ({ userName, avatar }: IUserCardProps) => {
  return (
    <div className="user-card">
      {/* 头像区域 */}
      <img src={avatar} alt="头像" />
      {/* 信息区域 */}
      <span>{userName}</span>
    </div>
  )
}
```

---

## 九、样式使用

- **禁止**使用内联样式（`style={{...}}`），动态计算的单个属性除外
- **禁止**使用 HTML 的 `class` 属性，必须用 `className`
- 样式方案选型、CSS Modules 用法、动态类名、穿透第三方组件详见 [react-css.md](./react-css.md)

```tsx
// ✅ 正确：className + CSS Modules
import styles from './UserCard.module.scss'

<div className={styles.userCard}>...</div>

// ❌ 错误：内联样式
<div style={{ color: 'red', fontSize: 14 }}>...</div>

// ❌ 错误：使用 class（HTML 属性）
<div class="user-card">...</div>
```

---

## 十、相关模块引用

| 内容       | 详见                                   |
| ---------- | -------------------------------------- |
| 组件开发   | [react-component-dev.md](./react-component-dev.md) |
| Hooks 规范 | [react-hooks.md](./react-hooks.md)                 |
| 状态管理   | [react-state.md](./react-state.md)                 |
| CSS 规范   | [react-css.md](./react-css.md)                 |
| 命名规范   | [common-naming.md](./common-naming.md)           |
