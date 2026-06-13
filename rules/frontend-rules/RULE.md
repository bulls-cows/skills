---
description: 通用前端项目开发规范与架构指南
alwaysApply: true
version: 2.1.0
lastUpdated: 2026-06-03
maintainer: bulls-cows team
---

# 通用前端项目开发规范

> 本规范是前端开发的权威指南，覆盖代码质量、安全、性能、可维护性等全维度要求，适用于所有前端项目。
> 规范采用三级优先级体系：🔴 基础规范（强制执行）、🟠 强烈推荐（必须遵循）、🟢 风格指南（鼓励灵活使用）。

## 引用方式

- Vue2 项目：本规则 + [@rules/frontend-rules-vue2](../frontend-rules-vue2/RULE.md)
- Vue3 项目：本规则 + [@rules/frontend-rules-vue3](../frontend-rules-vue3/RULE.md)
- 其他场景（多框架、无框架、未限定框架）：仅使用本规则，按需引用对应框架子模块

## 子模块索引

### 总纲与 AI 行为约束

- [@rules/frontend-rules/references/spec-index.md](./references/spec-index.md) — 规范总纲（按优先级分级索引所有规则）
- [@rules/frontend-rules/references/ai-behavior.md](./references/ai-behavior.md) — AI 行为约束（修改红线、文档生成、代码审查标准）

### 跨框架通用规则

- [@rules/frontend-rules/references/common-vue-template.md](./references/common-vue-template.md) — Vue 模板通用规则（Vue2/Vue3 共享：v-for/key、v-if 冲突、v-html、指令简写、属性顺序）
- [@rules/frontend-rules/references/common-hooks.md](./references/common-hooks.md) — Hooks 通用规范（Vue3/React 共享：命名、文件组织、抽离建议、返回值、注释）
- [@rules/frontend-rules/references/common-typescript.md](./references/common-typescript.md) — TypeScript 通用规范（Vue3/React 共享：类型注解、禁用 any、import type、类型文件组织）

### 通用规范（跨框架）

🔴 基础规范（强制执行）：

- [@rules/frontend-rules/references/network.md](./references/network.md) — 网络请求与安全（async/await、错误处理、防重复提交、敏感信息保护）
- [@rules/frontend-rules/references/constraints.md](./references/constraints.md) — 约束清单速查（禁止项、推荐项、注意事项）

🟠 强烈推荐（必须遵循）：

- [@rules/frontend-rules/references/naming.md](./references/naming.md) — 架构与命名（文件、组件、API、事件、常量、布尔值、BEM）
- [@rules/frontend-rules/references/performance.md](./references/performance.md) — 性能优化（懒加载、KeepAlive、虚拟滚动、防抖节流、包体积）
- [@rules/frontend-rules/references/css.md](./references/css.md) — CSS 样式（BEM 命名、作用域管理、布局、兼容性）

🟢 风格指南（建议遵循）：

- [@rules/frontend-rules/references/code-style.md](./references/code-style.md) — 代码风格与 Prettier 配置
- [@rules/frontend-rules/references/comments.md](./references/comments.md) — 注释规范（模板/脚本/样式区、JSDoc）

### 框架特定规范

Vue2（Options API）：

- [@rules/frontend-rules/references/vue2/overview.md](./references/vue2/overview.md) — 概述与适用范围
- [@rules/frontend-rules/references/vue2/component-dev.md](./references/vue2/component-dev.md) — 组件开发规范
- [@rules/frontend-rules/references/vue2/interaction.md](./references/vue2/interaction.md) — 组件交互与通信（Props/Emit/$refs/provide/inject）
- [@rules/frontend-rules/references/vue2/directives.md](./references/vue2/directives.md) — 模板指令规范（Vue2 特有差异）
- [@rules/frontend-rules/references/vue2/order.md](./references/vue2/order.md) — SFC 结构顺序与导入分组（通用 4 组）
- [@rules/frontend-rules/references/vue2/reactivity.md](./references/vue2/reactivity.md) — 响应式陷阱与避坑

Vue3（Composition API）：

- [@rules/frontend-rules/references/vue3/overview.md](./references/vue3/overview.md) — 概述与适用范围
- [@rules/frontend-rules/references/vue3/component-dev.md](./references/vue3/component-dev.md) — 组件开发规范（`<script setup>`）
- [@rules/frontend-rules/references/vue3/interaction.md](./references/vue3/interaction.md) — 组件交互与通信（defineProps/defineEmits/defineExpose）
- [@rules/frontend-rules/references/vue3/directives.md](./references/vue3/directives.md) — 模板指令规范（Vue3 特有差异）
- [@rules/frontend-rules/references/vue3/order.md](./references/vue3/order.md) — SFC 结构顺序与导入分组（4 组）
- [@rules/frontend-rules/references/vue3/reactivity.md](./references/vue3/reactivity.md) — 响应式状态管理（ref/reactive/computed）
- [@rules/frontend-rules/references/vue3/watch.md](./references/vue3/watch.md) — watch/watchEffect 监听规范
- [@rules/frontend-rules/references/vue3/hooks.md](./references/vue3/hooks.md) — Hooks 组合式函数规范（Vue3 特有差异）
- [@rules/frontend-rules/references/vue3/typescript.md](./references/vue3/typescript.md) — TypeScript 规范（Vue3 特有差异）

React：

- [@rules/frontend-rules/references/react/overview.md](./references/react/overview.md) — 概述与适用范围
- [@rules/frontend-rules/references/react/component-dev.md](./references/react/component-dev.md) — 函数组件开发规范
- [@rules/frontend-rules/references/react/interaction.md](./references/react/interaction.md) — 组件交互与通信（Props/回调/状态提升/Context/Render Props/状态管理选型/事件总线）
- [@rules/frontend-rules/references/react/order.md](./references/react/order.md) — 文件结构与代码顺序（4 组 Import、JSX 属性顺序）
- [@rules/frontend-rules/references/react/hooks.md](./references/react/hooks.md) — Hooks 规范（调用规则、内置 Hooks）
- [@rules/frontend-rules/references/react/state.md](./references/react/state.md) — 状态管理
- [@rules/frontend-rules/references/react/jsx.md](./references/react/jsx.md) — JSX 规范
- [@rules/frontend-rules/references/react/typescript.md](./references/react/typescript.md) — TypeScript 规范（React 特有差异）

## 适用范围

- ✅ `src` 目录下所有前端源文件（`.js`/`.ts`/`.vue`/`.jsx`/`.tsx`/`.css`/`.scss`/`.less` 等）
- ✅ 前端项目的配置文件、文档、测试用例
- ❌ 后端代码、移动端原生代码、第三方依赖文件
- ⚠️ 文件修改范围遵循 [@rules/file-scope-limit](../file-scope-limit/RULE.md)

## 与其他规则的关系

- 本规则优先于通用 [Markdown 规范](../markdown/RULE.md)、[AI 通用操作规范的文本输出层](../ai-agent-rules/references/text-output.md) 中与前端相关的内容
- 若存在冲突，以本规则为准
