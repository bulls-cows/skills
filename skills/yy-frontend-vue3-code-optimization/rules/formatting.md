# Vue3 代码格式化与工具链规范

本规范定义 Prettier 配置、ESLint 集成约定。

## 一、Prettier 配置

必须遵循项目根目录下的 `.prettierrc.json` 配置：

```json
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 120,
  "singleQuote": true,
  "endOfLine": "auto",
  "proseWrap": "never",
  "trailingComma": "all",
  "arrowParens": "avoid",
  "jsxSingleQuote": true,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "quoteProps": "as-needed",
  "singleAttributePerLine": false,
  "vueIndentScriptAndStyle": false,
  "htmlWhitespaceSensitivity": "strict",
  "vueHtmlAttributes": "double"
}
```

### 核心规则摘要

| 规则 | 配置 | 说明 |
|------|------|------|
| 缩进 | `2` | 2 空格缩进 |
| 引号 | `singleQuote: true` | JS/TS/JSX 属性使用单引号 |
| Vue 属性 | `vueHtmlAttributes: "double"` | Vue 模板中属性值（如 `:prop="value"`）使用双引号 |
| 分号 | `semi: true` | 语句末尾必须加分号 |
| 行宽 | `120` | 每行最大 120 字符 |
| 尾逗号 | `all` | 多行对象/数组末尾保留逗号 |

## 二、ESLint 集成

### 推荐配置

- **Vue 插件**：使用 `eslint-plugin-vue`，启用 `plugin:vue/vue3-recommended`
- **TypeScript 解析**：使用 `@typescript-eslint/parser` + `@typescript-eslint/eslint-plugin`
- **Prettier 集成**：使用 `eslint-config-prettier` 关闭 ESLint 中与 Prettier 冲突的规则

### 必须启用的 Vue3 规则

| 规则 | 说明 |
|------|------|
| `vue/multi-word-component-names` | 组件名必须多单词 |
| `vue/no-unused-vars` | 禁止模板中未使用的变量 |
| `vue/no-v-html` | 谨慎使用 `v-html`（需 DOMPurify 过滤） |
| `vue/valid-v-for` | `v-for` 必须带 `key` |
| `vue/require-default-prop` | Props 有默认值时不能设 required |
| `vue/require-prop-types` | Props 必须声明类型 |

### 推荐禁用的规则（与 Prettier 冲突）

```json
{
  "extends": [
    "plugin:vue/vue3-recommended",
    "@typescript-eslint/recommended",
    "prettier"
  ]
}
```

### 常用 TypeScript 扩展规则

| 规则 | 说明 |
|------|------|
| `@typescript-eslint/no-explicit-any` | 禁止 `any` 类型（error） |
| `@typescript-eslint/explicit-function-return-type` | 函数必须声明返回类型（warn） |
| `@typescript-eslint/no-unused-vars` | 禁止未使用的变量 |
| `@typescript-eslint/no-empty-interface` | 禁止空接口 |

