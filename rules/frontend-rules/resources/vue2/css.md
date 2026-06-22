# Vue2 CSS 样式差异（Vue2 特有）

> 通用 CSS 规范（预处理器、注释、作用域、BEM 命名、布局、兼容性、属性排序、SCSS、单位、动画等）详见 [css.md](../common/css.md)。
> 作用域穿透的通用理念与三框架写法对比（Vue2 `::v-deep` / Vue3 `:deep()` / React `:global()`）详见 [css.md 作用域穿透章节](../common/css.md#-十一作用域穿透vue2vue3react-共享理念)，本文件仅承载 Vue2 特有内容。

## 前置阅读

- [css.md](../common/css.md) — 通用 CSS 规范

---

## 一、Vue2 作用域穿透写法（`::v-deep`）

Vue2 的 `::v-deep`、`/deep/`、`>>>` 三种写法等价，**推荐统一用 `::v-deep`**：

- `>>>` 在 SCSS/Less 等预处理器中无法解析，仅在原生 CSS 中可用
- `/deep/` 已被部分工具链标记为废弃

具体用法与注意事项详见 [css.md 作用域穿透 - Vue2 写法](../common/css.md#vue2-写法v-deep)。

---

## 二、Vue2 自定义指令钩子（与 Vue3 命名不同）

Vue2 自定义指令的钩子名与 Vue3 不同，样式/事件相关的清理必须放在对应钩子：

| 时机           | Vue2 钩子          | Vue3 钩子      | 说明                          |
| -------------- | ------------------ | -------------- | ----------------------------- |
| 绑定到 DOM 时  | `bind`             | `mounted` 之前 | 元素插入前                    |
| 插入 DOM 时    | `inserted`         | `mounted`      | 可访问父节点，常用于聚焦      |
| 所在组件更新时 | `update`           | `updated`      | VNode 更新（可能在其子级前）  |
| 更新完成时     | `componentUpdated` | `updated`      | VNode 及其子级都更新后        |
| 解绑时（清理） | `unbind`           | `unmounted`    | **必须在此清理监听器/定时器** |

```javascript
// Vue2 自定义指令：在 unbind 清理资源
export default {
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
      unbind(el) {
        // 清理逻辑（事件监听、定时器等），避免内存泄漏
      },
    },
  },
}
```

> Vue3 用 `mounted`/`unmounted`，Vue2 用 `inserted`/`unbind`，迁移时需逐一替换。

---

## 三、相关模块引用

| 模块               | 路径                                                                      |
| ------------------ | ------------------------------------------------------------------------- |
| 通用 CSS 规范      | [css.md](../common/css.md)                                                |
| 作用域穿透（通用） | [css.md 穿透章节](../common/css.md#-十一作用域穿透vue2vue3react-共享理念) |
| Vue2 模板指令      | [directives.md](./directives.md)                                          |
