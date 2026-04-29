# Vue3 注释约定

## 模板区（Template）注释

| 场景       | 注释格式                      | 示例                                |
| ---------- | ----------------------------- | ----------------------------------- |
| 根节点     | `<!-- 组件名称 -->`           | `<!-- UserCard -->`                 |
| 循环节点   | `<!-- 循环: 描述 -->`         | `<!-- 循环: 用户列表 -->`           |
| 条件分支   | `<!-- 条件: 描述 -->`         | `<!-- 条件: 有数据时 -->`           |
| 关键区块   | `<!-- 区块: 名称 -->`         | `<!-- 区块: 操作按钮组 -->`         |
| 插槽节点   | `<!-- 插槽: name -->`         | `<!-- 插槽: default -->`            |
| 动态组件   | `<!-- 动态组件: 描述 -->`     | `<!-- 动态组件: 标签页内容 -->`     |
| 具名插槽   | `<!-- 具名插槽: name -->`     | `<!-- 具名插槽: header -->`         |
| 作用域插槽 | `<!-- 作用域插槽: 描述 -->`   | `<!-- 作用域插槽: 表格行数据 -->`   |

## 脚本区（Script Setup）注释

### 导入语句

```typescript
// import: 用户 API 模块
import { getUserList } from '@/api/user'
```

### defineProps

在 defineProps 内部逐行注释：

```typescript
const props = defineProps({
  // user: 用户信息对象
  user: { type: Object, required: true },
  // isLoading: 加载状态
  isLoading: Boolean
})
```

### defineEmits

在 defineEmits 内部逐行注释：

```typescript
const emit = defineEmits([
  // submit: 提交表单事件
  'submit',
  // cancel: 取消操作事件
  'cancel'
])
```

### ref / reactive

```typescript
// searchQuery: 搜索查询参数
const searchQuery = ref({
  username: '', // 用户名
  email: ''     // 邮箱
})

// formData: 表单响应式数据
const formData = reactive({
  name: '',
  age: 0
})
```

### computed

单行注释用于简单计算，TSDoc/JSDoc 用于关键计算：

```typescript
// computed: 是否全选
const isAllSelected = computed(() => ...)

/**
 * 过滤后的用户列表
 * @description 根据搜索关键词过滤用户
 */
const filteredUsers = computed(() => ...)
```

### watch / watchEffect

```typescript
// watch: 监听搜索关键词变化
watch(searchQuery, (newVal) => {
  fetchResults()
})

/**
 * 监听用户选择变化
 * @description 选中用户后自动加载详情
 */
watch(selectedUser, async (newVal) => {
  await loadUserDetail(newVal)
})
```

### 方法函数

单行注释用于简单方法，TSDoc/JSDoc 用于关键方法：

```typescript
// handleSubmit: 提交表单
const handleSubmit = () => { ... }

/**
 * 加载用户详情
 * @param userId - 用户 ID
 * @returns 用户信息对象
 */
const loadUserDetail = async (userId: string) => { ... }
```

### 生命周期钩子

```typescript
// lifecycle: onMounted
onMounted(() => {
  init()
})

// lifecycle: onUnmounted
onUnmounted(() => {
  cleanup()
})
```

### provide / inject

```typescript
// provide: appConfig - 应用全局配置
provide('appConfig', config)

// inject: parentData - 父组件传递的数据
const parentData = inject('parentData')
```

### defineExpose

```typescript
// expose: validate - 表单验证方法
// expose: resetForm - 重置表单
defineExpose({
  validate,
  resetForm
})
```

### 组合式函数（Composables）

```typescript
// hooks: useUserStore - 用户状态管理
const { user, login } = useUserStore()

// hooks: useTable - 表格通用逻辑
const { tableData, pagination, getList } = useTable()
```

## TSDoc/JSDoc 格式

TypeScript 项目中类型可省略，仅保留描述：

```typescript
/**
 * 方法名称
 * @description 方法的简要描述
 * @param 参数名 - 参数描述
 * @returns 返回值描述
 */
```

## 样式区（Style）注释

### 模块分组

```css
/* 用户卡片 */
.user-card {
  ...
}
```

### 子模块

```css
/* 用户卡片 > 头部 */
.user-card__header {
  ...
}
```

### 响应式

```css
/* 响应式 */
@media (max-width: 768px) {
  ...
}
```

### v-bind CSS 变量绑定

```css
/* CSS变量绑定: themeColor */
.header {
  color: v-bind(themeColor);
}
```

### 样式作用域标注

- `scoped`：组件内部样式，注释规范不变
- 非 scoped：标注 `/* 全局 */`
