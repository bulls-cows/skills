# 代码风格与格式清洗

**定位**：🟡 中风险。涉及代码格式化和结构整理。

## ⚠️ 风险说明（执行前必须展示给用户）

| 风险项 | 影响范围 | 说明 |
|--------|----------|------|
| **Git Diff 膨胀** | 全文件 | 格式化会改变缩进、引号、分号等，导致 git diff 行数大幅增加，增加 Code Review 难度 |
| **合并冲突** | 多人协作分支 | 大规模格式化可能导致与他人的分支产生合并冲突 |
| **格式不一致** | 团队协作 | 如果项目未统一 Prettier 配置，格式化可能与团队现有风格产生差异 |

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
   - **引号**：JS/TS 单 `'`（`singleQuote: true`），HTML 双 `"`
   - **标点**：强制分号（`semi: true`），尾随逗号（`trailingComma: "all"`），箭头函数单参数无括号（`arrowParens: "avoid"`）
   - **行宽**：单行最大字符数 **120**（`printWidth: 120`）（与 `assets/.prettierrc.json` 一致）
   - **其他**：对象花括号保持空格（`bracketSpacing: true`），不强制属性独占一行（`singleAttributePerLine: false`）

> **注意**：该文件是给 AI 看的配置参考，不是直接执行的配置文件。优先信任项目自身的 Prettier 配置。

### 第二步：手动结构调整

Prettier 无法处理代码结构排序和运算符调整。格式化后，需手动执行以下**结构与顺序整理**规则：

## 结构与顺序整理

### 导入顺序（11 组）

组间空一行，组内按字母排序。

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
import { formatFileSize } from './utils/format';

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
import { NavbarLogo } from '@src/components';

// 11. 相对组件
import NavbarLogo2 from './NavbarLogo2.vue';
```

### `<script setup>` 结构顺序

严格遵循以下顺序（组间用空行分隔）：

1. `imports`
2. `defineProps`
3. `defineEmits`
4. Hooks 引入（`const { ... } = useXxx()`）
5. `ref` / `reactive` 响应式数据
6. `computed`
7. `watch` / `watchEffect`
8. 方法 / 函数
9. 生命周期钩子
10. `defineExpose`

```typescript
<script setup lang="ts">
// imports
import { ref, computed, onMounted } from 'vue';

// props
const props = defineProps<{
  // userId: 用户ID
  userId: string | number;
}>();

// emits
const emit = defineEmits<{
  change: [value: string];
}>();

// Hooks
const { tableData, pagination, getListData } = useTable();

// 响应式数据
const searchQuery = ref({
  username: '',
  email: '',
});

// computed
const isSelected = computed(() => {
  return selectedItems.value.length === totalItems.value;
});

// watch
watch(searchQuery, (newVal) => {
  // 处理搜索关键词变化
}, { immediate: true });

// 方法
const fetchData = async () => {
  // ...
};

// 生命周期
onMounted(() => {
  fetchData();
});
</script>
```

### 方法内部顺序

`const initXxx = () =>` → `const getListData = async () =>` / `const postFormData = async () =>` → `const onClickXxx = async () =>` / `const onChangeXxx = async () =>` → `const computedXxx = () =>`

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

**v-slot 风格**：优先使用 `v-slot:name` 或 `#name` 简写语法。
