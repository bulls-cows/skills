# Vue 规则

- 组件命名：PascalCase（允许单个单词）
- 属性命名：camelCase
- v-slot 风格：动态风格
- 禁止修改 props：不允许直接修改组件的 props
- props 解构：可以解构（需注意响应式丢失）
- v-html：可以使用（需注意 XSS 风险）
