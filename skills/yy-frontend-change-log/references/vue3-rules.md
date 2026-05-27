# Vue3 专属规则

识别条件：`.vue` 文件使用 `<script setup>` 或 Composition API（`setup()` 函数）。

## 响应式系统分析

- `ref()`：列出所有 ref 变量，说明 `.value` 使用场景和类型。
- `reactive()`：列出响应式对象的属性结构和用途。
- `shallowRef / shallowReactive`：说明浅层响应的使用原因。
- `toRef / toRefs / toRaw`：说明响应式转换的场景。

## 宏定义分析

- `defineProps`：属性名、类型、是否必填、默认值（含 `withDefaults` 写法）。
- `defineEmits`：事件名、载荷类型。
- `defineExpose`：暴露的属性/方法列表。
- `defineOptions`：组件名称等配置项。
- `defineSlots`：插槽名称和类型约束。
- `defineModel`：双向绑定模型定义（Vue 3.4+）。

## 组合式函数（Composables）

- 识别所有 `use*` 自定义 Hooks，说明入参、返回值和内部状态。
- 多个 Hook 之间的依赖关系和调用顺序。

## 生命周期分析

- 列出所有使用的 `on*` 钩子（`onMounted / onUpdated / onUnmounted / onBeforeMount / onBeforeUpdate / onBeforeUnmount`），说明用途和执行时机。

## 侦听器分析

- `watch`：侦听目标、`immediate / deep / flush` 配置、处理逻辑。
- `watchEffect / watchPostEffect / watchSyncEffect`：自动依赖追踪的目标和副作用。

## 状态管理（Pinia）

| 辅助函数      | 说明                    | 导入方式                              |
| ------------- | ----------------------- | ------------------------------------- |
| `storeToRefs` | 将 store 转为响应式引用 | `import { storeToRefs } from 'pinia'` |
| `defineStore` | 定义 store              | `import { defineStore } from 'pinia'` |

- 使用的 `defineStore` 及其 store ID。
- `storeToRefs` 解构出的 state/getter。
- store 中的 `state / getters / actions` 分析。

## 依赖注入

| API       | 说明             | 响应式特性                 |
| --------- | ---------------- | -------------------------- |
| `provide` | 祖先组件提供数据 | 支持响应式（ref/reactive） |
| `inject`  | 子孙组件注入数据 | 支持响应式、默认值         |

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

## 响应式 API 参考

| API           | 类型 | 说明                                            | 依赖关系                             |
| ------------- | ---- | ----------------------------------------------- | ------------------------------------ |
| `ref`         | 函数 | 定义响应式基本类型数据（String/Number/Boolean） | 被 computed、watch、watchEffect 依赖 |
| `reactive`    | 函数 | 定义响应式复杂类型数据（Object/Array）          | 被 computed、watch、watchEffect 依赖 |
| `computed`    | 函数 | 计算属性，基于响应式依赖计算                    | 依赖 ref、reactive、其他 computed    |
| `watch`       | 函数 | 侦听特定数据变化，执行回调                      | 依赖 ref、reactive、computed         |
| `watchEffect` | 函数 | 立即执行的响应式侦听                            | 依赖 ref、reactive、computed         |

## 宏定义参考

| 宏              | 说明                                        | 使用场景                               |
| --------------- | ------------------------------------------- | -------------------------------------- |
| `defineProps`   | 定义 props，支持类型校验和默认值            | 接收父组件传递的数据                   |
| `defineEmits`   | 定义 emits，声明组件触发的事件              | 向父组件传递事件                       |
| `defineExpose`  | 暴露属性给父组件（`<script setup>` 中使用） | 父组件通过 template ref 访问子组件属性 |
| `defineOptions` | 定义组件选项（name、inheritAttrs 等）       | 配置组件元数据                         |
| `defineSlots`   | 定义插槽类型（仅 TypeScript）               | 类型检查                               |

## 自定义 Hooks 分析模式

- 以 `use` 开头的组合式函数
- 复用逻辑：状态管理、副作用逻辑、计算逻辑
- 常见模式：数据获取、列表管理、表单处理、分页等
- 需标注每个 Hook 的输入、输出和副作用

## 路由依赖

- `useRoute()`：获取路由参数
- `useRouter()`：编程式导航
- 路由守卫：`router.beforeEach` 可访问 store

### 导航守卫

| 守卫                   | 说明         |
| ---------------------- | ------------ |
| `router.beforeEach`    | 全局前置守卫 |
| `router.beforeResolve` | 全局解析守卫 |
| `router.afterEach`     | 全局后置守卫 |

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
