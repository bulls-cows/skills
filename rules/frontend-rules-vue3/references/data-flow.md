# 数据流与组件通信

本模块定义 Vue3 项目中 provide/inject、路由守卫清理与组件暴露规范。

> ref/reactive/computed 详见 [reactivity.md](./reactivity.md)
> watch/watchEffect 详见 [watch.md](./watch.md)

## provide / inject 规范

- **使用场景**：仅用于深层组件传参（3 层以上），避免逐层传递 props
- **兄弟组件通信**：使用 Pinia/Vuex，禁止通过 provide/inject 跨层级滥用
- **响应式传递**：注入对象需保持响应式，使用 `provide('key', refValue)`

## 路由守卫清理

- `beforeRouteLeave` 中清理定时器、取消未完成请求、关闭弹窗
- 全局守卫统一处理登录校验、权限控制

## defineExpose

- 明确声明对外暴露的属性和方法
- 父组件通过 `ref` 访问子组件暴露的内容

```typescript
// 对外暴露
defineExpose({
  fetchData,
  resetForm
});
```
