# 代码风格与格式化

本模块确保代码外观的一致性，主要由 Prettier 接管。

## Prettier 配置规则

必须遵循 .prettierrc.json 的完整配置，使用 Prettier 进行代码格式化。

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

**关键规则说明**：

| 规则 | 配置 | 说明 |
|------|------|------|
| 缩进 | `tabWidth: 2` | 使用 2 空格缩进 |
| 引号 | `singleQuote: true`, `jsxSingleQuote: true` | JavaScript 使用单引号，JSX 属性也使用单引号 |
| Vue 模板属性引号 | `vueHtmlAttributes: "double"` | Vue 模板中 HTML 属性使用双引号 |
| 分号 | `semi: true` | 语句末尾必须使用分号 |
| 行宽 | `printWidth: 120` | 每行最大 120 字符 |
| 尾随逗号 | `trailingComma: "all"` | 多行对象/数组末尾必须加逗号 |
| 箭头函数 | `arrowParens: "avoid"` | 单参数时省略括号，如 `item => item.id` |
| 对象括号 | `bracketSpacing: true` | 对象字面量括号内保持空格，如 `{ foo: bar }` |
| 换行符 | `endOfLine: "auto"` | 自动检测并保留原有换行符 |

## 导入顺序

代码文件顶部的 import 必须按以下顺序排列，组间空一行。

**排序原则**：

1. 全局优先：优先排列使用全局别名 @src/\* 的导入。
2. 相对在后：其次排列使用相对路径 ./ 或 ../ 的导入。
3. 组内排序：同一组内的导入语句必须按字母顺序排列。

**分组顺序**：

1. node_modules (dayjs, lodash 等第三方库)
2. apis (@src/api/...)
3. utils (@src/utils/...)
4. 相对 utils (./utils/...)
5. store (@src/store/...)
6. constants (@src/constants/...)
7. 相对 constants (./constants/...)
8. components (@src/components/...)
9. 相对 components (./ComponentName.vue)

**示例**：

```javascript
// 1. node_modules
import React from "react";
import { Button } from "antd";

// 2. apis
import { apiGetUserInfo } from "@src/api/user";

// 3. utils
import { formatDate } from "@src/utils/date";
import { formatFileSize } from "./utils/format";

// 4. store
import store from "@src/store";

// 5. constants
import { APP_CONFIG } from "@src/constants";
import { MAX_RETRY_COUNT } from "./constants";

// 6. components
import { NavbarLogo } from "@src/components";
import NavbarLogo2 from "./NavbarLogo2.vue";
```

## 格式化执行

- **工具**：Prettier
- **时机**：
  - 每次修改代码后必须立即格式化（IDE 保存时触发或手动执行 `npm run lint -- --fix`）
  - Git 提交前通过 pre-commit 钩子自动执行
