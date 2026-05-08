# 网络请求规范

**维度**：D05
**严重程度**：🟡 中等
**适用文件**：`.vue`、`.js`

---

## async/await + try/catch/finally

所有网络请求必须遵循此标准模式：

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

## 禁止多层 try/catch 嵌套 🟡

- 异步操作需扁平化处理
- 避免在 try 块内再嵌套 try/catch
- 使用 `async/await` 替代 `.then()` 链式调用来降低嵌套深度

**错误示例**：

```js
// ❌ 多层嵌套
async function badExample() {
  try {
    try {
      // 嵌套 try/catch
    } catch (e) { /* ... */ }
  } catch (error) { /* ... */ }
}
```

---

## 统一响应处理模式 🟡

所有网络请求必须遵循统一响应模式：

```js
const { code, data, msg } = await apiXXX()
if (code === 0) {
  this.$message.success(msg || '操作成功')
} else {
  this.$message.error(msg)
}
```

**规范说明**：

- `code === 0` 表示成功，调用 `this.$message.success()`
- 非零 `code` 表示失败，调用 `this.$message.error()`
- `msg` 为空时使用默认文案
