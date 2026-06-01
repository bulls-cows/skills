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

按以下顺序依次判断，同时满足三个条件时，将审查任务委托给 `yy-frontend-vue3-review` 技能：

1. 读取 `package.json`，仅根据 `dependencies` 或 `devDependencies` 中的 `vue` 主版本是否为 `3` 判断是否为 Vue3 项目
2. 确认为 Vue3 项目后，再检查目标 `.vue` 文件是否使用 Composition API
3. 当前环境已安装 `yy-frontend-vue3-review`

**条件不满足时**：不进行技能委托，继续执行 yy-review 默认审核逻辑。

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

### 模板表达式简洁性

Vue3 模板中应避免书写多行函数逻辑，模板只保留声明式绑定和简单表达式。

- 事件处理、状态更新、`emit` 调用应提取到 `<script lang="ts" setup>` 中的命名函数。
- 模板事件绑定应直接引用命名函数，如 `@select="selectPage"`。
- 禁止在模板中通过多行表达式混合执行赋值、状态重置和事件派发。

**反例：**

```vue
<PageTabs
  @select="
    currentPageId = $event
    selectedBlockId = null
    emit('select-block', null)
  "
/>
```

**正例：**

```vue
<PageTabs @select="selectPage" />

<script lang="ts" setup>
function selectPage(pageId: string) {
  currentPageId.value = pageId
  selectedBlockId.value = null
  emit('select-block', null)
}
</script>
```
