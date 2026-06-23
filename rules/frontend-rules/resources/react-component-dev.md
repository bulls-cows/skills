# React 组件开发规范

> 本规范仅承载 React 组件开发特有内容。通用规范（JSDoc、命名、注释等）通过引用避免重复。

## 前置阅读

- [common-comments.md](./common-comments.md) — 注释规范（含 Script 顶部 JSDoc 模板）
- [common-hooks.md](./common-hooks.md) — Hooks 通用规范
- [common-typescript.md](./common-typescript.md) — TypeScript 通用规范

---

## 一、组件声明方式

### 必须使用函数组件

- 使用箭头函数或函数声明定义组件
- **禁止**使用 Class 组件

```typescript
// ✅ 正确：箭头函数
const UserCard = ({ userId, userName }: IUserCardProps) => {
  return (
    <div className="user-card">
      <span>{userName}</span>
    </div>
  )
}

// ❌ 不推荐：函数声明
function UserCard({ userId, userName }: IUserCardProps) {
  return (
    <div className="user-card">
      <span>{userName}</span>
    </div>
  )
}

// ❌ 错误：Class 组件
class UserCard extends React.Component {
  render() {
    return <div>{this.props.userName}</div>
  }
}
```

---

## 二、组件命名

| 类型       | 规范                     | 示例                             |
| ---------- | ------------------------ | -------------------------------- |
| 组件名     | PascalCase，多单词       | `UserList`, `SearchForm`         |
| 组件文件名 | PascalCase，与组件名一致 | `UserList.tsx`, `SearchForm.tsx` |
| 目录命名   | kebab-case（短横线）     | `src/components/user-profile/`   |

**注意**：组件名必须使用多个单词，避免与 HTML 原生元素冲突。

---

## 三、组件结构顺序

组件内部代码顺序、文件结构、Import 分组、JSX 属性顺序详见 [react-order.md](./react-order.md)。

---

## 四、Props 规范

详见 [react-interaction.md](./react-interaction.md#一props-规范)（单向数据流、参数解构、默认值、布尔简写、字符串 props）。

Props 的 TypeScript 类型定义详见 [react-typescript.md](./react-typescript.md#一props-类型定义)。

---

## 五、导出规范

### 使用命名导出

- **禁止**使用默认导出（`export default`）
- 统一使用命名导出（`export { ComponentName }`）

```typescript
// ✅ 正确：命名导出
export { UserCard }

// ✅ 正确：直接导出
export const UserCard = () => {
  return <div>用户卡片</div>
}

// ❌ 错误：默认导出
export default UserCard
```

---

## 六、组件拆分原则

### 一个文件一个组件

- 每个文件只导出一个主要组件
- 小型关联组件可放在同一文件

```typescript
// ✅ 正确：主组件 + 小型子组件
interface IIconProps {
  name: string
}

const Icon = ({ name }: IIconProps) => {
  return <span className={`icon icon--${name}`} />
}

export const UserCard = ({ userId }: IUserCardProps) => {
  return (
    <div>
      <Icon name="user" />
      <span>{userId}</span>
    </div>
  )
}
```

### 页面拆分建议

- 组件超过 250 行时，建议拆分独立子组件
- 按功能区块拆分：搜索表单、数据表格、分页器、操作按钮组

| 模块 | 处理方式                |
| ---- | ----------------------- |
| 弹窗 | 拆分为独立组件          |
| 表格 | 表格组件 + 业务逻辑分离 |
| 表单 | 表单组件 + 校验逻辑分离 |

---

## 七、方法职责

- 每个方法职责单一，函数名语义清晰
- 方法超过 20 行考虑拆分
- 重复逻辑抽离为公共方法或自定义 Hook

---

## 八、Import 分组

Import 分组排序规则详见 [react-order.md](./react-order.md#三import-分组)。

---

## 九、相关模块引用

| 内容                | 详见                                     |
| ------------------- | ---------------------------------------- |
| 代码组织与顺序      | [react-order.md](./react-order.md)                   |
| 注释规范            | [common-comments.md](./common-comments.md)     |
| Hooks 规范          | [react-hooks.md](./react-hooks.md)                   |
| Hooks 通用规范      | [common-hooks.md](./common-hooks.md)           |
| 状态管理            | [react-state.md](./react-state.md)                   |
| JSX 规范            | [react-jsx.md](./react-jsx.md)                       |
| TypeScript          | [react-typescript.md](./react-typescript.md)         |
| TypeScript 通用规范 | [common-typescript.md](./common-typescript.md) |
| 命名规范            | [common-naming.md](./common-naming.md)         |
| 网络请求            | [common-network.md](./common-network.md)       |
| 代码风格            | [common-code-style.md](./common-code-style.md) |
