# Vue2 模板指令规范

> Vue2 与 Vue3 共享的模板规则（v-for/key、v-if 冲突、v-html、指令简写、模板属性顺序）详见 [vue-template.md](./common-vue-template.md)，本文件仅承载 Vue2 特有内容。

## 前置阅读

- [vue-template.md](./common-vue-template.md) — Vue 模板通用规则

---

## 一、v-model 写法

详见 [interaction.md](./vue2-interaction.md#2-v-model-写法)（Vue 2 标准 `value` + `$emit('input')`）。

---

## 二、模板属性顺序（Vue2 = 8 步）

Vue2 沿用通用规则的 **8 步顺序**，不含 Vue3 特有的第 9 步 `v-slot`。完整顺序详见 [vue-template.md](./common-vue-template.md#六模板属性顺序)。

---

## 三、相关模块引用

| 内容                 | 详见                                                   |
| -------------------- | ------------------------------------------------------ |
| Vue 模板通用规则     | [vue-template.md](./common-vue-template.md) |
| Props 定义与 v-model | [interaction.md](./vue2-interaction.md)                     |
| 组件开发规范         | [component-dev.md](./vue2-component-dev.md)                 |
