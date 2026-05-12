# frontend-rules-vue2 简化版规则提示词

**角色**：Vue2 前端开发规范执行者
**核心任务**：在 Vue2 前端项目开发中严格遵循统一的代码风格、组件规范、命名约定、网络请求模式、安全约束和性能优化原则。
**边界**：不修改业务逻辑，不生成与规范无关的代码。

---

## 1. 🎯 适用范围与 AI 约束

- 仅操作 `src` 目录下的 `.vue`、`.js`、`.css`、`.scss`、`.less` 文件
- 使用 **Options API**（`data()`, `methods: {}`, `mounted() {}`）
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

**关键规则**：2空格缩进 | JS单引号 | HTML属性双引号 | 行宽120 | 尾随逗号 | 单参数省略括号 | 对象括号保留空格

### 2.2 Import 分组（3 组，组间空一行，组内按字母顺序）

1. **外部依赖**：`vue`, `dayjs`, `lodash` 等
2. **内部全局**：`@src/` 开头
3. **内部相对**：`./` 或 `../` 开头

### 2.3 命名速查表

**文件与组件**

| 类型     | 规范                | 示例            |
| -------- | ------------------- | --------------- |
| 组件文件 | 多单词 + PascalCase | `UserList.vue`  |
| 目录     | kebab-case          | `user-profile/` |
| 组件使用 | PascalCase          | `<UserCard />`  |

**注意**：组件名必须使用多个单词，避免与 HTML 原生元素冲突。

**函数命名**

| 类型     | 规范                               | 示例                             |
| -------- | ---------------------------------- | -------------------------------- |
| API 函数 | `api` + Method + URLPath（小驼峰） | `apiGetUserInfo`, `apiPostLogin` |
| 事件函数 | `on` + EventName（小驼峰）         | `onClickSubmit`, `onChangeInput` |

**变量与常量**

| 类型        | 规范                         | 示例                            |
| ----------- | ---------------------------- | ------------------------------- |
| 常量        | 全大写 + 下划线              | `MAX_RETRY_COUNT`, `APP_CONFIG` |
| Props/Emits | camelCase，必须注释          | `userId`, `userChange`          |
| 布尔值      | `isXX`/`hasXX`/`showXX` 前缀 | `isVisible`, `hasPermission`    |
| 变量/方法   | 有意义的驼峰命名             | 禁止 `data1`, `temp2`           |

**CSS 命名（BEM 规范）**

| 类型               | 说明          | 示例                                 |
| ------------------ | ------------- | ------------------------------------ |
| Block（块）        | 独立组件/模块 | `.card`, `.form`                     |
| Element（元素）    | 块内部子元素  | `.card__title`, `.form__input`       |
| Modifier（修饰符） | 状态/样式变体 | `.card--dark`, `.card__title--large` |

**规则**：全小写、`__` 连接元素、`--` 连接修饰符、类名唯一，禁止使用 `_`（除 `__` 外）。

---

## 3. 🏗️ 组件开发

### 3.1 Options API 要求

- 使用 **Options API**（`data()`, `methods`, `computed`, `watch`, 生命周期钩子）
- 组件必须声明 `name` 选项

### 3.2 脚本结构顺序（强制）

`name` → `components` → `props` → `data()` → `computed` → `watch` → `methods` → 生命周期钩子

### 3.3 SFC 块顺序

`<template>` → `<script>` → `<style scoped>`

### 3.4 Props 定义规范

- Options API 写法，明确 `type` + `default` + 中文注释
- 必须 `camelCase`
- **禁止修改 Props**（只读访问），单向数据流（父→子）

### 3.5 v-model 写法

- **Vue 2 标准**：`value` 配合 `this.$emit('input', newVal)`

### 3.6 Emit 事件白名单（4类）

| 类别    | 事件名                                                          |
| ------- | --------------------------------------------------------------- |
| v-model | `input`                                                         |
| 交互    | `change`, `click`, `select`, `expand`, `clear`, `remove`, `add` |
| 弹窗    | `open`, `close`, `show`, `hide`                                 |
| 操作    | `cancel`, `confirm`, `ok`, `editSuccess`, `error`               |

**触发优先级**：`emit("input")` → `emit("其它")` → `emit("change/click")`

### 3.7 对外暴露

- 基础组件生命周期禁止 emit
- 父组件通过 `$refs` 访问子组件方法

### 3.8 provide/inject

