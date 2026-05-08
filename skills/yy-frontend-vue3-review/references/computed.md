# D06 · computed 规范（🟡 中等）

## 命名

- 使用有意义名称，能清晰表达计算逻辑
- 布尔值：`isXxx`/`hasXxx`/`visibleXxx` 等
- 数据类：`computedXxx`、`filteredXxx`、`formattedXxx` 等

## 使用规范

- **纯函数原则**：computed 应为纯函数，避免副作用（如修改响应式数据、发起网络请求）
- **避免在 computed 中修改状态**：不要调用 `xxx.value = yyy`
- **复杂逻辑建议 try/catch**：如果 computed 内部包含可能抛出异常的操作（如 JSON.parse、复杂计算），建议用 try/catch 包裹，并在 catch 中返回安全的 fallback 值

## Vue3 特有注意事项

- computed 返回的是 `ComputedRef<T>`，访问时需要 `.value`
- 可以使用 `computed(() => ...)` 或 `computed({ get: () => ..., set: (v) => ... })`
- 避免在 computed 中直接调用异步函数（如需异步，考虑使用 async computed 第三方库或改写为 watch + ref）
