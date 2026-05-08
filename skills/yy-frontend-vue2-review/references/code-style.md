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

## 导入顺序（9 组）

`import` 语句必须按以下 9 组顺序排列，**组间空一行**，组内按字母顺序排序：

| 组别 | 说明       | 示例                                      |
| ---- | ---------- | ----------------------------------------- |
| 1    | 外部依赖   | `import Vue from 'vue'`、第三方库         |
| 2    | 全局 API   | `import { apiGetUser } from '@/api/user'` |
| 3    | 全局工具   | `import { formatDate } from '@/utils/date'` |
| 4    | 相对工具   | `import { fn } from './utils/format'`     |
| 5    | 全局 Store | `import store from '@/store'`             |
| 6    | 全局配置   | `import { APP_CONFIG } from '@/config'`   |
| 7    | 相对配置   | `import { PAGE_SIZE } from './config'`    |
| 8    | 全局组件   | `import UserAvatar from '@/components/UserAvatar'` |
| 9    | 相对组件   | `import StatusBadge from './StatusBadge.vue'` |

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
