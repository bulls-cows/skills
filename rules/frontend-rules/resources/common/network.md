# 🌐 网络请求规范

> 本规范是前端 API 请求的统一标准，涵盖异步处理、响应解析、错误处理、安全规范、拦截器、取消请求等全流程，必须严格遵守。
>
> 框架特有条目以 🟦（Vue2）或 💚（Vue3）标注。

---

## 🔄 一、异步处理规范

- **必须使用 `async/await`**，禁止 `.then()` 链式调用（特殊场景除外）
- 统一使用 `try/catch/finally` 处理请求流程
- 禁止嵌套异步回调，避免回调地狱

```javascript
const fetchData = async () => {
  isLoading.value = true
  try {
    const res = await getUserInfo(userId)
    if (res.code === 200) {
      /* 数据处理 */
    }
  } catch (error) {
    console.warn(error)
  } finally {
    isLoading.value = false // 只需写一次
  }
}
```

---

## 二、响应处理

### 数据解构

- **单次解构**，**禁止** `...data.data` 连续解构
- 统一响应模式 `{ code, data, msg }` 解构处理

```javascript
// ✅ 正确：单次解构
const { code, data, msg } = await api.getUserList()

// ❌ 错误：连续解构
const {
  data: { data: list },
} = await api.getUserList()
```

### 先判断成功后使用数据

必须先根据项目约定（如 `code === 0` 或 `code === 200`）判断请求是否成功，再访问业务数据。禁止假设 `res.data` 一定存在：

```javascript
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

捕获错误后必须记录：

```javascript
// ❌ 错误：空 catch
try {
  await apiGetData()
} catch (error) {
  /* 禁止空 catch */
}

// ✅ 正确：catch 中 console.warn
try {
  await apiGetData()
} catch (error) {
  console.warn(error)
}
```

### 业务错误处理

业务侧返回的非成功状态码，在 `else` 分支中 `console.warn` 记录即可（示例见上一节"先判断成功后使用数据"）。

---

## 四、防止重复提交

对于表单提交、支付等写操作，在请求进行中**必须**通过 `loading` 状态禁用提交按钮。

### 通用写法（手动 loading）

```vue
<button @click="handleSubmit" :disabled="loading">
  {{ loading ? '提交中...' : '提交' }}
</button>
```

### 💚 Vue3：useRequest 方式

若已安装 `ahooks-vue` 或 `vue-hooks-plus`，优先使用 `useRequest`，`loading` 自动控制：

```typescript
import { useRequest } from 'ahooks-vue'

const { loading, run } = useRequest(() => apiSubmit(formData.value), {
  manual: true,
  onSuccess: (res) => {
    if (res.code === 0) console.log('提交成功')
    else console.warn(res.msg)
  },
  onError: (error) => console.warn(error),
})

const handleSubmit = async () => {
  await run()
}
```

未安装 `useRequest` 时，使用互斥锁（`if (loading.value) return`）防止重复提交。

---

## 🛡️ 五、安全规范

- **动态 HTML**：富文本、用户输入的 HTML 内容必须用 `DOMPurify.sanitize()` 过滤后再插入 DOM
- **敏感数据**：禁止在 URL 中传递 token、密码、身份证号等；禁止 `console.log` 输出用户凭证、接口密钥
- **跨域配置**：优先使用后端 CORS 配置，禁止使用线上代理转发；开发环境代理仅用于本地调试
- **CSRF 防护**：根据后端要求自动携带 CSRF Token，禁止关闭 CSRF 校验

### 💚 Vue3：全局错误捕获

建议配置 `app.config.errorHandler`，配合 Sentry 上报未捕获异常：

```typescript
app.config.errorHandler = (err, instance, info) => {
  console.warn(err)
  Sentry.captureException(err)
}
```

---

## ⚙️ 六、拦截器规范

所有请求必须通过统一封装的请求实例（如 Axios 实例）发送，拦截器统一处理公共逻辑。

**请求拦截器职责**：添加请求头（Authorization、Content-Type、版本号）、添加请求标识（请求 ID、时间戳）、敏感参数自动加密、过滤空参数。

**响应拦截器职责**：统一处理状态码（401 跳转登录、403 提示无权限、500 提示服务错误）、自动解构外层包装与日期格式转换、记录错误日志、关闭全局 loading。

---

## 🚫 七、取消请求规范

- **重复请求**：相同 URL、相同参数的重复请求，前一次未完成时自动取消前一次
- **页面卸载**：页面/组件卸载时必须取消所有未完成的请求
- 搜索、联想输入等高频场景必须添加防抖 + 取消重复请求逻辑

```typescript
const controller = new AbortController()
const fetchData = async () => {
  try {
    const res = await api.getUserList({ signal: controller.signal })
    // 处理响应
  } catch (error) {
    if (error.name !== 'AbortError') console.warn(error) // 忽略主动取消的错误
  }
}

