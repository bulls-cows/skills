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

## 三、相关模块引用

| 内容                 | 详见                                                   |
| -------------------- | ------------------------------------------------------ |
| Vue 模板通用规则     | [common-vue-template.md](./common-vue-template.md) |
| Props 定义与 v-model | [vue3-interaction.md](./vue3-interaction.md)                     |
| 组件开发规范         | [vue3-component-dev.md](./vue3-component-dev.md)                 |
