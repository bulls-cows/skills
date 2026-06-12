# Vue3 专项审核规则

仅在识别到 Vue3 特征时适用，与通用规则合并使用。

## 严重

- 模板编译错误：`v-model` 绑定到 Props；多个根节点但未使用 Fragment 兼容模式
- 内存泄漏：`watch`/`watchEffect` 未在组件卸载时自动停止（非组件内创建的独立 watcher 须手动 `stop()`）

## 中等

- 响应式使用不当：`reactive` 对象直接解构丢失响应性（应用 `toRefs`）；`ref` 在 script 中遗漏 `.value`；`watch` 监听 `reactive` 对象属性时未使用 getter 函数；Props 解构丢失响应性（未使用 `defineProps` 解构或 `toRefs`）
- 组合式函数（Composable）设计不当：Composable 内创建的副作用未在 `onScopeDispose` 中清理；返回值类型不明确；滥用导致逻辑分散
- 生命周期使用不当：`watch`/`watchEffect` 依赖不明确；`onServerPrefetch` 中未正确处理异步；Teleport 目标不存在
- `defineExpose` 使用不当：过度暴露组件内部实现细节，破坏组件封装性；暴露的响应式状态可被外部直接修改
- 异步组件处理：`defineAsyncComponent` 加载的组件缺少 `errorComponent` 和 `loadingComponent` 配置；Suspense 边界内未处理异步错误

## 轻微

- `ref` 与 `reactive` 选择不一致：同一组件内混用 `ref` 和 `reactive` 管理同类状态，缺乏统一约定
- `script setup` 组织顺序：变量声明、计算属性、侦听器、方法、生命周期钩子的排列顺序混乱
- 不必要的 `shallowRef`：对简单值使用 `shallowRef` 而非 `ref`，增加理解成本且无性能收益
