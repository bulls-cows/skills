---
description: 通用前端项目开发规范与架构指南
alwaysApply: true
version: 2.0.0
lastUpdated: 2026-06-03
maintainer: bulls-cows team
---

# 通用前端项目开发规范

> 本规范是前端开发的权威指南，覆盖代码质量、安全、性能、可维护性等全维度要求，适用于所有前端项目。
> 规范采用三级优先级体系，强制执行基础规范，推荐采用最佳实践，鼓励灵活使用风格指南。

## 📖 使用指南

### 优先级说明

1. **基础规范（Essential）**：强制执行，违反会导致代码缺陷、安全漏洞或架构问题
2. **强烈推荐（Strongly Recommended）**：必须遵循，大幅提升代码质量和团队协作效率
3. **风格指南（Recommended）**：建议遵循，统一代码风格，降低维护成本

### 引用方式

- 全量引用：直接引用本规则文件，自动包含所有子模块规范
- 按需引用：根据项目技术栈引用对应框架的特定规则：
  - Vue2 项目：使用 [@rules/frontend-rules-vue2](../frontend-rules-vue2/RULE.md)
  - Vue3 项目：使用 [@rules/frontend-rules-vue3](../frontend-rules-vue3/RULE.md)
  - 多框架项目：直接使用本通用规则

### 与其他规则的关系

- 本规则优先于通用 [Markdown 规范](../markdown/RULE.md)、[文本表达规范](../text/RULE.md) 中与前端相关的内容
- 若存在冲突，以本规则为准
- 所有前端项目需同时遵守 [文件修改范围限制规范](../file-scope-limit/RULE.md)

---

## 🏗️ 规范结构

本规则已拆分为独立子模块，各模块独立维护，按需引用：

### 总纲索引

- **[@rules/frontend-rules/references/spec-index.md](./references/spec-index.md)** — 规范总纲（必读，按优先级分级索引所有模块，包含完整的规则说明和示例）

### AI 行为约束

- **[@rules/frontend-rules/references/ai-behavior.md](./references/ai-behavior.md)** — AI 行为与交互约束（修改权限红线、文档生成约束、直接输出规则、代码审查标准）

---

## 🎯 通用规范（适用于所有前端框架）

### 🔴 基础规范（Essential - 强制执行）

- **[@rules/frontend-rules/references/network.md](./references/network.md)** — 网络请求与安全（async/await 规范、错误处理、防重复提交、敏感信息保护、跨域处理）
- **[@rules/frontend-rules/references/constraints.md](./references/constraints.md)** — 约束清单速查（明确禁止/推荐/不推荐/注意事项，开发前必读）

### 🟠 强烈推荐（Strongly Recommended - 必须遵循）

- **[@rules/frontend-rules/references/naming.md](./references/naming.md)** — 架构与命名规范（文件/组件/API/事件/常量/布尔值/BEM 命名统一标准）
- **[@rules/frontend-rules/references/performance.md](./references/performance.md)** — 性能优化规范（懒加载、KeepAlive、虚拟滚动、防抖节流、图片优化、包体积控制）
- **[@rules/frontend-rules/references/css.md](./references/css.md)** — CSS 样式规范（BEM 命名、作用域管理、布局最佳实践、兼容性指南）

### 🟢 风格指南（Recommended - 建议遵循）

- **[@rules/frontend-rules/references/code-style.md](./references/code-style.md)** — 代码风格与 Prettier 配置（统一代码格式，减少 diff 冲突）
- **[@rules/frontend-rules/references/comments.md](./references/comments.md)** — 注释规范（模板/脚本/样式区注释格式、注释保护原则、JSDoc 标准）

---

## 🧩 框架特定规范（仅适用于对应框架项目）

### Vue2

- **[@rules/frontend-rules/references/vue2/overview.md](./references/vue2/overview.md)** — Vue2 概述与适用范围
- **[@rules/frontend-rules/references/vue2/component-dev.md](./references/vue2/component-dev.md)** — Vue2 组件开发规范（Options API 最佳实践）
- **[@rules/frontend-rules/references/vue2/interaction.md](./references/vue2/interaction.md)** — Vue2 组件交互与通信（Props/Emit/$refs/provide/inject 使用规范）
- **[@rules/frontend-rules/references/vue2/directives.md](./references/vue2/directives.md)** — Vue2 模板指令规范（v-for/key/v-if/v-html/属性顺序要求）
- **[@rules/frontend-rules/references/vue2/order.md](./references/vue2/order.md)** — Vue2 SFC 结构顺序与导入分组（3 组结构标准）
- **[@rules/frontend-rules/references/vue2/reactivity.md](./references/vue2/reactivity.md)** — Vue2 响应式陷阱（$set/数组/对象更新避坑指南）

### Vue3

