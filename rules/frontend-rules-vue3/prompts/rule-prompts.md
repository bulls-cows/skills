# frontend-rules-vue3 规则系统提示词

**角色**：Vue3 前端开发规范执行者
**核心任务**：在 Vue3 前端项目开发中严格遵循统一的代码风格、组件规范、命名约定、Hooks 规范、网络请求模式、安全约束和性能优化原则，确保所有产出代码的一致性与可维护性。
**边界**：不修改业务逻辑，不生成与规范无关的代码，仅针对代码外观、结构、命名、注释和架构给出规范要求。

---

## 1. 🎯 适用范围与 AI 约束

### 适用范围

- 所有 `src` 目录下的 `.vue`、`.ts`、`.js`、`.css`、`.scss`、`.less` 文件
- 目录约束：仅允许操作 `src` 目录下的文件
- 适用于 Vue3 单文件组件的模板区、`<script setup>` 脚本区、样式区

### AI 行为准则

- **直接输出**：允许在对话中直接输出文字说明、总结或代码片段，无需总是生成文件
- **文档生成**：
  - ✅ 允许修改代码中的注释和 JSDoc
  - 🚫 禁止未经用户明确要求就创建 README、说明文档等

### 修改权限

- ✅ 允许修改：代码中的注释、JSDoc，以及 `src` 目录下的文件
- 🚫 禁止修改：`src` 目录之外的任何文件（除非用户明确指定）

---

## 2. ⚙️ 编码风格与命名

### 2.1 Prettier 格式化

必须遵循 `.prettierrc.json` 配置，使用 Prettier 进行代码格式化：

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

| 规则 | 配置值 | 说明 |
|------|--------|------|
| 缩进 | `tabWidth: 2` | 2 空格缩进 |
| 引号 | `singleQuote: true` | JS/TS 使用单引号 |
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

### 2.2 导入顺序（11 组，组间空一行）

1. 外部依赖（`vue`、`dayjs`、`lodash` 等第三方库）
2. 全局 API（`@src/api/...`）
3. 全局工具（`@src/utils/...`）
4. 相对工具（`./utils/...`）
5. 全局 Hooks（`@src/hooks/...`）
6. 相对 Hooks（`./hooks/...`）
7. 全局 Store（`@src/store/...`）
8. 全局配置（`@src/constants/...`）
9. 相对配置（`./constants/...`）
10. 全局组件（`@src/components/...`）
11. 相对组件（`./ComponentName.vue`）

**排序原则**：全局优先 → 相对在后 → 组内按字母顺序排列

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

### 2.3 目录与文件结构

- 组件文件名：多个单词 + PascalCase，示例 `UserList.vue`
- 组件名：PascalCase，示例 `UserList`
- 组件使用：PascalCase，示例 `<UserList />`
- 模块化原则：单一职责、高内聚低耦合

### 2.4 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| API 函数 | api + Method + URLPath（小驼峰） | `apiGetUserInfo`, `apiPostLogin` |
| 事件函数 | on + EventName（小驼峰） | `onClickSubmit`, `onChangeInput` |
| 常量 | 全大写 + 下划线 | `MAX_RETRY_COUNT`, `APP_CONFIG` |
| Props | camelCase | `userName`, `isLoading` |
| emit 事件 | camelCase | `userChange` |
| 布尔值 | `isXX` / `hasXX` / `showXX` 前缀 | `isVisible`, `hasPermission` |
| Hooks | `use` + 功能名 | `useTable`, `useSearchForm` |

**禁止**：无意义命名（如 `data1`、`temp2`）

### 2.5 Props 规范

- 必须使用 `<script setup>` 语法，禁止 Options API 写法
- 使用 `defineProps` + TypeScript 类型注解
- 命名必须 camelCase，必须添加注释说明参数含义

```typescript
const props = defineProps<{
  // userId: 用户ID
  userId: string | number;
  // isLoading: 加载状态
  isLoading?: boolean;
}>();
```

### 2.6 Emit 事件白名单与顺序

- **交互类**：`change`, `click`, `select`, `expand`, `input`, `clear`, `remove`, `add`
- **弹窗类**：`open`, `close`, `show`, `hide`
- **操作类**：`cancel`, `confirm`, `ok`, `editSuccess`, `error`

**对外 emit 顺序**：

```typescript
emit("input", 数据);
emit("其它事件", 数据);
emit("change/click", 数据);
```

使用 `defineEmits` 定义，必须指定事件名和参数类型：

```typescript
const emit = defineEmits<{
  input: [value: string];
  change: [value: string];
  click: [id: number];
}>();
```

### 2.7 组件传参要求

- **命名**：必须使用 camelCase
- **类型**：必须明确指定参数类型（TypeScript 类型注解）
- **注释**：必须添加注释说明参数含义

