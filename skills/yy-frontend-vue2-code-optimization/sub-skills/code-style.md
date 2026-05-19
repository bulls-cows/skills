# T03 🧹 代码风格与格式清洗（🟡 中风险）

**定位**：🟡 中风险。涉及代码格式化和结构整理。适用于 `.vue`、`.js`、`.css`、`.scss`、`.less` 文件。

## 相关规则

执行本任务前，请先阅读以下规则文件（位于 `rules/` 目录），按优先级从高到低排列：

- **`rules/spec-index.md`**：Vue2 前端项目开发规范总纲（必读）
- **`rules/order.md`**：SFC 块顺序、Import 分组排序、脚本内部声明顺序、模板属性顺序
- **`rules/code-style.md`**：Prettier 配置、ESLint 集成、函数写法偏好
- **`rules/naming.md`**：文件与标识符命名规范
- **`rules/directives.md`**：指令简写、模板属性顺序

## ⚠️ 风险说明（执行前必须展示给用户）

| 风险项            | 影响范围     | 说明                                                                              |
| ----------------- | ------------ | --------------------------------------------------------------------------------- |
| **Git Diff 膨胀** | 全文件       | 格式化会改变缩进、引号、分号等，导致 git diff 行数大幅增加，增加 Code Review 难度 |
| **合并冲突**      | 多人协作分支 | 大规模格式化可能导致与他人的分支产生合并冲突                                      |
| **格式不一致**    | 团队协作     | 如果项目未统一 Prettier 配置，格式化可能与团队现有风格产生差异                    |

> **建议**：在执行格式化前，确保当前分支是干净的，且没有待合并的代码。

## 格式化执行步骤

### 第一步：调用 Prettier 格式化

优先使用项目自有的 Prettier 配置进行格式化。执行步骤如下：

1. **尝试执行 Prettier 命令**：

   ```bash
   npx prettier --write <target-file>
   ```

2. **处理执行结果**：
   - **成功**：Prettier 按项目自有配置完成格式化，继续第二步。
   - **失败**（命令不存在或未安装）：参考技能目录下 `assets/.prettierrc.json` 的配置规则，手动对文件代码进行格式化。

   `assets/.prettierrc.json` 配置说明（仅作为 fallback 参考）：
   - **缩进**：2 空格（`tabWidth: 2`）
   - **引号**：JS 单 `'`（`singleQuote: true`），Vue 模板属性双 `"`（`vueHtmlAttributes: "double"`）
   - **标点**：强制分号（`semi: true`），尾随逗号（`trailingComma: "all"`），箭头函数单参数无括号（`arrowParens: "avoid"`）
   - **行宽**：单行最大字符数 **120**（`printWidth: 120`）
   - **其他**：对象花括号保持空格（`bracketSpacing: true`），不强制属性独占一行（`singleAttributePerLine: false`）

> **注意**：该文件是给 AI 看的配置参考，不是直接执行的配置文件。优先信任项目自身的 Prettier 配置。

### 第二步：手动结构调整

Prettier 无法处理代码结构排序和运算符调整。格式化后，需手动执行以下**结构与顺序整理**规则：

## 结构与顺序整理

### SFC 块顺序

Vue2 单文件组件内部块顺序必须保持一致：

1. `<template>` → 2. `<script>` → 3. `<style scoped>`

### Options API 内部结构顺序

`<script>` 内部选项必须按以下宏观顺序排列：

| 步骤 | 内容         | 说明                                                  |
| ---- | ------------ | ----------------------------------------------------- |
| 1    | `name`       | 组件名称声明                                          |
| 2    | `components` | 局部组件注册                                          |
| 3    | `props`      | 父组件传入属性定义                                    |
| 4    | `data()`     | 组件内部状态                                          |
| 5    | `computed`   | 计算属性                                              |
| 6    | `watch`      | 侦听器                                                |
| 7    | `methods`    | 方法集合                                              |
| 8    | 生命周期钩子 | `created`, `mounted`, `beforeDestroy`, `destroyed` 等 |

### 导入顺序

`import` 分为 **3 组**，**组间空一行，组内按字母顺序排列**：

1. 外部依赖（vue、dayjs、lodash 等）
2. 全局内部依赖（`@src/...`）
3. 相对内部依赖（`./...`、`../...`）

```javascript
// 1. node_modules
import Vue from 'vue'
import dayjs from 'dayjs'
import { debounce } from 'lodash'

// 2. 内部全局依赖（@src/）
import { apiGetUserInfo } from '@src/api/user'
import store from '@src/store'
import { APP_CONFIG } from '@src/constants'
import DataTable from '@src/components/DataTable'

// 3. 内部相对依赖（./）
import { localHelper } from './utils/helper'
import { MAX_RETRY_COUNT } from './constants'
import SearchBar from './SearchBar.vue'
```

### 模板属性顺序

HTML 元素上的属性顺序应保持统一：

1. 定义（`is`）
2. `v-for`
3. `v-if` / `v-else-if` / `v-else`
4. `v-show` / `v-cloak`
5. `id`
6. `props/attrs`
7. `v-on`（`@`）
8. `v-html` / `v-text`

```vue
<template
  v-for="item in items"
  :key="item.id"
  v-if="item.visible"
  id="list-item"
  :class="item.class"
  @click="handleClick(item)"
>
  {{ item.name }}
</template>
```

### 指令简写

统一使用指令简写形式：

| 完整写法      | 简写     | 示例                   |
| ------------- | -------- | ---------------------- |
| `v-bind:attr` | `:attr`  | `:src="'avatar'"`      |
| `v-on:event`  | `@event` | `@click="handleClick"` |
| `v-slot:name` | `#name`  | `#default="slotProps"` |

```vue
<!-- ✅ 正确：简写 -->
<img :src="'avatar'" @click="handleClick" #default="slotProps" />

<!-- ❌ 错误：完整写法 -->
<img v-bind:src="'avatar'" v-on:click="handleClick" v-slot:default="slotProps" />
```

## 函数写法偏好

**优先使用 `const 函数名 = () => {}` 箭头函数写法，避免使用 `function` 声明。**

| 原写法                       | 推荐写法                        |
| ---------------------------- | ------------------------------- |
| `function fetchData() {}`    | `const fetchData = () => {}`    |
| `function handleClick(e) {}` | `const handleClick = (e) => {}` |

> 注意：Options API 的 methods 中仍使用传统方法定义，箭头函数偏好主要应用于独立函数声明。
