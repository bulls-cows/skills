---
name: frontend-rules
description: >
  速查并输出前端开发规范的结构化清单（按 🔴 基础 / 🟠 强烈推荐 / 🟢 风格指南 三级优先级分组，
  覆盖 Vue2 / Vue3 / React 及跨框架通用主题）。当用户询问前端编码规范、命名/网络/样式/类型写法、
  Hooks/组件/状态管理最佳实践、性能优化，或需要确认"应该怎么写才对""有什么要求"类问题时使用——
  即使没说"规范"二字也应触发。不用于：代码修改/重构、代码审查、执行 lint/构建命令、生成业务文档。
---

# frontend-rules

按主题、技术栈或优先级检索前端规范，输出结构化清单与文件引用。本技能**只读不写**——读取 `resources/` 下的规范文件并输出指引，不修改任何代码或文件。

## 目录结构

```text
frontend-rules/
├── SKILL.md              # 本文件：检索与输出工作流
└── resources/
    ├── index.md          # 规范总纲（按优先级 × 框架矩阵组织）
    ├── ai-behavior.md    # AI 行为约束（红线、代码生成规范）
    ├── common/           # 跨框架通用规则
    ├── vue2/             # Vue2 框架差异
    ├── vue3/             # Vue3 框架差异
    └── react/            # React 框架差异
```

## 工作流

### 步骤 1. 定位查询维度

判断用户问题类型，决定加载范围：

- **单主题查询**（"命名规范是什么""Vue3 怎么定义 props"）→ 跳到步骤 3，按映射表定位文件
- **整框架查询**（"Vue3 项目有哪些规范"）→ 加载该框架目录下所有文件
- **优先级查询**（"哪些是强制的"）→ 读 [resources/index.md](./resources/index.md)
- **总览/模糊查询**（"前端规范有哪些"）→ 读 [resources/index.md](./resources/index.md) 输出总纲
- **AI 行为约束**（"AI 改代码要注意什么"）→ 读 [resources/ai-behavior.md](./resources/ai-behavior.md)

### 步骤 2. 识别技术栈（用户未明确时）

按以下特征判断（可读取用户当前项目文件辅助识别）：

- **Vue2**：`.vue` 用 Options API（`data`/`methods`/`computed`/`watch`）、`this.$emit`、mixin、`beforeDestroy`
- **Vue3**：`.vue` 用 `<script setup>`、`defineProps`/`defineEmits`、`ref`/`reactive`、`onMounted`
- **React**：`.jsx`/`.tsx`、`useState`/`useEffect`/`useCallback`、函数组件
- **未限定/多框架**：只加载 `common/`
- **无法确定**：询问用户

### 步骤 3. 按需加载规则文件

**懒加载原则**：只读相关文件，不预加载全部。

- 通用规则：[resources/common/](./resources/common/)
- 框架差异：对应 `resources/vue2/`、`resources/vue3/`、`resources/react/`
- **框架差异文件只承载与通用规范不同的内容**，需配合通用文件一起解读
- 网络请求、约束清单的框架差异已并入通用 `common/network.md`、`common/constraints.md`，以 🟦（Vue2）/💚（Vue3）/💙（React）标注，无需额外加载框架文件

**主题到文件的路由表**（完整优先级索引见 [resources/index.md](./resources/index.md)；路径前缀：通用列 → `resources/common/`，框架列 → `resources/<框架名>/`）：

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

例如查询"Vue3 命名规范"：通用列指向 `resources/common/naming.md`，Vue3 列为空说明 Vue3 无独立命名文件，直接读通用文件即可。

### 步骤 4. 输出结构化清单

**先按用户问题规模选择输出详略**：

- **单点查询**（"v-for 的 key 怎么写"）→ 直接给规则要点 + 1 组正反例 + 来源路径，不用模板
- **主题速查**（"命名规范"）→ 列出规则标题清单 + 来源引用，不展开示例
- **详细规范**（用户明确说"详细/完整"）→ 完整展开规则 + 正反例，按优先级分组

**通用要求**（适用于所有规模）：

- 规则按 🔴 基础 → 🟠 强烈推荐 → 🟢 风格指南 分组（来源文件的章节标题已带优先级标识）
- 每条规则标注来源文件路径（如 `resources/common/network.md`）
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
