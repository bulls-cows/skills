# Vue3 模板指令规范

> Vue2 与 Vue3 共享的模板规则（v-for/key、v-if 冲突、v-html、指令简写）详见 [common-vue-template.md](./common-vue-template.md)，本文件仅承载 Vue3 特有内容。

## 前置阅读

- [common-vue-template.md](./common-vue-template.md) — Vue 模板通用规则

---

## 一、Vue3 特有第 9 步：动态 v-slot

Vue3 模板属性顺序在通用 8 步基础上，追加第 9 步动态 `v-slot`（`#`）：

1. 定义（`is`）
2. `v-for`
3. `v-if` / `v-else-if` / `v-else`
4. `v-show` / `v-cloak`
5. `id`
6. `props` / `attrs`
7. `v-on`（`@`）
8. `v-html` / `v-text`
9. **动态 `v-slot`（`#`）** ← Vue3 独有

```vue
<template
  v-for="item in items"
  :key="item.id"
  v-if="item.visible"
  id="list-item"
  :class="item.class"
  @click="handleClick(item)"
  #default="slotProps"
>
  {{ item.name }}
</template>
```

---

## 二、v-model 写法

详见 [vue3-interaction.md](./vue3-interaction.md#2-v-model-写法)（Vue 3 标准、Ant Design Vue 风格）。

---

## 三、Vue3 自定义指令钩子（与 Vue2 命名不同）

Vue3 自定义指令的钩子名与 Vue2 不同，资源清理必须放在 `unmounted`：

| 时机           | Vue3 钩子      | Vue2 钩子          | 说明                          |
| -------------- | -------------- | ------------------ | ----------------------------- |
| 绑定到 DOM 时  | `mounted` 之前 | `bind`             | 元素插入前（`beforeMount`）   |
| 插入 DOM 时    | `mounted`      | `inserted`         | 可访问父节点，常用于聚焦      |
| 更新完成时     | `updated`      | `componentUpdated` | VNode 及其子级都更新后        |
| 解绑时（清理） | `unmounted`    | `unbind`           | **必须在此清理监听器/定时器** |

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

## 四、相关模块引用

| 内容                 | 详见                                               |
| -------------------- | -------------------------------------------------- |
| Vue 模板通用规则     | [common-vue-template.md](./common-vue-template.md) |
| Props 定义与 v-model | [vue3-interaction.md](./vue3-interaction.md)       |
| 组件开发规范         | [vue3-component-dev.md](./vue3-component-dev.md)   |
