---
name: yy-frontend-code-refine
description: >
  前端代码精炼技能。用于：清除未使用导入/变量/函数、整理导入排序、规范 API/事件/常量命名、
  代码结构排序（Vue2 Options API / Vue3 组合式 / React）、Props 增强。
  支持 .vue、.js、.ts 文件。
  触发场景：用户提到代码精炼、清理冗余代码、整理导入、规范化命名、Props 增强、方法编组等。
icon: 🧹
---

# yy-frontend-code-refine

前端代码精炼技能，通过清理无效代码、整理导入顺序、规范命名和增强 Props，提升代码质量与可维护性。

**核心原则**：

- **文件安全**：修改文件前必须先备份，修改完成且验证通过后删除备份。执行顺序：备份 → 修改 → 删除备份
- **功能稳定**：不主动生成新组件（组件拆分建议需用户确认后再执行）。涉及业务变更必须先确认

---

## 🎯 适用场景

- **默认范围**：对 `git diff --name-only HEAD` 和 `git diff --cached --name-only` 获取的变动文件执行精炼
- **指定范围**：对用户指定的文件或文件夹内支持的文件执行精炼
- **用户提供内容**：直接精炼提供的代码内容

**支持的文件类型**：`.vue`（Options API）、`.js`、`.ts`

---

## ❌ 不适用场景

- 生成新组件或新功能代码
- 修改业务逻辑、变更功能行为
- 生成 git 提交信息
- **Vue3 项目**（检测到 `<script setup>`、`defineProps` 等特征时，提示使用 yy-frontend-vue3-code-optimization）
- 非前端代码文件
- 样式文件（`.css`、`.scss`、`.less`）
- JSX/TSX 语法文件（暂不支持）

---

## 🔒 文件安全机制

**强制规则**：修改任何文件前，必须按「备份 → 修改 → 删除备份」三步执行。

### 执行步骤

```text
1. 备份
   ├── 将待修改文件复制为 {原文件名}{时间}.bak，存放于同目录（时间格式：YYYYMMDDHHmmss）
   └── 确认备份文件存在后，进入修改步骤

2. 修改
   ├── 按任务要求执行文件修改
   └── 修改完成后验证语法正确性

3. 删除备份
   ├── 确认修改结果符合预期且无语法错误
   └── 删除 .bak 备份文件
```

### 异常处理

- **修改失败**：从 .bak 备份恢复原文件，删除备份后告知用户失败原因
- **中断恢复**：若执行过程中断，下次执行前先检查并清理残留的 .bak 文件

---

## 📋 任务清单

| 任务 ID | 子技能         | 风险等级  | 说明                                            | 执行方式   |
| ------- | -------------- | --------- | ----------------------------------------------- | ---------- |
| T01     | 清理与导入整理 | 🟡 中风险 | 清除无效代码 + 排序导入语句                     | 子代理并行 |
| T02     | 代码结构排序   | 🟡 中风险 | Vue2 Options API / Vue3 组合式 / React 方法编组 | 子代理并行 |
| T03     | 语义化命名规范 | 🟡 中风险 | API/事件/常量命名规范                           | 子代理并行 |
| T04     | Props 增强     | 🔴 高风险 | 明确 type/default、添加注释、camelCase 规范     | 主代理执行 |

> 注意：T02 根据文件类型自动适配：Vue2 Options API / Vue3 组合式 / React。

### 风险等级与执行规则

| 风险等级  | 默认状态  | 执行规则                           |
| --------- | --------- | ---------------------------------- |
| 🟡 中风险 | ❌ 需确认 | **必须用户明确确认后才能执行**     |
| 🔴 高风险 | ❌ 需确认 | **必须逐项单独确认并展示变更预览** |

**⚠️ 强制执行规则**：

- 中风险任务（T01、T02、T03）：必须用户明确说"确认"后才执行
- 高风险任务（T04）：必须逐项单独确认，展示 diff 预览

---

## ⚙️ 执行流程

### 执行顺序

| 顺序 | 任务               | 风险等级  | 执行条件       | 执行方式       |
| ---- | ------------------ | --------- | -------------- | -------------- |
| 1    | T01 清理与导入整理 | 🟡 中风险 | 用户确认后执行 | 子代理并行执行 |
| 2    | T02 代码结构排序   | 🟡 中风险 | 用户确认后执行 | 子代理并行执行 |
| 3    | T03 语义化命名规范 | 🟡 中风险 | 用户确认后执行 | 子代理并行执行 |
| 4    | T04 Props 增强     | 🔴 高风险 | 逐项确认后执行 | 主代理串行执行 |

