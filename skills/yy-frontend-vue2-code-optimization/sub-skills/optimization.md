# 逻辑深度优化

**定位**：🔴 高风险。涉及运行时行为改变，**必须经过任务调度器确认后执行**。

## 异步与网络请求

### 目标结构

```javascript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  this.$message.success(msg || "操作成功");
} else {
  this.$message.error(msg);
}
```

### 变更内容

- `.then()` 链式调用转为 `async/await`
- 统一响应模式 `{code, data, msg}` 解构处理
- 错误处理使用 `try/catch + console.warn`

### 风险：异步与网络请求

原代码可能使用不同响应结构；原有错误处理可能不同；`async/await` 改变执行时机。

## 计算属性优先

- 将非副作用的逻辑从 `methods` 迁移至 `computed`
- 命名统一用 `is/has/visible` 前缀

> **注意**：computed 是同步 getter 函数，**不应使用 try/catch**。如果逻辑需要异步或错误处理，保留在 methods 中。

### 风险：计算属性优先

响应式求值时机不同；带副作用的逻辑（如 API 请求、DOM 操作）不能转为 computed。

## 逻辑抽离与拆分

- 超过 50 行的方法拆分为子方法
- 重复 ≥2 次的逻辑提取为公共函数
- 简单条件判断直接内联到 template，不额外创建 method

### 风险：逻辑抽离与拆分

拆分后可能引入作用域/this 指向问题；内联表达式改变执行时机。

## Emit 标准化

### Emit 白名单（仅限以下 17 种事件）

| 类别   | 白名单事件                                                               |
| ------ | ------------------------------------------------------------------------ |
| 交互类 | `change`, `click`, `select`, `expand`, `input`, `clear`, `remove`, `add` |
| 弹窗类 | `open`, `close`, `show`, `hide`                                          |
| 操作类 | `cancel`, `confirm`, `ok`, `editSuccess`, `error`                        |

### Emit 顺序

`input` → 其它 → `change/click`

### 风险：Emit 标准化

父组件监听的自定义事件名可能不在白名单中，改名或替换会导致父组件监听失效。

### 基础组件规范

基础组件生命周期禁止主动 emit；业务型组件允许但不推荐在生命周期中主动 emit。

## Props 增强

### 要求

- 命名必须 camelCase
- 必须明确指定 `type` 和 `default`
- 必须添加注释说明参数含义

### 风险：Props 增强

缺少 `default` 值可能导致 props 为 `undefined` 时运行报错；新增 type 声明可能触发类型异常。

## 性能优化

- **组件懒加载**：路由和大组件使用动态导入 `import()`
- **KeepAlive**：合理使用页面缓存，避免重复渲染
- **虚拟滚动**：长列表使用虚拟滚动组件减少 DOM 节点
- **防抖节流**：频繁触发的事件（搜索、滚动、resize）使用防抖/节流
- **图片优化**：使用合适的图片格式（webp）和尺寸，懒加载非首屏图片
- **computed 优先**：替代 watch 中的派生逻辑，利用缓存机制

## 其他优化

- `v-html` 必须防范 XSS，避免直接操作未过滤的字符串
- 禁止直接修改 `props` 数据
- 禁止连续解构 (如 `...data.data`)
- 禁止父组件直接修改子组件数据
- 禁止多次修改 data 属性类型（后端给什么值用什么值，可新增属性但不允许修改原始数据类型）
