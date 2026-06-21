
# Vue3 CSS 样式差异（Vue3 特有）

> 通用 CSS 规范（预处理器、注释、作用域、BEM 命名、布局、兼容性、属性排序、SCSS、单位、动画等）详见 [css.md](../common/css.md)。
> 作用域穿透的通用理念与三框架写法对比（Vue2 `::v-deep` / Vue3 `:deep()` / React `:global()`）详见 [css.md 作用域穿透章节](../common/css.md#-十一作用域穿透vue2vue3react-共享理念)，本文件仅承载 Vue3 特有内容。

## 前置阅读

- [css.md](../common/css.md) — 通用 CSS 规范

---

## 一、Vue3 作用域穿透写法（`:deep()`）

Vue3 废弃了 Vue2 的 `::v-deep`/`/deep/`/`>>>`，统一使用函数式 `:deep()`。具体用法与注意事项详见 [css.md 作用域穿透 - Vue3 写法](../common/css.md#vue3-写法deep)。

---

## 二、Vue3 自定义指令钩子（与 Vue2 命名不同）

Vue3 自定义指令的钩子名与 Vue2 不同，样式/事件相关的清理必须放在 `unmounted`：

| 时机           | Vue3 钩子     | Vue2 钩子             | 说明                         |
| -------------- | ------------- | --------------------- | ---------------------------- |
| 绑定到 DOM 时  | `mounted` 之前 | `bind`                | 元素插入前（`beforeMount`）  |
| 插入 DOM 时    | `mounted`     | `inserted`            | 可访问父节点，常用于聚焦     |
| 更新完成时     | `updated`     | `componentUpdated`    | VNode 及其子级都更新后       |
| 解绑时（清理） | `unmounted`   | `unbind`              | **必须在此清理监听器/定时器** |

```typescript
// Vue3 自定义指令：在 unmounted 清理资源
const vFocus = {
  mounted(el: HTMLInputElement) {
    el.focus()
  },
  unmounted(el: HTMLInputElement) {
    // 清理逻辑（事件监听、定时器等），避免内存泄漏
  },
}
```

> Vue3 用 `mounted`/`unmounted`，Vue2 用 `inserted`/`unbind`，迁移时需逐一替换。

---

## 三、相关模块引用

| 模块             | 路径                                  |
| ---------------- | ------------------------------------- |
| 通用 CSS 规范    | [css.md](../common/css.md)            |
| 作用域穿透（通用） | [css.md 穿透章节](../common/css.md#-十一作用域穿透vue2vue3react-共享理念) |
| Vue3 性能        | [performance.md](./performance.md)    |
| Vue3 模板指令    | [directives.md](./directives.md)      |
