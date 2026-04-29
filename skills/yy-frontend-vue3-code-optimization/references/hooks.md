# Hooks 规范

## 命名规范

- 必须以 `use` 开头，如 `useTable`、`useSearchForm`、`usePagination`。
- 文件名与函数名一致，使用 PascalCase。

## 文件位置

- 全局 Hooks 存放在 `@src/hooks/` 目录。
- 相对 Hooks 放在当前模块下的 `./hooks/` 目录。

## 返回值

- 统一返回对象，推荐使用 `toRefs` 解构后返回。
- 禁止直接返回 `reactive` 对象。

```typescript
import { ref, toRefs } from 'vue';

/**
 * 表格数据管理
 * @description 封装表格数据获取、分页、加载状态等逻辑
 */
export const useTable = () => {
  const tableData = ref([]);
  const loading = ref(false);
  const pagination = ref({
    currentPage: 1, // 当前页码
    pageSize: 20,   // 每页条数
    total: 0,       // 总条数
  });

  const getListData = async () => {
    loading.value = true;
    try {
      const { code, data, msg } = await apiGetList({
        page: pagination.value.currentPage,
        size: pagination.value.pageSize,
      });
      if (code === 0) {
        tableData.value = data.list;
        pagination.value.total = data.total;
      } else {
        console.warn(msg);
      }
    } catch (err) {
      console.warn('getListData error:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    ...toRefs({ tableData, loading, pagination }),
    getListData,
  };
};
```

## 使用规范

- 组件中通过 `const { ... } = useXxx()` 解构使用。
- 禁止将 Hooks 挂载到响应式数据上（如 `const state = reactive(useXxx())`）。
- Hooks 内部使用 `ref`/`reactive` 管理状态。
- 生命周期钩子（如 `onMounted`）只能在组件顶层或 `setup` 中调用，禁止在 Hooks 内部直接调用。
- 可复用逻辑超过 30 行或跨 2 个以上组件使用时，必须抽离为 Hook。

## 导入顺序

Hooks 归类在导入分组中，位于工具类之后、Store 之前：

```typescript
// 1. 外部依赖
import { ref, computed, onMounted } from 'vue';

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
```

## 拆分建议

| 场景               | 处理方式        |
| ------------------ | --------------- |
| 表格数据 + 分页 + 加载 | `useTable`      |
| 搜索表单 + 重置 + 查询 | `useSearchForm` |
| 表单校验逻辑       | `useFormValidate` |
| 弹窗开关 + 状态    | `useDialog`     |
| 文件上传逻辑       | `useUpload`     |
| 权限判断           | `usePermission` |

## Hook 示例：useDialog

```typescript
import { ref, toRefs } from 'vue';

/**
 * 弹窗状态管理
 * @description 封装弹窗开关、标题、内容等逻辑
 */
export const useDialog = () => {
  const visible = ref(false);
  const title = ref('');
  const content = ref('');

  const openDialog = (dialogTitle = '', dialogContent = '') => {
    title.value = dialogTitle;
    content.value = dialogContent;
    visible.value = true;
  };

  const closeDialog = () => {
    visible.value = false;
  };

  return {
    ...toRefs({ visible, title, content }),
    openDialog,
    closeDialog,
  };
};
```
