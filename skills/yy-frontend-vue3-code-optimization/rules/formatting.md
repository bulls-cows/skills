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

