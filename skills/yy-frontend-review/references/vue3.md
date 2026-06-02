# Vue3 专项审核规则

仅在识别到 Vue3 特征时适用，与通用规则合并使用。

## 严重

- 模板编译错误：`v-model` 绑定到 Props；多个根节点但未使用 Fragment 兼容模式
- 内存泄漏：`watch`/`watchEffect` 未在组件卸载时自动停止（非组件内创建的独立 watcher 须手动 `stop()`）

## 中等

- 响应式使用不当：`reactive` 对象直接解构丢失响应性（应用 `toRefs`）；`ref` 在 script 中遗漏 `.value`；`watch` 监听 `reactive` 对象属性时未使用 getter 函数；Props 解构丢失响应性（未使用 `defineProps` 解构或 `toRefs`）
- 组合式函数（Composable）设计不当：Composable 内创建的副作用未在 `onScopeDispose` 中清理；返回值类型不明确；滥用导致逻辑分散
- 生命周期使用不当：`watch`/`watchEffect` 依赖不明确；`onServerPrefetch` 中未正确处理异步；Teleport 目标不存在
