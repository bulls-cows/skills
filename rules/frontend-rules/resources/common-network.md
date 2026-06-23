# 网络请求规范

> 本规范是前端 API 请求的统一标准,涵盖请求处理、安全规范、拦截器、请求幂等性等全流程,必须严格遵守。

---

## 一、网络请求处理规范

### 强制原则

请求处理必须同时满足以下五点,缺一不可:

1. **异步处理**:必须使用 `async/await`,禁止 `.then()` 链式调用;统一 `try/catch/finally` 处理请求流程;禁止嵌套异步回调,避免回调地狱
2. **响应解构**:单次解构 `{ code, data, msg }`,禁止 `...data.data` 连续解构
3. **成功判断**:必须先根据项目约定(如 `code === 0` 或 `code === 200`)判断请求是否成功,再访问业务数据;非成功状态在 `else` 分支中 `console.warn(msg)` 记录即可
4. **数据保底**:对关键字段增加默认值,对象用 `data || {}`、数组用 `data || []`、字符串用 `data || ''`(空字符串是合法值且需保留时用 `data ?? ''`)、数字用 `data ?? 0`(`0` 是合法值时用 `??` 避免误覆盖)、布尔用 `data ?? false`(`false` 是合法值时用 `??` 避免误覆盖)
5. **防止重复提交**:写操作必须通过 `if (loading) return` 互斥锁 + 按钮 `:disabled="loading"` 双重防护

### 错误处理

- 禁止空 `catch`,捕获错误后必须 `console.warn` 记录
- 业务错误(后端返回非成功状态码)统一在成功判断的 `else` 分支处理,无需额外再走 `catch`

### 反例

```javascript
// ❌ 错误:连续解构
const {
  data: { data: list },
} = await api.getUserList()

// ❌ 错误:未保底,下游访问可能报错
this.userInfo = data

// ❌ 错误:空 catch
try {
  await apiGetData()
} catch (error) {
  /* 空 */
}
```

### 通用按钮 disabled 写法

```vue
<button @click="handleSubmit" :disabled="loading">
  {{ loading ? '提交中...' : '提交' }}
</button>
```

### 1. Vue2(Options API)

```javascript
export default {
  data() {
    return {
      isLoading: false,
      userInfo: {},
    }
  },
  methods: {
    async fetchData() {
      if (this.isLoading) return
      this.isLoading = true
      try {
        const { code, data, msg } = await getUserInfo(this.userId)
        if (code === 0) {
          this.userInfo = data || {}
        } else {
          console.warn(msg)
        }
      } catch (error) {
        console.warn(error)
      } finally {
        this.isLoading = false
      }
    },
  },
}
```

### 2. Vue3(手动 `async/await`)

```vue
<script setup>
import { ref } from 'vue'

const props = defineProps({ userId: String })
const isLoading = ref(false)
const userInfo = ref({})

const fetchData = async () => {
  if (isLoading.value) return
  isLoading.value = true
  try {
    const { code, data, msg } = await getUserInfo(props.userId)
    if (code === 0) {
      userInfo.value = data || {}
    } else {
      console.warn(msg)
    }
  } catch (error) {
    console.warn(error)
  } finally {
    isLoading.value = false
  }
}
</script>
```

### 3. Vue3 + `useRequest`(`ahooks-vue` / `vue-hooks-plus`)

```vue
<script setup>
import { ref } from 'vue'
import { useRequest } from 'ahooks-vue'

const props = defineProps({ userId: String })
const userInfo = ref({})

const { loading, run } = useRequest(() => getUserInfo(props.userId), {
  manual: true,
  onSuccess: ({ code, data, msg }) => {
    if (code === 0) {
      userInfo.value = data || {}
    } else {
      console.warn(msg)
    }
  },
  onError: (error) => console.warn(error),
})

const fetchData = async () => {
  if (loading.value) return
  await run()
}
</script>
```

### 4. React(手动 `async/await` + `useState`)

```tsx
import { useState } from 'react'

function UserInfo({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  const fetchData = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const { code, data, msg } = await getUserInfo(userId)
      if (code === 0) {
        setUserInfo(data || {})
      } else {
        console.warn(msg)
      }
    } catch (error) {
      console.warn(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button onClick={fetchData} disabled={isLoading}>
      {isLoading ? '加载中...' : '获取用户信息'}
    </button>
  )
}
```

### 5. React + `useRequest`(`ahooks`)

```tsx
import { useState } from 'react'
import { useRequest } from 'ahooks'

function UserInfo({ userId }: { userId: string }) {
  const [userInfo, setUserInfo] = useState({})

  const { loading, runAsync } = useRequest(() => getUserInfo(userId), {
    manual: true,
    onSuccess: ({ code, data, msg }) => {
      if (code === 0) {
        setUserInfo(data || {})
      } else {
        console.warn(msg)
      }
    },
    onError: (error) => console.warn(error),
  })

  const fetchData = async () => {
    if (loading) return
    await runAsync()
  }

  return (
    <button onClick={fetchData} disabled={loading}>
      {loading ? '加载中...' : '获取用户信息'}
    </button>
  )
}
```

---

## 二、安全规范

- **动态 HTML**:富文本、用户输入的 HTML 内容必须用 `DOMPurify.sanitize()` 过滤后再插入 DOM
- **敏感数据**:禁止在 URL 中传递 token、密码、身份证号等;禁止 `console.log` 输出用户凭证、接口密钥
- **跨域配置**:优先使用后端 CORS 配置,禁止使用线上代理转发;开发环境代理仅用于本地调试
- **CSRF 防护**:根据后端要求自动携带 CSRF Token,禁止关闭 CSRF 校验

---

## 三、拦截器规范

所有请求必须通过统一封装的请求实例(如 Axios 实例)发送,拦截器统一处理公共逻辑。

- **请求拦截器职责**:添加请求头(Authorization、Content-Type、版本号)、添加请求标识(请求 ID、时间戳)、敏感参数自动加密、过滤空参数
- **响应拦截器职责**:统一处理状态码(401 跳转登录、403 提示无权限、500 提示服务错误)、剥离外层包装与日期格式转换、记录错误日志、关闭全局 loading

### 超时与重试

- **超时设置**:全局请求超时统一配置为 10-30 秒,特殊场景可单独调整
- **重试机制**:网络错误、超时等非业务错误可自动重试 2-3 次;业务错误禁止重试

---

## 四、请求幂等性约定

| 请求方法 | 幂等性 | 适用场景                           |
| -------- | ------ | ---------------------------------- |
| GET      | 是     | 查询数据、获取列表、详情等只读操作 |
| POST     | 否     | 新增数据、提交表单等写操作         |
| PUT      | 是     | 更新全量数据                       |
| PATCH    | 否     | 更新部分数据                       |
| DELETE   | 是     | 删除数据                           |

> 写操作必须通过 loading 状态、按钮禁用等方式防止重复提交,避免产生重复数据。

---

## 相关文件

- 通用注释规范见 [common-comments.md](./common-comments.md)
