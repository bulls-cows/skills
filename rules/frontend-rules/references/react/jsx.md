---
title: React JSX 规范
version: 2.0.0
lastUpdated: 2026-06-03
priority: 🟢 风格指南（建议遵循）
maintainer: bulls-cows team
---

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

- 使用 `on` + 事件名（PascalCase）命名
- 优先使用箭头函数定义事件处理函数

```tsx
// ✅ 正确：onXxx 命名
const onClickSubmit = () => {
  /* ... */
}
const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  /* ... */
}
const onMouseEnterCard = () => {
  /* ... */
}

;<button onClick={onClickSubmit}>提交</button>

// ❌ 错误：不清晰的命名
const handleClick = () => {
  /* ... */
}
const clickBtn = () => {
  /* ... */
}
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

// 使用
;<Card title="用户信息">
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
{
  /* 用户卡片组件 */
}
;<div className="user-card">
  {/* 头像区域 */}
  <img src={avatar} alt="头像" />
  {/* 信息区域 */}
  <span>{userName}</span>
</div>
```

---

## 九、样式使用

### 禁止使用内联样式

- 使用 CSS Modules、styled-components 或 SCSS 等方案
- 使用 `className` 替代 `class`

```tsx
// ✅ 正确：CSS Modules
import styles from './UserCard.module.scss'

<div className={styles.userCard}>...</div>

// ✅ 正确：条件类名
<div className={`user-card ${isActive ? 'user-card--active' : ''}`}>...</div>

// ❌ 错误：内联样式
<div style={{ color: 'red', fontSize: 14 }}>...</div>

// ❌ 错误：使用 class（HTML 属性）
<div class="user-card">...</div>
```

---

## 十、相关模块引用

| 内容       | 详见                                   |
| ---------- | -------------------------------------- |
| 组件开发   | [component-dev.md](./component-dev.md) |
| Hooks 规范 | [hooks.md](./hooks.md)                 |
| 状态管理   | [state.md](./state.md)                 |
| CSS 规范   | [../css.md](../css.md)                 |
| 命名规范   | [../naming.md](../naming.md)           |
