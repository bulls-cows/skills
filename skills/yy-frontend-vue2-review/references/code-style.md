# 代码风格规范

## 1. 基础格式

- **缩进**：2 空格。
- **引号**：JavaScript 使用单引号 `'`，HTML/模板使用双引号 `"`。
- **分号**：语句末尾必须有分号。
- **行宽**：最大 120 字符。

## 2. 尾随逗号

多行对象和数组的末尾元素后必须加尾随逗号：

```js
const obj = {
  foo: 'bar',
  baz: 'qux',
};
```

## 3. 箭头函数

单参数时省略括号：

```js
items.map(item => item.id)
```

多参数或无参数时保留括号。

## 4. 对象括号间距

对象字面量花括号内侧保持空格：

```js
const obj = { foo: bar };
```

## 5. 导入顺序（9 组）

`import` 语句必须按以下 9 组顺序排列，组间空一行，组内按字母顺序排序：

1. 外部依赖（`vue`、`vuex`、第三方库）
2. 全局 API（`@/api/...`）
3. 全局工具（`@/utils/...`）
4. 相对工具（`./utils/...`、`../utils/...`）
5. 全局 Store（`@/store/...`）
6. 全局配置（`@/config/...`）
7. 相对配置（`./config/...`、`../config/...`）
8. 全局组件（`@/components/...`）
9. 相对组件（`./components/...`、`../components/...`）

## 6. Prettier 配置参考

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

## 7. 等于运算符

使用 `==` 不视为问题，审核时不报告 `==` 与 `===` 的差异。

## 8. 注释检查豁免

注释相关问题（注释格式、注释内容、缺少注释等）默认忽略，不进行检查。
