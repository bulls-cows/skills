# 代码风格与格式化规范

> 本规范统一前端代码外观风格，减少 diff 冲突，提升代码可读性。所有格式化规则由 Prettier 统一接管，禁止手动调整格式。

## 一、Prettier 配置规则

必须遵循 `.prettierrc.json` 的完整配置：

```json
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 120,
  "singleQuote": true,
  "endOfLine": "auto",
  "proseWrap": "never",
  "trailingComma": "all",
  "arrowParens": "avoid",
  "jsxSingleQuote": true,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "quoteProps": "as-needed",
  "singleAttributePerLine": false,
  "htmlWhitespaceSensitivity": "strict"
}
```

### 关键规则说明

| 规则         | 配置值                                | 说明                    |
| ------------ | ------------------------------------- | ----------------------- |
| 缩进         | `tabWidth: 2`                         | 2 空格缩进              |
| 引号         | `singleQuote: true`                   | JS/TS 使用单引号        |
| JSX 引号     | `jsxSingleQuote: true`                | JSX 属性单引号          |
| 分号         | `semi: true`                          | 语句末尾必须有分号      |
| 行宽         | `printWidth: 120`                     | 每行最大 120 字符       |
| 尾随逗号     | `trailingComma: "all"`                | 多行对象/数组末尾加逗号 |
| 箭头函数     | `arrowParens: "avoid"`                | 单参数省略括号          |
| 对象括号     | `bracketSpacing: true`                | `{ foo: bar }` 保留空格 |
| 换行符       | `endOfLine: "auto"`                   | 自动检测                |
| 属性换行     | `singleAttributePerLine: false`       | 不强制单行单属性        |
| HTML 空白    | `htmlWhitespaceSensitivity: "strict"` | 严格处理                |
| 属性引号类型 | `quoteProps: "as-needed"`             | 仅需要时加引号          |
| 括号同行     | `bracketSameLine: false`              | 括号不和内容同行        |
| 散文换行     | `proseWrap: "never"`                  | 从不换行                |

### 函数写法偏好

**优先使用 `const 函数名 = () => {}` 箭头函数写法，避免使用 `function` 声明。**

| 原写法                       | 推荐写法                        |
| ---------------------------- | ------------------------------- |
| `function fetchData() {}`    | `const fetchData = () => {}`    |
| `function onBtnClick(e) {}`  | `const onBtnClick = (e) => {}`  |

---

## 二、导入排序规范

通用约定：导入语句必须按以下顺序分组，组与组之间空一行分隔，组内按字母顺序排序。

| 分组 | 内容         | 示例                                |
| ---- | ------------ | ----------------------------------- |
| 1    | 外部依赖     | `import { ref } from 'vue'`         |
| 2    | 类型导入     | `import type { XXX } from 'xxx'`    |
| 3    | 内部全局依赖 | `@/utils`、`@/hooks`、`@/stores` 等 |
| 4    | 内部相对依赖 | `./` 或 `../` 开头的相对路径        |

> **框架覆盖**：Vue2 历史项目可沿用 3 组（无独立类型组），详见各框架 `order.md` / `component-dev.md`。
> **可选第 5 组**：Vue SFC 中的静态资源（图片、样式、JSON）可视情况追加为最后一组。

```typescript
// ✅ 正确示例（4 组）
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import type { IUser } from '@/types/user'

import { formatDate } from '@/utils/date'
import { useUserStore } from '@/stores/user'

import UserCard from './components/UserCard.vue'
import defaultAvatar from '@/assets/avatar.png'
import './index.scss'
```

---

## 三、代码结构约定

单文件代码按以下顺序组织：

1. 导入语句（按上述分组顺序）
2. 常量定义（枚举、全局常量、配置项）
3. 类型定义（TypeScript 接口、类型别名）
4. 业务逻辑（按功能模块分组，模块内部按「状态 → 计算属性 → 工具函数 → 事件处理函数」顺序书写）
5. 生命周期钩子（Vue）/ 副作用（React Hooks）
6. 导出语句（默认导出 / 具名导出）

