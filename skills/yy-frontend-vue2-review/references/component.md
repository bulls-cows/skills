# Vue2 组件规范

**严重程度**：🟡 中等

## 1. 脚本结构顺序

Vue2 组件的 `export default` 内部必须严格遵循以下顺序：

1. `name`
2. `components`
3. `props`
4. `data`
5. `computed`
6. `watch`
7. `methods`
8. 生命周期钩子

**生命周期标准顺序**：
`beforeCreate` → `created` → `beforeMount` → `mounted` → `beforeUpdate` → `updated` → `activated` → `deactivated` → `beforeDestroy` → `destroyed`

**示例**：
```javascript
export default {
  name: 'UserCard',
  components: { UserAvatar },
  props: {
    userId: { type: String, required: true }
  },
  data() {
    return { isLoading: false }
  },
  computed: {
    userName() { /* ... */ }
  },
  watch: {
    userId() { /* ... */ }
  },
  methods: {
    fetchData() { /* ... */ }
  },
  mounted() {
    this.fetchData()
  }
}
```

---

## 2. 模板元素特性顺序

模板中元素特性必须按以下顺序排列：

1. `is`
2. `v-for`
3. `v-if` / `v-else-if` / `v-else`
4. `v-show` / `v-cloak`
5. `id`
6. `props` / `attrs`
7. `v-on`（事件监听）
8. `v-html` / `v-text`

**示例**：
```vue
<template>
  <UserCard
    v-for="item in list"
    :key="item.id"
    :user-id="item.userId"
    :is-loading="item.loading"
    @click="onClickCard(item)"
  />
</template>
```

---

## 3. Props 规范

### 命名规范
- 使用 camelCase 命名（JavaScript 侧）
- 模板中自动转换为 kebab-case

### 类型要求
- 类型必须明确指定：`String`、`Number`、`Boolean`、`Array`、`Object`、`Function`
- 推荐提供默认值（非 required 时）

### 注释要求
- 必须添加含义注释说明用途

**示例**：
```javascript
props: {
  // 用户 ID，必填
  userId: {
    type: String,
    required: true
  },
  // 是否显示加载状态
  isLoading: {
    type: Boolean,
    default: false
  },
  // 用户数据对象
  userData: {
    type: Object,
    default: () => ({})
  }
}
```

---

## 4. Emit 事件规范

### 顺序
`input` → 其它自定义事件 → `change` / `click` 等交互事件。

### 白名单
Emit 事件名必须在以下白名单范围内或为其合理派生：

| 类别 | 白名单事件 |
|------|-----------|
| **交互类** | `change`、`click`、`select`、`expand`、`input`、`clear`、`remove`、`add` |
| **弹窗类** | `open`、`close`、`show`、`hide` |
| **操作类** | `cancel`、`confirm`、`ok`、`editSuccess`、`error` |

### 生命周期 emit 限制
- **基础组件**：禁止在生命周期钩子中 emit 事件
- **业务组件**：允许但不推荐在生命周期中 emit

---

## 5. v-slot 语法

使用动态风格（`#` 或 `v-slot:`），避免废弃语法。

**正确示例**：
```vue
<template #header>
  <h1>标题</h1>
</template>

<template v-slot:default="slotProps">
  <span>{{ slotProps.text }}</span>
</template>
```

**错误示例**：
```vue
<template slot="header">
  <!-- 已废弃 -->
</template>
```

---

## 6. 组件命名

- **模板引用**：使用 PascalCase，如 `<UserList />`
- 允许单个单词，但推荐多单词组合以增强语义
- **文件名**：必须为多个单词 + PascalCase，如 `UserList.vue`
- 避免单单词文件名（如 `User.vue` → 改为 `UserCard.vue`）

---

## 7. data / computed 使用原则

- 除后端交互数据和部分定时器场景外，其它数据一律尽可能使用 `computed`
- 避免在 `data` 中存储可推导的值

**正确示例**：
```javascript
// 可推导的值使用 computed
computed: {
  isDisabled() {
    return this.loading || !this.formValid
  }
}
```

**错误示例**：
```javascript
// 可推导的值不应放在 data 中
data() {
  return {
    isDisabled: false // ❌ 应移到 computed
  }
}
```

---

## 8. 模块化原则

- **单一职责**：每个组件只做一件事
- **高内聚低耦合**：相关逻辑内聚，无关逻辑分离
- 超过 500 行的组件应考虑拆分
