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

### Redux

| 成员/Hook        | 说明                   | 组件中使用方式                               |
| ---------------- | ---------------------- | -------------------------------------------- |
| `Provider`       | 提供 store 给子组件    | `<Provider store={store}><App /></Provider>` |
| `useSelector`    | 读取 state             | `const value = useSelector(selector)`        |
| `useDispatch`    | 派发 action            | `const dispatch = useDispatch()`             |
| `createSlice`    | 定义 reducer 和 action | 配置 `name`、`initialState`、`reducers`      |
| `configureStore` | 创建 Redux store       | 配置 `reducer`、`middleware`、`devTools`     |

### Redux 中间件

| 中间件        | 说明            | 使用场景                                  |
| ------------- | --------------- | ----------------------------------------- |
| `redux-thunk` | 支持异步 action | `dispatch(() => async dispatch => {...})` |
| `redux-saga`  | 声明式副作用    | 使用 `takeEvery`、`call`、`put`           |

### Context API

| 成员            | 说明       | 组件中使用方式                                |
| --------------- | ---------- | --------------------------------------------- |
| `createContext` | 创建上下文 | `const Context = createContext(defaultValue)` |
| `Provider`      | 提供值     | `<Context.Provider value={...}>`              |
| `useContext`    | 消费上下文 | `const value = useContext(Context)`           |

### Context 性能优化

- 拆分 Context：避免不相关状态变化导致不必要的重渲染
- 使用 `useMemo`：缓存 Context 的 value 值
- 组件组合：优先使用组件组合而非 Context

### MobX

| 成员/Hook            | 说明                 | 组件中使用方式             |
| -------------------- | -------------------- | -------------------------- |
| `makeAutoObservable` | 自动设置响应式       | `makeAutoObservable(this)` |
| `observer`           | 高阶组件包装         | `observer(Component)`      |
| `runInAction`        | 在 action 外更新状态 | `runInAction(() => {...})` |
| `computed`           | 计算属性             | `get xxx() { return ... }` |
| `action`             | 方法装饰器/函数      | 标记状态修改方法           |

### MobX 响应式特性

- 自动追踪依赖：访问 observable 属性时自动追踪
- 批处理：`runInAction` 可批处理多个状态更新
- 反应：`autorun`、`reaction`、`when` 可观察状态变化

### 其他状态管理

- Zustand：`create` 定义的 store、选择器函数。
- Jotai / Recoil 等：原子状态定义和消费方式。

## 渲染优化

- `React.memo`：浅比较策略、自定义 `areEqual`。
- `useMemo`：缓存计算值的依赖和触发条件。
- `useCallback`：缓存回调的依赖和触发条件。
- `key` 属性：列表渲染中的 key 选择策略。

### 渲染优化对比

- `React.memo`：包装组件，基于 props 变化决定是否重新渲染
- `useMemo`：缓存计算结果，基于依赖变化决定是否重新计算
- `useCallback`：缓存函数引用，基于依赖变化决定是否返回新函数

## JSX 分析

- 条件渲染：`&&` 短路、三元表达式、立即执行函数的分支条件。
- 列表渲染：`map` 的数据源、`key` 绑定、渲染项组件。
- 插槽模式：`children` 的传递、`render props` 模式。
- Fragment 使用：`<></>` 或 `<React.Fragment>` 包裹多元素的场景。

## TypeScript 集成

- `interface Props` 或 `type Props` 类型定义。
- 泛型组件的类型参数。
- `React.FC<Props>` 或 `React.VFC<Props>` 类型标注。
- 事件类型（`React.ChangeEvent / React.MouseEvent` 等）。
- `as` 断言和类型守卫的使用场景。

### 类组件分析参考

| 成员    | 类型 | 说明                                 |
| ------- | ---- | ------------------------------------ |
| `state` | 对象 | 组件内部状态，需使用 `setState` 更新 |
| `props` | 对象 | 组件接收的属性（只读）               |
| `refs`  | 对象 | 引用 DOM 节点或类组件实例            |

### 特殊 Props 分析

| 属性        | 说明                     | 使用场景                 |
| ----------- | ------------------------ | ------------------------ |
| `children`  | 子组件/子元素            | 组件组合、插槽           |
| `key`       | 列表渲染时的唯一标识     | 列表 Diff 优化           |
| `ref`       | DOM 元素或类组件实例引用 | DOM 操作、类组件方法调用 |
| `className` | CSS 类名                 | 样式绑定                 |
| `style`     | 内联样式对象             | 动态样式                 |

## Hooks 执行顺序规则

- Hooks 必须在组件顶层调用，不能在条件语句、循环或嵌套函数中调用
- 渲染顺序决定状态索引，顺序改变会导致状态错乱
- 自定义 Hooks 同样遵循此规则

## 渲染触发条件

- `setState` 调用触发重新渲染
- `props` 变化触发重新渲染
- 父组件渲染触发子组件渲染（除非使用 `React.memo`）
- `key` 变化会销毁旧组件、创建新组件

## 路由依赖（React Router 6+）

| 特性            | 说明                     | 分析要点                               |
| --------------- | ------------------------ | -------------------------------------- |
| `useParams`     | 获取路由参数             | 返回对象，如 `{ id: '1' }`             |
| `useNavigate`   | 编程式导航               | `navigate('/path', { replace: true })` |
| `useLocation`   | 获取当前路径             | `pathname`、`search`、`hash`、`state`  |
| `useRoutes`     | 条件渲染路由             | 基于配置的路由表                       |
| `Loader/Action` | 数据加载和表单操作       | 服务端渲染和数据提交                   |
| `Outlet`        | 嵌套路由渲染             | 子路由的渲染位置                       |
| `Index`         | 默认路由                 | `/` 路径的默认组件                     |
| `Navigate`      | 重定向组件               | `<Navigate to="/path" replace />`      |
| 路由懒加载      | `React.lazy`、`Suspense` | 分割代码，提升首屏性能                 |

## 异常处理

### Error Boundary 使用约束

- 只能捕获**子组件**的错误，不能捕获自身错误
- 只能捕获**渲染阶段**的错误，不能捕获事件处理、异步代码的错误
- 错误边界组件必须是类组件（或使用 `static getDerivedStateFromError`）

### React 18 错误处理

- `react-error-boundary` 库：社区流行的错误边界解决方案
- `useErrorBoundary` Hook（React 18+）：在函数组件中触发错误边界

## 框架专属特殊特性

| 特性               | 说明                      | 分析要点                                    |
| ------------------ | ------------------------- | ------------------------------------------- |
| **HOC**            | 高阶组件，组件增强        | 属性代理、继承反转、反向植入                |
| **Render Props**   | 将渲染逻辑作为 props 传递 | children 作为函数、参数传递                 |
| **Fragment**       | 多根节点组件              | `<>...</>` 语法                             |
| **Portals**        | 渲染到父组件外部 DOM      | 事件冒泡、DOM 层级                          |
| **Error Boundary** | 错误边界组件              | componentDidCatch、getDerivedStateFromError |
| **Profiler**       | 性能分析                  | onRender 回调、性能指标                     |
| **StrictMode**     | 开发时严格模式            | 双重渲染、副作用检测                        |
