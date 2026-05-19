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
    }
  },

  computed: {
    // computed: 是否显示搜索按钮
    isShowSearch() {
      return this.searchQuery.length > 0
    },
  },

  watch: {
    // watch: 监听用户输入变化
    searchQuery(newVal) {
      this.fetchSuggestions(newVal)
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

## 三、Import 分组（3 组）

Import 必须分为 3 组，组间空一行，组内按字母顺序排序：

1. **外部依赖**：`vue`, `dayjs`, `lodash` 等第三方库
2. **内部全局**：`@src/` 开头
3. **内部相对**：`./` 或 `../` 开头

**排序原则**：外部优先 → 全局在前 → 相对在后 → 组内按字母顺序

```javascript
// 1. node_modules
import Vue from 'vue'
import dayjs from 'dayjs'
import { debounce } from 'lodash'

// 2. 内部全局依赖（@src/）
import { apiGetUserInfo } from '@src/api/user'
import store from '@src/store'
import { APP_CONFIG } from '@src/constants'
import DataTable from '@src/components/DataTable'

// 3. 内部相对依赖（./）
import { localHelper } from './utils/helper'
import { MAX_RETRY_COUNT } from './constants'
import SearchBar from './SearchBar.vue'
```
