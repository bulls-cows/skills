# T06 ⚡ 逻辑深度优化（🔴 高风险 · 必须确认）

**定位**：🔴 高风险。涉及运行时行为改变，**必须经过任务调度器确认后执行**。

## 相关规则

执行本任务前，请先阅读以下规则文件（位于 `rules/` 目录），按优先级从高到低排列：

- **`rules/spec-index.md`**：Vue3 前端项目开发规范总纲（必读）
- **`rules/reactivity.md`**：ref/reactive 选择原则、computed 规范、watch 与 computed 选择策略
- **`rules/watch.md`**：watch/watchEffect 使用规范、清理机制、与 computed 选择策略
- **`rules/network.md`**：异步处理、响应解构、错误处理、防重复提交
- **`rules/hooks.md`**：Hooks 命名、返回值、使用方式、抽离建议
- **`rules/performance.md`**：组件懒加载、KeepAlive 缓存、虚拟滚动、防抖节流、图片优化
- **`rules/interaction.md`**：Props 定义规范、Emit 事件白名单、defineExpose

## 相等运算符转换

### 核心原则

**不主动变更 `==` 和 `===`**，保持代码原有写法。

### 建议转换场景（需确认后执行）

以下场景建议统一使用 `===`，但**仍属于中风险，必须展示给用户确认后才执行**：

- **接口响应的 `code` 字段比较**：后端返回的 code 通常是数字类型，建议 `code === 0` 或 `code === 200`
- **异步代码重构后的比较**：当 `.then()` 转为 `async/await` 时，若原代码使用 `==` 比较 `code` 字段，建议同步转为 `===`
- **明确类型已知的比较**：如 `typeof x === 'string'`、`x === null`、`x === undefined`

### 风险：相等运算符转换

任何 `==` ↔ `===` 之间的转换都属于**逻辑变更**，可能改变代码的实际行为：

- `==` 会进行类型转换，`===` 不会
- `null == undefined` 为 true，但 `null === undefined` 为 false
- `0 == ''` 为 true，但 `0 === ''` 为 false
- 转换前必须逐项确认，展示变更预览

## 异步与网络请求

### 目标结构

```typescript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  // 数据处理
} else {
  console.warn(msg);
}
```

### 变更内容

- `.then()` 链式调用转为 `async/await`
- 统一响应模式 `{code, data, msg}` 解构处理
- 错误处理使用 `try/catch + console.warn`

### 变更预览格式规范

展示给用户确认时，**必须使用 diff 格式展示变更前后对比**，示例：

```diff
- // 优化前：Promise 链式调用
- const fetchData = () => {
-   isLoading.value = true
-   getUserInfo(userId.value).then(res => {
-     if (res.code == 200) { /* 数据处理 */ }
-     isLoading.value = false
-   }).catch(err => {
-     console.error(err)
-     isLoading.value = false
-   })
- }

+ // 优化后：Async/Await + try/catch/finally
+ const fetchData = async () => {
+   isLoading.value = true
+   try {
+     const res = await getUserInfo(userId.value)
+     if (res.code === 200) { /* 数据处理 */ }
+   } catch (err) {
+     console.warn(err)
+   } finally {
+     isLoading.value = false  // 只需写一次
+   }
+ }
```

### 风险：异步与网络请求

原代码可能使用不同响应结构；原有错误处理可能不同；`async/await` 改变执行时机。

## 计算属性优先

**详见 `rules/reactivity.md`**（涵盖 computed 核心原则、正确/错误示例、computed 优先策略）。

### 风险：计算属性优先

响应式求值时机不同；带副作用的逻辑（如 API 请求、DOM 操作）不能转为 computed。

## 函数写法偏好（🟡 中风险）

### 箭头函数优先

**优先使用 `const 函数名 = () => {}` 箭头函数写法，避免使用 `function` 声明。**

### 声明方式对照

| 原写法 | 推荐写法 |
|--------|---------|
| `function fetchData() {}` | `const fetchData = () => {}` |
| `function handleClick(e) {}` | `const handleClick = (e) => {}` |
| `async function submitForm() {}` | `const submitForm = async () => {}` |

### 示例

```typescript
// ❌ 错误：function 声明（不推荐）
function fetchData() {
  // ...
}

const handleClick = function() {
  // ...
}

// ✅ 正确：箭头函数（推荐）
const fetchData = () => {
  // ...
};

const handleSubmit = async () => {
  // ...
};
```

### 注意事项

- 该转换会改变 `this` 指向，但在 Vue3 `<script setup>` 中几乎不存在 `this` 依赖，因此可安全转换
- 函数名保持原有语义不变，仅改变声明形式
- 属于**代码风格统一**行为，需用户确认后执行

---

## Hooks 抽离

### 抽离条件

满足以下**任一条件**即可抽离：

- **可复用逻辑超过 30 行**
- **跨 2+ 组件使用相同逻辑**
- **逻辑具有独立性**（表格操作、表单校验、请求封装等）

### Hooks 存放位置

- **全局 Hooks**：`@src/hooks/`（如 `useTable.ts`、`useRequest.ts`）
- **局部 Hooks**：**直接在组件同级目录新建文件**（如 `./useLocalTable.ts`），无需额外 `hooks/` 子目录

### Hooks 结构规范

