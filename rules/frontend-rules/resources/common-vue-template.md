# Vue 模板通用规则（Vue2/Vue3 共享）

> 本规范涵盖 Vue2 与 Vue3 通用的模板规则，包括指令使用、安全约束、简写约定与属性顺序。框架特定差异（如 `v-model` 写法）详见各自框架文档。

## 一、v-for 与 key

- 在组件上**必须**使用 `key` 属性配合 `v-for`，以维护组件内部状态
- `key` 必须用唯一 ID，**禁止**使用 `index` 作为 key

```vue
<!-- ✅ 正确：使用唯一 ID -->
<li v-for="item in items" :key="item.id">{{ item.name }}</li>

<!-- ❌ 错误：使用 index -->
<li v-for="(item, index) in items" :key="index">{{ item.name }}</li>
```

---

## 二、v-if 与 v-for 冲突

- **禁止**将 `v-if` 和 `v-for` 同时用在同一个元素上

**解决方案**：

- 使用 `<template>` 包裹
- 使用 computed 预先过滤数据

```vue
<!-- ✅ 正确：使用 template 包裹 -->
<template v-for="item in items" :key="item.id">
  <li v-if="item.visible">{{ item.name }}</li>
</template>

<!-- ✅ 正确：使用 computed 过滤 -->
<li v-for="item in visibleItems" :key="item.id">{{ item.name }}</li>
```

---

## 三、v-html 安全

- 可使用 `v-html`，但**必须**用 DOMPurify 过滤 HTML，防止 XSS 攻击
- 避免直接操作未过滤的字符串

```javascript
// Vue2 写法（Options API）
export default {
  computed: {
    safeHtml() {
      return DOMPurify.sanitize(this.rawHtml)
    },
  },
}
```

```typescript
// Vue3 写法（<script setup>）
import DOMPurify from 'dompurify'
const safeHtml = computed(() => DOMPurify.sanitize(rawHtml.value))
```

```vue
<div v-html="safeHtml"></div>
```

---

## 四、指令简写

统一使用指令简写形式，使模板更简洁：

| 完整写法      | 简写     | 示例                   |
| ------------- | -------- | ---------------------- |
| `v-bind:attr` | `:attr`  | `:src="avatar"`        |
| `v-on:event`  | `@event` | `@click="handleClick"` |
| `v-slot:name` | `#name`  | `#default="slotProps"` |

```vue
<!-- ✅ 正确：简写 -->
<img :src="avatar" @click="handleClick" #default="slotProps" />

<!-- ❌ 错误：完整写法 -->
<img v-bind:src="avatar" v-on:click="handleClick" v-slot:default="slotProps" />
```

---

## 五、v-slot 风格

- 使用动态风格（如 `v-slot:[name]` 或 `#[name]`，`name` 为动态变量）
- **禁止**静态默认插槽写法

---

## 六、模板属性顺序

HTML 元素上的属性顺序应保持统一，基础 8 步顺序如下：

1. 定义（`is`）
2. `v-for`
3. `v-if` / `v-else-if` / `v-else`
4. `v-show` / `v-cloak`
5. `id`
6. `props` / `attrs`
7. `v-on`（`@`）
8. `v-html` / `v-text`

> **Vue3 特有第 9 步**：动态 `v-slot`（`#`）追加在最后，详见 [vue3-directives.md](./vue3-directives.md#一vue3-特有第-9-步动态-v-slot)。

```vue
<template
  v-for="item in items"
  :key="item.id"
  v-if="item.visible"
  id="list-item"
  :class="item.class"
  @click="handleClick(item)"
>
  {{ item.name }}
</template>
```

---

## 七、框架特定差异

| 内容                | Vue2 详见                                                 | Vue3 详见                                                                |
| ------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------ |
| `v-model` 写法      | [vue2-directives.md](./vue2-directives.md#一v-model-写法) | [vue3-directives.md](./vue3-directives.md#二v-model-写法)                |
| 模板属性顺序第 9 步 | 无                                                        | [vue3-directives.md](./vue3-directives.md#一vue3-特有第-9-步动态-v-slot) |
