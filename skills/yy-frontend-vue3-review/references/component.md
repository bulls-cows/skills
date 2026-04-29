# Vue3 组件规范

## 核心要求

- **必须使用 `<script setup>` 语法**，禁止 Options API（`data()`、`methods: {}`、`mounted() {}` 等）。
- **禁止在 `<script setup>` 中使用 `this`**。

## 脚本结构顺序

严格遵守以下顺序：

1. `imports`
2. `defineProps`
3. `defineEmits`
4. Hooks (`useXxx`)
5. `ref` / `reactive`
6. `computed`
7. `watch` / `watchEffect`
8. 方法/函数
9. 生命周期钩子
10. `defineExpose`

## 元素特性顺序

模板中元素特性按以下顺序排列：

1. `is`
2. `v-for`
3. `v-if` / `v-else-if` / `v-else`
4. `v-show` / `v-cloak`
5. `id`
6. `props` / `attrs`
7. `v-on`
8. `v-html` / `v-text`

## Props 规范

- 使用 TypeScript 类型定义。
- camelCase 命名。
- 类型必须明确。
- 必须添加含义注释。

## Emit 事件顺序

```js
emit('input', 数据) → emit('其它事件', 数据) → emit('change/click', 数据)
```

## 生命周期 emit 限制

- **基础组件**：禁止在生命周期中 emit。
- **业务组件**：允许但不推荐。

## 组件命名

- PascalCase（允许单个单词，推荐多单词组合）。
- 组件文件名：多个单词 + PascalCase（如 `UserList.vue`）。

## ref / computed 使用

- 优先使用 `ref`，复杂对象使用 `reactive`。
- 除后端交互数据和部分定时器外，其它尽可能使用 `computed`。
- ref 访问**必须使用 `.value`**。
- 优先 `computed` 而非 `ref`。

## 模块化

- 单一职责、高内聚低耦合。
- 方法超过 50 行必须拆分。
- **禁止使用 mixins**。
- **不要过度封装**：简单逻辑直接写在 template 中，不为简单条件判断额外创建函数。

## v-slot

- 使用动态风格（如 `v-slot:[name]`）。
- 禁止静态默认插槽写法。
