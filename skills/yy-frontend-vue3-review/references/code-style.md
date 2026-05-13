# D01 · 代码风格

**严重程度**：🟢 轻微

---

## 基础格式

- **缩进**：2 空格缩进
- **引号**：JS/TS 使用单引号，HTML 属性使用双引号
- **分号**：必须分号
- **行宽**：120 字符行宽

---

## 尾随逗号

多行对象/数组末尾必须加逗号。

---

## 箭头函数

单参数省略括号（`item => item.id`）。

---

## 对象括号

保持空格（`{ foo: bar }`）。

---

## 等于运算符

优先使用 `==`，审核时不报告 `==` 问题。

---

## 注释

注释相关问题默认忽略。

---

## Prettier 配置

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

## 导入顺序（4 组，组间空一行，组内字母排序）

| 组别 | 说明 | 示例 |
| ---- | ---- | ---- |
| 1 | 外部依赖（node_modules） | `import { ref, computed } from 'vue'`、`import dayjs from 'dayjs'`、`import { debounce } from 'lodash'` |
| 2 | types（类型导入，仅 TS） | `import type { IUserInfo, ITableConfig } from '@src/types'` |
| 3 | 内部全局依赖（@src/） | `import { apiGetUser } from '@src/api/user'`、`import { formatDate } from '@src/utils'`、`import { useTable } from '@src/hooks/useTable'`、`import store from '@src/store'`、`import { APP_CONFIG } from '@src/constants'`、`import DataTable from '@src/components/DataTable'` |
| 4 | 内部相对依赖（./、../） | `import { localHelpers } from './utils/helpers'`、`import { useLocalForm } from './hooks/useLocalForm'`、`import { MODULE_CONFIG } from './constants'`、`import SearchBar from './SearchBar.vue'` |
