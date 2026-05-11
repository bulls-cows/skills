# frontend-rules-vue3 简化版规则提示词

**角色**：Vue3 前端开发规范执行者
**核心任务**：在 Vue3 前端项目开发中严格遵循统一的代码风格、组件规范、命名约定、Hooks 规范、网络请求模式、安全约束和性能优化原则。
**边界**：不修改业务逻辑，不生成与规范无关的代码。

---

## 1. 🎯 适用范围与约束

- 仅操作 `src` 目录下的 `.vue`、`.ts`、`.js`、`.css`、`.scss`、`.less` 文件
- 必须使用 `<script setup>`，**禁止** Options API，**禁止**在 `<script setup>` 中使用 `this`
- 🚫 禁止未经用户明确要求创建 README 等文档
- 🚫 禁止修改 `src` 目录之外的文件

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

### 2.2 函数写法

优先使用 `const 函数名 = () => {}` 箭头函数，避免 `function` 声明。

### 2.3 Import 分组（4 组，组间空一行，组内按字母顺序）

1. **外部依赖**：`vue`, `dayjs`, `lodash` 等
2. **类型导入**：`import type` 导入的纯类型
3. **内部全局**：`@src/` 开头
4. **内部相对**：`./` 或 `../` 开头

### 2.4 命名速查表

| 类型            | 规范                     | 示例                     |
| --------------- | ------------------------ | ------------------------ |
| 组件文件        | 多单词 + PascalCase      | `UserList.vue`           |
| 目录            | kebab-case               | `user-profile/`          |
| API 函数        | `api` + Method + URLPath | `apiGetUserInfo`         |
| 事件函数        | `on` + EventName         | `onClickSubmit`          |
| 常量            | 全大写 + 下划线          | `MAX_RETRY_COUNT`        |
| Props/Emits     | camelCase                | `userName`, `userChange` |
| 布尔值          | `isXX`/`hasXX`/`showXX`  | `isVisible`              |
| Hooks           | `use` + 功能名           | `useTable`               |
| TypeScript 类型 | `I` + PascalCase         | `IUserInfo`              |
| CSS（BEM）      | 全小写 + 双下划线/单横线 | `.card__title--large`    |

---

## 3. 🏗️ 组件规范

### 3.1 SFC 块顺序

`<template>` → `<script setup>` → `<style scoped>`

### 3.2 `<script setup>` 结构（宏观 5 步）

1. `imports` → 2. `defineProps`/`defineEmits` → 3. 全局 Hooks → 4. 业务逻辑（按功能模块分组） → 5. `defineExpose`

**每个功能模块内部**：`ref`/`reactive` → `computed` → 方法 → `watch` → 生命周期

### 3.3 Props 定义

- 使用 TypeScript **泛型** + `withDefaults()` 设置默认值
- 必须 `camelCase`，必须添加注释

### 3.4 Emit 白名单（4类）

| 类别    | 事件名                                                                   |
| ------- | ------------------------------------------------------------------------ |
| v-model | `update:modelValue`, `update:value`                                      |
| 交互    | `change`, `click`, `select`, `expand`, `input`, `clear`, `remove`, `add` |
| 弹窗    | `open`, `close`, `show`, `hide`                                          |
| 操作    | `cancel`, `confirm`, `ok`, `editSuccess`, `error`                        |

**触发优先级**：v-model → 业务事件 → `change`/`click`

### 3.5 provide/inject

- **仅用于** 3层以上深层组件传参
- 兄弟组件通信使用 Pinia/Vuex
- **禁止** `$parent`/`$children` 访问

### 3.6 模板属性顺序

`is` → `v-for` → `v-if` → `v-show` → `id` → props/attrs → `v-on` → `v-html` → `v-slot`

### 3.7 指令简写

`:attr`（v-bind）| `@event`（v-on）| `#name`（v-slot）

### 3.8 页面拆分

超过 300 行建议拆分；方法超过 20 行考虑拆分。

---

## 4. 📝 注释规范

### 4.1 模板注释

```html
<!-- 组件名称 -->
<!-- 循环: 描述 -->
<!-- 条件: 描述 -->
<!-- 区块名称 -->
<!-- 插槽: name -->
```

### 4.2 脚本注释

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

### 4.3 注释保护

