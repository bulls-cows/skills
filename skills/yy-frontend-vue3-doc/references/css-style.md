# 样式注释约定

## 模块分组

顶级选择器使用 `/* 模块名称 */` 标注：

```css
/* 用户卡片 */
.user-card {
  padding: 16px;
  border-radius: 8px;
}
```

## 子模块

BEM 元素或嵌套子级使用 `/* 模块 > 子模块 */` 标注：

```css
/* 用户卡片 > 头部 */
.user-card__header {
  display: flex;
  align-items: center;
}

/* 用户卡片 > 头部 > 头像 */
.user-card__avatar {
  width: 40px;
  height: 40px;
}
```

## 响应式

媒体查询块统一标注 `/* 响应式 */`：

```css
/* 响应式 */
@media (max-width: 768px) {
  .user-card {
    padding: 8px;
  }
}
```

可进一步标注具体断点：

```css
/* 响应式: 平板 */
@media (max-width: 768px) { ... }

/* 响应式: 手机 */
@media (max-width: 480px) { ... }
```

## CSS 变量绑定（v-bind）

Vue3 特有的 `v-bind()` CSS 变量绑定，标注变量名：

```css
/* CSS变量绑定: themeColor */
.header {
  color: v-bind(themeColor);
}

/* CSS变量绑定: fontSize */
.content {
  font-size: v-bind(fontSize);
}
```

## 样式作用域

### scoped 样式

```vue
<style scoped>
/* 用户卡片 */
.user-card { ... }
</style>
```

scoped 样式仅作用于当前组件，注释规范不变。

### 非 scoped 样式

```vue
<style>
/* 全局 */
body { ... }
</style>
```

非 scoped 样式可能影响全局，必须标注 `/* 全局 */`。

### lang="scss" / lang="less"

注释规范与 CSS 一致，嵌套写法下保持同级缩进：

```scss
/* 用户卡片 */
.user-card {
  /* 用户卡片 > 头部 */
  &__header { ... }

  /* 用户卡片 > 内容 */
  &__content { ... }
}
```
