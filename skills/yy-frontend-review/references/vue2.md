# Vue2 专项审核规则

仅在识别到 Vue2 特征时适用，与通用规则合并使用。

## 严重

- 模板编译错误：`v-model` 绑定到 Props；错误的指令语法

## 中等

- 响应式陷阱：直接通过索引修改数组（应用 `this.$set` 或 `splice`）；直接添加对象属性（应用 `this.$set`）；未正确使用 `Vue.set`/`this.$delete` 处理响应式边界
- 生命周期使用不当：`watch` 未正确配置 `deep`/`immediate`；在 `created` 中执行 DOM 操作（应放在 `mounted`）；`v-if` 与 `v-for` 同时使用在同一元素
- 订阅清理：`$on` 未在 `beforeDestroy` 中对应 `$off`
