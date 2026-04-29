# 注释规范

## 模板区（Template）注释

| 场景       | 注释格式                    | 示例                              |
| ---------- | --------------------------- | --------------------------------- |
| 根节点     | `<!-- 组件名称 -->`         | `<!-- UserCard -->`               |
| 循环节点   | `<!-- 循环: 描述 -->`       | `<!-- 循环: 用户列表 -->`         |
| 条件分支   | `<!-- 条件: 描述 -->`       | `<!-- 条件: 有数据时显示 -->`     |
| 关键区块   | `<!-- 区块名称 -->`         | `<!-- 操作按钮组 -->`             |
| 插槽节点   | `<!-- 插槽: name -->`       | `<!-- 插槽: default -->`          |
| 动态组件   | `<!-- 动态组件: 描述 -->`   | `<!-- 动态组件: 标签页内容 -->`   |

### 模板注释规则

- 注释放置在目标节点**上方**，独占一行
- 保持与目标节点相同的缩进级别
- 每条注释不超过一行
- `v-for` 和 `v-if` 同时存在时，优先标注循环节点
- 嵌套条件（`v-if` / `v-else-if` / `v-else`）只需在首个节点标注

### 示例

```html
<template>
  <!-- UserList -->
  <div class="user-list">
    <!-- 搜索表单区域 -->
    <el-form :model="searchForm">
      <el-form-item label="用户名">
        <el-input v-model="searchForm.username" />
      </el-form-item>
    </el-form>

    <!-- 循环: 用户数据表格 -->
    <el-table :data="userList">
      <el-table-column prop="name" label="姓名" />
      <!-- 条件: 有操作权限时 -->
      <el-table-column v-if="hasPermission" label="操作">
        <template slot-scope="{ row }">
          <el-button @click="handleEdit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 插槽: 分页区域 -->
    <slot name="pagination" />
  </div>
</template>
```

---

## 脚本区（Script）注释

### 组件头部 JSDoc

每个 Vue 组件 `<script>` 顶部应包含：

```javascript
/**
 * 组件名称
 * @description 组件职责简述
 */
```

### 属性注释格式

| 内容           | 注释格式                                     | 示例                              |
| -------------- | -------------------------------------------- | --------------------------------- |
| 组件名称       | `// name: 组件名`                            | `// name: UserCard`               |
| 引入组件       | `// component: 组件名`                       | `// component: UserCard`          |
| props          | `// prop名: 描述`                            | `// user: 用户信息对象`           |
| data           | `// 属性名: 描述`                            | `// searchQuery: 搜索查询参数`    |
| computed       | `// 计算属性名: 描述`                        | `// computed: 是否全选状态`       |
| watch          | `// 监听器名: 描述`（关键监听器用 JSDoc）    | `// watch: 监听搜索条件变化`      |
| methods        | `// 方法名: 描述`（关键方法用 JSDoc）        | `// methods: 提交表单数据`        |
| 生命周期       | `// lifecycle: 阶段`                         | `// lifecycle: mounted`           |
| provide        | `// provide.键名: 描述`                      | `// provide.appConfig: 全局配置`  |
| inject         | `// inject.键名: 描述`                       | `// inject.parentData: 父组件数据`|

### JSDoc 格式（关键方法/监听器/组件必填）

```javascript
/**
 * 方法名称
 * @description 方法职责简述
 * @param {类型} 参数名 - 参数说明
 * @returns {类型} 返回值说明
 */
```

### JSDoc 规则

- 关键方法（接口请求、复杂业务逻辑、对外暴露方法）必须使用 JSDoc
- 简单方法（赋值、格式转换、纯展示逻辑）使用行内注释即可
- JSDoc 总行数不超过 5 行
- `@param` 和 `@returns` 类型使用简写（`String`、`Number`、`Boolean`、`Object`、`Array`、`Function`）

### 示例

```javascript
<script>
/**
 * UserCard
 * @description 展示用户基本信息及操作入口
 */
export default {
  // name: UserCard
  name: 'UserCard',

  // component: Icon, UserAvatar
  components: { Icon, UserAvatar },

  // props
  props: {
    // user: 用户信息对象
    user: {
      type: Object,
      required: true
    },
    // editable: 是否允许编辑
    editable: {
      type: Boolean,
      default: false
    }
  },

  // data
  data() {
    return {
      // isLoading: 加载状态
      isLoading: false,
      // activeTab: 当前激活的标签页
      activeTab: 'info'
    }
  },

  // computed
  computed: {
    // computed: 用户全名
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`
    }
  },

  // watch
  watch: {
    /**
     * 监听用户ID变化
     * @description 重新加载用户信息
     * @param {string} newVal - 新用户ID
     */
    'user.id'(newVal) {
      this.fetchUserInfo()
    }
  },

  // methods
  methods: {
    /**
     * 获取用户信息
     * @description 调用接口加载用户详情
     */
    async fetchUserInfo() {
      this.isLoading = true
      try {
        const { data } = await apiGetUser(this.user.id)
        this.userData = data
      } finally {
        this.isLoading = false
      }
    },
    // methods: 处理编辑操作
    handleEdit() {
      this.$emit('edit', this.user)
    }
  },

  // lifecycle: created
  created() {
    this.fetchUserInfo()
  },

  // lifecycle: mounted
  mounted() {
    this.$nextTick(() => {
      this.initDom()
    })
  }
}
</script>
```

---

## 禁止项

- 不添加空注释：没有关键内容的区块不强制注释
- 不使用冗余注释：代码本身能说明意图的不写注释
- 注释必须使用中文（标识符除外）
- 模板注释和样式注释不超过一行
- JSDoc 注释不超过五行
