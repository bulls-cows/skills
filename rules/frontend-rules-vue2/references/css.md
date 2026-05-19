# CSS 样式规范

## CSS 处理

- 预处理器：Sass/SCSS、Less
- 格式化：csscomb + prettier
- 全局样式：`src/styles/`

## 样式区注释与作用域

### 注释格式

| 场景     | 注释格式              | 示例                    |
| -------- | --------------------- | ----------------------- |
| 模块分组 | `/* 模块名称 */`      | `/* 用户卡片 */`        |
| 子模块   | `/* 模块 > 子模块 */` | `/* 用户卡片 > 头部 */` |
| 响应式   | `/* 响应式 */`        | `/* 响应式 */`          |

### 作用域

- `scoped`：仅作用于当前组件
- 非 `scoped`：需标注 `/* 全局 */`
- 优先使用 `scoped`

## CSS 命名（BEM）

详见 [naming.md](./naming.md#六css-命名bem-规范)（块/元素/修饰符命名规则）。

## CSS 布局推荐

### 定位层级

- `position: relative` 搭配 `z-index: 0` 创建定位上下文，避免子元素 `z-index` 影响外部元素

### 外边距与内边距方向

- **padding**：优先使用 `padding-top`、`padding-left`、`padding-right`，避免 `padding-bottom`
- **margin**：优先使用 `margin-bottom`、`margin-left`、`margin-right`，避免 `margin-top`

**原因**：向下布局更稳定，减少相邻元素的间距叠加问题（margin collapse）。

## CSS 兼容性指南

### 常见兼容性属性

以下属性存在兼容性风险，需提供降级方案：

| 属性                 | 问题                           | 降级方案                            |
| -------------------- | ------------------------------ | ----------------------------------- |
| `gap` (Flexbox)      | Safari 14.4及以下、IE11 不支持 | margin 负边距                       |
| `aspect-ratio`       | iOS 15.6及以下 Safari 支持不全 | `padding-bottom` 百分比 Hack        |
| `100vh`              | iOS Safari 地址栏导致高度偏差  | JS 动态计算或 `dvh` 单位            |
| `inset`              | 旧浏览器不识别                 | 先写 `top/right/bottom/left` 再覆盖 |
| `will-change`        | 动画结束不重置会占用内存       | 动画结束后设为 `auto`               |
| `content-visibility` | 仅 Chromium 支持               | 仅作性能增强，不影响核心布局        |
| `subgrid`            | 浏览器支持不完善               | 传统 Grid/Flex 降级                 |

### 兼容性开发实践

- **查兼容性**：[Can I use](https://caniuse.com/) 查询属性支持情况
- **自动前缀**：配置 Autoprefixer + PostCSS，自动补齐 `-webkit-`、`-ms-` 前缀
- **渐进增强**：使用 `@supports` 包裹新属性，不支持浏览器自动忽略
