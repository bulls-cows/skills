# 框架识别规则

> 步骤 2 加载本文件，判定原始文件夹使用的前端框架。

## 识别优先级

按以下顺序判定，命中即停。一份代码可能命中多个框架特征（如 Vue3 项目里也有 `.ts` 文件），以**主导文件类型**为准。

| 优先级 | 框架         | 关键特征                                                                                                                  |
| ------ | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| 1      | Vue3         | `.vue` 文件中含 `<script setup>` 或 Composition API（`ref(` / `reactive(` / `defineProps` / `defineEmits` / `onMounted`） |
| 2      | Vue2         | `.vue` 文件中含 Options API（`export default {` + `data()` / `methods` / `computed` / `watch` 之一）                      |
| 3      | React        | `.jsx` / `.tsx` 文件，或导入 `from 'react'` / `from 'react-dom'`                                                          |
| 4      | JS/TS 纯脚本 | 仅有 `.js` / `.ts` 文件，无上述框架特征                                                                                   |

## 识别步骤

### 1. 扫描文件类型

```bash
# 列出原始文件夹下所有相关文件（按扩展名筛选）
find <source> -type f \( -name "*.vue" -o -name "*.jsx" -o -name "*.tsx" -o -name "*.js" -o -name "*.ts" \) -not -path "*/node_modules/*"
```

统计各类文件数量，得出主导文件类型。

### 2. 抽样验证

从主导类型文件中抽取 **3 个**样本（优先取入口附近的文件、组件目录下的文件），按上表特征验证。

- 3 个样本全部命中同一框架 → 识别成功。
- 2/3 命中 → 视为该框架，但在 PLAN.md 中标注「识别置信度中等，存在 X 个非典型文件」。
- 命中分散（如 1 个 Vue3 + 2 个 Vue2） → 触发「混合框架」处理。

### 3. 辅助信号（可选）

当抽样验证不确定时，参考以下辅助信号：

| 信号来源                    | Vue3                          | Vue2                                | React                              |
| --------------------------- | ----------------------------- | ----------------------------------- | ---------------------------------- |
| `package.json` dependencies | `vue: ^3.x`                   | `vue: ^2.x`                         | `react: ^18.x` / `next: ^13.x`     |
| 入口文件                    | `createApp(`                  | `new Vue(`                          | `createRoot(` / `ReactDOM.render(` |
| 路由库                      | `vue-router@4`                | `vue-router@3`                      | `react-router-dom@6`               |
| 状态管理                    | `pinia` / `vuex@5`            | `vuex@3`                            | `@reduxjs/toolkit` / `zustand`     |
| 构建工具                    | `vite` + `@vitejs/plugin-vue` | `vue-cli` / `vue-template-compiler` | `vite` + `@vitejs/plugin-react`    |

## 失败兜底

### 混合框架（如 Vue2 + Vue3 共存）

用 `question` 工具询问用户，**列出所有识别到的候选**：

```text
检测到原始文件夹混合了多种框架特征：
- Vue3 文件：X 个
- Vue2 文件：Y 个

请选择以哪个框架为准生成占位骨架？
- [推荐] Vue3（数量较多）
- Vue2
- 按文件分别识别（每个文件按其自身框架生成骨架）
- 终止
```

### 不在自动支持范围的框架

检测到本 skill 未覆盖的框架特征（如 `.svelte` / `.astro` / `.preact` / Alpine 指令 `x-data` 等），用 `question` 工具询问用户手动指定：

```text
检测到可能的框架特征：<扩展名 / 关键字>
本 skill 的自动骨架模板仅覆盖 Vue2 / Vue3 / React / JS-TS，请选择处理方式：
- [推荐] JS/TS 纯脚本（按通用骨架生成，后续由用户手动调整为对应框架语法）
- Vue3
- Vue2
- React
- 终止
```

### 完全无前端文件特征

原始文件夹**完全没有任何前端文件特征**（既无 `.vue`、`.jsx`、`.tsx`，也无 React 导入，仅有少量 `.js`/`.ts`）：

用 `question` 工具询问用户手动指定：

```text
无法自动识别框架，请手动选择：
- [推荐] JS/TS 纯脚本（按通用 JS/TS 骨架生成）
- Vue3
- Vue2
- React
- 终止
```

### 跨项目场景的代际差异

若原始文件夹与目标文件夹分属不同项目（不同代码库或同一代码库的不同代际），常见代际差异需在 PLAN.md「待确认清单」中显式提醒：

| 源端 → 目标侧           | 典型差异点                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------- |
| Vue2 → Vue3             | Options API → Composition API；Vuex → Pinia；Element UI → Element Plus                |
| Vue3 → Vue2             | 反向兼容性约束（Composition API 在 Vue2 中需 `@vue/composition-api` polyfill）        |
| React 类组件 → 函数组件 | `class Component` → 函数组件 + Hooks；`this.state` → `useState`                       |
| 任意代际跨越            | 别名（`@/` vs `@src/` vs `~`）、构建工具（Vite vs Webpack vs Vue CLI）、UI 库版本差异 |

**处理策略**：

- 框架识别以**原始文件夹**为准（用于分析源代码）。
- 占位骨架按**目标文件夹所在项目的框架**生成（如目标侧是 Vue3 项目则用 Vue3 骨架）；目标侧框架无法判断时默认与源端一致，并在「待确认清单」中提示。
- 在 PLAN.md 元信息中**同时**记录两边的框架识别结果，并在「待确认清单」中显式提醒差异。
