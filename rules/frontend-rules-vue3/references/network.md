# 异步与网络请求规范

本模块定义 Vue3 项目中的异步处理、网络请求和安全规范。

## 一、网络请求规范

### 1.1 异步处理

- 必须使用 `async/await`，少用 `.then()` 链式写法
- 必须配合 `try/catch/finally` 错误处理

### 1.2 数据解构

- 单次解构，禁止连续解构如 `...data.data`
- 统一响应模式 `{code, data, msg}` 解构处理

```typescript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  // 处理成功逻辑
} else {
  console.warn(msg);
}
```

### 1.3 错误处理

- 使用 `try/catch/finally` 结构
- `catch` 中使用 `console.warn`
- `finally` 中处理状态清理（如 loading 状态重置）

```typescript
const fetchData = async () => {
  isLoading.value = true;
  try {
    const { code, data, msg } = await apiGetUserInfo(userId.value);
    if (code === 0) {
      userData.value = data;
    } else {
      console.warn(msg);
    }
  } catch (err) {
    console.warn('fetchData error:', err);
  } finally {
    isLoading.value = false;
  }
};
```

### 1.4 防止重复提交

- 使用 loading 状态或防抖机制防止重复请求

## 二、等于运算符

- 优先推荐使用 `===`
- 若将 `==` 改为 `===`，需提醒用户手动确认
- 使用 `==` 不视为问题

## 三、安全规范

| 安全项 | 规范 |
|--------|------|
| v-html XSS | 使用前必须用 DOMPurify 过滤 HTML |
| 敏感数据 | 不在 URL 传 token/密码；不 `console.log` 用户凭证 |
| 全局错误捕获 | 配置 `app.config.errorHandler`，配合 Sentry 上报 |
