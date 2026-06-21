
# Vue3 侦听器规范（watch/watchEffect）

> 通用 watch 理念（深度监听、立即执行、资源清理、与 computed 的选择策略）详见 [vue-watch.md](../common/vue-watch.md)，本文件仅承载 Vue3 特有内容：`watchEffect`、`watch` 与 `watchEffect` 的选择、`flush` 选项。

## 前置阅读

- [vue-watch.md](../common/vue-watch.md) — Vue 侦听器通用规则（Vue2/Vue3 共享）

---

## 一、watchEffect 使用规范

`watchEffect` 是 Vue3 独有的组合式 API，自动追踪依赖，适合简单副作用场景：

```typescript
// 正确：简单副作用
watchEffect(() => {
  document.title = `欢迎, ${userName.value}`
})

// 不推荐：复杂逻辑或多依赖
watchEffect(() => {
  if (isLoading.value) return
  if (!userData.value) return
  // 过多逻辑应拆分为 watch 或普通函数
})
```

---

## 二、watch vs watchEffect 对比

| 特性     | watch                          | watchEffect |
| -------- | ------------------------------ | ----------- |
| 依赖声明 | 显式指定                       | 自动追踪    |
| 新旧值   | 可获取 `(newVal, oldVal)`      | 不可获取    |
| 惰性执行 | 默认惰性，可 `immediate: true` | 立即执行    |
| 适用场景 | 精确控制监听源                 | 简单副作用  |

**推荐**：优先使用 `watch`，需要自动追踪时使用 `watchEffect`。

---

## 三、watch 特有选项

Vue3 的 `watch()` 第三参数支持 `flush` 选项（Vue2 的 `watch` 选项无此能力）：

```typescript
watch(
  source,
  (newVal, oldVal) => {
    // 处理变化
  },
  {
    flush: 'post', // 刷新时机（默认 'pre'，DOM 更新前）
  },
)
```

| `flush` 值 | 执行时机        | 适用场景                  |
| ---------- | --------------- | ------------------------- |
| `'pre'`（默认） | DOM 更新前      | 大多数场景                |
| `'post'`        | DOM 更新后      | 需要访问更新后 DOM 的副作用 |
| `'sync'`        | 同步执行        | 需要极高时效性（慎用）    |

---

## 四、相关模块引用

| 内容              | 详见                                                  |
| ----------------- | ----------------------------------------------------- |
| 通用 watch 理念   | [vue-watch.md](../common/vue-watch.md)                |
| 注释规范          | [comments.md](../common/comments.md)                  |
| computed 选择策略 | [reactivity.md](./reactivity.md#三computed-规范)      |
| 代码组织位置      | [order.md](./order.md#二script-setup-内部结构顺序)    |
