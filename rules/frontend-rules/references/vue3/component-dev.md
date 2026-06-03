# Vue3 组件开发规范

本模块整合 Vue3 组件开发的核心规范，通过引用其他模块避免重复。

## 核心要求

### `<script setup>` 要求

- **必须使用** `<script setup>` 语法
- **禁止**使用 Options API 写法（如 `data()`、`methods: {}`、`mounted() {}` 等）
- **禁止**在 `<script setup>` 中使用 `this`

### 脚本结构顺序

详见 [order.md](./order.md#二script-setup-内部结构顺序)

`<script setup>` 内部内容必须按以下宏观顺序排列：

1. `imports` → 2. `defineProps` / `defineEmits` → 3. Hooks (useXxx) → 4. 业务逻辑（按功能模块分组，组内顺序：`ref`/`reactive` → `computed` → 方法 → `watch` → 生命周期钩子）→ 5. `defineExpose`

### 完整示例

详见 [order.md](./order.md#二script-setup-内部结构顺序)（包含完整的 4 组 import 分组、交互定义、Hooks、业务逻辑分组、defineExpose）

### Script 顶部 JSDoc

详见 [comments.md](../comments.md#二脚本区注释)

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

详见 [directives.md](./directives.md#五模板属性顺序)（9 步完整顺序：`is` → `v-for` → `v-if/else` → `v-show` → `id` → `props` → `v-on` → `v-html` → `v-slot`）。

### v-slot 风格

- 使用动态风格（如 `v-slot:[name]`）
- 禁止静态默认插槽写法

### 模板层轻量化

详见 [performance.md](../performance.md#六模板层轻量化)（模板职责分离、简单逻辑内联原则）。

### 注释规范

详见 [comments.md](../comments.md)

### 方法职责

- 每个方法职责单一，函数名语义清晰
- 方法超过 20 行考虑拆分

### 页面拆分建议

- 页面组件超过 300 行时，建议拆分独立子组件
- 按功能区块拆分：搜索表单、数据表格、分页器、操作按钮组

### defineExpose

详见 [interaction.md](./interaction.md#三对外暴露-defineexpose)（明确声明、父组件访问、禁止滥用规则）。

## 相关模块引用

| 内容       | 详见                                                       |
| ---------- | ---------------------------------------------------------- |
| Props 定义 | [interaction.md](./interaction.md#一props-定义规范)        |
| Emit 事件  | [interaction.md](./interaction.md#二emit-事件白名单与顺序) |
| 组件通信   | [interaction.md](./interaction.md#四组件间通信)            |
| 响应式状态 | [reactivity.md](./reactivity.md)                           |
| watch 监听 | [watch.md](./watch.md)                                     |
| Hooks 规范 | [hooks.md](./hooks.md)                                     |
| 导入顺序   | [order.md](./order.md)                                     |
