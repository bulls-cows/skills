---
title: Vue2 概述与适用范围
version: 2.0.0
lastUpdated: 2026-06-03
priority: 🔴 基础规范（强制执行）
maintainer: bulls-cows team
---

# Vue2 概述与适用范围

本规范适用于基于 Vue2 + Options API 的前端项目。

---

## 技术栈

- **框架**：Vue 2.x
- **API 风格**：Options API（`data()`、`methods`、`computed`、`watch`、生命周期钩子）
- **构建工具**：Vue CLI / Webpack（视项目而定）
- **状态管理**：Vuex（推荐）/ eventBus（轻量场景）

---

## 适用范围

- **目录**：`src` 目录下的所有前端源文件
- **文件类型**：
  - `.vue` — 单文件组件（SFC）
  - `.js` — JavaScript 脚本文件
  - `.css` / `.scss` / `.less` — 样式文件

---

## 关键约束

| 约束项                    | 说明                                      | 详见                                                     |
| ------------------------- | ----------------------------------------- | -------------------------------------------------------- |
| 必须使用 Options API      | 禁止使用 Vue3 组合式 API                  | [component-dev.md](./component-dev.md#options-api-要求)  |
| 组件必须声明 `name`       | 每个组件必须声明 `name` 选项              | [component-dev.md](./component-dev.md#options-api-要求)  |
| v-for 必须使用唯一 key    | 禁止使用 `index` 作为 `key`               | [directives.md](./directives.md#一v-for-与-key)          |
| 禁止 v-if 与 v-for 同元素 | 必须拆分或通过 computed 过滤              | [directives.md](./directives.md#二v-if-与-v-for-冲突)    |
| 禁止修改 props            | Props 只读访问，单向数据流                | [interaction.md](./interaction.md#三使用限制)            |
| 禁止 `$parent` 链式访问   | 禁止 `$parent.$parent` 跨级访问           | [interaction.md](./interaction.md#五禁用-parentchildren) |
| Vue2 响应式陷阱           | 新增对象属性、数组索引赋值必须使用 `$set` | [reactivity.md](./reactivity.md)                         |
| 禁用 mixins               | 改用组合式函数或组件组合                  | [../constraints.md](../constraints.md)                   |

---

## 相关规范

### Vue2 专项规范

| 规范                                   | 说明                                              |
| -------------------------------------- | ------------------------------------------------- |
| [component-dev.md](./component-dev.md) | 组件开发规范（Options API）                       |
| [interaction.md](./interaction.md)     | 组件交互与通信（Props/Emit/$refs/provide/inject） |
| [directives.md](./directives.md)       | 模板指令规范（v-for/key/v-if/v-html/属性顺序）    |
| [order.md](./order.md)                 | SFC 结构顺序与导入分组（3 组）                    |
| [reactivity.md](./reactivity.md)       | Vue2 响应式陷阱（$set/数组/对象）                 |

### 通用规范

| 规范                                   | 说明                                                 |
| -------------------------------------- | ---------------------------------------------------- |
| [../naming.md](../naming.md)           | 架构与命名规范（文件/组件/API/事件/常量/布尔值/BEM） |
| [../network.md](../network.md)         | 网络请求与安全（async/await/错误处理/防重复提交）    |
| [../comments.md](../comments.md)       | 注释规范（模板/脚本/样式/注释保护原则）              |
| [../css.md](../css.md)                 | CSS 样式规范（BEM 命名/scoped/布局/兼容性）          |
| [../performance.md](../performance.md) | 性能优化规范（懒加载/KeepAlive/虚拟滚动/防抖节流）   |
| [../constraints.md](../constraints.md) | 约束清单速查（禁止/推荐/不推荐/注意事项）            |
| [../code-style.md](../code-style.md)   | 代码风格与 Prettier 配置                             |