> **功能模块分组原则**：第 4 步是核心，按业务功能（如「列表查询」「状态筛选」「表单」等）将相关的状态、计算属性、工具函数、事件处理聚拢到同一模块，模块之间用空行或注释分隔；避免把所有状态、所有函数分别堆在一起。逻辑单一时只写一个模块即可。
>
> **生命周期 / 副作用**：通用规范将其作为独立的尾部区块；框架项目以各框架 `order.md` 为准（如 Vue3 / React 建议把 `watch` / `onMounted` / `useEffect` 就近放入对应功能模块）。

```typescript
// ✅ 正确示例
// 1. 导入
import { ref, computed, onMounted } from 'vue'

import type { IUser } from '@/types/user'

// 2. 常量
const PAGE_SIZE = 10
const STATUS_OPTIONS = [
  { label: '正常', value: 1 },
  { label: '禁用', value: 2 },
]

// 3. 类型
type TListQuery = {
  page: number
  pageSize: number
  keyword?: string
}

// 4. 业务逻辑（按功能模块分组）

// --- 功能模块：列表查询 ---
// 状态
const loading = ref(false)
const list = ref<IUser[]>([])
const query = ref<TListQuery>({ page: 1, pageSize: PAGE_SIZE })
// 计算属性
const total = computed(() => list.value.length)
const isSubmitDisabled = computed(() => loading.value || !query.value.keyword)
// 事件处理
const onSearchBtnClick = async () => {
  loading.value = true
  // 请求逻辑
  loading.value = false
}

// --- 功能模块：状态筛选 ---
// 状态
const currentStatus = ref<number>()
// 计算属性
const isFilterActive = computed(() => currentStatus.value !== undefined)
const filteredList = computed(() => {
  if (!isFilterActive.value) return list.value
  return list.value.filter((item) => item.status === currentStatus.value)
})
// 工具函数
const formatStatus = (status: number) => {
  return STATUS_OPTIONS.find((item) => item.value === status)?.label || '-'
}
// 事件处理
const onStatusSelect = (value: number) => {
  currentStatus.value = value
}

// 5. 生命周期
onMounted(() => {
  onSearchBtnClick()
})

// 6. 导出
export { list, filteredList, onSearchBtnClick }
```

> 框架特定的结构顺序详见 [vue2-order.md](./vue2-order.md)、[vue3-order.md](./vue3-order.md)、[react-order.md](./react-order.md)。

---

## 四、其他风格规范

### 变量声明

- 优先使用 `const` 声明不可变变量，`let` 声明可变变量，禁止使用 `var`
- 每次只声明一个变量
- 变量在使用处就近声明，不要集中在文件顶部

### 空行规范

- 逻辑块之间空一行分隔（导入组之间、常量和类型之间、函数之间等）
- 函数内逻辑相关的代码之间不要空行，不相关的逻辑块空一行分隔
- 文件末尾保留一个空行
- 禁止连续出现多个空行（最多一个空行）

### 空格规范

- 运算符前后必须加空格：`a + b`，`a === b`，`c > d`
- 逗号后面必须加空格：`const arr = [1, 2, 3]`
- 冒号后面必须加空格：`const obj = { a: 1, b: 2 }`
- 括号内侧不要加空格：`(a + b) * c`，不要写成 `( a + b ) * c`
- 注释符号和注释内容之间必须加空格：`// 注释内容`，`/** 文档注释 */`

### 函数规范

- 优先使用箭头函数表达式：`const fn = () => {}`，避免使用 `function` 声明
- 函数参数超过 3 个时，必须使用对象解构传参
- 函数名必须语义化，前缀统一遵循 [common-naming.md](./common-naming.md#二函数命名规范)
