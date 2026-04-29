# 代码风格与格式化

本模块确保代码外观的一致性，主要由 Prettier 接管。

## Prettier 配置规则

必须遵循 `.prettierrc.json` 的完整配置，使用 Prettier 进行代码格式化。

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

### 关键规则说明

| 规则 | 配置值 | 说明 |
|------|--------|------|
| 缩进 | `tabWidth: 2` | 2 空格缩进 |
| 引号 | `singleQuote: true` | JS 使用单引号 |
| JSX 引号 | `jsxSingleQuote: true` | JSX 属性单引号 |
| HTML 属性引号 | `vueHtmlAttributes: "double"` | Vue 模板属性双引号 |
| 分号 | `semi: true` | 语句末尾必须有分号 |
| 行宽 | `printWidth: 120` | 每行最大 120 字符 |
| 尾随逗号 | `trailingComma: "all"` | 多行对象/数组末尾加逗号 |
| 箭头函数 | `arrowParens: "avoid"` | 单参数省略括号 |
| 对象括号 | `bracketSpacing: true` | `{ foo: bar }` 保留空格 |
| 换行符 | `endOfLine: "auto"` | 自动检测 |
| 属性换行 | `singleAttributePerLine: false` | 不强制单行单属性 |
| Vue 脚本样式缩进 | `vueIndentScriptAndStyle: false` | 不额外缩进 |
| HTML 空白 | `htmlWhitespaceSensitivity: "strict"` | 严格处理 |
| 属性引号类型 | `quoteProps: "as-needed"` | 仅需要时加引号 |
| 括号同行 | `bracketSameLine: false` | 括号不和内容同行 |
| 散文换行 | `proseWrap: "never"` | 从不换行 |

## 导入顺序（9 组，组间空一行）

1. 外部依赖（`dayjs`、`lodash` 等第三方库）
2. 全局 API（`@src/api/...`）
3. 全局工具（`@src/utils/...`）
4. 相对工具（`./utils/...`）
5. 全局 Store（`@src/store/...`）
6. 全局配置（`@src/constants/...`）
7. 相对配置（`./constants/...`）
8. 全局组件（`@src/components/...`）
9. 相对组件（`./ComponentName.vue`）

### 排序原则

- 全局优先 → 相对在后 → 组内按字母顺序排列

### 示例

```javascript
// 1. 外部依赖
import dayjs from 'dayjs';
import { debounce } from 'lodash';

// 2. 全局 API
import { apiGetUserInfo } from '@src/api/user';

// 3. 全局工具
import { formatDate } from '@src/utils/date';

// 4. 相对工具
import { formatFileSize } from './utils/format';

// 5. 全局 Store
import store from '@src/store';

// 6. 全局配置
import { APP_CONFIG } from '@src/constants';

// 7. 相对配置
import { MAX_RETRY_COUNT } from './constants';

// 8. 全局组件
import { NavbarLogo } from '@src/components';

// 9. 相对组件
import NavbarLogo2 from './NavbarLogo2.vue';
```

## 格式化执行

- **工具**：Prettier
- **时机**：
  - 每次修改代码后必须立即格式化（IDE 保存时触发或 `npm run lint -- --fix`）
  - Git 提交前通过 pre-commit 钩子自动执行
