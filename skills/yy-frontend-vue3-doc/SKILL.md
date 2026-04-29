---
name: yy-frontend-vue3-doc
description: >
  为 Vue 3 单文件组件（.vue）自动生成规范注释。
  解析 <template>、<script setup>、<style> 三大区块，按约定格式添加结构化注释，不修改任何代码逻辑。
  触发场景：用户要求添加注释、为 Vue3 组件补充文档注释、解读 <script setup> 组件结构。
---

# yy-frontend-vue3-doc

为 Vue 3 `<script setup>` 单文件组件自动生成规范注释。

## 何时使用

- 用户提供了 `.vue` 文件内容，要求添加注释
- 用户要求为组件补充文档注释
- Code Review 场景需要解读组件结构

## 何时不触发

- 用户要求生成新组件
- 用户要求修改组件逻辑或业务功能
- 用户要求生成 Git 提交信息

## 核心约束

1. **只添加注释，绝不修改代码**
2. **保持原有缩进和格式**
3. **使用中文描述（代码标识符除外）**
4. **不添加空注释**：无关键内容的区块不强制注释
5. **仅适用 Vue 3 `<script setup>`**，不使用 Options API 注释风格

## 工作流

### 步骤一：解析结构

1. 识别 `<template>` 区块，解析节点层级和指令
2. 识别 `<script setup>` 区块，按顺序解析：imports -> defineProps -> defineEmits -> defineOptions -> 组合式函数 -> ref/reactive -> computed -> watch/watchEffect -> 方法 -> 生命周期钩子 -> provide/inject -> defineExpose
3. 识别 `<style>` 区块（含 scoped / lang 属性），解析选择器层级

### 步骤二：识别关键节点

**模板区**：根节点、v-for 循环、v-if/v-else-if/v-else 条件、v-show、插槽、动态组件、功能区块

**脚本区**：defineProps 属性、defineEmits 事件、ref/reactive 响应式数据、computed 计算属性、watch 监听器、方法函数、生命周期钩子、组合式函数、provide/inject、defineExpose

**样式区**：顶级选择器（模块）、子级选择器（子模块）、媒体查询、v-bind() CSS 变量绑定

### 步骤三：生成注释

按以下规则在对应位置添加注释：

**通用原则**：

- 模板区和样式区注释不超过一行
- TSDoc/JSDoc 不超过 5 行
- TypeScript 项目中类型可省略
- 组合式函数需标注职责和返回值

**模板注释格式**：

- 根节点：`<!-- 组件名 -->`
- 循环：`<!-- 循环: 描述 -->`
- 条件：`<!-- 条件: 描述 -->`
- 区块：`<!-- 区块: 名称 -->`
- 插槽：`<!-- 插槽: name -->`
- 动态组件：`<!-- 动态组件: 描述 -->`

**脚本注释格式**：

- 导入：`// import: 说明`
- Props：`// prop名: 描述`（defineProps 内部逐行）
- Emits：`// emit名: 描述`（defineEmits 内部逐行）
- ref/reactive：`// 变量名: 描述`
- computed：`// computed: 描述`（关键用 TSDoc）
- watch：`// watch: 描述`（关键用 TSDoc）
- 方法：`// 方法名: 描述`（关键用 TSDoc）
- 生命周期：`// lifecycle: 钩子名`
- provide：`// provide: 键名 - 描述`
- inject：`// inject: 键名 - 描述`
- defineExpose：`// expose: 名称 - 描述`
- 组合式函数：`// hooks: useXxx - 描述`

**样式注释格式**：

- 模块：`/* 模块名称 */`
- 子模块：`/* 模块 > 子模块 */`
- 响应式：`/* 响应式 */`
- CSS 变量绑定：`/* CSS变量绑定: 变量名 */`
- 非 scoped：`/* 全局 */`

### 步骤四：输出

直接输出完整的带注释代码，使用 ` ```vue ` 代码块包裹，不添加额外解释。

## 参考文件

执行前先读取以下参考文件获取详细约定：

- `references/comments.md` — 完整注释格式（模板 8 种、脚本 12 种、样式 6 种）+ 代码示例
- `references/component.md` — 关键节点识别清单、脚本结构顺序、属性顺序
- `references/css-style.md` — 样式注释详细约定（模块/子模块/响应式/v-bind/作用域）
- `references/naming.md` — 各场景注释命名规范（Props/Emits/ref/computed/watch/方法/组合式函数）
