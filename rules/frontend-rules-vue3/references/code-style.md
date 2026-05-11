# 代码风格与格式化

本模块确保代码外观的一致性，主要由 Prettier 接管。

## Prettier 配置规则

必须遵循 `.prettierrc.json` 的完整配置，使用 Prettier 进行代码格式化。

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

### 关键规则说明

| 规则 | 配置值 | 说明 |
|------|--------|------|
| 缩进 | `tabWidth: 2` | 2 空格缩进 |
| 引号 | `singleQuote: true` | JS/TS 使用单引号 |
| JSX 引号 | `jsxSingleQuote: true` | JSX 属性单引号 |
| HTML 属性引号 | `vueHtmlAttributes: "double"` | Vue 模板属性双引号 |
| 分号 | `semi: true` | 语句末尾必须有分号 |
| 行宽 | `printWidth: 120` | 每行最大 120 字符 |
| 尾随逗号 | `trailingComma: "all"` | 多行对象/数组末尾加逗号 |
| 箭头函数 | `arrowParens: "avoid"` | 单参数省略括号 |
| 对象括号 | `bracketSpacing: true` | `{ foo: bar }` 保留空格 |
| 换行符 | `endOfLine: "auto"` | 自动检测 |
| 属性换行 | `singleAttributePerLine: false` | 不强制单行单属性 |
| Vue 脚本样式缩进 | `vueIndentScriptAndStyle: false` | 不额外缩进 |
| HTML 空白 | `htmlWhitespaceSensitivity: "strict"` | 严格处理 |
| 属性引号类型 | `quoteProps: "as-needed"` | 仅需要时加引号 |
| 括号同行 | `bracketSameLine: false` | 括号不和内容同行 |
| 散文换行 | `proseWrap: "never"` | 从不换行 |

## ESLint 集成

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

## 函数写法偏好

**优先使用 `const 函数名 = () => {}` 箭头函数写法，避免使用 `function` 声明。**

| 原写法 | 推荐写法 |
|--------|---------|
| `function fetchData() {}` | `const fetchData = () => {}` |
| `function handleClick(e) {}` | `const handleClick = (e) => {}` |

> 关于导入顺序、`<script setup>` 结构顺序、模板属性顺序，详见 [order.md](./order.md)。
