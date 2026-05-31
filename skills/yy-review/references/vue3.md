# Vue3 专项规则

## 项目类型识别

仅当 `package.json` 中 `dependencies` 或 `devDependencies` 的 `vue` 主版本为 `3` 时，才识别为 Vue3 项目。

## Composition API 识别

目标 `.vue` 文件中出现以下特征之一，即视为使用 Composition API：

- `<script setup>`
- `setup()` 函数
- `defineProps`、`defineEmits`
- `ref`、`reactive`、`computed`、`watch` 等 Composition API

## 技能委托规则

同时满足以下三个条件时，将审查任务委托给 `yy-frontend-vue3-review` 技能：

1. 确认为 Vue3 项目
2. 目标 `.vue` 文件使用 Composition API
3. 当前环境已安装 `yy-frontend-vue3-review`

**条件不满足时**：不进行技能委托，继续执行 yy-review 默认审核逻辑。

### 判断顺序

1. 先读取 `package.json`，仅根据 `dependencies` 或 `devDependencies` 中的 `vue` 主版本是否为 `3` 判断是否为 Vue3 项目。
2. 确认为 Vue3 项目后，再检查目标 `.vue` 文件是否使用 Composition API。
3. 只有同时满足 Vue3 项目、使用 Composition API、已安装 `yy-frontend-vue3-review` 三个条件时，才委托专项技能。

## 快速通道（Fast Track）

在委托 `yy-frontend-vue3-review` 之前，先对目标文件执行以下 grep 模式匹配，快速定位可模式化检测的缺陷。

### 模式映射表

| 维度 | 检查项                       | grep 模式                           | 确认方式                                           |
| ---- | ---------------------------- | ----------------------------------- | -------------------------------------------------- |
| D02  | `<style scoped>` 缺少 `lang` | `<style scoped>` 且行内不含 `lang=` | 读取该 style 块确认是否使用 SCSS 语法              |
| D02  | 调试代码残留                 | `console\.(log\|debug)`             | 读取上下文，排除注释和 `catch` 中的 `console.warn` |
| D02  | 模板内联样式                 | `style="`                           | 读取上下文，排除动态绑定和组件 Props               |
| D08  | v-html XSS 风险              | `v-html=`                           | 读取上下文，标记为需人工确认                       |
| D09  | index 作为 v-for key         | `:key="[iI]"`                       | 读取上下文，确认是数组索引而非唯一标识             |
| D09  | v-for 与 v-if 同元素         | `v-for.*v-if` 或 `v-if.*v-for`      | 读取上下文确认在同一元素上                         |
| D09  | any 类型使用                 | `: any\b`                           | 读取上下文，排除注释和字符串                       |
| D09  | script setup 中使用 this     | `\bthis\.`                          | 读取上下文，排除注释                               |

### 执行规则

1. 对每个目标文件依次执行所有 grep 模式
2. 命中后读取命中行及其前后 5 行上下文，按"确认方式"确认是否属实
3. 确认属实的缺陷直接纳入审核结果报告，按原有严重程度分级
4. 所有快速通道发现的缺陷在报告末尾标注 `[FastTrack]` 标记

### 与子代理的关系

快速通道结果直接进入最终审核报告，无需子代理重复检查。

- **去重规则**：按 `文件路径:行号` + `问题类型` 两个维度去重。快速通道发现的缺陷，在子代理结果中如果存在相同文件+行号+类型，以快速通道结果为准，跳过子代理的重复报告。
- **跳过规则**：子代理在 D02/D08/D09 维度中，对于已由快速通道覆盖的文件，优先检查非模式匹配类问题，避免重复劳动。

### 优先级覆盖

`yy-review` 的快速通道规则优先级高于 `yy-frontend-vue3-review` 的子代理调度架构。当两者冲突时，以本文件中的快速通道规则为准。`yy-frontend-vue3-review` 应对已覆盖项做跳过处理，避免重复报告。

## Vue3 专项审核规则

无论是否将审核任务委托给 `yy-frontend-vue3-review` 技能，均应对目标 `.vue` 文件追加检查以下 Vue3 专项审核规则。若本文件中的规则与 `yy-frontend-vue3-review` 技能中的规则冲突，以本文件为准。

### 代码结构顺序

Vue3 单文件组件应统一按以下顺序组织代码结构：

```text
<template>
<script lang="ts" setup>
<style lang="scss" scoped>
```

- `<template>`：模板部分
- `<script lang="ts" setup>`：使用 TypeScript 的 Composition API 逻辑部分
- `<style lang="scss" scoped>`：使用 SCSS 的作用域样式部分

各区块之间应保留一个空行分隔。
