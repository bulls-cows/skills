---
title: Vue3 TypeScript规范
version: 2.0.0
lastUpdated: 2026-06-03
priority: 🟠 强烈推荐（必须遵循）
maintainer: bulls-cows team
---

# 💚 Vue3 TypeScript 规范

本规范定义TypeScript在Vue3项目中的类型使用约定，是Vue3 + TS项目必须严格遵守，从类型安全的核心保障。

---

## 一、类型注解要求

- **参数**：函数参数必须明确类型
- **返回值**：函数返回值必须明确类型
- **变量**：变量声明必须明确类型
- **模板 `ref`**：组件模板引用必须指定元素类型，如 `const formRef = ref<HTMLFormElement | null>(null)`

## 二、禁止使用 `any`

**禁止**使用 `any` 类型，应使用以下替代：

- `unknown`：用于类型不确定的场景
- `Record<string, unknown>`：用于动态键值对对象
- 具体类型/接口：定义准确的数据结构

```typescript
// ✅ 正确
const data: unknown = JSON.parse(raw)
const userInfo: IUserInfo = { id: '1', name: 'test' }

// ❌ 错误
const data: any = JSON.parse(raw) // 禁止
```

---

## 三、组件 Props 类型定义

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

详见 [interaction.md](./interaction.md#12-v-model-写法)（Vue 3 标准 `modelValue` + Ant Design Vue 风格 `value` 双模式）。

---

## 四、响应式类型标注

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

## 五、Emits 类型定义

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

## 六、Hooks 返回值类型

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

## 七、`.d.ts` 类型文件组织

- **全局类型**：放在 `src/types/` 目录下（如 `src/types/user.d.ts`）
- **组件私有类型**：放在组件同级目录或 SFC 内 `export type`
- **全局注入**：在 `src/types/index.d.ts` 中统一导出，便于项目全局引用
- **命名规范**：类型别名和接口以 `I` 前缀 + PascalCase（详见 [naming.md](./naming.md)）

---

## 八、类型导入

使用 `import type` 导入纯类型，减少运行时依赖：

```typescript
import type { User, dataSource } from '@src/types'
import { ref, computed } from 'vue'
```

**规则**：

- 仅用于类型导入时使用 `import type`
- 值和类型同时导入时分开写（`import type` 和 `import` 分两行）

---

## 九、类型压制（不推荐）

**不推荐**使用 `as any`、`@ts-ignore`、`@ts-expect-error` 等类型压制操作。应优先通过完善类型定义解决类型问题，仅在特殊场景（如第三方库类型缺失、历史代码迁移过渡期）中使用。