// 组件卸载时取消请求
onUnmounted(() => controller.abort())
```

> Vue2 对应 `beforeDestroy`，Vue3 对应 `onUnmounted`/`onBeforeUnmount`，React 在 `useEffect` 清理函数中调用。

---

## 📎 八、文件上传/下载规范

### 文件上传

- 小文件用 `FormData` 上传，必须添加文件类型、大小校验
- 大文件必须使用分片上传，支持断点续传、进度条展示
- 上传前校验文件大小、格式、数量，提前给出错误提示，避免无效请求

### 文件下载

- 二进制文件下载必须处理 `blob` 响应，支持自定义文件名
- 大文件下载必须支持断点续传、进度展示
- 下载失败必须给出明确提示，允许用户重试

---

## 📌 九、请求幂等性约定

| 请求方法 | 幂等性 | 适用场景                           |
| -------- | ------ | ---------------------------------- |
| GET      | ✅ 是  | 查询数据、获取列表、详情等只读操作 |
| POST     | ❌ 否  | 新增数据、提交表单等写操作         |
| PUT      | ✅ 是  | 更新全量数据                       |
| PATCH    | ❌ 否  | 更新部分数据                       |
| DELETE   | ✅ 是  | 删除数据                           |

> 写操作必须通过 loading 状态、按钮禁用等方式防止重复提交，避免产生重复数据。

---

## ⚡ 十、其他注意事项

- **等于运算符**：默认优先 `===`（严格相等）
  - 🟦 **Vue2 历史项目偏好 `==`**：若将 `===` 改为 `==`，需提醒用户手动确认；新项目应遵循 `===`
  - 💚 Vue3 / React 优先 `===`，若将 `==` 改为 `===` 需提醒用户确认
- **注释问题**：与请求逻辑相关的注释默认保留，不强制检查（通用注释规范见 [comments.md](./comments.md)）
- **超时设置**：全局请求超时统一配置为 10-30 秒，特殊场景可单独调整
- **重试机制**：网络错误、超时等非业务错误可自动重试 2-3 次，业务错误禁止重试
- **🟦 Vue2 注释默认忽略**：Vue2 项目中注释相关问题默认忽略，不进行检查

---

## 🧩 十一、框架请求库选型与标准模板

### 🟦 Vue2：手动 async/await + `this.$message`

Vue2（Options API）统一通过 `this.$message` 进行用户反馈提示：

```javascript
async handleSubmit() {
  if (this.loading) return
  this.loading = true
  try {
    const { code, msg } = await apiSubmit(this.formData)
    if (code === 0) {
      this.$message.success('操作成功')
    } else {
      console.warn(msg)
    }
  } catch (error) {
    console.warn(error)
  } finally {
    this.loading = false
  }
}
```

### 💚💙 Vue3 / React：useRequest（统一模式）

两个框架的 `useRequest` API 几乎一致，差异点：

- 包名：💚 Vue3 用 `ahooks-vue` / `vue-hooks-plus`；💙 React 用 `ahooks`
- 状态声明：💚 `ref()`；💙 `useState()`
- 执行方法：💚 `run`（推荐）；💙 `runAsync`（推荐，便于 `await`）

**检查方式**：查看 `package.json` 的 `dependencies` 是否包含对应包名。

**决策分支**：已安装 → 使用 `useRequest`；未安装 → 使用手动 `async/await` + `try/catch/finally`。

#### useRequest 标准模板

```typescript
// 💚 Vue3: import { useRequest } from 'ahooks-vue'
// 💙 React: import { useRequest } from 'ahooks'

const { loading, run } = useRequest(() => apiSubmit(formData), {
  manual: true,
  onSuccess: ({ code, data, msg }) => {
    if (code === 0) {
      // 💚 Vue3: dataSource.value = data.list
      // 💙 React: setDataSource(data.list)
    } else {
      console.warn(msg)
    }
  },
  onError: (error) => console.warn(error),
})

// 💚 Vue3: await run()
// 💙 React: await runAsync()
```

#### 手动执行模板（未安装 useRequest 时）

```typescript
// 💚 Vue3: const loading = ref(false)        💙 React: const [loading, setLoading] = useState(false)

const handleSubmit = async () => {
  // 💚 Vue3: if (loading.value) return       💙 React: if (loading) return
  // 💚 Vue3: loading.value = true            💙 React: setLoading(true)
  try {
    const { code, msg } = await apiSubmit(formData)
    if (code === 0) console.log('提交成功')
    else console.warn(msg)
  } catch (error) {
    console.warn(error)
  } finally {
    // 💚 Vue3: loading.value = false         💙 React: setLoading(false)
  }
}
```

> 💙 React 推荐使用 `runAsync` 获取 Promise，便于 `await` 与 try/catch。Vue3 的 `ahooks-vue` 使用 `run`。

---

## ⚠️ 十二、风险提示

网络请求相关改造需特别注意：

- 原代码可能使用不同响应结构
- 原有错误处理可能不同
- `async/await` 改变执行时机
- 💚 **Vue3：转换前必须展示 diff 预览并获用户确认**
