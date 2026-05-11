# T03 🧹 代码风格与格式清洗（🟡 中风险）

**定位**：🟡 中风险。涉及代码格式化和结构整理。适用于 `.vue`、`.js`、`.jsx`、`.ts`、`.tsx`、`.css`、`.scss`、`.less` 文件。

## 相关规则

执行本任务前，请先阅读以下规则文件（位于 `rules/` 目录），按优先级从高到低排列：

- **`rules/spec-index.md`**：Vue3 前端项目开发规范总纲（必读）
- **`rules/order.md`**：SFC 块顺序、Import 分组排序、脚本内部声明顺序、模板属性顺序
- **`rules/formatting.md`**：Prettier 配置、ESLint 集成
- **`rules/naming.md`**：文件与标识符命名规范
- **`rules/typescript.md`**：TypeScript 类型注解要求、禁止 `any`
- **`rules/directives.md`**：指令简写、模板属性顺序

## ⚠️ 风险说明（执行前必须展示给用户）

| 风险项            | 影响范围     | 说明                                                                              |
| ----------------- | ------------ | --------------------------------------------------------------------------------- |
| **Git Diff 膨胀** | 全文件       | 格式化会改变缩进、引号、分号等，导致 git diff 行数大幅增加，增加 Code Review 难度 |
| **合并冲突**      | 多人协作分支 | 大规模格式化可能导致与他人的分支产生合并冲突                                      |
| **格式不一致**    | 团队协作     | 如果项目未统一 Prettier 配置，格式化可能与团队现有风格产生差异                    |

> **建议**：在执行格式化前，确保当前分支是干净的，且没有待合并的代码。

## 格式化执行步骤

### 第一步：调用 Prettier 格式化

优先使用项目自有的 Prettier 配置进行格式化。执行步骤如下：

1. **尝试执行 Prettier 命令**：

   ```bash
   npx prettier --write <target-file>
   ```

2. **处理执行结果**：
   - **成功**：Prettier 按项目自有配置完成格式化，继续第二步。
   - **失败**（命令不存在或未安装）：参考技能目录下 `assets/.prettierrc.json` 的配置规则，手动对文件代码进行格式化。

   `assets/.prettierrc.json` 配置说明（仅作为 fallback 参考）：
   - **缩进**：2 空格（`tabWidth: 2`）
   - **引号**：JS/TS/JSX/TSX 单 `'`（`singleQuote: true`），Vue 模板属性双 `"`（`vueHtmlAttributes: "double"`）
   - **标点**：强制分号（`semi: true`），尾随逗号（`trailingComma: "all"`），箭头函数单参数无括号（`arrowParens: "avoid"`）
   - **行宽**：单行最大字符数 **120**（`printWidth: 120`）（与 `assets/.prettierrc.json` 一致）
   - **其他**：对象花括号保持空格（`bracketSpacing: true`），不强制属性独占一行（`singleAttributePerLine: false`）

> **注意**：该文件是给 AI 看的配置参考，不是直接执行的配置文件。优先信任项目自身的 Prettier 配置。

### 第二步：手动结构调整

Prettier 无法处理代码结构排序和运算符调整。格式化后，需手动执行以下**结构与顺序整理**规则：

## 结构与顺序整理

### `<script setup>` name 属性

**前提条件**：项目已安装 `unplugin-vue-setup-extend-plus`。

- 若检测到项目 `package.json` 中包含 `unplugin-vue-setup-extend-plus` 依赖，或 `node_modules/unplugin-vue-setup-extend-plus` 目录存在，则在 `<script setup>` 标签上添加 `name="PascalCase组件名"` 属性
- 组件名根据文件名推导：`UserCard.vue` → `name="UserCard"`，`user-list-item.vue` → `name="UserListItem"`
- 示例：`<script setup lang="ts" name="UserCard">`
  - **未安装该插件时，不添加 name 属性**，保持原有 `<script setup>` 写法

### 导入顺序（4 组）

组间空一行，组内按字母排序。分为：外部依赖（vue、dayjs 等）、types（`import type`）、全局内部依赖（@src/...）、相对内部依赖（./...）。

```typescript
// 外部依赖
import dayjs from 'dayjs';
import { debounce } from 'lodash';

// types
import type { IUserInfo } from '@src/types/user';

// 全局内部依赖
import { apiGetUserInfo } from '@src/api/user';
import { formatDate } from '@src/utils';

// 相对内部依赖
import { MAX_RETRY_COUNT } from './constants';
import { formatFileSize } from './utils/format';
```

### `<script setup>` 结构顺序

整体顺序遵守：

`imports` → `defineProps` → `defineEmits` → `全局Hooks（多个业务共享的 useXxx）` → **业务模块（按领域分组）** → `defineExpose`

**Hooks 位置**：全局共享的 Hook 放 defineEmits 后，仅单业务使用的 Hook 放对应业务模块顶部。

**业务模块内部**：按业务逻辑分组（如表单相关、表格相关、弹窗相关），组内自由组合 `ref/reactive`（**优先 ref，尽可能少用 reactive**）、`computed`、`watch/watchEffect`、方法/函数、生命周期钩子，不必严格按类型排序。

**Vue3 组合式 API 标准结构示例**：

