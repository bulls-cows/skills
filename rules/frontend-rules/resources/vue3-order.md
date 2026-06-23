# Vue3 代码组织与顺序规范

本规范定义 SFC 结构、Imports、脚本内部逻辑及模板属性的排列顺序。

---

## 一、SFC 块顺序

Vue3 单文件组件内部块顺序必须保持一致：

1. `<template>` → 2. `<script setup>` → 3. `<style scoped>`

---

## 二、`<script setup>` 内部结构顺序

脚本内的声明必须按以下宏观顺序排列：

| 步骤 | 内容                          | 说明                                      |
| ---- | ----------------------------- | ----------------------------------------- |
| 1    | `imports`                     | 导入（4 组）                              |
| 2    | `defineProps` / `defineEmits` | 交互定义                                  |
| 3    | 全局 Hooks                    | `useXxx`（如 `useRouter`、`useTable` 等） |
| 4    | 业务逻辑                      | 按功能模块分组（见下方说明）              |
| 5    | `defineExpose`                | 对外暴露                                  |

### 功能模块分组

第 4 步中，**同一类别的逻辑应尽可能按功能模块分组**，避免杂乱堆砌。**每个模块内部**通常遵循：

`ref`/`reactive` → `computed` → 方法 → `watch` → 生命周期钩子

#### 完整示例

> **注意**：第 4 步"业务逻辑"内部，每个功能模块应遵循 `ref`/`reactive` → `computed` → 方法 → `watch` → 生命周期钩子的顺序。

```typescript
<script setup lang="ts">
// --- 导入（4 组）---
// 1. node_modules（外部依赖）
import { ref, computed, reactive, onMounted } from 'vue'
import dayjs from 'dayjs'

// 2. types（类型导入）
import type { IUserInfo, ITableConfig } from '@src/types'

// 3. 内部全局依赖（@src/）
import { apiGetUserInfo } from '@src/api/user'
import { formatDate } from '@src/utils/date'
import { useTable } from '@src/hooks/useTable'
import { useSearchForm } from '@src/hooks/useSearchForm'
import store from '@src/store'
import { APP_CONFIG } from '@src/constants'
import DataTable from '@src/components/DataTable.vue'

// 4. 内部相对依赖（./、../）
import { localHelpers } from './utils/helpers'
import { useLocalForm } from './hooks/useLocalForm'
import { MODULE_CONFIG } from './constants'
import SearchBar from './SearchBar.vue'
import UserCard from './UserCard.vue'

// --- 交互定义 ---
const props = defineProps<{ userId: string }>()
const emit = defineEmits<{ change: [value: string] }>()

// --- Hooks ---
// hook: useTable
const { dataSource, getDataSourceTotal } = useTable()

// --- 业务逻辑：搜索模块 ---
const searchQuery = ref<string>('')
const isSearchActive = computed(() => searchQuery.value.length > 0)
const handleSearch = () => { /* ... */ }
watch(searchQuery, (newVal) => { /* ... */ })

// --- 业务逻辑：表单模块 ---
const formRef = ref<HTMLFormElement | null>(null)
const form = reactive({ name: '', age: 0 })
const validateForm = async () => { /* ... */ }
const resetForm = () => { /* ... */ }
const onSubmit = async () => { /* ... */ }
onMounted(() => { /* ... */ })

// --- 对外暴露 ---
defineExpose({ validateForm, resetForm, getDataSourceTotal })
</script>
```

---

## 三、Import 分组

Import 分组规则详见 [common-code-style.md](./common-code-style.md#二导入排序规范)。

Vue3 采用 4 组分组：外部依赖 → 类型导入 → 内部全局依赖（@src/）→ 内部相对依赖（./），组间空一行，组内按字母顺序。

---

## 四、模板属性顺序

详见 [common-vue-template.md](./common-vue-template.md#六模板属性顺序)（通用 8 步顺序）与 [vue3-directives.md](./vue3-directives.md#一vue3-特有第-9-步动态-v-slot)（Vue3 追加第 9 步 `v-slot`）。

---

## 五、文件与目录命名

详见 [common-naming.md](./common-naming.md#一文件与目录命名)。
