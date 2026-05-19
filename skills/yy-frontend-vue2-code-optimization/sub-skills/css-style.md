# T04 🎨 CSS/BEM 架构规范（🟡 中风险）

**定位**：🟡 中风险。样式隔离与规范化，涉及模板 class 属性同步修改。

## 相关规则

执行本任务前，请先阅读以下规则文件（位于 `rules/` 目录），按优先级从高到低排列：

- **`rules/spec-index.md`**：Vue2 前端项目开发规范总纲（必读）
- **`rules/naming.md`**：CSS BEM 命名规范（块/元素/修饰符）
- **`rules/css.md`**：CSS 样式规范、响应式适配、作用域规范

## BEM 转换规范

- **块（Block）**：独立模块，直接命名（如 `card`、`form`）
- **元素（Element）**：块内部子元素，用 `__` 连接（如 `card__title`、`form__input`）
- **修饰符（Modifier）**：状态/样式变体，用 `--` 连接（如 `card--dark`、`card__title--large`）
- **命名规则**：全小写、横线连接、语义清晰、类名唯一不冲突

## 嵌套结构规范

### SCSS 嵌套（推荐 `&` 引用）

```scss
// ✅ 正确：使用 & 引用父选择器，嵌套层级 ≤ 2
.user-card {
  padding: 16px;

  // 元素嵌套在块内
  .user-card__header {
    font-weight: bold;

    // 修饰符嵌套在元素内
    &.user-card__header--active {
      color: #1890ff;
    }
  }

  .user-card__body {
    /* ... */
  }
}
```

### LESS 嵌套（推荐 `&` 引用）

```less
// ✅ 正确：利用 & 语法构建 BEM，与 SCSS 类似
.user-card {
  padding: 16px;

  &__header {
    font-weight: bold;

    &--active {
      color: #1890ff;
    }
  }

  &__body {
    /* ... */
  }
}
```

> **说明**：LESS 的 `&` 语法更简洁，但编译后与 SCSS 输出等价。推荐 LESS 中使用 `&__element` 简化写法，SCSS 中使用 `&` 或类名嵌套。

### Vue2 scoped 样式最佳实践

```vue
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

### 禁止嵌套场景

```scss
// ❌ 禁止：嵌套层级过深（> 2 层）
.user-card {
  .user-card__header {
    .user-card__title {
      .user-card__title-text { /* 禁止 */ }
    }
  }
}

// ❌ 禁止：元素类型选择器嵌套（降低特异性）
.user-card {
  .user-card__header {
    img { ... }  // 应改用类名
    span { ... }
  }
}

// ❌ 禁止：使用后代选择器嵌套（降低性能）
.user-card {
  .some-class {
    ul {
      li { ... }  // 应展平为独立类
    }
  }
}
```

### 推荐结构

- **嵌套最大深度**：2 层（块 → 元素 → 修饰符）
- **修饰符**：与块/元素同级，或使用 `&` 引用
- **媒体查询**：可嵌套在对应块/元素内部

## 样式结构与作用域

- **全小写，横线连接**，类名唯一不冲突
- **scoped 优先**：Vue 组件必须使用 `<style scoped>`
- **全局样式标注**：非 scoped 需在顶部标注 `/* 全局 */`

## 模板 class 同步修改

**⚠️ 关键规则**：scoped 样式中的 class 修改时，必须同步修改模板中的 class 属性。

### 示例

**修改前**：

```vue
<template>
  <div class="userCard">
    <div class="header">...</div>
  </div>
</template>

<style scoped>
.userCard {
  .header { ... }
}
</style>
```

**修改后（BEM 规范）**：

```vue
<template>
  <div class="user-card">
    <div class="user-card__header">...</div>
  </div>
</template>

<style scoped>
/* 用户卡片 */
.user-card {
  padding: 16px;

  /* 用户卡片 > 头部 */
  .user-card__header {
    font-weight: bold;
  }
}
</style>
```

## 响应式适配

- 使用媒体查询 `@media` 适配不同屏幕
- 移动端优先：先写移动端，再通过媒体查询增强 PC 端

```scss
/* 用户卡片 */
.user-card {
  padding: 16px;

  /* 响应式 */
  @media (max-width: 768px) {
    padding: 8px;
  }
}
```

## CSS 布局推荐

### 定位层级

- `position: relative` 搭配 `z-index: 0` 创建定位上下文，避免子元素 `z-index` 影响外部元素

```scss
// ✅ 正确：创建独立定位上下文
.modal-wrapper {
  position: relative;
  z-index: 0;

  .modal-overlay {
    position: absolute;
    z-index: 10; // 不会影响外部元素
  }
}
```

### 外边距与内边距方向

- **padding**：优先使用 `padding-top`、`padding-left`、`padding-right`，避免 `padding-bottom`
- **margin**：优先使用 `margin-bottom`、`margin-left`、`margin-right`，避免 `margin-top`

**原因**：向下布局更稳定，减少相邻元素的间距叠加问题（margin collapse）。

```scss
// ✅ 推荐：向下布局
.section {
  margin-bottom: 24px; // 与下一个元素的间距
  padding-top: 16px;
  padding-left: 20px;
  padding-right: 20px;
}

// ❌ 不推荐：向上布局
.section {
  margin-top: 24px; // 可能与上一个元素的 margin-bottom叠加
  padding-bottom: 16px;
}
```

## CSS 兼容性指南

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

### 降级方案示例

#### gap 降级

```scss
// ❌ 直接使用 gap（兼容性问题）
.flex-container {
  display: flex;
  gap: 16px;
}

// ✅ 使用 margin 负边距降级
.flex-container {
  display: flex;
  margin-left: -16px;
  margin-top: -16px;

  > * {
    margin-left: 16px;
    margin-top: 16px;
  }
}
```

#### aspect-ratio 降级

```scss
// ❌ 直接使用 aspect-ratio
.video-box {
  aspect-ratio: 16/9;
}

// ✅ 使用 padding-bottom Hack
.video-box {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; // 9/16 = 56.25%

  > video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
```

#### 100vh 降级

```scss
// ❌ 直接使用 100vh
.full-height {
  height: 100vh;
}

// ✅ 使用 dvh 或 JS 动态计算
.full-height {
  height: 100vh;
  height: 100dvh; // 新单位，支持动态视口高度
}
```

### 兼容性开发实践

- **查兼容性**：[Can I use](https://caniuse.com/) 查询属性支持情况
- **自动前缀**：配置 Autoprefixer + PostCSS，自动补齐 `-webkit-`、`-ms-` 前缀
- **渐进增强**：使用 `@supports` 包裹新属性，不支持浏览器自动忽略

```scss
// ✅ 使用 @supports 渐进增强
@supports (gap: 16px) {
  .flex-container {
    gap: 16px;
    margin: 0; // 移除降级方案的 margin
  }
}
```
