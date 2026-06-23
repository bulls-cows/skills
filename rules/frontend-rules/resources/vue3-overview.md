# Vue3 概述与适用范围

> 适用范围、目录约束等通用约定详见 [总纲索引](../RULE.md)，本文件仅承载 Vue3 特有内容。

## 前置阅读

- [总纲索引](../RULE.md) — 规范总入口、适用范围与三级优先级体系
- [common-vue-template.md](./common-vue-template.md) — Vue 模板通用规则（Vue2/Vue3 共享）
- [common-hooks.md](./common-hooks.md) — Hooks 通用规范（Vue3/React 共享）
- [common-typescript.md](./common-typescript.md) — TypeScript 通用规范（Vue3/React 共享）

---

## 一、技术栈

- **Vue 3** — 使用 `<script setup>` 组合式 API
- **TypeScript** — 全量类型注解，禁用 `any`
- **构建工具** — Vite / 兼容 Vue CLI

---

## 二、关键约束

| 约束项                | 说明                                                      |
| --------------------- | --------------------------------------------------------- |
| `<script setup>` 强制 | 禁止使用 Options API（`data()`、`methods` 等）            |
| 禁用 `this`           | `<script setup>` 中禁止使用 `this`                        |
| 禁用 `any`            | 使用 `unknown` 或具体类型替代（详见 TypeScript 通用规范） |
| Props/Emit 类型化     | 必须使用 TypeScript 泛型定义                              |
| ref 优先              | 响应式状态优先使用 `ref`，少用 `reactive`                 |
| Hooks 命名            | 必须以 `use` 开头，统一返回对象（详见 Hooks 通用规范）    |
| 事件白名单            | 仅允许使用 19 种语义化事件名（详见交互通信规范）          |

---

## 三、Vue3 专用规范索引

| 模块       | 说明                                                   | 路径                                   |
| ---------- | ------------------------------------------------------ | -------------------------------------- |
| 组件开发   | `<script setup>` 脚本结构、JSDoc、元素顺序、方法职责   | [vue3-component-dev.md](./vue3-component-dev.md) |
| 交互通信   | Props/Emit/defineExpose/provide/inject                 | [vue3-interaction.md](./vue3-interaction.md)     |
| 模板指令   | Vue3 特有差异（动态 v-slot 第 9 步、v-model 写法）     | [vue3-directives.md](./vue3-directives.md)       |
| 结构顺序   | 4 组 import 排序、`<script setup>` 内部 5 段结构       | [vue3-order.md](./vue3-order.md)                 |
| 响应式     | ref/reactive/computed 选择与转换                       | [vue3-reactivity.md](./vue3-reactivity.md)       |
| 侦听器     | Vue3 特有差异（watchEffect、watch vs watchEffect、flush） | [vue3-watch.md](./vue3-watch.md)                 |
| Hooks      | Vue3 特有差异（setup 限制、toRefs、内置 Hooks）        | [vue3-hooks.md](./vue3-hooks.md)                 |
| TypeScript | Vue3 特有差异（defineProps/ref/reactive/Emits 泛型）   | [vue3-typescript.md](./vue3-typescript.md)       |
| CSS 样式   | scoped 与 v-html `:deep()` 穿透、自定义指令清理        | [vue3-css.md](./vue3-css.md)                     |
| 性能优化   | defineAsyncComponent、shallowRef、unmounted 钩子       | [vue3-performance.md](./vue3-performance.md)     |

> Vue3 网络请求差异（useRequest 前置检查、`===` 偏好、互斥锁、diff 预览）已并入 [common-network.md](./common-network.md)。

---

## 四、通用规范引用

通用规范（命名、网络请求、CSS、TypeScript、Hooks、约束清单等）详见 [总纲索引](../RULE.md)。
