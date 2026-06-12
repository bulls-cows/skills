# Vue3 专属规则

识别条件：`.vue` 文件使用 `<script setup>` 或 Composition API（`setup()` 函数）。

## 响应式 API 使用分析

- `ref`：基础类型响应式数据，被 `computed`/`watch`/`watchEffect` 依赖时需关注联动范围
- `reactive`：对象/数组响应式数据，关注属性结构变化对依赖方的影响
- `computed`：分析计算属性的依赖来源和缓存失效条件
- `watch`：关注侦听目标、`immediate`/`deep`/`flush` 配置及副作用逻辑
- `watchEffect`：自动依赖追踪，关注首次执行时机和清理逻辑

## 状态管理（Pinia）

- 使用的 `defineStore` 及其 store ID。
- `storeToRefs` 解构出的 state/getter。
- store 中的 `state`/`getters`/`actions` 分析。

## 依赖注入

- `provide` 提供的 key 和值。
- `inject` 注入的 key 和默认值。
- `InjectionKey` 类型定义。

## 特殊组件

- `<Teleport>` 的目标容器和传送内容。
- `<Suspense>` 的异步加载组件和回退内容。
- `<KeepAlive>` 的缓存组件和 `include / exclude / max` 配置。
- `<Transition>` 的过渡动画配置。

## 渲染优化

- `shallowRef` 避免深度追踪的场景。
- `markRaw` 跳过响应式的场景。
- `v-memo` 指令的依赖数组。
- `defineComponent` 的类型推导用途。

## `<script setup>` 语法特性

- 顶层的 `ref` 和 `reactive` 自动暴露给模板
- 导入的组件可直接使用，无需注册
- `use` 开头的函数自动识别为自定义 Hooks
- 编译器宏（defineProps 等）无需导入

## 宏定义分析

- 以 `use` 开头的组合式函数
- 复用逻辑：状态管理、副作用逻辑、计算逻辑
- 常见模式：数据获取、列表管理、表单处理、分页等
- 需标注每个 Hook 的输入、输出和副作用

## 路由依赖

- `useRoute()`：获取路由参数
- `useRouter()`：编程式导航
- 路由守卫：`router.beforeEach`、`beforeResolve`、`afterEach`，关注守卫中访问 store 或执行异步逻辑的场景

## 特殊特性依赖

- `Teleport`：目标 DOM 节点
- `Suspense`：异步组件加载状态
- `async` 组件：动态导入组件

## 异常处理

- `onErrorCaptured`：捕获子组件错误
  - 参数：`err`（错误对象）、`instance`（引发错误的组件实例）、`info`（错误来源信息）
  - 返回值：`true` 可阻止错误传播
- `app.config.errorHandler`：全局错误处理器
- `app.config.warnHandler`：警告处理器（开发环境）
- `app.config.globalProperties`：全局属性/方法
