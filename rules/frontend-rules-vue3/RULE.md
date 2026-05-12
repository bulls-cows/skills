---
description: Vue3 前端项目开发规范与架构指南
alwaysApply: true
---

# Vue3 前端项目开发规范

本规则已拆分为以下子模块，各模块独立维护，按需引用：

## 总纲索引

- **[@rules/frontend-rules-vue3/references/spec-index.md](./references/spec-index.md)** — 规范总纲（必读，按优先级分级索引所有模块）

## AI 行为约束

- **[@rules/frontend-rules-vue3/references/ai-behavior.md](./references/ai-behavior.md)** — AI 行为与交互约束（修改权限/文档生成约束/直接输出规则）

## 总纲索引

- **[@rules/frontend-rules-vue3/references/spec-index.md](./references/spec-index.md)** — 规范总纲（必读，按优先级分级索引所有模块）

## 适用范围

- 所有 `src` 目录下的 `.vue`、`.ts`、`.js`、`.css`、`.scss`、`.less` 文件
- 目录约束：仅允许操作 `src` 目录下的文件
- 适用于 Vue3 单文件组件的模板区、`<script setup>` 脚本区、样式区

## 基础规范（Essential）

- **[@rules/frontend-rules-vue3/references/component-dev.md](./references/component-dev.md)** — Vue3 组件开发规范入口
- **[@rules/frontend-rules-vue3/references/interaction.md](./references/interaction.md)** — 组件交互与通信（Props/Emit/defineExpose/provide/inject）
- **[@rules/frontend-rules-vue3/references/directives.md](./references/directives.md)** — 模板指令规范（v-for/key/v-if/v-html/属性顺序）

## 强烈推荐（Strongly Recommended）

- **[@rules/frontend-rules-vue3/references/naming.md](./references/naming.md)** — 架构与命名规范（文件/组件/API/事件/常量/Hooks）
- **[@rules/frontend-rules-vue3/references/reactivity.md](./references/reactivity.md)** — 响应式状态管理（ref/reactive/computed 选择与转换）
- **[@rules/frontend-rules-vue3/references/watch.md](./references/watch.md)** — watch/watchEffect 监听规范
- **[@rules/frontend-rules-vue3/references/hooks.md](./references/hooks.md)** — Hooks 组合式函数规范（命名/返回值/抽离建议）
- **[@rules/frontend-rules-vue3/references/order.md](./references/order.md)** — SFC 结构顺序与导入分组（4 组）
- **[@rules/frontend-rules-vue3/references/network.md](./references/network.md)** — 网络请求与安全（async/await/错误处理/安全约束）
- **[@rules/frontend-rules-vue3/references/constraints.md](./references/constraints.md)** — 约束清单速查（禁止/推荐/不推荐/注意事项）

## 风格指南（Recommended）

- **[@rules/frontend-rules-vue3/references/typescript.md](./references/typescript.md)** — TypeScript 类型注解规范（禁用 any，不推荐 as any/@ts-ignore）
- **[@rules/frontend-rules-vue3/references/code-style.md](./references/code-style.md)** — 代码风格与 Prettier 配置
- **[@rules/frontend-rules-vue3/references/css.md](./references/css.md)** — CSS 样式规范（BEM 命名/作用域/响应式适配）
- **[@rules/frontend-rules-vue3/references/performance.md](./references/performance.md)** — 性能优化规范（懒加载/KeepAlive/虚拟滚动/防抖节流）
- **[@rules/frontend-rules-vue3/references/comments.md](./references/comments.md)** — 注释规范（模板/脚本/样式/保护原则）

## 快速导航

| 模块 | 核心内容 |
|------|----------|
| 规范总纲 | 三级优先级索引（基础/强烈推荐/风格指南） |
| 组件开发 | `<script setup>` 脚本结构、JSDoc、元素顺序、方法职责、页面拆分 |
| 交互通信 | Props 定义、Emit 白名单、defineExpose、provide/inject、禁用 $parent/$children |
| 模板指令 | v-for/key、v-if 冲突、v-html 安全、指令简写、属性顺序 |
| 结构顺序 | 4 组 import 排序、`<script setup>` 内部 5 段结构 |
| 命名规范 | 文件/组件/API/事件/常量/布尔值/Hooks（Props/Emit 详见交互通信） |
| Hooks | 命名/返回值/使用规范、抽离建议、组件中导入顺序 |
| 响应式 | ref 优先、reactive 转 ref、computed 规范、try/catch 包裹 |
| 监听 | watch 深度/立即、清理资源、与 computed 选择策略 |
| 网络请求 | async/await、统一响应解构、错误处理、安全规范 |
| 代码风格 | Prettier 配置、箭头函数优先 |
| 注释 | 模板/脚本/样式注释格式、注释保护原则 |
| CSS/BEM | BEM 命名、scoped 优先、响应式适配、自定义指令 |
| TypeScript | 禁止 any / as any / @ts-ignore、类型注解规范、import type |
| 性能 | 懒加载、KeepAlive、虚拟滚动、防抖节流、图片优化 |
| 约束清单 | 10 项禁止、5 项推荐、2 项不推荐、注意事项 |
