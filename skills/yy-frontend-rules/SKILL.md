---
name: yy-frontend-rules
description: >
  前端开发规范速查与项目规则路由。按项目技术栈（Vue2/Vue3/React/通用）、规则主题或优先级检索对应规范，输出结构化规则清单与文件引用。
  用于用户要求查询前端规范、确认某场景该怎么做、梳理某个框架的约束清单、编写代码前确认规范、统一团队约定时触发。
  不用于审核既有代码、生成业务说明文档、直接修改或重构代码、执行格式化或构建。
---

# yy-frontend-rules

## 描述

整合通用前端规范与 Vue2/Vue3/React 框架特定规范的前端开发规范速查工具。按项目技术栈、规则主题或三级优先级（🔴 基础/🟠 强烈推荐/🟢 风格指南）检索对应规范，输出结构化规则清单与可追溯的文件引用，供编码前确认、约定统一、规范答疑使用。

本技能只读不写，不审核既有代码，不修改任何文件。

## 使用场景

- 用户要求查询前端规范、确认某个场景该遵循什么规则
- 用户要求梳理某个框架（Vue2/Vue3/React）的约束清单
- 用户在编写代码前要求确认相关规范，或要求统一团队约定
- 用户询问命名、网络请求、样式、性能、TypeScript、Hooks 等具体主题的规范要求
- 用户要求按优先级（强制/推荐/风格）了解规则

不应触发：

- 用户要求审核既有代码（应使用审核类能力）
- 用户要求生成组件业务说明或改动记录文档
- 用户要求直接修改、重构或精炼代码
- 用户要求执行 lint、格式化、构建或测试
- 用户只是询问某个前端技术问题的原理或用法（非规范查询）

## 目录结构

```text
yy-frontend-rules/
├── SKILL.md                  # 本文件：规则速查工作流
└── resources/
    ├── index.md              # 规范总纲索引（三级优先级 × 框架矩阵）
    ├── ai-behavior.md        # AI 行为约束（红线、审查标准、输出格式）
    ├── common/               # 跨框架通用规则
    │   ├── network.md        # 网络请求与安全（含 🟦Vue2/💚Vue3/💙React 差异）
    │   ├── constraints.md    # 约束清单速查（含 🟦Vue2 特有条目）
    │   ├── naming.md         # 命名规范
    │   ├── css.md            # CSS 样式规范
    │   ├── performance.md    # 性能优化
    │   ├── code-style.md     # 代码风格与 Prettier
    │   ├── comments.md       # 注释规范
    │   ├── vue-template.md   # Vue 模板通用规则（Vue2/Vue3 共享）
    │   ├── vue-watch.md      # Vue 侦听器通用规则（Vue2/Vue3 共享）
    │   ├── hooks.md          # Hooks 通用规范（Vue3/React 共享）
    │   └── typescript.md     # TypeScript 通用规范（Vue3/React 共享）
    ├── vue2/                 # Vue2 框架规则（含 Vue2 独有差异）
    │   ├── overview.md       # 概述与适用范围
    │   ├── component-dev.md  # 组件开发（Options API）
    │   ├── interaction.md    # 交互通信
    │   ├── directives.md     # 模板指令差异
    │   ├── order.md          # 结构顺序（3 组 import）
    │   ├── reactivity.md     # 响应式陷阱（$set）
    │   ├── watch.md          # 侦听器（watch 选项特有写法）
    │   └── css.md            # Vue2 CSS 差异（指令钩子、::v-deep）
    ├── vue3/                 # Vue3 框架规则（含 Vue3 独有差异）
    │   ├── overview.md       # 概述与适用范围
    │   ├── component-dev.md  # 组件开发（<script setup>）
    │   ├── interaction.md    # 交互通信
    │   ├── directives.md     # 模板指令差异（动态 v-slot）
    │   ├── order.md          # 结构顺序（4 组 import）
    │   ├── reactivity.md     # 响应式（ref/reactive/computed）
    │   ├── watch.md          # 侦听器（watchEffect、flush 等 Vue3 特有差异）
    │   ├── hooks.md          # 组合式函数
    │   ├── typescript.md     # Vue3 TypeScript 规范
    │   ├── css.md            # Vue3 CSS 差异（指令钩子、:deep() 写法）
    │   └── performance.md    # Vue3 性能差异（defineAsyncComponent）
    └── react/                # React 框架规则
        ├── overview.md       # 概述与适用范围
        ├── component-dev.md  # 函数组件开发
        ├── interaction.md    # 交互通信（含状态管理选型）
        ├── order.md          # 代码组织与顺序
        ├── hooks.md          # Hooks 规范
        ├── state.md          # 状态管理
        ├── jsx.md            # JSX 规范
        ├── css.md            # React CSS 规范（CSS Modules、clsx、:global()）
        └── typescript.md     # React TypeScript 规范
```

## 指令

### 步骤 1. 确定查询维度

判断用户的查询属于哪个维度，决定后续加载范围。

**决策分支**：

- **按项目技术栈查询**：用户问"Vue2/Vue3/React 项目有哪些规范"、"这个框架有什么约束" → 加载对应框架的全部规则文件
- **按规则主题查询**：用户问"网络请求怎么写"、"命名规范"、"样式规范"、"性能优化"、"TypeScript" 等 → 加载通用 + 对应框架的同主题文件
- **按优先级查询**：用户问"哪些是强制的"、"基础规范有哪些"、"风格指南" → 加载 [resources/index.md](./resources/index.md) 按优先级分组
- **全量了解**：用户问"前端规范有哪些"、"整体规范" → 加载 [resources/index.md](./resources/index.md) 输出总纲
- **适用范围/通用约定**：用户问"规范适用哪些文件"、"目录约束" → 直接输出本 SKILL.md 的描述与适用范围

