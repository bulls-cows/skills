# Vue2 代码组织与顺序规范

本规范定义 SFC 结构、Imports、脚本内部逻辑及模板属性的排列顺序。

---

## 一、SFC 块顺序

Vue2 单文件组件内部块顺序必须保持一致：

1. `<template>` → 2. `<script>` → 3. `<style scoped>`

---

## 二、`<script>` 内部结构顺序

Options API 脚本内的选项必须按以下宏观顺序排列：

| 步骤 | 内容         | 说明                                                  |
| ---- | ------------ | ----------------------------------------------------- |
| 1    | `name`       | 组件名称声明                                          |
| 2    | `components` | 局部组件注册                                          |
| 3    | `props`      | 父组件传入属性定义                                    |
| 4    | `data()`     | 组件内部状态                                          |
| 5    | `computed`   | 计算属性                                              |
| 6    | `watch`      | 侦听器                                                |
| 7    | `methods`    | 方法集合                                              |
| 8    | 生命周期钩子 | `created`, `mounted`, `beforeDestroy`, `destroyed` 等 |

### 完整示例

```javascript
export default {
  name: 'UserListPage',

  components: {
    UserCard,
    SearchBar,
  },

  props: {
    userId: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      searchQuery: '',
      dataSource: [],
      loading: false,
    }
  },

  computed: {
    isShowSearch() {
      return this.searchQuery.length > 0
    },
  },

  watch: {
    searchQuery(newVal) {
      this.fetchSuggestions(newVal)
    },
  },

  methods: {
    fetchData() {
      // ...
    },
    handleSearch() {
      // ...
    },
  },

  created() {
    this.fetchData()
  },

  mounted() {
    // DOM 操作
  },

  beforeDestroy() {
    // 清理定时器、事件监听器
  },
}
```

---

## 三、Import 分组

Import 分组规则详见 [common-code-style.md](./common-code-style.md#二导入排序规范)。

Vue2 推荐采用 4 组分组（与 Vue3、React 对齐）：外部依赖 → 类型导入 → 内部全局依赖 → 内部相对依赖，组间空一行，组内按字母顺序。历史项目若无独立类型导入组，可保留 3 组（合并类型导入到对应组）。
