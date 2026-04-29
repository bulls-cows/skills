---
name: yy-frontend-vue3-doc
description: >
  为 Vue 3 单文件组件（SFC）自动生成规范注释。
  解析模板区、脚本区（<script setup>）、样式区，添加结构化注释。
  仅在用户提供 .vue 文件内容或明确要求为组件添加注释时触发。
icon: 📝
---

# yy-frontend-vue3-doc

为 Vue 3 `<script setup>` 单文件组件（SFC）自动生成规范注释，使代码结构更清晰、可维护性更高。

## 使用场景

- 用户提供了 `.vue` 文件内容，要求添加注释
- 用户要求为组件补充文档注释
- Code Review 时需要解读组件结构

**不触发**：用户要求生成新组件、修改组件逻辑、生成提交信息等。

## 注释规范

### 模板区（Template）

**注释策略**：

| 场景     | 注释格式                  | 示例                            |
| -------- | ------------------------- | ------------------------------- |
| 根节点   | `<!-- 组件名称 -->`       | `<!-- UserCard -->`             |
| 循环节点 | `<!-- 循环: 描述 -->`     | `<!-- 循环: 用户列表 -->`       |
| 条件分支 | `<!-- 条件: 描述 -->`     | `<!-- 条件: 有数据时 -->`       |
| 关键区块 | `<!-- 区块名称 -->`       | `<!-- 操作按钮组 -->`           |
| 插槽节点 | `<!-- 插槽: name -->`     | `<!-- 插槽: default -->`        |
| 动态组件 | `<!-- 动态组件: 描述 -->` | `<!-- 动态组件: 标签页内容 -->` |

**示例**：

```html
<template>
  <!-- UserCard -->
  <div class="user-card">
    <!-- 用户信息区 -->
    <div class="user-info">
      <img :src="avatar" alt="avatar" />
      <span>{{ username }}</span>
    </div>

    <!-- 条件: 有权限时显示操作按钮 -->
    <div v-if="hasPermission" class="actions">
      <!-- 循环: 操作按钮列表 -->
      <button v-for="action in actions" :key="action.id">
        {{ action.label }}
      </button>
    </div>

    <!-- 插槽: 默认内容 -->
    <slot name="default"></slot>
  </div>
</template>
```

### 脚本区（Script Setup）

**注释策略**：

| 内容          | 注释格式                                                | 示例                                    |
| ------------- | ------------------------------------------------------- | --------------------------------------- |
| 引入模块      | `// import: 模块说明`                                   | `// import: 用户 API`                   |
| Props 定义    | `// prop名: 描述`（在 `defineProps` 内部逐行注释）      | `// user: 用户信息`                     |
| Emits 定义    | `// emit名: 描述`（在 `defineEmits` 内部逐行注释）      | `// submit: 提交表单事件`               |
| ref/reactive  | `// 变量名: 描述`                                       | `// searchQuery: 搜索查询参数`          |
| computed      | `// computed: 描述`（关键计算属性使用 TSDoc/JSDoc）     | `// computed: 是否全选`                 |
| watch         | `// watch: 描述`（关键监听器使用 TSDoc/JSDoc）          | `// watch: 监听用户输入`                |
| 方法函数      | `// 方法名: 描述`（单行）或 TSDoc/JSDoc（关键方法）     | `// handleSubmit: 提交表单`             |
| 生命周期      | `// lifecycle: 阶段`                                    | `// lifecycle: onMounted`               |
| provide       | `// provide: 提供的键名: 描述`                          | `// provide: appConfig - 全局配置`      |
| inject        | `// inject: 注入的键名: 描述`                           | `// inject: parentData - 父组件数据`    |
| defineExpose  | `// expose: 暴露的属性/方法: 描述`                      | `// expose: validate - 表单验证方法`    |
| 组合式函数    | `// hooks: useXxx - 描述`                               | `// hooks: useUserStore - 用户状态管理` |

**TSDoc/JSDoc 格式（关键方法必填）**：

```typescript
/**
 * 方法名称
 * @description 方法的简要描述
 * @param {类型} 参数名 - 参数描述
 * @returns {类型} 返回值描述
 */
```

**示例**：

```vue
<script setup lang="ts">
// import: 用户 API
import { fetchUserInfo } from '@/api/user'

// hooks: useUserStore - 用户状态管理
import { useUserStore } from '@/store/user'

// Props 定义
const props = defineProps<{
  // user: 用户信息
  user: UserInfo
  // 是否显示详细模式
  detailed?: boolean
}>()

// Emits 定义
const emit = defineEmits<{
  // submit: 提交表单事件
  submit: [data: FormData]
  // cancel: 取消操作事件
  cancel: []
}>()

// searchQuery: 搜索查询参数
const searchQuery = ref({
  username: '',
  email: ''
})

// loading: 数据加载状态
const loading = ref(false)

// computed: 是否全选
const isSelected = computed(() => {
  return selectedItems.value.length === totalItems.value
})

// computed: 搜索过滤后的用户列表
const filteredUsers = computed(() => {
  return userList.value.filter(user =>
    user.name.includes(searchQuery.value.username)
  )
})

// handleSubmit: 提交表单
const handleSubmit = async () => {
  const { code, data, msg } = await fetchUserInfo()
  if (code === 0) {
    emit('submit', data)
  }
}

/**
 * 获取用户列表
 * @description 从 API 获取用户数据并更新状态
 * @returns {Promise<void>}
 */
const fetchUserList = async () => {
  loading.value = true
  try {
    const { code, data, msg } = await fetchUserInfo()
    if (code === 0) {
      userList.value = data
    }
  } catch (error) {
    console.error('获取用户列表失败', error)
  } finally {
    loading.value = false
  }
}

/**
 * 监听搜索关键词变化
 * @description 监听用户名输入变化
 */
watch(searchQuery, (newVal, oldVal) => {
  fetchUserList()
})

// lifecycle: onMounted
onMounted(() => {
  fetchUserList()
})

// lifecycle: onUnmounted
onUnmounted(() => {
  // 清理资源
})

// expose: validate - 表单验证方法
defineExpose({
  validate
})
</script>
```

