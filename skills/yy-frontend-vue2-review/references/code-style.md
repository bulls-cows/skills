# 代码风格规范

**维度**：D01
**严重程度**：🟢 轻微
**适用文件**：所有（`.vue`、`.js`、`.css`、`.scss`、`.less`）

---

## 基础格式

| 规范项 | 要求                   |
| ------ | ---------------------- |
| 缩进   | 2 空格                 |
| 引号   | JavaScript 单引号，HTML/模板双引号 |
| 分号   | 语句末尾必须有分号     |
| 行宽   | 最大 120 字符          |

---

## 尾随逗号

多行对象和数组的末尾元素后必须加尾随逗号：

```js
const obj = {
  foo: 'bar',
  baz: 'qux',  // ✅
}
```

---

## 箭头函数

- 单参数时省略括号
- 多参数或无参数时保留括号

```js
items.map(item => item.id)          // ✅ 单参数省略括号
items.map((item, index) => item.id)  // ✅ 多参数保留括号
items.filter(() => isReady)          // ✅ 无参数保留括号
```

---

## 对象花括号间距

对象字面量花括号内侧保持空格：

```js
const obj = { foo: bar }  // ✅
const obj = {foo: bar}    // ❌
```

---

## 导入顺序（6 组）

`import` 语句必须按以下 6 组顺序排列，**组间空一行**，组内按字母顺序排序。**全局与相对导入合并为同一组**：

| 组别 | 说明       | 示例                                      |
| ---- | ---------- | ----------------------------------------- |
| 1    | 外部依赖   | `import dayjs from 'dayjs'`、第三方库     |
| 2    | apis       | `import { apiGetUser } from '@src/api/user'` |
| 3    | utils      | `import { formatDate } from '@src/utils'`、`from './utils/format'` |
| 4    | stores     | `import store from '@src/store'`          |
| 5    | constants  | `import { APP_CONFIG } from '@src/constants'`、`from './constants'` |
| 6    | components | `import UserAvatar from '@src/components/UserAvatar'`、`from './StatusBadge.vue'` |

---

## Prettier 配置参考

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "quoteProps": "as-needed",
  "printWidth": 120,
  "tabWidth": 2
}
```

---

## 等于运算符

使用 `==` 不视为问题，审核时不报告 `==` 与 `===` 的差异。

---

## 注释检查豁免

注释相关问题（注释格式、注释内容、缺少注释等）默认忽略，不进行检查。
