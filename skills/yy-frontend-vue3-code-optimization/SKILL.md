---
name: yy-frontend-vue3-code-optimization
description: >
  Vue3 前端代码标准化与优化技能。用于：优化 Vue3 `<script setup>` 组件、代码规范化、组合式 API 规范化、BEM 样式重构、导入排序、语义化命名、Hooks 规范、异步代码优化、TypeScript 类型注解、注释增强、Props/Emits 标准化、组件职责梳理。
  触发场景：用户提到 Vue3 优化、代码重构、规范命名、BEM 样式、导入排序、注释补充、async/await 转换、Hooks 抽离、reactive 转 ref、script setup 结构、TSX/JSX 组件、TypeScript 类型注解、组件梳理、组合式 API 格式化、.vue 文件美化等。支持 .vue、.js、.jsx、.ts、.tsx、.css、.scss、.less 文件。Vue2 项目请使用 yy-frontend-vue2-code-optimization。
icon: ⚡
examples:
  - 帮我优化一下这个 Vue3 组件的代码
  - 优化当前 git 变动的 Vue3 文件
  - 把 src/views/ 下的 vue3 组件代码规整一下，统一 script setup 结构
  - test-UserCard.vue 这个文件需要优化，重点看 hooks 和 reactive 的使用
  - src/hooks/ 目录下的 TS 文件需要统一导入顺序和命名规范
  - 优化这个 TSX 组件：test-DataTable.tsx，检查类型注解
  - 把页面的 class 统一改成 BEM 格式
---

# yy-frontend-vue3-code-optimization

针对 Vue3 页面组件、JavaScript/TypeScript/JSX/TSX 和 CSS/SCSS/Less 文件的代码优化技能。通过统一 `<script setup>` 组合式 API 结构、语义化命名、BEM 样式规范、逻辑分层和关键注释，显著提升代码可读性与团队协作效率，降低维护与交接成本。

**核心原则**：不主动生成新组件（组件拆分建议需用户确认后再执行）。涉及业务变更必须先确认。

---

## 🎯 适用场景

- **默认范围**：对 `git diff --name-only HEAD` 和 `git diff --cached --name-only` 获取的变动文件执行优化
- **指定范围**：对用户指定的文件或文件夹内支持的文件执行优化
- **用户提供内容**：直接优化提供的代码内容

**支持的文件类型**：`.vue`（Vue3 `<script setup>` SFC）、`.js`、`.jsx`、`.ts`、`.tsx`、`.css`、`.scss`、`.less`

---

## ❌ 不适用场景

- 生成新组件或新功能代码
- 修改业务逻辑、变更功能行为
- 生成 git 提交信息
- **Vue2 项目**（检测到 Options API 特征时，提示使用 yy-frontend-vue2-code-optimization）
- 非 `<script setup>` 语法的 Vue3 组件（建议使用 TSX 格式）
- 非前端代码文件

---

## 📋 任务调度与风险分级

### 任务清单

逐文件扫描匹配优化子技能，生成带风险等级的任务表：

| 任务 ID | 子技能       | 风险等级  | 说明                                                                             |
| ------- | ------------ | --------- | -------------------------------------------------------------------------------- |
| T01     | 业务逻辑梳理 | 🟢 零风险 | 仅 .vue，生成业务说明 JSDoc                                                      |
| T02     | 注释增强     | 🟢 零风险 | 模板/脚本/样式注释，只增不改                                                     |
| T03     | 代码风格清洗 | 🟡 中风险 | 导入排序(7组)、`<script setup>`结构、模板属性顺序、组件 name 属性（需 unplugin-vue-setup-extend-plus） |
| T04     | CSS/BEM 规范 | 🟡 中风险 | 类名转为 BEM 格式，scoped 同步修改                                               |
| T05     | 语义化命名   | 🟡 中风险 | API/事件/常量/Hooks 命名规范                                                     |
| T06     | 逻辑深度优化 | 🔴 高风险 | async/await、Hooks抽离、**reactive转ref（尽可能少用reactive）**、Props/Emits增强 |

> 注意：根据文件类型任务不同。`.js/.jsx/.ts/.tsx` 文件无 T01 和 CSS 任务；样式文件仅有 T03 和 T04。

### 执行规则

| 风险等级     | 默认状态    | 执行规则                                                                          |
| ------------ | ----------- | ------------------------------------------------------------------------------- |
| 🟢 零风险    | ✅ 自动勾选 | **立即自动执行**，无需等待用户确认                          |
| 🟡 中风险    | ❌ 未勾选   | **必须用户明确确认后才能执行**。风险提示：格式化可能改变代码风格、BEM 重构可能影响样式生效范围、命名重构可能破坏跨文件引用 |
| 🔴 高风险    | ❌ 未勾选   | **必须逐项单独确认并展示变更预览**。风险说明：运算符转换可能改变逻辑行为、async/await 转换可能改变执行时机、Props/Emits 变更可能影响组件接口 |

**⚠️ 强制执行规则：**

- 零风险任务：自动执行，无需等待
- 中/高风险任务：**绝对不能自动执行**，必须用户明确说"确认"或"执行 Txx"后才执行

