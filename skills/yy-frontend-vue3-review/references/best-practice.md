# 最佳实践与安全规范

对应审核维度 D07（🔴 严重）、D08（🟢 轻微）、D09（🔴 严重），用于安全漏洞、最佳实践和绝对禁止项审核。

## 安全漏洞（D07 · 🔴 严重）

### XSS 风险

- `v-html` 必须防范 XSS 风险

### 敏感信息

- 检查敏感信息泄露和硬编码敏感信息（如密钥、Token、密码）

## 最佳实践（D08 · 🟢 轻微）

### 调试代码

- 清理 `console.log`/`debugger` 等调试代码
- **例外**：catch 块中的 `console.warn` 不视为问题

### 样式规范

- BEM 命名 + `scoped` 作用域
- 非 scoped 需标注 `/* 全局 */`

### 未使用变量

- 需自行清理（ESLint 已关闭检查）

### 函数 try/catch

- 推荐包裹 computed、methods 等
- catch 中使用 `console.warn` 打印错误

### Hooks 规范

- 可复用逻辑超过 30 行或跨 2+ 组件时，必须抽离为 Hook
- 全局 Hooks 存放在 `@src/hooks/`，局部 Hooks 直接在组件同级目录新建（如 `./useLocalTable.ts`）
- Hooks **必须返回对象**（推荐 `toRefs` 解构后返回），**禁止直接返回 reactive 对象**
- 禁止将 Hooks 挂载到响应式数据上
- 命名：`useXxx`

### 组件拆分

- 弹窗拆分为独立组件
- 表格/表单组件与业务逻辑分离
- 属于架构调整，须用户确认后执行

### defineExpose

- 明确声明对外暴露的属性和方法

### 组件懒加载

- 路由和大组件使用 `defineAsyncComponent` 动态导入

### KeepAlive

- 合理使用 `<KeepAlive>` 页面缓存

### Hooks 速查表

| 场景 | 建议 Hook 名 |
| ---- | ------- |
| 表格数据 + 分页 + 加载 | `useTable` |
| 搜索表单 + 重置 + 查询 | `useSearchForm` |
| 表单校验逻辑 | `useFormValidate` |
| 弹窗开关 + 状态 | `useDialog` |
| 文件上传逻辑 | `useUpload` |
| 权限判断 | `usePermission` |

### CSS/BEM 命名

- **块**：独立模块，直接命名（如 `card`、`form`）
- **元素**：块内部子元素，用 `__` 连接（如 `card__title`、`form__input`）
- **修饰符**：状态/样式变体，用 `--` 连接（如 `card--dark`、`card__title--large`）
- **命名规则**：全小写、横线连接、无嵌套、类名唯一不冲突

## 绝对禁止项（D09 · 🔴 严重）

| 禁止项 | 说明 |
|------|------|
| 连续解构 | 禁止 `...data.data` 等连续解构 |
| 修改子组件数据 | 禁止父组件直接修改子组件数据 |
| 修改 ref/reactive 类型 | 禁止多次修改 ref/reactive 属性类型（后端给什么值用什么值） |
| 直接修改 props | 禁止直接修改 props（使用 `props.xxx` 只读访问） |
| 使用 this | 禁止在 `<script setup>` 中使用 `this` |
| Options API | 禁止使用 Options API 写法（`data()`/`methods: {}`/`mounted() {}` 等） |
| mixins | 禁止使用 mixins |
| 多层 try/catch | 禁止多个 try/catch 嵌套 |
| 无意义命名 | 禁止 `data1`、`temp2` 等无意义命名 |
