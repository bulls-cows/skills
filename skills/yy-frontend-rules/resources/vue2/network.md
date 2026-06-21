
# Vue2 网络请求差异（Vue2 特有）

> 通用网络请求规范（async/await、响应单次解构、错误处理、防重复提交、安全规范、拦截器、取消请求、文件上传/下载、幂等性等）详见 [network.md](../common/network.md)，本文件仅承载 Vue2 与通用规范不同的内容。

## 一、消息提示使用 `this.$message`

Vue2（Options API）中统一通过 `this.$message` 进行用户反馈提示：

```javascript
const { code, data, msg } = await apiXXX()
if (code === 0) {
  this.$message.success(msg || '操作成功')
} else {
  this.$message.error(msg)
}
```

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

---

## 二、等于运算符偏好 `==`

- Vue2 项目中**优先推荐 `==`**（与 Vue3/React 通用规范的 `===` 偏好相反）
- 若将 `===` 改为 `==`，需提醒用户手动确认
- 注释相关问题默认忽略

> ⚠️ 此为 Vue2 历史项目约定，新项目应遵循通用规范优先 `===`。

---

## 三、方法函数规范（强制）

所有 `methods` 中的函数必须遵守以下两条规则：

1. **前置参数校验**：依赖的数据（props/row/query 等）在使用前必须做非空判断，缺失时通过 `this.$message.warning` 提示用户并 `return` 终止执行
2. **try-catch 错误保底**：方法体必须包裹在 try-catch 中，catch 中使用 `console.warn(error)` 记录异常，避免未捕获错误导致页面崩溃

```javascript
async onClickSupervise(row) {
  try {
    if (!row.regulatedEntityId) {
      this.$message.warning('缺少单位信息，无法督办')
      return
    }
    // 业务逻辑...
  } catch (error) {
    console.warn(error)
  }
}
```

**例外**：仅含单行逻辑的简单方法（如纯赋值、纯 emit）可省略，但涉及异步操作、API 调用、路由跳转的方法必须严格遵守。

---

## 四、相关模块引用

| 模块           | 路径                                       |
| -------------- | ------------------------------------------ |
| 通用网络规范   | [network.md](../common/network.md)         |
| 通用约束清单   | [constraints.md](../common/constraints.md) |
| 方法函数规范   | [constraints.md](../common/constraints.md#四方法函数规范强制) |
| Vue2 响应式    | [reactivity.md](./reactivity.md)           |
