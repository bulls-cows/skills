
# Vue3 性能优化差异（Vue3 特有）

> 通用性能优化规范（加载/运行/构建三阶段、Web Vitals 指标、性能检测工具等）详见 [performance.md](../common/performance.md)，本文件仅承载 Vue3 与通用规范不同的内容。

## 一、组件懒加载使用 `defineAsyncComponent`

Vue3 中大组件懒加载使用 `defineAsyncComponent` 动态导入，路由页面使用 `() => import()` 惰性加载：

```typescript
import { defineAsyncComponent } from 'vue'

const HeavyComponent = defineAsyncComponent(() => import('./HeavyComponent.vue'))
```

```typescript
// 路由懒加载
const routes = [
  {
    path: '/home',
    component: () => import('./views/Home.vue'),
  },
]
```

---

## 二、响应式性能使用 `shallowRef`

- 优先使用 `computed` 派生状态，减少 `watch` 滥用
- 大型数据列表考虑使用 `shallowRef` 减少深层响应式开销
- 避免在 `watch` 中执行同步 DOM 操作

```typescript
import { shallowRef } from 'vue'

// 大数据列表用 shallowRef，避免深层响应式追踪开销
const longList = shallowRef<IUserItem[]>([])

const loadList = async () => {
  const { code, data } = await apiGetUserList()
  if (code === 0) {
    longList.value = data.list // 整体替换触发更新
  }
}
```

---

## 三、自定义指令清理（`unmounted` 钩子）

Vue3 自定义指令在 `unmounted` 钩子中必须清理事件监听器和定时器：

```typescript
app.directive('focus', {
  mounted(el: HTMLInputElement) {
    el.focus()
  },
  unmounted(el: HTMLInputElement) {
    // 清理逻辑（事件监听、定时器等）
  },
})
```

> Vue3 指令钩子名与 Vue2 不同：Vue3 使用 `mounted`/`unmounted`，Vue2 使用 `inserted`/`unbind`。

---

## 四、相关模块引用

| 模块           | 路径                                  |
| -------------- | ------------------------------------- |
| 通用性能优化   | [performance.md](../common/performance.md) |
| Vue3 响应式    | [reactivity.md](./reactivity.md)      |
| Vue3 CSS 差异  | [css.md](./css.md)                     |
