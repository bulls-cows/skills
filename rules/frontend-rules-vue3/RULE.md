---
description: Vue3 前端项目开发规范与架构指南
alwaysApply: true
---

# Vue3 前端项目开发规范

本规则已拆分为以下子模块，各模块独立维护，按需引用：

- [@rules/frontend-rules-vue3/references/ai-behavior.md](./references/ai-behavior.md) — AI 行为与交互约束
- [@rules/frontend-rules-vue3/references/code-style.md](./references/code-style.md) — 代码风格与格式化
- [@rules/frontend-rules-vue3/references/naming.md](./references/naming.md) — 架构与命名规范
- [@rules/frontend-rules-vue3/references/component-dev.md](./references/component-dev.md) — Vue3 组件开发规范
- [@rules/frontend-rules-vue3/references/hooks.md](./references/hooks.md) — Hooks 组合式函数规范
- [@rules/frontend-rules-vue3/references/data-flow.md](./references/data-flow.md) — 数据流与状态管理
- [@rules/frontend-rules-vue3/references/api-security.md](./references/api-security.md) — 网络请求与安全
- [@rules/frontend-rules-vue3/references/css-performance.md](./references/css-performance.md) — CSS 与性能优化
- [@rules/frontend-rules-vue3/references/constraints.md](./references/constraints.md) — 约束清单速查

## 适用范围

- 所有 `src` 目录下的 `.vue`、`.ts`、`.js`、`.css`、`.scss`、`.less` 文件
- 目录约束：仅允许操作 `src` 目录下的文件
- 适用于 Vue3 单文件组件的模板区、`<script setup>` 脚本区、样式区

## 快速导航

| 模块 | 核心内容 |
|------|----------|
| AI 行为 | 修改权限、文档生成约束、直接输出规则 |
| 代码风格 | Prettier 配置、11 组导入顺序、格式化执行 |
| 命名规范 | 文件/组件命名、API/事件/常量、Props/Emit、布尔值、Hooks 命名、provide/inject |
| 组件开发 | `<script setup>` 脚本结构、JSDoc、元素顺序、注释规范、方法职责、页面拆分、defineExpose |
| Hooks 规范 | 命名/返回值/使用规范、抽离建议、组件中导入顺序 |
| 数据流 | ref/reactive/computed、watch、provide/inject、路由守卫、defineExpose |
| 网络请求 | async/await、错误处理、统一响应、安全规范、等于运算符 |
| CSS 与性能 | BEM 命名、样式作用域、性能优化、响应式适配、自定义指令 |
| 约束清单 | 10 项禁止、5 项推荐、2 项不推荐、注意事项 |
