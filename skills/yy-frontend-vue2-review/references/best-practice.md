# 最佳实践与安全规范

**严重程度**：🔴 严重（安全、绝对禁止项）/ 🟢 轻微（调试代码、样式）

---

## 1. 调试代码清理

**严重程度**：🟢 轻微

- 提交前清理所有 `console.log`、`debugger`、`alert` 等调试代码
- **例外**：`catch` 块中的 `console.warn` 不视为问题，允许保留用于错误日志

**错误示例**：

```js
// ❌ 提交前应清理
console.log('用户数据:', user)
debugger
alert('调试')
```

**正确示例**：

```js
// ✅ catch 块中的 console.warn 允许
try {
  // ...
} catch (error) {
  console.warn('操作失败:', error)
}
```

---

## 2. 样式规范

### 2.1 BEM 命名

**严重程度**：🟢 轻微

遵循 BEM（Block__Element--Modifier）规范：

- **Block（块）**：独立可复用模块，直接命名，如 `.card`、`.form`、`.header`
- **Element（元素）**：块内部子元素，用 `__` 连接，如 `.card__title`、`.form__input`
- **Modifier（修饰符）**：状态或样式变体，用 `--` 连接，如 `.card--dark`、`.btn--disabled`

**示例**：

```scss
.user-card {              // Block
  &__header { }           // Element
  &__avatar { }           // Element
  &--disabled { }         // Modifier
}
```

### 2.2 Scoped 作用域

**严重程度**：🟢 轻微

- 组件样式必须使用 `<style scoped>`，防止样式泄漏
- 需要穿透子组件样式时使用 `::v-deep`（Vue2 语法）

**示例**：

```vue
<style scoped lang="scss">
.parent {
  // 穿透子组件样式
  ::v-deep .child-component {
    color: red;
  }
}
</style>
```

### 2.3 其他样式规则

**严重程度**：🟢 轻微

- 全小写、横线连接（kebab-case）
- 嵌套不超过 3 层
- 类名唯一不冲突

---

## 3. 未使用变量

**严重程度**：🟢 轻微

- 未使用的变量和导入需自行清理
- ESLint 已关闭检查，但审核时需指出

---

## 4. Props 解构

**严重程度**：🟢 轻微

- Props 可以解构，但需注意响应式丢失问题
- 解构后对 prop 值的修改不会触发父组件更新

---

## 5. 函数 try/catch

**严重程度**：🟡 中等

- 推荐在 `computed`、`methods` 等函数中使用 `try/catch` 包裹
- `catch` 中使用 `console.warn` 打印错误信息

---

## 6. 安全规范

### 6.1 XSS 风险

**严重程度**：🔴 严重

- `v-html` 渲染的内容必须经过 XSS 过滤或来自可信来源
- **禁止**直接将用户输入通过 `v-html` 渲染

**错误示例**：

```vue
<!-- ❌ XSS 风险 -->
<div v-html="userInput"></div>
```

**正确示例**：

```vue
<!-- ✅ 经过过滤或来自可信来源 -->
<div v-html="sanitizedContent"></div>
```

---

### 6.2 敏感信息泄露

**严重程度**：🔴 严重

- 禁止硬编码敏感信息（密码、密钥、Token、私钥）
- 禁止在日志中输出敏感数据
- 禁止在前端代码中暴露后端内部接口地址（非公开 API）

**错误示例**：

```js
// ❌ 硬编码敏感信息
const API_KEY = 'secret-12345'
const PASSWORD = 'admin123'
```

---

## 7. 绝对禁止项

**严重程度**：🔴 严重

| 禁止项 | 说明 | 后果 |
|--------|------|------|
| 连续解构 | 禁止 `const { ...data.data }` 等连续解构操作 | 深层嵌套解构可能导致空指针错误 |
| 修改子组件数据 | 禁止父组件通过 `$refs`、`$children` 直接修改子组件数据 | 破坏单向数据流，导致状态不可控 |
| 修改 data 类型 | 禁止多次修改 data 属性类型（后端给什么值用什么值） | 可能导致 Vue 响应式系统异常 |
| 直接修改 props | 禁止直接修改组件 props，应使用 data 或 computed 中转 | 违反单向数据流原则，导致父组件状态意外变更 |

**错误示例**：

```js
// ❌ 连续解构
const { user: { info: { name } } } = this.data.data

// ❌ 直接修改子组件数据
this.$refs.childForm.value = 'new value'

// ❌ 修改 data 类型
this.userList = []        // 初始化为数组
this.userList = 'loaded'  // 改为字符串，类型变更

// ❌ 直接修改 props
this.props.userId = '123'
```

---

## 8. 推荐实践总结

| 实践 | 推荐程度 | 说明 |
|------|---------|------|
| 错误处理 | ✅ 强烈推荐 | 函数用 try/catch 包裹，catch 中使用 `console.warn` |
| 异步写法 | ✅ 强烈推荐 | 优先使用 `async/await`，少用 `.then()` 链式调用 |
| 计算优先 | ✅ 强烈推荐 | 可推导数据一律使用 `computed`，而非 `data` |
| v-html 安全 | ⚠️ 注意安全 | 可使用，但必须防范 XSS 风险 |
| props 解构 | ⚠️ 注意风险 | 可以解构，需注意响应式丢失 |
| 变量清理 | 🟢 建议 | 未使用变量需清理 |
| 注释检查 | ❌ 豁免 | 注释相关问题默认忽略 |

---

## 9. 常见问题等级速查表

| 问题 | 严重程度 |
|------|----------|
| XSS 风险（v-html 未过滤） | 🔴 严重 |
| 硬编码敏感信息 | 🔴 严重 |
| 连续解构 `...data.data` | 🔴 严重 |
| 直接修改 props | 🔴 严重 |
| 父组件直接修改子组件数据 | 🔴 严重 |
| 空指针引用（未判空） | 🔴 严重 |
| 数组越界访问 | 🔴 严重 |
| 网络请求无 try/catch | 🟡 中等 |
| computed 无 try/catch | 🟡 中等 |
| 导入顺序错误 | 🟢 轻微 |
| 组件选项顺序错误 | 🟡 中等 |
| 命名不规范（API 函数、事件函数等） | 🟡 中等 |
| 残留 console.log / debugger | 🟢 轻微 |
| 样式不符合 BEM 规范 | 🟢 轻微 |
| 缩进/引号/分号不统一 | 🟢 轻微 |
