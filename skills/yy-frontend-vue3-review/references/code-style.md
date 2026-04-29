# 代码风格

## 基础格式

| 规则 | 要求 |
| ---- | ---- |
| 缩进 | 2 空格 |
| 引号 | JS/TS 使用单引号 `'`，HTML 属性使用双引号 `"` |
| 分号 | 必须有 |
| 行宽 | 120 字符 |
| 尾随逗号 | 多行对象/数组末尾必须加逗号 |

## 箭头函数

- 单参数省略括号：`item => item.id`

## 对象括号

- 保持空格：`{ foo: bar }`

## 导入顺序（11 组）

组间空一行，组内按字母排序：

1. 外部依赖（`vue`, `dayjs`, `lodash`, `element-plus` 等）
2. 全局 API（`@src/api/...`）
3. 全局工具（`@src/utils/...`）
4. 相对工具（`./utils/...`）
5. 全局 Hooks（`@src/hooks/...`）
6. 相对 Hooks（`./hooks/...`）
7. 全局 Store（`@src/store/...`）
8. 全局配置（`@src/constants/...`）
9. 相对配置（`./constants/...`）
10. 全局组件（`@src/components/...`）
11. 相对组件（`./ComponentName.vue`）

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

## 等于运算符

- 优先使用 `==`。
- 使用 `==` **不视为问题**，审核时不报告。

## 注释检查

- 注释相关问题**默认忽略**，不进行检查。
