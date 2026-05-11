# Vue3 组件交互与通信规范

本规范涵盖组件对外接口（Props/Emits/Expose）及组件间数据通信约定。

---

## 一、Props 定义规范

### 1. 基础定义

- 必须使用 `<script setup>` + TypeScript 类型注解，**类型规范详见** `typescript.md`。
- 定义应尽量详细，至少指定类型，推荐使用对象形式，包含 `required`/`default`/`validator`。
- 命名必须 `camelCase`。
- **必须添加注释**说明参数含义（**注释规范详见** `comments.md`）。

```typescript
const props = defineProps<{
  userId: string | number; // userId: 用户ID
  isLoading?: boolean; // isLoading: 加载状态，控制加载动画显示
}>();
```

### 2. v-model 写法

- **Vue 3 标准**：使用 `modelValue` 配合 `emit('update:modelValue')`。
- **Ant Design Vue 风格**：使用 `value` 配合 `emit('update:value')` (即 `v-model:value`)。

**示例**：

```typescript
const props = defineProps<{
  modelValue?: string; // modelValue: v-model 默认绑定值 (Vue 3 标准)
  value?: string; // value: v-model:value 绑定值 (Ant Design Vue 风格)

  userId: number; // userId: 用户ID
  isLoading?: boolean; // isLoading: 加载状态
}>();
```

### 3. 使用限制

- **禁止修改 Props**：禁止在子组件内部直接修改 `props` 值。
- **数据流向**：Props 是单向数据流（父 -> 子），如需修改父级状态，必须通过 Emit 事件通知父组件。

---

## 二、Emit 事件规范

### 1. 事件白名单（19 种）

仅允许使用以下语义化事件名：

| 类别             | 事件名                                                                   |
| ---------------- | ------------------------------------------------------------------------ |
| **v-model 更新** | `update:modelValue` (标准), `update:value` (AntD 风格)                   |
| **交互类**       | `change`, `click`, `select`, `expand`, `input`, `clear`, `remove`, `add` |
| **弹窗类**       | `open`, `close`, `show`, `hide`                                          |
| **操作类**       | `cancel`, `confirm`, `ok`, `editSuccess`, `error`                        |

### 2. Emit 顺序

对外触发事件建议遵循以下优先级：

1.  `update:modelValue` / `update:value` (绑定值更新)
2.  其他业务事件
3.  `change` / `click` (交互反馈)

### 3. defineEmits 定义

使用 TypeScript 泛型定义，明确参数类型：

```typescript
const emit = defineEmits<{
  // 1. v-model 风格
  "update:modelValue": [value: string];
  "update:value": [value: string];

  // 2. 业务事件
  change: [value: string];
  click: [id: number];
}>();
```

---

## 三、对外暴露 (DefineExpose)

- **明确声明**：必须显式通过 `defineExpose` 向父组件暴露需要访问的属性或方法。
- **父组件访问**：父组件通过 `ref` 访问子组件暴露的内容。
- **禁止滥用**：仅暴露父组件业务必须调用的方法（如表单校验 `validate`、弹窗开启 `open`），不应暴露内部状态实现。

**示例**：

```typescript
const validate = async () => {
  /* ... */
};
const resetForm = () => {
  /* ... */
};

defineExpose({
  validate,
  resetForm,
});
```

---

## 四、组件间通信

### 1. 状态管理

- **provide/inject**：仅用于 3 层以上深层组件传参，避免逐层传递 props。
- **兄弟组件通信**：使用 Pinia/Vuex，禁止通过 provide/inject 跨层级滥用。
- **响应式传递**：使用 `provide('key', refValue)` 保持响应式。
- **谨慎使用全局变量或状态**：避免造成难以追踪的副作用。

### 2. 禁用 `$parent` / `$children`

- **禁止**通过 `$parent.$parent` 链式访问父组件数据。
- **禁止**在 `<script setup>` 中使用 `this`。
- **原因**：组件耦合度高，破坏组件独立性。
- **替代方案**：使用 props/emit 或状态管理。
