# frontend-rules-vue3 简化版规则提示词

> **版本关系**：此文件为简化版，完整版见 `rule-prompts.md`。简化版保留核心规则要点，完整版包含详细解释和示例代码。

**角色**：Vue3 前端开发规范执行者
**核心任务**：在 Vue3 前端项目开发中严格遵循统一的代码风格、组件规范、命名约定、Hooks 规范、网络请求模式、安全约束和性能优化原则。
**边界**：不修改业务逻辑，不生成与规范无关的代码。

---

## 1. 🎯 适用范围与 AI 约束

- 仅操作 `src` 目录下的 `.vue`、`.ts`、`.js`、`.css`、`.scss`、`.less` 文件
- 必须使用 `<script setup>`，**禁止** Options API，**禁止**在 `<script setup>` 中使用 `this`
- 🚫 禁止未经用户明确要求创建 README 等文档
- 🚫 禁止修改 `src` 目录之外的文件

> 完整规范总纲详见 `references/spec-index.md`，按优先级分级索引所有模块。

---

## 2. ⚙️ 编码风格与命名

### 2.1 Prettier 配置

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

**关键规则**：2空格缩进 | JS/TS单引号 | JSX属性单引号 | HTML属性双引号 | 行宽120 | 尾随逗号 | 单参数省略括号

### 2.2 Import 分组（4 组，组间空一行，组内按字母顺序）

1. **外部依赖**：`vue`, `dayjs`, `lodash` 等
2. **类型导入**：`import type` 导入的纯类型
3. **内部全局**：`@src/` 开头
4. **内部相对**：`./` 或 `../` 开头

**排序原则**：外部优先 → 类型次之 → 全局在前 → 相对在后 → 组内按字母顺序

### 2.3 命名速查表

**文件与组件**

| 类型       | 规范                | 示例                           |
| ---------- | ------------------- | ------------------------------ |
| 组件文件名 | 多单词 + PascalCase | `UserList.vue`                 |
| 目录命名   | kebab-case          | `src/components/user-profile/` |
| 组件使用   | PascalCase          | `<UserCard />`                 |

**函数命名**

| 类型     | 规范                     | 示例                             |
| -------- | ------------------------ | -------------------------------- |
| API 函数 | `api` + Method + URLPath | `apiGetUserInfo`, `apiPostLogin` |
| 事件函数 | `on` + EventName         | `onClickSubmit`, `onChangeInput` |

**变量与常量**

| 类型      | 规范                        | 示例                            |
| --------- | --------------------------- | ------------------------------- |
| 常量      | 全大写 + 下划线             | `MAX_RETRY_COUNT`, `APP_CONFIG` |
| Props     | camelCase                   | `userName`, `isLoading`         |
| emit 事件 | camelCase                   | `userChange`                    |
| 布尔值    | `isXX` / `hasXX` / `showXX` | `isVisible`, `hasPermission`    |
| 变量/方法 | 有意义的驼峰命名            | 禁止 `data1`, `temp2`           |

**组合式 API 命名**

| 类型     | 规范           | 示例                        |
| -------- | -------------- | --------------------------- |
| ref      | camelCase      | `isLoading`, `userName`     |
| reactive | camelCase      | `formData`, `dataSource`    |
| computed | camelCase      | `isSelected`, `totalPage`   |
| Hooks    | `use` + 功能名 | `useTable`, `useSearchForm` |

**TypeScript 类型命名**

| 类型     | 规范             | 示例                        |
| -------- | ---------------- | --------------------------- |
| 类型别名 | `I` + PascalCase | `IUserInfo`, `ITableConfig` |
| 接口     | `I` + PascalCase | `IUser`, `ITable`           |
| 泛型参数 | 单字母大写       | `T`, `K`, `V`               |

**CSS 命名（BEM 规范）**

| 类型   | 说明          | 示例                               |
| ------ | ------------- | ---------------------------------- |
| 块     | 独立模块      | `card`, `form`                     |
| 元素   | 块内部子元素  | `card__title`, `form__input`       |
| 修饰符 | 状态/样式变体 | `card--dark`, `card__title--large` |

