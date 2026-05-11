# Vue3 网络请求规范

本规范涵盖 API 请求的异步处理、错误处理、响应解构、状态管理及防重复提交等规范。

## 一、前置检查：是否使用 `useRequest`

**在编写网络请求代码前，先检查项目是否安装了以下任一库：**

- `ahooks-vue`
- `vue-hooks-plus`

**检查方式**：查看项目 `package.json` 的 `dependencies` 是否包含上述包名。

**已安装** → 使用 `useRequest`（自动管理 `loading`/`data`）
**未安装** → 使用手动 `async/await` + `try/catch/finally`

---

### ✅ 已安装 `useRequest` 时使用如下写法

#### 自动执行（页面初始化自动请求）

```typescript
import { useRequest } from "ahooks-vue"; // 或 'vue-hooks-plus'
import { ref } from "vue";

const pagination = ref({ page: 1, limit: 20 });
const total = ref(0); // 总记录数（响应数据）
const dataSource = ref<any[]>([]);

const onListSuccess = ({ code, data, msg }: IApiResponse) => {
  if (code === 0) {
    dataSource.value = data ?? [];
  } else {
    console.warn(msg);
  }
};

const { loading } = useRequest(() => apiGetList(pagination.value), {
  onSuccess: onListSuccess,
  onError: (error) => {
    console.warn(error);
  },
});
```

#### 手动执行（按钮点击/表单提交等场景）

```typescript
import { useRequest } from "ahooks-vue";

const onLoginSuccess = ({ code, data, msg }: IApiResponse) => {
  if (code === 0) {
    console.log("登录成功");
    // 处理 token、跳转等
  } else {
    console.warn(msg);
  }
};

// login Hook（manual 模式，手动触发）
const { loading, run: runLogin } = useRequest(
  () => apiPostLogin(loginForm.value),
  {
    manual: true,
    onSuccess: onLoginSuccess,
    onError: () => {
      console.warn("网络异常，请重试");
    },
  },
);

// 在事件处理函数中调用
const handleSubmit = async () => {
  await runLogin();
};
```

#### 带参数（分页场景）

```typescript
import { useRequest } from "ahooks-vue";
import { ref } from "vue";

const pagination = ref({ page: 1, limit: 20 });

const total = ref(0); // 总记录数（响应数据）
const dataSource = ref<any[]>([]);

const onListSuccess = ({ code, data, msg }: IApiResponse) => {
  if (code === 0) {
    dataSource.value = data.list ?? [];
    total.value = data.total ?? 0;
  } else {
    console.warn(msg);
  }
};

const { loading, run: getList } = useRequest(
  (params) => apiGetList(Object.assign({}, pagination.value, params)),
  {
    manual: true,
    onSuccess: onListSuccess,
    onError: (error) => {
      console.warn(error);
    },
  },
);
```

---

### ⚙️ 未安装 `useRequest` 时使用如下写法

#### 自动执行（页面初始化自动请求）

```typescript
const loading = ref(false);
const dataSource = ref<IUserInfo[]>([]);

const fetchData = async () => {
  loading.value = true;
  try {
    const { code, data, msg } = await apiGetList({ page: 1, limit: 20 });
    if (code === 0) {
      dataSource.value = data ?? [];
    } else {
      console.warn(msg);
    }
  } catch (error) {
    console.warn(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
```

#### 手动执行（按钮点击/表单提交等场景）

```typescript
const loading = ref(false);

const handleSubmit = async () => {
  if (loading.value) return; // 防重复提交

  loading.value = true;
  try {
    const { code, msg } = await apiSubmit(formData.value);
    if (code === 0) {
      console.log("提交成功");
    } else {
      console.warn(msg);
    }
  } catch (error) {
    console.warn(error);
  } finally {
    loading.value = false;
  }
};
```

---

## 二、异步处理

### 基本原则

- **必须使用 `async/await`**，禁止 `.then()` 链式调用
- 统一使用 `try/catch/finally` 结构（未使用 `useRequest` 时）

### 必须处理的状态

手动发起网络请求时，**只需管理 `loading` 和数据 `ref`**，不需要 `error` ref：

```typescript
const dataSource = ref<IUserInfo[]>([]);
const loading = ref(false);
```

### 目标结构

```typescript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  // 数据处理
} else {
  console.warn(msg);
}
```

### 优化示例

展示给用户确认时，**必须使用 diff 格式展示变更前后对比**：

```diff
- // 优化前：Promise 链式调用
- const fetchData = () => {
-   isLoading.value = true
-   getUserInfo(userId.value).then(res => {
-     if (res.code == 200) { /* 数据处理 */ }
-     isLoading.value = false
-   }).catch(error => {
-     console.error(error)
-     isLoading.value = false
-   })
- }

+ // 优化后：Async/Await + try/catch/finally
+ const fetchData = async () => {
+   isLoading.value = true
+   try {
+     const res = await getUserInfo(userId.value)
+     if (res.code === 200) { /* 数据处理 */ }
+   } catch (error) {
+     console.warn(error)
+   } finally {
+     isLoading.value = false  // 只需写一次
+   }
+ }
```

#### 自动执行（页面初始化自动请求）

