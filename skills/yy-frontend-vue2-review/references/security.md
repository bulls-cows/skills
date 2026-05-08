# 安全漏洞

**维度**：D08
**严重程度**：🔴 严重
**适用文件**：`.vue`

---

## XSS 风险 🔴

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

## 敏感信息泄露 🔴

- 禁止硬编码敏感信息（密码、密钥、Token、私钥）
- 禁止在日志中输出敏感数据
- 禁止在前端代码中暴露后端内部接口地址（非公开 API）

**错误示例**：

```js
// ❌ 硬编码敏感信息
const API_KEY = 'secret-12345'
const PASSWORD = 'admin123'
```
