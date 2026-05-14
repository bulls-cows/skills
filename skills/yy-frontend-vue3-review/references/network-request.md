# D05 · 网络请求规范

**严重程度**：🟡 中等

---

## 前置检查

编写网络请求前，检查项目是否安装 `ahooks-vue` 或 `vue-hooks-plus`：

- 已安装 → 使用 `useRequest`（自动管理 loading/data）
- 未安装 → 使用手动 `async/await` + `try/catch/finally`

---

## 必须使用

`async/await` + `try/catch/finally`（未安装 useRequest 时）

---

## 禁止

- 多层 try/catch 嵌套，异步操作需扁平化
- 连续解构：禁止 `...data.data` 等

---

## 统一响应处理模式

```typescript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  // 处理成功逻辑
} else {
  // 处理失败逻辑
}
```
