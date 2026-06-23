---
description: Nuxt 4 项目最佳实践，包含禁用自动导入、显式引入等核心配置规范
alwaysApply: true
---

# Nuxt 4 最佳实践

## 与 Vue3 规则的关系

Vue3 相关的开发规范（组件命名、组合式 API、响应式等）应由 Vue3 特有的规则文档负责，本规则不重复这些内容。本文档仅聚焦 Nuxt 4 框架特有的配置和实践。

## 禁用自动导入

**原则**：建议在 Nuxt 4 项目中禁用自动导入（auto-imports），使用显式引用。

**配置示例**：

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    autoImport: false,
    dirs: [],
    scan: false,
  },
})
```

**为什么**：

- 显式导入让依赖关系一目了然，便于代码审查
- 避免命名冲突和隐式依赖
- 更容易追踪函数来源，提升可维护性
- 与 Vue3 生态的其他项目保持一致的导入风格

## 显式引入组件和模块

**原则**：所有组件、composables、工具函数都应使用显式 import 语句引入。

**路径别名**：

| 别名 | 路径       | 说明          |
| ---- | ---------- | ------------- |
| `@`  | 项目根目录 | 通用别名      |
| `~`  | 项目根目录 | Nuxt 默认别名 |

**推荐**：统一使用 `@` 别名，保持与 Vue3 项目一致。

**正确示例**：

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ContentSection from '@/components/ContentSection.vue'
import { useUser } from '@/composables/useUser'
import { formatDate } from '@/utils/date'
</script>
```

**错误示例**：

```vue
<script setup lang="ts">
// 错误：依赖自动导入，没有显式 import
// ref、onMounted、ContentSection 等都是隐式可用的
</script>
```

## 组件引用规范

**原则**：在 `<script setup>` 中显式导入所有使用的组件。

**为什么**：

- 明确组件依赖关系
- 避免因自动导入配置变更导致的意外错误
- IDE 能更好地提供类型提示和跳转功能

**示例**：

```vue
<template>
  <MyComponent />
</template>

<script setup lang="ts">
import MyComponent from '@/components/MyComponent.vue'
</script>
```

## Composables 引用规范

**原则**：所有 composables 函数都应显式导入。

**示例**：

```vue
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useApi } from '@/composables/useApi'

const { user, isLoggedIn } = useAuth()
const { fetch, loading } = useApi()
</script>
```

## 总结

| 场景                       | 做法                         |
| -------------------------- | ---------------------------- |
| Vue API (ref, computed 等) | 显式从 `vue` 导入            |
| 组件                       | 显式导入，使用 `@` 别名      |
| Composables                | 显式导入，使用 `@` 别名      |
| 工具函数                   | 显式导入，使用 `@` 别名      |
| Nuxt API (useNuxtApp 等)   | 显式从 `#app` 或 `nuxt` 导入 |

## 页面标题管理

**原则**：使用 `useHead` 的 `titleTemplate` 统一管理页面标题，各页面只设置简短标题，避免重复写网站名称后缀。

**为什么**：

- 消除重复代码：各页面只需关注自身标题，网站名称由 `titleTemplate` 自动拼接
- 统一变更点：修改网站名称时只需改一处，无需遍历所有页面
- 符合直觉：页面标题格式通常为"页面标题 - 网站名称"，`titleTemplate` 天然支持此模式

**配置方式**：

在 `app/app.vue` 中设置 `titleTemplate`：

```typescript
// app/app.vue
useHead({
  titleTemplate: (titleChunk?: string) => {
    return titleChunk ? `${titleChunk} - {网站名称}` : '{网站名称} - {网站副标题}'
  },
})
```

- `titleChunk` 有值：返回 `"页面标题 - 网站名称"`
- `titleChunk` 为空：返回默认标题（首页无需设置时的回退值）

> `{网站名称}` 和 `{网站副标题}` 替换为实际值，或从 `runtimeConfig` 中读取动态设置。

**移除 `nuxt.config.ts` 中的 `title`**：

```typescript
// nuxt.config.ts — 移除 title 配置
app: {
  head: {
    // ❌ 不要在这里设置 title
    title: "xxx", // [!code --]
    meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
    // ...
  },
}
```

标题配置统一由 `app/app.vue` 管理，`nuxt.config.ts` 的 `app.head` 中不应再设置 `title`。

**页面中使用**：

各页面只需设置简短标题：

```vue
<!-- app/pages/example.vue -->
<script setup lang="ts">
import { useHead } from 'nuxt/app'

useHead({
  title: '页面标题',
})
</script>
```

**首页不需要设置**：首页默认走 `titleTemplate` 的空值分支，自动使用默认标题，无需额外设置。

**新增页面时**：

只需一行，自动获得完整标题：

```typescript
useHead({ title: '页面名' })
// 浏览器标签页显示: "页面名 - 网站名称"
```

**注意事项**：

- `titleTemplate` 在 `app/app.vue` 中设置，全局生效
- 各页面仍通过 `useHead({ title })` 设置，由 `titleTemplate` 自动拼接
- 使用 `useHead` 时需从 `"nuxt/app"` 显式导入（遵循禁用自动导入原则）
