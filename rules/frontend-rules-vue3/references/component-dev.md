# Vue3 组件开发规范

## `<script setup>` 要求

- **必须使用** `<script setup>` 语法
- **禁止**使用 Options API 写法（如 `data()`、`methods: {}`、`mounted() {}` 等）
- **禁止**在 `<script setup>` 中使用 `this`

## 脚本结构顺序（强制）

`<script setup>` 内部内容需按以下顺序排列：

1. `imports` → 2. `defineProps` → 3. `defineEmits` → 4. Hooks (useXxx) → 5. `ref`/`reactive` 响应式数据 → 6. `computed` → 7. `watch`/`watchEffect` → 8. 方法/函数 → 9. 生命周期钩子 → 10. `defineExpose`

### 完整示例

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
const { tableData, getListData } = useTable();

// 响应式数据
const searchQuery = ref('');

// computed
const isSelected = computed(() => { /* ... */ });

// watch
watch(searchQuery, (newVal) => { /* ... */ }, { immediate: true });

// 方法
const fetchData = async () => { /* ... */ };

// 生命周期
onMounted(() => {
  fetchData();
});
</script>
```

## Script 顶部 JSDoc

```typescript
/**
 * 组件名称
 * @description 页面职责说明
 * @description 核心业务流程简述
 * @description 关键数据来源
 */
<script setup lang="ts">
```

## Vue 元素特性顺序

1. 定义（`is`）→ 2. `v-for` → 3. `v-if/v-else-if/v-else` → 4. `v-show/v-cloak` → 5. `id` → 6. `props/attrs` → 7. `v-on` → 8. `v-html/v-text`（动态 `v-slot`）

## v-slot 风格

- 使用动态风格（如 `v-slot:[name]`）
- 禁止静态默认插槽写法

## 模板层轻量化

- 模板只负责展示，不写复杂表达式与逻辑
- 简单逻辑可内联，不过度封装为函数

## 注释规范

### 模板区注释

| 场景 | 注释格式 | 示例 |
|------|----------|------|
| 根节点 | `<!-- 组件名称 -->` | `<!-- UserCard -->` |
| 循环节点 | `<!-- 循环: 描述 -->` | `<!-- 循环: 用户列表 -->` |
| 条件分支 | `<!-- 条件: 描述 -->` | `<!-- 条件: 有数据时 -->` |
| 关键区块 | `<!-- 区块名称 -->` | `<!-- 操作按钮组 -->` |
| 插槽节点 | `<!-- 插槽: name -->` | `<!-- 插槽: default -->` |
| 动态组件 | `<!-- 动态组件: 描述 -->` | `<!-- 动态组件: 标签页内容 -->` |

### 脚本区注释

| 内容 | 注释格式 | 示例 |
|------|----------|------|
| 组件名称 | `// name: 组件名` | `// name: UserCard` |
| props | `// prop名: 描述` | `// user: 用户信息` |
| ref/reactive | `// 属性名: 描述` | `// searchQuery: 搜索查询参数` |
| computed | `// computed: 描述` | `// computed: 是否全选` |
| watch | `// watch: 描述` | `// watch: 监听用户输入` |
| 函数 | `// methods: 描述` | `// methods: 提交表单` |
| 组件引入 | `// component: 组件名` | `// component: UserCard` |
| Hooks 引入 | `// hook: Hook名` | `// hook: useTable` |
| provide | `// 提供的键名: 描述` | `// appConfig: 全局配置` |
| inject | `// 注入的键名: 描述` | `// parentData: 父组件提供的数据` |

### JSDoc（关键方法必填）

```typescript
/**
 * 方法名称
 * @description 方法的简要描述
 * @param {类型} 参数名 - 参数描述
 * @returns {类型} 返回值描述
 */
```

**注释要求**：中文描述；行内不超过一行；JSDoc 不超过 5 行；无冗余注释

## 方法内部逻辑顺序

1. 初始化方法：`const initXxx = () =>`
2. 网络请求：`const getListData = async ()`, `const postFormData = async ()`
3. 事件处理：`const onClickXxx = async ()`, `const onChangeXxx = async ()`
4. 特殊计算：`const computedXxx = () =>`

## 方法职责单一化

- 一个方法只做一件事，超过 50 行必须拆分
- 重复逻辑抽离为公共方法或 Hook
- **不要过度封装**：简单条件判断直接写在 template 中

## 复杂页面拆分建议

| 模块 | 处理方式 |
|------|----------|
| 弹窗 | 拆分为独立组件 |
| 表格 | 表格组件 + 业务逻辑分离 |
| 表单 | 表单组件 + 校验逻辑分离 |

## 组件生命周期 emit 限制

- **基础组件**：禁止在生命周期函数中主动向外 emit
- **业务型组件**：允许但不推荐

## defineExpose

- 明确声明对外暴露的属性和方法
- 父组件通过 `ref` 访问子组件暴露的内容
