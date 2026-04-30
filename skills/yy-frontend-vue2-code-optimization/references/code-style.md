# 代码风格与格式清洗

**定位**：🟢 零风险。物理层面的格式化与结构整理，不涉及代码语义变更。

## 基础语法规范

按项目 `assets/.prettierrc.json` 配置执行格式化，核心参数如下：

- **缩进**：2 空格（`tabWidth: 2`）
- **引号**：JS 单 `'`（`singleQuote: true`），HTML 双 `"`
- **标点**：强制分号（`semi: true`），尾随逗号（`trailingComma: "all"`），箭头函数单参数无括号（`arrowParens: "avoid"`）
- **行宽**：单行最大字符数 **100**（`printWidth: 100`）
- **其他**：对象花括号保持空格（`bracketSpacing: true`），不强制属性独占一行（`singleAttributePerLine: false`）

### 运算符调整

推荐使用 `===` 进行严格相等比较以避免隐式类型转换问题。
**注意**：在 `==` 和 `===` 之间的任何转换都属于逻辑变更，必须提醒用户单独确认。

## 结构与顺序整理

### 导入顺序（9 组）

组间空一行，组内按字母排序。

```javascript
// 1. 外部依赖
import dayjs from "dayjs";
import { debounce } from "lodash";

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

### Vue 选项顺序

`name` → `components` → `props` → `data` → `computed` → `watch` → `methods` → 生命周期。

```javascript
export default {
  name: "Comp",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  destroyed() {},
};
```

### 方法内部顺序

`init...()` → `async getListData()` / `async postFormData()` → `async onClick...()` / `async onChange...()` → `computed...()`

### 模板属性排序

`is` → `v-for` → `v-if` → `v-show` → `id` → `props` → `v-on` → `v-html` → `v-slot`

**注意**:

- `v-text` 与 `v-html` 同位
- 条件分支完整序列为 `v-if` → `v-else-if` → `v-else`
- 隐藏控制包含 `v-show` 和 `v-cloak`
- 属性分组包含 `props` 和 `attrs`

**v-slot 风格**：必须使用动态风格（如 `v-slot:[name]`），**禁止静态默认插槽写法**。