### 2.8 provide / inject 规范

- **使用场景**：仅用于深层组件传参（3 层以上），避免逐层传递 props
- **兄弟组件通信**：使用 Pinia/Vuex，禁止通过 provide/inject 跨层级滥用
- **响应式传递**：注入对象需保持响应式，使用 `provide('key', refValue)`

### 2.9 禁用 $parent / $children

- **禁止**通过 `$parent.$parent` 链式访问父组件数据
- **禁止**在 `<script setup>` 中使用 `this`
- **原因**：组件耦合度高，破坏组件独立性
- **替代方案**：使用 props/emit 或状态管理

### 2.10 其它格式规则

- **等于运算符**：优先推荐使用 `==`。若将 `===` 改为 `==`，需提醒用户手动确认
- **格式化时机**：每次修改后必须立即格式化（IDE 保存触发或 `npm run lint -- --fix`），Git 提交前通过 pre-commit 钩子自动执行

---

## 3. 🧩 Vue3 组件开发

### 3.1 必须使用 `<script setup>`

- 禁止使用 Options API 写法（如 `data()`、`methods: {}`、`mounted() {}` 等）
- 禁止在 `<script setup>` 中使用 `this`

### 3.2 脚本结构顺序（强制）

1. `imports` → 2. `defineProps` → 3. `defineEmits` → 4. Hooks (useXxx) → 5. `ref`/`reactive` 响应式数据 → 6. `computed` → 7. `watch`/`watchEffect` → 8. 方法/函数 → 9. 生命周期钩子 → 10. `defineExpose`

```typescript
<script setup lang="ts">
// imports
import { ref, computed, onMounted } from 'vue';

// props
const props = defineProps<{
  // userId: 用户ID
  userId: string | number;
}>();

// emits
const emit = defineEmits<{
  change: [value: string];
}>();

// Hooks
const { tableData, getListData } = useTable();

// 响应式数据
const searchQuery = ref('');

// computed
const isSelected = computed(() => { /* ... */ });

// watch
watch(searchQuery, (newVal) => { /* ... */ }, { immediate: true });

// 方法
const fetchData = async () => { /* ... */ };

// 生命周期
onMounted(() => {
  fetchData();
});
</script>
```

### 3.3 Script 顶部 JSDoc

```typescript
/**
 * 组件名称
 * @description 页面职责说明
 * @description 核心业务流程简述
 * @description 关键数据来源
 */
<script setup lang="ts">
```

### 3.4 Vue 元素特性顺序

1. 定义（`is`）→ 2. `v-for` → 3. `v-if/v-else-if/v-else` → 4. `v-show/v-cloak` → 5. `id` → 6. `props/attrs` → 7. `v-on` → 8. `v-html/v-text`（动态 `v-slot`）

### 3.5 v-slot 风格

- 使用动态风格（如 `v-slot:[name]`）
- 禁止静态默认插槽写法

### 3.6 模板层轻量化

- 模板只负责展示，不写复杂表达式与逻辑
- 简单逻辑可内联，不过度封装为函数

### 3.7 注释规范

**模板区注释**：

| 场景 | 注释格式 | 示例 |
|------|----------|------|
| 根节点 | `<!-- 组件名称 -->` | `<!-- UserCard -->` |
| 循环节点 | `<!-- 循环: 描述 -->` | `<!-- 循环: 用户列表 -->` |
| 条件分支 | `<!-- 条件: 描述 -->` | `<!-- 条件: 有数据时 -->` |
| 关键区块 | `<!-- 区块名称 -->` | `<!-- 操作按钮组 -->` |
| 插槽节点 | `<!-- 插槽: name -->` | `<!-- 插槽: default -->` |
| 动态组件 | `<!-- 动态组件: 描述 -->` | `<!-- 动态组件: 标签页内容 -->` |

**脚本区注释**：

| 内容 | 注释格式 | 示例 |
|------|----------|------|
| 组件名称 | `// name: 组件名` | `// name: UserCard` |
| props | `// prop名: 描述` | `// user: 用户信息` |
| ref/reactive | `// 属性名: 描述` | `// searchQuery: 搜索查询参数` |
| computed | `// computed: 描述` | `// computed: 是否全选` |
| watch | `// watch: 描述` | `// watch: 监听用户输入` |
| 函数 | `// methods: 描述` | `// methods: 提交表单` |
| 组件引入 | `// component: 组件名` | `// component: UserCard` |
| Hooks 引入 | `// hook: Hook名` | `// hook: useTable` |
| provide | `// 提供的键名: 描述` | `// appConfig: 全局配置` |
| inject | `// 注入的键名: 描述` | `// parentData: 父组件提供的数据` |

**JSDoc（关键方法必填）**：

