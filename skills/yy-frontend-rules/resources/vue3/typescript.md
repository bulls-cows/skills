# Vue3 TypeScript 规范

> TypeScript 通用规则（类型注解、禁用 any、类型命名、import type、类型文件组织、类型压制）详见 [typescript.md](../common/typescript.md)，本文件仅承载 Vue3 特有内容。

## 前置阅读

- [typescript.md](../common/typescript.md) — TypeScript 通用规范

---

## 一、组件 Props 类型定义

### `defineProps<T>()` 泛型定义

**必须**使用 TypeScript 泛型定义 Props，而非运行时对象形式：

```typescript
// ✅ 正确：泛型定义
const props = defineProps<{
  userId: string | number // userId: 用户ID
  isLoading?: boolean // isLoading: 加载状态，默认 false
  maxItems?: number // maxItems: 最大条目数，默认 10
}>()

// ❌ 错误：运行时对象形式（不推荐）
const props = defineProps({
  userId: { type: [String, Number], required: true },
})
```

### `withDefaults()` 设置默认值

**必须**使用 `withDefaults()` 为可选 Props 设置默认值：

```typescript
// ✅ 正确
const props = withDefaults(
  defineProps<{
    title?: string
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
  }>(),
  {
    title: '默认标题',
    size: 'medium',
    disabled: false,
  },
)
```

### v-model 兼容模式

详见 [interaction.md](./interaction.md#2-v-model-写法)（Vue 3 标准 `modelValue` + Ant Design Vue 风格 `value` 双模式）。

---

## 二、响应式类型标注

### `ref<T>()` 类型标注

```typescript
// ✅ 正确：显式标注类型
const userName = ref<string>('')
const userList = ref<IUserInfo[]>([])
const isLoading = ref<boolean>(false)
const selectedUser = ref<IUserInfo | null>(null)

// 可选：类型推断（当初始值已明确时）
const count = ref(0) // 推断为 Ref<number>

// ❌ 不推荐：无初始值时未标注类型
const data = ref() // 推断为 Ref<undefined>，应明确类型
```

**模板 `ref`**：组件模板引用必须指定元素类型：

```typescript
const formRef = ref<HTMLFormElement | null>(null)
```

### `reactive<T>()` 类型标注

```typescript
// ✅ 正确：显式标注类型
const state = reactive<{
  name: string
  age: number
  roles: string[]
}>({
  name: '',
  age: 0,
  roles: [],
})
```

### `computed<T>()` 类型标注

```typescript
// ✅ 正确：类型推断自动推导
const isDisabled = computed(() => props.disabled || isLoading.value)

// ✅ 正确：需要显式标注复杂类型时
const items = computed<IListItem[]>(() => {
  return rawData.value.map((item) => ({
    id: item.id,
    label: item.name,
  }))
})
```

---

## 三、Emits 类型定义

**必须**使用 TypeScript 泛型定义 emits：

```typescript
// ✅ 正确：泛型定义
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:value': [value: string]
  change: [id: number, action: string]
  confirm: []
}>()

// ❌ 错误：运行时对象形式
const emit = defineEmits(['update:modelValue', 'change', 'confirm'])
```

---

## 四、Hooks 返回值类型

**必须**为 Hooks 返回值声明类型接口：

```typescript
// ✅ 正确：声明返回值类型
interface IUseTableReturn {
  dataSource: Ref<IUserInfo[]>
  loading: Ref<boolean>
  fetchList: () => Promise<void>
}

export const useTable = (): IUseTableReturn => {
  const dataSource = ref<IUserInfo[]>([])
  const loading = ref(false)

  const fetchList = async () => {
    /* ... */
  }

  return { dataSource, loading, fetchList }
}
```

---

## 五、相关模块引用

| 内容                | 详见                                               |
| ------------------- | -------------------------------------------------- |
| TypeScript 通用规范 | [typescript.md](../common/typescript.md) |
| Props 与 v-model    | [interaction.md](./interaction.md)                 |
| 响应式状态          | [reactivity.md](./reactivity.md)                   |
| Hooks 规范          | [hooks.md](./hooks.md)                             |
| 命名规范            | [naming.md](../common/naming.md)                       |
