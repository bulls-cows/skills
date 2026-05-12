---
description: Vue2 前端项目开发规范与架构指南
alwaysApply: true
---

# Vue2 前端项目开发规范

本规则已拆分为以下子模块，各模块独立维护，按需引用：

## 总纲索引

- **[@rules/frontend-rules-vue2/references/spec-index.md](./references/spec-index.md)** — 规范总纲（必读，按优先级分级索引所有模块）

## AI 行为约束

- **[@rules/frontend-rules-vue2/references/ai-behavior.md](./references/ai-behavior.md)** — AI 行为与交互约束（修改权限/文档生成约束/直接输出规则）

## 基础规范（Essential）

- **[@rules/frontend-rules-vue2/references/component-dev.md](./references/component-dev.md)** — Vue2 组件开发规范（Options API 风格）
- **[@rules/frontend-rules-vue2/references/interaction.md](./references/interaction.md)** — 组件交互与通信（Props/Emit/$refs/provide/inject）
- **[@rules/frontend-rules-vue2/references/directives.md](./references/directives.md)** — 模板指令规范（v-for/key/v-if/v-html/属性顺序）

## 强烈推荐（Strongly Recommended）

- **[@rules/frontend-rules-vue2/references/naming.md](./references/naming.md)** — 架构与命名规范（文件/组件/API/事件/常量/BEM）
- **[@rules/frontend-rules-vue2/references/order.md](./references/order.md)** — SFC 结构顺序与导入分组（3 组）
- **[@rules/frontend-rules-vue2/references/network.md](./references/network.md)** — 网络请求与安全（async/await/错误处理/安全约束）

## 风格指南（Recommended）

- **[@rules/frontend-rules-vue2/references/code-style.md](./references/code-style.md)** — 代码风格与 Prettier 配置
- **[@rules/frontend-rules-vue2/references/comments.md](./references/comments.md)** — 注释规范（模板/脚本/样式/保护原则）
- **[@rules/frontend-rules-vue2/references/css.md](./references/css.md)** — CSS 样式规范（BEM 命名/作用域/响应式适配）
- **[@rules/frontend-rules-vue2/references/performance.md](./references/performance.md)** — 性能优化规范（懒加载/KeepAlive/虚拟滚动/防抖节流）
- **[@rules/frontend-rules-vue2/references/constraints.md](./references/constraints.md)** — 约束清单速查（禁止/推荐/不推荐/注意事项）

## 适用范围

- 所有 `src` 目录下的 `.vue`、`.js`、`.css`、`.scss`、`.less` 文件
- 目录约束：仅允许操作 `src` 目录下的文件
- 适用于 Vue2 单文件组件的模板区、脚本区、样式区
- 使用 **Options API**（`data()`, `methods`, `computed`, `watch`, 生命周期钩子）

## 快速导航

| 模块 | 核心内容 |
|------|----------|
| 规范总纲 | 三级优先级索引（基础/强烈推荐/风格指南） |
| 组件开发 | Options API 结构、`name` 声明、JSDoc、元素顺序、方法职责、页面拆分 |
| 交互通信 | Props 定义、Emit 白名单、`$refs` 访问、provide/inject、禁用 `$parent` |
| 模板指令 | v-for/key、v-if 冲突、v-html 安全、指令简写、属性顺序 |
| 结构顺序 | 3 组 import 排序、`<script>` 内部 8 段 Options 结构 |
| 命名规范 | 文件/组件/API/事件/常量/布尔值/BEM |
| 网络请求 | async/await、单次解构、防重复提交、安全规范、`==` 偏好 |
| 代码风格 | Prettier 配置、箭头函数优先 |
| 注释规范 | 模板/脚本/样式区注释格式、注释保护原则 |
| CSS 样式 | BEM 命名、`scoped` 优先、全局样式标注 |
| 性能优化 | 懒加载、KeepAlive、虚拟滚动、防抖节流、$set 响应式陷阱 |
| 约束清单 | 禁止项/推荐项/注意事项速查表 |
| AI 行为约束 | 修改权限红线、文档生成约束 |
