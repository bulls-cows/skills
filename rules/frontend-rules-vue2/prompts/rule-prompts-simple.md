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
  "bracketSpacing": true,
  "bracketSameLine": false,
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

| 类型        | 规范                     | 示例                   |
| ----------- | ------------------------ | ---------------------- |
| 组件文件    | 多单词 + PascalCase      | `UserList.vue`         |
| 目录        | kebab-case               | `user-profile/`        |
| API 函数    | `api` + Method + URLPath | `apiGetUserInfo`       |
| 事件函数    | `on` + EventName         | `onClickSubmit`        |
| 常量        | 全大写 + 下划线          | `MAX_RETRY_COUNT`      |
| Props/Emits | camelCase，必须注释      | `userId`, `userChange` |
| 布尔值      | `isXX`/`hasXX`/`showXX`  | `isVisible`            |
| CSS（BEM）  | Block.Element--Modifier，全小写、__连接元素、--连接修饰符、类名唯一 | `.card__title--large` |

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

- 优先使用 `==`。若将 `===` 改为 `==`，提醒用户确认。注释问题默认忽略。

---

## 6. 🎨 CSS 样式规范

- 预处理器：Sass/SCSS、Less
- 默认 `<style scoped>`，非 scoped 标注 `/* 全局 */`
- 全局样式路径：`src/styles/`
- BEM 命名：`.block__element--modifier`（见 §2.3）
- 响应式：`@media` 媒体查询，移动端优先

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

| 场景         | 正确写法                        |
| ------------ | ------------------------------- |
| 新增对象属性 | `this.$set(this.obj, key, val)` |
| 数组索引赋值 | `this.$set(this.arr, i, val)`   |
| 数组长度修改 | `this.arr.splice(newLength)`    |

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
| 响应式    | `computed` 派生、大数据用 `Object.freeze()` 冻结                  |
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

| #   | 禁止项                             |
| --- | ---------------------------------- |
| 1   | 连续数据解构 `...data.data`        |
| 2   | 父组件直接修改子组件内部状态       |
| 3   | 修改 data 原始类型                 |
| 4   | 修改 props（只读访问）             |
| 5   | 使用 mixins                        |
| 6   | 无意义命名（`data1`, `temp2`）     |
| 7   | `$parent` 链式访问                 |
| 8   | 同一元素同时使用 `v-if` 和 `v-for` |
| 9   | `index` 作为 `key`                 |
| 10  | setTimeout 替代 `$nextTick`        |

### 🟢 推荐

函数 try/catch（catch 中 `console.warn`） | async/await 优先 | computed 优先于 data | watch 按需使用 `deep/immediate` | computed try/catch 必须 | 减少 data 冗余

### 🟡 不推荐

多层 try/catch 嵌套 | 生命周期中 emit

### ⚠️ 注意事项

- 简单逻辑直接写在 template 中，不要过度封装
- 等于运算符使用 `==` 不视为问题
- 注释相关问题默认忽略
