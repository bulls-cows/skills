# Vue3 组件开发规范

本模块整合 Vue3 组件开发的核心规范，通过引用其他模块避免重复。

## 核心要求

### `<script setup>` 要求

- **必须使用** `<script setup>` 语法
- **禁止**使用 Options API 写法（如 `data()`、`methods: {}`、`mounted() {}` 等）
- **禁止**在 `<script setup>` 中使用 `this`

### 脚本结构顺序

详见 [order.md](./order.md#三script-setup-内部结构顺序)

`<script setup>` 内部内容必须按以下顺序排列：

1. `imports` → 2. `defineProps` → 3. `defineEmits` → 4. Hooks (useXxx) → 5. `ref`/`reactive` 响应式数据 → 6. `computed` → 7. `watch`/`watchEffect` → 8. 方法/函数 → 9. 生命周期钩子 → 10. `defineExpose`

### Script 顶部 JSDoc

详见 [comments.md](./comments.md#二脚本区注释)

```typescript
/**
 * 组件名称
 * @description 页面职责说明
 * @description 核心业务流程简述
 * @description 关键数据来源
 */
<script setup lang="ts">
```

### Vue 元素特性顺序

详见 [directives.md](./directives.md#五模板属性顺序)

1. 定义（`is`）→ 2. `v-for` → 3. `v-if/v-else-if/v-else` → 4. `v-show/v-cloak` → 5. `id` → 6. `props/attrs` → 7. `v-on` → 8. `v-html/v-text`（动态 `v-slot`）

### v-slot 风格

- 使用动态风格（如 `v-slot:[name]`）
- 禁止静态默认插槽写法

### 模板层轻量化

- 模板只负责展示，不写复杂表达式与逻辑
- 简单逻辑可内联，不过度封装为函数

### 注释规范

详见 [comments.md](./comments.md)

### 方法职责

- 每个方法职责单一，函数名语义清晰
- 方法超过 20 行考虑拆分

### 页面拆分建议

- 页面组件超过 300 行时，建议拆分独立子组件
- 按功能区块拆分：搜索表单、数据表格、分页器、操作按钮组

### defineExpose

详见 [interaction.md](./interaction.md#三对外暴露-defineexpose)

## 相关模块引用

| 内容 | 详见 |
|------|------|
| Props 定义 | [interaction.md](./interaction.md#一props-定义规范) |
| Emit 事件 | [interaction.md](./interaction.md#二emit-事件规范) |
| 组件通信 | [interaction.md](./interaction.md#四组件间通信) |
| 响应式状态 | [reactivity.md](./reactivity.md) |
| watch 监听 | [watch.md](./watch.md) |
| Hooks 规范 | [hooks.md](./hooks.md) |
| 导入顺序 | [order.md](./order.md) |
