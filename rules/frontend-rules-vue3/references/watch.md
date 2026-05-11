# watch/watchEffect 监听规范

本模块定义 Vue3 `watch` 和 `watchEffect` 的使用规范。

## 一、watch 与 computed 选择策略

| 场景 | 推荐方式 | 原因 |
|------|----------|------|
| 派生计算（无副作用） | `computed` | 自动缓存，仅在依赖变化时重新计算 |
| 副作用操作（API 请求、DOM 操作） | `watch` | 需要执行异步或外部副作用 |
| 响应式数据同步到非响应式变量 | `watch` | 需要显式监听变化 |

**原则**：能用 `computed` 解决的不用 `watch`。

## 二、watch 使用规范

### 2.1 深度监听

对象/数组变化必须声明 `deep: true`：

```typescript
watch(searchQuery, (newVal, oldVal) => {
  // 处理搜索关键词变化
}, { deep: true });
```

### 2.2 立即执行

初始化需触发时加 `immediate: true`：

```typescript
watch(searchQuery, (newVal, oldVal) => {
  // 处理搜索关键词变化
}, { immediate: true });
```

### 2.3 清理资源

定时器、事件监听器必须在组件销毁时清理：

```typescript
watch(source, (newVal) => {
  const timer = setTimeout(() => { /* ... */ }, 1000);

  // 返回清理函数
  return () => clearTimeout(timer);
});

// 或使用生命周期钩子
import { onBeforeUnmount } from 'vue';

let timer: ReturnType<typeof setTimeout>;
watch(source, () => {
  timer = setTimeout(() => { /* ... */ }, 1000);
});

onBeforeUnmount(() => {
  clearTimeout(timer);
});
```

## 三、watchEffect 使用规范

- `watchEffect` 自动追踪所有响应式依赖，无需显式指定监听源
- 适用于简单副作用场景
- 同样需要返回清理函数

```typescript
watchEffect(() => {
  const id = props.userId;
  // 自动追踪 userId 变化
  apiGetUserInfo(id).then(/* ... */);
});
```

## 四、watch 与 watchEffect 对比

| 特性 | watch | watchEffect |
|------|-------|-------------|
| 依赖声明 | 显式指定 | 自动追踪 |
| 新旧值 | 可获取 `(newVal, oldVal)` | 不可获取 |
| 惰性执行 | 默认惰性，可 `immediate: true` | 立即执行 |
| 适用场景 | 精确控制监听源 | 简单副作用 |

**推荐**：优先使用 `watch`，需要自动追踪时使用 `watchEffect`。
