# Vue2 SFC 结构参考

## 单文件组件结构

Vue 2 单文件组件（`.vue`）由三个区块组成：

```html
<template>
  <!-- 模板区：负责展示，只写简单表达式 -->
</template>

<script>
// 脚本区：使用 Options API，定义组件逻辑
</script>

<style scoped>
/* 样式区：定义组件样式 */
</style>
```

---

## `<template>` 模板区

### 关键节点类型

| 节点类型       | 识别特征                           | 注释前缀       |
| -------------- | ---------------------------------- | -------------- |
| 根节点         | 模板内最外层唯一根元素             | 组件名称       |
| 循环节点       | 含 `v-for` 指令                    | `循环:`        |
| 条件节点       | 含 `v-if` / `v-else-if` / `v-else` | `条件:`        |
| 显示控制       | 含 `v-show`                        | `条件:`        |
| 插槽           | `<slot>` 或 `v-slot` / `#` 语法    | `插槽:`        |
| 动态组件       | `<component :is="...">`            | `动态组件:`    |
| 关键区块       | 逻辑分组明显的容器元素             | 区块名称       |

### 模板属性顺序

模板元素上的属性按以下顺序排列：

1. `is`
2. `v-for`
3. `v-if` / `v-else-if` / `v-else`
4. `v-show`
5. `id` / `ref`
6. 其他 props / attrs
7. `v-on`（事件绑定）
8. `v-html` / `v-text`
9. `v-slot` / `#`（插槽）

---

## `<script>` 脚本区

### Options API 属性顺序

`export default {}` 导出对象的属性必须按以下顺序排列：

1. `name`
2. `components`
3. `props`
4. `data`
5. `computed`
6. `watch`
7. `methods`
8. 生命周期钩子

```javascript
export default {
  name: '',
  components: {},
  props: {},
  data() { return {} },
  computed: {},
  watch: {},
  methods: {},
  // 生命周期
  created() {},
  mounted() {},
  updated() {},
  destroyed() {}
}
```

### 脚本区关键节点

| 节点           | 识别特征                              | 说明                               |
| -------------- | ------------------------------------- | ---------------------------------- |
| 组件名称       | `name: 'XXX'`                         | 标识组件用途                       |
| 引入组件       | `components: { ... }`                 | 子组件注册                         |
| props          | `props: { ... }`                      | 父组件传入参数                     |
| data           | `data() { return { ... } }`           | 组件内部响应式状态                 |
| computed       | `computed: { ... }`                   | 派生状态，依赖其他响应式数据       |
| watch          | `watch: { ... }`                      | 监听器，响应数据变化执行副作用     |
| methods        | `methods: { ... }`                    | 组件方法                           |
| provide        | `provide() { return { ... } }`        | 向后代组件提供数据                 |
| inject         | `inject: ['...']`                     | 注入祖先组件提供的数据             |
| created        | `created() {}`                        | 实例创建完成，数据已观测          |
| mounted        | `mounted() {}`                        | DOM 挂载完成                       |
| updated        | `updated() {}`                        | 数据变更后虚拟 DOM 重新渲染完成    |
| destroyed      | `destroyed() {}`                      | 实例销毁前                         |

---

## `<style>` 样式区

### 关键节点

| 节点           | 识别特征                              | 说明                               |
| -------------- | ------------------------------------- | ---------------------------------- |
| 顶级选择器     | 第一层 CSS 选择器                     | 标识模块名称                       |
| 子级选择器     | 嵌套在顶级选择器内部                  | 标识子模块                         |
| 媒体查询       | `@media (...)`                        | 响应式断点                         |

### 作用域标识

- `<style scoped>`：样式仅作用于当前组件
- `<style>`（无 scoped）：全局样式，需在注释中标注 `/* 全局 */`
