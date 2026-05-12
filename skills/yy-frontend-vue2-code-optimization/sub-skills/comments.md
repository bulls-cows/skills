# T02 📝 文档与注释增强（🟢 零风险）

**定位**：🟢 零风险。纯文本添加，只增不改，提升代码可读性与维护性。适用于 `.vue`、`.js` 文件。

## 相关规则

执行本任务前，请先阅读以下规则文件（位于 `rules/` 目录），按优先级从高到低排列：

- **`rules/spec-index.md`**：Vue2 前端项目开发规范总纲（必读）
- **`rules/comments.md`**：模板区/脚本区/样式区注释格式、JSDoc 示例、注释保护原则

## 注释保护原则（核心）

> **已有注释若内容正确或与本次理解相近，禁止改动原有注释。**

注释增强应以**增量补充**为第一原则，仅在以下 **3 种情况**才允许修改原有注释：

| 可修改情况 | 判定标准 | 示例 |
| ---------- | -------- | ---- |
| **注释明显错误** | 注释描述的行为与代码实际行为不一致 | 注释写"获取用户列表"，但实际调用的是 `apiDeleteUser` |
| **业务逻辑已发生实质性变更** | 代码的业务含义已完全不同，旧注释不再适用 | 旧注释"提交订单"，代码已全部改为"提交退款申请" |
| **命名导致注释引用失效** | 注释中引用了已被重命名或删除的标识符 | 注释提到 `oldName`，但变量已更名为 `newName` |

**禁止修改的常见场景**：

- 仅因注释风格不同（如"获取数据" vs "请求用户列表接口"）
- 仅因表述方式有差异但含义一致
- 注释描述正确但不够详细（应在其下方追加补充，而非覆盖）
- 注释中有轻微语法错误但含义清晰的（如错别字但不影响理解）

**修改操作规范**：

- 属于上述 3 种情况的修改，仍应保留原有描述的核心含义，仅在原基础上微调
- 不属于上述情况的，一律**只增不改**——在有注释的代码块附近追加新注释，不触碰旧注释

## 模板注释

| 场景 | 注释格式 | 示例 |
| ---- | ------------------------- | ------------------------------- |
| 根节点 | `<!-- 组件名称 -->` | `<!-- UserCard -->` |
| 循环节点 | `<!-- 循环: 描述 -->` | `<!-- 循环: 用户列表 -->` |
| 条件分支 | `<!-- 条件: 描述 -->` | `<!-- 条件: 有数据时 -->` |
| 关键区块 | `<!-- 区块名称 -->` | `<!-- 操作按钮组 -->` |
| 插槽节点 | `<!-- 插槽: name -->` | `<!-- 插槽: default -->` |
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

    <!-- 插槽: extra -->
    <slot name="extra"></slot>
  </div>
</template>
```

## 脚本区注释

### Options API 注释格式

| 内容 | 注释格式 | 示例 |
| ---- | -------- | ---- |
| 组件名称 | `// name: 组件名` | `// name: UserCard` |
| 组件引入 | `// component: 组件名` | `// component: UserCard` |
| props | `// prop名: 描述` | `// user: 用户信息` |
| data | `// 属性名: 描述` | `// searchQuery: 搜索查询参数` |
| computed | `// computed: 描述` | `// computed: 是否全选` |
| watch | `// watch: 描述` | `// watch: 监听用户输入` |
| methods | `// methods: 描述` | `// methods: 提交表单` |
| provide | `// 提供的键名: 描述` | `// appConfig: 全局配置` |
| inject | `// 注入的键名: 描述` | `// parentData: 父组件提供的数据` |

### Options API 示例

```javascript
export default {
  // name: 用户列表页面
  name: 'UserListPage',

  components: {
    // component: UserCard
    UserCard,
    // component: SearchBar
    SearchBar,
  },

  props: {
    // userId: 用户ID
    userId: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      // searchQuery: 搜索查询参数
      searchQuery: '',
      // dataSource: 数据源列表
      dataSource: [],
      // loading: 加载状态
      loading: false,
    };
  },

  computed: {
    // computed: 是否显示搜索按钮
    isShowSearch() {
      return this.searchQuery.length > 0;
    },
  },

  watch: {
    // watch: 监听用户输入变化
    searchQuery(newVal) {
      this.fetchSuggestions(newVal);
    },
  },

  methods: {
    // methods: 获取数据
    fetchData() {
      // ...
    },
    // methods: 搜索处理
    handleSearch() {
      // ...
    },
  },

  // 生命周期钩子
  created() {
    this.fetchData();
  },
};
```

## 样式区注释

| 场景 | 注释格式 | 示例 |
| ---- | -------- | ---- |
| 模块分组 | `/* 模块名称 */` | `/* 用户卡片 */` |
| 子模块 | `/* 模块 > 子模块 */` | `/* 用户卡片 > 头部 */` |
| 响应式 | `/* 响应式 */` | `/* 响应式 */` |
| 全局样式 | `/* 全局 */` | 非 scoped 标注 |

### 样式示例

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

## JSDoc（关键方法必填）

```javascript
/**
 * 方法名称
 * @description 方法的简要描述
 * @param {类型} 参数名 - 参数描述
 * @returns {类型} 返回值描述
 */
```

**注释要求**：中文描述；行内不超过一行；JSDoc 不超过 5 行；无冗余注释。
