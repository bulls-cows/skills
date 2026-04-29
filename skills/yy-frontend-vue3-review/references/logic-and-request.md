# 逻辑错误与网络请求规范审核细则

## 逻辑错误检查

- 是否有空指针引用
- 是否有数组越界
- 是否有逻辑判断错误

## ref 和 computed 使用

- 优先使用 `ref`，复杂对象使用 `reactive`
- 除和后端交互的数据和部分定时器外，其它尽可能使用 `computed`

## computed 规范

- 必须使用 `try/catch` 包裹
- 命名使用 `is` / `has` / `visible` 或其它有意义的名称

## 方法内部逻辑顺序

1. 初始化方法：`const initXxx = () =>`
2. 网络请求：`const getListData = async ()`, `const postFormData = async ()`
3. 事件处理：`const onClickXxx = async ()`, `const onChangeXxx = async ()`
4. 特殊计算：`const computedXxx = () =>`

## 网络请求开发规范

- **异步处理**：所有网络请求函数必须使用 async/await
- **错误处理**：必须 try/catch/finally
- **数据解构**：单次解构，禁止 `...data.data`
- **统一响应处理**：推荐统一使用解构 + 状态判断

```typescript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  // 处理成功逻辑
} else {
  // 处理失败逻辑
}
```
