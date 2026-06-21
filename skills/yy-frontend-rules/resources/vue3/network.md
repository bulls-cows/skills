
# Vue3 网络请求差异（Vue3 特有）

> 通用网络请求规范（async/await、响应单次解构、错误处理、拦截器、取消请求、文件上传/下载、幂等性等）详见 [network.md](../common/network.md)，本文件仅承载 Vue3 与通用规范不同的内容。

## 一、前置检查：是否使用 `useRequest`

**在编写网络请求代码前，先检查项目是否安装了以下任一库：**

- `ahooks-vue`
- `vue-hooks-plus`

**检查方式**：查看项目 `package.json` 的 `dependencies` 是否包含上述包名。

**决策分支**：

- **已安装** → 使用 `useRequest`（自动管理 `loading`/`data`）
- **未安装** → 使用手动 `async/await` + `try/catch/finally`

---

## 二、useRequest 标准模板（已安装时）

### 手动执行（按钮点击/表单提交等场景）

```typescript
import { useRequest } from 'ahooks-vue'

const onLoginSuccess = ({ code, data, msg }: IApiResponse) => {
  if (code === 0) {
    console.log('登录成功')
    // 处理 token、跳转等
  } else {
    console.warn(msg)
  }
}

// login Hook（manual 模式，手动触发）
const { loading, run: runLogin } = useRequest(() => apiPostLogin(loginForm.value), {
  manual: true,
  onSuccess: onLoginSuccess,
  onError: () => {
    console.warn('网络异常，请重试')
  },
})

// 在事件处理函数中调用
const handleSubmit = async () => {
  await runLogin()
}
```

### 带参数（分页场景）

```typescript
import { useRequest } from 'ahooks-vue'
import { ref } from 'vue'

const pagination = ref({ page: 1, limit: 20 })
const total = ref(0)
const dataSource = ref<IUserItem[]>([])

const onListSuccess = ({ code, data, msg }: IApiResponse) => {
  if (code === 0) {
    dataSource.value = data.list ?? []
    total.value = data.total ?? 0
  } else {
    console.warn(msg)
  }
}

const { loading, run: getList } = useRequest(
  (params) => apiGetList(Object.assign({}, pagination.value, params)),
  {
    manual: true,
    onSuccess: onListSuccess,
    onError: (error) => {
      console.warn(error)
    },
  },
)
```

---

## 三、手动执行模板（未安装 useRequest 时）

```typescript
import { ref } from 'vue'

const loading = ref(false)

const handleSubmit = async () => {
  if (loading.value) return // 防重复提交

  loading.value = true
  try {
    const { code, msg } = await apiSubmit(formData.value)
    if (code === 0) {
      console.log('提交成功')
    } else {
      console.warn(msg)
    }
  } catch (error) {
    console.warn(error)
  } finally {
    loading.value = false
  }
}
```

---

## 四、防止重复提交（useRequest / 互斥锁）

### useRequest 方式

`useRequest` 的 `loading` 自动控制，按钮直接用 `:disabled="loading"` 禁用：

```typescript
import { useRequest } from 'ahooks-vue'

const { loading, run } = useRequest(() => apiSubmit(formData.value), {
  manual: true,
  onSuccess: (res) => {
    if (res.code === 0) {
      console.log('提交成功')
    } else {
      console.warn(res.msg)
    }
  },
  onError: (error) => {
    console.warn(error)
  },
})

const handleSubmit = async () => {
  await run()
}
```

### 互斥锁方式（未安装 useRequest）

```typescript
import { ref } from 'vue'

const loading = ref(false)

const handleSubmit = async () => {
  if (loading.value) return // 互斥锁

  loading.value = true
  try {
    const { code, msg } = await apiSubmit(formData.value)
    if (code === 0) {
      console.log('提交成功')
    } else {
      console.warn(msg)
    }
  } catch (error) {
    console.warn(error)
  } finally {
    loading.value = false
  }
}
```

### 模板中关联按钮禁用

```vue
<template>
  <button :disabled="loading" @click="handleSubmit">提交</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)

const handleSubmit = async () => {
  if (loading.value) return

  loading.value = true
  try {
    const { code, msg } = await apiSubmit(formData.value)
    if (code === 0) {
      console.log('提交成功')
    } else {
      console.warn(msg)
    }
  } catch (error) {
    console.warn(error)
  } finally {
    loading.value = false
  }
}
</script>
```

---

## 五、等于运算符偏好 `===`

- **优先推荐使用 `===`**
- 若将 `==` 改为 `===`，需提醒用户手动确认
- 使用 `==` 不视为问题

---

## 六、安全规范（Vue3 增补）

| 安全项       | 规范                                              |
| ------------ | ------------------------------------------------- |
| v-html XSS   | 使用前必须用 DOMPurify 过滤 HTML                  |
| 敏感数据     | 不在 URL 传 token/密码；不 `console.log` 用户凭证 |
| 全局错误捕获 | 配置 `app.config.errorHandler`，配合 Sentry 上报  |

```typescript
// 全局错误捕获 + Sentry 上报
app.config.errorHandler = (err, instance, info) => {
  console.warn(err)
  Sentry.captureException(err)
}
```

---

## 七、风险提示

网络请求相关改造需特别注意：

- 原代码可能使用不同响应结构
- 原有错误处理可能不同
- `async/await` 改变执行时机
- **转换前必须展示 diff 预览并获用户确认**

---

## 八、相关模块引用

| 模块         | 路径                                  |
| ------------ | ------------------------------------- |
| 通用网络规范 | [network.md](../common/network.md)    |
| Vue3 Hooks   | [hooks.md](./hooks.md)                |
| 通用约束清单 | [constraints.md](../common/constraints.md) |
