# CSS 样式规范

## BEM 命名规范

- **块**：独立模块（`card`、`form`）
- **元素**：块内部子元素（`card__title`、`form__input`）
- **修饰符**：状态/样式变体（`card--dark`、`card__title--large`）
- **规则**：全小写、横线连接、无嵌套、类名唯一

### 示例

```scss
.user-card {
  padding: 16px;
  .user-card__header {
    font-weight: bold;
    &--active { color: #1890ff; }
  }
}
```

## 样式区注释与作用域

### 注释格式

| 场景 | 注释格式 | 示例 |
|------|----------|------|
| 模块分组 | `/* 模块名称 */` | `/* 用户卡片 */` |
| 子模块 | `/* 模块 > 子模块 */` | `/* 用户卡片 > 头部 */` |
| 响应式 | `/* 响应式 */` | `/* 响应式 */` |

### 作用域

- `scoped`：仅作用于当前组件
- 非 `scoped`：需标注 `/* 全局 */`
- 优先使用 `scoped`

## CSS 处理

- 预处理器：Sass/SCSS
- 格式化：csscomb + prettier
- 全局样式：`src/styles/`

## 响应式适配

- 使用媒体查询 `@media` 适配不同屏幕
- 移动端优先：先写移动端，再通过媒体查询增强 PC 端
- 单位选择：宽度用 `px` 或 `rem`，字号用 `px`

## 自定义指令

- **指令清理**：`unmounted` 钩子中必须清理事件监听器和定时器
- 详见 [performance.md](./performance.md)
