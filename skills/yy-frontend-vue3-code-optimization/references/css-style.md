# CSS 与 BEM 样式规范

## BEM 命名定义

- **块（Block）**：独立模块，直接命名（如 `card`, `form`, `user-card`）
- **元素（Element）**：块内部子元素，用 `__` 连接（如 `card__title`, `form__input`）
- **修饰符（Modifier）**：状态/样式变体，用 `--` 连接（如 `card--dark`, `card__title--large`）

### 命名规则

- 全小写
- 横线连接（kebab-case）
- 无嵌套过深
- 类名唯一不冲突

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

## 代码格式

- 2 空格缩进
- 统一换行风格
- 属性按字母顺序或逻辑顺序排列

## 注释规范

| 场景     | 注释格式              | 示例                    |
| -------- | --------------------- | ----------------------- |
| 模块分组 | `/* 模块名称 */`      | `/* 用户卡片 */`        |
| 子模块   | `/* 模块 > 子模块 */` | `/* 用户卡片 > 头部 */` |
| 响应式   | `/* 响应式 */`        | `/* 响应式 */`          |

### CSS 注释示例

```scss
/* 用户卡片 */
.user-card {
  padding: 16px;
  border-radius: 8px;

  /* 用户卡片 > 头部 */
  .user-card__header {
    font-weight: bold;

    /* 响应式 */
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
}
```

## 作用域标注

- 优先使用 `scoped`。
- 非 scoped 样式必须标注 `/* 全局 */` 注释说明。

```vue
<style scoped>
/* 组件内部样式 */
</style>

<style>
/* 全局 */
.global-reset {
  margin: 0;
}
</style>
```
