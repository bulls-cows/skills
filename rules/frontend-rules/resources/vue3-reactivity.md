# Vue3 响应式状态规范（ref/reactive/computed）

本规范涵盖 `ref`、`reactive`、`computed` 的选择原则、转换规则及使用规范。

---

## 一、ref 与 reactive 选择原则

**优先使用 `ref`，尽可能少用 `reactive`**。

| 场景         | 推荐方式              | 说明                                                |
| ------------ | --------------------- | --------------------------------------------------- |
| 简单状态     | `ref`                 | 单个值状态（如 `const count = ref(0)`）             |
| 对象数据     | `ref`                 | 拆分为独立 ref（如 `const userName = ref('')`）     |
| 数组数据     | `ref`                 | 直接使用 `ref([])`                                  |
| 分页请求参数 | `ref`                 | 保持为 `pagination = ref({ page, limit })` 组合 ref |
| 分页总数     | `ref`                 | `total` 独立 ref（响应数据，非请求参数）            |
| 复杂对象     | `reactive`            | 需要管理多层嵌套的对象数据                          |
| 批量更新     | `reactive`            | 需要一次性更新多个相关属性                          |
| 对象解构     | `reactive` + `toRefs` | 解构后仍需保持响应式                                |

### 使用 `reactive` 的场景

仅在以下场景考虑使用 `reactive`：

- **复杂对象结构**：需要管理多层嵌套的对象数据
- **批量属性更新**：需要一次性更新多个相关属性
- **对象解构场景**：需要解构后仍保持响应式（配合 `toRefs`）

---

## 二、Reactive 转 Ref 规则

### 转换规则

| 场景         | 原写法（reactive）                                    | 推荐写法（ref）                                        |
| ------------ | ----------------------------------------------------- | ------------------------------------------------------ |
| 简单状态     | `const state = reactive({ count: 0 })`                | `const count = ref(0)`                                 |
| 对象数据     | `const user = reactive({ name: '', age: 0 })`         | `const userName = ref('')`<br>`const userAge = ref(0)` |
| 数组数据     | `const list = reactive([])`                           | `const list = ref([])`                                 |
| 分页请求参数 | `const pagination = reactive({ page: 1, limit: 20 })` | `const pagination = ref({ page: 1, limit: 20 })`       |

### 转换示例

**优化前（使用 reactive）**：

```typescript
// 不推荐：使用 reactive
const formData = reactive({
  username: '',
  email: '',
  phone: '',
})

const pagination = reactive({
  page: 1,
  limit: 20,
})
```

**优化后（使用 ref）**：

```typescript
// 推荐：使用 ref
const username = ref('')
const email = ref('')
const phone = ref('')

// 分页请求参数（组合使用）
const pagination = ref({ page: 1, limit: 20 })

// 分页总数（响应数据，独立管理）
const total = ref(0)
```

### Hooks 中的规范

**禁止直接返回 reactive 对象**，必须使用 `toRefs` 解构后返回：

```typescript
// 错误：直接返回 reactive
export const useForm = () => {
  const form = reactive({ name: '', age: 0 })
  return { form } // 禁止
}

// 正确：使用 ref 独立声明
export const useForm = () => {
  const name = ref('')
  const age = ref(0)
  return { name, age }
}

// 正确：如果必须用 reactive，使用 toRefs
export const useForm = () => {
  const form = reactive({ name: '', age: 0 })
  return toRefs(form) // 允许
}
```

### 转换风险

- **解构丢失响应式**：reactive 解构后会丢失响应式，需要配合 `toRefs`
- **访问方式变更**：ref 需要 `.value` 访问，reactive 直接访问属性
- **类型推断差异**：ref 的类型推断更明确，reactive 可能需要额外类型定义
- **批量更新影响**：reactive 的批量属性更新更简洁，ref 需要逐个更新

### 变更预览格式

展示给用户确认时，**必须使用 diff 格式展示变更前后对比**：

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

---

## 三、computed 规范

### 核心原则

- 除后端交互数据和部分定时器外，**一律尽可能使用 `computed`**
- 减少冗余 ref 属性，优先派生计算
- 命名使用 `is` / `has` / `visible` 或有意义的名称
- **computed 是纯同步 getter**，不应处理异步逻辑或副作用

### 防御性 try/catch 包裹

对于可能因边界情况抛出错误的计算逻辑，建议包裹 try/catch：

```typescript
// computed: 是否全选
const isSelected = computed(() => {
  try {
    return selectedItems.value.length === totalItems.value
  } catch {
    return false
  }
})
```

### 正确示例

```typescript
// 正确：computed 用于同步派生逻辑
const isSelected = computed(() => selectedItems.value.length === totalItems.value)

// 正确：使用 is 前缀命名
const hasData = computed(() => dataSource.value.length > 0)

// 正确：使用语义化名称
const formattedDate = computed(() => formatDate(rawDate.value))
```

### 错误示例

```typescript
// 错误：computed 中使用异步逻辑
const userList = computed(async () => {
  // 禁止
  return await apiGetUserList()
})

// 错误：computed 中包含副作用
const result = computed(() => {
  doSomething() // 禁止在 computed 中执行副作用
  return value
})
```

### computed 优先策略

**优先使用 `computed` 替代 `watch` 中的派生逻辑**，利用其缓存机制：

```typescript
// 不推荐：使用 watch 监听派生值
watch([a, b], () => {
  sum.value = a.value + b.value
})

// 推荐：使用 computed 自动缓存
const sum = computed(() => a.value + b.value)
```

### 风险

- 响应式求值时机不同
- 带副作用的逻辑（如 API 请求、DOM 操作）不能转为 computed

---

## 四、基本规则

| 规则       | 说明                               |
| ---------- | ---------------------------------- |
| 优先使用   | `ref`                              |
| 复杂对象   | 使用 `reactive`                    |
| 尽可能使用 | `computed`（除后端交互和定时器外） |
| 减少冗余   | 优先派生计算，减少冗余 ref         |
| ref 访问   | 必须使用 `.value`                  |

---

## 五、在代码组织中的位置

在 `<script setup>` 的业务模块内部，按业务逻辑分组，组内通常顺序：

```text
ref/reactive → computed → 方法 → watch → 生命周期钩子
```
