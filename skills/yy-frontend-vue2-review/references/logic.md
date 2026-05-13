# 逻辑错误规范

**维度**：D07
**严重程度**：🔴 严重
**适用文件**：`.vue`、`.js`

---

## 空指针引用

访问对象属性前检查对象是否存在，使用可选链 `?.` 或短路 `&&` 进行安全访问：

```js
// ❌ 空指针风险
const userName = this.user.info.name

// ✅ 安全访问
const userName = this.user?.info?.name
```

---

## 数组越界

访问数组元素前检查索引是否在有效范围内：

```js
// ❌ 数组越界风险
const firstItem = this.list[0]

// ✅ 边界检查
const firstItem = this.list.length > 0 ? this.list[0] : null
```

确保 `index >= 0 && index < arr.length`。

---

## 逻辑判断错误

- 条件判断逻辑正确，无遗漏分支
- `if/else` 覆盖所有预期情况

---

## 方法内部逻辑顺序

| 序号 | 类型 | 说明 |
| ---- | ---- | ---- |
| 1 | 初始化方法 | 变量初始化、状态准备 |
| 2 | 网络请求 | 数据获取 |
| 3 | 事件处理 | 交互响应 |
| 4 | 特殊计算 | 数据处理、转换 |
