# Hooks 规范（Vue3 / React 通用）

> 本规范涵盖 Vue3 组合式函数与 React Hooks 的共享约定与框架差异。命名、文件组织、抽离、返回值、注释等通用约定在本文件统一说明，框架特有内容用子小节区分。
>
> **优先级说明**：本文件含"Hooks 调用规则"等违反即导致运行时崩溃的强制约束，**第六章属于基础规范（强制）**；其他章节为强烈推荐 / 风格指南。

---

## 一、命名规则

- **必须**以 `use` 开头（如 `useTable`、`useForm`、`useSearchForm`）
- 后接功能描述，使用 camelCase 命名风格
- 文件名与函数名一致

```typescript
// ✅ 正确
const useTable = () => {
  /* ... */
}
const useSearchForm = () => {
  /* ... */
}

// ❌ 错误
const tableHook = () => {
  /* ... */
}
const use_table = () => {
  /* ... */
}
```

- 内置 Hooks：框架提供（如 `useState`、`useEffect`、`useRef`）
- 自定义 Hooks：`use` + 功能名（如 `useTable`、`useSearchForm`、`useUserFetch`）

---

## 二、文件组织

- 全局共享 Hooks：`src/hooks/`，跨多个组件使用
- 组件专属 Hooks：组件同级目录，仅当前组件使用

```text
src/
├── hooks/
│   ├── useTable.ts        # 全局共享
│   ├── useSearchForm.ts
│   └── usePermission.ts
└── components/
    └── UserList/
        ├── index.tsx
        └── useUserList.ts  # 组件专属
```

---

## 三、抽离建议

可复用逻辑超过 **30 行** 或跨 **2 个以上** 组件使用时，必须抽离为自定义 Hook。

- 表格数据 + 分页 + 加载 → `useTable`
- 搜索表单 + 重置 + 查询 → `useSearchForm`
- 表单校验逻辑 → `useFormValidate`
- 弹窗开关 + 状态 → `useDialog`
- 文件上传逻辑 → `useUpload`
- 权限判断 → `usePermission`

---

## 四、返回值规范

