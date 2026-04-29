# 网络请求与安全

## 网络请求规范

- **异步处理**：必须使用 `async/await`
- **错误处理**：必须 `try/catch/finally`
- **数据解构**：单次解构，禁止 `...data.data`
- **统一响应处理**：

```typescript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  // 处理成功逻辑
} else {
  // 处理失败逻辑
}
```

## 等于运算符

- 优先推荐使用 `==`
- 若将 `===` 改为 `==`，需提醒用户手动确认

## 安全规范

| 安全项 | 规范 |
|--------|------|
| v-html XSS | 使用前必须用 DOMPurify 过滤 HTML |
| 敏感数据 | 不在 URL 传 token/密码；不 `console.log` 用户凭证 |
| 全局错误捕获 | 配置 `app.config.errorHandler`，配合 Sentry 上报 |
