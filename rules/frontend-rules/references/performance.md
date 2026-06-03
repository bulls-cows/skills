# 性能优化规范

本规范涵盖组件懒加载、缓存、虚拟滚动、防抖节流、图片优化及路由懒加载等性能优化手段。

---

## 一、优化速查

| 优化项     | 说明                                                                      |
| ---------- | ------------------------------------------------------------------------- |
| 组件懒加载 | 大组件使用动态导入 `() => import(...)`                                    |
| KeepAlive  | 通过 `include`/`exclude` 精确控制缓存范围                                 |
| 路由懒加载 | 所有页面路由必须 `() => import()`，禁止全量打包                           |
| 虚拟滚动   | 长列表（100+ 项）使用虚拟滚动，避免 DOM 过多                              |
| 防抖节流   | 搜索（防抖300ms）、滚动（节流100ms）、resize（节流）、按钮点击（防抖/锁） |
| 图片优化   | WebP 优先、合适尺寸、非首屏 `loading="lazy"`                              |
| 响应式性能 | `computed` 派生、大数据 `Object.freeze()`；避免 `watch` 中同步 DOM 操作   |
| 路由守卫   | 路由离开前清理定时器、取消未完成请求、关闭弹窗                            |
| 指令清理   | 指令卸载钩子清理事件监听和定时器                                          |

---

## 二、组件懒加载

- 大组件使用动态导入 `() => import(...)`
- 路由页面使用 `() => import()` 惰性加载

```javascript
// 组件懒加载
const HeavyComponent = () => import('./HeavyComponent.vue')

// 路由懒加载
const routes = [
  {
    path: '/home',
    component: () => import('./views/Home.vue'),
  },
]
```

---

## 三、KeepAlive 缓存

- 合理使用 `<KeepAlive>` 缓存不常更新组件
- 通过 `include`/`exclude` 精确控制缓存范围，避免内存泄漏

```html
<KeepAlive :include="['UserList', 'DataTable']">
  <component :is="currentComponent" />
</KeepAlive>
```

---

## 四、虚拟滚动

- 长列表（100+ 项）使用虚拟滚动组件，避免 DOM 过多
- 仅渲染可视区域内的元素，降低渲染开销

---

## 五、防抖节流

频繁触发的事件必须使用防抖或节流优化：

| 场景        | 方式    | 说明                              |
| ----------- | ------- | --------------------------------- |
| 搜索框输入  | 防抖    | 延迟发起请求，减少无效调用        |
| 滚动事件    | 节流    | 控制触发频率，避免过度渲染        |
| 窗口 resize | 节流    | 布局计算不宜过于频繁              |
| 按钮点击    | 防抖/锁 | 防止重复提交（详见 `network.md`） |

### 防抖/节流示例

```javascript
import { debounce, throttle } from 'lodash-es'

const handleSearch = debounce((query) => {
  fetchSearchResults(query)
}, 300)

const handleScroll = throttle(() => {
  updateScrollPosition()
}, 100)
```

---

## 六、图片优化

- **格式**：WebP 优先，体积更小
- **尺寸**：使用合适尺寸，避免大图小用
- **懒加载**：非首屏图片延迟加载

```html
<!-- 原生懒加载 -->
<img loading="lazy" src="image.webp" alt="" />
```

---

## 七、模板层轻量化

- 模板只负责展示，不写复杂表达式与逻辑
- 简单逻辑可内联，不过度封装为方法
- 避免在模板中执行昂贵计算，优先使用 `computed`

---

## 八、响应式性能

- 优先使用 `computed` 派生状态
- 大数据使用 `Object.freeze()` 冻结响应式
- 避免在 `watch` 中执行同步 DOM 操作

---

## 九、指令清理

- 指令卸载钩子中必须清理事件监听器和定时器

---

## 十、路由守卫清理

- 路由离开前清理定时器、取消未完成请求、关闭弹窗
- 全局守卫统一处理登录校验、权限控制
