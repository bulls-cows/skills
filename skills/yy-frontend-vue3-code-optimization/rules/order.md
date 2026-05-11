# Vue3 代码组织与顺序规范

本规范定义 SFC 结构、Imports、脚本内部逻辑及模板属性的排列顺序。

---

## 一、SFC 结构

- **块顺序**：`<template>` → `<script>` → `<style>`。
- 团队内必须保持一致。

---

## 二、Import 导入顺序

将 `import` 分为四组，**组间空一行，组内按字母顺序排列**：

1. **外部依赖**：`vue`, `dayjs`, `lodash` 等第三方库。
2. **types**：`import type` 类型导入。
3. **全局内部依赖**：`@src/...` 路径下的模块。
4. **相对内部依赖**：`./...` 路径下的模块。

**示例**：

```typescript
import { ref, computed } from 'vue';
import dayjs from 'dayjs';

import type { IUser } from '@src/types/user';

import { apiGetUser } from '@src/api/user';
import { formatDate } from '@src/utils/date';
import { useTable } from '@src/hooks/useTable';

import UserCard from './UserCard.vue';
import { localHelper } from './utils/helper';
```

---

## 三、`<script setup>` 内部结构顺序

脚本内的声明必须遵循以下顺序：

1. `imports` (导入)
2. `defineProps` / `defineEmits` (交互定义)
3. 全局 Hooks (`useXxx`，如 `useRouter`、`useTable` 等)
4. 业务逻辑 (按功能模块分组，组内通常顺序：`ref`/`reactive` → `computed` → 方法 → `watch` → 生命周期钩子)
5. `defineExpose` (对外暴露)

### 功能模块化组织

除了上述宏观顺序，**同一类别的逻辑应尽可能按功能模块分组**，避免杂乱堆砌。

**示例（Hooks/数据/方法区域）**：

```typescript
// --- 状态定义 ---
const visible = ref(false);

// --- 抽屉逻辑 ---
const showModal = () => { visible.value = true; };
const onClose = () => { visible.value = false; };

// --- 表单逻辑 ---
const formRef = ref();
const form = reactive({ name: '' });
const onSubmit = async () => { /* ... */ };
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
