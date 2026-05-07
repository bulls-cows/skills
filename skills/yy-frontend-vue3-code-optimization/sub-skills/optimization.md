# 逻辑深度优化

**定位**：🔴 高风险。涉及运行时行为改变，**必须经过任务调度器确认后执行**。

## 相等运算符转换

### 核心原则

**绝对不主动变更 `==` 和 `===`**，保持代码原有写法。即使有接口响应 code 字段，也必须先列入高风险任务清单，用户明确确认后才执行转换。

### 例外情况（需确认后执行）

- **接口响应的 `code` 字段比较**：建议统一使用 `===`（如 `code === 0`），因为后端返回的 code 通常是数字类型。但此转换仍属于高风险，必须展示给用户确认后才执行

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

- 将非副作用的逻辑从方法迁移至 `computed`
- 命名统一用 `is/has/visible` 前缀
- **computed 是同步 getter 函数，不应使用 try/catch**

> **注意**：如果逻辑需要异步或错误处理，保留在普通函数中。

```typescript
// ✅ 正确：computed 用于同步派生逻辑
const isSelected = computed(() => selectedItems.value.length === totalItems.value);

// ❌ 错误：computed 中使用异步逻辑
const userList = computed(async () => {  // 禁止
  return await apiGetUserList();
});
```

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
      const { data, total } = await fetchFn();
      tableData.value = data;
      total.value = total;
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

### Reactive 转 Ref 原则

**优先使用 `ref`，尽可能少用 `reactive`**。仅在以下场景考虑使用 `reactive`：

- **复杂对象结构**：需要管理多层嵌套的对象数据
- **批量属性更新**：需要一次性更新多个相关属性
- **对象解构场景**：需要解构后仍保持响应式（配合 `toRefs`）

### 转换规则

| 场景 | 原写法（reactive） | 推荐写法（ref） |
|------|---------------------|-----------------|
| 简单状态 | `const state = reactive({ count: 0 })` | `const count = ref(0)` |
| 对象数据 | `const user = reactive({ name: '', age: 0 })` | `const userName = ref('')`<br>`const userAge = ref(0)` |
| 数组数据 | `const list = reactive([])` | `const list = ref([])` |
| 分页信息 | `const pagination = reactive({ page: 1, size: 20 })` | `const page = ref(1)`<br>`const pageSize = ref(20)` |

### 转换示例

**优化前（使用 reactive）**：

```typescript
// ❌ 不推荐：使用 reactive
const formData = reactive({
  username: '',
  email: '',
  phone: '',
});

const pagination = reactive({
  page: 1,
  pageSize: 20,
  total: 0,
});
```

**优化后（使用 ref）**：

```typescript
// ✅ 推荐：使用 ref
const username = ref('');
const email = ref('');
const phone = ref('');

const page = ref(1);
const pageSize = ref(20);
const total = ref(0);
```

### Hooks 中的规范

**禁止直接返回 reactive 对象**，必须使用 `toRefs` 解构后返回：

```typescript
// ❌ 错误：直接返回 reactive
export const useForm = () => {
  const form = reactive({ name: '', age: 0 });
  return { form };  // 禁止
};

// ✅ 正确：使用 toRefs 解构后返回
export const useForm = () => {
  const name = ref('');
  const age = ref(0);
  return { name, age };
};

// ✅ 正确：如果必须用 reactive，使用 toRefs
export const useForm = () => {
  const form = reactive({ name: '', age: 0 });
  return toRefs(form);  // 允许
};
```

### 风险：Reactive 转 Ref

- **解构丢失响应式**：reactive 解构后会丢失响应式，需要配合 `toRefs`
- **访问方式变更**：ref 需要 `.value` 访问，reactive 直接访问属性
- **类型推断差异**：ref 的类型推断更明确，reactive 可能需要额外类型定义
- **批量更新影响**：reactive 的批量属性更新更简洁，ref 需要逐个更新

### 变更预览格式

展示给用户确认时，**必须使用 diff 格式展示变更前后对比**，示例：

```diff
- // 优化前：使用 reactive
- const formData = reactive({
-   username: '',
-   email: '',
- });
- 
- formData.username = 'test';
- formData.email = 'test@example.com';

+ // 优化后：使用 ref
+ const username = ref('');
+ const email = ref('');
+ 
+ username.value = 'test';
+ email.value = 'test@example.com';
```

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

### Emits 白名单（仅限以下 17 种事件）

| 类别   | 白名单事件                                                               |
| ------ | ------------------------------------------------------------------------ |
| 交互类 | `change`, `click`, `select`, `expand`, `input`, `clear`, `remove`, `add` |
| 弹窗类 | `open`, `close`, `show`, `hide`                                          |
| 操作类 | `cancel`, `confirm`, `ok`, `editSuccess`, `error`                        |

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

`input` → 其它 → `change/click`

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
- **computed 优先**：替代 watch 中的派生逻辑，利用缓存机制
- **ref/reactive 选择**：简单值用 `ref`，复杂对象用 `reactive`
- **⚠️ 组件拆分**：弹窗→独立组件、表格→表格组件 + 业务逻辑分离、表单→表单组件 + 校验分离。**这属于架构调整，须用户确认后执行，不会自动创建新文件**

## 其他优化

- `v-html` 必须防范 XSS，避免直接操作未过滤的字符串
- 禁止直接修改 `props` 数据（使用 `props.xxx` 只读访问）
- 禁止连续解构 (如 `...data.data`)
- 禁止父组件直接修改子组件数据
- 禁止多次修改 ref/reactive 属性类型（后端给什么值用什么值，可新增属性但不允许修改原始数据类型）
- **ref 访问必须使用 `.value`**

> 📖 更多禁止规则见主技能文档 [SKILL.md](../SKILL.md) 的「禁止规则」章节。
