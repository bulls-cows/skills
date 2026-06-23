# React Hooks 规范

> Hooks 通用规则（命名、文件组织、抽离建议、返回值、注释规范）详见 [common-hooks.md](./common-hooks.md)，本文件仅承载 React 特有内容。
>
> **优先级说明**：React Hooks 文件为 🔴 基础规范，是因为本文件包含"Hooks 调用规则"等违反即导致运行时崩溃的强制约束。

## 前置阅读

- [common-hooks.md](./common-hooks.md) — Hooks 通用规范

---

## 一、React 特有函数组件限制

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
}
```

---

## 三、React 特有内置 Hooks

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

## 四、React 特有 useCallback/useMemo

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

---

## 五、React 标准模板

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

## 六、相关模块引用

| 内容            | 详见                                     |
| --------------- | ---------------------------------------- |
| Hooks 通用规范  | [common-hooks.md](./common-hooks.md) |
| 状态管理        | [react-state.md](./react-state.md)                   |
| 组件开发        | [react-component-dev.md](./react-component-dev.md)   |
| TypeScript 类型 | [common-typescript.md](./common-typescript.md)       |
| 命名规范        | [common-naming.md](./common-naming.md)             |
