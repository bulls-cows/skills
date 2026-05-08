# computed 规范

**维度**：D06
**严重程度**：🟡 中等
**适用文件**：`.vue`、`.js`

---

## 必须使用 try/catch 🟡

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

## 有意义命名 🟡

computed 名称应清晰表达其含义，常用前缀：

| 前缀 | 含义 | 示例 |
|------|------|------|
| `is` | 布尔状态 | `isLoading`、`isValid` |
| `has` | 存在性判断 | `hasData`、`hasPermission` |
| `visible` | 可见性 | `isDialogVisible` |
| `formatted` / `parsed` | 数据转换 | `formattedDate` |

---

## 同步 getter

- computed 内部应为同步操作
- 禁止在 computed 中发起网络请求或异步操作
