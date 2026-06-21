
# Hooks 通用规范（Vue3/React 共享）

> 本规范涵盖 Vue3 组合式函数与 React Hooks 的共享约定。Hooks 调用规则、内置 Hooks 用法等框架特定差异详见各自框架文档。

## 一、命名规则

- **必须**以 `use` 开头（如 `useTable`、`useForm`、`useSearchForm`）
- 后接功能描述，使用 PascalCase 命名风格
- 文件名与函数名一致

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

| 类型         | 规范           | 示例                                        |
| ------------ | -------------- | ------------------------------------------- |
| 内置 Hooks   | 框架提供       | `useState`, `useEffect`, `useRef`           |
| 自定义 Hooks | `use` + 功能名 | `useTable`, `useSearchForm`, `useUserFetch` |

---

## 二、文件组织

| 类型           | 位置         | 说明                   |
| -------------- | ------------ | ---------------------- |
| 全局共享 Hooks | `src/hooks/` | 跨多个组件使用的 Hooks |
| 组件专属 Hooks | 组件同级目录 | 仅当前组件使用的逻辑   |

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

| 场景                   | 处理方式          |
| ---------------------- | ----------------- |
| 表格数据 + 分页 + 加载 | `useTable`        |
| 搜索表单 + 重置 + 查询 | `useSearchForm`   |
| 表单校验逻辑           | `useFormValidate` |
| 弹窗开关 + 状态        | `useDialog`       |
| 文件上传逻辑           | `useUpload`       |
| 权限判断               | `usePermission`   |

---

## 四、返回值规范

- 优先返回对象，便于扩展和解构
- **禁止**直接返回需要保持响应式的内部状态对象（如 Vue3 的 `reactive`，必须用 `toRefs` 解构）

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

| 内容       | 注释格式                    | 示例                                   |
| ---------- | --------------------------- | -------------------------------------- |
| Hook 整体  | JSDoc + `@description`      | `/** 表格数据管理 @description ... */` |
| 内部 state | `// 属性名: 描述`           | `// dataSource: 表格数据列表`          |
| 内部方法   | JSDoc 或 `// methods: 描述` | `// methods: 获取表格数据`             |

---

## 六、框架特定差异

| 内容                 | Vue3 详见                                                | React 详见                                                         |
| -------------------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| Hooks 调用规则       | [vue3/overview.md](../vue3/overview.md)（setup 顶层约束） | [react/hooks.md](../react/hooks.md#二hooks-调用规则)                |
| 内置 Hooks 用法      | [vue3/hooks.md](../vue3/hooks.md#三vue3-特有内置-hooks)   | [react/hooks.md](../react/hooks.md#三react-特有内置-hooks)          |
| setup / 函数组件限制 | [vue3/hooks.md](../vue3/hooks.md#一vue3-特有-setup-限制)  | [react/hooks.md](../react/hooks.md#一react-特有函数组件限制)        |
| toRefs / 解构要求    | [vue3/hooks.md](../vue3/hooks.md#二vue3-特有-torefs-要求) | 不适用                                                             |
| useCallback/useMemo  | 不适用                                                   | [react/hooks.md](../react/hooks.md#四react-特有-usecallbackusememo) |
