---
title: Vue3 概述与适用范围
version: 2.0.0
lastUpdated: 2026-06-03
priority: 🔴 基础规范（强制执行）
maintainer: bulls-cows team
---

# Vue3 概述与适用范围

## 技术栈

- **Vue 3** — 使用 `<script setup>` 组合式 API
- **TypeScript** — 全量类型注解，禁用 `any`
- **构建工具** — Vite / 兼容 Vue CLI

## 适用范围

- 所有 `src` 目录下的 `.vue`、`.ts`、`.js`、`.css`、`.scss`、`.less` 文件
- 适用于 Vue3 单文件组件的模板区、`<script setup>` 脚本区、样式区

## 关键约束

| 约束项                | 说明                                           |
| --------------------- | ---------------------------------------------- |
| `<script setup>` 强制 | 禁止使用 Options API（`data()`、`methods` 等） |
| 禁用 `this`           | `<script setup>` 中禁止使用 `this`             |
| 禁用 `any`            | 使用 `unknown` 或具体类型替代                  |
| Props/Emit 类型化     | 必须使用 TypeScript 泛型定义                   |
| ref 优先              | 响应式状态优先使用 `ref`，少用 `reactive`      |
| Hooks 命名            | 必须以 `use` 开头，统一返回对象                |
| 事件白名单            | 仅允许使用 19 种语义化事件名                   |

## Vue3 专用规范索引

| 模块       | 说明                                                  | 路径                                   |
| ---------- | ----------------------------------------------------- | -------------------------------------- |
| 组件开发   | `<script setup>` 脚本结构、JSDoc、元素顺序、方法职责  | [component-dev.md](./component-dev.md) |
| 交互通信   | Props/Emit/defineExpose/provide/inject                | [interaction.md](./interaction.md)     |
| 模板指令   | v-for/key、v-if 冲突、v-html 安全、指令简写、属性顺序 | [directives.md](./directives.md)       |
| 结构顺序   | 4 组 import 排序、`<script setup>` 内部 5 段结构      | [order.md](./order.md)                 |
| 响应式     | ref/reactive/computed 选择与转换                      | [reactivity.md](./reactivity.md)       |
| 侦听器     | watch/watchEffect 使用规范、资源清理                  | [watch.md](./watch.md)                 |
| Hooks      | 组合式函数命名、返回值、抽离建议                      | [hooks.md](./hooks.md)                 |
| TypeScript | 类型注解、Props/Emits 泛型、Hooks 返回值类型          | [typescript.md](./typescript.md)       |

## 通用规范索引

| 模块     | 说明                            | 路径                                   |
| -------- | ------------------------------- | -------------------------------------- |
| 规范总纲 | 三级优先级索引（必读）          | [../spec-index.md](../spec-index.md)   |
| 命名规范 | 文件/组件/API/事件/常量/Hooks   | [../naming.md](../naming.md)           |
| 网络请求 | async/await、错误处理、安全约束 | [../network.md](../network.md)         |
| 代码风格 | Prettier 配置、箭头函数优先     | [../code-style.md](../code-style.md)   |
| 注释规范 | 模板/脚本/样式注释格式          | [../comments.md](../comments.md)       |
| CSS 样式 | BEM 命名、scoped 优先           | [../css.md](../css.md)                 |
| 性能优化 | 懒加载、KeepAlive、虚拟滚动     | [../performance.md](../performance.md) |
| 约束清单 | 禁止/推荐/不推荐/注意事项       | [../constraints.md](../constraints.md) |
| AI 行为  | 修改权限、文档生成约束          | [../ai-behavior.md](../ai-behavior.md) |
