# 逻辑错误

**维度**：D07
**严重程度**：🔴 严重
**适用文件**：`.vue`、`.js`

---

## 空指针引用 🔴

- 访问对象属性前检查对象是否存在
- 使用可选链 `?.` 或短路 `&&` 进行安全访问

**错误示例**：

```js
const userName = this.user.info.name
const firstItem = this.list[0].name
```

**正确示例**：

```js
const userName = this.user?.info?.name
const firstItem = this.list?.[0]?.name

// 或短路判断
const userName = this.user && this.user.info && this.user.info.name
```

---

## 数组越界 🔴

- 访问数组元素前检查索引是否在有效范围内
- 使用 `arr[index]` 时确保 `index >= 0 && index < arr.length`

**错误示例**：

```js
const firstItem = this.list[0]
const lastItem = this.list[this.list.length - 1]
```

**正确示例**：

```js
const firstItem = this.list.length > 0 ? this.list[0] : null
const lastItem = this.list.length > 0 ? this.list[this.list.length - 1] : null
```

---

## 逻辑判断遗漏 🔴

- 条件判断逻辑正确，无遗漏分支
- `if/else` 覆盖所有预期情况
- 布尔表达式无冗余或矛盾

**错误示例**：

```js
if (this.status === 1) {
  // 处理已完成
} else if (this.status === 2) {
  // 处理进行中
}
// 遗漏 status = 0、3 等情况，可能导致逻辑错误
```

**正确示例**：

```js
if (this.status === 1) {
  // 处理已完成
} else if (this.status === 2) {
  // 处理进行中
} else {
  // 默认分支处理
}
```

---

## 方法内部顺序 🟡

方法内部逻辑应按以下顺序组织：

1. 初始化方法（变量初始化、状态准备）
2. 网络请求（数据获取）
3. 事件处理（交互响应）
4. 特殊计算（数据处理、转换）
