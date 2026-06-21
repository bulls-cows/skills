
# Vue 侦听器通用规则（Vue2/Vue3 共享）

> 本规范涵盖 Vue2 与 Vue3 通用的 watch 理念：深度监听、立即执行、资源清理、与 computed 的选择策略。每个理念点并列给出 Vue2（Options API `watch` 选项）与 Vue3（`watch()` 函数）写法。框架特定差异（如 Vue3 的 `watchEffect`、Vue2 的字符串路径监听）详见各自框架文档。

---

## 一、基本规则

- **深度监听**：监听对象/数组内部变化必须开启深度监听（Vue2 `deep: true`、Vue3 `deep: true`）
- **立即执行**：初始化就需要触发回调时，必须声明立即执行（Vue2 `immediate: true`、Vue3 `immediate: true`）
- **清理资源**：watch 内部创建的定时器、事件监听必须在组件销毁时清理（见[第四节](#四资源清理)）

---

## 二、watch 使用规范

### 2.1 基本写法

**Vue2（Options API `watch` 选项）**：

```javascript
export default {
  data() {
    return {
      count: 0,
      a: 0,
      b: 0,
      user: { name: '' },
    }
  },
  watch: {
    // 监听单个 data 属性
    count(newVal, oldVal) {
      console.log('count changed:', newVal, oldVal)
    },
    // 监听对象深层属性：必须用字符串路径
    'user.name'(newVal) {
      console.log('name changed:', newVal)
    },
  },
}
```

**Vue3（`watch()` 函数）**：

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

### 2.2 配置选项

**Vue2**：

```javascript
export default {
  watch: {
    user: {
      handler(newVal, oldVal) {
        // 处理变化
      },
      deep: true, // 深度监听（对象/数组必须声明）
      immediate: true, // 立即执行（初始化需触发时添加）
    },
  },
}
```

**Vue3**：

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

### 2.3 注释规范

Vue2/Vue3 的 watch 注释格式一致，按 [comments.md](./comments.md) 标注：

**Vue2**：

```javascript
export default {
  watch: {
    // watch: 监听用户输入变化
    searchQuery(newVal) {
      this.fetchSuggestions(newVal)
    },
  },
}
```

**Vue3**：

```typescript
// watch: 监听用户输入变化
watch(searchQuery, (newVal) => {
  fetchSuggestions(newVal)
})
```

---

## 三、watch 与 computed 选择策略

watch 中的派生逻辑应优先使用 `computed` 替代，利用其缓存机制避免重复计算。

| 场景                           | 推荐 | 说明                              |
| ------------------------------ | ---- | --------------------------------- |
| 由现有状态派生新值             | computed | 声明式、可缓存、自动追踪          |
| 值变化时执行副作用（请求、日志、DOM 操作） | watch | 响应式副作用的正确归宿            |
| 一个值变化引起多个副作用       | watch | 可注册多个 watcher                |
| 多个值变化共同触发一个副作用   | watch | 多源监听                          |

各框架的 computed 优先策略、风险分析与选择指南详见：

- Vue2：[vue2/reactivity.md](../vue2/reactivity.md)
- Vue3：[vue3/reactivity.md](../vue3/reactivity.md#三computed-规范)

---

## 四、资源清理

watch 内部创建的定时器、事件监听必须在组件销毁时清理，避免内存泄漏。

### 4.1 定时器清理

**Vue2（`beforeDestroy` 钩子）**：

```javascript
export default {
  data() {
    return {
      timer: null,
    }
  },
  watch: {
    startPolling(isActive) {
      if (isActive) {
        this.timer = setInterval(() => {
          this.fetchData()
        }, 5000)
      } else if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
  },
  // 组件销毁时清理
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
}
```

**Vue3（`onBeforeUnmount` 钩子）**：

```typescript
const timer = ref<number | null>(null)

watch(startPolling, (isActive) => {
  if (isActive) {
    timer.value = setInterval(() => {
      fetchData()
    }, 5000)
  } else if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})

// 组件销毁时清理
onBeforeUnmount(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
```

### 4.2 事件监听清理

**Vue2**：

```javascript
export default {
  watch: {
    isListening(isActive) {
      if (isActive) {
        window.addEventListener('resize', this.handleResize)
      } else {
        window.removeEventListener('resize', this.handleResize)
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      /* ... */
    },
  },
}
```

**Vue3**：

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

## 五、代码组织位置

watch 在脚本中的位置按各框架的结构顺序规范执行：

- Vue2：详见 [vue2/order.md](../vue2/order.md#二script-内部结构顺序)（Options API 第 6 位：`name` → `components` → `props` → `data()` → `computed` → `watch` → `methods` → 生命周期钩子）
- Vue3：详见 [vue3/order.md](../vue3/order.md#二script-setup-内部结构顺序)（业务模块组内顺序：`ref`/`reactive` → `computed` → 方法 → `watch` → 生命周期钩子）

---

## 六、框架特定差异

| 内容                      | Vue2 详见                                              | Vue3 详见                                                 |
| ------------------------- | ------------------------------------------------------ | --------------------------------------------------------- |
| watch 选项写法与限制      | [vue2/watch.md](../vue2/watch.md)                      | 不适用（Vue3 用 `watch()` 函数，见下方）                  |
| 字符串路径监听深层属性    | [vue2/watch.md](../vue2/watch.md#三vue2-特有字符串路径监听) | 不适用（Vue3 用 getter 函数）                             |
| `watchEffect` 自动追踪    | 不适用                                                 | [vue3/watch.md](../vue3/watch.md#一watcheffect-使用规范)  |
| watch vs watchEffect 对比 | 不适用                                                 | [vue3/watch.md](../vue3/watch.md#二watch-vs-watcheffect-对比) |
| `flush` 刷新时机选项      | 不适用                                                 | [vue3/watch.md](../vue3/watch.md#三watch-特有选项)        |
