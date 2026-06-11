# HTML / CSS 注释规范

适用文件：`.html`、`.vue`（`<template>` 和 `<style>` 部分）、`.jsx`/`.tsx`、`.css`、`.scss`、`.less`

---

## HTML 注释规范

### 判断标准

- 语义化结构区块（`<header>`、`<nav>`、`<main>`、`<footer>`、`<aside>`、`<section>`）：✅ 必须注释（页面骨架，帮助理解整体布局）
- 功能性 `div` 区块（通过 class/id 可识别的功能区域）：✅ 必须注释（无语义标签，注释是唯一的意图说明）
- 复杂交互组件区域（表单组、模态框、下拉菜单、标签页、抽屉等）：✅ 必须注释（交互逻辑复杂，需标注用途）
- 循环渲染的列表容器：⚠️ 视情况（列表容器注释即可，列表项内部不注释）
- 简单表单控件（单个 `<input>`、`<button>`）：❌ 不需要（自解释）
- 纯展示性标签（`<span>`、`<p>`、`<img>`、`<a>` 等）：❌ 不需要（自解释）

### 注释格式

HTML 文件和 Vue `<template>`：

```html
<!-- 注释内容 -->
<header>...</header>
```

JSX/TSX 文件：

```tsx
<div>
  {/* 注释内容 */}
  <header>...</header>
</div>
```

注释放在目标节点正上方一行，与节点保持相同缩进。

### 区块注释规范

注释应说明该区块的业务用途，而非重复标签名：

```html
<!-- ❌ 重复标签名 -->
<!-- header -->
<header>...</header>

<!-- ✅ 说明业务用途 -->
<!-- 顶部导航栏：包含 Logo、主导航和用户菜单 -->
<header>
  <!-- 主导航：首页、产品、文档、定价 -->
  <nav>...</nav>
</header>

<!-- 侧边栏筛选面板：按价格、分类、评分过滤商品列表 -->
<div class="sidebar-filter">...</div>
```

### 交互区域注释规范

注释应说明交互区域的功能目的：

```html
<!-- 用户注册表单：收集邮箱、密码和手机号，提交后跳转验证页 -->
<form class="register-form">...</form>

<!-- 确认删除对话框：用户点击删除按钮后弹出，确认后执行删除操作 -->
<div class="modal-confirm-delete">...</div>

<!-- 订单详情标签页：按基本信息、物流信息、退款记录分类展示 -->
<div class="order-tabs">...</div>
```

嵌套的复杂交互（如模态框内含表单）只在最外层容器注释，内部子结构不重复注释，除非子结构本身是独立的复杂交互组件。

### 避免的注释

```html
<!-- ❌ 重复标签名或属性 -->
<!-- div -->
<div>...</div>

<!-- ❌ 对自解释的语义标签加注释 -->
<!-- 这是一个段落 -->
<p>欢迎使用</p>

<!-- ❌ 对框架指令的重复说明 -->
<!-- v-if 条件渲染 -->
<div v-if="isVisible">...</div>

<!-- ❌ 对每个标签都加注释 -->
<!-- 链接 -->
<a href="/">首页</a>
<!-- 图片 -->
<img src="logo.png" />
```

### Vue 模板注释

Slot 区域标注容器的用途，而非 slot 本身：

```html
<!-- 页面顶部操作栏：放置搜索框和功能按钮 -->
<div class="toolbar">
  <slot name="actions" />
</div>

<!-- 内容为空时的兜底展示 -->
<slot name="empty">
  <p>暂无数据</p>
</slot>
```

Teleport/Suspense 等内置组件标注使用目的：

```html
<!-- 将模态框渲染到 body 下，避免被父级 overflow:hidden 裁切 -->
<Teleport to="body">
  <div class="modal">...</div>
</Teleport>

<!-- 异步加载用户详情，显示骨架屏占位 -->
<Suspense>
  <template #default>
    <UserDetail />
  </template>
  <template #fallback>
    <SkeletonCard />
  </template>
</Suspense>
```

## CSS 注释规范

### 判断标准

