# Vue2 侦听器规范（watch 选项）

> 通用 watch 理念（深度监听、立即执行、资源清理、与 computed 的选择策略）详见 [common-vue-watch.md](./common-vue-watch.md)，本文件仅承载 Vue2 特有内容。

## 前置阅读

- [common-vue-watch.md](./common-vue-watch.md) — Vue 侦听器通用规则（Vue2/Vue3 共享）

---

## 一、Vue2 watch 选项写法

Vue2 通过 Options API 的 `watch` 选项声明侦听器：`key` 为 `data`/`computed`/`props` 字段名，`value` 为处理逻辑。

### 1.1 三种 value 形式

```javascript
export default {
  data() {
    return {
      searchQuery: '',
      user: { name: '' },
    }
  },
  watch: {
    // 形式 1：方法简写（仅监听字段名本身的变化，无配置项）
    // watch: 监听用户输入变化
    searchQuery(newVal, oldVal) {
      this.fetchSuggestions(newVal)
    },

    // 形式 2：对象形式（需要 deep/immediate 配置时使用）
    // watch: 深度监听用户对象
    user: {
      handler(newVal, oldVal) {
        this.handleUserChange(newVal)
      },
      deep: true,
      immediate: true,
    },

    // 形式 3：字符串方法名（handler 指向 methods 中的方法）
    // watch: 监听搜索词变化
    searchQuery: 'onSearchQueryChange',
  },
  methods: {
    onSearchQueryChange(newVal, oldVal) {
      this.fetchSuggestions(newVal)
    },
  },
}
```

---

## 二、Vue2 特有：handler 规范

- `handler` 必须是 `methods` 中已声明的方法，或对象形式中的内联函数
- **禁止**直接使用未声明的箭头函数（会丢失 `this` 上下文）

```javascript
export default {
  watch: {
    // ✅ 正确：对象形式内联 handler
    user: {
      handler(newVal) {
        this.handleUserChange(newVal)
      },
      deep: true,
    },

    // ✅ 正确：字符串方法名指向 methods
    user: 'handleUserChange',

    // ❌ 错误：箭头函数丢失 this
    // user: (newVal) => { this.handleUserChange(newVal) },
  },
  methods: {
    handleUserChange(newVal) {
      /* ... */
    },
  },
}
```

---

## 三、Vue2 特有：字符串路径监听

监听对象深层属性或数组元素时**必须使用字符串路径**——Vue2 `watch` 选项不支持 getter 函数，这是与 Vue3 `watch()` 的关键差异。

```javascript
export default {
  data() {
    return {
      user: {
        profile: {
          name: '',
        },
      },
      list: ['a', 'b', 'c'],
    }
  },
  watch: {
    // ✅ 正确：用点号字符串路径监听深层属性
    'user.profile.name'(newVal) {
      console.log('name changed:', newVal)
    },

    // ❌ 错误：Vue2 watch 选项不支持 getter 函数
    // () => this.user.profile.name(newVal) { }
  },
}
```

> 若需监听复杂表达式或多个源，改用 `computed` 派生中间值后监听该计算属性，详见 [vue2-reactivity.md](./vue2-reactivity.md)。

---

## 四、相关模块引用

| 内容               | 详见                                                   |
| ------------------ | ------------------------------------------------------ |
| 通用 watch 理念    | [common-vue-watch.md](./common-vue-watch.md)           |
| 注释规范           | [common-comments.md](./common-comments.md)             |
| 脚本结构顺序       | [vue2-order.md](./vue2-order.md#二script-内部结构顺序) |
| 响应式陷阱（$set） | [vue2-reactivity.md](./vue2-reactivity.md)             |
