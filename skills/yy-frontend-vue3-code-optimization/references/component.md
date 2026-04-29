# 组件开发规范

## `<script setup>` 强制要求

- 必须使用 `<script setup lang="ts">` 语法，禁止 Options API（`data()`、`methods: {}`、`mounted() {}` 等）。
- 禁止在 `<script setup>` 中使用 `this`。
- 必须使用 TypeScript 类型注解，禁止使用 `any`（使用 `unknown` 或具体类型替代）。

## Script 结构顺序

严格遵循以下顺序（组间用空行分隔）：

1. `imports`
2. `defineProps`
3. `defineEmits`
4. Hooks 引入（`const { ... } = useXxx()`）
5. `ref` / `reactive` 响应式数据
6. `computed`
7. `watch` / `watchEffect`
8. 方法 / 函数
9. 生命周期钩子
10. `defineExpose`

```typescript
<script setup lang="ts">
// imports
import { ref, computed, onMounted } from 'vue';

// props
const props = defineProps<{
  // userId: 用户ID
  userId: string | number;
  // isLoading: 加载状态
  isLoading?: boolean;
}>();

// emits
const emit = defineEmits<{
  change: [value: string];
  click: [id: number];
}>();

// Hooks
const { tableData, pagination, getListData } = useTable();
const { searchForm, handleSearch } = useSearchForm();

// 响应式数据
const searchQuery = ref({
  username: '', // 用户名
  email: '',    // 邮箱
});

// computed
const isSelected = computed(() => {
  return selectedItems.value.length === totalItems.value;
});

// watch
watch(searchQuery, (newVal, oldVal) => {
  // 处理搜索关键词变化
}, { immediate: true });

// 方法
const fetchData = async () => {
  // ...
};

// 生命周期
onMounted(() => {
  fetchData();
});
</script>
```

## Script 顶部 JSDoc

组件顶部必须添加 JSDoc：

```typescript
/**
 * 组件名称
 * @description 页面职责说明
 * @description 核心业务流程简述
 * @description 关键数据来源
 */
<script setup lang="ts">
```

## Props 规范

- 使用 `defineProps` + TypeScript 类型注解。
- 命名必须 camelCase。
- 每个 prop 必须添加行内注释说明含义。

```typescript
const props = defineProps<{
  // userId: 用户ID
  userId: string | number;
  // isLoading: 加载状态
  isLoading?: boolean;
}>();
```

## Emit 规范

- 使用 `defineEmits` 定义，必须指定事件名和参数类型。
- 顺序：`input` -> 其它 -> `change`/`click`。
- 基础组件禁止在生命周期中主动 emit；业务型组件允许但不推荐。

```typescript
const emit = defineEmits<{
  input: [value: string];
  change: [value: string];
}>();
```

### Emit 事件白名单

- **交互类**：`change`, `click`, `select`, `expand`, `input`, `clear`, `remove`, `add`
- **弹窗类**：`open`, `close`, `show`, `hide`
- **操作类**：`cancel`, `confirm`, `ok`, `editSuccess`, `error`

## Computed 规则

- 必须用 `try/catch` 包裹。
- 命名用 `is`/`has`/`visible` 前缀。

## 网络请求

统一使用 `async/await` + `try/catch/finally` 与响应处理模式：

```typescript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  // 处理成功逻辑
} else {
  // 处理失败逻辑
}
```

## 不要过度封装

简单的条件判断或表达式直接写在 template 中，不要为简单逻辑额外创建函数。

## 方法排序

函数按以下顺序排列：

1. `const initXxx = () =>`
2. `const getListData = async () =>` / `const postFormData = async () =>`
3. `const onClickXxx = async () =>` / `const onChangeXxx = async () =>`
4. `const computedXxx = () =>`

## 50 行拆分规则

单个函数超过 50 行必须拆分，重复逻辑抽离为公共函数或 Hook。

## 模板属性顺序

`is` -> `v-for` -> `v-if/v-else-if/v-else` -> `v-show/v-cloak` -> `id` -> `props/attrs` -> `v-on` -> `v-html/v-text`

## 性能优化

- 路由和大组件使用 `defineAsyncComponent` 动态导入
- 合理使用 `<KeepAlive>` 页面缓存
- 长列表使用虚拟滚动
- 频繁触发事件使用防抖/节流
