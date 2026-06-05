---
title: Vue2 概述与适用范围
version: 2.0.0
lastUpdated: 2026-06-03
priority: 🔴 基础规范（强制执行）
maintainer: bulls-cows team
---

# Vue2 概述与适用范围

> 适用范围、目录约束等通用约定详见 [@rules/frontend-rules/RULE.md](../../RULE.md#适用范围)，本文件仅承载 Vue2 特有内容。

## 前置阅读

- [@rules/frontend-rules/RULE.md](../../RULE.md) — 总入口与适用范围

---

## 一、技术栈

- **框架**：Vue 2.x
- **API 风格**：Options API（`data()`、`methods`、`computed`、`watch`、生命周期钩子）
- **构建工具**：Vue CLI / Webpack（视项目而定）
- **状态管理**：Vuex（推荐）/ eventBus（轻量场景）

---

## 二、关键约束

| 约束项                    | 说明                                      | 详见                                                                        |
| ------------------------- | ----------------------------------------- | --------------------------------------------------------------------------- |
| 必须使用 Options API      | 禁止使用 Vue3 组合式 API                  | [component-dev.md](./component-dev.md#一options-api-要求)                   |
| 组件必须声明 `name`       | 每个组件必须声明 `name` 选项              | [component-dev.md](./component-dev.md#一options-api-要求)                   |
| v-for 必须使用唯一 key    | 禁止使用 `index` 作为 `key`               | [../common-vue-template.md](../common-vue-template.md#一v-for-与-key)       |
| 禁止 v-if 与 v-for 同元素 | 必须拆分或通过 computed 过滤              | [../common-vue-template.md](../common-vue-template.md#二v-if-与-v-for-冲突) |
| 禁止修改 props            | Props 只读访问，单向数据流                | [interaction.md](./interaction.md#3-使用限制)                               |
| 禁止 `$parent` 链式访问   | 禁止 `$parent.$parent` 跨级访问           | [interaction.md](./interaction.md#五禁用-parentchildren)                    |
| Vue2 响应式陷阱           | 新增对象属性、数组索引赋值必须使用 `$set` | [reactivity.md](./reactivity.md)                                            |
| 禁用 mixins               | 改用组合式函数或组件组合                  | [../constraints.md](../constraints.md)                                      |

---

## 三、Vue2 专项规范索引

| 规范                                   | 说明                                              |
| -------------------------------------- | ------------------------------------------------- |
| [component-dev.md](./component-dev.md) | 组件开发规范（Options API）                       |
| [interaction.md](./interaction.md)     | 组件交互与通信（Props/Emit/$refs/provide/inject） |
| [directives.md](./directives.md)       | 模板指令规范（Vue2 特有差异）                     |
| [order.md](./order.md)                 | SFC 结构顺序与导入分组（通用 4 组）               |
| [reactivity.md](./reactivity.md)       | Vue2 响应式陷阱（$set/数组/对象）                 |

---

## 四、通用规范引用

| 模块             | 路径                                                   |
| ---------------- | ------------------------------------------------------ |
| Vue 模板通用规则 | [../common-vue-template.md](../common-vue-template.md) |
| 命名规范         | [../naming.md](../naming.md)                           |
| 网络请求         | [../network.md](../network.md)                         |
| 注释规范         | [../comments.md](../comments.md)                       |
| CSS 样式         | [../css.md](../css.md)                                 |
| 性能优化         | [../performance.md](../performance.md)                 |
| 约束清单         | [../constraints.md](../constraints.md)                 |
| 代码风格         | [../code-style.md](../code-style.md)                   |
| AI 行为约束      | [../ai-behavior.md](../ai-behavior.md)                 |
