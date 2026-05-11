# T04 🎨 CSS/BEM 架构规范（🟡 中风险）

**定位**：🟡 中风险。样式隔离与规范化，涉及模板 class 属性同步修改。

## 相关规则

执行本任务前，请先阅读以下规则文件（位于 `rules/` 目录），按优先级从高到低排列：

- **`rules/rules.md`**：Vue3 前端项目开发规范总纲（必读）
- **`rules/naming.md`**：CSS BEM 命名规范（块/元素/修饰符）

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

  .user-card__body { /* ... */ }
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

  &__body { /* ... */ }
}
```

> **说明**：LESS 的 `&` 语法更简洁，但编译后与 SCSS 输出等价。推荐 LESS 中使用 `&__element` 简化写法，SCSS 中使用 `&` 或类名嵌套。

### Vue3 scoped 样式最佳实践

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
  <!-- 同步修改模板中的 class -->
  <div class="user-card">
    <div class="user-card__header">...</div>
  </div>
</template>

<style scoped>
/* 用户卡片 */
.user-card {
  /* 用户卡片 > 头部 */
  .user-card__header { ... }
}
</style>
```

## CSS 变量使用规范

Vue3 推荐使用 CSS 变量实现动态样式：

```vue
<style scoped>
.user-card {
  /* 使用 CSS 变量定义主题色 */
  --primary-color: #1890ff;
  --border-radius: 8px;

  background-color: var(--primary-color);
  border-radius: var(--border-radius);
}
</style>
```
