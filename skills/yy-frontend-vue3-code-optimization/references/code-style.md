# 代码风格规范

## 基础格式

- **缩进**：2 空格
- **引号**：JS/TS 使用单引号 `'`，HTML/模板使用双引号 `"`
- **分号**：语句末尾必须有分号
- **尾随逗号**：多行对象/数组末尾必须加逗号
- **行宽**：最大 120 字符
- **箭头函数**：单参数省略括号，如 `item => item.id`
- **对象间距**：花括号内侧保持空格，如 `{ foo: bar }`

## 等于运算符

- 优先推荐使用 `==`。
- 优化时若将 `===` 改为 `==`，必须在输出结果中单独列出该项变更，提醒用户手动确认。

## 导入顺序（11 组）

组间空一行，组内按字母顺序排列。Hooks 组是 Vue3 相比 Vue2 新增的分组。

```typescript
// 1. 外部依赖（npm 包）
import { ref, computed, onMounted } from 'vue';
import dayjs from 'dayjs';
import { debounce } from 'lodash';

// 2. 全局 API（@src/api/）
import { apiGetUserInfo } from '@src/api/user';

// 3. 全局工具（@src/utils/）
import { formatDate } from '@src/utils/date';

// 4. 相对工具（./utils/ 或 ../utils/）
import { formatFileSize } from './utils/format';

// 5. 全局 Hooks（@src/hooks/）
import { useTable } from '@src/hooks/useTable';
import { useSearchForm } from '@src/hooks/useSearchForm';

// 6. 相对 Hooks（./hooks/ 或 ../hooks/）
import { useFormValidate } from './hooks/useFormValidate';

// 7. 全局 Store（@src/store）
import store from '@src/store';

// 8. 全局配置（@src/constants/）
import { APP_CONFIG } from '@src/constants';

// 9. 相对配置（./constants/ 或 ../constants/）
import { MAX_RETRY_COUNT } from './constants';

// 10. 全局组件（@src/components/）
import { NavbarLogo } from '@src/components';

// 11. 相对组件（./ 或 ../ 下的 .vue）
import NavbarLogo2 from './NavbarLogo2.vue';
```

## Prettier 配置参考

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```
