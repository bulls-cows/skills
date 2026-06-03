# React Hooks 规范

本规范涵盖 React Hooks 的命名、使用规则、常用 Hooks 用法、自定义 Hooks 及文件组织。

---

## 一、命名规则

- **必须**以 `use` 开头（如 `useTable`、`useForm`、`useSearchForm`）
- 文件名与函数名一致，存放在 `src/hooks/` 目录

| 类型         | 规范           | 示例                                        |
| ------------ | -------------- | ------------------------------------------- |
| 内置 Hooks   | React 提供     | `useState`, `useEffect`, `useCallback`      |
| 自定义 Hooks | `use` + 功能名 | `useTable`, `useSearchForm`, `useUserFetch` |

---

## 二、Hooks 调用规则

### 仅在顶层调用

- **禁止**在条件、循环或嵌套函数中调用 Hooks
- **必须**在 React 函数组件或自定义 Hook 的最顶层调用

```typescript
// ❌ 错误：在条件中调用 Hook
const UserList = () => {
  if (isAdmin) {
    const [users, setUsers] = useState([]) // 禁止
  }
  // ...
}

// ❌ 错误：在循环中调用 Hook
const UserList = () => {
  items.forEach(() => {
    const [count, setCount] = useState(0) // 禁止
  })
}

// ✅ 正确：在组件顶层调用
const UserList = () => {
  const [users, setUsers] = useState<IUserInfo[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  // ...
}
```

### 仅在 React 函数中调用

- 在函数组件中调用
- 在自定义 Hook 中调用
- **禁止**在普通函数中调用

```typescript
// ❌ 错误：在普通函数中调用
const fetchData = () => {
  const [data, setData] = useState([]) // 禁止
}

// ✅ 正确：在自定义 Hook 中调用
const useFetchData = () => {
  const [data, setData] = useState([])
  // ...
  return { data }
}
```

---

## 三、常用 Hooks 规范

### useState

- 优先使用单一状态变量，避免嵌套对象
- 状态更新使用 setter 函数

```typescript
// ✅ 正确：扁平状态
const [name, setName] = useState('')
const [age, setAge] = useState(0)

// ❌ 错误：嵌套对象状态
const [user, setUser] = useState({ name: '', age: 0, address: { city: '' } })
```

### useEffect

- **必须**提供清理函数（cleanup） when needed
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

// ✅ 正确：依赖完整
useEffect(() => {
  fetchUser(userId)
}, [userId]) // userId 变化时重新执行

// ❌ 错误：依赖缺失
useEffect(() => {
  fetchUser(userId)
}, []) // 缺少 userId 依赖
```

### useCallback / useMemo

- 用于性能优化，**不要**过早使用
- 当函数/值传递给子组件且子组件有 memo 优化时使用

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

### useRef

- 用于 DOM 引用和需要持久化的可变值
- 修改 `.current` 不会触发重新渲染

```typescript
// ✅ 正确：DOM 引用
const inputRef = useRef<HTMLInputElement>(null)

// ✅ 正确：持久化可变值（不触发渲染）
const timerRef = useRef<number | null>(null)

useEffect(() => {
  timerRef.current = window.setInterval(() => {
    // ...
  }, 1000)
  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }
}, [])
```

---

## 四、自定义 Hooks

### 抽离建议

- 可复用逻辑超过 **30 行** 或跨 **2 个以上** 组件使用时，必须抽离为自定义 Hook

| 场景                   | 处理方式          |
| ---------------------- | ----------------- |
| 表格数据 + 分页 + 加载 | `useTable`        |
| 搜索表单 + 重置 + 查询 | `useSearchForm`   |
| 表单校验逻辑           | `useFormValidate` |
| 弹窗开关 + 状态        | `useDialog`       |
| 文件上传逻辑           | `useUpload`       |
| 权限判断               | `usePermission`   |

### 自定义 Hook 命名

- 必须以 `use` 开头，后接功能描述（PascalCase）

```typescript
// ✅ 正确
const useTable = () => {
  /* ... */
}
const useSearchForm = () => {
  /* ... */
}
const useFormValidate = () => {
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

### 返回值规范

- 优先返回对象，便于扩展和解构

```typescript
// ✅ 正确：返回对象
export const useTable = () => {
  const [dataSource, setDataSource] = useState<IUserInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const fetchList = async () => {
    // ...
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

### 标准模板

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

---

## 五、文件组织

| 类型           | 位置         | 说明                   |
| -------------- | ------------ | ---------------------- |
| 全局共享 Hooks | `src/hooks/` | 跨多个组件使用的 Hooks |
| 组件专属 Hooks | 组件同级目录 | 仅当前组件使用的逻辑   |

```
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

## 六、Hook 内部注释规范

| 内容       | 注释格式                    | 示例                                   |
| ---------- | --------------------------- | -------------------------------------- |
| Hook 整体  | JSDoc + `@description`      | `/** 表格数据管理 @description ... */` |
| 内部 state | `// 属性名: 描述`           | `// dataSource: 表格数据列表`          |
| 内部方法   | JSDoc 或 `// methods: 描述` | `// methods: 获取表格数据`             |

---

## 七、相关模块引用

| 内容       | 详见                                   |
| ---------- | -------------------------------------- |
| 状态管理   | [state.md](./state.md)                 |
| 组件开发   | [component-dev.md](./component-dev.md) |
| TypeScript | [typescript.md](./typescript.md)       |
| 命名规范   | [../naming.md](../naming.md)           |
