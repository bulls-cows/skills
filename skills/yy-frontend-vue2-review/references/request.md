# 网络请求规范

**维度**：D05
**严重程度**：🟡 中等
**适用文件**：`.vue`、`.js`

---

## 必须使用 async/await + try/catch/finally

```js
async function fetchData() {
  try {
    const { code, data, msg } = await apiGetXXX()
    if (code === 0) {
      this.$message.success(msg || '操作成功')
      // 处理 data
    } else {
      this.$message.error(msg)
    }
  } catch (error) {
    console.warn('请求失败:', error)
  } finally {
    // 清理操作（如 loading 状态重置）
  }
}
```

---

## 禁止多层 try/catch 嵌套

异步操作需扁平化处理，避免多层嵌套。

---

## 统一响应处理模式

| 响应码 | 处理方式 |
| ------ | -------- |
| `code === 0` | 成功，调用 `this.$message.success()` |
| 非零 `code` | 失败，调用 `this.$message.error()` |
| `msg` 为空 | 使用默认文案 |
