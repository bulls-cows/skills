---
name: frontend-rules
description: >
  速查并输出前端开发规范的结构化清单（按 通用 / Vue2 / Vue3 / React 四组技术栈分表，
  每条规则标注 🔴 基础 / 🟠 强烈推荐 / 🟢 风格指南 三级优先级）。当用户询问前端编码规范、命名/网络/样式/类型写法、
  Hooks/组件/状态管理最佳实践、性能优化，或需要确认"应该怎么写才对""有什么要求"类问题时使用——
  即使没说"规范"二字也应触发。不用于：代码修改/重构、代码审查、执行 lint/构建命令、生成业务文档。
---

# frontend-rules

按主题、技术栈或优先级检索前端规范，输出结构化清单与文件引用。本规则**只读不写**——读取 `resources/` 下的规范文件并输出指引，不修改任何代码或文件。

## 目录结构

```text
frontend-rules/
├── RULE.md              # 本文件：规范总纲索引 + 检索输出工作流
└── resources/
    ├── ai-behavior.md    # AI 行为约束（红线、代码生成规范）
    ├── common-           # 跨框架通用规则
    ├── vue2-             # Vue2 框架差异
    ├── vue3-             # Vue3 框架差异
    └── react-            # React 框架差异
```

## 适用范围

> `src` 目录下所有前端源文件（`.js`/`.ts`/`.vue`/`.jsx`/`.tsx`/`.css`/`.scss`/`.less` 等）、前端项目的配置文件、文档、测试用例；不含后端代码、移动端原生代码、第三方依赖文件。

## 优先级体系

| 优先级   | 标识 | 执行要求     | 违反后果                           |
| -------- | ---- | ------------ | ---------------------------------- |
| 基础规范 | 🔴   | **强制执行** | 会导致代码缺陷、安全漏洞或架构问题 |
| 强烈推荐 | 🟠   | **必须遵循** | 大幅提升代码质量和团队协作效率     |
| 风格指南 | 🟢   | **建议遵循** | 统一代码风格，降低长期维护成本     |

> 下方各技术栈表格内，规则按 🔴 → 🟠 → 🟢 排序；同一优先级内按主题相邻排列，便于横向查阅。

---

## 规则速查（按技术栈分组）

### 通用

> 跨框架通用规则，适用于 Vue2 / Vue3 / React 及所有前端项目。框架差异文件只承载与通用规范不同的内容，需配合本组规则一起解读。

