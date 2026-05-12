# 数据流与状态管理

## data 与 computed 使用原则

- 除后端交互数据和部分定时器外，一律尽可能使用 `computed`
- 减少冗余 data 属性，优先派生计算

## computed 规范

- 必须使用 `try/catch` 包裹
- 命名使用 `is` / `has` / `visible` 或有意义的名称

## 响应式陷阱

| 场景 | 错误写法 | 正确写法 |
|------|----------|----------|
| 新增对象属性 | `this.obj.newKey = val` | `this.$set(this.obj, 'newKey', val)` |
| 数组索引赋值 | `this.arr[i] = val` | `this.$set(this.arr, i, val)` |
| 数组长度修改 | `this.arr.length = n` | `this.arr.splice(n)` |

## $nextTick 使用时机

- **场景**：DOM 更新后需操作 DOM 元素
- **用法**：`this.$nextTick(() => { /* DOM 操作 */ })`
- **禁止**：用 `setTimeout` 替代

## watch 规范

- **深度监听**：对象/数组变化必须声明 `deep: true`
- **立即执行**：初始化需触发时加 `immediate: true`
- **清理资源**：定时器、事件监听在组件销毁时清理

## eventBus 规范

- 必须在 `beforeDestroy` 中 `$off()` 移除监听，防止内存泄漏
- 事件名使用小驼峰：`userChange`、`formSubmit`

## Vuex 模块规范

- 每个模块开启 `namespaced: true`
- `mutation` 仅做同步状态变更，禁止异步操作
- 异步操作统一放 `action`
- `getter` 用于派生状态
