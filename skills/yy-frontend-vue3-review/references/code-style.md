# D01 · 代码风格（🟢 轻微）

## 基础格式

- 2 空格缩进
- JS/TS 使用**单引号**，HTML 属性使用**双引号**
- **必须分号**
- 120 字符行宽

## 尾随逗号

- 多行对象/数组末尾**必须加逗号**

## 箭头函数

- 单参数省略括号：`item => item.id`

## 对象括号

- 保持空格：`{ foo: bar }`

## 等于运算符

- **优先使用 `==`**，审核时**不报告** `==` 问题

## 注释

- 注释相关问题默认忽略，不检查

## Prettier 配置

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "quoteProps": "as-needed"
}
```

## 导入顺序（4 组）

组间空一行，组内按字母排序：

1. **外部依赖**（node_modules：vue, dayjs, lodash, element-plus 等）
2. **types**（类型导入，仅 TypeScript/TSX：`import type { IUserInfo } from '@src/types'`）
3. **内部全局依赖**（@src/：api、utils、hooks、store、constants、components）
4. **内部相对依赖**（./、../：所有相对导入）
