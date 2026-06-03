---
title: 网络请求规范
version: 2.0.0
lastUpdated: 2026-06-03
priority: 🔴 基础规范（强制执行）
maintainer: bulls-cows team
---

# 🌐 网络请求规范

> 本规范是前端API请求的统一标准，涵盖异步处理、响应解析、错误处理、安全规范、拦截器、取消请求等全流程，必须严格遵守。

---

---

## 🔄 一、异步处理规范

### 基本原则

- **必须使用 `async/await` 语法**，禁止直接使用 `.then()` 链式调用（特殊场景除外）
- 统一使用 `try/catch/finally` 结构处理请求流程
- 禁止使用嵌套异步回调，避免回调地狱

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

## 四、防止重复提交

- 对于表单提交、支付等写操作，在请求进行中**必须**通过 `loading` 状态禁用提交按钮，防止用户重复点击

---

## 🛡️ 五、安全规范

- **动态 HTML**：富文本、用户输入的HTML内容必须用 `DOMPurify.sanitize()` 过滤后再插入DOM
- **敏感数据**：禁止在URL中传递token、密码、身份证号等敏感信息；禁止`console.log`输出用户凭证、接口密钥等敏感内容
- **跨域配置**：优先使用后端CORS配置，禁止使用线上代理转发请求；开发环境代理仅用于本地调试
- **CSRF防护**：根据后端要求自动携带CSRF Token，禁止关闭CSRF校验

---

## ⚙️ 七、拦截器规范

所有请求必须通过统一封装的请求实例（如Axios实例）发送，拦截器统一处理公共逻辑：

### 请求拦截器职责

1. 统一添加请求头：`Authorization` Token、`Content-Type`、客户端版本号等
2. 统一添加请求标识：请求ID、时间戳等，用于链路追踪
3. 统一处理请求加密：敏感参数自动加密
4. 统一过滤空参数：避免传递无意义的null/undefined参数

### 响应拦截器职责

1. 统一处理响应状态码：401跳转登录、403提示无权限、500提示服务错误等
2. 统一处理响应数据：自动解构外层包装、统一转换日期格式等
3. 统一记录错误日志：请求失败自动上报错误信息
4. 统一关闭全局loading：避免loading状态残留

---

## 🚫 八、取消请求规范

### 重复请求取消

- 相同URL、相同参数的重复请求，前一次未完成时自动取消前一次请求
- 搜索、联想输入等高频请求场景必须添加防抖+取消重复请求逻辑

### 页面卸载取消

- 页面/组件卸载时，必须取消当前页面所有未完成的请求
- 使用`AbortController`实现请求取消：

```typescript
// ✅ 正确示例
const controller = new AbortController()
const fetchData = async () => {
  try {
    const res = await api.getUserList({ signal: controller.signal })
    // 处理响应
  } catch (error) {
    if (error.name !== 'AbortError') {
      // 忽略主动取消的错误
      console.warn(error)
    }
  }
}

// 组件卸载时取消请求
onUnmounted(() => {
  controller.abort()
})
```

---

## 📎 九、文件上传/下载规范

### 文件上传

1. 小文件使用`FormData`格式上传，必须添加文件类型、大小校验
2. 大文件必须使用分片上传，支持断点续传、进度条展示
3. 上传前必须校验文件大小、格式、数量，提前给出错误提示，避免无效请求

### 文件下载

1. 二进制文件下载必须处理`blob`响应，支持自定义文件名
2. 大文件下载必须支持断点续传、进度展示
3. 下载失败必须给出明确提示，允许用户重试

---

## 📌 十、请求幂等性约定

| 请求方法 | 幂等性 | 适用场景                           |
| -------- | ------ | ---------------------------------- |
| GET      | ✅ 是  | 查询数据、获取列表、详情等只读操作 |
| POST     | ❌ 否  | 新增数据、提交表单等写操作         |
| PUT      | ✅ 是  | 更新全量数据                       |
| PATCH    | ❌ 否  | 更新部分数据                       |
| DELETE   | ✅ 是  | 删除数据                           |

> 写操作必须通过loading状态、按钮禁用等方式防止重复提交，避免产生重复数据。

---

## ⚡ 十一、其他注意事项

- 等于运算符：优先使用`===`（严格相等），仅在明确需要隐式类型转换时使用`==`，若改为`===`无需额外确认，若改为`==`需提醒用户确认
- 注释问题：与请求逻辑相关的注释默认保留，不需要强制检查
- 超时设置：全局请求超时时间统一配置为10-30秒，特殊场景可单独调整
- 重试机制：网络错误、超时等非业务错误可自动重试2-3次，业务错误禁止重试
