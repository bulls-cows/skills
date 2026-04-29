# 样式注释规范

## 注释格式

| 场景       | 注释格式                | 示例                      |
| ---------- | ----------------------- | ------------------------- |
| 模块分组   | `/* 模块名称 */`        | `/* 用户卡片 */`          |
| 子模块     | `/* 模块 > 子模块 */`   | `/* 用户卡片 > 头部 */`   |
| 响应式     | `/* 响应式: 描述 */`    | `/* 响应式: 平板以下 */`  |

## 注释规则

- 注释放置在对应选择器或媒体查询**上方**
- 每条注释独占一行，不超过一行
- 使用 `/* ... */` 块注释格式
- 子模块注释需体现层级关系（用 `>` 连接）

## 作用域标注

- `<style scoped>`：默认局部作用域，无需额外标注
- `<style>`（无 scoped）：需在样式区顶部标注 `/* 全局样式 */`

## 示例

```scss
<style scoped lang="scss">
/* 用户卡片 */
.user-card {
  padding: 16px;
  border-radius: 8px;

  /* 用户卡片 > 头部 */
  .user-card__header {
    font-weight: bold;
    display: flex;
    align-items: center;

    /* 用户卡片 > 头像 */
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  /* 用户卡片 > 信息区 */
  .user-card__info {
    margin-top: 12px;
    color: #666;
  }

  /* 响应式: 768px 以下 */
  @media (max-width: 768px) {
    .user-card {
      padding: 12px;
    }
  }
}
</style>
```

### 全局样式示例

```scss
<style lang="scss">
/* 全局样式 */

/* 通用按钮 */
.btn {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}
</style>
```
