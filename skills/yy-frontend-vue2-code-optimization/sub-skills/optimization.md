# T06 ⚡ 逻辑深度优化（🔴 高风险 · 必须确认）

**定位**：🔴 高风险。涉及运行时行为改变，**必须经过任务调度器确认后执行**。

## 相关规则

执行本任务前，请先阅读以下规则文件（位于 `rules/` 目录），按优先级从高到低排列：

- **`rules/spec-index.md`**：Vue2 前端项目开发规范总纲（必读）
- **`rules/network.md`**：异步处理、响应解构、错误处理、防重复提交
- **`rules/performance.md`**：组件懒加载、KeepAlive 缓存、虚拟滚动、防抖节流、图片优化
- **`rules/interaction.md`**：Props 定义规范、Emit 事件白名单
- **`rules/constraints.md`**：Vue2 响应式陷阱、禁止/推荐/不推荐速查

## 相等运算符转换

### 核心原则

**不主动变更 `==` 和 `===`**，保持代码原有写法。

### 建议转换场景（需确认后执行）

以下场景建议统一使用 `===`，但**仍属于中风险，必须展示给用户确认后才执行**：

- **接口响应的 `code` 字段比较**：后端返回的 code 通常是数字类型，建议 `code === 0` 或 `code === 200`
- **异步代码重构后的比较**：当 `.then()` 转为 `async/await` 时，若原代码使用 `==` 比较 `code` 字段，建议同步转为 `===`
- **明确类型已知的比较**：如 `typeof x === 'string'`、`x === null`、`x === undefined`

### 风险：相等运算符转换

任何 `==` ↔ `===` 之间的转换都属于**逻辑变更**，可能改变代码的实际行为：

- `==` 会进行类型转换，`===` 不会
- `null == undefined` 为 true，但 `null === undefined` 为 false
- `0 == ''` 为 true，但 `0 === ''` 为 false
- 转换前必须逐项确认，展示变更预览

## 异步与网络请求

### 目标结构

```javascript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  // 数据处理
} else {
  console.warn(msg);
}
```

### 变更内容

- `.then()` 链式调用转为 `async/await`
- 统一响应模式 `{code, data, msg}` 解构处理
- 错误处理使用 `try/catch + console.warn`

### 变更预览格式规范

展示给用户确认时，**必须使用 diff 格式展示变更前后对比**，示例：

```diff
- // 优化前：Promise 链式调用
- fetchData() {
-   this.loading = true
-   getUserInfo(this.userId).then(res => {
-     if (res.code == 200) { /* 数据处理 */ }
-     this.loading = false
-   }).catch(err => {
-     console.error(err)
-     this.loading = false
-   })
- }

+ // 优化后：Async/Await + try/catch/finally
+ async fetchData() {
+   this.loading = true
+   try {
+     const res = await getUserInfo(this.userId)
+     if (res.code === 200) { /* 数据处理 */ }
+   } catch (err) {
+     console.warn(err)
+   } finally {
+     this.loading = false  // 只需写一次
+   }
+ }
```

### 风险：异步与网络请求

原代码可能使用不同响应结构；原有错误处理可能不同；`async/await` 改变执行时机。

## 计算属性优先

**详见 `rules/constraints.md`**（computed 优先原则）。

### 核心原则

能用 `computed` 解决的不用 `data`，优先使用 `computed` 派生状态。

### computed try/catch

**computed 必须用 try/catch 包裹**，避免计算属性报错影响渲染：

```javascript
computed: {
  // computed: 用户总数
  totalUsers() {
    try {
      return this.dataSource.length || 0;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  },
},
```

### 风险：计算属性优先

响应式求值时机不同；带副作用的逻辑（如 API 请求、DOM 操作）不能转为 computed。

## watch 优化

### 核心原则

按需使用 `deep: true` 和 `immediate: true`，避免不必要的深度监听。

### watch 示例

```javascript
watch: {
  // watch: 监听用户输入变化
  searchQuery(newVal) {
    this.fetchSuggestions(newVal);
  },

  // watch: 深度监听表单数据（deep: true）
  formData: {
    handler(newVal) {
      this.validateForm(newVal);
    },
    deep: true,
  },

  // watch: 立即执行监听（immediate: true）
  userId: {
    handler(newVal) {
      if (newVal) this.fetchUserInfo(newVal);
    },
    immediate: true,
  },
},
```

### 风险：watch 优化

`deep: true` 可能影响性能；`immediate: true` 改变执行时机。

## Vue2 响应式陷阱处理

Vue2 使用 `Object.defineProperty` 实现响应式，以下场景必须使用 `$set` 或替代方案：

| 场景 | 错误写法 | 正确写法 |
| ---- | --------- | -------- |
| 新增对象属性 | `this.obj.newKey = val` | `this.$set(this.obj, 'newKey', val)` |
| 数组索引赋值 | `this.arr[i] = val` | `this.$set(this.arr, i, val)` |
| 数组长度修改 | `this.arr.length = n` | `this.arr.splice(n)` |

### 变更预览格式

```diff
- // 优化前：直接赋值（无响应式）
- this.dataSource[0] = newData
- this.formData.newField = value

+ // 优化后：使用 $set 确保响应式
+ this.$set(this.dataSource, 0, newData)
+ this.$set(this.formData, 'newField', value)
```

### 风险：响应式陷阱处理

原代码可能依赖非响应式行为；转换后数据更新时机可能不同。

## 性能优化

### 防抖节流

频繁触发的事件必须使用防抖或节流优化：

| 场景 | 方式 | 说明 |
| ---- | ---- | ---- |
| 搜索框输入 | 防抖 | 延迟发起请求，减少无效调用 |
| 滚动事件 | 节流 | 控制触发频率，避免过度渲染 |
| 窗口 resize | 节流 | 布局计算不宜过于频繁 |
| 按钮点击 | 防抖/锁 | 防止重复提交 |

### 防抖/节流示例

```javascript
import { debounce, throttle } from 'lodash-es';

methods: {
  // methods: 搜索处理（防抖 300ms）
  handleSearch: debounce(function(query) {
    this.fetchSearchResults(query);
  }, 300),

  // methods: 滚动处理（节流 100ms）
  handleScroll: throttle(function() {
    this.updateScrollPosition();
  }, 100),
},
```

### 组件懒加载

大组件使用动态导入：

```javascript
components: {
  // component: HeavyComponent（懒加载）
  HeavyComponent: () => import('./HeavyComponent.vue'),
},
```

### KeepAlive 缓存

```vue
<KeepAlive :include="['UserList', 'DataTable']">
  <component :is="currentComponent" />
</KeepAlive>
```
