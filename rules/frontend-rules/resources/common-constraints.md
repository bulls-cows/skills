# 前端约束清单速查

> 本清单是前端开发的快速参考手册，所有规则必须严格遵守，避免常见错误和代码质量问题。
>
> 本清单只列出关键速查项，详细规则与示例请参阅对应链接文档。Vue2 特有条目以 🟦 标注。

---

## 一、绝对禁止项（100% 必须遵守）

> 违反会直接导致 Bug、性能问题或架构混乱，代码审查时会被直接打回。

| #   | 禁止项                      | 说明                                                                                                                                             | 反例 ❌                                                            | 正确示例 ✅                                          |
| --- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | ---------------------------------------------------- |
| 1   | 连续数据解构                | 禁止多层连续解构后端响应数据，详见 [network.md](./common-network.md#二响应处理)                                                                         | `const { data } = await api.getUser(); const { list } = data.data` | `const { data: { list } } = await api.getUser()`     |
| 2   | 父组件修改子组件数据        | 禁止直接修改子组件内部状态                                                                                                                       | `this.$refs.child.form.name = 'test'`                              | 通过 props 传递数据，子组件 emit 事件通知父组件修改  |
| 3   | 硬编码接口地址              | 禁止在代码中直接硬编码 API URL、域名等配置                                                                                                       | `const res = await fetch('https://api.example.com/user')`          | 从环境变量或配置文件读取接口地址                     |
| 4   | 修改 props                  | 禁止直接修改 props，props 是只读的                                                                                                               | `props.user.name = 'new name'`                                     | 通过 emit 事件通知父组件修改源数据                   |
| 5   | 无意义命名                  | 禁止使用无业务含义的变量名，详见 [naming.md](./common-naming.md#-三变量与常量规范)                                                                      | `let data1 = {}, temp2 = []`                                       | `let userInfo = {}, menuList = []`                   |
| 6   | 列表与条件同元素            | 禁止同一元素同时使用 `v-for` 和 `v-if`，详见 [vue-template.md](./common-vue-template.md#二v-if-与-v-for-冲突)                                           | `<div v-for="item in list" v-if="item.show">`                      | 用外层 template 包裹循环，内层写条件，或先过滤列表   |
| 7   | index 作为 key              | 列表渲染必须使用唯一业务 ID 作为 key，详见 [vue-template.md](./common-vue-template.md#一v-for-与-key)（Vue）与 [react-jsx.md](./react-jsx.md)（React） | `<div v-for="(item, index) in list" :key="index">`                 | `<div v-for="item in list" :key="item.id">`          |
| 8   | 跨层级组件通信              | 禁止使用 `$parent` / `$root` 链式访问跨层级组件状态或方法                                                                                        | `this.$parent.$parent.$refs.form.submit()`                         | 使用 provide/inject、状态管理库或事件总线实现通信    |
| 9   | 空的 `catch`                | 捕获错误后必须记录，详见 [network.md](./common-network.md#三错误处理)                                                                                   | `try { ... } catch (e) { /* 空 */ }`                               | `try { ... } catch (e) { console.warn(e) }`          |
| 10  | 使用 `any` 类型             | 禁止使用 `any`，详见 [typescript.md](./common-typescript.md#二禁用-any)                                                                                 | `const data: any = ...`                                            | `const data: unknown = ...`                          |
| 11  | 未过滤的 `v-html`           | 富文本必须用 DOMPurify 过滤，详见 [vue-template.md](./common-vue-template.md#三v-html-安全)                                                             | `<div v-html="rawHtml">`                                           | `<div v-html="DOMPurify.sanitize(rawHtml)">`         |
| 12  | 🟦 修改 data 原始类型       | Vue2：后端给什么类型用什么，不可修改原始类型                                                                                                     | `this.formData.count = String(this.formData.count)`                | 保持原始类型，需要转换时另存变量                     |
| 13  | 🟦 使用 mixins              | Vue2：改用组合式函数或组件组合                                                                                                                   | `mixins: [sharedMixin]`                                            | 提取为独立的函数或组件复用                           |
| 14  | 🟦 setTimeout 替代 nextTick | Vue2：DOM 更新操作必须用 `$nextTick`，禁止 `setTimeout` 替代                                                                                     | `setTimeout(() => { this.$refs.input.focus() }, 0)`                | `this.$nextTick(() => { this.$refs.input.focus() })` |

---

## 二、强烈推荐项（必须遵循）

> 能显著提升代码质量和可维护性，无特殊理由必须遵守。

| #   | 推荐项                | 说明                                                               | 示例 ✅                                                                         |
| --- | --------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| 1   | 函数 try/catch        | 异步函数必须用 try/catch 包裹，catch 中必须记录错误                | `try { await api.getUser() } catch (e) { console.warn('获取用户失败', e) }`     |
| 2   | async/await           | 优先使用 async/await，少用 `.then()` 链式写法                      | `const res = await api.getUser()` 优于 `api.getUser().then(res => {})`          |
| 3   | computed 优先         | 能用计算属性派生的状态不手动维护                                   | ``const fullName = computed(() => `${firstName.value} ${lastName.value}`)``     |
| 4   | watch 按需使用        | 合理使用深度监听和立即监听，避免不必要的执行                       | `watch(user, () => { loadData() }, { deep: true, immediate: true })`            |
| 5   | 减少状态冗余          | 优先通过 computed 派生状态，减少重复定义                           | 避免同时定义 `list` 和 `filteredList` 两个状态，用 computed 派生 filteredList   |
| 6   | 🟦 computed try/catch | Vue2：computed 必须用 try/catch 包裹，避免计算属性报错导致页面崩溃 | `computed: { fullName() { try { return ... } catch (e) { console.warn(e) } } }` |

---

## 三、不推荐项（尽量避免）

> 虽然不会直接导致错误，但会影响代码可读性、兼容性或性能，尽量避免使用。

| #   | 不推荐项            | 说明                                                     | 替代方案 ✅                                         |
| --- | ------------------- | -------------------------------------------------------- | --------------------------------------------------- |
| 1   | 多层 try/catch 嵌套 | 异步操作尽量扁平化，避免嵌套过深                         | 拆分为多个函数，使用 Promise.all 处理并行请求       |
| 2   | 生命周期 emit       | 不推荐在生命周期中主动向外触发事件，可能导致不必要的更新 | 放到用户交互事件中，或使用 watch 监听状态变化触发   |
| 3   | 深层可选链 `?.`     | 不推荐超过 2 层的可选链 `a?.b?.c`，可读性差              | 使用 lodash `get(a, ['b', 'c'], defaultValue)` 替代 |
| 4   | CSS 原生嵌套语法    | 不推荐直接使用原生 CSS 嵌套语法，兼容性差                | 使用 SCSS/LESS 嵌套，或经 PostCSS 编译后使用        |
| 5   | `:has()` 伪类       | Safari 15.4-15.6 存在严重渲染 Bug，生产环境谨慎使用      | 使用类名切换、JS 判断等方式替代                     |

---

## 四、方法函数规范（强制）

所有组件方法（Vue2 的 `methods`、Vue3/React 的事件处理函数与业务函数）必须遵守以下两条规则：

1. **前置参数校验**：依赖的数据（props/row/query 等）在使用前必须做非空判断，缺失时通过提示组件（如 Vue2 的 `this.$message.warning`）告知用户并 `return` 终止执行
2. **try-catch 错误保底**：方法体必须包裹在 try-catch 中，catch 中使用 `console.warn(error)` 记录异常，避免未捕获错误导致页面崩溃

```javascript
async onClickSupervise(row) {
  try {
    if (!row.regulatedEntityId) {
      this.$message.warning('缺少单位信息，无法督办')
      return
    }
    // 业务逻辑...
  } catch (error) {
    console.warn(error)
  }
}
```

**例外**：仅含单行逻辑的简单方法（如纯赋值、纯 emit）可省略，但涉及异步操作、API 调用、路由跳转的方法必须严格遵守。

---

## 五、注意事项

> 特殊场景下的使用说明，避免踩坑。

| 项             | 说明                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **未使用变量** | ESLint 已关闭未使用变量检查，开发者需自行清理无用代码，保持代码整洁                                                             |
| **动态 HTML**  | 允许使用 `v-html` / `dangerouslySetInnerHTML`，但必须使用 DOMPurify 过滤内容，防范 XSS 风险                                     |
| **props 解构** | 允许解构 props，但必须注意响应式丢失问题，解构后的值不会随 props 更新而更新                                                     |
| **等于运算符** | Vue2 项目偏好 `==`（详见 [network.md](./common-network.md#⚡-十其他注意事项)），Vue3/React 通用规范偏好 `===`；改动等号时需提醒用户确认 |
| **注释检查**   | 注释相关问题默认忽略，开发者自行维护注释的准确性和完整性，详见 [comments.md](./common-comments.md)                                     |
| **过度封装**   | 避免过度封装，简单逻辑直接写在模板中，提高可读性                                                                                |
| **魔法数字**   | 避免在代码中直接使用无意义的数字，如 `if (status === 3)`，需定义为常量 `const STATUS_AUDIT_PASS = 3`                            |

---

## 六、过滤器（Vue2 特有）

Vue2 的 `filters` 用于模板中的文本格式化，使用时遵循：

- 优先使用局部 `filters`，保持纯函数
- `filters` 不修改外部状态

```javascript
export default {
  filters: {
    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD')
    },
  },
}
```

> Vue3 已移除 `filters`，改用 computed 或方法调用实现相同功能。
