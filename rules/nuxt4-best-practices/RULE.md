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
