# Vue3 前端项目开发规范

> 本规则整合自 `rules/frontend-rules-vue3` 与 `skills/yy-frontend-vue3-code-optimization` 中的规范部分，按优先级重新组织。

---

## 一、基础规范（Essential / 必要的）

> 这类规则必须遵守，主要目的是规避错误和潜在的 Bug。

### 1.1 组件与脚本语法

| 规则                          | 说明                                                                    |
| ----------------------------- | ----------------------------------------------------------------------- |
| **必须使用 `<script setup>`** | 禁止使用 Options API 写法（`data()`, `methods: {}`, `mounted() {}` 等） |
| **组件名多单词**              | 组件名应使用多个单词（如 `UserProfile.vue`），避免与 HTML 原生元素冲突  |

### 1.2 Props 定义

**详见 `interaction.md`**（涵盖 Props 定义、v-model 写法、使用限制）。

### 1.3 v-for 与 key

**详见 `directives.md`**。

### 1.4 v-if 与 v-for

**详见 `directives.md`**。

### 1.5 数据修改限制

| 禁止项                     | 说明                                                |
| -------------------------- | --------------------------------------------------- |
| 禁止修改 props             | 只读访问 `props.xxx`，禁止直接修改                  |
| 禁止父组件修改子组件数据   | 禁止直接修改子组件内部状态                          |
| 禁止修改 ref/reactive 类型 | 后端给什么类型用什么，不可修改原始类型              |
| 禁止 Options API           | 禁止 `data()`, `methods: {}`, `mounted() {}` 等写法 |

### 1.6 v-html 安全

**详见 `directives.md`**。

---

## 二、强烈推荐（Strongly Recommended / 强烈推荐）

> 这类规则能显著改善代码的可读性和开发体验，应尽可能遵守。

### 2.1 `<script setup>` 结构与代码组织

**详见 `order.md`**（包含 SFC 块顺序、Import 分组排序、脚本内部声明顺序、功能模块化示例）。

### 2.2 模板属性顺序

**详见 `order.md`**。

### 2.3 文件与标识符命名

详见 `naming.md`（涵盖组件命名、目录命名、API/事件/常量/Props/布尔值等规范）；Hooks 详见 `hooks.md`。

### 2.4 状态管理

**详见 `interaction.md`**（涵盖 provide/inject、兄弟组件通信、响应式传递）。

### 2.5 组件交互与通信

**详见 `interaction.md`**（涵盖 Props 定义、v-model 兼容、Emit 事件白名单与顺序、defineEmits、defineExpose、provide/inject 等）。

### 2.6 ref/reactive/computed 原则

**详见 `reactivity.md`**（涵盖 ref/reactive 选择原则、reactive 转 ref 规则、computed 规范）。

### 2.7 computed 规范

**详见 `reactivity.md`**（涵盖 computed 核心原则、正确/错误示例、computed 优先策略）。

### 2.8 watch 规范

**详见 `watch.md`**（涵盖 watch/watchEffect 使用规范、配置选项、清理机制、与 computed 选择策略）。

### 2.9 网络请求规范

**详见 `network.md`**（涵盖异步处理、响应解构、错误处理、防止重复提交）。

### 2.10 Hooks 组合式函数规范

**详见 `hooks.md`**。

---

## 三、风格指南（Recommended / 推荐）

> 当存在多种同样好的实践时，选择一个并保持一致。这有助于团队内部代码风格的统一。

### 3.1 格式化与工具链

**详见 `formatting.md`**（包含 Prettier JSON 配置、ESLint 集成）；指令简写详见 `directives.md`。

### 3.2 Script JSDoc 与注释规范

详见 `comments.md`（涵盖模板区、脚本区注释格式，JSDoc 示例，注释保护原则）。

### 3.3 样式命名与作用域

- `scoped`：仅作用于当前组件（优先使用）
- 非 `scoped`：需标注 `/* 全局 */`
- **scoped 样式必须同步修改模板中的 class 属性**

### 3.4 方法职责

- 方法内部顺序：`init...()` → `getListData/postFormData` → `onClick/onChange` → `computedXxx`
- 单个方法超过 50 行必须拆分
- 重复 ≥2 次逻辑必须抽离为公共函数或 Hook（详见 `hooks.md`）。
- 简单逻辑不额外封装为函数。

### 3.5 Hooks 抽离建议

**详见 `hooks.md`**。

### 3.6 页面拆分建议

| 场景 | 处理方式                |
| ---- | ----------------------- |
| 弹窗 | 拆为独立组件            |
| 表格 | 拆为表格组件 + 业务逻辑 |
| 表单 | 拆为表单组件 + 校验逻辑 |

---

## 四、谨慎使用（Use with Caution / 谨慎使用）

> 这类规则针对一些存在潜在风险的特性，使用时需要格外小心。

### 4.1 v-html

**详见 `directives.md`**。

### 4.2 等于运算符

- **新建代码**：优先推荐使用 `==`
- **修改现有代码**：**禁止**改动等于运算符！若原代码为 `==` 保持 `==`，若为 `===` 保持 `===`，切勿进行任何替换。

### 4.3 多层 try/catch 嵌套

- 异步操作尽量扁平化，避免多层嵌套
- 错误处理：函数用 try/catch 包裹，catch 中使用 `console.warn` 打印

### 4.4 生命周期 emit

- 不推荐在生命周期中主动向外 emit 事件

### 4.5 TypeScript 类型

详见 `typescript.md`（参数/返回值/变量必须明确类型，禁止使用 `any`）。

---

## 五、性能优化

**详见 `performance.md`**（涵盖组件懒加载、KeepAlive、虚拟滚动、防抖节流、图片优化、路由懒加载）。

---

## 六、其他注意事项

- **未使用变量**：需自行清理无用代码
- **注释检查**：注释相关问题默认忽略，不进行检查
- **不要过度封装**：简单逻辑直接写在 template 中
- **defineExpose**：明确声明对外暴露的属性和方法，父组件通过 `ref` 访问
- **全局错误捕获**：配置 `app.config.errorHandler`，配合 Sentry 上报
- **敏感数据**：不在 URL 传 token/密码；不 `console.log` 用户凭证
