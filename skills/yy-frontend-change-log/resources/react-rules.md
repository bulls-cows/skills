# React 专属规则

识别条件：文件导入 `react` 或使用 JSX/TSX 语法。

## 组件类型识别

- 函数组件（Function Component）：识别参数（Props 类型）和返回值。
- 类组件（Class Component）：`constructor`、`render` 方法、生命周期方法。
- `forwardRef` 包裹：识别 `ref` 转发和 `useImperativeHandle` 暴露的方法。
- `memo` 包裹：识别浅比较策略和自定义 `areEqual` 函数。

## Hooks 完整分析

- `useState`：状态名称、类型、初始值、更新函数名。
- `useEffect`：依赖数组内容、副作用逻辑、清理函数（return 函数）。
- `useLayoutEffect`：同步布局副作用的用途。
- `useCallback`：缓存的回调函数、依赖数组和触发条件。
- `useMemo`：缓存的计算值、依赖数组和触发条件。
- `useRef`：DOM 引用或可变值的用途。
- `useContext`：消费的 Context 对象和提供的值。
- `useReducer`：reducer 函数逻辑、初始状态、dispatch 调用场景。

## 自定义 Hooks

- 识别所有 `use*` 函数，说明入参、返回值和内部状态。
- 多个 Hook 之间的组合关系和调用顺序。

## 组件通信

- Props 向下传递：逐层传递的属性名和用途。
- 回调函数向上通信：`on*` 模式的回调函数名和载荷。
- Context 跨层级传递：Provider 提供的值、Consumer 消费的值。
- Ref 转发：`useImperativeHandle` 暴露的方法列表。

## 状态管理

识别使用的状态管理方案，分析以下要点：

- **Redux**：识别 `useSelector` 读取的 state 字段和 selector 逻辑、`useDispatch` 派发的 action 类型和载荷、`createSlice` 定义的 reducer 规则。关注 `Provider` 的 store 传递层级。
- **Context API**：识别 Provider 提供的值范围、useContext 消费的字段。关注拆分 Context 避免不必要重渲染、`useMemo` 缓存 value 等性能优化手段。
- **MobX**：识别 `makeAutoObservable` 标记的 store 类、`observer` 包装的组件、`computed` 计算属性和 `action` 方法。关注 `autorun`/`reaction`/`when` 的反应逻辑。
- **Zustand / Jotai / Recoil**：识别 store 定义方式、选择器函数、原子状态定义和消费方式。

## 渲染优化

- `React.memo`：浅比较策略、自定义 `areEqual` 函数。关注哪些 props 触发了浅比较失效（对象/函数引用变化）。
- `useMemo`：缓存计算值的依赖和触发条件。关注是否避免了不必要的重计算。
- `useCallback`：缓存回调的依赖和触发条件。关注是否避免了子组件不必要的重渲染。
- `key` 属性：列表渲染中的 key 选择策略。关注是否使用了稳定唯一的值。

## JSX 分析

- 条件渲染：`&&` 短路、三元表达式、立即执行函数的分支条件。
- 列表渲染：`map` 的数据源、`key` 绑定、渲染项组件。
- 插槽模式：`children` 的传递、`render props` 模式。
- Fragment 使用：`<></>` 或 `<React.Fragment>` 包裹多元素的场景。

## TypeScript 集成

- `interface Props` 或 `type Props` 类型定义。
- 泛型组件的类型参数。
- 事件类型（`React.ChangeEvent / React.MouseEvent` 等）。
- `as` 断言和类型守卫的使用场景。

## 异常处理

- Error Boundary：只能捕获子组件渲染阶段的错误，不能捕获事件处理和异步错误。
- `react-error-boundary` 库的使用和 `useErrorBoundary` Hook（React 18+）。