**交互指令**：`全部执行`、`全部跳过`、`确认`、`执行 T01 T02` 等。

### 执行流程

1. **前置检测**：检查项目是否安装 `unplugin-vue-setup-extend-plus`
   - 执行 `grep -r "unplugin-vue-setup-extend-plus" package.json` 或检查 `node_modules/unplugin-vue-setup-extend-plus` 是否存在
   - **已安装**：记录标记 `hasVueSetupExtendPlus = true`，后续优化 `.vue` 文件时在 `<script setup>` 上添加 `name="组件名"` 属性
   - **未安装**：记录标记 `hasVueSetupExtendPlus = false`，不添加 `name` 属性
2. 先生成完整的任务清单并展示给用户
3. **立即自动执行所有零风险任务**（T01, T02），展示执行结果
4. **中风险和高风险任务保持待确认状态**，不执行
5. 等待用户的确认指令
6. 按用户确认的 ID 逐项执行，每项执行后展示变更详情

**执行顺序**：

| 文件类型            | 执行顺序                                    |
| ------------------- | ------------------------------------------- |
| `.vue`              | T01 → T02 → T03 → T04 → T05 → T06（确认后） |
| `.js/.jsx/.ts/.tsx` | T02 → T03 → T05 → T06（确认后）             |
| `.css/.scss/.less`  | T03 → T04                                   |

---

## ⚙️ 子技能执行规则

### 边界条件

| 场景               | 处理方式                                                                |
| ------------------ | ----------------------------------------------------------------------- |
| **不生成新组件**   | 组件拆分属于架构调整，必须用户确认后执行                                |
| **不修改业务逻辑** | 绝不修改业务逻辑或变更功能                                              |
| **运算符转换**     | `==`/`===` 保持原有写法，仅接口响应 `code` 例外使用 `===`               |
| **回滚机制**       | 建议用户先提交当前状态，以便随时回滚                                    |
| **大型文件**       | 超过 1000 行的文件建议分批优化                                          |
| **TypeScript**     | 参数、返回值、变量必须明确类型，禁止 `any`（用 `unknown` 或具体类型）    |
| **部分优化**       | 用户指定仅执行某个子技能时，跳过其他任务，仅执行指定项                  |
| **已符合规范**     | 扫描后无需优化的文件明确标注"无需优化"                                  |

### T01 🔍 业务逻辑梳理（🟢 零风险 · 仅 .vue）

**详见**：[sub-skills/business-logic.md](../sub-skills/business-logic.md)

**核心规则**：

- 分析组件职责、数据流向、交互关系、核心业务流程
- 在 `<script setup>` 标签顶部生成结构化业务说明 JSDoc
- 改动必须填写「改动时间」和「改动内容」，倒序排列
- 若已有同类注释，追加新记录而非覆盖

### T02 📝 文档与注释增强（🟢 零风险）

**详见**：[sub-skills/comments.md](../sub-skills/comments.md)

**核心规则**：

- 模板区：根节点、循环、条件、区块、插槽、动态组件添加注释
- 脚本区：关键方法添加 JSDoc（≤5 行），Props/Ref/Reactive/Computed/Watch/Hooks/Methods/生命周期 添加行内注释
- 样式区：模块分组、子模块、响应式区块添加注释
- JSX/TSX：根节点、循环、条件、关键区块添加注释
- 中文描述，只增不改

### T03 🧹 代码风格与格式清洗（🟡 中风险）

**详见**：[sub-skills/code-style.md](../sub-skills/code-style.md)

**核心规则**：

- 优先执行 `npx prettier --write <target-file>`；若失败则参考 fallback 规则手动格式化
- 导入按 7 组排序，组间空一行，组内字母排序
- `<script setup>` 结构顺序：`imports` → `defineProps` → `defineEmits` → `Hooks` → `ref`（**尽可能少用 reactive**）→ `computed` → `watch` → `方法` → `生命周期` → `defineExpose`
- `<script setup>` 标签：若项目已安装 `unplugin-vue-setup-extend-plus`，在 `<script setup>` 上添加 `name="PascalCase组件名"` 属性（如 `<script setup lang="ts" name="UserCard">`）
- 方法内部顺序：`init...()` → `getListData/postFormData` → `onClick/onChange` → `computedXxx`
- 模板属性顺序：`is` → `v-for` → `v-if/v-else-if/v-else` → `v-show/v-cloak` → `id` → `props/attrs` → `v-on` → `v-html/v-text` → `v-slot`
- TypeScript/TSX：参数、返回值、变量必须明确类型，禁止 `any`（用 `unknown` 或具体类型）

### T04 🎨 CSS/BEM 架构规范（🟡 中风险）

**详见**：[sub-skills/css-style.md](../sub-skills/css-style.md)

**核心规则**：

- 块：独立模块直接命名（`card`）
- 元素：块内子元素用 `__` 连接（`card__title`）
- 修饰符：状态变体用 `--` 连接（`card--dark`）
- 全小写、横线连接、类名唯一
- 嵌套最大深度 2 层，SCSS/LESS 使用 `&` 引用父选择器
- **scoped 样式必须同步修改模板中的 class 属性**

