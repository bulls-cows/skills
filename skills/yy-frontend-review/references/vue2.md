# Vue2 专项审核规则

仅在识别到 Vue2 特征时适用，与通用规则合并使用。

## 严重

- 模板编译错误：`v-model` 绑定到 Props；错误的指令语法
- Mixin 命名冲突：多个 Mixin 中同名的 `data`、`methods`、`computed` 导致静默覆盖，运行时行为不可预期

## 中等

- 响应式陷阱：直接通过索引修改数组（应用 `this.$set` 或 `splice`）；直接添加对象属性（应用 `this.$set`）；未正确使用 `Vue.set`/`this.$delete` 处理响应式边界
- 生命周期使用不当：`watch` 未正确配置 `deep`/`immediate`；在 `created` 中执行 DOM 操作（应放在 `mounted`）；`v-if` 与 `v-for` 同时使用在同一元素
- 订阅清理：`$on` 未在 `beforeDestroy` 中对应 `$off`；全局事件总线（`EventBus`）订阅未在组件销毁时取消
- 计算属性副作用：`computed` 中执行异步操作或修改其他响应式状态，违反计算属性的纯计算语义
- 深度监听性能：对大型对象使用 `deep: true` 监听，且未配合 `immediate` 或防抖策略，导致不必要的全量遍历
- 组件耦合：过度使用 `this.$parent`/`this.$children` 直接访问父/子组件实例，导致组件层级紧耦合

## 轻微

- 组件命名：缺少 `name` 属性，影响 devtools 调试和递归组件引用
- 模板复杂度：模板中存在复杂表达式，应提取为 `computed` 或 `methods`
- SFC 结构顺序：`<template>`/`<script>`/`<style>` 排列顺序不统一
