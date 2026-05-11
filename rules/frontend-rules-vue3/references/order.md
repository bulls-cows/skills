# Vue3 代码组织与顺序规范

本规范定义 SFC 结构、Imports、脚本内部逻辑及模板属性的排列顺序。

---

## 一、SFC 块顺序

Vue3 单文件组件内部块顺序必须保持一致：

1. `<template>` → 2. `<script setup>` → 3. `<style scoped>`

---

## 二、`<script setup>` 内部结构顺序

脚本内的声明必须按以下宏观顺序排列：

| 步骤 | 内容 | 说明 |
|------|------|------|
| 1 | `imports` | 导入 |
| 2 | `defineProps` / `defineEmits` | 交互定义 |
| 3 | 全局 Hooks | `useXxx`（如 `useRouter`、`useTable` 等） |
| 4 | 业务逻辑 | 按功能模块分组（见下方说明） |
| 5 | `defineExpose` | 对外暴露 |

### 功能模块分组

第 4 步中，**同一类别的逻辑应尽可能按功能模块分组**，避免杂乱堆砌。**每个模块内部**通常遵循：

`ref`/`reactive` → `computed` → 方法 → `watch` → 生命周期钩子

#### 完整示例

```typescript
<script setup lang="ts">
// --- 导入 ---
import { ref, computed, reactive, onMounted } from 'vue';
import dayjs from 'dayjs';
import type { IUser } from '@src/types/user';
import { apiGetUserInfo } from '@src/api/user';
import { useTable } from '@src/hooks/useTable';
import UserCard from './UserCard.vue';

// --- 交互定义 ---
const props = defineProps<{ userId: string }>();
const emit = defineEmits<{ change: [value: string] }>();

// --- Hooks ---
const { tableData, getListData } = useTable();

// --- 业务逻辑：搜索模块 ---
const searchQuery = ref('');
const isSearchActive = computed(() => searchQuery.value.length > 0);
const handleSearch = () => { /* ... */ };
watch(searchQuery, (newVal) => { /* ... */ });

// --- 业务逻辑：表单模块 ---
const formRef = ref();
const form = reactive({ name: '', age: 0 });
const onSubmit = async () => { /* ... */ };
onMounted(() => { /* ... */ });

// --- 对外暴露 ---
defineExpose({ fetchData, resetForm });
</script>
```

---

## 三、Import 分组排序（4 组）

将 `import` 分为四组，**组间空一行，组内按字母顺序排列**：

1. **外部依赖**：`vue`, `dayjs`, `lodash` 等第三方库。
2. **types**：`import type` 类型导入。
3. **全局内部依赖**：`@src/...` 路径下的模块。
4. **相对内部依赖**：`./...` 路径下的模块。

**排序原则**：外部优先 → 内部在后 → 全局优先于相对 → 组内按字母顺序排列。

**示例**：

```typescript
// 1. 外部依赖
import { ref, computed, onMounted } from 'vue';
import dayjs from 'dayjs';
import { debounce } from 'lodash';

// 2. types
import type { IUser } from '@src/types/user';
import type { TableData } from './types';

// 3. 全局内部依赖
import { apiGetUserInfo } from '@src/api/user';
import { useTable } from '@src/hooks/useTable';
import { useSearchForm } from '@src/hooks/useSearchForm';
import { formatDate } from '@src/utils/date';
import store from '@src/store';
import { APP_CONFIG } from '@src/constants';
import DataTable from '@src/components/DataTable.vue';

// 4. 相对内部依赖
import SearchBar from './SearchBar.vue';
import { localHelper } from './utils/helper';
import { MAX_RETRY_COUNT } from './constants';
import { useFormValidate } from './hooks/useFormValidate';
```

---

## 四、模板属性顺序

HTML 元素上的属性顺序应保持统一：

`is` → `v-for` → `v-if/v-else-if/v-else` → `v-show/v-cloak` → `id` → `props/attrs` → `v-on` → `v-html/v-text` → 动态 `v-slot`

---

## 五、文件与目录命名

详见 `naming.md`。

| 类型 | 规范 |
|------|------|
| 组件文件名 | PascalCase + 多单词 (如 `UserList.vue`) |
| 目录命名 | kebab-case (如 `src/components/user-profile/`) |
| 组件使用 | PascalCase (如 `<UserList />`) |