```typescript
const dataSource = ref<IUserInfo[]>([]);
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  try {
    const { code, data, msg } = await apiGetList({ page: 1, limit: 20 });
    if (code === 0) {
      dataSource.value = data ?? [];
    } else {
      console.warn(msg);
    }
  } catch (error) {
    console.warn(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
```

#### 手动执行（按钮点击/表单提交等场景）

```typescript
const loading = ref(false);

const handleSubmit = async () => {
  if (loading.value) return; // 防重复提交

  loading.value = true;
  try {
    const { code, msg } = await apiSubmit(formData.value);
    if (code === 0) {
      console.log("提交成功");
    } else {
      console.warn(msg);
    }
  } catch (error) {
    console.warn(error);
  } finally {
    loading.value = false;
  }
};
```

---

## 三、响应处理

### 数据解构

- **单次解构**，**禁止** `...data.data` 连续解构
- 统一响应模式 `{ code, data, msg }` 解构处理

```typescript
// ✅ 正确：单次解构
const { code, data, msg } = await api.getUserList();

// ❌ 错误：连续解构
const {
  data: { data: list },
} = await api.getUserList(); // 禁止
```

### 先判断成功后使用数据

必须先根据项目约定（如 `code === 0` 或 `code === 200`）判断请求是否成功，再访问返回的业务数据：

```typescript
// 错误：假设 res.data 一定存在
const res = await api.getUserList();
const list = res.data;

// 正确：先判断成功，再做类型守卫
const res = await api.getUserList();
if (res.success && Array.isArray(res.data)) {
  const list = res.data;
}

// 统一模式
const { code, data, msg } = await apiXXX();
if (code === 0) {
  // 成功处理
} else {
  console.warn(msg);
}
```

---

## 三、错误处理

### 禁止空 `catch`

捕获错误后必须进行记录，**禁止空 `catch`**：

```typescript
// ❌ 错误：空 catch
try {
  await apiGetData();
} catch (error) {
  // 禁止空 catch
}

// ✅ 正确：catch 中 console.warn 即可
try {
  await apiGetData();
} catch (error) {
  console.warn(error);
}
```

### 业务错误处理

业务侧返回的非成功状态码，在 `else` 分支中 `console.warn` 记录即可：

```typescript
const { code, data, msg } = await apiGetData();
if (code === 0) {
  // 成功处理
} else {
  console.warn(msg); // 业务错误日志
}
```

---

## 四、防止重复提交

- 对于表单提交、支付等写操作，在请求进行中**必须**通过 `loading` 状态禁用提交按钮，或使用互斥锁，防止用户重复点击

### `useRequest` 方式

`useRequest` 的 `loading` 自动控制，按钮直接用 `:disabled="loading"` 禁用：

```typescript
import { useRequest } from "ahooks-vue";

const {
  loading,
  loading: loading,
  run,
} = useRequest(() => apiSubmit(formData.value), {
  manual: true,
  onSuccess: (res) => {
    if (res.code === 0) {
      console.log("提交成功");
    } else {
      console.warn(res.msg);
    }
  },
  onError: (error) => {
    console.warn(error);
  },
});

const handleSubmit = async () => {
  await run();
};
```

### 互斥锁方式（未安装 useRequest）

```typescript
const loading = ref(false);

const handleSubmit = async () => {
  if (loading.value) return; // 互斥锁

  loading.value = true;
  try {
    const { code, msg } = await apiSubmit(formData.value);
    if (code === 0) {
      // 提交成功
    } else {
      console.warn(msg);
    }
  } catch (error) {
    console.warn(error);
  } finally {
    loading.value = false;
  }
};
```

### loading 状态关联按钮禁用（未安装 useRequest）

```typescript
const loading = ref(false);

const handleSubmit = async () => {
  if (loading.value) return; // 互斥锁

  loading.value = true;
  try {
    const { code, msg } = await apiSubmit(formData.value);
    if (code === 0) {
      // 提交成功
    } else {
      console.warn(msg);
    }
  } catch (error) {
    console.warn(error);
  } finally {
    loading.value = false;
  }
};
```

### loading 状态关联按钮禁用

```vue
<template>
  <button :disabled="loading" @click="handleSubmit">提交</button>
</template>

<script setup>
const loading = ref(false);

const handleSubmit = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { code, msg } = await apiSubmit(formData.value);
    if (code === 0) {
      console.log("提交成功");
    } else {
      console.warn(msg);
    }
  } catch (error) {
    console.warn(error);
  } finally {
    loading.value = false;
  }
};
</script>
```

---

## 五、等于运算符

- 优先推荐使用 `===`
- 若将 `==` 改为 `===`，需提醒用户手动确认
- 使用 `==` 不视为问题

---

## 六、安全规范

| 安全项       | 规范                                              |
| ------------ | ------------------------------------------------- |
| v-html XSS   | 使用前必须用 DOMPurify 过滤 HTML                  |
| 敏感数据     | 不在 URL 传 token/密码；不 `console.log` 用户凭证 |
| 全局错误捕获 | 配置 `app.config.errorHandler`，配合 Sentry 上报  |

---

## 七、风险提示

- 原代码可能使用不同响应结构
- 原有错误处理可能不同
- `async/await` 改变执行时机
- 转换前必须展示 diff 预览并获用户确认
