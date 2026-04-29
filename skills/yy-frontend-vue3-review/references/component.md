# Vue3 组件规范审核细则

## 脚本结构顺序（强制）

`<script setup>` 内部必须按以下顺序排列：

```text
1. imports (Vue API、第三方库、模块导入)
2. defineProps (组件属性)
3. defineEmits (组件事件)
4. Hooks (useXxx 组合式函数)
5. reactive / ref (响应式数据)
6. computed (计算属性)
7. watch / watchEffect (侦听器)
8. 方法/函数 (const xxx = () =>)
9. 生命周期钩子 (onMounted, onUnmounted 等)
10. defineExpose (对外暴露)
```

**完整示例**：

```typescript
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

const props = defineProps<{
  // userId: 用户ID
  userId: string | number;
  // isLoading: 加载状态
  isLoading?: boolean;
}>();

const emit = defineEmits<{
  change: [value: string];
  click: [id: number];
}>();

const { tableData, getListData } = useTable();

const searchQuery = ref('');
const isLoading = computed(() => { /* ... */ });

watch(searchQuery, (val) => { /* ... */ });

const fetchData = async () => { /* ... */ };

onMounted(() => {
  fetchData();
});
</script>
```

## Script 顶部注释

在 `<script setup>` 开头添加组件逻辑说明：

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

1. 定义 (is)
2. 列表渲染 (v-for)
3. 条件渲染 (v-if/v-else-if/v-else)
4. 渲染方式 (v-show/v-cloak)
5. 全局属性 (id)
6. 特性 (props/attrs)
7. 事件 (v-on)
8. 内容 (v-html/v-text)

## 组件对外 emit 事件

- **命名**：使用驼峰（camelCase），如 `userChange`
- **白名单**：change, click, select, expand, input, clear, remove, add, open, close, show, hide, cancel, confirm, ok, editSuccess, error
- **顺序规范**：

```typescript
emit('input', 数据);
emit('其它事件', 数据);
emit('change/click', 数据);
```

## 组件生命周期 emit 限制

- **基础组件**：禁止在生命周期相关函数中主动向外 emit 事件
- **业务型组件**：允许但不推荐在生命周期相关函数中主动向外 emit 事件

## 组件传参要求

- **命名**：必须使用 camelCase（defineProps 类型定义中）
- **类型**：必须明确指定参数类型（TypeScript 类型注解）
- **注释**：必须添加注释说明参数含义

## 方法内部逻辑顺序

1. 初始化方法：`const initXxx = () =>`
2. 网络请求：`const getListData = async ()`, `const postFormData = async ()`
3. 事件处理：`const onClickXxx = async ()`, `const onChangeXxx = async ()`
4. 特殊计算：`const computedXxx = () =>`

## 方法职责单一化

1. **一个方法只做一件事**，避免巨型函数（超过 50 行必须拆分）
2. **重复逻辑抽离**为公共函数或 Hook
3. **职责明确**，每个方法专注于单一功能
4. **不要过度封装**：简单的条件判断或表达式直接写在 template 中，不要为简单逻辑额外创建函数

## Vue3 基础规则

- 必须使用 `<script setup>` 语法，**禁止 Options API 写法**
- **禁止在 `<script setup>` 中使用 `this`**
- 组件命名：PascalCase（允许单个单词，推荐多单词组合）
- 属性命名：camelCase
- v-slot 风格：动态风格（如 `v-slot:[name]`），**禁止静态默认插槽写法**
- **禁止使用 mixins**