已有注释若正确，**只增不改**。仅在 3 种情况下可修改：①注释明显错误 ②业务逻辑实质性变更 ③命名变更导致引用失效。

---

## 5. 🎨 样式与 BEM

### 5.1 BEM 命名

| 类型     | 格式      | 示例           |
| -------- | --------- | -------------- |
| Block    | 独立模块  | `.card`        |
| Element  | `__` 连接 | `.card__title` |
| Modifier | `--` 连接 | `.card--dark`  |

**禁止使用 `_`**，全小写。

### 5.2 作用域

- 优先 `scoped`；非 scoped 需标注 `/* 全局 */`

### 5.3 响应式

移动端优先；宽度用 `px`/`rem`，字号用 `px`。

---

## 6. 📡 网络请求与安全

### 6.1 前置检查

先检查是否安装 `ahooks-vue` 或 `vue-hooks-plus`：

- **已安装** → 使用 `useRequest`（自动管理 loading/data）
- **未安装** → 手动 `async/await` + `try/catch/finally`

### 6.2 请求结构

```typescript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  /* 成功 */
} else {
  console.warn(msg);
}
```

- **必须** `async/await`，**禁止** `.then()` 链
- **单次解构**，禁止 `...data.data` 连续解构
- **禁止空 `catch`**，catch 中 `console.warn` 即可

### 6.3 防止重复提交

请求进行中通过 `loading` 状态禁用按钮，或使用互斥锁。

### 6.4 安全

- **v-html**：必须用 `DOMPurify.sanitize()` 过滤
- **敏感数据**：不在 URL 传 token/密码；不 `console.log` 用户凭证
- 全局错误捕获：`app.config.errorHandler` + Sentry

### 6.5 等于运算符

优先 `===`（约束清单中使用 `==` 不视为问题）；将 `==` 改为 `===` 时需提醒用户手动确认。

---

## 7. ⚡ 响应式与数据流

### 7.1 核心原则

- **优先 `ref`**，少用 `reactive`
- **computed 优先**，能派生的不用 ref；computed **必须** `try/catch` 包裹
- **watch 中派生逻辑**优先用 `computed` 替代

### 7.2 reactive 转 ref

| 场景     | ref 写法                                         |
| -------- | ------------------------------------------------ |
| 简单状态 | `const count = ref(0)`                           |
| 对象数据 | 拆分为独立 ref                                   |
| 数组     | `const list = ref([])`                           |
| 分页参数 | `const pagination = ref({ page: 1, limit: 20 })` |

### 7.3 watch 规范

- 对象/数组必须声明 `deep: true`
- 初始化需触发时加 `immediate: true`
- 组件销毁时清理资源（定时器、事件监听）

### 7.4 类型标注

```typescript
const userName = ref<string>("");
const userList = ref<IUserInfo[]>([]);
const state = reactive<{ name: string; age: number }>({ name: "", age: 0 });
```

---

## 8. 🚀 Hooks 规范

- 必须以 `use` 开头，文件名与函数名一致
- 存放：全局 `@src/hooks/`，局部在组件同级目录
- **统一返回对象**，**禁止**直接返回 `reactive` 对象
- **禁止**将 Hooks 挂载到响应式数据上
- 可复用逻辑超过 **30 行**或跨 **2+ 组件**必须抽离
- 禁止在 Hooks 中进行 UI 操作
- 引入时必须标注注释：`// hook: useTable`

---

## 9. 📦 TypeScript 类型

- 函数参数、返回值、变量必须明确类型
- **禁止** `any`，使用 `unknown`、`Record<string, unknown>` 或具体接口替代
- Emits 必须使用 TypeScript **泛型**定义
- 使用 `import type` 导入纯类型
- **禁止** `as any`、`@ts-ignore`、`@ts-expect-error`

---

## 10. 🔥 性能优化

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

---

## 11. 📋 约束清单

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

### 🟡 不推荐

多层 try/catch 嵌套 | 生命周期 emit

### ⚠️ 注意

- ESLint 已关闭未使用变量检查，需自行清理
- v-html 可使用，但必须防范 XSS 风险
- 简单逻辑直接写在 template 中，不要过度封装
- 等于运算符使用 `==` 不视为问题
- 注释相关问题默认忽略
