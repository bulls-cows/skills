# Vue3 前端项目开发规范总纲（索引）

> 本规范整合自 `rules/frontend-rules-vue3` 与 `skills/yy-frontend-vue3-code-optimization` 中的规范部分，按优先级重新组织。点击各条目跳转至详细规则文件。

**适用范围**：所有 `src` 目录下的 `.vue`、`.ts`、`.js`、`.css`、`.scss`、`.less` 文件。目录约束：仅允许操作 `src` 目录下的文件。

---

## 一、基础规范（Essential / 必要的）

> 这类规则必须遵守，主要目的是规避错误和潜在的 Bug。

| 规则 | 详见 | 说明 |
|------|------|------|
| **必须使用 `<script setup>`** | `spec-index.md` | 禁止使用 Options API 写法（`data()`, `methods: {}`, `mounted() {}` 等） |
| **Props 定义规范** | [interaction.md](./interaction.md#一props-定义规范) | 类型注解、v-model 兼容、使用限制 |
| **v-for 与 key** | [directives.md](./directives.md#一v-for-与-key) | 唯一 ID 作为 key，禁止使用 index |
| **v-if 与 v-for 冲突** | [directives.md](./directives.md#二v-if-与-v-for-冲突) | 禁止同时使用在同一个元素上 |
| **数据修改限制** | [interaction.md](./interaction.md#13-使用限制) | 禁止修改 props、禁止父组件直接修改子组件内部状态 |
| **v-html 安全** | [directives.md](./directives.md#三v-html-安全) | 必须用 DOMPurify 过滤 HTML |

---

## 二、强烈推荐（Strongly Recommended / 强烈推荐）

> 这类规则能显著改善代码的可读性和开发体验，应尽可能遵守。

| 规则 | 详见 | 说明 |
|------|------|------|
| **`<script setup>` 结构与代码组织** | [order.md](./order.md) | SFC 块顺序、Import 分组、脚本内部声明顺序 |
| **模板属性顺序** | [directives.md](./directives.md#五模板属性顺序) | HTML 元素上属性的统一排列顺序 |
| **文件与标识符命名** | [naming.md](./naming.md) | 组件、文件、API、事件、常量、Boolean、Hooks、TypeScript 类型命名 |
| **Hooks 组合式函数规范** | [hooks.md](./hooks.md) | 命名、返回值、使用方式、抽离建议 |
| **状态管理** | [interaction.md](./interaction.md#四组件间通信) | provide/inject、兄弟组件通信、响应式传递 |
| **组件交互与通信** | [interaction.md](./interaction.md) | Props、v-model 兼容、Emit 事件白名单、defineExpose |
| **ref/reactive/computed 原则** | [reactivity.md](./reactivity.md) | ref/reactive 选择原则、reactive 转 ref 规则、computed 规范 |
| **watch 规范** | [watch.md](./watch.md) | watch/watchEffect 使用规范、清理机制、与 computed 选择策略 |
| **网络请求规范** | [network.md](./network.md) | 异步处理、响应解构、错误处理、防止重复提交 |

---

## 三、风格指南（Recommended / 推荐）

> 当存在多种同样好的实践时，选择一个并保持一致。这有助于团队内部代码风格的统一。

| 规则 | 详见 | 说明 |
|------|------|------|
| **格式化与工具链** | [code-style.md](./code-style.md) | Prettier 配置、箭头函数优先 |
| **指令简写** | [directives.md](./directives.md#四指令简写) | `v-bind` → `:`、`v-on` → `@`、`v-slot` → `#` |
| **注释规范** | [comments.md](./comments.md) | 模板区、脚本区、样式区注释格式，注释保护原则 |
| **样式命名与作用域** | [css.md](./css.md#bem-命名规范) | BEM 规范、`scoped` 优先、全局样式标注 |
| **TypeScript 类型注解** | [typescript.md](./typescript.md) | 禁止 `any`，参数/返回值/变量明确类型 |
| **性能优化** | [performance.md](./performance.md) | 组件懒加载、KeepAlive、虚拟滚动、防抖节流、图片优化 |
| **TypeScript 约束** | [typescript.md](./typescript.md) | 不推荐 `as any`、`@ts-ignore`、`@ts-expect-error` |
| **约束清单** | [constraints.md](./constraints.md) | 禁止/推荐/不推荐/注意事项速查 |

## AI 行为约束

- **[@rules/ai-behavior.md](./ai-behavior.md)** — AI 行为与交互约束（修改权限/文档生成约束/直接输出规则）
