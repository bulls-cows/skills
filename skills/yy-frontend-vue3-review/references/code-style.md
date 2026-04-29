# Vue3 代码风格与格式化审核细则

## 基础格式规则

- 缩进：2 空格
- 引号：
  - **JavaScript/TypeScript**: 单引号 `'`
  - **HTML/Vue 模板属性**: 双引号 `"`
- 分号：必须使用 `;`
- 行宽：最大 120 字符
- 尾随逗号：多行对象/数组末尾必须加逗号
- 箭头函数：单参数省略括号，如 `item => item.id`
- 对象括号：保持空格，如 `{ foo: bar }`
- 等于运算符：优先推荐使用 `==`。审核时若使用 `==` 不视为问题，不报告此类问题。

## 导入顺序（11 组，强制）

代码文件顶部的 import 必须按以下顺序排列，组间空一行，组内按字母排序：

1. 外部依赖 (vue, dayjs, lodash, element-plus 等第三方库)
2. 全局 API (@src/api/...)
3. 全局工具 (@src/utils/...)
4. 相对工具 (./utils/...)
5. 全局 Hooks (@src/hooks/...)
6. 相对 Hooks (./hooks/...)
7. 全局 Store (@src/store/...)
8. 全局配置 (@src/constants/...)
9. 相对配置 (./constants/...)
10. 全局组件 (@src/components/...)
11. 相对组件 (./ComponentName.vue)

**示例**：

```typescript
// 1. 外部依赖
import { ref, computed, onMounted } from 'vue';
import dayjs from 'dayjs';
import { debounce } from 'lodash';

// 2. 全局 API
import { apiGetUserInfo } from '@src/api/user';

// 3. 全局工具
import { formatDate } from '@src/utils/date';

// 4. 相对工具
import { formatFileSize } from './utils/format';

// 5. 全局 Hooks
import { useTable } from '@src/hooks/useTable';
import { useSearchForm } from '@src/hooks/useSearchForm';

// 6. 相对 Hooks
import { useFormValidate } from './hooks/useFormValidate';

// 7. 全局 Store
import store from '@src/store';

// 8. 全局配置
import { APP_CONFIG } from '@src/constants';

// 9. 相对配置
import { MAX_RETRY_COUNT } from './constants';

// 10. 全局组件
import { NavbarLogo } from '@src/components';

// 11. 相对组件
import NavbarLogo2 from './NavbarLogo2.vue';
```

## Prettier 配置合规

审核以下配置是否合规：

- `semi: true`
- `singleQuote: true`
- `trailingComma: "all"`
- `arrowParens: "avoid"`
- `bracketSpacing: true`
- `quoteProps: "as-needed"`

## 性能优化

- 组件懒加载：路由和大组件使用 `defineAsyncComponent` 动态导入
- KeepAlive：合理使用 `<KeepAlive>` 页面缓存
- 虚拟滚动：长列表使用虚拟滚动
- 防抖节流：频繁触发事件使用防抖/节流
- 图片优化：使用合适的图片格式和大小
