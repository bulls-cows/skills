# 子技能详细规则（T01–T04）

主文档说明任务清单与调度策略，本文件提供四个子技能的可执行细节。模型在执行某项任务前应先读对应小节。

---

## T01 · 清理与导入整理（🟡 中风险 · 子代理）

### 无效代码清理

- 删除未使用的 `import`、变量声明、函数定义。
- 谨慎判断，以下情况一律保留，不得删除：
  - `export` 导出的函数（可能被外部引用，本文件看不到调用方）。
  - 全局注册的组件（运行时才确定是否使用）。
  - 可能通过字符串动态调用的方法（`this[methodName]()` / `obj['fn']()`）。

判断"是否使用"时，要看完整个文件，不能只看声明附近——模板里的 `@click="onSubmit"`、`v-if="hasError"`、字符串里的 `:component="iconName"` 都算使用。

### 导入排序

按 4 组排序，组与组之间空一行；组内按字母排序；同一模块多次导入合并为一行；移除完全重复的导入。

```typescript
// 1. node_modules（外部依赖）
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import { debounce } from 'lodash'

// 2. types（仅 Vue3 / React + TypeScript 项目）
import type { IUserInfo } from '@src/types'

// 3. 内部全局依赖（绝对别名路径）
import { apiGetUserInfo } from '@src/api/user'
import { formatDate } from '@src/utils/date'
import { useTable } from '@src/hooks/useTable'
import store from '@src/store'
import { APP_CONFIG } from '@src/constants'
import DataTable from '@src/components/DataTable.vue'

// 4. 内部相对依赖（./ ../）
import { localHelper } from './utils/helper'
import { MAX_RETRY_COUNT } from './constants'
import SearchBar from './SearchBar.vue'
```

> Vue2 或纯 JS 项目没有第 2 组（types），按 3 组排序。

**别名检测**：项目可能使用 `@/`、`@src/`、`~/` 等不同路径别名。执行前读取 `tsconfig.json`（`compilerOptions.paths`）或 `vite.config.*` / `vue.config.*` 中的 `resolve.alias` 配置，确认第 3 组使用的别名前缀。别名路径归入第 3 组（内部全局依赖），非别名相对路径归入第 4 组。

---

## T02 · 代码结构排序（🟡 中风险 · 子代理）

按文件框架分别处理，详细顺序见 `resources/frameworks.md`。这里只列入口：

- `.vue` Options API → 见 frameworks.md §Vue2
- `.vue` `<script setup>` → 见 frameworks.md §Vue3
- `.jsx` / `.tsx` → 见 frameworks.md §React
- `.js` / `.ts` 纯模块 → 按"导入 → 类型 → 常量 → 工具函数 → 默认导出"组织即可，无强制顺序

模板属性顺序（仅 `.vue`）也在 frameworks.md §Vue 模板。

---

## T03 · 语义化命名规范（🔴 高风险 · 主代理）

**执行约束：**

- 由主代理执行，禁止派发子代理。子代理无法跨文件查影响范围。
- 每项重命名单独确认。批量改名 = 用户失去逐项否决权 = 高风险事故来源。

**影响范围查询**：参照主文档步骤 4 的「影响范围查询优先级」执行，不在本文件重复。

命名规则与示例见 `resources/naming.md`。

### 逐项确认对话范例

照此节奏走，每项一轮：

```text
[T03 改动 1/N]
文件：src/api/user.ts
建议：getInfo → apiGetUserInfo
理由：API 函数应使用 api + Method + URLPath 命名
影响范围：3 个调用点
  - src/views/UserList.vue:42
  - src/views/UserDetail.vue:18
  - src/store/modules/user.js:67

请回复：
  - "确认" 执行此项
  - "跳过" 略过此项继续下一项
  - "全部停止" 终止 T03
```

不要把多项打包到一条消息里问"以下 5 项是否都执行"——那等于没确认。

---

## T04 · Props/Emits 增强（🔴 高风险 · 主代理）

**执行约束：** 同 T03，主代理串行 + 逐项确认。

**影响范围查询**：参照主文档步骤 4 的「影响范围查询优先级」执行。

### Props 增强

- 必须明确 `type` 和 `default`。
- 命名 camelCase。
- 每个 Prop 添加注释说明用途（已有注释保留，参见 `resources/style.md` 注释保护）。
- 复杂类型使用 `PropType<T>` / TypeScript 接口明确指定，不要用裸 `Object` / `Array`。
- React：使用 `interface` 或 `type` 定义 Props 类型，可选属性标记 `?`，默认值通过解构参数提供。避免使用 `PropTypes` 库（TypeScript 项目）。

### Emits 增强

- Vue2：`this.$emit('eventName', payload)` 中的事件名必须在 `emits` 选项中声明；缺失则补充。
- Vue3：使用 `defineEmits<{ (e: 'eventName', payload: Type): void }>()` 明确类型签名；缺失类型则补充。
- React：函数 Props 的 `onXxx` 回调参数类型必须明确；缺失则补充。
- 每个 Emit 添加注释说明触发时机（已有注释保留）。
- React：`onXxx` 回调 Props 必须明确参数类型与返回值类型；使用 `useCallback` 包裹避免不必要的重渲染时，需在注释中说明原因。

### 逐项确认对话范例

```text
[T04 改动 1/N]
文件：src/components/UserCard.vue
类别：Props
Prop：userInfo
当前：{ type: Object }
建议：
  /** 用户信息，包含 id/name/avatar 等字段 */
  userInfo: {
    type: Object as PropType<IUserInfo>,
    default: () => ({}),
  }

请回复："确认" / "跳过" / "全部停止"。

[T04 改动 2/N]
文件：src/components/UserCard.vue
类别：Emits
Emit：delete
当前：未在 emits 中声明
建议：
  // 用户点击删除按钮时触发，payload 为用户 ID
  delete: [payload: { id: string }]

请回复："确认" / "跳过" / "全部停止"。
```
