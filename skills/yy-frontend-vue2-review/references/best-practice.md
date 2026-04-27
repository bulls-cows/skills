# 最佳实践与安全检查细则

## 安全漏洞检查

- 是否有 XSS 风险（特别是使用 v-html 时）
- 是否有敏感信息泄露
- 是否有硬编码的敏感信息

## 最佳实践检查

- 是否有 console.log/debugger 等调试代码（**例外：在 catch 块中的 console.warn 不视为问题**）
- 是否有未使用的变量和导入（ESLint 已关闭检查，需手动清理）
- 组件是否使用 scoped 样式
- 样式是否遵循 BEM 规范
- 是否有多层 try/catch 嵌套（不推荐）
- 函数 try/catch：推荐使用 try/catch 包裹函数内容，包括 computed、methods 等，catch 中使用 console.warn 打印错误

## 注意事项

- 注释相关问题默认忽略，不进行检查
- v-html：可使用，但必须防范 XSS 风险
- props 解构：可以解构（需注意响应式丢失）
