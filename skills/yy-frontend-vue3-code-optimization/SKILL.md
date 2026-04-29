---
name: yy-frontend-vue3-code-optimization
description: >
  针对 Vue3 页面组件、JavaScript/TypeScript 和 CSS 文件的代码优化技能。
  默认对 git 改动的 .vue、.js、.ts、.css、.scss、.less 文件执行优化；如果用户明确指定文件或文件夹，则对指定范围执行优化。
  通过统一 `<script setup>` 组合式 API 结构、语义化命名、BEM 样式规范、逻辑分层、关键注释等手段，
  提升代码可读性与团队协作效率，降低维护与交接成本。
  不用于生成新组件、修改业务逻辑或生成提交信息。
metadata:
  author: wengdongyang
  version: "1.0.0"
icon: ⚡
---

# yy-frontend-vue3-code-optimization

## When to use

- 用户未指定文件时，默认对 git 改动的 `.vue`、`.js`、`.ts`、`.css`、`.scss`、`.less` 文件执行优化
- 用户明确指定文件或文件夹时，对指定范围内的相关文件执行优化
- 用户提供 `.vue`、`.js`、`.ts` 或 `.css` 文件内容，要求优化代码可读性与可维护性
- 用户明确要求优化前端代码（Vue3 组件、JS/TS 或 CSS）
- Code Review 时需要优化代码结构

## 支持优化的文件类型

| 扩展名  | 优化内容                                                    |
| ------- | ----------------------------------------------------------- |
| `.vue`  | Vue3 单文件组件完整优化（模板、`<script setup>`、样式）     |
| `.js`   | JavaScript 文件优化（代码风格、导入排序、命名规范、注释）   |
| `.ts`   | TypeScript 文件优化（类型注解、代码风格、导入排序、注释）   |
| `.css`  | CSS 样式优化（BEM 命名、格式、注释）                        |
| `.scss` | SCSS 样式优化（BEM 命名、格式、注释）                       |
| `.less` | Less 样式优化（BEM 命名、格式、注释）                       |

## Don't use when

- 用户要求生成新组件（不需要优化）时
- 用户要求修改组件业务逻辑时
- 用户要求生成提交信息等非优化类任务时

## 核心原则

- **不修改业务逻辑**，只优化代码结构、命名、注释
- **保持原有功能**，不删除或改变组件行为
- **确保 Vue 3 `<script setup>` 语法**正确，禁止 Options API 写法

## 安全与限制（绝对禁止项）

> **以下规则必须严格遵守，违反任何禁止项视为优化不通过。**

1. **数据操作**：禁止连续解构数据（如 `...data.data`）；禁止父组件直接修改子组件数据；禁止多次修改 ref/reactive 属性类型（后端给什么值用什么值，可新增属性但不允许修改原始数据类型）；禁止直接修改 props（使用 `props.xxx` 只读访问）
2. **代码结构**：禁止使用 mixins；禁止多层 try/catch 嵌套
3. **封装原则**：逻辑简单时不要额外封装为函数，直接在 template 中写内联表达式
4. **组件规范**：基础组件禁止在生命周期中主动 emit 事件
5. **Vue3 特有**：禁止在 `<script setup>` 中使用 `this`；禁止使用 Options API 写法（如 `data()`、`methods: {}`、`mounted() {}` 等）

## 推荐实践与注意事项

1. **错误处理**：函数使用 try/catch 包裹，catch 中使用 `console.warn` 打印错误
2. **异步写法**：尽可能使用 async/await，少用 `.then()` 链式写法
3. **计算优先**：除与后端交互的数据和部分定时器外，其它尽可能使用 `computed`
4. **v-html**：可使用，但必须防范 XSS 风险
5. **响应式数据**：优先使用 `ref`，复杂对象使用 `reactive`；注意 `ref` 访问必须 `.value`
6. **Hooks**：可复用的逻辑抽离到 `useXxx` 组合式函数中，放在 `@src/hooks/` 目录
7. **未使用变量**：需自行清理

## 工作流程

### 阶段一：获取优化目标文件