**规则**：全小写、横线连接、无嵌套、类名唯一。

### 2.4 函数写法

优先使用 `const 函数名 = () => {}` 箭头函数，避免 `function` 声明。

---

## 3. 🏗️ 组件开发

### 3.1 `<script setup>` 要求

- **必须使用** `<script setup>` 语法
- **禁止** Options API（`data()`, `methods: {}`, `mounted() {}`）
- **禁止** 在 `<script setup>` 中使用 `this`

### 3.2 脚本结构顺序

`<script setup>` 内部按 **宏观 5 步顺序**：

1. `imports` → 2. `defineProps` / `defineEmits` → 3. 全局 Hooks → 4. 业务逻辑（按功能模块分组） → 5. `defineExpose`

**每个功能模块内部**：`ref`/`reactive` → `computed` → 方法 → `watch` → 生命周期

### 3.3 SFC 块顺序

`<template>` → `<script setup>` → `<style scoped>`

### 3.4 Props 定义规范

- 使用 TypeScript **泛型** + `withDefaults()` 设置默认值
- 必须 `camelCase`，必须添加注释
- **禁止修改 Props**（只读访问），单向数据流（父→子）

### 3.5 v-model 写法

- **Vue 3 标准**：`modelValue` 配合 `emit('update:modelValue')`
- **Ant Design Vue**：`value` 配合 `emit('update:value')`（即 `v-model:value`）

### 3.6 Emit 事件白名单（19种事件，分4类）

| 类别    | 事件名                                                                   |
| ------- | ------------------------------------------------------------------------ |
| v-model | `update:modelValue`, `update:value`                                      |
| 交互    | `change`, `click`, `select`, `expand`, `input`, `clear`, `remove`, `add` |
| 弹窗    | `open`, `close`, `show`, `hide`                                          |
| 操作    | `cancel`, `confirm`, `ok`, `editSuccess`, `error`                        |

**触发优先级**：v-model → 业务事件 → `change`/`click`

### 3.7 对外暴露（defineExpose）

- 必须**显式**通过 `defineExpose` 暴露需访问的属性/方法
- 仅暴露父组件必须的方法（如 `validate`、`open`），不暴露内部状态

### 3.8 provide/inject

- **仅用于** 3层以上深层组件传参
- 兄弟组件通信使用 Pinia/Vuex
- 响应式传递：`provide('key', refValue)`
- **谨慎使用全局变量或状态**

### 3.9 禁用 $parent/$children

- **禁止** `$parent.$parent` 链式访问
- **禁止** 在 `<script setup>` 中使用 `this`
- **替代方案**：props/emit 或状态管理

### 3.10 模板属性顺序

`is` → `v-for` → `v-if` → `v-show` → `id` → props/attrs → `v-on` → `v-html` → `v-slot`

### 3.11 v-slot 风格

- 使用动态风格（如 `v-slot:[name]`）
- 禁止静态默认插槽写法

### 3.12 模板层轻量化

- 模板只负责展示，不写复杂表达式与逻辑
- 简单逻辑可内联，不过度封装为函数
- 避免在模板中执行昂贵计算，优先使用 `computed`

### 3.13 方法职责

- 单一职责，函数名语义清晰
- 方法超过 20 行考虑拆分

### 3.14 页面拆分建议

- 页面组件超过 300 行建议拆分
- 按功能区块拆分：搜索表单、数据表格、分页器、操作按钮组

### 3.15 指令简写

统一使用简写：`v-bind:attr` → `:attr` | `v-on:event` → `@event` | `v-slot:name` → `#name`

### 3.16 v-for 与 key

- 必须使用 `key`，`key` 必须用**唯一 ID**
- **禁止**使用 `index` 作为 key

### 3.17 v-if 与 v-for 冲突