- **仅用于** 3层以上深层组件传参
- 兄弟组件通信使用 Vuex / eventBus
- 保持响应式传递

### 3.9 禁用 $parent/$children

- **禁止** `$parent.$children` 链式访问

### 3.10 模板属性顺序

`is` → `v-for` → `v-if/v-else-if/v-else` → `v-show/v-cloak` → `id` → props/attrs → `v-on` → `v-html/v-text`

### 3.11 v-slot 风格

- 使用动态风格
- 禁止静态默认插槽写法

### 3.12 模板层轻量化

- 模板只负责展示，不写复杂表达式与逻辑
- 简单逻辑可内联，不过度封装为函数
- 避免在模板中执行昂贵计算，优先使用 `computed`

### 3.13 方法职责

- 内部顺序：init → 网络请求 → 事件处理 → 特殊计算
- 超过 50 行必须拆分
- 不要过度封装（简单判断直接写在 template 中）

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
- 解决：`<template>` 包裹 或 computed 预过滤

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

```javascript
// prop名: 描述
// 属性名: 描述
// computed: 描述
// watch: 描述
// methods: 描述
// component: 组件名
// provide/inject的键名: 描述
```

**Script 顶部 JSDoc**：

```javascript
/** 组件名称
 * @description 页面职责 / 核心业务流程 / 关键数据来源
 *
 * ---
 * 改动时间: YYYY-MM-DD HH:mm:ss
 * 改动内容: 简述本次修改
 */
```

每次修改文件时追加改动记录。

### 4.3 注释保护原则

已有注释若正确，**只增不改**。仅在 3 种情况下可修改：①注释明显错误 ②业务逻辑实质性变更 ③命名变更导致引用失效。

---

## 5. 📡 网络请求与安全

### 5.1 异步处理

- **必须** `async/await`，**禁止** `.then()` 链式调用
- 统一 `try/catch/finally` 结构

### 5.2 数据处理

```javascript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  /* 成功处理数据 */
} else {
  console.warn(msg);
}
```

- **单次解构**，禁止 `...data.data` 连续解构
- 先判断成功（`code === 0`）再使用业务数据

### 5.3 错误处理

- **禁止空 catch**，catch 中 `console.warn` 即可
- 业务非成功状态码，在 `else` 中 `console.warn` 记录

### 5.4 请求写法示例

```javascript
async handleSubmit() {
  if (this.loading) return;
  this.loading = true;
  try {
    const { code, msg } = await apiSubmit(this.formData);
    if (code === 0) {
      /* 成功 */
    } else {
      console.warn(msg);
    }
  } catch (error) {
    console.warn(error);
  } finally {
    this.loading = false;
  }
},
```

### 5.5 防止重复提交

- 请求进行中必须通过 `loading` 状态禁用按钮

```vue
<button @click="handleSubmit" :disabled="loading">
  {{ loading ? '提交中...' : '提交' }}
</button>
```

### 5.6 安全规范

- **v-html**：必须用 `DOMPurify.sanitize()` 过滤
- **敏感数据**：不在 URL 传 token/密码；不 `console.log` 用户凭证

### 5.7 等于运算符

- 优先推荐 `==`。若将 `===` 改为 `==`，需提醒用户手动确认。注释问题默认忽略。

---

## 6. 🎨 CSS 样式规范

### 6.1 预处理器

- 使用 **Sass/SCSS** 或 **Less** 预处理器
- 格式化：csscomb + prettier 配合
- 全局样式集中存放 `src/styles/`

### 6.2 scoped 优先

- 默认使用 `<style scoped>`，确保样式隔离在当前组件
- 非 scoped 样式需标注原因：`/* 全局 */`
- 优先 scoped，非必要不写全局样式

### 6.3 BEM 命名

- 遵循 BEM：`.block__element--modifier`，全小写
- 详见 §2.3 CSS 命名（BEM 规范）

### 6.4 样式区注释

| 场景     | 格式                    | 示例            |
| -------- | ----------------------- | --------------- |
| 模块分组 | `/* 模块名称 */`        | `/* 用户卡片 */` |
| 子模块   | `/* 模块 > 子模块 */`   | `/* 用户卡片 > 头部 */` |

---

## 7. ⚡ 响应式与数据流

### 7.1 核心原则

- **computed 优先**，除后端交互数据和定时器外，尽可能使用 `computed`
- 能用 computed 解决的不用 data

### 7.2 computed 规范

- computed **必须** `try/catch` 包裹
- 命名用 `is/has/visible` 前缀