| 规则                      | 优先级 | 详见                                                                      | 说明                                                                                         |
| ------------------------- | ------ | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **网络请求规范**          | 🔴     | [common-network.md](./resources/common-network.md)                               | async/await、响应解构、错误处理、防重复提交                                                  |
| **v-html 安全**           | 🔴     | [common-vue-template.md](./resources/common-vue-template.md#三v-html-安全)       | 必须用 DOMPurify 过滤 HTML                                                                   |
| **禁止空 catch**          | 🔴     | [common-network.md](./resources/common-network.md#错误处理)                      | 捕获错误后必须记录                                                                           |
| **禁止连续数据解构**      | 🔴     | [common-network.md](./resources/common-network.md#强制原则)                      | 禁止 `...data.data`                                                                          |
| **禁止无意义命名**        | 🔴     | [common-naming.md](./resources/common-naming.md)                                 | 禁止 `data1`、`temp2`                                                                        |
| **禁止使用 any**          | 🔴     | [common-typescript.md](./resources/common-typescript.md#二禁用-any)              | 使用 unknown/Record/具体类型替代                                                             |
| **文件与标识符命名**      | 🟠     | [common-naming.md](./resources/common-naming.md)                                 | 组件、文件、API、事件、常量、布尔值、CSS BEM 等                                              |
| **响应处理**              | 🟠     | [common-network.md](./resources/common-network.md#强制原则)                      | 单次解构、先判断成功后使用数据                                                               |
| **Hooks 命名/抽离/返回值** | 🟠     | [common-hooks.md](./resources/common-hooks.md)                                   | use 开头、30 行/2 组件抽离、返回对象                                                         |
| **格式化与工具链**        | 🟢     | [common-code-style.md](./resources/common-code-style.md)                         | Prettier 配置、函数写法偏好                                                                  |
| **注释规范**              | 🟢     | [common-comments.md](./resources/common-comments.md)                             | 模板区、脚本区、样式区注释格式，注释保护原则                                                 |
| **样式命名与作用域**      | 🟢     | [common-css.md](./resources/common-css.md)                                       | BEM 规范、局部作用域优先、全局样式标注、兼容性、作用域穿透（Vue2/Vue3/React）                |
| **性能优化**              | 🟢     | [common-performance.md](./resources/common-performance.md)                       | 懒加载、KeepAlive、虚拟滚动、防抖节流、图片优化                                              |
| **约束清单**              | 🟢     | [common-constraints.md](./resources/common-constraints.md)                       | 禁止/推荐/不推荐/注意事项速查                                                                |

### Vue2

> Options API + `this.$set` 时代。Vue2 沿用通用规则，本表仅列出 Vue2 框架差异与特有约束。

| 规则                      | 优先级 | 详见                                                                      | 说明                                                                   |
| ------------------------- | ------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **必须使用 Options API**  | 🔴     | [vue2-overview.md](./resources/vue2-overview.md)                          | 使用 `data()`, `methods`, `computed`, `watch`, 生命周期钩子            |
| **组件 name 声明**        | 🔴     | [vue2-component-dev.md](./resources/vue2-component-dev.md)                | 组件必须声明 `name` 选项                                               |
| **v-for 与 key**          | 🔴     | [common-vue-template.md](./resources/common-vue-template.md#一v-for-与-key)      | 唯一 ID 作为 key，禁止使用 index                                       |
| **v-if 与 v-for 冲突**    | 🔴     | [common-vue-template.md](./resources/common-vue-template.md#二v-if-与-v-for-冲突) | 禁止同时使用在同一个元素上                                            |
| **数据修改限制**          | 🔴     | [vue2-interaction.md](./resources/vue2-interaction.md#3-使用限制)         | 禁止修改 props、禁止父组件直接修改子组件内部状态                       |
| **禁止 $parent 链式访问** | 🔴     | [vue2-interaction.md](./resources/vue2-interaction.md#五禁用-parentchildren) | 禁止 `$parent.$parent`                                                 |
| **Vue2 响应式陷阱**       | 🔴     | [vue2-reactivity.md](./resources/vue2-reactivity.md)                      | 新增对象属性用 `$set`、数组索引赋值用 `$set`、数组长度用 `splice`      |
| **$nextTick 强制**        | 🔴     | [common-constraints.md](./resources/common-constraints.md#一绝对禁止项100-必须遵守) | DOM 更新操作必须用 `$nextTick`，禁止 setTimeout 替代                  |
| **SFC 块顺序与脚本结构**  | 🟠     | [vue2-order.md](./resources/vue2-order.md)                                | 模板/脚本/样式顺序、Options API 内部 8 段结构                          |
| **Import 分组**           | 🟠     | [vue2-order.md](./resources/vue2-order.md#三import-分组)                  | 通用 4 组分组（外部/类型/全局/相对），组内按字母                       |
| **组件交互与通信**        | 🟠     | [vue2-interaction.md](./resources/vue2-interaction.md)                    | Props 定义、Emit 事件白名单、`$refs` 访问、provide/inject             |
| **模板属性顺序**          | 🟠     | [common-vue-template.md](./resources/common-vue-template.md#六模板属性顺序)      | HTML 元素上属性的统一排列顺序（Vue2 沿用 8 步）                        |
| **方法函数规范**          | 🟠     | [common-constraints.md](./resources/common-constraints.md#四方法函数规范强制)    | 前置参数校验 + try-catch 错误保底                                      |
| **watch 规范**            | 🟠     | [common-vue-watch.md](./resources/common-vue-watch.md)                    | watch 通用规范（Vue2 特有写法见 vue2-watch.md）、清理机制、与 computed 选择策略 |
| **Vue2 网络请求**         | 🟠     | [common-network.md](./resources/common-network.md#一网络请求处理规范)  | Options API 写法、loading 互斥锁                                        |
| **Vue2 响应式陷阱进阶**   | 🟢     | [vue2-reactivity.md](./resources/vue2-reactivity.md)                      | `$set`/数组索引/数组长度修改的三类陷阱与速查表                         |
| **Vue2 约束（并入通用）** | 🟢     | [common-constraints.md](./resources/common-constraints.md)                       | 禁止项/推荐项/方法规范/过滤器（Vue2 特有）                             |
| **指令简写**              | 🟢     | [common-vue-template.md](./resources/common-vue-template.md#四指令简写)          | `v-bind` → `:`、`v-on` → `@`、`v-slot` → `#`                           |
| **Vue2 指令钩子**         | 🟢     | [vue2-directives.md](./resources/vue2-directives.md)                      | Vue2 指令钩子（`inserted`/`unbind`）、与 Vue3 命名差异                 |

### Vue3

> `<script setup>` + Composition API + 响应式 API 时代。Vue3 沿用通用规则，本表仅列出 Vue3 框架差异与特有约束。

| 规则                              | 优先级 | 详见                                                                      | 说明                                                                   |
| --------------------------------- | ------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **必须使用 `<script setup>`**     | 🔴     | [vue3-overview.md](./resources/vue3-overview.md)                          | 禁止使用 Options API 写法                                              |
| **Props 定义规范**                | 🔴     | [vue3-interaction.md](./resources/vue3-interaction.md#一props-定义规范)   | 类型注解、v-model 兼容、使用限制                                       |
| **数据修改限制**                  | 🔴     | [vue3-interaction.md](./resources/vue3-interaction.md#3-使用限制)         | 禁止修改 props、禁止父组件直接修改子组件内部状态                       |
| **Hooks 调用规则**                | 🔴     | [common-hooks.md](./resources/common-hooks.md#六hooks-调用规则) | 仅在组件顶层或 `<script setup>` 顶层调用，禁止在条件/循环中调用        |
| **v-for 与 key**                  | 🔴     | [common-vue-template.md](./resources/common-vue-template.md#一v-for-与-key)      | 唯一 ID 作为 key，禁止使用 index                                       |
| **v-if 与 v-for 冲突**            | 🔴     | [common-vue-template.md](./resources/common-vue-template.md#二v-if-与-v-for-冲突) | 禁止同时使用在同一个元素上                                            |
| **ref/reactive/computed 原则**    | 🟠     | [vue3-reactivity.md](./resources/vue3-reactivity.md)                      | ref/reactive 选择原则、reactive 转 ref 规则、computed 规范             |
| **watch 规范**                    | 🟠     | [common-vue-watch.md](./resources/common-vue-watch.md)                    | watch 通用规范（Vue3 特有差异见 vue3-watch.md）、清理机制、与 computed 选择策略 |
| **Hooks Vue3 特有差异**           | 🟠     | [common-hooks.md](./resources/common-hooks.md)                       | setup 限制、toRefs、内置 Hooks                                         |
| **`<script setup>` 结构与代码组织** | 🟠   | [vue3-order.md](./resources/vue3-order.md)                                | SFC 块顺序、Import 分组、脚本内部声明顺序                              |
| **模板属性顺序**                  | 🟠     | [common-vue-template.md](./resources/common-vue-template.md#六模板属性顺序)      | HTML 元素上属性的统一排列顺序（Vue3 追加第 9 步 v-slot）                |
| **组件交互与通信**                | 🟠     | [vue3-interaction.md](./resources/vue3-interaction.md)                    | Props、v-model 兼容、Emit 事件白名单、defineExpose                     |
| **Vue3 网络请求**         | 🟠     | [common-network.md](./resources/common-network.md#一网络请求处理规范)  | useRequest 前置检查、互斥锁                                |
| **TypeScript 类型注解**           | 🟢     | [common-typescript.md](./resources/common-typescript.md)                 | defineProps/ref/reactive/Emits 泛型                                    |
| **TypeScript 约束**               | 🟢     | [common-typescript.md](./resources/common-typescript.md#六类型压制不推荐)        | 不推荐 `as any`、`@ts-ignore`、`@ts-expect-error`                      |
| **指令简写**                      | 🟢     | [common-vue-template.md](./resources/common-vue-template.md#四指令简写)          | `v-bind` → `:`、`v-on` → `@`、`v-slot` → `#`                           |
| **Vue3 指令钩子**                 | 🟢     | [vue3-directives.md](./resources/vue3-directives.md)                      | Vue3 指令钩子（`mounted`/`unmounted`）、与 Vue2 命名差异               |
| **Vue3 性能差异**                 | 🟢     | [vue3-performance.md](./resources/vue3-performance.md)                    | defineAsyncComponent、shallowRef、unmounted 钩子                       |

### React

> 函数组件 + Hooks 时代。React 沿用通用规则，本表仅列出 React 框架差异与特有约束。

| 规则                     | 优先级 | 详见                                                       | 说明                                                                   |
| ------------------------ | ------ | ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| **必须使用函数组件**     | 🔴     | [react-overview.md](./resources/react-overview.md)         | 禁止使用 Class 组件                                                    |
| **Props 单向数据流**     | 🔴     | [react-interaction.md](./resources/react-interaction.md#一props-规范) | 禁止修改 props、参数解构、默认值、布尔简写                           |
| **Hooks 调用规则**       | 🔴     | [common-hooks.md](./resources/common-hooks.md#六hooks-调用规则) | 仅在组件顶层或自定义 Hook 中调用，禁止条件/循环中调用                |
| **key 使用规范**         | 🔴     | [react-jsx.md](./resources/react-jsx.md)                   | 列表渲染必须使用唯一 key，禁止使用 index                               |
| **禁止直接修改 state**   | 🔴     | [react-state.md](./resources/react-state.md)               | 使用 setState/useState 更新函数                                        |
| **组件结构与代码组织**   | 🟠     | [react-order.md](./resources/react-order.md)               | 文件结构、组件内部顺序、Import 分组（4 组）、JSX 属性顺序             |
| **组件交互与通信**       | 🟠     | [react-interaction.md](./resources/react-interaction.md)   | 回调命名、状态提升、Context、Render Props、状态管理选型、事件总线     |
| **Hooks React 特有**     | 🟠     | [common-hooks.md](./resources/common-hooks.md)              | 调用规则、内置 Hooks、useCallback                                      |
| **状态管理**             | 🟠     | [react-state.md](./resources/react-state.md)               | useState/useReducer/Context 选择与使用                                 |
| **TypeScript 类型注解**  | 🟢     | [common-typescript.md](./resources/common-typescript.md)   | Props、useState、useRef、事件、泛型组件                                |
| **TypeScript 约束**      | 🟢     | [common-typescript.md](./resources/common-typescript.md#六类型压制不推荐) | 不推荐 `as any`、`@ts-ignore`、`@ts-expect-error`               |
| **JSX 规范**             | 🟢     | [react-jsx.md](./resources/react-jsx.md)                   | 条件渲染、列表渲染、事件处理、属性传递                                 |
| **React CSS 差异**       | 🟢     | [common-css.md](./resources/common-css.md#十二react-css-补充)             | CSS Modules、className、clsx、`:global()` 穿透、方案选型              |

---

## AI 行为约束（🔴 强制执行）

> 所有 AI 辅助开发必须遵守以下约束，避免破坏代码质量和项目规范：

- **[ai-behavior.md](./resources/ai-behavior.md)** — 完整 AI 行为约束文档，包含修改权限红线、文档生成规则、代码审查标准、输出格式要求

---

## 主题速查表

按主题快速定位规则文件。**框架差异文件只承载与通用规范不同的内容**，需配合通用文件一起解读。

> 文件命名：通用列 → `resources/common-<文件名>.md`，框架列 → `resources/<框架名>-<文件名>.md`

| 主题        | 通用            | Vue2             | Vue3             | React            |
| ----------- | --------------- | ---------------- | ---------------- | ---------------- |
| 框架概述    | —               | overview.md      | overview.md      | overview.md      |
| 组件开发    | —               | component-dev.md | component-dev.md | component-dev.md |
| 交互通信    | —               | interaction.md   | interaction.md   | interaction.md   |
| 模板/JSX    | vue-template.md | directives.md    | directives.md    | jsx.md           |
| 结构顺序    | —               | order.md         | order.md         | order.md         |
| 响应式/状态 | —               | reactivity.md    | reactivity.md    | state.md         |
| 侦听器      | vue-watch.md    | watch.md         | watch.md         | —                |
| Hooks       | hooks.md        | —                | hooks.md         | hooks.md         |
| TypeScript  | typescript.md   | —                | typescript.md    | typescript.md    |
| CSS 样式    | css.md          | css.md           | css.md           | css.md           |
| 性能优化    | performance.md  | —                | performance.md   | —                |
| 命名规范    | naming.md       | —                | —                | —                |
| 注释规范    | comments.md     | —                | —                | —                |
| 网络请求    | network.md      | —                | —                | —                |
| 约束清单    | constraints.md  | —                | —                | —                |

例如查询"Vue3 命名规范"：通用列指向 `resources/common-naming.md`，Vue3 列为空说明 Vue3 无独立命名文件，直接读通用文件即可。

---

## 工作流

### 步骤 1. 定位查询维度

判断用户问题类型，决定加载范围：

- **单主题查询**（"命名规范是什么""Vue3 怎么定义 props"）→ 跳到步骤 3，借助上方「主题速查表」定位文件
- **整框架查询**（"Vue3 项目有哪些规范"）→ 加载该框架目录下所有文件，或直接查看上方对应技术栈表格（通用 / Vue2 / Vue3 / React）
- **优先级查询**（"哪些是强制的"）→ 查看上方各技术栈表格中标 🔴 的行
- **总览/模糊查询**（"前端规范有哪些"）→ 通览上方 4 个技术栈表格（通用 / Vue2 / Vue3 / React）
- **AI 行为约束**（"AI 改代码要注意什么"）→ 读 [resources/ai-behavior.md](./resources/ai-behavior.md)

### 步骤 2. 识别技术栈（用户未明确时）

按以下特征判断（可读取用户当前项目文件辅助识别）：

- **Vue2**：`.vue` 用 Options API（`data`/`methods`/`computed`/`watch`）、`this.$emit`、mixin、`beforeDestroy`
- **Vue3**：`.vue` 用 `<script setup>`、`defineProps`/`defineEmits`、`ref`/`reactive`、`onMounted`
- **React**：`.jsx`/`.tsx`、`useState`/`useEffect`/`useCallback`、函数组件
- **未限定/多框架**：只加载 `common-*.md` 前缀文件
- **无法确定**：询问用户

### 步骤 3. 按需加载规则文件

**懒加载原则**：只读相关文件，不预加载全部。

- 通用规则：所有 `common-*.md` 前缀文件（如 [common-naming.md](./resources/common-naming.md)、[common-network.md](./resources/common-network.md)）
- 框架差异：对应 `vue2-*.md`、`vue3-*.md`、`react-*.md` 前缀文件
- 网络请求、约束清单的框架差异已并入通用 `common-network.md`、`common-constraints.md`，以文字（Vue2 / Vue3 / React）标注，无需额外加载框架文件

借助上方「主题速查表」按主题定位文件。

### 步骤 4. 输出结构化清单

**先按用户问题规模选择输出详略**：

- **单点查询**（"v-for 的 key 怎么写"）→ 直接给规则要点 + 1 组正反例 + 来源路径，不用模板
- **主题速查**（"命名规范"）→ 列出规则标题清单 + 来源引用，不展开示例
- **详细规范**（用户明确说"详细/完整"）→ 完整展开规则 + 正反例，按优先级分组

**通用要求**（适用于所有规模）：

- 规则按 🔴 基础 → 🟠 强烈推荐 → 🟢 风格指南 排序输出（与上方各技术栈表格一致，来源文件的章节标题已带优先级标识）
- 每条规则标注来源文件路径（如 `resources/common-network.md`）
- 框架差异与通用规则并存时，明确区分「通用要求」与「<框架名> 差异」
- 代码示例必带语言标识（`javascript`/`typescript`/`vue`/`tsx` 等）

**详细规范的输出模板**：

```markdown
## 前端规范速查：<查询主题/框架>

**适用技术栈**：<Vue2 / Vue3 / React / 通用>
**适用范围**：`src` 目录下的 <.vue / .tsx / .ts / .css 等> 文件

### 🔴 基础规范（强制执行）

- **规则名**：<规则要点>
  - 来源：resources/<path>.md
  - 正例：<代码或说明>
  - 反例：<代码或说明>

### 🟠 强烈推荐（必须遵循）

- ...

### 🟢 风格指南（建议遵循）

- ...

### 框架差异（<框架名> 特有）

- 与通用规范不同之处：<差异说明>
  - 来源：resources/<framework>/<file>.md

### 相关文件

- resources/<path>.md — <文件主题>
```

## 安全边界

- **允许**：读取 `resources/` 下的规范文件、读取用户项目文件以识别技术栈（只读）、输出规则速查清单
- **禁止**：修改/重构代码、审核既有代码质量、执行编译/构建/测试/lint、git 操作、网络请求命令
