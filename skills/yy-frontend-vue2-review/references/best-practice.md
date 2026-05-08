# 最佳实践

**维度**：D02
**严重程度**：🟢 轻微
**适用文件**：`.vue`、`.css`、`.scss`、`.less`

---

## 调试代码清理 🟢

- 提交前清理所有 `console.log`、`debugger`、`alert` 等调试代码
- **例外**：`catch` 块中的 `console.warn` 不视为问题，允许保留用于错误日志

```js
// ❌ 提交前应清理
console.log('用户数据:', user)
debugger
alert('调试')

// ✅ catch 块中的 console.warn 允许
try {
  // ...
} catch (error) {
  console.warn('操作失败:', error)
}
```

---

## 样式规范

### BEM 命名 🟢

遵循 BEM（Block\_\_Element--Modifier）规范：

- **Block**：独立可复用模块，如 `.card`、`.form`
- **Element**：块内部子元素，用 `__` 连接，如 `.card__title`
- **Modifier**：状态或样式变体，用 `--` 连接，如 `.card--dark`

```scss
.user-card {              // Block
  &__header { }           // Element
  &__avatar { }           // Element
  &--disabled { }         // Modifier
}
```

### Scoped 作用域 🟢

- 组件样式必须使用 `<style scoped>`，防止样式泄漏
- 需要穿透子组件样式时使用 `::v-deep`（Vue2 语法）

```vue
<style scoped lang="scss">
.parent {
  ::v-deep .child-component {
    color: red;
  }
}
</style>
```

### 其他样式规则 🟢

- 全小写、横线连接（kebab-case）
- 嵌套不超过 3 层
- 类名唯一不冲突

---

## 未使用变量 🟢

- 未使用的变量和导入需自行清理
- ESLint 已关闭检查，但审核时需指出

---

## Props 解构 🟢

- Props 可以解构，但需注意响应式丢失问题
- 解构后对 prop 值的修改不会触发父组件更新

---

## 函数 try/catch 🟡

- 推荐在 `computed`、`methods` 等函数中使用 `try/catch` 包裹
- `catch` 中使用 `console.warn` 打印错误信息
