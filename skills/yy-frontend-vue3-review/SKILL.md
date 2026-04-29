---
name: yy-frontend-vue3-review
description: >
  审核 Vue3 项目 src 目录下代码改动，覆盖 10 大维度：组件规范、代码风格、命名、Hooks、逻辑、网络请求、computed、安全、最佳实践、绝对禁止项。
  仅支持 <script setup> 组合式 API，不支持 React/Vue2。
  触发场景：代码合并前审核、提交前质量检查、Code Review Vue3 代码、检查 Hooks 规范。
---

# yy-frontend-vue3-review

Vue3 前端代码审核助手。审核 `src` 目录下改动文件，基于 Vue3 开发规范逐项检查。

**绝不审核 `src` 目录之外的文件。绝不使用 React 或 Vue2 标准。绝不修改代码（除非用户明确要求修复）。**

## 何时使用

- 代码合并前全面审核。
- 代码提交前自动检查质量。
- 用户未指定文件时，自动获取 `git diff` 中 `src` 目录下变动文件。

## 何时不使用

- 项目无 `src` 目录。
- React 或 Vue2 项目。
- 需要修改代码而非审核时（用户明确要求修复除外）。
- 纯后端代码审核。

## 支持文件类型

| 扩展名  | 审核内容                                                      |
| ------- | ------------------------------------------------------------- |
| `.vue`  | Vue3 单文件组件（模板、`<script setup>`、样式）                 |
| `.js`   | JavaScript 文件（代码风格、导入顺序、命名规范、逻辑错误）       |
| `.ts`   | TypeScript 文件（类型注解、代码风格、导入顺序、命名规范）       |
| `.css`  | CSS 样式（BEM 命名、格式、scoped 使用）                         |
| `.scss` | SCSS 样式（BEM 命名、格式、嵌套规范）                           |
| `.less` | Less 样式（BEM 命名、格式、变量使用）                           |

## 审核工作流（4 步）

### 步骤 1：目录验证

1. 检查项目是否存在 `src` 目录。不存在则回复 _"当前项目不符合 Vue3 前端代码审核的目录要求，本技能仅支持包含 src 目录的前端项目。"_ 并终止。
2. 使用 `git diff --name-only HEAD` 和 `git diff --cached --name-only` 获取所有改动文件，合并去重后严格过滤 `src` 目录下文件。
3. 无匹配文件则回复 _"当前 src 目录下没有需要审核的改动文件。"_ 并终止。

### 步骤 2：多维度审核（10 大维度）

对每个文件按以下维度逐一检查。每个维度对应一个参考文件，审核时必须读取对应参考文件。

| 维度 | 参考文件 | 核心检查项 |
| ---- | -------- | ---------- |
| 1. Vue3 组件规范 | `references/component.md` | `<script setup>` 语法、脚本结构顺序、元素特性顺序、Props TypeScript 定义、emit 顺序、生命周期 emit 限制、组件命名、ref/computed 使用、模块化、禁止 mixins |
| 2. 代码风格 | `references/code-style.md` | 2 空格缩进、引号规则、分号、尾随逗号、120 行宽、箭头函数、11 组导入顺序、Prettier 配置、等于运算符 |
| 3. 命名规范 | `references/naming.md` | API 函数命名、事件函数命名、变量/方法命名、常量、Props、组件名、文件名、emit 事件、Hooks、布尔值命名 |
| 4. Hooks 规范 | `references/hooks.md` | useXxx 命名、toRefs 返回对象、30行/2组件抽离条件、禁止挂载响应式数据、内部 JSDoc 注释 |
| 5. 逻辑错误 | `references/logic-and-request.md` | 空指针、数组越界、逻辑判断、方法内部逻辑顺序、ref `.value` 访问 |
| 6. 网络请求规范 | `references/logic-and-request.md` | async/await + try/catch/finally、禁止多层 try/catch、禁止连续解构、统一响应模式 |
| 7. computed 规范 | `references/logic-and-request.md` | try/catch 包裹、有意义命名 |
| 8. 安全漏洞 | `references/best-practice.md` | XSS 风险（v-html）、敏感信息泄露、硬编码密钥/Token/密码 |
| 9. 最佳实践 | `references/best-practice.md` | 调试代码清理、BEM + scoped、未使用变量、defineExpose、组件拆分、组件懒加载、KeepAlive |
| 10. 绝对禁止项 | `references/best-practice.md` | 连续解构、修改子组件数据、修改 ref/reactive 类型、修改 props、this、Options API、mixins、多层 try/catch |

### 步骤 3：输出审核结果

**注释问题默认忽略，不进行检查。**

#### 审核通过（无问题或仅轻微问题）

```markdown
## 审核结果

代码审核通过！未发现严重或中等问题。

### 审核统计

- 审核文件数：N
- 发现问题：0 个

准备提交代码...
```

#### 发现问题（存在严重或中等问题）

```markdown
## 审核结果

### 问题统计

| 严重程度 | 数量 |
| -------- | ---- |
| 严重     | N    |
| 中等     | N    |
| 轻微     | N    |

### 问题详情

#### [文件名]

**严重问题**：

1. **问题类型**：[类型描述]
   - **位置**：文件路径:行号
   - **描述**：[详细描述]
   - **代码片段**：[涉及代码]
   - **修复建议**：[具体建议]

**中等问题**：

...

**轻微问题**：

...
```

### 步骤 4：自动提交判断

- **审核通过**（无问题或仅轻微问题）：输出审核通过报告，调用 `yy-frontend-commit` 技能执行代码提交。
- **发现问题**（存在严重或中等问题）：输出完整审核结果和修复建议（严重优先 > 中等 > 轻微），等待用户修复后重新审核。

## 输出规则

- **格式**：Markdown 结构化报告。
- **语气**：专业、客观、直接，不添加无关建议，不闲聊。
- **约束**：仅审核 `src` 目录下文件，严格遵循 Vue3 规范。
