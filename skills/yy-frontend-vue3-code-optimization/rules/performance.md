# Vue3 性能优化规范

本规范涵盖组件懒加载、缓存、虚拟滚动、防抖节流、图片优化及路由懒加载等性能优化手段。

---

## 一、组件懒加载

- 大组件使用 `defineAsyncComponent` 动态导入
- 路由页面使用 `() => import()` 惰性加载

```typescript
import { defineAsyncComponent } from 'vue';

const HeavyComponent = defineAsyncComponent(() =>
  import('./HeavyComponent.vue')
);
```

---

## 二、KeepAlive 缓存

- 合理使用 `<KeepAlive>` 缓存不常更新组件
- 通过 `include`/`exclude` 精确控制缓存范围，避免内存泄漏

```vue
<KeepAlive :include="['UserList', 'DataTable']">
  <component :is="currentComponent" />
</KeepAlive>
```

---

## 三、虚拟滚动

- 长列表（100+ 项）使用虚拟滚动组件，避免 DOM 过多
- 仅渲染可视区域内的元素，降低渲染开销

```vue
<RecycleScroller
  :items="longList"
  :item-size="50"
  key-field="id"
  v-slot="{ item }"
>
  <div>{{ item.name }}</div>
</RecycleScroller>
```

---

## 四、防抖节流

频繁触发的事件必须使用防抖或节流优化：

| 场景       | 方式   | 说明                           |
| ---------- | ------ | ------------------------------ |
| 搜索框输入 | 防抖   | 延迟发起请求，减少无效调用     |
| 滚动事件   | 节流   | 控制触发频率，避免过度渲染     |
| 窗口 resize | 节流  | 布局计算不宜过于频繁             |
| 按钮点击   | 防抖/锁 | 防止重复提交（详见 `network.md`） |

### 防抖示例

```typescript
import { debounce } from 'lodash-es';

const handleSearch = debounce((query: string) => {
  fetchSearchResults(query);
}, 300);
```

### 节流示例

```typescript
import { throttle } from 'lodash-es';

const handleScroll = throttle(() => {
  updateScrollPosition();
}, 100);
```

---

## 五、图片优化

- **格式**：WebP 优先，体积更小
- **尺寸**：使用合适尺寸，避免大图小用
- **懒加载**：非首屏图片延迟加载

```vue
<!-- 原生懒加载 -->
<img loading="lazy" src="image.webp" alt="" />
```
