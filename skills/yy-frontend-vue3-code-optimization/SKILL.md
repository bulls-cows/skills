---
name: yy-frontend-vue3-code-optimization
description: >
  **Vue3 前端代码标准化与优化专用技能，只要用户提到以下任何内容，必须立即使用此技能：**
  - 优化、整理、清理 Vue3 组件 / .vue 文件
  - Code Review、代码审查、代码规范化
  - `<script setup>` 组合式 API 规范化
  - BEM 命名规范、样式重构、CSS/SCSS/Less 整理
  - 导入排序、代码格式化、结构调整
  - 语义化命名、变量/函数重命名、Hooks 规范
  - 异步代码优化、Promise 转 async/await
  - TypeScript 类型注解优化
  - 注释增强、JSDoc 添加、代码交接准备
  - Props 增强、Emits 标准化、组合式 API 优化
  - 组件职责梳理、可读性提升、维护性改进

  **核心特性：**
  - 支持 .vue（`<script setup>`）、.js、.jsx、.ts、.tsx、.css、.scss、.less 文件
  - 默认自动优化当前 git 变动文件，也可指定文件/文件夹
  - 严格风险分级：🟢 零风险自动执行，🟡 中风险 / 🔴 高风险必须用户确认后执行
  - **绝不修改业务逻辑**，架构类变更必须先确认后执行
  - Vue2 项目请使用 yy-frontend-vue2-code-optimization 技能
  - TypeScript 类型注解完整，禁止使用 any
  - 兼容 Node.js 环境，无需额外依赖
---

# yy-frontend-vue3-code-optimization

针对 Vue3 页面组件、JavaScript/TypeScript/JSX/TSX 和 CSS/SCSS/Less 文件的代码优化技能。通过统一 `<script setup>` 组合式 API 结构、语义化命名、BEM 样式规范、逻辑分层和关键注释，显著提升代码可读性与团队协作效率，降低维护与交接成本。

**核心原则**：不主动生成新组件（组件拆分建议需用户确认后再执行）。涉及业务变更必须先确认。这样做的目的是保持原有功能不变，同时提供架构优化选项。

## 🎯 适用场景

- **默认范围**：对 `git diff --name-only HEAD` 和 `git diff --cached --name-only` 获取的 `.vue`、`.js`、`.jsx`、`.ts`、`.tsx`、`.css`、`.scss`、`.less` 变动文件执行优化。
- **指定范围**：对用户指定的文件或文件夹内支持的文件执行优化。
- **用户提供内容**：直接优化提供的代码内容。

**支持的文件类型**：`.vue`（Vue3 `<script setup>` SFC）、`.js`、`.jsx`、`.ts`、`.tsx`、`.css`、`.scss`、`.less`

## 📋 任务调度与风险分级

### 任务清单

| 任务 ID | 子技能       | 风险等级  | 说明                                                                             |
| ------- | ------------ | --------- | -------------------------------------------------------------------------------- |
| T01     | 业务逻辑梳理 | 🟢 零风险 | 仅 .vue，生成业务说明 JSDoc                                                      |
| T02     | 代码风格清洗 | 🟡 中风险 | 导入排序(11组)、`<script setup>`结构、模板属性顺序                               |
| T03     | 注释增强     | 🟢 零风险 | 模板/脚本/样式注释，只增不改                                                     |
| T04     | CSS/BEM 规范 | 🟡 中风险 | 类名转为 BEM 格式，scoped 同步修改                                               |
| T05     | 语义化命名   | 🟡 中风险 | API/事件/常量/Hooks 命名规范                                                     |
| T06     | 逻辑深度优化 | 🔴 高风险 | async/await、Hooks抽离、**reactive转ref（尽可能少用reactive）**、Props/Emits增强 |

### 执行规则

- **🟢 零风险**：自动执行，无需等待用户确认
- **🟡 中风险**：必须用户明确确认后才执行
- **🔴 高风险**：必须逐项确认并展示变更预览后才执行

### 执行流程

1. 生成任务清单并展示
2. **立即自动执行零风险任务**（T01, T03）
3. 中高风险任务保持待确认状态
4. 等待用户确认指令后执行

### 各文件类型执行顺序

| 文件类型            | 执行顺序                                    |
| ------------------- | ------------------------------------------- |
| `.vue`              | T01 → T03 → T02 → T04 → T05 → T06（确认后） |
| `.js/.jsx/.ts/.tsx` | T03 → T02 → T05 → T06（确认后）             |
| `.css/.scss/.less`  | T02 → T04                                   |

## ⚙️ 执行逻辑

### 阶段一：获取优化目标

1. 用户指定文件/文件夹 → 递归收集支持的文件类型
2. 用户未指定 → Git 命令获取变动文件，合并去重后过滤
3. 无匹配文件 → 回复 _"当前没有需要优化的改动文件。你可以指定文件或文件夹让我优化。"_

### 阶段二：逐文件优化

#### `.vue` 文件

**模板区**：

