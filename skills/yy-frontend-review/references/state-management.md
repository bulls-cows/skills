# 状态管理专项审核规则

在识别到对应状态管理库的特征时适用。

## Pinia（Vue3）

特征：`defineStore`、`useXxxStore`、`storeToRefs`、`$patch`、`$reset`

中等：

- 直接修改状态：在组件中直接修改 store 状态而非通过 actions（setup store 的 action 外直接赋值）
- 解构丢失响应性：从 store 解构状态时未使用 `storeToRefs`，导致状态变化不触发渲染
- 异步处理缺失：异步操作（API 调用）没有在 store action 中处理 loading/error 状态
- 状态外泄：store 中定义了响应式状态但未通过 getters 暴露计算逻辑，导致多个组件重复计算

## Redux Toolkit

特征：`createSlice`、`createAsyncThunk`、`configureStore`、`useSelector`、`useDispatch`

中等：

- 异步逻辑外置：在组件中直接 dispatch 异步逻辑而非使用 `createAsyncThunk` 或自定义 middleware
- Selector 性能问题：selector 返回新的对象引用导致不必要的重渲染（应使用 `createSelector` 或浅比较）
- Store 设计问题：slice 职责混杂、冗余状态派生、normalize 缺失

## Zustand

特征：`create`（从 `zustand` 导入）、`useStore`、`createWithEqualityFn`

中等：

- 状态粒度过粗：单个 store 包含过多不相关状态，导致订阅范围过大和不必要渲染
- Selector 缺失：直接消费整个 store 而非使用 selector 选择需要的切片
- 副作用管理：异步操作未封装为 store action，散落在组件中