### 步骤 2. 识别项目技术栈

用户未明确说明技术栈时，按以下特征识别（可结合用户当前项目文件判断）。

**决策分支**：

- **Vue2 特征**：`.vue` 文件使用 Options API（`data`/`methods`/`computed`/`watch`）、`this.$emit`/`this.$refs`、`Vue.filter`、mixin、`beforeDestroy` 生命周期 → 加载 `resources/vue2/`
- **Vue3 特征**：`.vue` 文件使用 `<script setup>`、`defineProps`/`defineEmits`、`ref`/`reactive`/`computed`、`onMounted`/`onUnmounted` → 加载 `resources/vue3/`
- **React 特征**：`.jsx`/`.tsx` 文件、`useState`/`useEffect`/`useCallback`、函数组件、JSX 语法 → 加载 `resources/react/`
- **未限定框架/多框架**：仅加载 `resources/common/` 与 `resources/index.md`
- **无法确定**：主动询问用户当前项目技术栈

### 步骤 3. 按需加载规则文件

**懒加载原则**：仅读取与查询相关的文件，不预加载全部。

- 通用规则始终从 [resources/common/](./resources/common/) 读取
- 框架特定差异从对应 `resources/vue2/`、`resources/vue3/`、`resources/react/` 读取
- 框架差异文件（如 `vue3/css.md`、`vue3/performance.md`）只承载与通用规范不同的内容，需配合通用文件一起解读，相关模块引用见各文件末尾
- 网络请求与约束清单的框架差异已并入通用 `common/network.md`、`common/constraints.md`，以 🟦（Vue2）/💚（Vue3）/💙（React）标注，无需额外加载框架文件

**主题到文件的映射**：

| 主题        | 通用文件                          | Vue2 文件                  | Vue3 文件                  | React 文件                |
| ----------- | --------------------------------- | -------------------------- | -------------------------- | ------------------------- |
| 组件开发    | —                                 | vue2/component-dev.md      | vue3/component-dev.md      | react/component-dev.md    |
| 交互通信    | —                                 | vue2/interaction.md        | vue3/interaction.md        | react/interaction.md      |
| 模板/JSX    | common/vue-template.md            | vue2/directives.md         | vue3/directives.md         | react/jsx.md              |
| 结构顺序    | common/code-style.md              | vue2/order.md              | vue3/order.md              | react/order.md            |
| 响应式/状态 | —                                 | vue2/reactivity.md         | vue3/reactivity.md         | react/state.md            |
| 侦听器      | common/vue-watch.md               | vue2/watch.md              | vue3/watch.md              | —                         |
| Hooks       | common/hooks.md                   | —                          | vue3/hooks.md              | react/hooks.md            |
| TypeScript  | common/typescript.md              | —                          | vue3/typescript.md         | react/typescript.md       |
| 网络请求    | common/network.md（含 🟦/💚/💙 框架差异） | —                  | —                          | —                         |
| CSS 样式    | common/css.md                     | vue2/css.md                | vue3/css.md                | react/css.md              |
| 性能优化    | common/performance.md             | —                          | vue3/performance.md        | —                         |
| 命名规范    | common/naming.md                  | —                          | —                          | —                         |
| 注释规范    | common/comments.md                | —                          | —                          | —                         |
| 约束清单    | common/constraints.md（含 Vue2 🟦 特有条目） | —              | —                          | —                         |
| 框架概述    | —                                 | vue2/overview.md           | vue3/overview.md           | react/overview.md         |

### 步骤 4. 输出结构化规则速查清单

按以下格式输出，确保每条规则可追溯到具体文件与行号。

**输出要求**：

- 规则按优先级分组（🔴 基础规范 → 🟠 强烈推荐 → 🟢 风格指南）
- 每条规则标注来源文件路径（如 `resources/common/network.md`）
- 涉及代码时给出正反示例或关键代码片段，代码块带语言标识
- 框架差异与通用规则并存时，明确标注"通用要求"与"本框架差异"
- 引用文件时使用相对于项目根目录的路径，便于用户定位

**输出模板**：

```markdown
## 前端规范速查：<查询主题/框架>

**适用技术栈**：<Vue2/Vue3/React/通用>
**适用范围**：src 目录下的 <.vue/.tsx/.ts/.css 等> 文件

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

**决策分支（输出详略）**：

- 用户要求"详细/完整规范" → 输出全部适用规则，含正反示例
- 用户要求"速查/概览" → 输出规则标题清单 + 文件引用，不展开示例
- 用户只问某一条具体规则 → 直接定位该规则，输出该条详细内容与示例

## 安全边界

**允许执行的操作**：

- 读取 `resources/` 目录下的规范文件
- 读取用户项目的文件以识别技术栈（只读）
- 输出规则速查清单、规则摘要、正反示例

**禁止主动执行的操作**：

- 修改、重构、格式化任何代码文件
- 审核、评判既有代码质量
- 生成业务说明、改动记录、组件文档
- 执行编译、构建、测试、部署命令
- 会改变 git 状态的命令（commit、push、merge、rebase）
- 删除文件或重置分支等破坏性操作
- 网络请求命令

## 相关资源

- [resources/index.md](./resources/index.md) — 规范总纲索引（三级优先级 × 框架矩阵，整体速查入口）
- [resources/ai-behavior.md](./resources/ai-behavior.md) — AI 行为约束（红线、审查标准、输出格式）
- [resources/common/](./resources/common/) — 跨框架通用规则（11 个文件）
- [resources/vue2/](./resources/vue2/) — Vue2 框架规则（8 个文件）
- [resources/vue3/](./resources/vue3/) — Vue3 框架规则（11 个文件）
- [resources/react/](./resources/react/) — React 框架规则（9 个文件）
