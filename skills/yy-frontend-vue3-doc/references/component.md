# Vue3 SFC 关键节点识别

## Template 区需标注的节点

| 节点类型     | 识别特征                                | 注释格式                      |
| ------------ | --------------------------------------- | ----------------------------- |
| 根节点       | 模板最外层第一个元素                    | `<!-- 组件名 -->`             |
| 循环节点     | `v-for` 指令                            | `<!-- 循环: 描述 -->`         |
| 条件节点     | `v-if` / `v-else-if` / `v-else`         | `<!-- 条件: 描述 -->`         |
| 显示控制     | `v-show`                                | `<!-- 条件: 描述 -->`         |
| 插槽         | `<slot>`                                | `<!-- 插槽: name -->`         |
| 具名插槽     | `<template #name>`                      | `<!-- 具名插槽: name -->`     |
| 作用域插槽   | `<slot>` 带属性或 `v-slot` 带解构       | `<!-- 作用域插槽: 描述 -->`   |
| 动态组件     | `<component :is="...">`                 | `<!-- 动态组件: 描述 -->`     |
| 关键区块     | 语义化 div/section 包裹的功能分组       | `<!-- 区块: 名称 -->`         |

## Script Setup 区需标注的节点

按推荐结构顺序排列：

| 节点类型          | 识别特征                                              | 注释位置               |
| ----------------- | ----------------------------------------------------- | ---------------------- |
| 导入语句          | `import ... from ...`                                 | 行内或上方单行         |
| defineProps       | `defineProps<...>()` 或 `defineProps({...})`          | 内部逐行               |
| defineEmits       | `defineEmits<...>()` 或 `defineEmits([...])`          | 内部逐行               |
| defineOptions     | `defineOptions({ name: '...' })`                      | 上方单行               |
| 组合式函数        | `useXxx()` 调用                                       | 上方单行               |
| ref               | `ref(...)` 赋值                                       | 上方单行               |
| reactive          | `reactive({...})` 赋值                                | 上方单行               |
| computed          | `computed(...)` 赋值                                  | 上方单行或 TSDoc       |
| watch             | `watch(source, cb)` 或 `watchEffect(cb)`              | 上方单行或 TSDoc       |
| 方法函数          | `const xxx = () => ...` 或 `function xxx() {...}`     | 上方单行或 TSDoc       |
| 生命周期钩子      | `onMounted`, `onUnmounted`, `onBeforeMount` 等        | 上方单行               |
| provide           | `provide(key, value)`                                 | 上方单行               |
| inject            | `inject(key)` 或 `inject(key, defaultValue)`          | 上方单行               |
| defineExpose      | `defineExpose({...})`                                 | 内部逐行               |

## Style 区需标注的节点

| 节点类型     | 识别特征                                | 注释格式                  |
| ------------ | --------------------------------------- | ------------------------- |
| 顶级选择器    | 模块级类名                              | `/* 模块名称 */`          |
| 子级选择器    | BEM 元素或嵌套子级                      | `/* 模块 > 子模块 */`     |
| 媒体查询      | `@media (...)`                          | `/* 响应式 */`            |
| CSS 变量绑定  | `v-bind(...)` 在样式值中使用            | `/* CSS变量绑定: 变量名 */` |

## 识别优先级

1. **必须标注**：根节点、v-for、v-if/v-else-if/v-else、defineProps、defineEmits、ref/reactive、方法函数
2. **建议标注**：computed、watch、生命周期、插槽、动态组件、组合式函数
3. **可选标注**：provide/inject、defineExpose、样式子模块