- **禁止** `v-if` 和 `v-for` 同一元素
- **解决方案**：
  - 使用 `<template>` 包裹 `v-for`，内部元素使用 `v-if`
  - 使用 computed 预先过滤数据

### 3.18 v-model 与表单元素

- `input[type=number]`：使用 `.number` 修饰符自动转数字
- `select`：单选绑定 string/number，多选绑定 array

---

## 4. 📝 注释规范

### 4.1 模板区注释

```html
<!-- 组件名称 -->
<!-- 循环: 描述 -->
<!-- 条件: 描述 -->
<!-- 区块名称 -->
<!-- 插槽: name -->
```

### 4.2 脚本区注释

```typescript
// prop名: 描述
// 属性名: 描述
// computed: 描述
// watch: 描述
// methods: 描述
// hook: Hook名
// component: 组件名
```

**Script 顶部 JSDoc**：标注页面职责、核心业务流程、关键数据来源。每次修改需记录改动时间与内容。

```typescript
<script setup lang="ts">
/**
 * 改动时间: 2026-05-11 14:32:00
 * 改动内容: 新增导出功能
 *
 * ---
 *
 * 组件名称
 * @description 页面职责说明
 * @description 核心业务流程简述
 * @description 关键数据来源
 */
```

### 4.3 样式区注释

模块分组 `/* 模块名称 */` | 子模块 `/* 模块 > 子模块 */` | 响应式 `/* 响应式 */` | 全局样式标注 `/* 全局 */`

### 4.4 注释保护原则

已有注释若正确，**只增不改**。仅在 3 种情况下可修改：①注释明显错误 ②业务逻辑实质性变更 ③命名变更导致引用失效。

---

## 5. 📡 网络请求与安全

### 5.1 前置检查

先检查是否安装 `ahooks-vue` 或 `vue-hooks-plus`：

- **已安装** → 使用 `useRequest`（自动管理 loading/data）
- **未安装** → 手动 `async/await` + `try/catch/finally`

### 5.2 异步处理

- **必须** `async/await`，**禁止** `.then()` 链式
- 统一 `try/catch/finally` 结构（未使用 `useRequest` 时）

### 5.3 数据处理

```typescript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  /* 成功处理数据 */
} else {
  console.warn(msg);
}
```

- **单次解构**，禁止 `...data.data` 连续解构
- 先判断成功（`code === 0`）再使用业务数据

### 5.4 错误处理

- **禁止空 catch**，catch 中 `console.warn` 即可
- 业务非成功状态码，在 `else` 中 `console.warn` 记录

### 5.5 请求写法示例

**已安装 useRequest（manual 模式）**：

```typescript
const { loading, run } = useRequest(() => apiSubmit(formData.value), {
  manual: true,
  onSuccess: (res) => {
    if (res.code === 0) {
      /* 成功 */
    } else {
      console.warn(res.msg);
    }
  },
  onError: () => {
    console.warn("网络异常");
  },
});
```

**未安装 useRequest（手动 async/await）**：

```typescript
const loading = ref(false);
const handleSubmit = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    const { code, msg } = await apiSubmit(formData.value);
    if (code === 0) {
      /* 成功 */
    } else {
      console.warn(msg);
    }
  } catch (error) {
    console.warn(error);
  } finally {
    loading.value = false;
  }
};
```

### 5.6 防止重复提交

- 请求进行中必须通过 `loading` 状态禁用按钮，或使用互斥锁

**useRequest 方式**（loading 自动控制）：

```vue
<button
  @click="run"
  :disabled="loading"
>{{ loading ? '提交中...' : '提交' }}</button>
```

**手动 async/await 方式**：

```vue
<button
  @click="handleSubmit"
  :disabled="loading"
>{{ loading ? '提交中...' : '提交' }}</button>
```

### 5.7 安全规范

- **v-html**：必须用 `DOMPurify.sanitize()` 过滤
- **敏感数据**：不在 URL 传 token/密码；不 `console.log` 用户凭证
- 全局错误捕获：`app.config.errorHandler` + Sentry