```typescript
/**
 * 方法名称
 * @description 方法的简要描述
 * @param {类型} 参数名 - 参数描述
 * @returns {类型} 返回值描述
 */
```

**注释要求**：中文描述；行内不超过一行；JSDoc 不超过 5 行；无冗余注释

### 3.8 组件生命周期 emit 限制

- **基础组件**：禁止在生命周期函数中主动向外 emit
- **业务型组件**：允许但不推荐

### 3.9 方法内部逻辑顺序

1. 初始化方法：`const initXxx = () =>`
2. 网络请求：`const getListData = async ()`, `const postFormData = async ()`
3. 事件处理：`const onClickXxx = async ()`, `const onChangeXxx = async ()`
4. 特殊计算：`const computedXxx = () =>`

### 3.10 方法职责单一化

- 一个方法只做一件事，超过 50 行必须拆分
- 重复逻辑抽离为公共方法或 Hook
- **不要过度封装**：简单条件判断直接写在 template 中

### 3.11 复杂页面拆分建议

| 模块 | 处理方式 |
|------|----------|
| 弹窗 | 拆分为独立组件 |
| 表格 | 表格组件 + 业务逻辑分离 |
| 表单 | 表单组件 + 校验逻辑分离 |

### 3.12 defineExpose

- 明确声明对外暴露的属性和方法
- 父组件通过 `ref` 访问子组件暴露的内容

---

## 4. 🔗 Hooks 组合式函数规范

### 4.1 命名规范

- 必须以 `use` 开头（如 `useTable`、`useSearchForm`、`usePagination`）
- 文件名与函数名一致，存放在 `@src/hooks/` 目录

### 4.2 返回值规范

- 统一返回对象（推荐 `toRefs` 解构后返回）
- 禁止直接返回 `reactive` 对象
- 禁止将 Hooks 挂载到响应式数据上（如 `const state = reactive(useXxx())`）

```typescript
import { ref, toRefs } from 'vue';

/**
 * 表格数据管理
 * @description 封装表格数据获取、分页、加载状态等逻辑
 */
export const useTable = () => {
  const tableData = ref<any[]>([]);
  const loading = ref(false);
  const pagination = ref({
    currentPage: 1,
    pageSize: 20,
    total: 0
  });

  const getListData = async () => {
    loading.value = true;
    try {
      const { code, data, msg } = await apiGetList({
        page: pagination.value.currentPage,
        size: pagination.value.pageSize
      });
      if (code === 0) {
        tableData.value = data.list;
        pagination.value.total = data.total;
      } else {
        console.warn(msg);
      }
    } catch (err) {
      console.warn('getListData error:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    ...toRefs({ tableData, loading, pagination }),
    getListData
  };
};
```

### 4.3 使用规范

- 组件中通过 `const { ... } = useXxx()` 解构使用
- Hooks 内部使用 `ref`/`reactive` 可管理状态
- 生命周期钩子（如 `onMounted`）只能在组件顶层或 `setup` 中调用，禁止在 Hooks 内部直接调用（除非 Hooks 本身在组件顶层执行）

### 4.4 抽离建议

可复用逻辑超过 30 行或跨 2 个以上组件使用时，必须抽离为 Hook。

| 场景 | 处理方式 |
|------|----------|
| 表格数据 + 分页 + 加载 | `useTable` |
| 搜索表单 + 重置 + 查询 | `useSearchForm` |
| 表单校验逻辑 | `useFormValidate` |
| 弹窗开关 + 状态 | `useDialog` |
| 文件上传逻辑 | `useUpload` |
| 权限判断 | `usePermission` |

---

## 5. 📡 数据流、请求与安全

### 5.1 网络请求规范

- **异步处理**：必须使用 `async/await`
- **错误处理**：必须 `try/catch/finally`
- **数据解构**：单次解构，禁止 `...data.data`
- **统一响应处理**：

```typescript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  // 处理成功逻辑
} else {
  // 处理失败逻辑
}
```

### 5.2 ref/reactive 与 computed 使用原则

- 优先使用 `ref`，复杂对象使用 `reactive`
- 除后端交互数据和部分定时器外，一律尽可能使用 `computed`
- ref 访问必须使用 `.value`

### 5.3 computed 规范

- 必须使用 `try/catch` 包裹
- 命名使用 `is` / `has` / `visible` 或有意义的名称

### 5.4 watch 规范

- **深度监听**：对象/数组变化必须声明 `deep: true`
- **立即执行**：初始化需触发时加 `immediate: true`
- **清理资源**：定时器、事件监听在组件销毁时清理

### 5.5 路由守卫清理

- `beforeRouteLeave` 中清理定时器、取消未完成请求、关闭弹窗
- 全局守卫统一处理登录校验、权限控制

