# Vue2 组件交互与通信规范

---

## 一、Props 定义规范

### 1. 基础定义

- Options API 写法，明确 `type` + `default` + 中文注释
- 命名必须 `camelCase`
- **禁止修改 Props**（只读访问），单向数据流（父→子）
- 可以解构（需注意响应式丢失问题）

```javascript
export default {
  props: {
    // userId: 用户ID
    userId: {
      type: [String, Number],
      required: true,
    },
    // isLoading: 加载状态
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
}
```

### 2. v-model 写法

- **Vue 2 标准**：`value` 配合 `this.$emit('input', newVal)`

### 3. 使用限制

- **禁止修改 Props**：子组件内不得直接修改 `props` 值
- **数据流向**：单向数据流（父 → 子），修改父级状态须通过 Emit 事件通知

---

## 二、Emit 事件规范

### 1. 事件白名单（4 类）

仅允许使用以下语义化事件名：

| 类别        | 事件名                                                          |
| ----------- | --------------------------------------------------------------- |
| **v-model** | `input`                                                         |
| **交互类**  | `change`, `click`, `select`, `expand`, `clear`, `remove`, `add` |
| **弹窗类**  | `open`, `close`, `show`, `hide`                                 |
| **操作类**  | `cancel`, `confirm`, `ok`, `editSuccess`, `error`               |

### 2. Emit 顺序

对外触发事件建议遵循以下优先级：

1. `emit("input")`（v-model 更新）
2. `emit("其它")`（业务事件）
3. `emit("change/click")`（交互反馈）

### 3. 事件命名示例

```javascript
// ✅ 正确：语义化事件名
this.$emit('input', newValue)
this.$emit('change', item)
this.$emit('click', id)
```

---

## 三、对外暴露与访问

### 1. 基础组件

- **禁止**在生命周期函数中主动向外 emit

### 2. 业务型组件

- 允许但不推荐在生命周期中 emit

### 3. 父组件访问

- 父组件通过 `$refs` 访问子组件方法
- 子组件无需显式声明暴露（与 Vue3 `defineExpose` 不同）

```vue
<!-- 父组件 -->
<ChildComponent ref="childRef" />
```

```javascript
// 父组件中访问
this.$refs.childRef.someMethod()
```

---

## 四、组件间通信

### 1. provide/inject 规范

- **使用场景**：仅用于 3 层以上深层传参，避免逐层传递 props
- **兄弟组件通信**：使用 Vuex 或 eventBus，禁止通过 provide/inject 跨层级滥用
- **响应式传递**：`provide() { return { xxx: this.xxx } }` 保持响应式

### 2. eventBus

- 事件名使用小驼峰（`userChange`, `formSubmit`）
- `beforeDestroy` 中 `$off()` 清理监听器，防止内存泄漏

### 3. Vuex

- 模块必须 `namespaced: true`
- `mutation` 仅同步操作
- 异步操作放在 `action` 中
- `getter` 用于派生状态

---

## 五、禁用 $parent/$children

- **禁止** `$parent.$parent` 链式访问父组件数据
- **原因**：组件耦合度高，破坏组件独立性
- **替代方案**：使用 props/emit 或状态管理（Vuex/eventBus）