- **[@rules/frontend-rules/references/vue3/overview.md](./references/vue3/overview.md)** — Vue3 概述与适用范围
- **[@rules/frontend-rules/references/vue3/component-dev.md](./references/vue3/component-dev.md)** — Vue3 组件开发规范（script setup 最佳实践）
- **[@rules/frontend-rules/references/vue3/interaction.md](./references/vue3/interaction.md)** — Vue3 组件交互与通信（defineProps/defineEmits/defineExpose 使用规范）
- **[@rules/frontend-rules/references/vue3/directives.md](./references/vue3/directives.md)** — Vue3 模板指令规范
- **[@rules/frontend-rules/references/vue3/order.md](./references/vue3/order.md)** — Vue3 SFC 结构顺序与导入分组（4 组结构标准）
- **[@rules/frontend-rules/references/vue3/reactivity.md](./references/vue3/reactivity.md)** — Vue3 响应式状态管理（ref/reactive/computed 使用规范）
- **[@rules/frontend-rules/references/vue3/watch.md](./references/vue3/watch.md)** — Vue3 watch/watchEffect 监听规范
- **[@rules/frontend-rules/references/vue3/hooks.md](./references/vue3/hooks.md)** — Vue3 Hooks 组合式函数规范
- **[@rules/frontend-rules/references/vue3/typescript.md](./references/vue3/typescript.md)** — Vue3 TypeScript 类型注解规范

### React

- **[@rules/frontend-rules/references/react/overview.md](./references/react/overview.md)** — React 概述与适用范围
- **[@rules/frontend-rules/references/react/component-dev.md](./references/react/component-dev.md)** — React 组件开发规范（函数组件最佳实践）
- **[@rules/frontend-rules/references/react/hooks.md](./references/react/hooks.md)** — React Hooks 规范
- **[@rules/frontend-rules/references/react/state.md](./references/react/state.md)** — React 状态管理
- **[@rules/frontend-rules/references/react/jsx.md](./references/react/jsx.md)** — React JSX 规范
- **[@rules/frontend-rules/references/react/typescript.md](./references/react/typescript.md)** — React TypeScript 规范

---

## 🎯 适用范围

| 适用场景    | 说明                                                                        |
| ----------- | --------------------------------------------------------------------------- |
| ✅ 适用     | 所有 `src` 目录下的前端源文件（.js/.ts/.vue/.jsx/.tsx/.css/.scss/.less 等） |
| ✅ 适用     | 前端项目的文档、配置文件、测试用例                                          |
| ❌ 不适用   | 后端代码、移动端原生代码、配置文件中与前端无关的部分                        |
| ⚠️ 部分适用 | 第三方依赖修改、补丁文件（需遵循对应依赖的规范）                            |

### 目录约束

- 仅允许操作 `src` 目录下的文件
- 若需修改其他目录文件，需在 [文件修改范围限制规范](../file-scope-limit/RULE.md) 中明确授权

---

## ⚡ 快速导航

| 分类    | 模块     | 核心内容                                                          | 优先级         |
| ------- | -------- | ----------------------------------------------------------------- | -------------- |
| 总纲    | 规范总纲 | 三级优先级索引（基础/强烈推荐/风格指南），通用 + 框架特定分列     | 🔴 基础        |
| AI 约束 | AI 行为  | 修改权限红线、文档生成约束、代码审查标准                          | 🔴 基础        |
| 通用    | 网络请求 | async/await、单次解构、防重复提交、安全规范、错误处理             | 🔴 基础        |
| 通用    | 约束清单 | 禁止项/推荐项/不推荐项/注意事项速查                               | 🔴 基础        |
| 通用    | 命名规范 | 文件/组件/API/事件/常量/布尔值/BEM 统一标准                       | 🟠 强烈推荐    |
| 通用    | 性能优化 | 懒加载、KeepAlive、虚拟滚动、防抖节流、图片优化、包体积控制       | 🟠 强烈推荐    |
| 通用    | CSS 样式 | BEM 命名、scoped 优先、布局推荐、兼容性指南                       | 🟠 强烈推荐    |
| 通用    | 代码风格 | Prettier 配置、箭头函数优先、导入排序                             | 🟢 推荐        |
| 通用    | 注释规范 | 模板/脚本/样式区注释格式、注释保护原则、JSDoc 标准                | 🟢 推荐        |
| 框架    | Vue2     | Options API 组件开发、交互通信、模板指令、代码组织、响应式陷阱    | 按子模块优先级 |
| 框架    | Vue3     | script setup 组件开发、交互通信、响应式、watch、Hooks、TypeScript | 按子模块优先级 |
| 框架    | React    | 函数组件开发、Hooks、状态管理、JSX、TypeScript                    | 按子模块优先级 |

---

## 📝 维护说明

- 本规范持续迭代，每次更新会同步升级版本号
- 若有疑问或建议，请提交 Issue 到 [GitHub 仓库](https://github.com/bulls-cows/skills)
- 贡献代码前请阅读 [开发者须知](../../docs/DEVELOP.md)
