# computed 规范

**维度**：D06
**严重程度**：🟡 中等
**适用文件**：`.vue`、`.js`

---

## 必须使用 try/catch

所有 `computed` 属性内部必须用 `try/catch` 包裹：

```js
computed: {
  formattedData() {
    try {
      return this.rawData.map(item => item.name)
    } catch (error) {
      console.warn('computed 计算失败:', error)
      return [] // 返回合理的默认值
    }
  }
}
```

---

## 有意义的命名

使用 `isXxx` / `hasXxx` / `visibleXxx` 等前缀标识属性类型。