1. **用户指定了文件或文件夹**：递归获取所有支持的文件类型（`.vue`、`.js`、`.ts`、`.css`、`.scss`、`.less`）
2. **用户未指定文件（默认行为）**：通过 `git diff --name-only HEAD` 和 `git diff --cached --name-only` 获取改动文件，合并去重后过滤
3. **终止条件**：无匹配文件时回复 **"当前没有需要优化的改动文件（支持 .vue、.js、.ts、.css、.scss、.less）。你可以指定文件或文件夹让我优化。"** 并终止执行

### 阶段二：逐文件优化

根据获取到的文件类型，**按需查阅** [参考文档](#参考文档)，应用以下规范：

| 文件类型 | 优化要点 | 查阅参考 |
|----------|---------|----------|
| `.vue` | 脚本结构顺序、命名规范、代码风格、元素特性顺序、网络请求、computed 规范、组件传参、emit 事件、方法逻辑顺序、Hooks 使用、样式 BEM、注释规范 | [代码风格](./references/code-style.md)、[命名规范](./references/naming.md)、[组件开发规范](./references/component.md)、[Hooks 规范](./references/hooks.md)、[注释规范](./references/comments.md)、[CSS 与 BEM 样式规范](./references/css-style.md) |
| `.js`/`.ts` | 代码风格、导入顺序（11 组）、命名规范、网络请求、TypeScript 类型注解、注释 | [代码风格](./references/code-style.md)、[命名规范](./references/naming.md)、[注释规范](./references/comments.md) |
| `.css`/`.scss`/`.less` | BEM 命名规范、代码格式、注释规范、作用域标注 | [CSS 与 BEM 样式规范](./references/css-style.md) |

### 阶段三：输出优化结果

按照以下格式输出：

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

> **渐进式披露**：以下文档按需查阅，优化时根据文件类型和需要参考的规范打开对应文件。

- [代码风格](./references/code-style.md)：基础格式规则、导入顺序（11 组）、等于运算符规则、性能优化
- [命名规范](./references/naming.md)：目录结构、API/事件/常量命名、Props 规范、事件白名单、布尔值命名
- [组件开发规范](./references/component.md)：`<script setup>` 脚本结构顺序、Script 顶部 JSDoc、元素特性顺序、网络请求、computed 规范、emit 事件、方法逻辑顺序、组件传参、拆分建议
- [Hooks 规范](./references/hooks.md)：Hooks 命名、返回值格式、使用规范、导入顺序、注释规范、拆分建议
- [注释规范](./references/comments.md)：模板区注释、脚本区注释、JSDoc 格式（不超过 5 行）、关键注释场景
- [CSS 与 BEM 样式规范](./references/css-style.md)：BEM 命名定义、样式注释、作用域标注

## Output contract

解析组件的模板、脚本、样式区块，应用规范后直接输出优化后的完整 Vue SFC 代码。

**语气**：专业、客观、简洁。

## 开始对话

当用户启动此 skill 时，请按以下方式响应：

- **用户未指定文件时**：

```markdown
你好！我是前端代码优化助手 ⚡

我将帮你优化当前所有改动的文件（支持 .vue、.js、.ts、.css、.scss、.less）：

1. **Vue 组件**：统一 `<script setup>` 结构、规范命名、优化代码风格、规范网络请求、统一样式规范
2. **JavaScript/TypeScript**：统一导入顺序、规范命名、优化代码风格、添加关键注释、TypeScript 类型注解
3. **CSS/样式**：BEM 命名规范、统一格式、添加模块注释

让我先获取改动的文件列表...
```

- **用户指定了文件或文件夹时**：

```markdown
你好！我是前端代码优化助手 ⚡

我将帮你优化指定范围内的文件（支持 .vue、.js、.ts、.css、.scss、.less）：

- 目标范围：[用户指定的文件/文件夹]

1. **Vue 组件**：统一 `<script setup>` 结构、规范命名、优化代码风格、规范网络请求、统一样式规范
2. **JavaScript/TypeScript**：统一导入顺序、规范命名、优化代码风格、添加关键注释、TypeScript 类型注解
3. **CSS/样式**：BEM 命名规范、统一格式、添加模块注释

让我开始优化...
```

然后按照工作流程逐步执行。
