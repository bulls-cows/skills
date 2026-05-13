# D06 · computed 规范

**严重程度**：🟡 中等

---

## 纯函数原则

computed 应为纯函数，避免副作用（如修改响应式数据、发起网络请求）。

---

## 命名使用有意义名称

如 `isXxx`/`hasXxx`/`visibleXxx`/`filteredXxx` 等。

---

## 复杂逻辑建议 try/catch

如果 computed 内部包含可能抛出异常的操作（如 JSON.parse），建议用 try/catch 包裹并返回安全 fallback。