### 7.3 watch 规范

- 对象/数组变化需 `deep: true`
- 初始化需 `immediate: true`
- 组件 `beforeDestroy` 时清理资源（定时器、事件监听）

### 7.4 eventBus / Vuex

- eventBus：`beforeDestroy` 中 `$off()` 清理
- Vuex：模块必须 `namespaced: true`，mutation 仅同步操作

### 7.5 响应式陷阱（Vue2 特有）

| 场景         | 错误写法                | 正确写法                             |
| ------------ | ----------------------- | ------------------------------------ |
| 新增对象属性 | `this.obj.newKey = val` | `this.$set(this.obj, 'newKey', val)` |
| 数组索引赋值 | `this.arr[i] = val`     | `this.$set(this.arr, i, val)`        |
| 数组长度修改 | `this.arr.length = n`   | `this.arr.splice(n)`                 |

---

## 8. 🔥 性能优化

### 8.1 优化速查

| 优化项    | 说明                                                              |
| --------- | ----------------------------------------------------------------- |
| 懒加载    | 路由 `() => import()` / `Vue.component('xx', () => import('xx'))` |
| KeepAlive | 通过 `include`/`exclude` 精确控制                                 |
| 虚拟滚动  | 长列表（100+ 项）                                                 |
| 防抖节流  | 搜索（防抖300ms）、滚动（节流100ms）                              |
| 图片优化  | WebP 优先、`loading="lazy"`                                       |
| 数据响应式 | `computed` 派生、大数据用 `Object.freeze()` 冻结                  |
| 路由守卫  | `beforeRouteLeave` 清理定时器                                     |
| 指令清理  | `unbind` 钩子清理事件监听和定时器                                 |

### 8.2 防抖 / 节流示例

```js
import { debounce, throttle } from "lodash-es";
const handleSearch = debounce((query) => {
  fetchSearchResults(query);
}, 300);
const handleScroll = throttle(() => {
  updateScrollPosition();
}, 100);
```

---

## 9. 📋 约束清单

### 🔴 绝对禁止

| #   | 禁止项                             | 说明                                   |
| --- | ---------------------------------- | -------------------------------------- |
| 1   | 连续数据解构                       | 禁止 `...data.data`                    |
| 2   | 父组件直接修改子组件内部状态       | 禁止直接修改子组件内部状态             |
| 3   | 修改 data 原始类型                 | 后端给什么类型用什么，不可修改原始类型 |
| 4   | 修改 props（只读访问）             | 不允许直接修改 props                   |
| 5   | 使用 mixins                        | 改用组合式函数或组件组合               |
| 6   | 无意义命名（`data1`, `temp2`）     | 变量/方法必须有意义                    |
| 7   | `$parent` 链式访问                 | 禁止 `$parent.$parent`                 |
| 8   | 同一元素同时使用 `v-if` 和 `v-for` | 必须分离                               |
| 9   | `index` 作为 `key`                 | 必须用唯一 ID                          |
| 10  | `setTimeout` 替代 `$nextTick`      | DOM 更新操作必须用 `$nextTick`         |

### 🟢 推荐

| #   | 推荐项              | 说明                                        |
| --- | ------------------- | ------------------------------------------- |
| 1   | 函数 try/catch      | 包裹函数内容，`catch` 中使用 `console.warn` |
| 2   | async/await         | 少用 `.then()` 链式写法                     |
| 3   | computed 优先       | 能用 computed 解决的不用 data               |
| 4   | watch 深度/立即监听 | 按需使用 `deep: true` 和 `immediate: true`  |
| 5   | computed try/catch  | 必须 try/catch 包裹，避免计算属性报错       |
| 6   | 减少 data 冗余      | 优先 computed 派生，减少 data 属性          |

### 🟡 不推荐

| #   | 不推荐项            | 说明                            |
| --- | ------------------- | ------------------------------- |
| 1   | 多层 try/catch 嵌套 | 异步操作尽量扁平化              |
| 2   | 生命周期 emit       | 不推荐在生命周期中主动向外 emit |

### ⚠️ 注意事项

- **未使用变量**：ESLint 已关闭检查，需自行清理无用代码
- **v-html**：可使用，但必须防范 XSS 风险
- **props 解构**：可以解构（需注意响应式丢失问题）
- **等于运算符**：使用 `==` 不视为问题
- **注释检查**：注释相关问题默认忽略，不进行检查
- **不要过度封装**：简单逻辑直接写在 template 中