```typescript
<script setup lang="ts" name="UserCard">
// 1. imports（按 4 组排序）
import { ref, computed, watch, onMounted } from 'vue';

import type { IUserInfo } from '@src/types/user';

import { apiGetUserList } from '@src/api/user';

// 2. defineProps
const props = defineProps<{
  userId: string;
  pageSize?: number;
}>();

// 3. defineEmits
const emit = defineEmits<{
  (e: 'select', user: IUserInfo): void;
  (e: 'change', page: number): void;
}>();

// 4. 全局Hooks（多个业务共享的 useXxx）
const { globalState } = useGlobalStore();

// ==================== 表单模块 ====================
// 5. 业务模块：组内自由组合 ref/computed/watch/方法/生命周期
const formData = ref({
  username: '',
  email: '',
});
const isFormValid = computed(() => formData.value.username.length > 0);

const resetForm = () => {
  formData.value = { username: '', email: '' };
};

// ==================== 表格模块 ====================
// 6. 业务模块：组内自由组合（含该模块专属 Hooks）
const { tableData, loading, fetchData } = useTable();
const total = ref(0);
const displayUsers = computed(() => tableData.value.filter((u) => u.active));

watch(
  () => props.userId,
  (newId) => {
    fetchData(newId);
  },
);

const handleSubmit = async () => {
  try {
    await apiPostForm(formData.value);
    emit('submit');
  }
  catch (error) {
    console.warn(error);
  }
};

// ==================== 弹窗模块 ====================
const dialogVisible = ref(false);
const dialogData = ref<IUserInfo | null>(null);

const openDialog = (row: IUserInfo) => {
  dialogData.value = row;
  dialogVisible.value = true;
};

// 7. 生命周期钩子（全局级）
onMounted(() => {
  fetchData(props.userId);
});

onUnmounted(() => {
  // 清理逻辑
});

// 8. defineExpose（可选，暴露给父组件）
defineExpose({
  resetForm,
  fetchData,
});
</script>
```

### 方法内部顺序

`init...()` → `async getListData()` / `async postFormData()` → `onClick...()` / `onChange...()` → `computed...()`

### 函数写法偏好

**优先使用 `const 函数名 = () => {}` 箭头函数写法，避免使用 `function` 声明。**

| 原写法                           | 推荐写法                            |
| -------------------------------- | ----------------------------------- |
| `function fetchData() {}`        | `const fetchData = () => {}`        |
| `function handleClick(e) {}`     | `const handleClick = (e) => {}`     |
| `async function submitForm() {}` | `const submitForm = async () => {}` |

> ⚠️ 该转换属于**代码风格统一**，需在 T03 任务中提示用户确认后执行。

### 模板属性排序

`is` → `v-for` → `v-if` → `v-show` → `id` → `props` → `v-on` → `v-html` → `v-slot`

**模板职责**：

- 只负责展示，不写复杂表达式
- 简单逻辑可内联，不为简单逻辑额外创建函数
- **不要过度封装**：简单的条件判断或表达式直接写在 template 中

**注意**：

- `v-text` 与 `v-html` 同位
- 条件分支完整序列为 `v-if` → `v-else-if` → `v-else`
- 隐藏控制包含 `v-show` 和 `v-cloak`
- 属性分组包含 `props` 和 `attrs`

**v-slot 风格**：优先使用 `v-slot:name` 或 `#name` 简写语法。避免已废弃的 `slot="name"` 写法。

## JSX/TSX 组件结构规范

### TSX 组件标准结构

```tsx
// UserCard.tsx
import { defineComponent, ref, computed } from 'vue';
import type { PropType } from 'vue';
import type { IUserInfo } from '@src/types/user';

/**
 * UserCard 组件
 * @description 用户卡片组件，显示用户基本信息
 */
export default defineComponent({
  name: 'UserCard',

  props: {
    user: {
      type: Object as PropType<IUserInfo>,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['select', 'change'],

  setup(props, { emit }) {
    const isActive = ref(false);

    const displayName = computed(() => props.user.name || '未知用户');

    const handleClick = () => {
      emit('select', props.user);
      isActive.value = !isActive.value;
    };

    return () => (
      <div class="user-card">
        <div class="user-card__header">
          <span>{displayName.value}</span>
        </div>
        <div class="user-card__body">
          <button onClick={handleClick}>选择用户</button>
        </div>
      </div>
    );
  },
});
```

### TSX 组件结构顺序

1. imports（按 3 组排序）
2. 类型定义
3. defineComponent
4. name
5. props（带 TypeScript 类型）
6. emits
7. setup 函数
8. 返回渲染函数

### `.vue` SFC 规范（推荐替代 JSX）

> 提示：Vue3 项目推荐优先使用 `.vue` 单文件组件配合 `<script setup>`。仅在需要动态渲染或复杂 render 逻辑时才使用 TSX/JSX。对于简单的 JSX 组件，建议迁移回 `.vue` 格式。

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

/**
 * UserCard 组件
 * @description 用户卡片组件，显示用户基本信息
 */
const props = defineProps<{
  user: IUserInfo;
  isLoading?: boolean;
}>();

const emit = defineEmits<{
  select: [user: IUserInfo];
  change: [];
}>();

const isActive = ref(false);

const displayName = computed(() => props.user?.name || '未知用户');

const handleClick = () => {
  emit('select', props.user);
  isActive.value = !isActive.value;
};
</script>

<template>
  <div class="user-card">
    <div class="user-card__header">
      <span>{{ displayName }}</span>
    </div>
    <div class="user-card__body">
      <button @click="handleClick">选择用户</button>
    </div>
  </div>
</template>
```

### JSX 组件结构顺序

1. imports（按 3 组排序）
2. 类型定义
3. defineComponent
4. name
5. props（带 TypeScript 类型）
6. emits
7. setup 函数（包含：状态定义、计算属性、方法）
8. 返回渲染函数
