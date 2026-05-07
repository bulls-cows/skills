# 逻辑与网络请求规范

对应审核维度 D04（🔴 严重）、D05（🟡 中等）、D06（🟡 中等），用于逻辑错误、网络请求和 computed 规范审核。

## 逻辑错误检查（D04）

- **空指针引用**：检查未判空的属性访问
- **数组越界**：检查未校验长度的数组索引访问
- **逻辑判断错误**：检查条件判断逻辑是否正确

## 方法内部逻辑顺序（D04）

方法内代码按以下顺序组织：

1. **初始化方法**：`const initXxx = () => {}`
2. **网络请求**：`const getListData = async () => {}` / `const postFormData = async () => {}`
3. **事件处理**：`const onClickXxx = async () => {}` / `const onChangeXxx = async () => {}`
4. **特殊计算**：`const computedXxx = () => {}`

## ref 访问（D04）

- 必须使用 `.value` 访问 ref 值

## 网络请求规范（D05）

- **必须使用**：`async/await` + `try/catch/finally`
- **禁止**：多层 try/catch 嵌套，异步操作需扁平化
- **禁止连续解构**：禁止 `...data.data` 等连续解构
- **统一响应处理模式**：

```typescript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  // 处理成功逻辑
} else {
  // 处理失败逻辑
}
```

## computed 规范（D06）

- 必须使用 `try/catch` 包裹
- 命名使用有意义名称（如 `isXxx`/`hasXxx`/`visibleXxx` 等）
