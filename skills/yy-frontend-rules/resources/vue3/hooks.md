# Vue3 组合式函数（Hooks）规范

> Hooks 通用规则（命名、文件组织、抽离建议、返回值、注释规范）详见 [hooks.md](../common/hooks.md)，本文件仅承载 Vue3 特有内容。

## 前置阅读

- [hooks.md](../common/hooks.md) — Hooks 通用规范

---

## 一、Vue3 特有 setup 限制

- Hooks 内部使用的生命周期钩子（如 `onMounted`）只能在组件顶层或 `<script setup>` 顶层执行
- **禁止**在 Hooks 内部直接调用生命周期钩子（除非 Hooks 本身在组件顶层执行）
- **禁止**在 `<script setup>` 中使用 `this`

---

## 二、Vue3 特有 toRefs 要求

**禁止直接返回 reactive 对象**，必须使用 `toRefs` 解构后返回：

```typescript
// ❌ 错误：直接返回 reactive
export const useForm = () => {
  const form = reactive({ name: '', age: 0 })
  return { form } // 禁止
}

// ✅ 正确：使用 ref 独立声明（推荐）
export const useForm = () => {
  const name = ref('')
  const age = ref(0)
  return { name, age }
}

// ✅ 正确：如果必须用 reactive，使用 toRefs
export const useForm = () => {
  const form = reactive({ name: '', age: 0 })
  return toRefs(form) // 允许
}
```

**禁止**将 Hooks 挂载到响应式数据上（如 `const state = reactive(useXxx())`）。

---

## 三、Vue3 特有内置 Hooks

Vue3 的内置 Hooks（组合式 API）包括：

| 类别     | 示例                                                                                          |
| -------- | --------------------------------------------------------------------------------------------- |
| 响应式   | `ref`, `reactive`, `computed`, `toRef`, `toRefs`                                              |
| 工具     | `unref`, `isRef`, `isReactive`                                                                |
| 副作用   | `watch`, `watchEffect`, `watchPostEffect`                                                     |
| 生命周期 | `onBeforeMount`, `onMounted`, `onBeforeUpdate`, `onUpdated`, `onBeforeUnmount`, `onUnmounted` |
| 依赖注入 | `provide`, `inject`                                                                           |
| 模板引用 | `useTemplateRef`（Vue 3.5+）                                                                  |

---

## 四、Vue3 标准模板（手动管理状态）

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
  const dataSource = ref<IUserInfo[]>([])
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

---

## 五、Vue3 标准模板（配合 useRequest）

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
  const dataSource = ref<IUserInfo[]>([])
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

## 六、Vue3 特有使用规范

- 组件中通过 `const { ... } = useXxx()` 解构使用
- 组件引入后按注释规范标注：`// hook: Hook名`（详见 [comments.md](../common/comments.md)）
- 导入顺序详见 [order.md](./order.md#三import-分组排序4-组)

---

## 七、相关模块引用

| 内容            | 详见                                                |
| --------------- | --------------------------------------------------- |
| Hooks 通用规范  | [hooks.md](../common/hooks.md)            |
| 响应式状态      | [reactivity.md](./reactivity.md)                    |
| watch 监听      | [watch.md](./watch.md)                              |
| TypeScript 类型 | [typescript.md](./typescript.md#四hooks-返回值类型) |
| 导入顺序        | [order.md](./order.md)                              |
