# D03 · Vue3 组件规范

**严重程度**：🟡 中等

---

## 必须使用 `<script setup>` 语法

禁止 Options API（`data()`、`methods: {}`、`mounted() {}` 等）。

---

## 禁止在 `<script setup>` 中使用 `this`

---

## 禁止使用 mixins

---

## `<script setup>` name 属性

- 项目已安装 `unplugin-vue-setup-extend-plus` 时：必须添加 `name="PascalCase组件名"`（如 `<script setup lang="ts" name="UserCard">`）
- 未安装该插件时：不要求 `name` 属性，不视为问题

---

## 脚本结构顺序

`imports` → `defineProps` → `defineEmits` → `全局Hooks` → **业务模块（按领域分组，组内自由组合）** → `defineExpose`

---

## Hooks 位置

全局共享的 Hook 放 defineEmits 后，仅单业务使用的 Hook 放对应业务模块顶部。

---

## 业务模块内部

按业务逻辑分组，组内自由组合 `ref/reactive`、`computed`、`watch/watchEffect`、方法、生命周期钩子，不必严格按类型排序。`ref` 优先，`reactive` 仅复杂对象使用。

---

## 元素特性顺序

`is` → `v-for` → `v-if/v-else-if/v-else` → `v-show/v-cloak` → `id` → `props/attrs` → `v-on` → `v-html/v-text` → `v-slot`

---

## Props 规范

- 使用 TypeScript 类型定义（`defineProps<{ ... }>()` 或 `withDefaults`）
- camelCase 命名，类型明确，必须添加注释说明用途
- 组件传参：camelCase、类型明确、添加含义注释

---

## Emit 事件规范

- 事件顺序：`emit('input', 数据)` → `emit('其它事件', 数据)` → `emit('change/click', 数据)`
- 基础组件禁止在生命周期中 emit，业务组件允许但不推荐
- emit 事件必须在白名单范围内

### Emit 事件白名单

| 类别       | 白名单事件                                                               |
| ---------- | ------------------------------------------------------------------------ |
| **交互类** | `change`、`click`、`select`、`expand`、`input`、`clear`、`remove`、`add` |
| **弹窗类** | `open`、`close`、`show`、`hide`                                          |
| **操作类** | `cancel`、`confirm`、`ok`、`editSuccess`、`error`                        |

---

## v-slot

使用动态风格（如 `v-slot:[name]`），禁止静态默认插槽写法。

---

## 组件命名

PascalCase（允许单个单词，推荐多单词）；文件名必须多单词 + PascalCase（如 `UserList.vue`）。

---

## ref/computed 使用

- 优先 `ref`，复杂对象用 `reactive`
- 除后端交互数据和定时器外，其它尽可能使用 `computed`
- ref 访问必须使用 `.value`

---

## 模块化

单一职责、高内聚低耦合；方法超过 50 行必须拆分。

---

## 不要过度封装

简单逻辑直接写在 template 中，不为简单条件判断额外创建函数。
