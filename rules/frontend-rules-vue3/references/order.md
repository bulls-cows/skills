---
title: Vue3代码组织与顺序规范
version: 2.0.0
lastUpdated: 2026-06-03
priority: 🔴 基础规范（强制执行）
maintainer: bulls-cows team
---

# 💚 Vue3 代码组织与顺序规范

本规范定义SFC结构、Imports、脚本内部逻辑及模板属性的排列顺序，是Vue3代码可读性、可维护性的核心保障，所有Vue3项目必须严格遵守。

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
import { ref, computed, reactive, onMounted } from 'vue';
import dayjs from 'dayjs';

// 2. types（类型导入）
import type { IUserInfo, ITableConfig } from '@src/types';

// 3. 内部全局依赖（@src/）
import { apiGetUserInfo } from '@src/api/user';
import { formatDate } from '@src/utils/date';
import { useTable } from '@src/hooks/useTable';
import { useSearchForm } from '@src/hooks/useSearchForm';
import store from '@src/store';
import { APP_CONFIG } from '@src/constants';
import DataTable from '@src/components/DataTable.vue';

// 4. 内部相对依赖（./、../）
import { localHelpers } from './utils/helpers';
import { useLocalForm } from './hooks/useLocalForm';
import { MODULE_CONFIG } from './constants';
import SearchBar from './SearchBar.vue';
import UserCard from './UserCard.vue';

// --- 交互定义 ---
const props = defineProps<{ userId: string }>();
const emit = defineEmits<{ change: [value: string] }>();

// --- Hooks ---
// hook: useTable
const { dataSource, getDataSourceTotal } = useTable();

// --- 业务逻辑：搜索模块 ---
const searchQuery = ref<string>('');
const isSearchActive = computed(() => searchQuery.value.length > 0);
const handleSearch = () => { /* ... */ };
watch(searchQuery, (newVal) => { /* ... */ });

// --- 业务逻辑：表单模块 ---
const formRef = ref<HTMLFormElement | null>(null);
const form = reactive({ name: '', age: 0 });
const validateForm = async () => { /* ... */ };
const resetForm = () => { /* ... */ };
const onSubmit = async () => { /* ... */ };
onMounted(() => { /* ... */ });

// --- 对外暴露 ---
defineExpose({ validateForm, resetForm, getDataSourceTotal });
</script>
```

---

## 三、Import 分组排序（4 组）

将 `import` 分为四组，**组间空一行，组内按字母顺序排列**：

1. **node_modules（外部依赖）**：`vue`, `dayjs`, `lodash` 等第三方库。
2. **types（类型导入）**：所有 `import type` 导入的纯类型。
3. **内部全局依赖**：`@src/` 开头的路径（包括 API、工具、Hooks、Store、常量、组件等）。
4. **内部相对依赖**：`./` 或 `../` 开头的相对路径（包括工具、Hooks、常量、组件等）。

**排序原则**：外部优先 → 类型次之 → 全局在前 → 相对在后 → 组内按字母顺序排列。

**示例**：

```typescript
// 1. node_modules（外部依赖）
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import { debounce } from 'lodash'

// 2. types（类型导入）
import type { User, dataSource } from '@src/types'

// 3. 内部全局依赖（@src/）
import { apiGetUserInfo } from '@src/api/user'
import { formatDate } from '@src/utils/date'
import { useTable } from '@src/hooks/useTable'
import { useSearchForm } from '@src/hooks/useSearchForm'
import store from '@src/store'
import { APP_CONFIG } from '@src/constants'
import DataTable from '@src/components/DataTable.vue'

// 4. 内部相对依赖（./）
import { localHelper } from './utils/helper'
import { useFormValidate } from './hooks/useFormValidate'
import { MAX_RETRY_COUNT } from './constants'
import SearchBar from './SearchBar.vue'
```

---

## 四、模板属性顺序

详见 [directives.md](./directives.md#五模板属性顺序)（9 步完整顺序：`is` → `v-for` → `v-if/else` → `v-show` → `id` → `props` → `v-on` → `v-html` → `v-slot`）。

---

## 五、文件与目录命名

详见 [naming.md](./naming.md#一文件与组件命名)。
