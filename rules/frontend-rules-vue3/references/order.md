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

> **注意**：第 4 步"业务逻辑"内部，每个功能模块应遵循 `ref`/`reactive` → `computed` → 方法 → `watch` → 生命周期钩子的顺序。

```typescript
<script setup lang="ts">
// --- 导入（11 组）---
// 1. 外部依赖
import { ref, computed, reactive, onMounted } from 'vue';
import dayjs from 'dayjs';

// 2. API
import { apiGetUserInfo } from '@src/api/user';

// 3. 全局工具
import { formatDate } from '@src/utils/date';

// 4. 相对工具
import { localHelpers } from './utils/helpers';

// 5. 全局 Hooks
import { useTable } from '@src/hooks/useTable';
import { useSearchForm } from '@src/hooks/useSearchForm';

// 6. 相对 Hooks
import { useLocalForm } from './hooks/useLocalForm';

// 7. 全局 Store
import store from '@src/store';

// 8. 全局配置
import { APP_CONFIG } from '@src/constants';

// 9. 相对配置
import { MODULE_CONFIG } from './constants';

// 10. 全局组件
import DataTable from '@src/components/DataTable.vue';

// 11. 相对组件
import SearchBar from './SearchBar.vue';
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

## 三、Import 分组排序（11 组）

将 `import` 分为十一组，**组间空一行，组内按字母顺序排列**：

1. **外部依赖**：`vue`, `dayjs`, `lodash` 等第三方库。
2. **全局 API**：`@src/api/...`
3. **全局工具**：`@src/utils/...`
4. **相对工具**：`./utils/...`
5. **全局 Hooks**：`@src/hooks/...`
6. **相对 Hooks**：`./hooks/...`
7. **全局 Store**：`@src/store/...`
8. **全局配置**：`@src/constants/...`
9. **相对配置**：`./constants/...`
10. **全局组件**：`@src/components/...`
11. **相对组件**：`./ComponentName.vue`

**排序原则**：全局优先 → 相对在后 → 组内按字母顺序排列。

**示例**：

```typescript
// 1. 外部依赖
import { ref, computed, onMounted } from 'vue';
import dayjs from 'dayjs';
import { debounce } from 'lodash';

// 2. 全局 API
import { apiGetUserInfo } from '@src/api/user';

// 3. 全局工具
import { formatDate } from '@src/utils/date';

// 4. 相对工具
import { localHelper } from './utils/helper';

// 5. 全局 Hooks
import { useTable } from '@src/hooks/useTable';
import { useSearchForm } from '@src/hooks/useSearchForm';

// 6. 相对 Hooks
import { useFormValidate } from './hooks/useFormValidate';

// 7. 全局 Store
import store from '@src/store';

// 8. 全局配置
import { APP_CONFIG } from '@src/constants';

// 9. 相对配置
import { MAX_RETRY_COUNT } from './constants';

// 10. 全局组件
import DataTable from '@src/components/DataTable.vue';

// 11. 相对组件
import SearchBar from './SearchBar.vue';
```

---

## 四、模板属性顺序

详见 [directives.md](./directives.md#五模板属性顺序)（9 步完整顺序：`is` → `v-for` → `v-if/else` → `v-show` → `id` → `props` → `v-on` → `v-html` → `v-slot`）。

---

## 五、文件与目录命名

详见 [naming.md](./naming.md#一文件与组件命名)。