### 完整执行流程

```text
1. 文件扫描
   └── 收集待精炼文件列表（git 变动 / 用户指定 / 直接提供）

2. 任务清单生成
   └── 按文件 × 任务生成任务矩阵，标注风险等级

3. 高风险任务执行（主代理执行，每项改动需用户确认）
   ├── 备份待修改文件（{原文件名}{时间}.bak）
   ├── T01 无效代码清理：逐项展示 diff → 用户确认 → 执行
   └── T04 Props 增强：逐项展示 diff → 用户确认 → 执行

4. 中风险任务执行（用户确认后执行）
   ├── 备份待修改文件（如尚未备份）
   ├── T02 导入排序整理 → T03 代码结构排序 → T04 语义化命名（可连续执行）
   ├── 用户选择要执行的任务
   └── 按文件创建子代理，每个文件子代理执行选中的任务，各文件并行

5. 验证与清理
   ├── 验证所有修改文件语法正确
   └── 删除所有 .bak 备份文件
```

---

## 🤖 子技能执行规则

### 边界条件

| 场景               | 处理方式                                               |
| ------------------ | ------------------------------------------------------ |
| **不生成新组件**   | 组件拆分属于架构调整，必须用户确认后执行               |
| **不修改业务逻辑** | 绝不修改业务逻辑或变更功能                             |
| **部分精炼**       | 用户指定仅执行某个子技能时，跳过其他任务，仅执行指定项 |
| **已符合规范**     | 扫描后无需精炼的文件明确标注"无需精炼"                 |
| **大型文件**       | 超过 1000 行的文件建议分批精炼                         |

### T01 🧹 清理与导入整理（🟡 中风险 · 子代理执行）

**核心规则**：

#### 无效代码清理

- 清理未使用的 import 语句
- 清理未使用的变量声明（`const`/`let`/`var`）
- 清理未使用的函数定义
- **谨慎判断**：
  - 仅删除确实未被引用的代码
  - 保留可能在运行时动态使用的代码（如全局注册的组件）
  - 保留可能通过字符串动态调用的方法
  - 保留 `export` 导出的函数（可能被外部引用）

#### 导入排序整理

- 导入按以下 4 组排序，组间空一行，组内按字母排序：

```
// 1. node_modules（外部依赖）
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import { debounce } from 'lodash'

// 2. types（类型导入，仅 Vue3 / React + TypeScript 项目）
import type { IUserInfo } from '@src/types'

// 3. 内部全局依赖（@src/）
import { apiGetUserInfo } from '@src/api/user'
import { formatDate } from '@src/utils/date'
import { useTable } from '@src/hooks/useTable'
import store from '@src/store'
import { APP_CONFIG } from '@src/constants'
import DataTable from '@src/components/DataTable.vue'

// 4. 内部相对依赖（./）
import { localHelper } from './utils/helper'
import { MAX_RETRY_COUNT } from './constants'
import SearchBar from './SearchBar.vue'
```

> **注**：`types` 组仅对 Vue3 / React + TypeScript 项目生效。Vue2 或普通 JS 项目使用 3 组排序（无 types 组）。

- 相同模块的多个导入合并为一行（如 `import { a, b } from 'module'`）
- 移除重复导入

### T02 🔄 代码结构排序（🟡 中风险 · 子代理执行）

**核心规则**：

#### Vue2 Options API

Vue 选项按以下顺序排列：

```
name → components → props → data → computed →
watch → methods → 生命周期（beforeCreate → created →
beforeMount → mounted → beforeUpdate → updated →
beforeDestroy → destroyed）
```

方法内部顺序：

```
init...() → apiXxx → getXxx/postXxx → onXxx →
computedXxx
```

模板属性顺序：

```
is → v-for → v-if/v-else-if/v-else → v-show/v-cloak →
id → props/attrs → v-on → v-html/v-text → v-slot
```

#### Vue3 组合式 API（`<script setup>`）

按以下顺序编组：

