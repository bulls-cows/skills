---
name: yy-frontend-vue3-doc
description: >
  为 Vue 3 单文件组件（SFC）自动生成规范注释。
  解析模板区、脚本区、样式区，添加结构化注释。
  仅在用户提供 .vue 文件内容或明确要求为组件添加注释时触发。
icon: 📝
---

# yy-frontend-vue3-doc

为 Vue 3 单文件组件（SFC）自动生成规范注释，使代码结构更清晰、可维护性更高。

## 使用场景

- 用户提供了 `.vue` 文件内容，要求添加注释
- 用户要求为组件补充文档注释
- Code Review 时需要解读组件结构

**不触发**：用户要求生成新组件、修改组件逻辑、生成提交信息等。

## 注释规范

### 模板区（Template）

**注释策略**：

| 场景 | 注释格式 | 示例 |
|------|----------|------|
| 根节点 | `<!-- 组件名称 -->` | `<!-- UserCard -->` |
| 循环节点 | `<!-- 循环: 描述 -->` | `<!-- 循环: 用户列表 -->` |
| 条件分支 | `<!-- 条件: 描述 -->` | `<!-- 条件: 有数据时 -->` |
| 关键区块 | `<!-- 区块名称 -->` | `<!-- 操作按钮组 -->` |
| 插槽节点 | `<!-- 插槽: name -->` | `<!-- 插槽: default -->` |
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

### 脚本区（Script）

**注释策略**：

| 内容 | 注释格式 | 示例 |
|------|----------|------|
| props | `// prop: 描述` | `// prop: 用户对象` |
| reactive/ref | `// state: 描述` | `// state: 表单字段` |
| computed | `// computed: 描述` | `// computed: 是否全选` |
| methods | `// methods: 描述`（单行）或 JSDoc（关键方法） | `// methods: 提交表单` |
| 生命周期 | `// lifecycle: 阶段` | `// lifecycle: onMounted` |
| 组件引入 | `// component: 组件名` | `// component: UserCard` |
| composable 引入 | `// composable: 名称` | `// composable: useUser` |

**JSDoc 格式（关键方法必填）**：

```typescript
/**
 * 方法名称
 * @description 方法的简要描述
 * @param {类型} 参数名 - 参数描述
 * @returns {类型} 返回值描述
 */
```

**示例**：

```typescript
<script setup lang="ts">
// prop: 用户对象
defineProps<{
  user: User
}>()

// state: 表单字段
const username = ref('')
const email = ref('')

// computed: 是否全选
const isSelected = computed(() => selectedItems.value.length === totalItems.value)

// lifecycle: onMounted
onMounted(() => {
  fetchData()
})

// methods: 提交表单
const submitForm = () => {
  // ...
}

/**
 * 获取用户列表
 * @description 从 API 获取用户数据并更新状态
 * @returns {Promise<void>}
 */
const fetchData = async () => {
  // ...
}
</script>
```

### 样式区（Style）

**注释策略**：

| 场景 | 注释格式 | 示例 |
|------|----------|------|
| 模块分组 | `/* 模块名称 */` | `/* 用户卡片 */` |
| 子模块 | `/* 模块 > 子模块 */` | `/* 用户卡片 > 头部 */` |
| 响应式 | `/* 响应式 */` | `/* 响应式 */` |

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

    /* 响应式 */
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
}
</style>
```

## 工作流程

### 阶段一：解析结构

1. 识别 `<template>` 区块，解析节点层级
2. 识别 `<script setup>` 或 `<script>` 区块，解析 `props`、`reactive/ref`、`computed`、`methods`、生命周期钩子
3. 识别 `<style>` 区块，解析选择器层级

### 阶段二：识别关键节点

**模板区需标注**：

- `v-for` 循环节点
- `v-if` / `v-show` 条件节点
- 根节点（组件名称）
- 插槽节点（`slot`）
- 动态组件（`component :is`）

**脚本区需标注**：

- `defineProps` / `defineEmits` 声明
- 所有 `ref` / `reactive` 状态
- 所有 `computed` 计算属性
- 所有函数定义
- 生命周期钩子（`onMounted`、`onUpdated`、`onUnmounted` 等）
- Composables 引入

**样式区需标注**：

- 顶级选择器（模块）
- 子级选择器（子模块）
- 媒体查询块

### 阶段三：生成注释

按照上述规范，在对应位置添加注释。

**关键原则**：

- **不修改任何代码逻辑**，只添加注释
- **保持原有缩进和格式**
- **注释简洁**，不超过一行（模板区和样式区），JSDoc 不超过 5 行
- **使用中文**描述（代码标识符除外）

### 阶段四：输出结果

直接输出完整的带注释代码，不包含解释说明。

## 输出格式

直接输出带注释的 Vue SFC 代码，使用代码块包裹：

````markdown
```vue
<template>
  <!-- 组件名 -->
  <div>
    ...
  </div>
</template>

<script setup lang="ts">
...
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
4. **Vue 3 语法**：确保使用 Vue 3 语法（`ref`、`reactive`、`onMounted`、`<script setup>` 等）
