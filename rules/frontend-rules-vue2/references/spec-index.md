# Vue2 前端项目开发规范总纲（索引）

> 本规范整合自 `rules/frontend-rules-vue2` 中的 Vue2 前端规范，按优先级重新组织，基于 Options API 风格。点击各条目跳转至详细规则文件。

**适用范围**：所有 `src` 目录下的 `.vue`、`.js`、`.css`、`.scss`、`.less` 文件。目录约束：仅允许操作 `src` 目录下的文件。

**技术栈**：Vue2 单文件组件，使用 **Options API**（`data()`, `methods`, `computed`, `watch`, 生命周期钩子）。

---

## 一、基础规范（Essential / 必要的）

> 这类规则必须遵守，主要目的是规避错误和潜在的 Bug。

| 规则                      | 详见                                                          | 说明                                                              |
| ------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------- |
| **必须使用 Options API**  | `spec-index.md`                                               | 使用 `data()`, `methods`, `computed`, `watch`, 生命周期钩子       |
| **组件 name 声明**        | [component-dev.md](./component-dev.md#options-api-要求)       | 组件必须声明 `name` 选项                                          |
| **v-for 与 key**          | [directives.md](./directives.md#一v-for-与-key)               | 唯一 ID 作为 key，禁止使用 index                                  |
| **v-if 与 v-for 冲突**    | [directives.md](./directives.md#二v-if-与-v-for-冲突)         | 禁止同时使用在同一个元素上                                        |
| **v-html 安全**           | [directives.md](./directives.md#三v-html-安全)                | 必须用 DOMPurify 过滤 HTML                                        |
| **数据修改限制**          | [interaction.md](./interaction.md#三使用限制)                 | 禁止修改 props、禁止父组件直接修改子组件内部状态                  |
| **禁止 $parent 链式访问** | [interaction.md](./interaction.md#五禁用-parent-and-children) | 禁止 `$parent.$parent`                                            |
| **Vue2 响应式陷阱**       | `spec-index.md`                                               | 新增对象属性用 `$set`、数组索引赋值用 `$set`、数组长度用 `splice` |

---

## 二、强烈推荐（Strongly Recommended / 强烈推荐）

> 这类规则能显著改善代码的可读性和开发体验，应尽可能遵守。

| 规则                     | 详见                                            | 说明                                                      |
| ------------------------ | ----------------------------------------------- | --------------------------------------------------------- |
| **文件与标识符命名**     | [naming.md](./naming.md)                        | 组件、文件、API、事件、常量、布尔值、CSS BEM 等           |
| **SFC 块顺序与脚本结构** | [order.md](./order.md)                          | 模板/脚本/样式顺序、Options API 内部 8 段结构             |
| **Import 分组**          | [order.md](./order.md#二import-分组)            | 3 组分组（外部/全局/相对），组内按字母                    |
| **组件交互与通信**       | [interaction.md](./interaction.md)              | Props 定义、Emit 事件白名单、`$refs` 访问、provide/inject |
| **模板属性顺序**         | [directives.md](./directives.md#五模板属性顺序) | HTML 元素上属性的统一排列顺序                             |
| **网络请求规范**         | [network.md](./network.md)                      | async/await、响应解构、错误处理、防重复提交               |

---

## 三、风格指南（Recommended / 推荐）

> 当存在多种同样好的实践时，选择一个并保持一致。这有助于团队内部代码风格的统一。

| 规则                        | 详见                                        | 说明                                            |
| --------------------------- | ------------------------------------------- | ----------------------------------------------- |
| **Vue2 特有规则: computed** | `spec-index.md`                             | computed 优先、try/catch 包裹                   |
| **Vue2 特有规则: watch**    | `spec-index.md`                             | 按需使用 `deep: true` 和 `immediate: true`      |
| **格式化与工具链**          | [code-style.md](./code-style.md)            | Prettier 配置、函数写法偏好                     |
| **注释规范**                | [comments.md](./comments.md)                | 模板区、脚本区、样式区注释格式，注释保护原则    |
| **指令简写**                | [directives.md](./directives.md#四指令简写) | `v-bind` → `:`、`v-on` → `@`、`v-slot` → `#`    |
| **样式命名与作用域**        | [css.md](./css.md)                          | BEM 规范、`scoped` 优先、全局样式标注           |
| **性能优化**                | [performance.md](./performance.md)          | 懒加载、KeepAlive、虚拟滚动、防抖节流、图片优化 |
| **约束清单**                | [constraints.md](./constraints.md)          | 禁止/推荐/不推荐/注意事项速查                   |

## AI 行为约束

- **[@rules/frontend-rules-vue2/references/ai-behavior.md](./ai-behavior.md)** — AI 行为与交互约束（修改权限/文档生成约束/直接输出规则）