- 样式区块分隔（按页面区域或功能模块组织的样式段落）：✅ 必须注释（帮助快速定位样式归属）
- 复杂选择器（嵌套超过 3 层、使用组合选择器或伪类组合）：✅ 必须注释（说明匹配目标）
- 魔术数字（非常规的数值，如 `margin-top: -37px`、`z-index: 9999`）：✅ 必须注释（说明取值原因）
- Hack 和兼容性处理（浏览器兼容写法、临时修复）：✅ 必须注释（说明适用场景和移除条件）
- 媒体查询和响应式断点：⚠️ 视情况（自定义断点需注释，框架标准断点不需要）
- 简单直观的样式规则（如 `color: red`、`display: flex`）：❌ 不需要（自解释）
- CSS 变量定义（`:root` 中的变量声明）：⚠️ 视情况（变量名已清晰表达含义的不需要，业务相关的需要注释）

### 注释格式

区块分隔注释：

```css
/* ========== 头部导航样式 ========== */
.header { ... }
.header__nav { ... }
```

行内说明注释：

```css
.container {
  /* 减去顶部导航栏高度，避免内容被遮挡 */
  height: calc(100vh - 64px);
}
```

SCSS/LESS 中也可使用行注释：

```scss
// 减去顶部导航栏高度，避免内容被遮挡
height: calc(100vh - 64px);
```

### 区块分隔规范

使用统一的分隔注释将样式按功能区域组织：

```css
/* ========== 布局相关 ========== */
.layout { ... }
.layout__sidebar { ... }

/* ========== 表单样式 ========== */
.form { ... }
.form__input { ... }

/* ========== 模态框样式 ========== */
.modal { ... }
.modal__overlay { ... }
```

分隔注释使用 `/* ========== 区块名称 ========== */` 格式，前后各 10 个等号。

### 特殊值注释规范

对非直观的样式值说明取值原因：

```css
.tooltip {
  /* 确保浮层在模态框之上显示 */
  z-index: 1050;
}

.sidebar {
  /* 与顶部导航栏底部对齐（导航栏高度 64px） */
  top: 64px;
  /* 侧边栏宽度需与主内容区 margin-left 保持一致 */
  width: 240px;
}

.legacy-table {
  /* IE11 兼容：不支持 gap 属性，改用 margin 模拟间距 */
  margin-right: 8px;
}
```

### 避免的注释

```css
/* ❌ 重复属性名 */
/* 设置颜色 */
color: #333;

/* ❌ 对显而易见的布局加注释 */
/* flex 布局 */
display: flex;

/* ❌ 对每条规则都加注释 */
/* 宽度 */
width: 100%;
/* 高度 */
height: 50px;
/* 背景色 */
background: #fff;
```

### 现代 CSS 特性注释

CSS 变量组按用途分区：

```css
:root {
  /* ========== 品牌色 ========== */
  --color-primary: #1677ff;
  --color-primary-hover: #4096ff;

  /* ========== 间距系统 ========== */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;

  /* ========== 层级（z-index） ========== */
  /* 层级递增：内容 < 导航 < 浮层 < 模态框 < 通知 */
  --z-content: 1;
  --z-nav: 100;
  --z-popover: 1000;
  --z-modal: 1050;
  --z-notification: 2000;
}
```

CSS Grid 的 template-areas 标注区域含义：

```css
.dashboard {
  /*
   * 页面布局区域划分：
   * header - 顶部导航栏
   * sidebar - 左侧菜单
   * main - 主内容区
   * footer - 底部版权信息
   */
  grid-template-areas:
    'header  header'
    'sidebar main'
    'footer  footer';
}
```

CSS 嵌套中仅对顶层选择器添加区块注释，嵌套子选择器不重复注释：

```css
/* 商品卡片样式 */
.product-card {
  /* 悬停时上浮效果，增强可点击感 */
  &:hover {
    transform: translateY(-2px);
  }

  .product-card__price {
    /* 划线价使用较浅颜色降低视觉权重 */
    .original-price {
      color: var(--color-text-tertiary);
    }
  }
}
```
