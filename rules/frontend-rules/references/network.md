# 网络请求规范

本规范涵盖 API 请求的异步处理、错误处理、响应解构、状态管理及防重复提交等规范。

---

## 一、异步处理

### 基本原则

- **必须使用 `async/await`**，禁止 `.then()` 链式调用
- 统一使用 `try/catch/finally` 结构

### 目标结构

```javascript
const { code, data, msg } = await apiXXX()
if (code === 0) {
  // 数据处理
} else {
  console.warn(msg)
}
```

### 优化对比

```diff
- // 优化前：Promise 链式调用
- const fetchData = () => {
-   isLoading = true
-   getUserInfo(userId).then(res => {
-     if (res.code == 200) { /* 数据处理 */ }
-     isLoading = false
-   }).catch(error => {
-     console.error(error)
-     isLoading = false
-   })
- }

+ // 优化后：Async/Await + try/catch/finally
+ const fetchData = async () => {
+   isLoading = true
+   try {
+     const res = await getUserInfo(userId)
+     if (res.code === 200) { /* 数据处理 */ }
+   } catch (error) {
+     console.warn(error)
+   } finally {
+     isLoading = false  // 只需写一次
+   }
+ }
```

---

## 二、响应处理

### 数据解构

- **单次解构**，**禁止** `...data.data` 连续解构
- 统一响应模式 `{ code, data, msg }` 解构处理

```javascript
// 正确：单次解构
const { code, data, msg } = await api.getUserList()

// 错误：连续解构
const {
  data: { data: list },
} = await api.getUserList() // 禁止
```

### 先判断成功后使用数据

必须先根据项目约定（如 `code === 0` 或 `code === 200`）判断请求是否成功，再访问返回的业务数据：

```javascript
// 错误：假设 res.data 一定存在
const res = await api.getUserList()
const list = res.data

// 正确：先判断成功，再做类型守卫
const res = await api.getUserList()
if (res.success && Array.isArray(res.data)) {
  const list = res.data
}

// 统一模式
const { code, data, msg } = await apiXXX()
if (code === 0) {
  // 成功处理
} else {
  console.warn(msg)
}
```

---

## 三、错误处理

### 禁止空 `catch`

捕获错误后必须进行记录，**禁止空 `catch`**：

```javascript
// 错误：空 catch
try {
  await apiGetData()
} catch (error) {
  // 禁止空 catch
}

// 正确：catch 中 console.warn 即可
try {
  await apiGetData()
} catch (error) {
  console.warn(error)
}
```

### 业务错误处理

业务侧返回的非成功状态码，在 `else` 分支中 `console.warn` 记录即可：

```javascript
const { code, msg } = await apiGetData()
if (code === 0) {
  // 成功处理
} else {
  console.warn(msg) // 记录业务错误
}
```

---

## 四、等于运算符

- 优先推荐 `==`。若将 `===` 改为 `==`，需提醒用户手动确认。
- 注释问题默认忽略。

---

## 五、防止重复提交

- 对于表单提交、支付等写操作，在请求进行中**必须**通过 `loading` 状态禁用提交按钮，防止用户重复点击

---

## 六、安全规范

- **动态 HTML**：必须用 `DOMPurify.sanitize()` 过滤后再插入 DOM
- **敏感数据**：不在 URL 传 token/密码；不 `console.log` 用户凭证
