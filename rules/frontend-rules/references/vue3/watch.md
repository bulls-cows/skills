---
title: Vue3 侦听器规范（watch/watchEffect）
version: 2.0.0
lastUpdated: 2026-06-03
priority: 🟠 强烈推荐（必须遵循）
maintainer: bulls-cows team
---

# Vue3 侦听器规范（watch/watchEffect）

本规范涵盖 `watch`、`watchEffect` 的使用场景、配置选项、清理机制及与 `computed` 的选择策略。

---

## 一、基本规则

- **深度监听**：对象/数组变化必须声明 `deep: true`
- **立即执行**：初始化需触发时加 `immediate: true`
- **清理资源**：定时器、事件监听在组件销毁时清理

---

## 二、watch 使用规范

### 基本结构

```typescript
// 监听单个 ref
watch(count, (newVal, oldVal) => {
  console.log('count changed:', newVal, oldVal)
})

// 监听多个 ref
watch([a, b], ([newA, newB], [oldA, oldB]) => {
  console.log('a or b changed')
})

// 监听 reactive 对象的某个属性
const state = reactive({ user: { name: '' } })
watch(
  () => state.user.name,
  (newVal, oldVal) => {
    console.log('name changed:', newVal)
  },
)
```

### 配置选项

```typescript
watch(
  source,
  (newVal, oldVal) => {
    // 处理变化
  },
  {
    deep: true, // 深度监听（对象/数组必须声明）
    immediate: true, // 立即执行（初始化需触发时添加）
    flush: 'post', // 刷新时机（默认 'pre'，DOM 更新前）
  },
)
```

### 注释规范

watch 必须按注释规范标注（详见 `../comments.md`）：

```typescript
// watch: 监听用户输入变化
watch(searchQuery, (newVal) => {
  fetchSuggestions(newVal)
})
```

---

## 三、watchEffect 使用规范

`watchEffect` 自动追踪依赖，适合简单副作用场景：

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

## 四、watch 与 computed 选择策略

watch 中的派生逻辑应优先使用 `computed` 替代，详见 [reactivity.md](./reactivity.md#三computed-规范)（computed 优先策略、选择指南表格、风险分析）。

---

### watch vs watchEffect 对比

| 特性     | watch                          | watchEffect |
| -------- | ------------------------------ | ----------- |
| 依赖声明 | 显式指定                       | 自动追踪    |
| 新旧值   | 可获取 `(newVal, oldVal)`      | 不可获取    |
| 惰性执行 | 默认惰性，可 `immediate: true` | 立即执行    |
| 适用场景 | 精确控制监听源                 | 简单副作用  |

**推荐**：优先使用 `watch`，需要自动追踪时使用 `watchEffect`。

---

## 五、清理资源

### 定时器清理

```typescript
const timer = ref<number | null>(null)

watch(startPolling, (isActive) => {
  if (isActive) {
    timer.value = setInterval(() => {
      fetchData()
    }, 5000)
  } else {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }
})

// 组件销毁时清理
onBeforeUnmount(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
```

### 事件监听清理

```typescript
watch(isListening, (isActive) => {
  if (isActive) {
    window.addEventListener('resize', handleResize)
  } else {
    window.removeEventListener('resize', handleResize)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
```

---

## 六、在代码组织中的位置

watch 在 `<script setup>` 业务模块内部的位置，详见 [order.md](./order.md#二script-setup-内部结构顺序)（组内顺序：`ref`/`reactive` → `computed` → 方法 → `watch` → 生命周期钩子）。
