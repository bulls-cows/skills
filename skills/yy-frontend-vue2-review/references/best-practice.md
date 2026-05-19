# 最佳实践规范

**维度**：D02
**严重程度**：🟢 轻微
**适用文件**：所有（`.vue`、`.js`、`.css`、`.scss`、`.less`）

---

## 调试代码清理

提交前清理所有调试代码：

| 类型          | 处理     |
| ------------- | -------- |
| `console.log` | 必须清理 |
| `debugger`    | 必须清理 |
| `alert`       | 必须清理 |

**例外**：`catch` 块中的 `console.warn` 不视为问题，允许保留。

---

## 样式规范

### BEM 命名

遵循 BEM（Block\_\_Element--Modifier）规范：

| 类型     | 说明                         | 示例             |
| -------- | ---------------------------- | ---------------- |
| Block    | 独立可复用模块               | `.card`、`.form` |
| Element  | 块内部子元素，用 `__` 连接   | `.card__title`   |
| Modifier | 状态或样式变体，用 `--` 连接 | `.card--dark`    |

### Scoped 作用域

组件样式必须使用 `<style scoped>`，防止样式泄漏。

### 样式穿透

使用 `::v-deep`（Vue2 语法）进行样式穿透。

### 嵌套规范

- 嵌套不超过 3 层
- 全小写、横线连接
- **CSS 嵌套原生写法不推荐**：不推荐直接使用原生嵌套语法，需经 PostCSS 编译后使用

---

## CSS 布局推荐

### 定位层级

- `position: relative` 搭配 `z-index: 0` 创建定位上下文，避免子元素 `z-index` 影响外部元素

### 外边距与内边距方向

- **padding**：优先使用 `padding-top`、`padding-left`、`padding-right`，避免 `padding-bottom`
- **margin**：优先使用 `margin-bottom`、`margin-left`、`margin-right`，避免 `margin-top`

**原因**：向下布局更稳定，减少相邻元素的间距叠加问题（margin collapse）。

---

## CSS 兼容性指南

以下属性存在兼容性风险，需提供降级方案：

| 属性                 | 问题                            | 降级方案                            |
| -------------------- | ------------------------------- | ----------------------------------- |
| `gap` (Flexbox)      | Safari 14.4及以下、IE11 不支持  | margin 负边距                       |
| `aspect-ratio`       | iOS 15.6及以下 Safari 支持不全  | `padding-bottom` 百分比 Hack        |
| `100vh`              | iOS Safari 地址栏导致高度偏差   | JS 动态计算或 `dvh` 单位            |
| `inset`              | 旧浏览器不识别                  | 先写 `top/right/bottom/left` 再覆盖 |
| `will-change`        | 动画结束不重置会占用内存        | 动画结束后设为 `auto`               |
| `content-visibility` | 仅 Chromium 支持                | 仅作性能增强，不影响核心布局        |
| `subgrid`            | 浏览器支持不完善                | 传统 Grid/Flex 降级                 |
| `:has()` 伪类        | Safari 15.4-15.6 存严重渲染 Bug | 谨慎在生产环境使用                  |

### 兼容性开发实践

- **查兼容性**：[Can I use](https://caniuse.com/) 查询属性支持情况
- **自动前缀**：配置 Autoprefixer + PostCSS，自动补齐 `-webkit-`、`-ms-` 前缀
- **渐进增强**：使用 `@supports` 包裹新属性，不支持浏览器自动忽略

---

## 不推荐项

| 项               | 说明                                                |
| ---------------- | --------------------------------------------------- |
| CSS 嵌套原生写法 | 不推荐直接使用原生嵌套语法，需经 PostCSS 编译后使用 |
| `:has()` 伪类    | Safari 15.4-15.6 存严重渲染 Bug，谨慎在生产环境使用 |

---

## 未使用变量

需自行清理（ESLint 已关闭检查，但审核需指出）。

---

## Props 解构

可以解构，需注意响应式丢失问题。
