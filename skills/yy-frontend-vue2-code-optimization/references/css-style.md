# CSS/BEM 架构规范

**定位**：🟡 低风险。样式隔离与规范化，通常不影响业务逻辑。

## BEM 转换规范

- **块**：独立模块，直接命名（如 `card`、`form`）
- **元素**：块内部子元素，用 `__` 连接（如 `card__title`、`form__input`）
- **修饰符**：状态/样式变体，用 `--` 连接（如 `card--dark`、`card__title--large`）
- **命名规则**：全小写、横线连接、无嵌套、类名唯一不冲突

### BEM 示例

```scss
.user-card {
  padding: 16px;
  .user-card__header {
    font-weight: bold;
    &--active {
      color: #1890ff;
    }
  }
}
```

## 样式结构与作用域

- **样式结构**：全小写，横线连接，禁止嵌套过深，无嵌套选择器
- **作用域检查**：优先 `scoped`，非 scoped 需标注 `/* 全局 */`，确保不污染全局
