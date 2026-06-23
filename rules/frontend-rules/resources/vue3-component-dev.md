# Vue3 组件开发规范

> 本规范仅承载 Vue3 组件开发特有内容。通用规范（JSDoc、模板规则、注释等）通过引用避免重复。

## 前置阅读

- [common-comments.md](./common-comments.md) — 注释规范（含 Script 顶部 JSDoc 模板）
- [common-vue-template.md](./common-vue-template.md) — Vue 模板通用规则

---

## 一、`<script setup>` 要求

- **必须使用** `<script setup>` 语法
- **禁止**使用 Options API 写法（如 `data()`、`methods: {}`、`mounted() {}` 等）
- **禁止**在 `<script setup>` 中使用 `this`

---

## 二、脚本结构顺序

详见 [vue3-order.md](./vue3-order.md#二script-setup-内部结构顺序)

`<script setup>` 内部内容必须按以下宏观顺序排列：

1. `imports` → 2. `defineProps` / `defineEmits` → 3. Hooks (useXxx) → 4. 业务逻辑（按功能模块分组，组内顺序：`ref`/`reactive` → `computed` → 方法 → `watch` → 生命周期钩子）→ 5. `defineExpose`

---

## 三、Vue 元素特性顺序

详见 [vue3-directives.md](./vue3-directives.md#一vue3-特有第-9-步动态-v-slot)（Vue3 在通用 8 步基础上追加第 9 步动态 `v-slot`）。

---

## 四、v-slot 风格

- 使用动态风格（如 `v-slot:[name]`）
- 禁止静态默认插槽写法

---

## 五、模板层轻量化

详见 [common-performance.md](./common-performance.md#渲染性能优化)（模板职责分离、简单逻辑内联原则）。

---

## 六、方法职责

- 每个方法职责单一，函数名语义清晰
- 方法超过 20 行考虑拆分

---

## 七、页面拆分建议

- 页面组件超过 300 行时，建议拆分独立子组件
- 按功能区块拆分：搜索表单、数据表格、分页器、操作按钮组

---

## 八、defineExpose

详见 [vue3-interaction.md](./vue3-interaction.md#三对外暴露defineexpose)（明确声明、父组件访问、禁止滥用规则）。

---

## 九、相关模块引用

| 内容       | 详见                                                   |
| ---------- | ------------------------------------------------------ |
| 注释规范   | [common-comments.md](./common-comments.md)                       |
| Props 定义 | [vue3-interaction.md](./vue3-interaction.md#一props-定义规范)    |
| Emit 事件  | [vue3-interaction.md](./vue3-interaction.md#1-事件白名单19-种)   |
| 组件通信   | [vue3-interaction.md](./vue3-interaction.md#四组件间通信)        |
| 响应式状态 | [vue3-reactivity.md](./vue3-reactivity.md)                       |
| watch 监听 | [vue3-watch.md](./vue3-watch.md)                                 |
| Hooks 规范 | [vue3-hooks.md](./vue3-hooks.md)                                 |
| 导入顺序   | [vue3-order.md](./vue3-order.md)                                 |
| 模板规则   | [common-vue-template.md](./common-vue-template.md) |