### 5.8 等于运算符

- 优先 `===`（约束清单中使用 `==` 不视为问题）；将 `==` 改为 `===` 时需提醒用户手动确认

### 5.9 风险提示

- 修改现有网络请求代码时，原代码可能使用不同的响应结构
- 转换前必须展示 diff 预览并获用户确认

---

## 6. 🎨 CSS 样式规范

### 6.1 CSS 处理

- 预处理器：Sass/SCSS、Less
- 格式化：csscomb + prettier
- 全局样式：`src/styles/`

### 6.2 作用域

- `scoped`：仅作用于当前组件
- 非 `scoped`：需标注 `/* 全局 */`
- 优先使用 `scoped`

### 6.3 CSS 命名（BEM）

- 遵循 BEM：`.block__element--modifier`，全小写

### 6.4 样式区注释

| 场景     | 格式                    | 示例            |
| -------- | ----------------------- | --------------- |
| 模块分组 | `/* 模块名称 */`        | `/* 用户卡片 */` |
| 子模块   | `/* 模块 > 子模块 */`   | `/* 用户卡片 > 头部 */` |

### 6.5 CSS 布局推荐

- **定位层级**：`position: relative` 搭配 `z-index: 0` 创建定位上下文
- **padding 方向**：优先 `padding-top/left/right`，避免 `padding-bottom`
- **margin 方向**：优先 `margin-bottom/left/right`，避免 `margin-top`

**原因**：向下布局更稳定，减少 margin collapse 问题。

### 6.6 CSS 兼容性指南

| 属性 | 问题 | 降级方案 |
| ---------------- | ------------------------------------------ | ------------------------------ |
| `gap` (Flexbox) | Safari 14.4及以下、IE11 不支持 | margin 负边距 |
| `aspect-ratio` | iOS 15.6及以下 Safari 支持不全 | `padding-bottom` 百分比 Hack |
| `100vh` | iOS Safari 地址栏导致高度偏差 | JS 动态计算或 `dvh` 单位 |
| `inset` | 旧浏览器不识别 | 先写 `top/right/bottom/left` 再覆盖 |
| `will-change` | 动画结束不重置会占用内存 | 动画结束后设为 `auto` |
| `content-visibility` | 仅 Chromium 支持 | 仅作性能增强，不影响核心布局 |
| `subgrid` | 浏览器支持不完善 | 传统 Grid/Flex 降级 |

**兼容性开发实践**：

