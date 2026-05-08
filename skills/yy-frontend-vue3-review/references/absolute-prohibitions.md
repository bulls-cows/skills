# D09 · 绝对禁止项（🔴 严重）

| 禁止项 | 说明 |
|--------|------|
| 连续解构 | 禁止 `...data.data` 等连续解构 |
| 修改子组件数据 | 禁止父组件直接修改子组件数据 |
| 修改 ref/reactive 类型 | 禁止多次修改 ref/reactive 属性类型（后端给什么值用什么值）；`reactive→ref` 转换除外 |
| 直接修改 props | 禁止直接修改 props（使用 `props.xxx` 只读访问） |
| 使用 this | 禁止在 `<script setup>` 中使用 `this` |
| Options API | 禁止使用 Options API 写法（`data()`/`methods: {}`/`mounted() {}` 等） |
| 使用 mixins | 禁止使用 mixins |
| 多层 try/catch | 禁止多个 try/catch 嵌套                                              |
| 生命周期 emit | 基础组件禁止在生命周期中 emit，业务组件允许但不推荐                    |
| 无意义命名 | 禁止 `data1`、`temp2` 等无意义命名 |
