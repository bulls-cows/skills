# React CSS 样式规范（React 特有）

> 通用 CSS 规范（预处理器、注释、作用域、BEM 命名、布局、兼容性、属性排序、SCSS、单位、动画等）详见 [css.md](./common-css.md)。
> 作用域穿透的通用理念与三框架写法对比（Vue2 `::v-deep` / Vue3 `:deep()` / React `:global()`）详见 [css.md 作用域穿透章节](./common-css.md#十一作用域穿透vue2vue3react-共享理念)，本文件仅承载 React 特有内容。

## 前置阅读

- [css.md](./common-css.md) — 通用 CSS 规范

---

## 一、作用域隔离方案选型

React 无 Vue 的 `scoped`，靠以下方案实现样式隔离。**默认首选 CSS Modules**：

| 方案                    | 适用场景                     | 推荐度 |
| ----------------------- | ---------------------------- | ------ |
| **CSS Modules**（`*.module.scss`） | 默认首选，天然哈希类名隔离，对应 Vue scoped | ⭐⭐⭐ 推荐 |
| **Sass/SCSS**           | 预处理器，与 CSS Modules 搭配 | ⭐⭐⭐ 推荐 |
| styled-components / Emotion（CSS-in-JS） | 动态样式、强主题化场景       | ⭐⭐ 按需 |
| Tailwind CSS（原子化）  | 工具类优先、快速布局         | ⭐⭐ 按需 |
| 内联 `style`            | 仅动态计算的单个属性         | ❌ 禁止（见 [jsx.md](./react-jsx.md#九样式使用)） |

---

## 二、CSS Modules 基本用法

### 2.1 文件命名与导入

样式文件必须以 `.module.scss`（或 `.module.css`）为后缀，导入语句归在 import 第 4 组「相对依赖」（详见 [order.md](./react-order.md#三import-分组)）：

```tsx
import styles from './UserCard.module.scss'
```

### 2.2 类名引用

用 `className`（**禁止**用 HTML 的 `class`），通过 `styles.类名` 引用：

```tsx
// ✅ 正确：CSS Modules
<div className={styles.userCard}>...</div>

// ❌ 错误：内联样式
<div style={{ color: 'red', fontSize: 14 }}>...</div>

// ❌ 错误：使用 class（HTML 属性）
<div class="user-card">...</div>
```

---

## 三、动态类名（clsx）

条件类名**优先使用 `clsx`**（或 `classnames`）库，避免模板字符串拼接带来的可读性问题：

```tsx
import clsx from 'clsx'

// ✅ 正确：clsx 管理条件类名
<div className={clsx(styles.userCard, {
  [styles.active]: isActive,
  [styles.disabled]: isDisabled,
})}>...</div>

// ⚠️ 不推荐：模板字符串拼接（简单场景可用，条件多了难维护）
<div className={`user-card ${isActive ? 'user-card--active' : ''}`}>...</div>
```

---

## 四、穿透第三方组件（`:global()`）

React 的 CSS Modules 通过哈希类名隔离，无法直接选中第三方组件（如 antd）内部 DOM。穿透写法用 `:global()`，具体详见 [css.md 作用域穿透 - React 写法](./common-css.md#react-写法global)。

```scss
/* UserCard.module.scss */
.card {
  :global(.ant-tooltip-inner) {
    background: #1f2937;
    color: #fff;
  }
}
```

---

## 五、相关模块引用

| 模块             | 路径                                  |
| ---------------- | ------------------------------------- |
| 通用 CSS 规范    | [css.md](./common-css.md)            |
| 作用域穿透（通用） | [css.md 穿透章节](./common-css.md#十一作用域穿透vue2vue3react-共享理念) |
| 样式使用（jsx）  | [jsx.md](./react-jsx.md#九样式使用)         |
| 导入顺序         | [order.md](./react-order.md#三import-分组) |
