---
title: Vue3组合式函数（Hooks）规范
version: 2.0.0
lastUpdated: 2026-06-03
priority: 🟠 强烈推荐（必须遵循）
maintainer: bulls-cows team
---

# 💚 Vue3 组合式函数（Hooks）规范

本规范是Vue3组合式API开发的核心规范，涵盖 Hooks 的命名、文件组织、返回值、使用方式及抽离建议，所有Vue3项目必须严格遵守。

---

## 一、命名与文件组织

- 必须以 `use` 开头（如 `useTable`、`useSearchForm`、`usePagination`）。
- 文件名与函数名一致，存放在 `src/hooks/` 目录（全局放在 `@src/hooks/`，局部放在组件同级目录）。

---

## 二、返回值规范

- 统一返回对象（推荐 `toRefs` 解构后返回）
- 禁止直接返回 `reactive` 对象。
- 禁止将 Hooks 挂载到响应式数据上（如 `const state = reactive(useXxx())`）。

### 标准模板

#### 未安装 `useRequest` 时（手动管理状态）

```typescript
import { ref, toRefs } from 'vue'

/**
 * 表格数据管理
 * @description 封装表格数据获取、分页、加载状态等逻辑
 */
export const useTable = () => {
  // 分页请求参数（组合使用）
  const pagination = ref({ page: 1, limit: 20 })
  // 加载状态
  const loading = ref(false)
  // 表格数据源
  const dataSource = ref<any[]>([])
  // 总条数（响应数据，独立管理）
  const total = ref(0)

  const getDataSourceTotal = async () => {
    loading.value = true
    try {
      const { code, data, msg } = await apiGetList({
        page: pagination.value.page,
        limit: pagination.value.limit,
      })
      if (code === 0) {
        dataSource.value = data.list
        total.value = data.total
      } else {
        console.warn(msg)
      }
    } catch (error) {
      console.warn('getDataSourceTotal error:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    dataSource,
    total,
    pagination,
    getDataSourceTotal,
  }
}
```

#### 已安装 `useRequest` 时（自动管理状态）

```typescript
import { useRequest } from 'ahooks-vue' // 或 'vue-hooks-plus'
import { ref } from 'vue'

/**
 * 表格数据管理
 * @description 封装表格数据获取、分页、加载状态等逻辑
 */
export const useTable = () => {
  // 分页请求参数（组合使用）
  const pagination = ref({ page: 1, limit: 20 })
  // 加载状态（useRequest 自动管理）
  // 表格数据源
  const dataSource = ref<any[]>([])
  // 总条数（响应数据，独立管理）
  const total = ref(0)

  // 分页查询成功回调
  const onGetListSuccess = ({ code, data, msg }: IApiResponse) => {
    if (code === 0) {
      dataSource.value = data.list ?? []
      total.value = data.total
    } else {
      console.warn(msg)
    }
  }

  const { loading, run: getDataSourceTotal } = useRequest(
    (params) => apiGetList(Object.assign({}, pagination.value, params)),
    {
      manual: true,
      onSuccess: onGetListSuccess,
      onError: (error) => {
        console.warn('getDataSourceTotal error:', error)
      },
    },
  )

  return {
    loading,
    dataSource,
    total,
    pagination,
    getDataSourceTotal,
  }
}
```

---

## 三、使用规范

- 组件中通过 `const { ... } = useXxx()` 解构使用。
- Hooks 内部使用 `ref`/`reactive` 管理状态
- 生命周期钩子（如 `onMounted`）只能在组件顶层或 `setup` 中调用
- **禁止**在 Hooks 内部直接调用生命周期钩子（除非 Hooks 本身在组件顶层执行）。
- 组件引入后按 **注释规范**（详见 [comments.md](./comments.md)）标注：`// hook: Hook名`。
- 导入顺序详见 [order.md](./order.md#三import-分组排序4-组)。

---

## 四、抽离建议

可复用逻辑超过 30 行或跨 2 个以上组件使用时，必须抽离为 Hook。

| 场景                   | 处理方式          |
| ---------------------- | ----------------- |
| 表格数据 + 分页 + 加载 | `useTable`        |
| 搜索表单 + 重置 + 查询 | `useSearchForm`   |
| 表单校验逻辑           | `useFormValidate` |
| 弹窗开关 + 状态        | `useDialog`       |
| 文件上传逻辑           | `useUpload`       |
| 权限判断               | `usePermission`   |

---

## 五、Hook 内部注释规范

| 内容      | 注释格式                    | 示例                                   |
| --------- | --------------------------- | -------------------------------------- |
| Hook 整体 | JSDoc + `@description`      | `/** 表格数据管理 @description ... */` |
| 内部 ref  | `// 属性名: 描述`           | `// dataSource: 表格数据列表`          |
| 内部方法  | JSDoc 或 `// methods: 描述` | `// methods: 获取表格数据`             |

---
