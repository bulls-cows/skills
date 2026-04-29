---
name: yy-frontend-vue2-code-optimization
description: >
  针对 Vue2 项目的 .vue、.js、.css、.scss、.less 文件执行代码优化。
  默认对 git 变动文件执行优化，也可按用户指定范围执行。
  统一代码结构、BEM 样式、语义化命名与关键注释，提升可读性与协作效率。
  不生成新组件、不修改业务逻辑。
  触发场景：用户要求优化代码、规范代码结构、统一命名、优化 Vue2 组件、整理代码风格。
icon: ⚡
examples:
  - 帮我优化所有改动的 Vue2 文件
  - 优化 src/views/order/index.vue 组件
  - 把这段 Vue2 代码按规范优化一下
---

# yy-frontend-vue2-code-optimization

针对 Vue2 页面组件、JavaScript 和 CSS/SCSS/Less 文件的代码优化技能。通过统一代码结构、语义化命名、BEM 样式规范、逻辑分层和关键注释，提升代码可读性与团队协作效率，降低维护与交接成本。

**边界**：不用于生成新组件、修改业务逻辑或生成提交信息。

## 何时使用

- 用户未指定文件时，优化当前 git 变动文件（含暂存区）
- 用户明确指定文件或文件夹，优化其中 `.vue`、`.js`、`.css`、`.scss`、`.less` 文件
- Code Review 时需要优化代码结构
- 用户明确要求优化前端代码（Vue2 组件、JS 或 CSS）

## 何时不要使用

- 生成新组件或新功能代码
- 修改业务逻辑
- 生成 git 提交信息
- 非 Vue2 项目（Vue3 使用 yy-frontend-vue3-code-optimization）

## 支持的文件类型

| 扩展名 | 优化内容 |
|--------|----------|
| `.vue` | Vue2 单文件组件（模板、脚本、样式） |
| `.js` | JavaScript 文件（代码风格、导入排序、命名规范、注释） |
| `.css` | CSS 样式（BEM 命名、格式、注释） |
| `.scss` | SCSS 样式（BEM 命名、格式、注释） |
| `.less` | Less 样式（BEM 命名、格式、注释） |

## 优化工作流

### 步骤一：确定优化目标

1. 若用户指定了文件/文件夹：递归收集所有支持的文件类型
2. 若未指定：执行 `git diff --name-only HEAD` 和 `git diff --cached --name-only`，合并去重后过滤出支持的文件类型
3. 若无匹配文件，回复「当前没有需要优化的改动文件（支持 .vue、.js、.css、.scss、.less）。你可以指定文件或文件夹让我优化。」并终止

### 步骤二：读取详细规范

在执行优化前，根据需要读取以下参考文件获取详细规则：

- 需要 Vue2 组件结构、props、computed、methods、emit、模板属性顺序等规则 → 读取 `references/component.md`
- 需要代码风格、导入顺序（9 组）、引号/分号/缩进/行宽/尾随逗号等规则 → 读取 `references/code-style.md`
- 需要注释规范（JSDoc、模板注释、脚本注释、关键注释场景） → 读取 `references/comments.md`
- 需要命名约定（API 函数、事件函数、布尔值命名、模块拆分建议） → 读取 `references/naming.md`
- 需要 CSS/BEM 命名和样式格式规则 → 读取 `references/css-style.md`

### 步骤三：逐文件优化

对每个文件应用对应规范：

#### `.vue` 文件

1. **模板区**：调整属性顺序，清理复杂表达式，添加区块注释
2. **脚本区**：按标准顺序排列属性，规范 props/data/computed/watch/methods，添加 JSDoc 注释，统一网络请求写法
3. **样式区**：应用 BEM 命名，确保 scoped，添加模块注释

#### `.js` 文件

1. 按 9 组规则重排 import
2. 规范命名和代码风格
3. 为关键方法添加 JSDoc 注释

#### `.css` / `.scss` / `.less` 文件

1. 应用 BEM 命名规范
2. 统一代码格式
3. 添加模块注释

### 步骤四：输出结果

按以下格式输出：

```markdown
## 优化结果

### 优化文件数：N

#### [filename]

**优化内容**：
1. [优化项描述]
2. [优化项描述]

[优化后的完整代码]
```

## 输出契约

- 解析组件的模板、脚本、样式区块，应用规范后直接输出优化后的完整代码
- 不修改业务逻辑，保持原有功能不变
- 确保 Vue 2 语法正确（`v-model`、生命周期等）
- 语气专业、客观、简洁

## 参考文档

> 渐进式披露：以下文件按需读取，根据文件类型和优化需要打开。

- `references/component.md` — Vue2 组件结构顺序、Props 规范、computed 规则、方法排序、网络请求模式、Emit 规范、模板属性顺序
- `references/code-style.md` — 缩进/引号/分号/行宽/尾随逗号、9 组导入顺序、Prettier 配置、`==` 规则
- `references/comments.md` — JSDoc 格式、模板/脚本注释格式、关键注释场景
- `references/naming.md` — API/事件/常量/组件/Props 命名、布尔值前缀、模块拆分建议
- `references/css-style.md` — BEM 命名定义、代码格式、样式注释格式、作用域标注
