---
name: yy-frontend-vue3-code-optimization
description: >
  针对 Vue3 项目的 .vue、.js、.ts、.css、.scss、.less 文件执行代码优化。
  默认对 git 变动文件执行优化，也可按用户指定范围执行。
  统一 <script setup> 组合式 API 结构、BEM 样式、语义化命名与关键注释，提升可读性与协作效率。
  不生成新组件、不修改业务逻辑。
  触发场景：用户要求优化 Vue3 代码、规范 <script setup> 结构、统一命名、整理代码风格、抽离 Hooks。
icon: ⚡
examples:
  - 优化 src/views/ 下的所有 Vue3 组件
  - 帮我统一这段代码的 BEM 命名规范
  - 整理这个 Vue3 项目的导入顺序，抽离 Hooks
---

# yy-frontend-vue3-code-optimization

针对 Vue3 页面组件、JavaScript/TypeScript 和 CSS/SCSS/Less 文件的代码优化技能。通过统一 `<script setup>` 组合式 API 结构、语义化命名、BEM 样式规范、逻辑分层和关键注释，提升代码可读性与团队协作效率。

**边界**：不用于生成新组件、修改业务逻辑或生成提交信息。

## 何时使用

- 用户未指定文件时，优化当前 git 变动文件（含暂存区）
- 用户明确指定文件或文件夹，优化其中 `.vue`、`.js`、`.ts`、`.css`、`.scss`、`.less` 文件
- Code Review 时需要优化代码结构
- 用户明确要求优化前端代码（Vue3 组件、JS/TS 或 CSS）

## 何时不要使用

- 生成新组件或新功能代码
- 修改业务逻辑
- 生成 git 提交信息
- 非 Vue3 项目（Vue2 使用 yy-frontend-vue2-code-optimization）

## 支持优化的文件类型

| 扩展名  | 优化内容                                                    |
| ------- | ----------------------------------------------------------- |
| `.vue`  | Vue3 单文件组件完整优化（模板、`<script setup>`、样式）     |
| `.js`   | JavaScript 文件优化（代码风格、导入排序、命名规范、注释）   |
| `.ts`   | TypeScript 文件优化（类型注解、代码风格、导入排序、注释）   |
| `.css`  | CSS 样式优化（BEM 命名、格式、注释）                        |
| `.scss` | SCSS 样式优化（BEM 命名、格式、注释）                       |
| `.less` | Less 样式优化（BEM 命名、格式、注释）                       |

## 优化工作流

### 步骤一：确定优化目标

1. 若用户指定了文件/文件夹：递归收集所有支持的文件类型
2. 若未指定：执行 `git diff --name-only HEAD` 和 `git diff --cached --name-only`，合并去重后过滤出支持的文件类型
3. 若无匹配文件，回复「当前没有需要优化的改动文件（支持 .vue、.js、.ts、.css、.scss、.less）。你可以指定文件或文件夹让我优化。」并终止

### 步骤二：逐文件优化

根据文件类型，**按需查阅** [参考文档](#参考文档)，应用相应规范：

| 文件类型 | 优化要点 | 查阅参考 |
|----------|---------|----------|
| `.vue` | `<script setup>` 结构、命名、代码风格、模板属性顺序、网络请求、computed、props/emits、方法排序、BEM 样式、注释 | `references/component.md`、`references/code-style.md`、`references/naming.md`、`references/comments.md`、`references/hooks.md`、`references/css-style.md` |
| `.js`/`.ts` | 代码风格、导入顺序（11 组）、命名规范、网络请求、类型注解、注释 | `references/code-style.md`、`references/naming.md`、`references/comments.md` |
| `.css`/`.scss`/`.less` | BEM 命名、代码格式、注释、作用域标注 | `references/css-style.md` |

### 步骤三：输出优化结果

按以下格式输出：

```markdown
## 优化结果

### 优化文件数：N

#### [filename]

**优化内容**：

1. [优化项 1 描述]
2. [优化项 2 描述]

[优化后的完整代码]
```

## 参考文档

> **渐进式披露**：以下文档按需查阅，根据文件类型和优化需要打开对应文件。

- `references/code-style.md` — 基础格式规则、导入顺序（11 组，含 Hooks 分组）、等于运算符规则
- `references/naming.md` — API/事件/常量/Props/组件/Hooks 命名、布尔值命名、模块拆分建议
- `references/component.md` — `<script setup>` 结构、Props/Emits、模板属性顺序、网络请求、computed 规则、方法排序、50 行拆分、性能优化
- `references/hooks.md` — 命名、文件位置、toRefs 返回、使用规范、导入顺序、拆分建议、代码示例
- `references/comments.md` — 模板区注释、脚本区注释、JSDoc 格式、关键注释场景、Hook 内部注释
- `references/css-style.md` — BEM 命名定义、代码格式、样式注释、作用域标注

## 输出契约

解析组件的模板、`<script setup>`、样式区块，应用规范后直接输出优化后的完整 Vue SFC 代码。

- 不修改业务逻辑，保持原有功能
- 确保 Vue 3 `<script setup>` 语法正确
- TypeScript 文件中参数、返回值、变量必须明确类型，禁止 `any`
- 语气：专业、客观、简洁
