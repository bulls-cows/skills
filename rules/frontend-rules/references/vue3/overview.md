---
title: Vue3 概述与适用范围
version: 2.0.0
lastUpdated: 2026-06-03
priority: 🔴 基础规范（强制执行）
maintainer: bulls-cows team
---

# Vue3 概述与适用范围

> 适用范围、目录约束等通用约定详见 [@rules/frontend-rules/RULE.md](../../RULE.md#适用范围)，本文件仅承载 Vue3 特有内容。

## 前置阅读

- [@rules/frontend-rules/RULE.md](../../RULE.md) — 总入口与适用范围

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
| 事件白名单            | 仅允许使用 19 种语义化事件名                              |

---

## 三、Vue3 专用规范索引

| 模块       | 说明                                                 | 路径                                   |
| ---------- | ---------------------------------------------------- | -------------------------------------- |
| 组件开发   | `<script setup>` 脚本结构、JSDoc、元素顺序、方法职责 | [component-dev.md](./component-dev.md) |
| 交互通信   | Props/Emit/defineExpose/provide/inject               | [interaction.md](./interaction.md)     |
| 模板指令   | Vue3 特有差异（动态 v-slot 第 9 步、v-model 写法）   | [directives.md](./directives.md)       |
| 结构顺序   | 4 组 import 排序、`<script setup>` 内部 5 段结构     | [order.md](./order.md)                 |
| 响应式     | ref/reactive/computed 选择与转换                     | [reactivity.md](./reactivity.md)       |
| 侦听器     | watch/watchEffect 使用规范、资源清理                 | [watch.md](./watch.md)                 |
| Hooks      | Vue3 特有差异（setup 限制、toRefs、内置 Hooks）      | [hooks.md](./hooks.md)                 |
| TypeScript | Vue3 特有差异（defineProps/ref/reactive/Emits 泛型） | [typescript.md](./typescript.md)       |

---

## 四、通用规范引用

| 模块                | 路径                                                   |
| ------------------- | ------------------------------------------------------ |
| 规范总纲            | [../spec-index.md](../spec-index.md)                   |
| Vue 模板通用规则    | [../common-vue-template.md](../common-vue-template.md) |
| Hooks 通用规范      | [../common-hooks.md](../common-hooks.md)               |
| TypeScript 通用规范 | [../common-typescript.md](../common-typescript.md)     |
| 命名规范            | [../naming.md](../naming.md)                           |
| 网络请求            | [../network.md](../network.md)                         |
| 代码风格            | [../code-style.md](../code-style.md)                   |
| 注释规范            | [../comments.md](../comments.md)                       |
| CSS 样式            | [../css.md](../css.md)                                 |
| 性能优化            | [../performance.md](../performance.md)                 |
| 约束清单            | [../constraints.md](../constraints.md)                 |
| AI 行为             | [../ai-behavior.md](../ai-behavior.md)                 |
