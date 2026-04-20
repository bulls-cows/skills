# 代码风格检查细则

## 基础格式规则

- 缩进：2 空格
- 引号：单引号 `'`
- 分号：必须使用 `;`
- 行宽：最大 120 字符
- 尾随逗号：多行对象/数组末尾必须加逗号
- 箭头函数：单参数省略括号，如 `item => item.id`
- 对象括号：保持空格，如 `{ foo: bar }`
- 换行符：auto

## 导入顺序

代码文件顶部的 import 必须按以下顺序排列，组间空一行：

1. 外部依赖（dayjs, lodash, antd 等第三方库）
2. 全局 API（@src/api/...）
3. 全局工具（@src/utils/...）
4. 相对工具（./utils/...）
5. 全局 Store（@src/store/...）
6. 全局配置（@src/constants/...）
7. 相对配置（./constants/...）
8. 全局组件（@src/components/...）
9. 相对组件（./ComponentName.vue）

**排序原则**：

- 全局优先：优先排列使用全局别名 @src/* 的导入
- 相对在后：其次排列使用相对路径 ./ 或 ../ 的导入
- 组内排序：同一组内的导入语句必须按字母顺序排列

**示例**：

```javascript
// 1. 外部依赖
import dayjs from "dayjs";
import { Button } from "antd";

// 2. 全局 API
import { apiGetUserInfo } from "@src/api/user";

// 3. 全局工具
import { formatDate } from "@src/utils/date";

// 4. 相对工具
import { formatFileSize } from "./utils/format";

// 5. 全局 Store
import store from "@src/store";

// 6. 全局配置
import { APP_CONFIG } from "@src/constants";

// 7. 相对配置
import { MAX_RETRY_COUNT } from "./constants";

// 8. 全局组件
import { NavbarLogo } from "@src/components";

// 9. 相对组件
import NavbarLogo2 from "./NavbarLogo2.vue";
```

## Prettier 配置合规

必须遵循 .prettierrc.json 的关键配置项：

- semi: true
- singleQuote: true
- trailingComma: "all"
- arrowParens: "avoid"
- bracketSpacing: true
- quoteProps: "as-needed"
