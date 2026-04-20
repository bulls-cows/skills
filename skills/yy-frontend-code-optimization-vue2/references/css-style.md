# CSS 与 BEM 样式规范

## BEM 命名规范

使用 BEM 规范：块\_\_元素--修饰符

- **块**：独立模块，直接命名（如 card、form）
- **元素**：块内部子元素，块\_\_元素（如 card\_\_title、form\_\_input）
- **修饰符**：状态/样式变体，块--修饰符/元素--修饰符（如 card--dark、card\_\_title--large）
- 全小写、横线连接单词、无嵌套、类名唯一不冲突

**示例**：

```scss
/* 用户卡片 */
.user-card {
  padding: 16px;

  /* 用户卡片 > 头部 */
  .user-card__header {
    font-weight: bold;

    /* 用户卡片 > 头部--激活状态 */
    &--active {
      color: #1890ff;
    }
  }
}
```

## 样式区注释规范

| 场景 | 注释格式 | 示例 |
| ---- | -------- | ---- |
| 模块分组 | `/* 模块名称 */` | `/* 用户卡片 */` |
| 子模块 | `/* 模块 > 子模块 */` | `/* 用户卡片 > 头部 */` |
| 响应式 | `/* 响应式 */` | `/* 响应式 */` |

**样式作用域**：

- `scoped`：样式仅作用于当前组件
- 非 `scoped`：需标注 `/* 全局 */`

**示例**：

```scss
<style scoped>
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
</style>
```
