# 最佳实践

## 1. 调试代码清理

- 提交前清理所有 `console.log`、`debugger`、`alert` 等调试代码。
- **例外**：`catch` 块中的 `console.warn` 不视为问题，允许保留用于错误日志。

## 2. 样式规范

### 2.1 BEM 命名

遵循 BEM（Block__Element--Modifier）规范：

- **Block（块）**：独立可复用模块，直接命名，如 `.card`、`.form`、`.header`。
- **Element（元素）**：块内部子元素，用 `__` 连接，如 `.card__title`、`.form__input`、`.header__logo`。
- **Modifier（修饰符）**：状态或样式变体，用 `--` 连接，如 `.card--dark`、`.card__title--large`、`.btn--disabled`。

### 2.2 Scoped 作用域

- 组件样式必须使用 `<style scoped>`，防止样式泄漏。
- 需要穿透子组件样式时使用 `::v-deep`（Vue2 语法）。

### 2.3 命名规则

- 全小写、横线连接（kebab-case）。
- 无嵌套过深（建议不超过 3 层）。
- 类名唯一不冲突。

## 3. 未使用变量

- 未使用的变量和导入需自行清理（ESLint 已关闭检查，审核时需指出）。

## 4. Props 解构

- Props 可以解构，但需注意响应式丢失问题。
- 解构后对 prop 值的修改不会触发父组件更新。

## 5. 函数 try/catch

- 推荐在 `computed`、`methods` 等函数中使用 `try/catch` 包裹。
- `catch` 中使用 `console.warn` 打印错误信息。

## 6. 安全

### 6.1 XSS 风险

- `v-html` 渲染的内容必须经过 XSS 过滤或来自可信来源。
- 禁止直接将用户输入通过 `v-html` 渲染。

### 6.2 敏感信息

- 禁止硬编码敏感信息（密码、密钥、Token、私钥）。
- 禁止在日志中输出敏感数据。
- 禁止在前端代码中暴露后端内部接口地址（非公开 API）。

## 7. 绝对禁止项

| 禁止项 | 说明 |
| --- | --- |
| 连续解构 | 禁止 `const { ...data.data }` 等连续解构操作 |
| 修改子组件数据 | 禁止父组件直接修改子组件数据，必须通过 props + emit |
| 修改 data 类型 | 禁止多次修改 data 属性类型（后端给什么值用什么值） |
| 直接修改 props | 禁止直接修改组件 props，应使用 data 或 computed 中转 |

## 8. 推荐实践

| 实践 | 说明 |
| --- | --- |
| 错误处理 | 函数用 try/catch 包裹，catch 中使用 `console.warn` |
| 异步写法 | 优先使用 `async/await`，少用 `.then()` 链式调用 |
| 计算优先 | 可推导数据一律使用 `computed`，而非 `data` |
| v-html 安全 | 可使用，但必须防范 XSS 风险 |
| props 解构 | 可以解构，需注意响应式丢失 |
| 变量清理 | 未使用变量需清理 |
| 注释豁免 | 注释相关问题默认忽略 |
