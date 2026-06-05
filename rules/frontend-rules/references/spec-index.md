---
title: 前端规范总纲索引
version: 2.1.0
lastUpdated: 2026-06-03
priority: 🔴 基础规范（必读）
maintainer: bulls-cows team
---

# 通用前端项目开发规范总纲（索引）

> 本规范是前端开发的权威索引，整合通用前端最佳实践与各框架特定规范，按三级优先级体系组织，所有规则均有详细文档说明和示例。
>
> 适用范围与目录约束详见 [@rules/frontend-rules/RULE.md](../RULE.md#适用范围)。

## 使用说明

### 优先级体系

| 优先级   | 标识 | 执行要求     | 违反后果                           |
| -------- | ---- | ------------ | ---------------------------------- |
| 基础规范 | 🔴   | **强制执行** | 会导致代码缺陷、安全漏洞或架构问题 |
| 强烈推荐 | 🟠   | **必须遵循** | 大幅提升代码质量和团队协作效率     |
| 风格指南 | 🟢   | **建议遵循** | 统一代码风格，降低长期维护成本     |

---

## 规范索引

> 点击规则条目可跳转至详细文档，包含完整规则说明、正反示例和最佳实践。

---

## 🔴 一、基础规范（Essential / 强制执行）

> ❗ 这类规则必须 100% 遵守，违反会直接导致代码缺陷、安全漏洞、架构问题或线上故障。

### 通用

| 规则                 | 详见                                                             | 说明                                                                                         |
| -------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **网络请求规范**     | [network.md](./network.md)                                       | async/await、响应解构、错误处理、防重复提交                                                  |
| **v-html 安全**      | [common-vue-template.md](./common-vue-template.md#三v-html-安全) | 必须用 DOMPurify 过滤 HTML                                                                   |
| **禁止空 catch**     | [network.md](./network.md#三错误处理)                            | 捕获错误后必须记录                                                                           |
| **禁止连续数据解构** | [network.md](./network.md#二响应处理)                            | 禁止 `...data.data`                                                                          |
| **禁止无意义命名**   | [naming.md](./naming.md)                                         | 禁止 `data1`、`temp2`                                                                        |
| **禁止使用 any**     | [common-typescript.md](./common-typescript.md#二禁用-any)        | 使用 unknown/Record/具体类型替代                                                             |
| **Hooks 调用规则**   | [react/hooks.md](./react/hooks.md#二hooks-调用规则)              | 仅在组件顶层或自定义 Hook 中调用，禁止条件/循环中调用（React 强制；Vue3 详见 vue3/hooks.md） |

### Vue2

| 规则                      | 详见                                                                    | 说明                                                              |
| ------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **必须使用 Options API**  | [vue2/overview.md](./vue2/overview.md)                                  | 使用 `data()`, `methods`, `computed`, `watch`, 生命周期钩子       |
| **组件 name 声明**        | [vue2/component-dev.md](./vue2/component-dev.md)                        | 组件必须声明 `name` 选项                                          |
| **v-for 与 key**          | [common-vue-template.md](./common-vue-template.md#一v-for-与-key)       | 唯一 ID 作为 key，禁止使用 index                                  |
| **v-if 与 v-for 冲突**    | [common-vue-template.md](./common-vue-template.md#二v-if-与-v-for-冲突) | 禁止同时使用在同一个元素上                                        |
| **数据修改限制**          | [vue2/interaction.md](./vue2/interaction.md#3-使用限制)                 | 禁止修改 props、禁止父组件直接修改子组件内部状态                  |
| **禁止 $parent 链式访问** | [vue2/interaction.md](./vue2/interaction.md#五禁用-parentchildren)      | 禁止 `$parent.$parent`                                            |
| **Vue2 响应式陷阱**       | [vue2/reactivity.md](./vue2/reactivity.md)                              | 新增对象属性用 `$set`、数组索引赋值用 `$set`、数组长度用 `splice` |

### Vue3

| 规则                          | 详见                                                                    | 说明                                             |
| ----------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| **必须使用 `<script setup>`** | [vue3/overview.md](./vue3/overview.md)                                  | 禁止使用 Options API 写法                        |
| **Props 定义规范**            | [vue3/interaction.md](./vue3/interaction.md#一props-定义规范)           | 类型注解、v-model 兼容、使用限制                 |
| **数据修改限制**              | [vue3/interaction.md](./vue3/interaction.md#3-使用限制)                 | 禁止修改 props、禁止父组件直接修改子组件内部状态 |
| **v-for 与 key**              | [common-vue-template.md](./common-vue-template.md#一v-for-与-key)       | 唯一 ID 作为 key，禁止使用 index                 |
| **v-if 与 v-for 冲突**        | [common-vue-template.md](./common-vue-template.md#二v-if-与-v-for-冲突) | 禁止同时使用在同一个元素上                       |
| **禁止使用 any**              | [common-typescript.md](./common-typescript.md#二禁用-any)               | 使用 unknown/Record/具体类型替代                 |

### React

| 规则                   | 详见                                                        | 说明                                                  |
| ---------------------- | ----------------------------------------------------------- | ----------------------------------------------------- |
| **必须使用函数组件**   | [react/overview.md](./react/overview.md)                    | 禁止使用 Class 组件                                   |
| **Props 单向数据流**   | [react/interaction.md](./react/interaction.md#一props-规范) | 禁止修改 props、参数解构、默认值、布尔简写            |
| **Hooks 调用规则**     | [react/hooks.md](./react/hooks.md#二hooks-调用规则)         | 仅在组件顶层或自定义 Hook 中调用，禁止条件/循环中调用 |
| **key 使用规范**       | [react/jsx.md](./react/jsx.md)                              | 列表渲染必须使用唯一 key，禁止使用 index              |
| **禁止直接修改 state** | [react/state.md](./react/state.md)                          | 使用 setState/useState 更新函数                       |
| **禁止使用 any**       | [common-typescript.md](./common-typescript.md#二禁用-any)   | 使用 unknown/Record/具体类型替代                      |

---

## 🟠 二、强烈推荐（Strongly Recommended / 必须遵循）

> ⚠️ 这类规则能显著提升代码可读性、可维护性和团队协作效率，无特殊理由必须遵守。

### 通用

| 规则                       | 详见                                  | 说明                                            |
| -------------------------- | ------------------------------------- | ----------------------------------------------- |
| **文件与标识符命名**       | [naming.md](./naming.md)              | 组件、文件、API、事件、常量、布尔值、CSS BEM 等 |
| **响应处理**               | [network.md](./network.md#二响应处理) | 单次解构、先判断成功后使用数据                  |
| **Hooks 命名/抽离/返回值** | [common-hooks.md](./common-hooks.md)  | use 开头、30 行/2 组件抽离、返回对象            |

### Vue2

| 规则                     | 详见                                                              | 说明                                                      |
| ------------------------ | ----------------------------------------------------------------- | --------------------------------------------------------- |
| **SFC 块顺序与脚本结构** | [vue2/order.md](./vue2/order.md)                                  | 模板/脚本/样式顺序、Options API 内部 8 段结构             |
| **Import 分组**          | [vue2/order.md](./vue2/order.md#三import-分组通用-4-组)           | 通用 4 组分组（外部/类型/全局/相对），组内按字母          |
| **组件交互与通信**       | [vue2/interaction.md](./vue2/interaction.md)                      | Props 定义、Emit 事件白名单、`$refs` 访问、provide/inject |
| **模板属性顺序**         | [common-vue-template.md](./common-vue-template.md#六模板属性顺序) | HTML 元素上属性的统一排列顺序（Vue2 沿用 8 步）           |

### Vue3

| 规则                                | 详见                                                              | 说明                                                       |
| ----------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- |
| **ref/reactive/computed 原则**      | [vue3/reactivity.md](./vue3/reactivity.md)                        | ref/reactive 选择原则、reactive 转 ref 规则、computed 规范 |
| **watch 规范**                      | [vue3/watch.md](./vue3/watch.md)                                  | watch/watchEffect 使用规范、清理机制、与 computed 选择策略 |
| **Hooks Vue3 特有差异**             | [vue3/hooks.md](./vue3/hooks.md)                                  | setup 限制、toRefs、内置 Hooks                             |
| **`<script setup>` 结构与代码组织** | [vue3/order.md](./vue3/order.md)                                  | SFC 块顺序、Import 分组、脚本内部声明顺序                  |
| **模板属性顺序**                    | [common-vue-template.md](./common-vue-template.md#六模板属性顺序) | HTML 元素上属性的统一排列顺序（Vue3 追加第 9 步 v-slot）   |
| **组件交互与通信**                  | [vue3/interaction.md](./vue3/interaction.md)                      | Props、v-model 兼容、Emit 事件白名单、defineExpose         |

### React

| 规则                   | 详见                                           | 说明                                                              |
| ---------------------- | ---------------------------------------------- | ----------------------------------------------------------------- |
| **组件结构与代码组织** | [react/order.md](./react/order.md)             | 文件结构、组件内部顺序、Import 分组（4 组）、JSX 属性顺序         |
| **组件交互与通信**     | [react/interaction.md](./react/interaction.md) | 回调命名、状态提升、Context、Render Props、状态管理选型、事件总线 |
| **Hooks React 特有**   | [react/hooks.md](./react/hooks.md)             | 调用规则、内置 Hooks、useCallback                                 |
| **状态管理**           | [react/state.md](./react/state.md)             | useState/useReducer/Context 选择与使用                            |

---

## 🟢 三、风格指南（Recommended / 建议遵循）

> 💡 当存在多种同等有效的实践时，选择本指南推荐的方式并保持团队一致，大幅降低代码理解成本。

### 通用

| 规则                 | 详见                               | 说明                                            |
| -------------------- | ---------------------------------- | ----------------------------------------------- |
| **格式化与工具链**   | [code-style.md](./code-style.md)   | Prettier 配置、函数写法偏好                     |
| **注释规范**         | [comments.md](./comments.md)       | 模板区、脚本区、样式区注释格式，注释保护原则    |
| **样式命名与作用域** | [css.md](./css.md)                 | BEM 规范、`scoped` 优先、全局样式标注、兼容性   |
| **性能优化**         | [performance.md](./performance.md) | 懒加载、KeepAlive、虚拟滚动、防抖节流、图片优化 |
| **约束清单**         | [constraints.md](./constraints.md) | 禁止/推荐/不推荐/注意事项速查                   |

### Vue2

| 规则                        | 详见                                                          | 说明                                         |
| --------------------------- | ------------------------------------------------------------- | -------------------------------------------- |
| **Vue2 特有规则: computed** | [vue2/reactivity.md](./vue2/reactivity.md)                    | computed 优先、try/catch 包裹                |
| **指令简写**                | [common-vue-template.md](./common-vue-template.md#四指令简写) | `v-bind` → `:`、`v-on` → `@`、`v-slot` → `#` |

### Vue3

| 规则                    | 详见                                                            | 说明                                              |
| ----------------------- | --------------------------------------------------------------- | ------------------------------------------------- |
| **TypeScript 类型注解** | [vue3/typescript.md](./vue3/typescript.md)                      | defineProps/ref/reactive/Emits 泛型               |
| **TypeScript 约束**     | [common-typescript.md](./common-typescript.md#六类型压制不推荐) | 不推荐 `as any`、`@ts-ignore`、`@ts-expect-error` |
| **指令简写**            | [common-vue-template.md](./common-vue-template.md#四指令简写)   | `v-bind` → `:`、`v-on` → `@`、`v-slot` → `#`      |

### React

| 规则                    | 详见                                                            | 说明                                              |
| ----------------------- | --------------------------------------------------------------- | ------------------------------------------------- |
| **TypeScript 类型注解** | [react/typescript.md](./react/typescript.md)                    | Props、useState、useRef、事件、泛型组件           |
| **TypeScript 约束**     | [common-typescript.md](./common-typescript.md#六类型压制不推荐) | 不推荐 `as any`、`@ts-ignore`、`@ts-expect-error` |
| **JSX 规范**            | [react/jsx.md](./react/jsx.md)                                  | 条件渲染、列表渲染、事件处理、属性传递            |

---

## 🤖 AI 行为约束（🔴 强制执行）

> 所有 AI 辅助开发必须遵守以下约束，避免破坏代码质量和项目规范：

- **[ai-behavior.md](./ai-behavior.md)** — 完整 AI 行为约束文档，包含修改权限红线、文档生成规则、代码审查标准、输出格式要求

---

## 📝 维护说明

- 本索引会随规范迭代自动更新，无需手动修改
- 若有规则缺失或建议，请提交 Issue 到 [GitHub 仓库](https://github.com/bulls-cows/skills)
- 贡献规范前请阅读 [开发者须知](../../../docs/DEVELOP.md)
