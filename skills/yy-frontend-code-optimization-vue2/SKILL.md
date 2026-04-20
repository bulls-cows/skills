---
name: yy-frontend-code-optimization-vue2
description: >
  针对 Vue2 页面组件，通过统一代码结构、语义化命名、BEM 样式规范、逻辑分层、关键注释等手段，
  提升代码可读性与团队协作效率，降低维护与交接成本。
  仅在用户提供 .vue 文件或明确要求优化 Vue2 页面代码时触发。
icon: ⚡
---

# yy-frontend-code-optimization-vue2

## When to use

- 用户提供 `.vue` 文件内容，要求优化代码可读性与可维护性
- 用户明确要求优化 Vue2 页面代码
- Code Review 时需要优化组件结构

## Don't use when

- 用户要求生成新组件（不需要优化）时
- 用户要求修改组件业务逻辑时
- 用户要求生成提交信息等非优化类任务时

## ⛔ 绝对禁止项 / 推荐项 / 注意事项

> **重要：以下规则必须严格遵守，违反任何禁止项视为优化不通过。**

### 🔴 绝对禁止项

1. **数据解构限制**：禁止连续解构数据，如 `...data.data`
2. **组件数据修改**：禁止在父组件中直接修改子组件的数据
3. **数据类型修改**：禁止多次修改 data 的某些属性，后端给什么值用什么值
4. **禁止修改 props**：不允许直接修改组件的 props

### 🟢 推荐项

1. **函数 try/catch**：推荐使用 try/catch 包裹函数内容，catch 中使用 `console.warn` 打印错误
2. **异步写法**：尽可能使用 async/await，少用 `.then()` 链式写法
3. **弹窗确认**：使用 `const isConfirm = await this.$modal.confirm(...); if (!isConfirm) { return; }` 模式

### 🟡 不推荐项

1. **多层 try/catch 嵌套**：不推荐多个 try/catch 嵌套使用，异步操作尽量扁平化
2. **使用 mixins**：不推荐使用 mixins，避免隐式依赖、命名冲突、来源模糊

### 注意事项

- **v-html**：可使用，但必须防范 XSS 风险
- **props 解构**：可以解构（需注意响应式丢失）
- **未使用变量**：需自行清理

## 核心原则

- **不修改业务逻辑**，只优化代码结构、命名、注释
- **保持原有功能**，不删除或改变组件行为
- **注释简洁**，不超过一行（JSDoc 不超过 5 行），使用中文描述
- **确保 Vue 2 语法**正确（`v-model`、生命周期等）

### 关键约束

- 脚本结构固定顺序：name → components → props → data → computed → watch → methods → 生命周期
- 代码风格：2 空格缩进、单引号、必须分号、120 字符行宽
- 网络请求必须 async/await + try/catch
- 样式使用 BEM 规范 + scoped
- 一个方法只做一件事，超过 50 行考虑拆分

## Output contract

解析组件的模板、脚本、样式区块，应用规范后直接输出优化后的完整 Vue SFC 代码。

## 参考文档

详细规范见 references 目录，优化时按需查阅：

- [代码风格](./references/code-style.md)：基础格式规则、导入顺序、性能优化
- [命名规范](./references/naming.md)：目录结构、命名规范、Props 规范、事件命名
- [组件开发规范](./references/component.md)：脚本结构顺序、网络请求、方法规范、页面拆分
- [注释规范](./references/comments.md)：模板区、脚本区注释规范，JSDoc 格式
- [CSS 与 BEM 样式规范](./references/css-style.md)：BEM 命名、样式注释、样式作用域
