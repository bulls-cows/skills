---
title: React 项目概述与适用范围
version: 2.0.0
lastUpdated: 2026-06-03
priority: 🔴 基础规范（强制执行）
maintainer: bulls-cows team
---

# React 项目概述与适用范围

> 适用范围、目录约束等通用约定详见 [@rules/frontend-rules/RULE.md](../../RULE.md#适用范围)，本文件仅承载 React 特有内容。

## 前置阅读

- [@rules/frontend-rules/RULE.md](../../RULE.md) — 总入口与适用范围

---

## 一、技术栈

| 技术       | 版本/要求             | 说明                            |
| ---------- | --------------------- | ------------------------------- |
| React      | 18+                   | 必须使用 React 18 及以上版本    |
| TypeScript | 推荐                  | 类型安全，优先使用 TS           |
| 组件模式   | 函数组件              | 禁止使用 Class 组件             |
| 状态管理   | Hooks                 | useState / useReducer / Context |
| 样式方案   | CSS Modules / SCSS 等 | 详见 [JSX 规范](./jsx.md)       |

---

## 二、核心约束

### 必须使用函数组件

- **禁止**使用 Class 组件
- 使用箭头函数或函数声明定义组件

```typescript
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
- **禁止**在条件、循环或嵌套函数中调用 Hooks（详见 [hooks.md](./hooks.md#二hooks-调用规则)）

### TypeScript 优先

- 新项目优先使用 TypeScript
- Props、State、Refs 必须显式标注类型（详见 [typescript.md](./typescript.md)）

---

## 三、相关规范索引

| 规范            | 详见                                               | 说明                                                              |
| --------------- | -------------------------------------------------- | ----------------------------------------------------------------- |
| 组件开发规范    | [component-dev.md](./component-dev.md)             | 函数组件、Props、导出规范                                         |
| 组件交互与通信  | [interaction.md](./interaction.md)                 | Props 单向流、回调、状态提升、Context、Render Props、状态管理选型 |
| 代码组织与顺序  | [order.md](./order.md)                             | 文件结构、组件内部顺序、Import 分组（4 组）、JSX 属性顺序         |
| Hooks 规范      | [hooks.md](./hooks.md)                             | Hook 调用规则、内置 Hooks                                         |
| 状态管理        | [state.md](./state.md)                             | useState / useReducer                                             |
| JSX 规范        | [jsx.md](./jsx.md)                                 | 条件渲染、列表、事件处理                                          |
| TypeScript      | [typescript.md](./typescript.md)                   | 类型注解、Props 定义                                              |
| Hooks 通用规范  | [../common-hooks.md](../common-hooks.md)           | 命名、抽离、返回值                                                |
| TypeScript 通用 | [../common-typescript.md](../common-typescript.md) | 类型注解、import type、类型文件                                   |
| 命名规范        | [../naming.md](../naming.md)                       | 文件/组件/变量命名                                                |
| 网络请求        | [../network.md](../network.md)                     | async/await、错误处理                                             |
| 代码风格        | [../code-style.md](../code-style.md)               | Prettier 配置                                                     |
| 注释规范        | [../comments.md](../comments.md)                   | JSDoc、注释格式                                                   |
| 性能优化        | [../performance.md](../performance.md)             | 懒加载、防抖节流                                                  |
| 约束清单        | [../constraints.md](../constraints.md)             | 禁止/推荐/注意事项                                                |
