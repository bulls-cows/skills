# 约束清单速查（Vue2）

## 一、🔴 绝对禁止项（必须遵守）

| # | 禁止项 | 说明 |
|---|--------|------|
| 1 | 连续数据解构 | 禁止 `...data.data` |
| 2 | 父组件修改子组件数据 | 禁止直接修改子组件内部状态 |
| 3 | 修改 data 原始类型 | 后端给什么类型用什么，不可修改原始类型 |
| 4 | 修改 props | 禁止直接修改 props，只读访问 |
| 5 | 使用 mixins | 改用组合式函数或组件组合 |
| 6 | 无意义命名 | 禁止 `data1`、`temp2` |
| 7 | `$parent.$parent` 链式访问 | 禁止跨级访问父组件数据 |
| 8 | v-for 与 v-if 同元素 | 禁止同一元素同时使用 |
| 9 | index 作为 key | 必须用唯一 ID |
| 10 | `setTimeout` 替代 `$nextTick` | DOM 更新操作必须用 `$nextTick` |

## 二、🟢 推荐项（建议统一）

| # | 推荐项 | 说明 |
|---|--------|------|
| 1 | 函数 try/catch | 包裹函数内容，`catch` 中使用 `console.warn` |
| 2 | async/await | 少用 `.then()` 链式写法 |
| 3 | computed 优先 | 能用 computed 解决的不用 data |
| 4 | watch 深度/立即监听 | 按需使用 `deep: true` 和 `immediate: true` |
| 5 | computed try/catch | 必须 try/catch 包裹，避免计算属性报错 |
| 6 | 减少 data 冗余 | 优先 computed 派生，减少 data 属性 |

## 三、🟡 不推荐项（尽量避免）

| # | 不推荐项 | 说明 |
|---|----------|------|
| 1 | 多层 try/catch 嵌套 | 异步操作尽量扁平化 |
| 2 | 生命周期 emit | 不推荐在生命周期中主动向外 emit |
| 3 | 可选链操作符 `?.` | 不推荐 `a?.b?.c`，建议使用 lodash `get(a, ['b', 'c'])` 替代 |
| 4 | CSS 嵌套原生写法 | 不推荐直接使用原生嵌套语法，需经 PostCSS 编译后使用 |
| 5 | `:has()` 伪类 | Safari 15.4-15.6 存严重渲染 Bug，谨慎在生产环境使用 |

## 四、⚠️ 注意事项

- **未使用变量**：ESLint 已关闭检查，需自行清理无用代码
- **v-html**：可使用，但必须防范 XSS 风险
- **props 解构**：可以解构（需注意响应式丢失问题）
- **等于运算符**：使用 `==` 不视为问题
- **注释检查**：注释相关问题默认忽略，不进行检查
- **不要过度封装**：简单逻辑直接写在 template 中

## 五、⚠️ Vue2 响应式陷阱

Vue2 使用 `Object.defineProperty` 实现响应式，以下场景必须使用 `$set` 或替代方案：

| 场景 | 错误写法 | 正确写法 |
|------|---------|---------|
| 新增对象属性 | `this.obj.newKey = val` | `this.$set(this.obj, 'newKey', val)` |
| 数组索引赋值 | `this.arr[i] = val` | `this.$set(this.arr, i, val)` |
| 数组长度修改 | `this.arr.length = n` | `this.arr.splice(n)` |