### 样式区（Style）

**注释策略**：

| 场景     | 注释格式              | 示例                        |
| -------- | --------------------- | --------------------------- |
| 模块分组 | `/* 模块名称 */`      | `/* 用户卡片 */`            |
| 子模块   | `/* 模块 > 子模块 */` | `/* 用户卡片 > 头部 */`     |
| 响应式   | `/* 响应式 */`        | `/* 响应式 */`              |
| 动态绑定 | `/* CSS变量绑定 */`   | `/* CSS变量绑定: theme */`  |

**样式作用域**：

- `scoped`：样式仅作用于当前组件，自动生成唯一属性选择器，注释规范不变
- 非 `scoped`：样式可能影响全局，注释时需标注 `/* 全局 */`
- `v-bind()`：Vue3 特有的 CSS 变量绑定，注释时需标注 `/* CSS变量绑定: 变量名 */`

**示例**：

```scss
<style scoped>
/* 用户卡片 */
.user-card {
  padding: 16px;
  border-radius: 8px;

  /* 用户卡片 > 头部 */
  .card-header {
    font-weight: bold;

    /* CSS变量绑定: primaryColor */
    color: v-bind(primaryColor);

    /* 响应式 */
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
}
</style>

<style>
/* 全局 */
body {
  margin: 0;
}
</style>
```

## 工作流程

### 阶段一：解析结构

1. 识别 `<template>` 区块，解析节点层级
2. 识别 `<script setup>` 区块，解析 `imports`、`defineProps`、`defineEmits`、组合式函数（`useXxx`）、`ref`/`reactive`、`computed`、`watch`/`watchEffect`、方法函数、生命周期钩子、`defineExpose`
3. 识别 `<style>` 区块，解析选择器层级

### 阶段二：识别关键节点

**模板区需标注**：

- `v-for` 循环节点
- `v-if` / `v-else-if` / `v-else` / `v-show` 条件节点
- 根节点（组件名称）
- 插槽节点（`<slot>`）
- 动态组件（`<component :is>`）
- `<template #xxx>` 具名插槽 / 作用域插槽

**脚本区需标注**：

- 组件名称（通过 `defineOptions` 或文件名推断）
- 所有 `defineProps` 属性定义
- 所有 `defineEmits` 事件定义
- 所有 `ref` / `reactive` 响应式数据
- 所有 `computed` 计算属性
- 所有 `watch` / `watchEffect` 监听器
- 所有方法函数
- 生命周期钩子（`onMounted`、`onUnmounted`、`onBeforeMount`、`onUpdated`、`onBeforeUpdate` 等）
- `provide` / `inject` 注入
- `defineExpose` 暴露的属性和方法

**样式区需标注**：

- 顶级选择器（模块）
- 子级选择器（子模块）
- 媒体查询块
- `v-bind()` CSS 变量绑定

### 阶段三：生成注释

按照上述规范，在对应位置添加注释。

**操作示例**：

```typescript
// 输入：未注释的 ref
const searchQuery = ref({
  username: '',
  email: ''
})

// 输出：添加注释后
// searchQuery: 搜索查询参数
const searchQuery = ref({
  username: '', // 用户名
  email: '' // 邮箱
})
```

```typescript
// 输入：未注释的 watch
watch(title, (newVal, oldVal) => {
  fetchResults()
})

// 输出：添加注释后
/**
 * 监听搜索关键词变化
 * @description 监听用户名输入变化
 */
watch(title, (newVal, oldVal) => {
  fetchResults()
})
```

```html
// 输入：未注释的模板节点
<div v-for="item in items" :key="item.id">
  <span v-if="item.visible">{{ item.name }}</span>
</div>

// 输出：添加注释后
<!-- 循环: 数据列表 -->
<div v-for="item in items" :key="item.id">
  <!-- 条件: 可见项 -->
  <span v-if="item.visible">{{ item.name }}</span>
</div>
```

**关键原则**：

- **不修改任何代码逻辑**，只添加注释
- **保持原有缩进和格式**
- **注释简洁**，不超过一行（模板区和样式区），TSDoc/JSDoc 不超过 5 行
- **使用中文**描述（代码标识符除外）

### 阶段四：输出结果

直接输出完整的带注释代码，不包含解释说明。

## 输出格式

直接输出带注释的 Vue SFC 代码，使用代码块包裹：

````markdown
```vue
<template>
  <!-- 组件名 -->
  <div>...</div>
</template>

<script setup lang="ts">
// imports

// props
const props = defineProps<{ ... }>()

// emits
const emit = defineEmits<{ ... }>()

// ref / reactive

// computed

// watch

// methods

// lifecycle
onMounted(() => { ... })
</script>

<style scoped>
...
</style>
```
````

## 注意事项

1. **不删除原有代码**：只添加注释，原有代码保持不变
2. **不添加空注释**：没有关键内容的区块不强制添加注释
3. **保持简洁**：注释言简意赅，不废话
4. **Vue 3 语法**：确保使用 Vue 3 `<script setup>` 语法（`ref`、`computed`、`onMounted` 等）
5. **TypeScript 支持**：使用 `lang="ts"` 时，TSDoc 类型注释可省略，TypeScript 类型由编译器检查
