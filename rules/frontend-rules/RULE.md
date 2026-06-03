---
description: 通用前端项目开发规范与架构指南
alwaysApply: true
---

# 通用前端项目开发规范

本规则已拆分为以下子模块，各模块独立维护，按需引用：

## 总纲索引

- **[@rules/frontend-rules/references/spec-index.md](./references/spec-index.md)** — 规范总纲（必读，按优先级分级索引所有模块）

## AI 行为约束

- **[@rules/frontend-rules/references/ai-behavior.md](./references/ai-behavior.md)** — AI 行为与交互约束（修改权限/文档生成约束/直接输出规则）

## 通用规范

### 基础规范（Essential）

- **[@rules/frontend-rules/references/network.md](./references/network.md)** — 网络请求与安全（async/await/错误处理/防重复提交/安全约束）

### 强烈推荐（Strongly Recommended）

- **[@rules/frontend-rules/references/naming.md](./references/naming.md)** — 架构与命名规范（文件/组件/API/事件/常量/布尔值/BEM）

### 风格指南（Recommended）

- **[@rules/frontend-rules/references/code-style.md](./references/code-style.md)** — 代码风格与 Prettier 配置
- **[@rules/frontend-rules/references/comments.md](./references/comments.md)** — 注释规范（模板/脚本/样式/保护原则）
- **[@rules/frontend-rules/references/css.md](./references/css.md)** — CSS 样式规范（BEM 命名/作用域/布局/兼容性）
- **[@rules/frontend-rules/references/performance.md](./references/performance.md)** — 性能优化规范（懒加载/KeepAlive/虚拟滚动/防抖节流/图片优化）
- **[@rules/frontend-rules/references/constraints.md](./references/constraints.md)** — 约束清单速查（禁止/推荐/不推荐/注意事项）

## 框架特定规范

### Vue2

- **[@rules/frontend-rules/references/vue2/overview.md](./references/vue2/overview.md)** — Vue2 概述与适用范围
- **[@rules/frontend-rules/references/vue2/component-dev.md](./references/vue2/component-dev.md)** — Vue2 组件开发规范（Options API）
- **[@rules/frontend-rules/references/vue2/interaction.md](./references/vue2/interaction.md)** — Vue2 组件交互与通信（Props/Emit/$refs/provide/inject）
- **[@rules/frontend-rules/references/vue2/directives.md](./references/vue2/directives.md)** — Vue2 模板指令规范（v-for/key/v-if/v-html/属性顺序）
- **[@rules/frontend-rules/references/vue2/order.md](./references/vue2/order.md)** — Vue2 SFC 结构顺序与导入分组（3 组）
- **[@rules/frontend-rules/references/vue2/reactivity.md](./references/vue2/reactivity.md)** — Vue2 响应式陷阱（$set/数组/对象）

### Vue3

- **[@rules/frontend-rules/references/vue3/overview.md](./references/vue3/overview.md)** — Vue3 概述与适用范围
- **[@rules/frontend-rules/references/vue3/component-dev.md](./references/vue3/component-dev.md)** — Vue3 组件开发规范（script setup）
- **[@rules/frontend-rules/references/vue3/interaction.md](./references/vue3/interaction.md)** — Vue3 组件交互与通信（defineProps/defineEmits/defineExpose）
- **[@rules/frontend-rules/references/vue3/directives.md](./references/vue3/directives.md)** — Vue3 模板指令规范
- **[@rules/frontend-rules/references/vue3/order.md](./references/vue3/order.md)** — Vue3 SFC 结构顺序与导入分组（4 组）
- **[@rules/frontend-rules/references/vue3/reactivity.md](./references/vue3/reactivity.md)** — Vue3 响应式状态管理（ref/reactive/computed）
- **[@rules/frontend-rules/references/vue3/watch.md](./references/vue3/watch.md)** — Vue3 watch/watchEffect 监听规范
- **[@rules/frontend-rules/references/vue3/hooks.md](./references/vue3/hooks.md)** — Vue3 Hooks 组合式函数规范
- **[@rules/frontend-rules/references/vue3/typescript.md](./references/vue3/typescript.md)** — Vue3 TypeScript 类型注解规范

### React

- **[@rules/frontend-rules/references/react/overview.md](./references/react/overview.md)** — React 概述与适用范围
- **[@rules/frontend-rules/references/react/component-dev.md](./references/react/component-dev.md)** — React 组件开发规范（函数组件）
- **[@rules/frontend-rules/references/react/hooks.md](./references/react/hooks.md)** — React Hooks 规范
- **[@rules/frontend-rules/references/react/state.md](./references/react/state.md)** — React 状态管理
- **[@rules/frontend-rules/references/react/jsx.md](./references/react/jsx.md)** — React JSX 规范
- **[@rules/frontend-rules/references/react/typescript.md](./references/react/typescript.md)** — React TypeScript 规范

## 适用范围

- 所有 `src` 目录下的前端源文件
- 目录约束：仅允许操作 `src` 目录下的文件
- 通用规范适用于所有前端框架（Vue2/Vue3/React）
- 框架特定规范仅适用于对应框架项目

## 快速导航

| 模块     | 核心内容                                                          |
| -------- | ----------------------------------------------------------------- |
| 规范总纲 | 三级优先级索引（基础/强烈推荐/风格指南），通用 + 框架特定分列     |
| 网络请求 | async/await、单次解构、防重复提交、安全规范                       |
| 命名规范 | 文件/组件/API/事件/常量/布尔值/BEM                                |
| 代码风格 | Prettier 配置、箭头函数优先                                       |
| 注释规范 | 模板/脚本/样式区注释格式、注释保护原则                            |
| CSS 样式 | BEM 命名、scoped 优先、布局推荐、兼容性指南                       |
| 性能优化 | 懒加载、KeepAlive、虚拟滚动、防抖节流、图片优化                   |
| 约束清单 | 禁止项/推荐项/不推荐项/注意事项速查                               |
| Vue2     | Options API 组件开发、交互通信、模板指令、代码组织、响应式陷阱    |
| Vue3     | script setup 组件开发、交互通信、响应式、watch、Hooks、TypeScript |
| React    | 函数组件开发、Hooks、状态管理、JSX、TypeScript                    |
| AI 行为  | 修改权限红线、文档生成约束                                        |