- 属性顺序：`is` → `v-for` → `v-if/v-else-if/v-else` → `v-show/v-cloak` → `id` → `props/attrs` → `v-on` → `v-html/v-text` → `v-slot`
- 模板只负责展示，不写复杂表达式；简单逻辑内联，不过度封装为函数
- 添加注释：根节点、循环、条件、区块、插槽、动态组件

**脚本区**（必须 `<script setup>`）：

- 结构顺序：`imports` → `defineProps` → `defineEmits` → `Hooks` → `ref`（**尽可能少用 reactive**）→ `computed` → `watch` → `方法` → `生命周期` → `defineExpose`
- 顶部 JSDoc：组件名称 + 页面职责 + 核心业务 + 数据来源
- Props：`defineProps` + TypeScript 类型注解，camelCase，必须注释
- Emits：`defineEmits` 定义，顺序 `input` → `其它` → `change/click`；基础组件生命周期禁止 emit
- 函数排序：`const initXxx` → `getListData/postFormData` → `onClickXxx/onChangeXxx` → `computedXxx`
- computed：必须 try/catch，命名用 `is`/`has`/`visible`
- 网络请求：`async/await + try/catch/finally` + `{ code, data, msg }` 响应模式

  ```typescript
  try {
    const res = await apiXXX();
    if (res.code === 0) {
      // 处理成功逻辑
    }
  } catch (e) {
    console.warn("请求失败：", e);
  }
  ```

- 单个函数超过 50 行必须拆分，重复逻辑抽离为公共函数或 Hook
- 简单条件判断直接写在 template，不为简单逻辑创建函数
- ref 访问必须 `.value`

**Hooks 规范**：

- 命名：`useXxx`，全局 Hooks 文件存放在 `@src/hooks/`，局部 Hooks 直接在组件同级目录新建文件（如 `./useLocalTable.ts`），无需 `hooks/` 子目录
- 返回值：`toRefs` 解构后返回对象，**禁止直接返回 reactive 对象**
- 可复用逻辑超过 30 行或跨 2+ 组件使用时，必须抽离为 Hook
- 禁止将 Hooks 挂载到响应式数据上
- 导入顺序：全局 Hooks 在相对工具之后、Store 之前；相对 Hooks 在 Hooks 之后
- **尽可能少用 reactive，优先使用 ref**

**样式区**：

- 优先 `scoped`；非 scoped 标注 `/* 全局 */`
- BEM 命名：`block__element--modifier`，全小写、横线连接、无嵌套
- 注释：模块、子模块、响应式

#### `.js` / `.jsx` / `.ts` / `.tsx` 文件

- 导入顺序（11 组）：1. 外部依赖 2. 全局 API 3. 全局工具 4. 相对工具 5. 全局 Hooks 6. 相对 Hooks 7. 全局 Store 8. 全局配置 9. 相对配置 10. 全局组件 11. 相对组件（组间空一行，组内字母排序）
- 网络请求：`async/await + try/catch`
- TypeScript/TSX：参数、返回值、变量必须明确类型，禁止 `any`（用 `unknown` 或具体类型）
- JSX/TSX：组件结构规范、Props 类型定义、事件处理规范
- 接口请求、复杂判断、特殊业务逻辑、兼容处理需添加注释

#### `.css` / `.scss` / `.less` 文件

- BEM 命名：块`__`元素--修饰符
- 2 空格缩进，统一换行
- 注释：模块、子模块、响应式

## 📜 核心规范速查

### 代码风格

- 优先执行 `npx prettier --write <target-file>`
- 2 空格缩进，JS/TS 单引号，HTML 双引号，必须分号，120 字符行宽
- 尾随逗号，箭头函数单参数省略括号，对象括号保持空格
- 等于运算符：绝对不主动变更 `==` 和 `===`，保持代码原有写法。仅接口响应 `code` 字段例外使用 `===`，但必须列入高风险任务并经用户确认后才执行转换
- Prettier：`semi: true, singleQuote: true, trailingComma: "all", arrowParens: "avoid", bracketSpacing: true`

### 命名规范

| 类型     | 规范                        | 示例              |
| -------- | --------------------------- | ----------------- |
| API 函数 | `api + Method + URLPath`    | `apiGetUserInfo`  |
| 事件函数 | `on + EventName`            | `onClickSubmit`   |
| 常量     | 全大写 + 下划线             | `MAX_RETRY_COUNT` |
| 组件名   | PascalCase                  | `<UserList />`    |
| Props    | camelCase                   | `userName`        |
| Hooks    | `use + PascalCase`          | `useTable`        |
| 布尔值   | `isXX` / `hasXX` / `showXX` | `isLoading`       |

_跨文件引用重命名需提示用户确认_

### Emit 事件白名单

- 交互类：`change, click, select, expand, input, clear, remove, add`
- 弹窗类：`open, close, show, hide`
- 操作类：`cancel, confirm, ok, editSuccess, error`

### JSDoc 格式（关键方法必填）

```typescript
/**
 * 方法名称
 * @description 方法的简要描述
 * @param {类型} 参数名 - 参数描述
 * @returns {类型} 返回值描述
 */
```

### Hook 拆分建议

