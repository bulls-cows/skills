# 代码检查配置模板

## eslint.config.ts

```typescript
import pluginVue from 'eslint-plugin-vue'
import eslintPluginOxlint from 'eslint-plugin-oxlint'
import vueTs from '@vue/eslint-config-typescript'

export default [
  ...pluginVue.configs['flat/essential'],
  ...vueTs(),
  ...eslintPluginOxlint.configs['flat/all'],
  {
    files: ['src/**/*.{ts,vue}'],
    rules: {
      'vue/multi-word-component-names': 'error',
    },
  },
]
```

### 配置说明

| 插件                             | 用途                                   |
| -------------------------------- | -------------------------------------- |
| `eslint-plugin-vue`              | Vue 语法规则检查                       |
| `@vue/eslint-config-typescript`  | Vue + TypeScript 集成规则              |
| `eslint-plugin-oxlint`           | Oxlint 补充规则（扁平化配置格式）      |
| `vue/multi-word-component-names` | 强制组件名使用多单词（防止根组件冲突） |

## .prettierrc.json

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all"
}
```

### 格式化规则

| 规则            | 值      | 说明             |
| --------------- | ------- | ---------------- |
| `semi`          | `true`  | 语句末尾加分号   |
| `singleQuote`   | `false` | 使用双引号       |
| `trailingComma` | `"all"` | 多行时末尾加逗号 |

## .editorconfig

```ini
[*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,vue,css,scss,sass,less,styl,json,html}]
charset = utf-8
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
end_of_line = lf
max_line_length = 100
```

### 编辑器规则

| 规则              | 值      | 说明        |
| ----------------- | ------- | ----------- |
| `indent_size`     | `2`     | 2 空格缩进  |
| `indent_style`    | `space` | 空格缩进    |
| `end_of_line`     | `lf`    | Unix 换行符 |
| `max_line_length` | `100`   | 最大行宽    |
