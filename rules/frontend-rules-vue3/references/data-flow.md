# 数据流与状态管理

本模块定义 Vue3 Composition API 下的数据流与状态管理规范。

## ref/reactive 与 computed 使用原则

- 优先使用 `ref`，复杂对象使用 `reactive`
- 除后端交互数据和部分定时器外，一律尽可能使用 `computed`
- 减少冗余 ref 属性，优先派生计算
- ref 访问必须使用 `.value`

## computed 规范

- 必须使用 `try/catch` 包裹
- 命名使用 `is` / `has` / `visible` 或有意义的名称

```typescript
// computed: 是否全选
const isSelected = computed(() => {
  try {
    return selectedItems.value.length === totalItems.value;
  } catch {
    return false;
  }
});
```

## watch 规范

- **深度监听**：对象/数组变化必须声明 `deep: true`
- **立即执行**：初始化需触发时加 `immediate: true`
- **清理资源**：定时器、事件监听在组件销毁时清理

```typescript
watch(searchQuery, (newVal, oldVal) => {
  // 处理搜索关键词变化
}, { immediate: true, deep: true });
```

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
