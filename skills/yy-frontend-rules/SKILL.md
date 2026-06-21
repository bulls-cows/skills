---
name: yy-frontend-rules
description: >
  前端开发规范速查。当用户询问前端编码规范、命名约定、网络请求写法、样式规范、
  TypeScript 类型要求、Hooks/组件/状态管理的最佳实践、Vue2/Vue3/React 特定约束、
  性能优化建议，或需要确认某个编码场景该遵循什么规则、统一团队约定时使用。
  即使没说“规范”二字，只要是“怎么写才对”“有什么要求”“应该怎么处理”类的前端编码问题，
  都应考虑使用本技能。
  不用于：执行具体的代码修改/重构、审核既有代码、跑 lint/构建命令、生成业务文档。
---

# yy-frontend-rules

整合通用前端规范与 Vue2/Vue3/React 框架特定规范的前端开发规范速查工具。按项目技术栈、规则主题或三级优先级（🔴 基础/🟠 强烈推荐/🟢 风格指南）检索对应规范，输出结构化规则清单与文件引用。

本技能只读不写——读取规范文件并输出指引，不修改任何代码。

## 目录结构

```text
yy-frontend-rules/
├── SKILL.md               # 规则速查工作流
└── resources/
    ├── index.md           # 规范总纲（三级优先级 × 框架矩阵）
    ├── ai-behavior.md     # AI 行为约束（红线、代码生成规范、交互规范）
    ├── common/            # 跨框架通用规则（11 个文件）
    ├── vue2/              # Vue2 框架规则（8 个文件）
    ├── vue3/              # Vue3 框架规则（11 个文件）
    └── react/             # React 框架规则（9 个文件）
```

各子目录的具体文件名与主题映射见 [index.md](./resources/index.md) 及下方步骤 3 的映射表。

## 快速路径：直接问答

如果用户的问题明确指向某个具体主题（如「网络请求规范是什么」「命名有什么要求」「Vue2 的 watch 怎么用」），**跳过步骤 1-2**，直接从步骤 3 的映射表定位文件，读取后直接回答。只有用户意图模糊或需要全量梳理时，才走完整的 4 步工作流。

## 指令

### 步骤 1. 确定查询维度

判断用户的查询属于哪个维度，决定后续加载范围：

- **按项目技术栈查询**：用户问“Vue2/Vue3/React 项目有哪些规范” → 加载对应框架的全部规则文件
- **按规则主题查询**：用户问“网络请求怎么写”“命名规范”“样式规范”等 → 加载通用 + 对应框架的同主题文件
- **按优先级查询**：用户问“哪些是强制的” → 加载 [resources/index.md](./resources/index.md) 按优先级分组
- **全量了解**：用户问“前端规范有哪些” → 加载 [resources/index.md](./resources/index.md) 输出总纲
- **适用范围/通用约定**：用户问“规范适用哪些文件” → 直接引用 SKILL.md 描述与适用范围

### 步骤 2. 识别项目技术栈

用户未明确说明技术栈时，按以下特征识别（可结合用户当前项目文件判断）：

- **Vue2 特征**：`.vue` 文件使用 Options API（`data`/`methods`/`computed`/`watch`）、`this.$emit`/`this.$refs`、`Vue.filter`、mixin、`beforeDestroy` 生命周期 → 加载 `resources/vue2/`
- **Vue3 特征**：`.vue` 文件使用 `<script setup>`、`defineProps`/`defineEmits`、`ref`/`reactive`/`computed`、`onMounted`/`onUnmounted` → 加载 `resources/vue3/`
- **React 特征**：`.jsx`/`.tsx` 文件、`useState`/`useEffect`/`useCallback`、函数组件、JSX 语法 → 加载 `resources/react/`
- **未限定框架/多框架**：仅加载 `resources/common/` 与 `resources/index.md`
- **无法确定**：询问用户

  > 你想查询哪个前端技术栈的规范？Vue2 / Vue3 / React / 通用（不限框架） / 多框架混合项目？

### 步骤 3. 按需加载规则文件

**懒加载原则**：仅读取与查询相关的文件，不预加载全部。

- 通用规则从 [resources/common/](./resources/common/) 读取
- 框架特定差异从对应 `resources/vue2/`、`resources/vue3/`、`resources/react/` 读取
- 框架差异文件（如 `vue3/css.md`、`vue3/performance.md`）只承载与通用规范不同的内容，需配合通用文件一起解读
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

按以下格式输出，每条规则可追溯到具体文件。

- 规则按优先级分组（🔴 基础规范 → 🟠 强烈推荐 → 🟢 风格指南）
- 每条规则标注来源文件路径（如 `resources/common/network.md`）
- 涉及代码时给出正反示例或关键代码片段，代码块带语言标识
- 框架差异与通用规则并存时，明确标注「通用要求」与「本框架差异」

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

**输出详略决策**：
- 用户要求「详细/完整规范」→ 输出全部适用规则，含正反示例
- 用户要求「速查/概览」→ 输出规则标题清单 + 文件引用，不展开示例
- 用户只问某一条具体规则 → 直接定位该规则，输出该条详细内容与示例

## 安全边界

- **允许**：读取 `resources/` 目录下的规范文件、读取用户项目文件以识别技术栈（只读）、输出规则速查清单
- **禁止**：修改/重构代码、审核既有代码质量、执行编译/构建/测试/lint、git 操作、网络请求命令
