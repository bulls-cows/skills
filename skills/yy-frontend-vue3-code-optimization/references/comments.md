# 注释规范

## 模板区注释规范

| 场景     | 注释格式                  | 示例                            |
| -------- | ------------------------- | ------------------------------- |
| 根节点   | `<!-- 组件名称 -->`       | `<!-- UserCard -->`             |
| 循环节点 | `<!-- 循环: 描述 -->`     | `<!-- 循环: 用户列表 -->`       |
| 条件分支 | `<!-- 条件: 描述 -->`     | `<!-- 条件: 有数据时 -->`       |
| 关键区块 | `<!-- 区块名称 -->`       | `<!-- 操作按钮组 -->`           |
| 插槽节点 | `<!-- 插槽: name -->`     | `<!-- 插槽: default -->`        |
| 动态组件 | `<!-- 动态组件: 描述 -->` | `<!-- 动态组件: 标签页内容 -->` |

**模板层轻量化**：模板只负责展示，不写复杂表达式与逻辑；简单逻辑可内联，不过度封装为函数

**示例**：

```html
<template>
  <!-- UserCard -->
  <div class="user-card">
    <!-- 用户信息区 -->
    <div class="user-card__info">
      <img :src="avatar" alt="avatar" />
      <span>{{ username }}</span>
    </div>

    <!-- 条件: 有权限时显示操作按钮 -->
    <div v-if="hasPermission" class="user-card__actions">
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

## 脚本区注释规范

| 内容     | 注释格式                     | 示例                                |
| -------- | ---------------------------- | ----------------------------------- |
| 组件名称 | `// name: 组件名`            | `// name: UserCard`                 |
| props    | `// prop名: 描述`            | `// user: 用户信息`                 |
| ref/reactive | `// 属性名: 描述`        | `// searchQuery: 搜索查询参数`      |
| computed | `// computed: 描述`          | `// computed: 是否全选`             |
| watch    | `// watch: 描述`             | `// watch: 监听用户输入`            |
| 函数     | `// methods: 描述`           | `// methods: 提交表单`              |
| 组件引入 | `// component: 组件名`       | `// component: UserCard`            |
| Hooks 引入 | `// hook: Hook名`          | `// hook: useTable`                 |
| provide  | `// 提供的键名: 描述`        | `// appConfig: 全局配置`            |
| inject   | `// 注入的键名: 描述`        | `// parentData: 父组件提供的数据`   |

### JSDoc 格式（关键方法必填）

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
// props
const props = defineProps<{
  // user: 用户信息
  user: {
    name: string;
    avatar: string;
  };
}>();

// emits
const emit = defineEmits<{
  change: [value: string];
  click: [id: number];
}>();

// ref
const searchQuery = ref({
  username: '', // 用户名
  email: ''     // 邮箱
});

// computed: 是否全选
const isSelected = computed(() => {
  return selectedItems.value.length === totalItems.value;
});

// watch: 监听用户输入
watch(searchQuery, (newVal, oldVal) => {
  // 处理搜索关键词变化
}, { immediate: true });

// methods: 提交表单
const submitForm = () => {
  // ...
};

/**
 * 获取用户列表
 * @description 从 API 获取用户数据并更新状态
 * @returns {Promise<void>}
 */
const fetchData = async () => {
  // ...
};

// 生命周期
onMounted(() => {
  fetchData();
});
</script>
```

## 关键注释场景

对以下关键位置添加注释，说明"为什么这么做"：

| 场景         | 注释方式               |
| ------------ | ---------------------- |
| 接口请求     | JSDoc + 行内说明目的   |
| 复杂判断     | 行内注释说明条件       |
| 特殊业务逻辑 | JSDoc 说明为什么这么做 |
| 兼容处理     | 行内注释说明兼容逻辑   |

**注释要求**：

- 使用中文描述
- 行内注释不超过一行
- JSDoc 不超过 5 行
- 不使用冗余/无用注释（代码本身能说明的不写）
