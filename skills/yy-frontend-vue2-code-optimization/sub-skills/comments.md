# 文档与注释增强

**定位**：🟢 零风险。纯文本添加，只增不改，提升代码可读性与维护性。

## 模板注释

| 场景     | 注释格式                  | 示例                            |
| -------- | ------------------------- | ------------------------------- |
| 根节点   | `<!-- 组件名称 -->`       | `<!-- UserCard -->`             |
| 循环节点 | `<!-- 循环: 描述 -->`     | `<!-- 循环: 用户列表 -->`       |
| 条件分支 | `<!-- 条件: 描述 -->`     | `<!-- 条件: 有数据时 -->`       |
| 关键区块 | `<!-- 区块名称 -->`       | `<!-- 操作按钮组 -->`           |
| 插槽节点 | `<!-- 插槽: name -->`     | `<!-- 插槽: default -->`        |
| 动态组件 | `<!-- 动态组件: 描述 -->` | `<!-- 动态组件: 标签页内容 -->` |

### 模板示例

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

## 脚本注释

- **JSDoc**：关键方法必填（包含参数、返回值、简要描述）
- **行内注释**：复杂逻辑补充 `// prop名:` / `// 属性名:` / `// computed:` 等说明
- **要求**：中文描述，行内注释 ≤1 行，JSDoc ≤5 行

### 脚本注释对照表

| 内容     | 注释格式               | 示例                              |
| -------- | ---------------------- | --------------------------------- |
| 组件名称 | `// name: 组件名`      | `// name: UserCard`               |
| props    | `// prop名: 描述`      | `// user: 用户信息`               |
| data     | `// 属性名: 描述`      | `// searchQuery: 搜索查询参数`    |
| computed | `// computed: 描述`    | `// computed: 是否全选`           |
| watch    | `// watch: 描述`       | `// watch: 监听用户输入`          |
| methods  | `// methods: 描述`     | `// methods: 提交表单`            |
| provide  | `// 提供的键名: 描述`  | `// appConfig: 全局配置`          |
| inject   | `// 注入的键名: 描述`  | `// parentData: 父组件提供的数据` |

### Props 注释示例

```javascript
props: {
  // userId: 用户ID
  userId: {
    type: [String, Number],
    required: true
  },
  // isLoading: 加载状态
  isLoading: {
    type: Boolean,
    default: false
  }
}
```

### 脚本区完整示例

```javascript
export default {
  name: "UserCard",

  components: {},

  props: {
    // user: 用户信息
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      // searchQuery: 搜索查询参数
      searchQuery: {
        username: "", // 用户名
        email: "", // 邮箱
      },
    };
  },

  computed: {
    // computed: 是否全选
    isSelected() {
      return this.selectedItems.length === this.totalItems;
    },
  },

  watch: {
    /**
     * 监听用户输入变化
     * @description 监听用户名输入变化
     * @param {string} newVal - 新值
     * @param {string} oldVal - 旧值
     */
    searchQuery: {
      handler(newVal, oldVal) {
        // 处理搜索关键词变化
      },
      immediate: true,
    },
  },

  methods: {
    // methods: 提交表单
    submitForm() {
      // ...
    },

    /**
     * 获取用户列表
     * @description 从 API 获取用户数据并更新状态
     * @returns {Promise<void>}
     */
    async fetchData() {
      // ...
    },
  },

  mounted() {
    this.fetchData();
  },
};
```

## 关键注释场景映射

| 场景         | 注释方式               |
| ------------ | ---------------------- |
| 接口请求     | JSDoc + 行内说明目的   |
| 复杂判断     | 行内注释说明条件       |
| 特殊业务逻辑 | JSDoc 说明为什么这么做 |
| 兼容处理     | 行内注释说明兼容逻辑   |

## 样式注释

| 场景     | 注释格式              | 示例                    |
| -------- | --------------------- | ----------------------- |
| 模块分组 | `/* 模块名称 */`      | `/* 用户卡片 */`        |
| 子模块   | `/* 模块 > 子模块 */` | `/* 用户卡片 > 头部 */` |
| 响应式   | `/* 响应式 */`        | `/* 响应式 */`          |

### 样式注释示例

```scss
<style scoped>
/* 用户卡片 */
.user-card {
  padding: 16px;
  border-radius: 8px;

  /* 用户卡片 > 头部 */
  .user-card__header {
    font-weight: bold;

    /* 响应式 */
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
}
</style>
```
