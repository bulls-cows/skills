# 组件交互与通信规范

本模块定义 Vue3 组件间的 Props、Emit、provide/inject 等通信方式规范。

## 一、Props 定义规范

- 必须使用 `<script setup>` 语法，禁止 Options API 写法
- 使用 `defineProps` + TypeScript 类型注解
- 命名必须 camelCase，必须添加注释说明参数含义

```typescript
const props = defineProps<{
  // userId: 用户ID
  userId: string | number;
  // isLoading: 加载状态
  isLoading?: boolean;
}>();
```

### 1.1 类型注解

- 必须明确指定每个 prop 的类型
- 可选 prop 使用 `?` 标记
- 复杂类型使用 `type` 或 `interface` 定义后引用

### 1.2 v-model 兼容

- 支持 `v-model:xx` 语法，对应 `modelValue: xx` prop 和 `update:xx` emit
- 示例：`v-model:value` → `defineProps<{ value: string }>()` + `defineEmits<{ 'update:value': [value: string] }>()`

### 1.3 使用限制

- 禁止直接修改 props，使用 `props.xxx` 只读访问
- 禁止父组件直接修改子组件内部状态
- 后端给什么类型就用什么类型，不可修改原始类型

## 二、Emit 事件白名单与顺序

### 2.1 事件白名单

| 分类 | 允许的事件 |
|------|-----------|
| 交互类 | `change`, `click`, `select`, `expand`, `input`, `clear`, `remove`, `add` |
| 弹窗类 | `open`, `close`, `show`, `hide` |
| 操作类 | `cancel`, `confirm`, `ok`, `editSuccess`, `error` |

### 2.2 对外 emit 顺序

```typescript
emit("input", 数据);
emit("其它事件", 数据);
emit("change/click", 数据);
```

### 2.3 defineEmits 定义

使用 `defineEmits` 定义，必须指定事件名和参数类型：

```typescript
const emit = defineEmits<{
  input: [value: string];
  change: [value: string];
  click: [id: number];
}>();
```

## 三、组件传参要求

- **命名**：必须使用 camelCase
- **类型**：必须明确指定参数类型（TypeScript 类型注解）
- **注释**：必须添加注释说明参数含义

## 四、组件间通信

### 4.1 provide / inject 规范

- **使用场景**：仅用于深层组件传参（3 层以上），避免逐层传递 props
- **兄弟组件通信**：使用 Pinia/Vuex，禁止通过 provide/inject 跨层级滥用
- **响应式传递**：注入对象需保持响应式，使用 `provide('key', refValue)`

### 4.2 禁用 $parent / $children

- **禁止**通过 `$parent.$parent` 链式访问父组件数据
- **禁止**在 `<script setup>` 中使用 `this`
- **原因**：组件耦合度高，破坏组件独立性
- **替代方案**：使用 props/emit 或状态管理

## 五、defineExpose

- 明确声明对外暴露的属性和方法
- 父组件通过 `ref` 访问子组件暴露的内容

```typescript
// 对外暴露
defineExpose({
  fetchData,
  resetForm
});
```