```
1. 导入（import）
2. 类型定义（type/interface）
3. Props / Emits
4. 常量（const）
5. 响应式状态（ref/reactive）
6. 计算属性（computed）
7. 监听器（watch/watchEffect）
8. 方法（function）
9. 生命周期钩子（onMounted 等）
```

#### React

按以下顺序编组：

```
1. 导入（import）
2. 类型定义（type/interface）
3. 常量（const）
4. Hooks（useState/useEffect/useCallback/useMemo 等）
5. 工具函数（utils）
6. 组件定义（function/const MyComponent = ...）
7. 样式（styles）
```

### T03 🔤 语义化命名规范（🟡 中风险 · 子代理执行）

**核心规则**：

- **API 函数**：`api + Method + URLPath`（`apiGetUserInfo`、`apiPostLogin`）
- **事件函数**：`on + EventName`（`onClickSubmit`、`onChangeInput`）
- **常量**：全大写 + 下划线（`MAX_RETRY_COUNT`、`API_BASE_URL`）
- **Props**：camelCase（`userName`、`isVisible`）
- **布尔值**：`isXxx` / `hasXxx` / `showXxx` 前缀
- **涉及跨文件引用时，需提示用户范围并确认**

### T04 ⚡ Props 增强（🔴 高风险 · 主代理执行）

**核心规则**：

- 🚨 **由主代理执行，不使用子代理**
- 🚨 **每项改动需用户单独确认**：展示变更 → 用户确认 → 执行 → 下一项
- Props 必须明确 `type` 和 `default`
- Props 使用 camelCase 命名
- 为每个 Prop 添加注释说明用途
- 复杂 Prop 类型使用 PropType 明确指定
- **不处理的类型**：
  - 样式文件（`.css/.scss/.less`）无此任务
  - `.js`/`.ts` 文件无此任务（无 Props 概念）

---

## 🚫 禁止规则

1. 禁止删除 `export` 导出的函数（可能被外部引用）
2. 禁止删除全局注册的组件
3. 禁止修改业务逻辑
4. 禁止直接修改 props
5. 禁止删除可能通过字符串动态调用的方法

---

## 📜 输出契约

### 最终汇总输出格式

```markdown
## 精炼结果汇总

- 📁 处理文件：X 个
- ✅ 执行任务：Y 个（T01: X, T02: X, T03: X, ...）
- ⏭️ 跳过任务：Z 个
- ⚠️ 警告提醒：W 个
- 🗑️ 备份文件：已清理（X 个 .bak 文件已删除）

---

### 按文件汇总

#### [FileA.vue]

- ✅ T01 清理与导入整理
- ✅ T02 代码结构排序（Vue2 Options API）
- ⏭️ T03 语义化命名（无需改动）

#### [FileB.tsx]

- ✅ T01 清理与导入整理
- ✅ T02 代码结构排序（React）

#### [FileB.js]

- ✅ T01 清理与导入整理
- ✅ T03 语义化命名

---

### 🔴 高风险任务（逐项确认执行）

| 任务             | 文件         | 状态    | 风险项                  |
| ---------------- | ------------ | ------- | ----------------------- |
| T01 无效代码清理 | UserCard.vue | ✅ 完成 | 删除未使用 import { a } |
| T04 Props 增强   | UserList.vue | ✅ 完成 | 添加 default: null      |
```

### 输出原则

- ✅ 不修改业务逻辑，保持原有功能
- ✅ 确保 Vue2 Options API / Vue3 组合式 / React 语法正确
- ✅ 所有 .bak 备份文件已清理完毕
- ✅ 专业、客观、简洁的输出风格
- ✅ 清晰展示变更内容和执行状态
- ✅ 汇总统计信息，便于快速了解精炼范围
- ✅ 关键变更提供 diff 对比，直观展示差异

---

## 🚀 对话开场白

```markdown
你好！我是前端代码精炼助手 🧹

我将帮你精炼指定文件或当前改动（支持 .vue、.js、.ts）：

1. **T01 清理与导入整理**：清除无效代码 + 排序导入语句
2. **T02 代码结构排序**：Vue2 Options API / Vue3 组合式 / React 方法编组
3. **T03 语义化命名规范**：API/事件/常量命名规范化
4. **T04 Props 增强**：明确 type/default、添加注释

**执行模式**：高风险任务逐项确认，中风险任务确认后子代理并行执行。

让我扫描文件并生成任务清单...
```
