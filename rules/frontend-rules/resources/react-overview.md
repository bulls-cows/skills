# React 项目概述与适用范围

> 适用范围、目录约束等通用约定详见 [总纲索引](../RULE.md)，本文件仅承载 React 特有内容。

## 前置阅读

- [总纲索引](../RULE.md) — 规范总入口、适用范围与三级优先级体系
- [common-hooks.md](./common-hooks.md) — Hooks 通用规范（Vue3/React 共享）
- [common-typescript.md](./common-typescript.md) — TypeScript 通用规范（Vue3/React 共享）

---

## 一、技术栈

| 技术       | 版本/要求             | 说明                                                |
| ---------- | --------------------- | --------------------------------------------------- |
| React      | 18+                   | 必须使用 React 18 及以上版本                        |
| TypeScript | 推荐                  | 类型安全                                            |
| 组件模式   | 函数组件              | 禁止使用 Class 组件                                 |
| 状态管理   | Hooks                 | useState / useReducer / Context                     |
| 样式方案   | CSS Modules / SCSS 等 | 详见 [CSS 规范](./common-css.md#十二react-css-补充) |

---

## 二、核心约束

### 必须使用函数组件

- **禁止**使用 Class 组件
- 使用箭头函数或函数声明定义组件

```tsx
// ✅ 正确：函数组件
const UserList = () => {
  return <div>用户列表</div>
}

// ❌ 错误：Class 组件
class UserList extends React.Component {
  render() {
    return <div>用户列表</div>
  }
}
```

### 必须使用 Hooks

- 使用 Hooks 管理状态和副作用
- **禁止**在条件、循环或嵌套函数中调用 Hooks（详见 [common-hooks.md](./common-hooks.md#六hooks-调用规则)）

### TypeScript 优先

- 新项目优先使用 TypeScript
- Props、State、Refs 必须显式标注类型（详见 [common-typescript.md](./common-typescript.md)）

---

## 三、相关规范索引

### React 特有规范

| 规范           | 详见                                                | 说明                                                              |
| -------------- | --------------------------------------------------- | ----------------------------------------------------------------- |
| 组件开发规范   | [react-component-dev.md](./react-component-dev.md)  | 函数组件、Props、导出规范                                         |
| 组件交互与通信 | [react-interaction.md](./react-interaction.md)      | Props 单向流、回调、状态提升、Context、Render Props、状态管理选型 |
| 代码组织与顺序 | [react-order.md](./react-order.md)                  | 文件结构、组件内部顺序、Import 分组（4 组）、JSX 属性顺序         |
| Hooks 规范     | [common-hooks.md](./common-hooks.md)                | Hook 调用规则、内置 Hooks                                         |
| 状态管理       | [react-state.md](./react-state.md)                  | useState / useReducer                                             |
| JSX 规范       | [react-jsx.md](./react-jsx.md)                      | 条件渲染、列表、事件处理                                          |
| CSS 规范       | [common-css.md](./common-css.md#十二react-css-补充) | CSS Modules、className、clsx、`:global()` 穿透、方案选型          |
| TypeScript     | [common-typescript.md](./common-typescript.md)      | 类型注解、Props 定义                                              |

### 通用规范引用

| 规范             | 详见                                             | 说明                                |
| ---------------- | ------------------------------------------------ | ----------------------------------- |
| Hooks 通用规范   | [common-hooks.md](./common-hooks.md)             | 命名、抽离、返回值                  |
| TypeScript 通用  | [common-typescript.md](./common-typescript.md)   | 类型注解、import type、类型文件     |
| 命名规范         | [common-naming.md](./common-naming.md)           | 文件/组件/变量命名                  |
| CSS 样式（通用） | [common-css.md](./common-css.md)                 | BEM、局部作用域、兼容性、作用域穿透 |
| 网络请求         | [common-network.md](./common-network.md)         | async/await、错误处理               |
| 代码风格         | [common-code-style.md](./common-code-style.md)   | Prettier 配置                       |
| 注释规范         | [common-comments.md](./common-comments.md)       | JSDoc、注释格式                     |
| 性能优化         | [common-performance.md](./common-performance.md) | 懒加载、防抖节流                    |
| 约束清单         | [common-constraints.md](./common-constraints.md) | 禁止/推荐/注意事项                  |
