# 🧹 代码风格与格式清洗（🟡中风险）

**定位**：🟡 中风险。涉及代码格式化和结构整理。

---

## ⚠️ 风险说明（执行前必须展示给用户）

| 风险项            | 影响范围     | 说明                                                                              |
| ----------------- | ------------ | --------------------------------------------------------------------------------- |
| **Git Diff 膨胀** | 全文件       | 格式化会改变缩进、引号、分号等，导致 git diff 行数大幅增加，增加 Code Review 难度 |
| **合并冲突**      | 多人协作分支 | 大规模格式化可能导致与他人的分支产生合并冲突                                      |
| **格式不一致**    | 团队协作     | 如果项目未统一 Prettier 配置，格式化可能与团队现有风格产生差异                    |

> **建议**：在执行格式化前，确保当前分支是干净的，且没有待合并的代码。

---

## 格式化执行步骤

### 第一步：调用 Prettier 格式化

优先使用项目自有的 Prettier 配置进行格式化。执行步骤如下：

1. **尝试执行 Prettier 命令**：

   ```bash
   npx prettier --write <target-file>
   ```

2. **处理执行结果**：
   - **成功**：Prettier 按项目自有配置完成格式化，继续第二步。
   - **失败**（命令不存在或未安装）：参考以下配置规则，手动对文件代码进行格式化。

**Prettier fallback 配置规则**：

- **缩进**：2 空格（`tabWidth: 2`）
- **引号**：JS 单 `'`（`singleQuote: true`），HTML 双 `"`
- **标点**：强制分号（`semi: true`），尾随逗号（`trailingComma: "all"`），箭头函数单参数无括号（`arrowParens: "avoid"`）
- **行宽**：单行最大字符数 **120**（`printWidth: 120`）
- **其他**：对象花括号保持空格（`bracketSpacing: true`），不强制属性独占一行（`singleAttributePerLine: false`）

### 第二步：手动结构调整

Prettier 无法处理代码结构排序和运算符调整。格式化后，需手动执行以下**结构与顺序整理**规则：

---

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

---

### Vue 选项顺序

`name` → `components` → `props` → `data` → `computed` → `watch` → `methods` → 生命周期。

**生命周期标准顺序**：`beforeCreate` → `created` → `beforeMount` → `mounted` → `beforeUpdate` → `updated` → `activated` → `deactivated` → `beforeDestroy` → `destroyed`

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
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
};
```

---

### 方法内部顺序

`init...()` → `async getListData() {}` / `async postFormData() {}` → `async onClick...() {}` / `async onChange...() {}` → `computed...() {}`

---

### 模板属性排序

`is` → `v-for` → `v-if/v-else-if/v-else` → `v-show/v-cloak` → `id` → `props/attrs` → `v-on` → `v-html/v-text` → `v-slot`

**模板职责**：

- 只负责展示，不写复杂表达式
- 简单逻辑可内联，不为简单逻辑额外创建 methods
- **不要过度封装**：简单的条件判断或表达式直接写在 template 中

**注意**:

- `v-text` 与 `v-html` 同位
- 条件分支完整序列为 `v-if` → `v-else-if` → `v-else`
- 隐藏控制包含 `v-show` 和 `v-cloak`
- 属性分组包含 `props` 和 `attrs`

**v-slot 风格**：优先使用 `v-slot:name` 或 `#name` 简写语法。避免已废弃的 `slot="name"` 写法。
