# 模板指令规范

本模块定义 Vue3 模板中指令的使用规范。

## 一、v-for 与 key

- 必须使用唯一 ID 作为 `key`，禁止使用数组 index
- `key` 必须是稳定且可预测的标识符

```vue
<!-- ✅ 正确：使用唯一 ID -->
<li v-for="item in items" :key="item.id">{{ item.name }}</li>

<!-- ❌ 错误：使用 index -->
<li v-for="(item, index) in items" :key="index">{{ item.name }}</li>
```

## 二、v-if 与 v-for 冲突

- **禁止**在同一元素上同时使用 `v-if` 和 `v-for`
- 解决方案：
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

## 三、v-html 安全

- 使用 `v-html` 时必须用 DOMPurify 过滤 HTML
- 防范 XSS 攻击

```typescript
import DOMPurify from 'dompurify';

const safeHtml = computed(() => DOMPurify.sanitize(rawHtml.value));
```

```vue
<div v-html="safeHtml"></div>
```

## 四、指令简写

统一使用指令简写语法：

| 完整写法 | 简写 |
|----------|------|
| `v-bind:attr` | `:attr` |
| `v-on:event` | `@event` |
| `v-slot:name` | `#name` |

```vue
<!-- ✅ 正确：简写 -->
<img :src="avatar" @click="handleClick" #default="slotProps" />

<!-- ❌ 错误：完整写法 -->
<img v-bind:src="avatar" v-on:click="handleClick" v-slot:default="slotProps" />
```

## 五、模板属性顺序

HTML 元素上属性需按以下顺序排列：

1. 定义（`is`）
2. `v-for`
3. `v-if` / `v-else-if` / `v-else`
4. `v-show` / `v-cloak`
5. `id`
6. `props/attrs`
7. `v-on`（`@`）
8. `v-html` / `v-text`
9. 动态 `v-slot`（`#`）

```vue
<template v-for="item in items" :key="item.id" v-if="item.visible" id="list-item" :class="item.class" @click="handleClick(item)" #default="slotProps">
  {{ item.name }}
</template>
```