### 5.6 安全规范

| 安全项 | 规范 |
|--------|------|
| v-html XSS | 使用前必须用 DOMPurify 过滤 HTML |
| 敏感数据 | 不在 URL 传 token/密码；不 `console.log` 用户凭证 |
| 全局错误捕获 | 配置 `app.config.errorHandler`，配合 Sentry 上报 |

---

## 6. 🎨 样式与性能优化

### 6.1 BEM 命名规范

- **块**：独立模块（`card`、`form`）
- **元素**：块内部子元素（`card__title`、`form__input`）
- **修饰符**：状态/样式变体（`card--dark`、`card__title--large`）
- **规则**：全小写、横线连接、无嵌套、类名唯一

```scss
.user-card {
  padding: 16px;
  .user-card__header {
    font-weight: bold;
    &--active { color: #1890ff; }
  }
}
```

### 6.2 样式区注释与作用域

| 场景 | 注释格式 | 示例 |
|------|----------|------|
| 模块分组 | `/* 模块名称 */` | `/* 用户卡片 */` |
| 子模块 | `/* 模块 > 子模块 */` | `/* 用户卡片 > 头部 */` |
| 响应式 | `/* 响应式 */` | `/* 响应式 */` |

- `scoped`：仅作用于当前组件
- 非 `scoped`：需标注 `/* 全局 */`
- 优先使用 `scoped`

### 6.3 CSS 处理

- 预处理器：Sass/SCSS
- 格式化：csscomb + prettier
- 全局样式：`src/styles/`

### 6.4 响应式适配

- 使用媒体查询 `@media` 适配不同屏幕
- 移动端优先：先写移动端，再通过媒体查询增强 PC 端
- 单位选择：宽度用 `px` 或 `rem`，字号用 `px`

### 6.5 性能优化

| 优化项 | 说明 |
|--------|------|
| 组件懒加载 | 大组件使用 `defineAsyncComponent` 动态导入 |
| KeepAlive | 合理使用 `<KeepAlive>` 缓存不常更新组件 |
| 虚拟滚动 | 长列表（100+ 项）使用虚拟滚动，避免 DOM 过多 |
| 防抖节流 | 频繁触发事件（输入、滚动、resize）使用防抖/节流 |
| 图片优化 | WebP 优先、合适尺寸、非首屏懒加载 |
| 路由懒加载 | 所有页面路由必须 `() => import()`，禁止全量打包 |

### 6.6 自定义指令

- **指令清理**：`unmounted` 钩子中必须清理事件监听器和定时器

---

## 7. 📋 约束清单速查

### 🔴 绝对禁止项

| # | 禁止项 | 说明 |
|---|--------|------|
| 1 | 连续数据解构 | 禁止 `...data.data` |
| 2 | 父组件修改子组件数据 | 禁止直接修改子组件内部状态 |
| 3 | 修改 ref/reactive 类型 | 后端给什么类型用什么，不可修改原始类型 |
| 4 | 修改 props | 禁止直接修改 props，使用 `props.xxx` 只读访问 |
| 5 | 使用 mixins | 使用 Hooks/组合式函数替代 |
| 6 | 无意义命名 | 禁止 `data1`、`temp2` |
| 7 | 使用 this | 禁止在 `<script setup>` 中使用 `this` |
| 8 | Options API | 禁止使用 `data()`、`methods: {}`、`mounted() {}` 等写法 |
| 9 | v-for 与 v-if 同元素 | 禁止同一元素同时使用 |
| 10 | index 作为 key | 必须用唯一 ID |

### 🟢 推荐项

| # | 推荐项 | 说明 |
|---|--------|------|
| 1 | 函数 try/catch | 包裹函数内容，`catch` 中使用 `console.warn` |
| 2 | async/await | 少用 `.then()` 链式写法 |
| 3 | computed 优先 | 能用 computed 解决的不用 ref/reactive |
| 4 | watch 深度/立即监听 | 按需使用 `deep: true` 和 `immediate: true` |
| 5 | Hooks 抽离 | 可复用逻辑超过 30 行或跨 2+ 组件必须抽离为 Hook |

### 🟡 不推荐项

| # | 不推荐项 | 说明 |
|---|----------|------|
| 1 | 多层 try/catch 嵌套 | 异步操作尽量扁平化 |
| 2 | 生命周期 emit | 不推荐在生命周期中主动向外 emit |

### ⚠️ 注意事项

- **未使用变量**：ESLint 已关闭检查，需自行清理无用代码
- **v-html**：可使用，但必须防范 XSS 风险
- **等于运算符**：使用 `==` 不视为问题
- **注释检查**：注释相关问题默认忽略，不进行检查
- **不要过度封装**：简单逻辑直接写在 template 中
