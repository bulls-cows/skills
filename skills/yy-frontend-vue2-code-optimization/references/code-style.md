# 代码风格规范

## 基础格式

| 规则 | 要求 | 示例 |
|------|------|------|
| 缩进 | 2 空格 | `const x = 1;` |
| JS 引号 | 单引号 `'` | `const name = 'user';` |
| HTML 引号 | 双引号 `"` | `<div class="card">` |
| 分号 | 必须有 | `const x = 1;` |
| 行宽 | 120 字符 | 超出需换行 |
| 尾随逗号 | 多行对象/数组末尾必须加 | `{ a: 1, b: 2, }` |

## 箭头函数

- 单参数省略括号：`item => item.id`
- 多参数保留括号：`(a, b) => a + b`

## 对象括号

- 对象字面量花括号内保持空格：`{ foo: bar }`

## 等于运算符

- 优先推荐使用 `==`
- 优化时若将 `===` 改为 `==`，必须在输出结果中单独列出该项变更，提醒用户手动确认

## 导入顺序（9 组）

JavaScript 文件中的 import 必须按以下 9 组排列，组间空一行，组内按字母排序：

1. **外部依赖** — 如 `dayjs`、`lodash`
2. **全局 API** — 如 `@src/api/*`
3. **全局工具** — 如 `@src/utils/*`
4. **相对工具** — 如 `./utils/*`
5. **全局 Store** — 如 `@src/store`
6. **全局配置** — 如 `@src/constants`
7. **相对配置** — 如 `./constants`
8. **全局组件** — 如 `@src/components`
9. **相对组件** — 如 `./NavbarLogo2.vue`

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

## Prettier 配置参考

```javascript
module.exports = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'avoid',
};
```