- 优先返回对象，便于扩展和解构
- **禁止**直接返回需要保持响应式的内部状态对象（如 Vue3 的 `reactive`，必须用 `toRefs` 解构；详见 [七、返回对象响应式要求](#七返回对象响应式要求)）

```typescript
// ✅ 正确：返回对象
export const useTable = () => {
  const [dataSource, setDataSource] = useState<IUserInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const fetchList = async () => {
    /* ... */
  }

  return {
    dataSource,
    loading,
    total,
    fetchList,
  }
}

// 使用方式
const { dataSource, loading, total, fetchList } = useTable()
```

---

## 五、Hook 内部注释规范

- Hook 整体：JSDoc + `@description`（如 `/** 表格数据管理 @description ... */`）
- 内部 state：`// 属性名: 描述`（如 `// dataSource: 表格数据列表`）
- 内部方法：JSDoc 或 `// methods: 描述`（如 `// methods: 获取表格数据`）

---

## 六、Hooks 调用规则

> 违反本章规则将导致 Hooks 状态错乱或运行时错误，强制执行。

### 6.1 React 特有函数组件限制

- 仅在 React **函数组件**或**自定义 Hook** 中调用 Hooks
- **禁止**在普通函数中调用 Hooks

```typescript
// ❌ 错误：在普通函数中调用
const fetchData = () => {
  const [data, setData] = useState([]) // 禁止
}

// ✅ 正确：在自定义 Hook 中调用
const useFetchData = () => {
  const [data, setData] = useState([])
  return { data }
}
```

### 6.2 通用-仅在顶层调用

- **禁止**在条件、循环或嵌套函数中调用 Hooks
- **必须**在组件顶层或自定义 Hook 的最顶层调用

```typescript
// ❌ 错误：在条件中调用 Hook
const UserList = () => {
  if (isAdmin) {
    const [users, setUsers] = useState([]) // 禁止
  }
}

// ✅ 正确：在组件顶层调用
const UserList = () => {
  const [users, setUsers] = useState<IUserInfo[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
}
```

### 6.3 Vue3 特有 setup 限制

- Hooks 内部使用的生命周期钩子（如 `onMounted`）只能在组件顶层或 `<script setup>` 顶层执行
- **禁止**在 Hooks 内部直接调用生命周期钩子（除非 Hooks 本身在组件顶层执行）
- **禁止**在 `<script setup>` 中使用 `this`

---

## 七、返回对象响应式要求

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

## 八、内置 Hooks 速查

### 8.1 React 特有内置 Hooks

#### useState

- 优先使用单一状态变量，避免嵌套对象
- 状态更新使用 setter 函数

```typescript
// ✅ 正确：扁平状态
const [name, setName] = useState('')
const [age, setAge] = useState(0)

// ❌ 错误：嵌套对象状态
const [user, setUser] = useState({ name: '', age: 0, address: { city: '' } })
```

#### useEffect

- **必须**在涉及副作用资源（定时器、订阅、事件监听等）时提供清理函数（cleanup）
- 依赖数组 **必须**完整，包含所有外部依赖

```typescript
// ✅ 正确：依赖完整，含清理函数
useEffect(() => {
  const timer = setInterval(() => {
    setCount((prev) => prev + 1)
  }, 1000)
  // cleanup: 清除定时器
  return () => {
    clearInterval(timer)
  }
}, []) // 空数组：仅在挂载/卸载时执行

// ❌ 错误：依赖缺失
useEffect(() => {
  fetchUser(userId)
}, []) // 缺少 userId 依赖
```

#### useRef

- 用于 DOM 引用和需要持久化的可变值
- 修改 `.current` 不会触发重新渲染

```typescript
const inputRef = useRef<HTMLInputElement>(null) // DOM 引用
const timerRef = useRef<number | null>(null) // 持久化可变值（修改不触发渲染）
```

### 8.2 Vue3 特有内置 Hooks

Vue3 的内置 Hooks（组合式 API）包括：

- 响应式：`ref`、`reactive`、`computed`、`toRef`、`toRefs`
- 工具：`unref`、`isRef`、`isReactive`
- 副作用：`watch`、`watchEffect`、`watchPostEffect`
- 生命周期：`onBeforeMount`、`onMounted`、`onBeforeUpdate`、`onUpdated`、`onBeforeUnmount`、`onUnmounted`
- 依赖注入：`provide`、`inject`
- 模板引用：`useTemplateRef`（Vue 3.5+）

---

## 九、性能优化 Hooks

仅 React 适用。用于性能优化，**不要**过早使用；当函数/值传递给子组件且子组件有 memo 优化时使用。

```typescript
// ✅ 正确：传递给 memo 子组件的回调使用 useCallback
const handleSubmit = useCallback((values: IFormValues) => {
  apiSubmit(values)
}, [])

// ✅ 正确：计算量大的派生值使用 useMemo
const filteredList = useMemo(() => {
  return dataList.filter((item) => item.status === 'active')
}, [dataList])

// ❌ 错误：过早优化
const handleClick = useCallback(() => {
  console.log('click')
}, []) // 无意义，直接内联即可
```

---

## 十、标准模板

### 10.1 React 标准模板

```typescript
import { useState, useCallback } from 'react'

/**
 * 表格数据管理
 * @description 封装表格数据获取、分页、加载状态等逻辑
 */
export const useTable = () => {
  // dataSource: 表格数据列表
  const [dataSource, setDataSource] = useState<IUserInfo[]>([])
  // loading: 加载状态
  const [loading, setLoading] = useState(false)
  // total: 总条数
  const [total, setTotal] = useState(0)
  // pagination: 分页参数
  const [pagination, setPagination] = useState({ page: 1, limit: 20 })

  // methods: 获取表格数据
  const fetchList = useCallback(async () => {
    setLoading(true)
    try {
      const { code, data } = await apiGetList(pagination)
      if (code === 0) {
        setDataSource(data.list ?? [])
        setTotal(data.total ?? 0)
      }
    } catch (error) {
      console.warn('获取表格数据失败:', error)
    } finally {
      setLoading(false)
    }
  }, [pagination])

  return {
    dataSource,
    loading,
    total,
    pagination,
    fetchList,
  }
}
```

### 10.2 Vue3 标准模板-手动管理状态

```typescript
import { ref } from 'vue'

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

### 10.3 Vue3 标准模板-配合 useRequest

在 10.2 基础上，将手写的 `getDataSourceTotal` 替换为 useRequest，由其托管 `loading` 与回调：

```typescript
import { useRequest } from 'ahooks-vue' // 或 'vue-hooks-plus'

export const useTable = () => {
  const pagination = ref({ page: 1, limit: 20 })
  const dataSource = ref<IUserInfo[]>([])
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
      onError: (error) => console.warn('getDataSourceTotal error:', error),
    },
  )

  return { loading, dataSource, total, pagination, getDataSourceTotal }
}
```

### 10.4 Vue3 特有使用规范

- 组件中通过 `const { ... } = useXxx()` 解构使用
- 组件引入后按注释规范标注：`// hook: Hook名`（详见 [common-comments.md](./common-comments.md)）
- 导入顺序详见 [vue3-order.md](./vue3-order.md#三import-分组)

---

## 十一、相关模块引用

- 状态管理（React）：[react-state.md](./react-state.md)
- 组件开发（React）：[react-component-dev.md](./react-component-dev.md)
- 响应式状态（Vue3）：[vue3-reactivity.md](./vue3-reactivity.md)
- watch 监听（Vue3）：[vue3-watch.md](./vue3-watch.md)
- 组件开发（Vue3）：[vue3-component-dev.md](./vue3-component-dev.md)
- 组件交互（React）：[react-interaction.md](./react-interaction.md)
- JSX 规范（React）：[react-jsx.md](./react-jsx.md)
- TypeScript 类型：[common-typescript.md](./common-typescript.md)
- 命名规范：[common-naming.md](./common-naming.md)
- 注释规范：[common-comments.md](./common-comments.md)
- 导入顺序（Vue3）：[vue3-order.md](./vue3-order.md)
