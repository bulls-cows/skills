# D03 · Vue3 组件规范（🟡 中等）

## 核心要求

- **必须使用 `<script setup>` 语法**，禁止 Options API（`data()`、`methods: {}`、`mounted() {}` 等）
- **禁止在 `<script setup>` 中使用 `this`**
- **禁止使用 mixins**

## 脚本结构顺序

严格遵守从上到下：

`imports` → `defineProps` → `defineEmits` → `Hooks(useXxx)` → `ref/reactive`（**优先 ref，尽可能少用 reactive**）→ `computed` → `watch/watchEffect` → 方法/函数 → 生命周期钩子 → `defineExpose`

## 元素特性顺序

`is` → `v-for` → `v-if/v-else-if/v-else` → `v-show/v-cloak` → `id` → `props/attrs` → `v-on` → `v-html/v-text` → `v-slot`

## Props 规范

- 使用 TypeScript 类型定义（`defineProps<{ ... }>()` 或 `withDefaults`）
- camelCase 命名，类型明确，**必须添加注释说明用途**
- 组件传参：camelCase、类型明确、添加含义注释

## Emit 事件规范

### 事件顺序

`emit('input', 数据)` → `emit('其它事件', 数据)` → `emit('change/click', 数据)`

### 生命周期 emit 限制

- **基础组件**：禁止在生命周期中 emit
- **业务组件**：允许但不推荐

### Emit 白名单

| 类别 | 白名单事件 |
|------|-----------|
| **交互类** | `change`、`click`、`select`、`expand`、`input`、`clear`、`remove`、`add` |
| **弹窗类** | `open`、`close`、`show`、`hide` |
| **操作类** | `cancel`、`confirm`、`ok`、`editSuccess`、`error` |

## v-slot

- 推荐动态命名插槽（如 `v-slot:[name]`）提升复用性
- 避免滥用静态默认插槽，仅在单一内容插槽时使用
- 命名插槽应明确表达用途（如 `v-slot:header` 而非 `v-slot:item1`）

## 组件命名

- PascalCase（允许单个单词，推荐多单词）
- **文件名必须多单词 + PascalCase**（如 `UserList.vue`）

## ref/computed 使用

- 优先 `ref`，复杂对象用 `reactive`
- 除后端交互数据和定时器外，其它**尽可能使用 `computed`**
- ref 访问必须使用 `.value`

## 模块化

- 单一职责、高内聚低耦合
- 方法超过 50 行**必须拆分**

## 不要过度封装

- 简单逻辑直接写在 template 中
- 不为简单条件判断额外创建函数