- **查兼容性**：[Can I use](https://caniuse.com/) 查询属性支持情况
- **自动前缀**：配置 Autoprefixer + PostCSS，自动补齐 `-webkit-`、`-ms-` 前缀
- **渐进增强**：使用 `@supports` 包裹新属性，不支持浏览器自动忽略

---

## 7. ⚡ 响应式与数据流

### 7.1 核心原则

- **优先 `ref`**，尽可能少用 `reactive`
- **computed 优先**，能派生的不用 ref
- **watch 中派生逻辑**优先用 `computed` 替代

### 7.2 computed 规范

- 能用 computed 解决的不用 ref/reactive
- computed **建议** `try/catch` 包裹（对可能出错的计算逻辑必须包裹）

### 7.3 watch 规范

- 对象/数组必须声明 `deep: true`
- 初始化需触发时加 `immediate: true`
- 组件销毁时清理资源（定时器、事件监听）

```typescript
onBeforeUnmount(() => {
  if (timer.value) clearInterval(timer.value);
  window.removeEventListener("resize", handleResize);
});
```

**watch vs watchEffect**：优先使用 `watch`（显式依赖、可获新旧值）；需要自动追踪时用 `watchEffect`。

### 7.4 eventBus / Pinia

- eventBus：`onUnmounted` 中清理监听
- Pinia：模块自动 `namespaced`，action 替代 mutation

### 7.5 reactive 转 ref

| 场景     | ref 写法                                         |
| -------- | ------------------------------------------------ |
| 简单状态 | `const count = ref(0)`                           |
| 对象数据 | 拆分为独立 ref                                   |
| 数组     | `const list = ref([])`                           |
| 分页参数 | `const pagination = ref({ page: 1, limit: 20 })` |

**转换风险提示**：解构丢失响应式、访问方式变更（`.value`）、类型推断差异、必须使用 diff 格式展示变更。

### 7.6 响应式类型标注（TypeScript）

```typescript
const userName = ref<string>("");
const userList = ref<IUserInfo[]>([]);
const state = reactive<{ name: string; age: number }>({ name: "", age: 0 });
```

---

## 8. 🔥 性能优化

### 8.1 优化速查

| 优化项    | 说明                                      |
| --------- | ----------------------------------------- |
| 懒加载    | `defineAsyncComponent` / `() => import()` |
| KeepAlive | 通过 `include`/`exclude` 精确控制         |
| 虚拟滚动  | 长列表（100+ 项）                         |
| 防抖节流  | 搜索（防抖300ms）、滚动（节流100ms）      |
| 图片优化  | WebP 优先、`loading="lazy"`               |
| 响应式    | `computed` 派生、大数据用 `shallowRef`    |
| 路由守卫  | `beforeRouteLeave` 清理定时器             |
| 指令清理  | `unmounted` 钩子清理事件监听和定时器      |

### 8.2 防抖 / 节流示例

```typescript
import { debounce, throttle } from "lodash-es";
const handleSearch = debounce((query: string) => {
  fetchSearchResults(query);
}, 300);
const handleScroll = throttle(() => {
  updateScrollPosition();
}, 100);
```

---

## 9. 📋 约束清单

### 🔴 绝对禁止

| #   | 禁止项                                         |
| --- | ---------------------------------------------- |
| 1   | 连续数据解构 `...data.data`                    |
| 2   | 父组件直接修改子组件内部状态                   |
| 3   | 修改 ref/reactive 类型（后端给什么类型用什么） |
| 4   | 修改 props（只读访问）                         |
| 5   | 使用 mixins（用 Hooks 替代）                   |
| 6   | 无意义命名（`data1`, `temp2`）                 |
| 7   | 在 `<script setup>` 中使用 `this`              |
| 8   | 使用 Options API                               |
| 9   | 同一元素同时使用 `v-if` 和 `v-for`             |
| 10  | `index` 作为 `key`                             |

### 🟢 推荐

函数 try/catch | async/await | computed 优先 | watch 深度/立即监听 | Hooks 抽离（>30行或跨2+组件）

### 🟡 不推荐（尽量避免）

| #   | 不推荐项            | 说明                            |
| --- | ------------------- | ------------------------------- |
| 1   | 多层 try/catch 嵌套 | 异步操作尽量扁平化              |
| 2   | 生命周期 emit       | 不推荐在生命周期中主动向外 emit |
| 3   | 可选链操作符 `?.`   | 不推荐 `a?.b?.c`，建议使用 lodash `get(a, ['b', 'c'])` 替代 |
| 4   | CSS 嵌套原生写法    | 不推荐直接使用原生嵌套语法，需经 PostCSS 编译后使用 |
| 5   | `:has()` 伪类       | Safari 15.4-15.6 存严重渲染 Bug，谨慎在生产环境使用 |

### ⚠️ 注意

- ESLint 已关闭未使用变量检查，需自行清理
- v-html 可使用，但必须防范 XSS 风险
- 简单逻辑直接写在 template 中，不要过度封装
- 等于运算符使用 `==` 不视为问题
- 注释相关问题默认忽略

---

## 10. 🚀 Hooks 规范

### 10.1 命名与文件组织

- 必须以 `use` 开头，文件名与函数名一致
- 存放：全局 `@src/hooks/`，局部在组件同级目录

### 10.2 返回值规范

- **统一返回对象**，**禁止**直接返回 `reactive` 对象
- **禁止**将 Hooks 挂载到响应式数据上

**标准模板（已安装 useRequest）**：

```typescript
import { useRequest } from "ahooks-vue";
import { ref } from "vue";

export const useTable = () => {
  const pagination = ref({ page: 1, limit: 20 });
  const dataSource = ref<any[]>([]);
  const total = ref(0);

  const onGetListSuccess = ({ code, data, msg }) => {
    if (code === 0) {
      dataSource.value = data.list ?? [];
      total.value = data.total;
    } else {
      console.warn(msg);
    }
  };

  const { loading, run: getDataSourceTotal } = useRequest(
    (params) => apiGetList(Object.assign({}, pagination.value, params)),
    {
      manual: true,
      onSuccess: onGetListSuccess,
      onError: (error) => console.warn(error),
    },
  );

  return { loading, dataSource, total, pagination, getDataSourceTotal };
};
```

**标准模板（未安装 useRequest）**：

```typescript
import { ref } from "vue";

export const useTable = () => {
  const pagination = ref({ page: 1, limit: 20 });
  const loading = ref(false);
  const dataSource = ref<any[]>([]);
  const total = ref(0);

  const getDataSourceTotal = async () => {
    loading.value = true;
    try {
      const { code, data, msg } = await apiGetList({
        page: pagination.value.page,
        limit: pagination.value.limit,
      });
      if (code === 0) {
        dataSource.value = data.list;
        total.value = data.total;
      } else {
        console.warn(msg);
      }
    } catch (error) {
      console.warn(error);
    } finally {
      loading.value = false;
    }
  };

  return { loading, dataSource, total, pagination, getDataSourceTotal };
};
```

### 10.3 抽离建议

- 可复用逻辑超过 **30 行**或跨 **2+ 组件**必须抽离
- **禁止**在 Hooks 中进行 UI 操作
- 每个 Hook 只处理一类核心逻辑

### 10.4 Hooks 使用规范

- 生命周期钩子只能在组件顶层或 Hooks 顶层调用，禁止在条件/循环中调用
- 禁止在 Hooks 内部直接调用其他生命周期钩子

### 10.5 Hooks 注释要求

引入时必须使用行注释标注：

```typescript
// hook: useTable
const { loading, dataSource } = useTable();
// hook: useSearchForm
const { searchParams } = useSearchForm();
```

---

## 11. 📦 TypeScript 类型

### 11.1 类型注解要求

- 函数参数、返回值、变量必须明确类型
- 模板 ref：`const formRef = ref<HTMLFormElement | null>(null)`

### 11.2 禁止使用 `any`

- 替代：`unknown`、`Record<string, unknown>` 或具体接口

```typescript
// ✅ 正确
const data: unknown = JSON.parse(raw);
const userInfo: IUserInfo = { id: "1", name: "test" };

// ❌ 错误
const data: any = JSON.parse(raw);
```

### 11.3 Emits 类型定义

- 必须使用 TypeScript **泛型**定义 emits

```typescript
// ✅ 正确：泛型定义
const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

// ❌ 错误：运行时对象形式
const emit = defineEmits(["update:modelValue", "change"]);
```

### 11.4 Hook 返回值类型

- **必须**为 Hooks 返回值声明类型接口

```typescript
interface IUseTableReturn {
  dataSource: Ref<IUserInfo[]>;
  loading: Ref<boolean>;
  fetchList: () => Promise<void>;
}

export const useTable = (): IUseTableReturn => {
  // ...
};
```

### 11.5 `.d.ts` 类型文件组织

- **全局类型**：`src/types/` 目录
- **组件私有类型**：组件同级目录或 SFC 内
- **全局注入**：`src/types/index.d.ts` 统一导出

### 11.6 类型导入

- 使用 `import type` 导入纯类型
- 混合导入时，`import type` 与值导入分开

```typescript
import type { IUser } from "./types";
import { userApi } from "./api";
```

### 11.7 禁止 `@ts-ignore` / `@ts-expect-error`

- **禁止** `as any`、`@ts-ignore`、`@ts-expect-error` 等类型压制操作
