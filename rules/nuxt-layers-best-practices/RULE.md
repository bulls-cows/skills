---
description: Nuxt Layers 复用架构的最佳实践，包括别名使用、Vue 3 defineProps 限制和配置覆盖机制
alwaysApply: true
---

# Nuxt Layers 最佳实践

## 别名使用规范

### Layer 内部别名

Layer 项目（如 `_base`）内部应使用 `@` 或 `~` 别名，指向自身的 `app` 目录：

```typescript
// ✅ 正确：Layer 内部使用 @ 或 ~
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
```

```typescript
// ❌ 错误：Layer 内部不能使用 @base 别名
import SiteHeader from '@base/components/layout/SiteHeader.vue'
```

**原因**：`@base` 别名只在子项目中通过 `generateNuxtConfig` 函数定义，Layer 自身无法解析该别名。

### 子项目使用别名

子项目继承 Layer 后，可以使用 `@base` 别名访问 `_base` 中的内容：

```typescript
// ✅ 子项目可以使用 @base
import { someUtil } from '@base/utils/format'
```

## Vue 3 defineProps 限制

### 问题描述

`defineProps()` 在 `<script setup>` 中会被提升到 `setup()` 函数外部，因此不能引用 `setup()` 中声明的局部变量：

```vue
<!-- ❌ 错误：defineProps 不能引用局部变量 -->
<script setup lang="ts">
import { useAppConfig } from 'nuxt/app'

const appConfig = useAppConfig()

withDefaults(defineProps<Props>(), {
  siteName: () => appConfig.site.name, // 报错！
})
</script>
```

### 正确做法

将配置读取逻辑移到布局层，组件只负责接收 props：

```vue
<!-- ✅ 组件：只定义静态默认值 -->
<script setup lang="ts">
interface Props {
  siteName?: string
}

withDefaults(defineProps<Props>(), {
  siteName: '默认名称',
})
</script>
```

```vue
<!-- ✅ 布局：读取配置并传入组件 -->
<template>
  <SiteHeader :site-name="appConfig.site.name" />
</template>

<script setup lang="ts">
import { useAppConfig } from 'nuxt/app'
import SiteHeader from '@/components/layout/SiteHeader.vue'

const appConfig = useAppConfig()
</script>
```

## 配置覆盖机制

### 使用 app.config.ts

Nuxt 的 `app.config.ts` 支持 Layer 继承和覆盖，适合存放需要子项目自定义的配置：

```typescript
// _base/app/app.config.ts（默认配置）
export default defineAppConfig({
  site: {
    name: '网站名称',
    menuItems: [{ to: '/', label: '首页' }],
    footer: {
      description: '默认描述',
      beianText: '',
    },
  },
})
```

```typescript
// 子项目/app/app.config.ts（覆盖配置）
export default defineAppConfig({
  site: {
    name: '我的博客',
    menuItems: [
      { to: '/', label: '首页' },
      { to: '/blog', label: '博客' },
    ],
  },
})
```

### 配置读取层级

```text
布局层 (layouts/default.vue)
  └── 读取 app.config.ts 配置
       └── 作为 props 传入组件
            └── 组件只负责接收 props 和渲染
```

## 禁用自动导入

在 Layer 的 `nuxt.config.ts` 中禁用自动导入，改为显式导入：

```typescript
// _base/nuxt.config.ts
export default defineNuxtConfig({
  // 禁用组件自动导入
  components: false,

  // 禁用 composables 自动导入
  imports: false,
})
```

禁用后，所有导入需要显式声明：

```vue
<script setup lang="ts">
// 显式导入组件
import SiteHeader from '@/components/layout/SiteHeader.vue'

// 显式导入 composables
import { useUtils } from '@/composables/useUtils'

// 显式导入工具函数
import { format } from '@/utils/format'
</script>
```
