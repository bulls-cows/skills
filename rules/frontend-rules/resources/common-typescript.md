# TypeScript 通用规范（Vue3/React 共享）

<!-- 锚点保护：章节标题不可重命名（外部引用：#二禁用-any、#六类型压制不推荐、#八组件-props-类型定义、#十事件与交互类型、#十二hooks-返回值类型） -->

## 一、类型注解要求

- **参数/返回值**：必须明确类型
- **变量**：初始值为空（`null`/`[]`/`undefined`）或字面量会被收窄（`false`/`0`）时必须显式标注；其余依赖推断

```typescript
const getUserName = (userId: string): string => {
  const defaultName = '匿名' // 推断为 string，无需标注
  return userId ? `user_${userId}` : defaultName
}

let currentUser: IUserInfo | null = null // 初始 null 必须显式联合
```

---

## 二、禁用 `any`

用 `unknown`（不确定类型）、`Record<string, unknown>`（动态键值对）、具体类型替代。

```typescript
const data: unknown = JSON.parse(raw) // ✅
const data: any = JSON.parse(raw) // ❌ 禁止

// unknown 消费前必须通过类型守卫收窄
const isUserInfo = (v: unknown): v is IUserInfo =>
  typeof v === 'object' && v !== null && 'id' in v && 'name' in v
if (isUserInfo(data)) console.log(data.name)

// catch 子句 err 默认为 unknown（TS 4.4+）
try {
  await fetchData()
} catch (err) {
  const message = err instanceof Error ? err.message : String(err)
}
```

---

## 三、类型命名规范