| 场景                   | Hook 名           |
| ---------------------- | ----------------- |
| 表格数据 + 分页 + 加载 | `useTable`        |
| 搜索表单 + 重置 + 查询 | `useSearchForm`   |
| 表单校验逻辑           | `useFormValidate` |
| 弹窗开关 + 状态        | `useDialog`       |
| 文件上传逻辑           | `useUpload`       |
| 权限判断               | `usePermission`   |

### 网络请求统一模式

```typescript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  // 处理成功逻辑
} else {
  // 处理失败逻辑
}
```

## 🛡️ 绝对禁止

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

## 🟢 推荐实践

1. 函数用 try/catch 包裹，catch 中 `console.warn` 打印
2. 尽可能使用 async/await，少用 `.then()` 链式
3. 除后端交互和定时器外，一律尽可能使用 `computed`
4. `v-html` 必须防范 XSS
5. 响应式数据：优先 `ref`，**尽可能少用 `reactive`**（仅在复杂对象场景下使用）
6. Hooks：可复用逻辑抽离到 `useXxx`，全局放在 `@src/hooks/`，局部直接在组件同级目录新建文件
7. 未使用变量需自行清理
8. 组件拆分：弹窗→独立组件，表格→表格+业务分离，表单→表单+校验分离
9. 性能：路由和大组件使用动态 import，合理使用 `<KeepAlive>`
10. TypeScript 类型：参数、返回值、变量必须明确类型

## 📚 子技能执行规则

以下子技能按任务 ID 执行，严格按其中详细规则操作。

### 边界条件

| 场景               | 处理方式                                                                |
| ------------------ | ----------------------------------------------------------------------- |
| **不生成新组件**   | 组件拆分属于架构调整，必须用户确认后执行                                |
| **不修改业务逻辑** | 组件拆分属于架构调整，必须确认后执行                                    |
| **运算符转换**     | `==`/`===` 属于🔴高风险，保持原有写法，仅接口响应 `code` 例外使用 `===` |
| **回滚机制**       | 建议用户先提交当前状态，以便随时回滚                                    |
| **大型文件**       | 超过 1000 行的文件建议分批优化，避免单次变更过大                        |

### 子技能引用

- [T01 业务逻辑梳理](./sub-skills/business-logic.md)
- [T02 代码风格](./sub-skills/code-style.md)
- [T03 注释增强](./sub-skills/comments.md)
- [T04 CSS/BEM 规范](./sub-skills/css-style.md)
- [T05 命名规范](./sub-skills/naming.md)
- [T06 逻辑深度优化](./sub-skills/optimization.md)

## 不适用场景

- 生成新组件或新功能代码
- 修改业务逻辑、变更功能行为
- 生成 git 提交信息
- **Vue2 项目**（检测到 Options API 特征时，提示使用 yy-frontend-vue2-code-optimization）
- 非 `<script setup>` 语法的 Vue3 组件（建议使用 TSX 格式）
- 非前端代码文件

## 前置检查流程

1. **Git 状态检查**：检查是否有未提交的变更，建议用户先 commit
2. **文件类型过滤**：仅处理 `.vue`、`.js`、`.jsx`、`.ts`、`.tsx`、`.css`、`.scss`、`.less` 文件
3. **Vue 版本检测**：检测是否为 Vue2 项目，是则提示使用对应技能
4. **文件大小检查**：标记超过 1000 行的文件为大型文件

## 输出契约

### 输出格式

```markdown
## 优化结果汇总

- 📁 处理文件：X 个
- ✅ 执行任务：Y 个
- ⏭️  跳过任务：Z 个
- ⚠️  警告提醒：W 个

---

### [filename]

**执行任务**：T01, T03, ...

**变更摘要**：
- ✅ [变更项 1 描述]
- ✅ [变更项 2 描述]

**变更对比（关键变更）**：
```diff
- // 旧代码
+ // 新代码
```

[变更后的完整代码]

### 输出原则

- ✅ 不修改业务逻辑，保持原有功能
- ✅ 确保 Vue 3 `<script setup>` 语法正确（或 TSX 组件结构规范）
- ✅ TypeScript/TSX 类型注解完整，禁止 `any`
- ✅ 模板只负责展示，不写复杂表达式
- ✅ 专业、客观、简洁的输出风格
- ✅ 清晰展示变更内容和执行状态
- ✅ 汇总统计信息，便于快速了解优化范围
- ✅ 关键变更提供 diff 对比，直观展示差异

## 对话开场白

你好！我是前端代码优化助手 ⚡

我将帮你优化指定文件或当前改动（支持 .vue、.js、.jsx、.ts、.tsx、.css、.scss、.less）：

1. **Vue3 组件**：统一 `<script setup>` 结构、规范命名、优化代码风格、BEM 样式规范、Hooks 抽离
2. **JSX/TSX 组件**：统一组件结构、规范命名、优化代码风格、类型注解
3. **JavaScript/TypeScript**：统一导入顺序、规范命名、异步优化、类型注解
4. **CSS/样式**：BEM 命名规范、格式统一、模块化注释

让我扫描文件并生成任务清单...
