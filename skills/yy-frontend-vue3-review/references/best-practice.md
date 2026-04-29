# 最佳实践

## 调试代码清理

- 清理 `console.log` / `debugger` 等调试代码。
- **例外**：catch 块中的 `console.warn` 不视为问题。

## 样式规范

- 使用 **BEM 命名** + `scoped` 作用域。
- 非 scoped 样式需标注 `/* 全局 */`。

### BEM 规则

- **块**：独立模块，直接命名（如 `card`、`form`）。
- **元素**：块内部子元素，用 `__` 连接（如 `card__title`、`form__input`）。
- **修饰符**：状态/样式变体，用 `--` 连接（如 `card--dark`、`card__title--large`）。
- **命名规则**：全小写、横线连接、无嵌套、类名唯一不冲突。

## 未使用变量

- 需自行清理（ESLint 已关闭检查）。

## 函数 try/catch

- 推荐包裹 computed、methods 等。
- catch 中使用 `console.warn` 打印错误。

## Hooks 规范

- 可复用逻辑超过 30 行或跨 2 个以上组件时，必须抽离为 Hook。
- Hooks 必须返回对象（推荐 `toRefs` 解构后返回）。
- **禁止**直接返回 reactive 对象。
- **禁止**将 Hooks 挂载到响应式数据上。

## 组件拆分

- 弹窗拆分为独立组件。
- 表格/表单组件与业务逻辑分离。

## defineExpose

- 明确声明对外暴露的属性和方法。

## 组件懒加载

- 路由和大组件使用 `defineAsyncComponent` 动态导入。

## 安全

- **XSS 风险**：`v-html` 必须防范 XSS 风险。
- **敏感信息**：检查敏感信息泄露和硬编码敏感信息（密钥、Token、密码）。

## 绝对禁止项

| 禁止项 | 说明 |
| ------ | ---- |
| 连续解构 | 禁止 `...data.data` 等连续解构 |
| 修改子组件数据 | 禁止父组件直接修改子组件数据 |
| 修改 ref/reactive 类型 | 禁止多次修改 ref/reactive 属性类型（后端给什么值用什么值） |
| 直接修改 props | 禁止直接修改 props（使用 `props.xxx` 只读访问） |
| 使用 this | 禁止在 `<script setup>` 中使用 `this` |
| Options API | 禁止使用 Options API 写法（data/methods/mounted 等） |
| 使用 mixins | 禁止使用 mixins |
| 多层 try/catch | 禁止多个 try/catch 嵌套 |

## 推荐实践

1. 错误处理：函数用 try/catch 包裹，catch 中使用 `console.warn` 打印错误。
2. 异步写法：尽可能使用 async/await，少用 `.then()` 链式写法。
3. 计算优先：除与后端交互的数据和部分定时器外，其它尽可能使用 `computed`。
4. v-html：可使用，但必须防范 XSS 风险。
5. 响应式数据：优先使用 `ref`，复杂对象使用 `reactive`；注意 `ref` 访问必须 `.value`。
6. Hooks：可复用的逻辑抽离到 `useXxx` 组合式函数中，放在 `@src/hooks/` 目录。
7. 未使用变量：需自行清理（ESLint 已关闭检查）。
8. 注释检查：注释相关问题默认忽略，不进行检查。
9. 不要过度封装：简单逻辑直接写在 template 中。
10. 组件懒加载：路由和大组件使用 `defineAsyncComponent` 动态导入。
11. KeepAlive：合理使用 `<KeepAlive>` 页面缓存。
