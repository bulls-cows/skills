# 逻辑错误与网络请求规范

**严重程度**：🔴 严重（逻辑错误）/ 🟡 中等（网络请求、computed）

---

## 1. 逻辑错误

### 1.1 空指针引用

**严重程度**：🔴 严重

- 访问对象属性前检查对象是否存在
- 使用可选链 `?.` 或短路 `&&` 进行安全访问

**错误示例**：

```js
// ❌ 空指针风险
const userName = this.user.info.name

// ❌ 数组空值访问
const firstItem = this.list[0].name
```

**正确示例**：

```js
// ✅ 安全访问
const userName = this.user?.info?.name
const firstItem = this.list?.[0]?.name

// ✅ 短路判断
const userName = this.user && this.user.info && this.user.info.name
```

---

### 1.2 数组越界

**严重程度**：🔴 严重

- 访问数组元素前检查索引是否在有效范围内
- 使用 `arr[index]` 时确保 `index >= 0 && index < arr.length`

**错误示例**：

```js
// ❌ 数组越界风险
const firstItem = this.list[0]
const lastItem = this.list[this.list.length - 1]
```

**正确示例**：

```js
// ✅ 边界检查
const firstItem = this.list.length > 0 ? this.list[0] : null
const lastItem = this.list.length > 0 ? this.list[this.list.length - 1] : null
```

---

### 1.3 逻辑判断错误

**严重程度**：🔴 严重

- 条件判断逻辑正确，无遗漏分支
- `if/else` 覆盖所有预期情况
- 布尔表达式无冗余或矛盾

**错误示例**：

```js
// ❌ 遗漏边界情况
if (this.status === 1) {
  // 处理已完成
} else if (this.status === 2) {
  // 处理进行中
}
// 遗漏 status = 0、3 等情况，可能导致逻辑错误
```

**正确示例**：

```js
// ✅ 完整覆盖
if (this.status === 1) {
  // 处理已完成
} else if (this.status === 2) {
  // 处理进行中
} else {
  // 默认分支处理
}
```

---

### 1.4 方法内部逻辑顺序

**严重程度**：🟡 中等

方法内部逻辑应按以下顺序组织：

1. 初始化方法（变量初始化、状态准备）
2. 网络请求（数据获取）
3. 事件处理（交互响应）
4. 特殊计算（数据处理、转换）

---

## 2. 网络请求规范

### 2.1 必须使用 async/await + try/catch/finally

**严重程度**：🟡 中等

**标准模式**：

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

### 2.2 禁止多层 try/catch 嵌套

**严重程度**：🟡 中等

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

### 2.3 统一响应处理模式

**严重程度**：🟡 中等

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

---

## 3. computed 规范

### 3.1 必须使用 try/catch

**严重程度**：🟡 中等

所有 `computed` 属性内部必须用 `try/catch` 包裹，防止计算失败导致组件崩溃：

```js
computed: {
  formattedData() {
    try {
      return this.rawData.map(item => item.name)
    } catch (error) {
      console.warn('computed 计算失败:', error)
      return []  // 返回合理的默认值
    }
  }
}
```

---

### 3.2 有意义的命名

**严重程度**：🟡 中等

computed 名称应清晰表达其含义，常用前缀：

| 前缀 | 含义 | 示例 |
|------|------|------|
| `is` | 布尔状态 | `isLoading`、`isValid` |
| `has` | 存在性判断 | `hasData`、`hasPermission` |
| `visible` | 可见性 | `isDialogVisible` |
| `formatted` / `parsed` | 数据转换 | `formattedDate` |

---

## 4. 常见错误模式

| 错误模式 | 严重程度 | 说明 |
|---------|----------|------|
| 未判空直接访问属性 | 🔴 严重 | 可能导致 `Cannot read property of undefined` |
| 数组索引未越界检查 | 🔴 严重 | 可能导致数组越界访问 |
| 网络请求无 try/catch | 🟡 中等 | 请求失败时可能导致白屏 |
| 网络请求无 finally 清理 | 🟡 中等 | loading 状态可能永远为 true |
| computed 无 try/catch | 🟡 中等 | 计算失败时组件崩溃 |
| 多层 try/catch 嵌套 | 🟡 中等 | 代码可读性差，难以调试 |