```typescript
// hooks/useTable.ts
import { ref, computed } from "vue";
import type { ITableColumn } from "@/types/table";

/**
 * 表格逻辑 Hook
 * @description 提供表格数据管理、排序、分页等功能
 */
export const useTable = <T = any>(initialColumns?: ITableColumn[]) => {
  // ref: 表格数据
  const tableData = ref<T[]>([]);
  
  // ref: 加载状态
  const loading = ref(false);
  
  // ref: 分页信息（优先使用 ref，尽可能少用 reactive）
  const page = ref(1);
  const pageSize = ref(20);
  const total = ref(0);
  
  // computed: 是否有数据
  const hasData = computed(() => tableData.value.length > 0);
  
  /**
   * 获取表格数据
   * @param fetchFn - 数据获取函数
   */
  const fetchData = async (fetchFn: () => Promise<{ data: T[]; total: number }>) => {
    loading.value = true;
    try {
      const { data, total: resTotal } = await fetchFn();
      tableData.value = data;
      total.value = resTotal;
    } catch (err) {
      console.warn(err);
    } finally {
      loading.value = false;
    }
  };

  // 返回公共接口（禁止直接返回 reactive 对象）
  return {
    tableData,
    loading,
    page,
    pageSize,
    total,
    hasData,
    fetchData,
  };
};
```

### 使用示例

```typescript
<script setup lang="ts">
import { useTable } from "@/hooks/useTable";
import { apiGetUserList } from "@/api/user";

// 使用 Hook
const { tableData, loading, fetchData } = useTable<IUserInfo>();

onMounted(() => {
  fetchData(() => apiGetUserList({ page: 1 }));
});
</script>
```

### 风险：Hooks 抽离

抽离后可能引入作用域问题；依赖关系需要重新梳理；父组件传递 props 需调整。

## Reactive 转 Ref（尽可能少用 Reactive）

**详见 `rules/reactivity.md`**（涵盖 reactive 转 ref 原则、转换规则、转换示例、Hooks 中的规范、变更预览格式）。

### 风险：Reactive 转 Ref

详见 `rules/reactivity.md` 中的转换风险说明。

## Props 增强

### TypeScript Props 定义规范

```typescript
// ✅ 正确：使用 TypeScript 泛型定义 Props
const props = defineProps<{
  userId: string;
  pageSize?: number;
}>();

// ✅ 正确：使用 withDefaults 设置默认值
const props = withDefaults(
  defineProps<{
    pageSize?: number;
    isLoading?: boolean;
  }>(),
  {
    pageSize: 20,
    isLoading: false,
  }
);

// ❌ 错误：使用运行时 Props 定义（Vue2 风格）
const props = defineProps({
  userId: String,  // 禁止在 Vue3 中使用
  pageSize: Number,
});
```

### Props 注释要求

- **必须添加注释说明参数含义**
- **必须明确指定类型**
- **可选参数必须提供默认值**

```typescript
const props = defineProps<{
  // userId: 用户唯一标识
  userId: string;
  // pageSize: 分页大小，默认 20
  pageSize?: number;
}>();
```

### 风险：Props 增强

缺少 `default` 值可能导致 props 为 `undefined` 时运行报错；新增 type 声明可能触发类型异常。

## Emits 标准化

### Emits 白名单（仅限以下 19 种事件）

| 类别             | 白名单事件                                                               |
| ------ | ------------------------------------------------------------------------ |
| **v-model 更新** | `update:modelValue` (标准), `update:value` (AntD 风格)                   |
| **交互类** | `change`, `click`, `select`, `expand`, `input`, `clear`, `remove`, `add` |
| **弹窗类** | `open`, `close`, `show`, `hide`                                          |
| **操作类** | `cancel`, `confirm`, `ok`, `editSuccess`, `error`                        |

### TypeScript Emits 定义规范

```typescript
// ✅ 正确：使用 TypeScript 类型定义 Emits
const emit = defineEmits<{
  // select: 选中用户事件
  (e: "select", user: IUserInfo): void;
  // change: 页面变化事件
  (e: "change", page: number): void;
}>();

// ❌ 错误：使用运行时 Emits 定义（Vue2 风格）
const emit = defineEmits(["select", "change"]);  // 禁止
```

### Emit 顺序

对外触发事件建议遵循以下优先级：

1. `update:modelValue` / `update:value` (绑定值更新)
2. 其他业务事件
3. `change` / `click` (交互反馈)

### 风险：Emits 标准化

父组件监听的自定义事件名可能不在白名单中，改名或替换会导致父组件监听失效。

### 基础组件规范

基础组件生命周期禁止主动 emit；业务型组件允许但不推荐在生命周期中主动 emit。

## 逻辑抽离与拆分

- 超过 50 行的方法拆分为子方法
- 重复 ≥2 次的逻辑提取为公共函数或 Hook
- 简单条件判断直接内联到 template，不额外创建函数

### 风险：逻辑抽离与拆分

拆分后可能引入作用域问题；内联表达式改变执行时机；Hook 抽离需要梳理依赖。

## 性能优化

- **组件懒加载**：路由和大组件使用动态导入 `import()`
- **KeepAlive**：合理使用页面缓存，避免重复渲染
- **虚拟滚动**：长列表使用虚拟滚动组件减少 DOM 节点
- **防抖节流**：频繁触发的事件（搜索、滚动、resize）使用防抖/节流
- **图片优化**：使用合适的图片格式（webp）和尺寸，懒加载非首屏图片
- **ref/reactive 选择**：优先 `ref`，仅复杂对象场景用 `reactive`（详见 `rules/reactivity.md`）
