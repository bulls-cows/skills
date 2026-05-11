# ref/reactive/computed 响应式状态规范

本模块定义 Vue3 Composition API 下 `ref`、`reactive`、`computed` 的选择原则与使用规范。

## 一、ref 与 reactive 选择原则

**优先使用 `ref`，尽可能少用 `reactive`**。

| 场景 | 推荐方式 | 说明 |
|------|----------|------|
| 简单状态 | `ref` | 单个值状态（如 `const count = ref(0)`） |
| 对象数据 | `ref` | 拆分为独立 ref（如 `const userName = ref('')`） |
| 数组数据 | `ref` | 直接使用 `ref([])` |
| 分页信息 | `ref` | 拆分为 `page`、`pageSize`、`total` 独立 ref |
| 复杂对象 | `reactive` | 需要管理多层嵌套的对象数据 |
| 批量更新 | `reactive` | 需要一次性更新多个相关属性 |
| 对象解构 | `reactive` + `toRefs` | 解构后仍需保持响应式 |

### 使用 `reactive` 的场景

仅在以下场景考虑使用 `reactive`：

- **复杂对象结构**：需要管理多层嵌套的对象数据
- **批量属性更新**：需要一次性更新多个相关属性
- **对象解构场景**：需要解构后仍保持响应式（配合 `toRefs`）

## 二、Reactive 转 Ref 规则

### 转换规则

| 场景 | 原写法（reactive） | 推荐写法（ref） |
|------|---------------------|-----------------|
| 简单状态 | `const state = reactive({ count: 0 })` | `const count = ref(0)` |
| 对象数据 | `const user = reactive({ name: '', age: 0 })` | `const userName = ref('')`<br>`const userAge = ref(0)` |
| 数组数据 | `const list = reactive([])` | `const list = ref([])` |
| 分页信息 | `const pagination = reactive({ page: 1, size: 20 })` | `const page = ref(1)`<br>`const pageSize = ref(20)` |

### Hooks 中的规范

**禁止直接返回 reactive 对象**，必须使用 `toRefs` 解构后返回：

```typescript
// ❌ 错误：直接返回 reactive
export const useForm = () => {
  const form = reactive({ name: '', age: 0 });
  return { form };  // 禁止
};

// ✅ 正确：使用 ref 独立声明
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

## 三、computed 规范

### 核心原则

- 除后端交互数据和部分定时器外，**一律尽可能使用 `computed`**
- 减少冗余 ref 属性，优先派生计算
- 命名使用 `is` / `has` / `visible` 或有意义的名称

### 必须使用 `try/catch` 包裹

```typescript
// computed: 是否全选
const isSelected = computed(() => {
  try {
    return selectedItems.value.length === totalItems.value;
  } catch {
    return false;
  }
});
```

### 正确 vs 错误示例

```typescript
// ✅ 正确：使用 computed 派生状态
const fullName = computed(() => `${firstName.value} ${lastName.value}`);
const isDisabled = computed(() => !isValid.value || isLoading.value);

// ❌ 错误：用 ref 存储可由其他状态派生的值
const fullName = ref('');  // 应该在 computed 中派生
watch([firstName, lastName], ([f, l]) => {
  fullName.value = `${f} ${l}`;
});
```
