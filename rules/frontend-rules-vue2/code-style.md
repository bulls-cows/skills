# 代码风格与格式化

本模块确保代码外观的一致性，主要由 Prettier 接管。

## 基础格式规则

- 缩进：2 空格
- 引号：单引号 '
- 分号：必须使用 ;
- 行宽：最大 120 字符
- 尾随逗号：多行对象/数组末尾必须加逗号
- 箭头函数：单参数省略括号，如 item => item.id
- 对象括号：保持空格，如 { foo: bar }
- 换行符：auto

## 导入顺序

代码文件顶部的 import 必须按以下顺序排列，组间空一行。

**排序原则**：

1. 全局优先：优先排列使用全局别名 @src/\* 的导入。
2. 相对在后：其次排列使用相对路径 ./ 或 ../ 的导入。
3. 组内排序：同一组内的导入语句必须按字母顺序排列。

**分组顺序**：

1. 外部依赖 (dayjs, lodash, antd 等第三方库)
2. 全局 API (@src/api/...)
3. 全局工具 (@src/utils/...)
4. 相对工具 (./utils/...)
5. 全局 Store (@src/store/...)
6. 全局配置 (@src/constants/...)
7. 相对配置 (./constants/...)
8. 全局组件 (@src/components/...)
9. 相对组件 (./ComponentName.vue)

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

## Prettier 配置细节

必须遵循 .prettierrc.json 的完整配置：

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
  "htmlWhitespaceSensitivity": "strict"
}
```

## 格式化执行

- 工具：Prettier
- 时机：
  - 每次修改代码后必须立即格式化（IDE 保存时触发或手动执行 npm run lint -- --fix）。
  - Git 提交前通过 pre-commit 钩子自动执行。