接口 `I` 前缀、类型别名 `T` 前缀，详见 [common-naming.md](./common-naming.md#类型命名代码示例)。

---

## 四、类型导入

`import type` 导入纯类型；值与类型同时导入时分两行（利于 Tree Shaking）。

```typescript
import type { IUserInfo } from '@src/types' // ✅
import { apiGetUser } from '@src/api/user'
import { IUserInfo, apiGetUser } from '@src/user' // ❌ 混合导入
```

---

## 五、类型文件组织

- **全局类型**：`src/types/`，在 `index.ts` 统一导出
- **组件私有类型**：组件同级 `types.ts` 或 SFC 内 `export type`/`export interface`

> `@src` 为路径别名，需在 `tsconfig.json` 的 `paths` 配置。

---

## 六、类型压制（不推荐）

**优先完善类型定义**；第三方库类型缺陷等过渡场景可用受控断言。

```typescript
// ✅ 优先：API 层声明准确返回类型，消费端自动推断
const apiGetUser = async (userId: string): Promise<{ data: IUserInfo }> => {
  /* ... */
}
const { data } = await apiGetUser('1')

// ✅ 过渡期：定义最小接口后断言（比 as any 安全）
const { data } = response as { data: IUserInfo }

// @ts-expect-error 仅在库类型缺陷时受控使用，必须注明原因
// @ts-expect-error 库 xxx@1.2.3 类型缺失 foo，详见 issue #123
```

---

## 七、工具类型与类型派生

| 工具类型       | 用途     | 示例                              |
| -------------- | -------- | --------------------------------- |
| `Pick<T, K>`   | 选取属性 | `Pick<IUserInfo, 'id' \| 'name'>` |
| `Omit<T, K>`   | 排除属性 | `Omit<IUserInfo, 'address'>`      |
| `Partial<T>`   | 全部可选 | `Partial<IUserInfo>`              |
| `Required<T>`  | 全部必选 | `Required<IUserInfo>`             |
| `Readonly<T>`  | 全部只读 | `Readonly<IUserInfo>`             |
| `Record<K, V>` | 键值对   | `Record<string, IUserInfo>`       |

```typescript
// ❌ 错误：interface IUserBrief { id: string; name: string } 重复定义
type TUserBrief = Pick<IUserInfo, 'id' | 'name'> // ✅ 派生
```

### `satisfies`（TS 4.9+）

校验类型同时保留字面量推断：

```typescript
const routeConfig = { home: { path: '/', auth: false } } satisfies Record<
  string,
  { path: string; auth: boolean }
>
routeConfig.home.path // 类型: '/'（字面量保留）
```

### `as const`（优先于 `enum`）

更好的 tree-shaking、更精确的推断：

```typescript
const STATUS = ['pending', 'success', 'error'] as const
type TStatus = (typeof STATUS)[number] // 'pending' | 'success' | 'error'
```

---

## 八、组件 Props 类型定义

### React Props

**必须**用 `interface` + `I` 前缀；`type` 别名仅用于联合/交叉派生。

```typescript
// ✅
interface IUserCardProps {
  userId: string
  isActive?: boolean
  onSelect?: (userId: string) => void
}
type TUserCardProps = IUserCardProps & { extra?: string } // ✅ 派生

// ❌ 基础 Props 不应用 type 别名：type TUserCardProps = { userId: string }
```

### Vue3 Props

**必须**用 `defineProps<T>()` 泛型；运行时对象形式仅在需要 `validator`/`default` 工厂函数时使用。

```typescript
// ✅ 推荐
const props = defineProps<{ userId: string | number; isLoading?: boolean }>()

// 可选 Props 用 withDefaults 设默认值
const props = withDefaults(defineProps<{ title?: string; size?: 'small' | 'medium' | 'large' }>(), {
  title: '默认标题',
  size: 'medium',
})
```

v-model 兼容模式详见 [vue3-interaction.md](./vue3-interaction.md#2-v-model-写法)。

### Vue3 `defineExpose` / `provide` / `inject`

```typescript
// defineExpose 类型化
interface IUserTableExpose {
  refresh: () => Promise<void>
  getSelected: () => IUserInfo[]
}
defineExpose<IUserTableExpose>({ refresh, getSelected })

// provide/inject 必须用 InjectionKey<T> 携带类型，禁止字符串 key
import type { InjectionKey, Ref } from 'vue'
export const USER_INFO_KEY: InjectionKey<Ref<IUserInfo | null>> = Symbol('userInfo')
// Provider: provide(USER_INFO_KEY, userInfo)
// Consumer: const userInfo = inject(USER_INFO_KEY) // Ref<IUserInfo | null> | undefined
```

---

## 九、响应式状态类型

```typescript
// React useState
const [isLoading, setIsLoading] = useState<boolean>(false) // 避免 false 字面量收窄
const [userList, setUserList] = useState<IUserInfo[]>([]) // 空数组需元素类型
const [selected, setSelected] = useState<IUserInfo | null>(null) // 初始 null 需联合
const [userName, setUserName] = useState('') // 可推断，无需泛型

// React useRef
const inputRef = useRef<HTMLInputElement>(null) // DOM 引用
const timerRef = useRef<number | null>(null) // 可变值引用

// Vue3 ref
const userName = ref<string>('')
const isLoading = ref<boolean>(false) // 避免 ref(false) 推断为 Ref<false>
const userList = ref<IUserInfo[]>([])
const count = ref(0) // 可推断，Ref<number>
const formRef = ref<HTMLFormElement | null>(null) // 模板 ref
```

**`useState()`/`ref()` 无初始值未标注**：推断为 `undefined`，setter 无法使用，必须显式标注或提供初始值。

### Vue3 reactive

```typescript
interface IUserState {
  name: string
  age: number
  roles: string[]
}
const state = reactive<IUserState>({ name: '', age: 0, roles: [] })
```

> **⚠️ ref 解包陷阱**：显式 `reactive<T>()` 会禁用 ref 自动 unwrap 推断。若 state 内需嵌套 ref，`T` 内字段必须显式声明为 `Ref<X>`，或省略泛型依赖类型推断。

### Vue3 computed

```typescript
// 简单场景依赖推断
const isDisabled = computed(() => props.disabled || isLoading.value)
// 复杂转换显式标注返回类型
const items = computed<IListItem[]>(() => rawData.value.map((i) => ({ id: i.id, label: i.name })))
```

---

## 十、事件与交互类型

### React 事件处理

使用 React 泛型事件类型：

```typescript
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
const onClick = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()
const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') handleSubmit()
}
const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault()
```

### Vue3 Emits

**必须**用 TypeScript 泛型定义；运行时数组形式无类型推断。

```typescript
// ✅
const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [id: number, action: string]
  confirm: []
}>()
```

---

## 十一、组件渲染与泛型（React）

### Children 与返回类型

```typescript
interface ICardProps { title: string; children: React.ReactNode }

// ✅ 推荐：依赖 TS 自动推断返回类型
const Card = ({ title, children }: ICardProps) => <div>{title}{children}</div>

// ✅ 显式标注需用 React.JSX.Element（React 19+ 已移除全局 JSX 命名空间）
const UserCard = ({ userId }: IUserCardProps): React.JSX.Element => <div>{userId}</div>

// ❌ 不推荐：React.FC（无法返回 string/number、不支持泛型组件、官方已不推荐）
// ❌ 错误（React 19+）：JSX.Element 已不可用
```

### 泛型组件

`<T,>` 语法（末尾逗号避免 JSX 解析歧义）：

```typescript
interface IListItem { id: string | number }
interface IListProps<T extends IListItem> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
}
const List = <T extends IListItem>({ items, renderItem }: IListProps<T>) => (
  <ul>{items.map((item, i) => <li key={item.id}>{renderItem(item, i)}</li>)}</ul>
)
```

> Vue3 用 `<script setup lang="ts" generic="T">` 定义泛型组件，详见 [vue3-component-dev.md](./vue3-component-dev.md)。

---

## 十二、Hooks 返回值类型

**必须**为返回值声明类型接口：

```typescript
// Vue3
import { ref, type Ref } from 'vue'
interface IUseTableReturn {
  dataSource: Ref<IUserInfo[]>
  loading: Ref<boolean>
  fetchList: () => Promise<void>
}
export const useTable = (): IUseTableReturn => {
  const dataSource = ref<IUserInfo[]>([])
  const loading = ref<boolean>(false)
  const fetchList = async (): Promise<void> => {
    /* ... */
  }
  return { dataSource, loading, fetchList }
}

// React
interface IUseFetchReturn<T> {
  data: T | null
  loading: boolean
  refetch: () => Promise<void>
}
export const useFetch = <T>(url: string): IUseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const refetch = async (): Promise<void> => {
    /* ... */
  }
  return { data, loading, refetch }
}
```

---

## 十三、相关模块引用

**框架特定类型细节**：[react-component-dev](./react-component-dev.md) · [vue3-component-dev](./vue3-component-dev.md) · [react-interaction](./react-interaction.md) · [vue3-interaction](./vue3-interaction.md) · [common-hooks](./common-hooks.md) · [react-state](./react-state.md) · [vue3-reactivity](./vue3-reactivity.md)

**通用相关规范**：[common-naming](./common-naming.md) · [react-jsx](./react-jsx.md)
