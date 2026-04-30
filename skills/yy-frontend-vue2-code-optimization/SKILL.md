---
name: yy-frontend-vue2-code-optimization
description: >
  针对 Vue2 项目的 .vue、.js、.css、.scss、.less 文件执行代码优化。
  默认对 git 变动文件执行优化，也可按用户指定范围执行。
  统一代码结构、BEM 样式规范、语义化命名、逻辑分层和关键注释，提升可读性与协作效率。
  不生成新组件、不修改业务逻辑，涉及业务变更必须先确认。
  触发场景：用户要求优化 Vue2 代码、规范命名、整理代码风格、统一导入顺序、BEM 样式重构。
icon: ⚡
examples:
  - 优化 src/views/ 下的所有 Vue2 组件
  - 帮我统一这段代码的 BEM 命名规范
  - 整理这个 Vue2 组件的导入顺序和代码结构
---

# yy-frontend-vue2-code-optimization

针对 Vue2 页面组件、JavaScript 和 CSS/SCSS/Less 文件的代码优化技能。通过统一代码结构、语义化命名、BEM 样式规范、逻辑分层和关键注释，显著提升代码可读性与团队协作效率，降低维护与交接成本。

**边界**：不生成新组件，不修改业务逻辑。涉及业务变更必须先确认。涉及业务变更必须先确认。

## 何时使用

- 用户未指定文件时，优化当前 git 变动文件（含暂存区）
- 用户明确指定文件或文件夹，优化其中 `.vue`、`.js`、`.css`、`.scss`、`.less` 文件
- Code Review 时需要优化代码结构
- 用户明确要求优化 Vue2 前端代码

## 何时不要使用

- 生成新组件或新功能代码
- 修改业务逻辑
- 生成 git 提交信息
- 非 Vue2 项目（Vue3 使用 yy-frontend-vue3-code-optimization）

## 支持优化的文件类型

| 扩展名  | 优化内容                                                    |
| ------- | ----------------------------------------------------------- |
| `.vue`  | Vue2 单文件组件完整优化（模板、脚本、样式）                 |
| `.js`   | JavaScript 文件优化（代码风格、导入排序、命名规范、注释）   |
| `.css`  | CSS 样式优化（BEM 命名、格式、注释）                        |
| `.scss` | SCSS 样式优化（BEM 命名、格式、注释）                       |
| `.less` | Less 样式优化（BEM 命名、格式、注释）                       |

## 优化工作流

### 步骤一：确定优化目标

1. 若用户指定了文件/文件夹：递归收集所有支持的文件类型
2. 若未指定：执行 `git diff --name-only HEAD` 和 `git diff --cached --name-only`，合并去重后过滤出支持的文件类型
3. 若无匹配文件，回复「当前没有需要处理的文件（支持 .vue、.js、.css、.scss、.less）。你可以指定文件或文件夹让我处理。」并终止

### 步骤二：生成任务清单

逐文件扫描匹配优化子技能，生成带风险等级的任务表：

| 任务 ID | 文件         | 子技能            | 操作描述                            | 风险等级  |
| ------- | ------------ | ----------------- | ----------------------------------- | --------- |
| T01     | UserCard.vue | 业务逻辑梳理      | 生成组件业务说明 JSDoc              | 🟢 零风险 |
| T02     | UserCard.vue | 代码风格与格式    | 统一缩进/引号/分号/模板排序         | 🟢 零风险 |
| T03     | UserCard.vue | 文档与注释增强    | 添加 JSDoc / 模板注释               | 🟢 零风险 |
| T04     | UserCard.vue | CSS/BEM 架构规范  | 类名转为 `block__element--modifier` | 🟡 低风险 |
| T05     | UserCard.vue | 语义化命名重构    | `isXX` 前缀替换 / API 函数重命名    | 🟡 中风险 |
| T06     | UserCard.vue | 逻辑深度优化      | `.then()` → `async/await`           | 🔴 高风险 |

### 步骤三：用户确认

- **零风险任务**：默认勾选，可取消
- **低风险/中风险任务**：默认勾选，但需提示风险，可取消
- **高风险任务**：默认未勾选，必须逐项确认后执行
- 交互指令：`全部执行`、`全部跳过`、`确认`、`执行 T01 T03` 等

### 步骤四：调度执行

按用户确认的 ID 逐项应用对应规则（按需查阅 [参考文档](#参考文档)）：

| 文件类型 | 执行顺序 | 查阅参考 |
|----------|---------|----------|
| `.vue` | 业务逻辑梳理 → 代码风格清洗 → 文档注释 → CSS/BEM → 语义化命名 → 逻辑优化（确认后） | `references/business-logic.md`、`references/code-style.md`、`references/comments.md`、`references/css-style.md`、`references/naming.md`、`references/optimization.md` |
| `.js` | 代码风格清洗 → 文档注释 → 语义化命名 → 逻辑优化（确认后） | `references/code-style.md`、`references/comments.md`、`references/naming.md`、`references/optimization.md` |
| `.css`/`.scss`/`.less` | 代码风格清洗 → CSS/BEM 架构规范 | `references/code-style.md`、`references/css-style.md` |

未确认的任务跳过，不产生任何改动。

### 步骤五：输出优化结果

按以下格式输出：

```markdown
## 优化结果

### 执行任务数：M/N

#### [filename]

**变更内容**：

1. [变更项 1 描述]
2. [变更项 2 描述]

[变更后的完整代码]
```

## 参考文档

> **渐进式披露**：以下文档按需查阅，根据文件类型和优化任务需要打开对应文件。

- `references/code-style.md` — 基础格式规则（Prettier 配置）、导入顺序（9 组）、Vue 选项顺序、模板属性顺序
- `references/naming.md` — API/事件函数命名、常量/Props/组件命名、布尔值前缀规范、禁止项
- `references/comments.md` — 模板区注释（6 种）、脚本区注释（10 种）、样式注释（3 种）、JSDoc 格式
- `references/css-style.md` — BEM 命名定义、代码格式、样式注释、作用域标注
- `references/optimization.md` — async/await 转换、computed 优先、逻辑拆分、Emit 白名单、Props 增强、其他优化
- `references/business-logic.md` — 业务逻辑梳理规范（分析维度、输出格式、多次改动示例）

## 禁止规则

| 规则                          | 说明                 |
| ----------------------------- | -------------------- |
| 禁止连续解构                  | 如 `...data.data`    |
| 禁止父组件修改子组件数据      | 通过 props 通信      |
| 禁止多次修改 data 属性类型    | 后端给什么值用什么值 |
| 禁止直接修改 props            |                      |
| 禁止使用 mixins               |                      |
| 禁止多层 try/catch 嵌套       |                      |
| 禁止无意义命名                | 如 `data1`、`temp2`  |
| 基础组件生命周期禁止主动 emit |                      |
| 简单逻辑不封装为 method       | 直接写内联表达式     |
| 绝不修改业务逻辑              |                      |
| 绝不生成新组件                |                      |

## 输出契约

- 不修改业务逻辑，保持原有功能
- 确保 Vue 2 Options API 语法正确（`v-model`、生命周期等）
- 模板只负责展示，不写复杂表达式
- 语气：专业、客观、简洁
