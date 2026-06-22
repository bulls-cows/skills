# Vue2 概述与适用范围

> 适用范围、目录约束等通用约定详见 [总纲索引](../RULE.md)，本文件仅承载 Vue2 特有内容。

## 前置阅读

- [总纲索引](../RULE.md) — 规范总入口、适用范围与三级优先级体系
- [vue-template.md](./common-vue-template.md) — Vue 模板通用规则（Vue2/Vue3 共享）

---

## 一、技术栈

- **框架**：Vue 2.x
- **API 风格**：Options API（`data()`、`methods`、`computed`、`watch`、生命周期钩子）
- **构建工具**：Vue CLI / Webpack（视项目而定）
- **状态管理**：Vuex（推荐）/ eventBus（轻量场景）

---

## 二、关键约束

| 约束项                    | 说明                                      | 详见                                                              |
| ------------------------- | ----------------------------------------- | ----------------------------------------------------------------- |
| 必须使用 Options API      | 禁止使用 Vue3 组合式 API                  | [component-dev.md](./vue2-component-dev.md#一options-api-要求)         |
| 组件必须声明 `name`       | 每个组件必须声明 `name` 选项              | [component-dev.md](./vue2-component-dev.md#一options-api-要求)         |
| v-for 必须使用唯一 key    | 禁止使用 `index` 作为 `key`               | [vue-template.md](./common-vue-template.md#一v-for-与-key)       |
| 禁止 v-if 与 v-for 同元素 | 必须拆分或通过 computed 过滤              | [vue-template.md](./common-vue-template.md#二v-if-与-v-for-冲突) |
| 禁止修改 props            | Props 只读访问，单向数据流                | [interaction.md](./vue2-interaction.md#3-使用限制)                     |
| 禁止 `$parent` 链式访问   | 禁止 `$parent.$parent` 跨级访问           | [interaction.md](./vue2-interaction.md#五禁用-parentchildren)          |
| Vue2 响应式陷阱           | 新增对象属性、数组索引赋值必须使用 `$set` | [reactivity.md](./vue2-reactivity.md)                                  |
| 禁用 mixins               | 改用组合式函数或组件组合                  | [constraints.md](./common-constraints.md#一绝对禁止项100-必须遵守) |

---

## 三、Vue2 专项规范索引

| 规范                                   | 说明                                              |
| -------------------------------------- | ------------------------------------------------- |
| [component-dev.md](./vue2-component-dev.md) | 组件开发规范（Options API）                       |
| [interaction.md](./vue2-interaction.md)     | 组件交互与通信（Props/Emit/$refs/provide/inject） |
| [directives.md](./vue2-directives.md)       | 模板指令规范（Vue2 特有差异）                     |
| [order.md](./vue2-order.md)                 | SFC 结构顺序与导入分组（3 组 import）             |
| [reactivity.md](./vue2-reactivity.md)       | Vue2 响应式陷阱（$set/数组/对象）                 |
| [watch.md](./vue2-watch.md)                 | Vue2 侦听器（watch 选项特有写法）                 |
| [css.md](./vue2-css.md)                     | Vue2 CSS 差异（指令钩子、`::v-deep` 穿透写法）    |

> Vue2 特有约束（修改 data 原始类型、mixins、`$nextTick`、方法函数规范、filters 过滤器等）已并入 [common-constraints.md](./common-constraints.md)，以 🟦 标注。
> Vue2 网络请求差异（`==` 偏好、`this.$message` 提示）已并入 [common-network.md](./common-network.md)，以 🟦 标注。

---

## 四、通用规范引用

通用规范（命名、网络请求、CSS、TypeScript、Hooks、约束清单等）详见 [总纲索引](../RULE.md)。