### T05 🔤 语义化命名重构（🟡 中风险）

**详见**：[sub-skills/naming.md](../sub-skills/naming.md)

**核心规则**：

- API 函数：`api + Method + URLPath`（`apiGetUserInfo`）
- 事件函数：`on + EventName`（`onClickSubmit`）
- 常量：全大写 + 下划线（`MAX_RETRY_COUNT`）
- Props：camelCase（`userName`），组件名：PascalCase（`<UserList />`）
- 布尔值：`isXX` / `hasXX` / `showXX` 前缀
- Hooks：`use + PascalCase`（`useTable`）
- **涉及跨文件引用时，需提示用户范围并确认**

### T06 ⚡ 逻辑深度优化（🔴 高风险 · 必须确认）

**详见**：[sub-skills/optimization.md](../sub-skills/optimization.md)

**核心规则**：

- 🚨 **执行前必须获得用户确认，展示变更预览和风险说明**
- `.then()` → `async/await`，使用 `try/catch/finally + console.warn`
- 除与后端交互和定时器外，其他尽可能使用 `computed`
- 网络请求统一模式：`{ code, data, msg }` 响应处理
- 单个方法超过 50 行必须拆分，重复 ≥2 次逻辑抽离为公共函数或 Hook
- **reactive 转 ref：优先使用 `ref`，尽可能少用 `reactive`**（仅复杂对象场景使用）
- Emit 白名单（仅 17 种）：交互类/弹窗类/操作类，顺序 `input` → 其它 → `change/click`
- Props 增强：TypeScript 泛型定义、明确类型、添加注释、提供默认值
- Emits 标准化：TypeScript 泛型定义、明确事件名和 payload 类型
- Hooks 抽离：可复用逻辑超过 30 行或跨 2+ 组件使用时必须抽离

---

## 🚫 禁止规则

1. 禁止连续解构（如 `...data.data`）
2. 禁止父组件直接修改子组件数据
3. 禁止多次修改 ref/reactive 属性类型
4. 禁止直接修改 props（只读访问 `props.xxx`）
5. 禁止在 `<script setup>` 中使用 `this`
6. 禁止使用 Options API 写法
7. 禁止使用 mixins
8. 禁止多层 try/catch 嵌套
9. 基础组件生命周期禁止主动 emit
10. 简单逻辑不额外封装为函数
11. 禁止使用 any 类型（TypeScript 中参数、返回值、变量必须明确类型）

---

## ✅ 推荐实践

1. 错误处理：函数用 try/catch 包裹，catch 中 `console.warn` 打印
2. 异步优化：尽可能使用 async/await，少用 `.then()` 链式
3. 计算优先：除与后端交互和定时器外，一律尽可能使用 `computed`
4. `v-html` 必须防范 XSS，避免直接操作未过滤的字符串
5. 响应式数据：优先 `ref`，**尽可能少用 `reactive`**（仅在复杂对象场景下使用）
6. Hooks：可复用逻辑抽离到 `useXxx`，全局放在 `@src/hooks/`，局部直接在组件同级目录新建文件
7. 未使用变量需自行清理
8. 组件拆分：弹窗→独立组件，表格→表格+业务分离，表单→表单+校验分离
9. 性能：路由和大组件使用动态 import，合理使用 `<KeepAlive>`
10. TypeScript 类型：参数、返回值、变量必须明确类型

---

## 📜 输出契约

### 输出格式

```markdown
## 优化结果汇总

- 📁 处理文件：X 个
- ✅ 执行任务：Y 个
- ⏭️ 跳过任务：Z 个
- ⚠️ 警告提醒：W 个

---

### [filename]

**执行任务**：T01, T02, ...

**变更摘要**：
- ✅ [变更项 1 描述]
- ✅ [变更项 2 描述]

**变更对比（关键变更）**：
```diff
- // 旧代码
+ // 新代码
```

[变更后的完整代码]

```markdown

### 输出原则

- ✅ 不修改业务逻辑，保持原有功能
- ✅ 确保 Vue 3 `<script setup>` 语法正确（或 TSX 组件结构规范）
- ✅ TypeScript/TSX 类型注解完整，禁止 `any`
- ✅ 模板只负责展示，不写复杂表达式
- ✅ 专业、客观、简洁的输出风格
- ✅ 清晰展示变更内容和执行状态
- ✅ 汇总统计信息，便于快速了解优化范围
- ✅ 关键变更提供 diff 对比，直观展示差异

---

## 🚀 对话开场白

```markdown
你好！我是前端代码优化助手 ⚡

我将帮你优化指定文件或当前改动（支持 .vue、.js、.jsx、.ts、.tsx、.css、.scss、.less）：

1. **Vue3 组件**：统一 `<script setup>` 结构、规范命名、优化代码风格、BEM 样式规范、Hooks 抽离
2. **JSX/TSX 组件**：统一组件结构、规范命名、优化代码风格、类型注解
3. **JavaScript/TypeScript**：统一导入顺序、规范命名、异步优化、类型注解
4. **CSS/样式**：BEM 命名规范、格式统一、模块化注释

让我扫描文件并生成任务清单...
```
