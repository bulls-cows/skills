# Vue2 模板指令规范

> Vue2 与 Vue3 共享的模板规则（v-for/key、v-if 冲突、v-html、指令简写、模板属性顺序）详见 [common-vue-template.md](./common-vue-template.md)，本文件仅承载 Vue2 特有内容。

## 前置阅读

- [common-vue-template.md](./common-vue-template.md) — Vue 模板通用规则

---

## 一、v-model 写法

详见 [vue2-interaction.md](./vue2-interaction.md#2-v-model-写法)（Vue 2 标准 `value` + `$emit('input')`）。

---

## 二、模板属性顺序（Vue2 = 8 步）

Vue2 沿用通用规则的 **8 步顺序**，不含 Vue3 特有的第 9 步 `v-slot`。完整顺序详见 [common-vue-template.md](./common-vue-template.md#六模板属性顺序)。

---

## 三、Vue2 自定义指令钩子（与 Vue3 命名不同）

Vue2 自定义指令的钩子名与 Vue3 不同，资源清理必须放在 `unbind`：

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

## 四、相关模块引用

| 内容                 | 详见                                               |
| -------------------- | -------------------------------------------------- |
| Vue 模板通用规则     | [common-vue-template.md](./common-vue-template.md) |
| Props 定义与 v-model | [vue2-interaction.md](./vue2-interaction.md)       |
| 组件开发规范         | [vue2-component-dev.md](./vue2-component-dev.md)   |
