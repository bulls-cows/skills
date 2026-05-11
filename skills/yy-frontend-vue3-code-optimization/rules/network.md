# Vue3 网络请求规范

本规范涵盖 API 请求的异步处理、错误处理、响应解构、状态管理及防重复提交等规范。

---

## 一、异步处理

- **必须使用 `async/await`**，禁止 `.then()` 链式调用
- 统一使用 `try/catch/finally` 结构处理异常

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
-   }).catch(err => {
-     console.error(err)
-     isLoading.value = false
-   })
- }

+ // 优化后：Async/Await + try/catch/finally
+ const fetchData = async () => {
+   isLoading.value = true
+   try {
+     const res = await getUserInfo(userId.value)
+     if (res.code === 200) { /* 数据处理 */ }
+   } catch (err) {
+     console.warn(err)
+   } finally {
+     isLoading.value = false  // 只需写一次
+   }
+ }
```

---

## 二、响应处理

### 数据解构

- **单次解构**，**禁止** `...data.data` 连续解构
- 统一响应模式 `{ code, data, msg }` 解构处理

```typescript
// ✅ 正确：单次解构
const { code, data, msg } = await api.getUserList();

// ❌ 错误：连续解构
const { data: { data: list } } = await api.getUserList();  // 禁止
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

### 必须处理的状态

必须处理 API 请求的 `loading`、`error` 和空数据状态，**避免界面静默失败**：

```typescript
const loading = ref(false);
const error = ref<string | null>(null);
const listData = ref<any[]>([]);

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    const { code, data, msg } = await apiGetList();
    if (code === 0) {
      listData.value = data ?? [];
    } else {
      error.value = msg;
      console.warn(msg);
    }
  } catch (err) {
    error.value = '请求失败';
    console.warn(err);
  } finally {
    loading.value = false;
  }
};
```

### 禁止空 catch

捕获错误后必须进行记录、UI 兜底或向上抛出，**禁止空 `catch`**：

```typescript
// ❌ 错误：空 catch
try {
  await apiGetData();
} catch (err) {
  // 禁止空 catch
}

// ✅ 正确：错误记录
try {
  await apiGetData();
} catch (err) {
  console.warn(err);
  error.value = '加载失败';
}
```

---

## 四、防止重复提交

- 对于表单提交、支付等写操作，在请求进行中**必须**通过 `loading` 状态禁用提交按钮，或使用互斥锁，防止用户重复点击

```typescript
const submitting = ref(false);

const handleSubmit = async () => {
  if (submitting.value) return;  // 互斥锁

  submitting.value = true;
  try {
    const { code, msg } = await apiSubmit(formData.value);
    if (code === 0) {
      // 提交成功
    } else {
      console.warn(msg);
    }
  } catch (err) {
    console.warn(err);
  } finally {
    submitting.value = false;
  }
};
```

---

## 五、风险：异步与网络请求

- 原代码可能使用不同响应结构
- 原有错误处理可能不同
- `async/await` 改变执行时机
- 转换前必须展示 diff 预览并获用户确认
