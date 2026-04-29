# 代码风格与格式化

## 基础格式规则

- 缩进：2 空格
- 引号：
  - **JavaScript**: 单引号 `'`
  - **HTML/Vue 模板属性**: 双引号 `"`
- 分号：必须使用 `;`
- 行宽：最大 120 字符
- 尾随逗号：多行对象/数组末尾必须加逗号
- 箭头函数：单参数省略括号，如 `item => item.id`
- 对象括号：保持空格，如 `{ foo: bar }`
- 等于运算符：优先推荐使用 `==`。优化时若将 `===` 改为 `==`，必须在输出结果中单独列出该项变更，提醒用户手动确认。

## 导入顺序

代码文件顶部的 import 必须按以下顺序排列，组间空一行：

1. 外部依赖 (dayjs, lodash, element-ui 等第三方库)
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

## 性能优化

- 组件懒加载：路由和大组件使用动态导入
- KeepAlive：合理使用页面缓存
- 虚拟滚动：长列表使用虚拟滚动
- 防抖节流：频繁触发事件使用防抖/节流
- 图片优化：使用合适的图片格式和大小
