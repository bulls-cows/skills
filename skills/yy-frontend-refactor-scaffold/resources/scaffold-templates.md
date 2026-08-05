# 占位骨架模板

> 步骤 7 加载本文件，**按当前目标侧框架**读对应章节，生成占位文件骨架。

## 头部注释统一格式

所有占位文件**必须**在文件顶部添加头部注释，指向原始文件 + TODO 标记：

```
/**
 * TODO: 待实现
 * 重构自：<原始文件相对路径>
 * 推测职责：<1 句话职责描述>
 * 生成时间：<YYYY-MM-DD HH:mm:ss>
 */
```

样式文件（无 JSDoc 注释语法的）用对应语法的注释：

```scss
/* TODO: 待实现
 * 重构自：<原始文件相对路径>
 * 推测职责：<1 句话职责描述>
 * 生成时间：<YYYY-MM-DD HH:mm:ss> */
```

**字段填写规则**：

- **重构自**：相对原始文件夹根的相对路径（如 `src/views/user/index.vue`）。
- **推测职责**：来自 PLAN.md 文件映射表，1 句话。
- **生成时间**：执行 `date "+%Y-%m-%d %H:%M:%S"` 获取真实本地时间，禁止 AI 推算。

## Vue3 `.vue` 骨架

```vue
<!--
 * TODO: 待实现
 * 重构自：<原始文件相对路径>
 * 推测职责：<1 句话职责描述>
 * 生成时间：<YYYY-MM-DD HH:mm:ss>
 -->
<template>
  <div class="<根类名>"></div>
</template>

<script setup lang="ts">
// TODO: 待实现
</script>

<style lang="scss" scoped>
.<根类名> {
}
</style>
```

**根类名命名**：使用 BEM 风格的 block 名，取自文件名转 kebab-case。

- `UserCard.vue` → `user-card`
- `index.vue` → 取所在目录名（如 `views/user/index.vue` → `user-page`）

## Vue2 `.vue` 骨架

```vue
<!--
 * TODO: 待实现
 * 重构自：<原始文件相对路径>
 * 推测职责：<1 句话职责描述>
 * 生成时间：<YYYY-MM-DD HH:mm:ss>
 -->
<template>
  <div class="<根类名>"></div>
</template>

<script>
export default {
  name: '<组件名>',
  // TODO: 待实现
}
</script>

<style lang="scss" scoped>
.<根类名> {
}
</style>
```

**组件名命名**：PascalCase，取自文件名。

- `UserCard.vue` → `name: 'UserCard'`
- `index.vue` → 取所在目录名转 PascalCase（如 `views/user/index.vue` → `name: 'UserPage'`）

> Vue2 组件 `name` 选项是必须的——`keep-alive` 缓存、`devtools` 调试、递归组件都依赖它。

## React `.tsx` 骨架

```tsx
/**
 * TODO: 待实现
 * 重构自：<原始文件相对路径>
 * 推测职责：<1 句话职责描述>
 * 生成时间：<YYYY-MM-DD HH:mm:ss>
 */
import { FC } from 'react'

import './<文件名>.css' // 或 .scss / .module.css

interface <组件名>Props {
  // TODO: 待实现
}

const <组件名>: FC<<组件名>Props> = (props) => {
  return (
    <div className="<根类名>"></div>
  )
}

export default <组件名>
```

**组件名命名**：PascalCase，取自文件名。

**样式文件**：若原始组件存在配套样式文件（`.css` / `.scss` / `.module.css`），在骨架中保留 import 语句；否则省略。

## React `.jsx` 骨架

```jsx
/**
 * TODO: 待实现
 * 重构自：<原始文件相对路径>
 * 推测职责：<1 句话职责描述>
 * 生成时间：<YYYY-MM-DD HH:mm:ss>
 */
import './<文件名>.css'

const <组件名> = (props) => {
  return (
    <div className="<根类名>"></div>
  )
}

export default <组件名>
```

## `.js` / `.ts` 脚本骨架

```ts
/**
 * TODO: 待实现
 * 重构自：<原始文件相对路径>
 * 推测职责：<1 句话职责描述>
 * 生成时间：<YYYY-MM-DD HH:mm:ss>
 */

// TODO: 待实现
```

> 不预留 `export` / `import` 语句，让用户根据实际需要添加。

## 样式文件骨架

### `.scss` / `.css` / `.less`

```scss
/* TODO: 待实现
 * 重构自：<原始文件相对路径>
 * 推测职责：<1 句话职责描述>
 * 生成时间：<YYYY-MM-DD HH:mm:ss> */

/* TODO: 待实现 */
```

## 入口文件骨架（main.js / App.vue 等）

入口文件占位**仅生成头部注释 + 空文件体**，不预填任何 `createApp` / `ReactDOM.render` 等代码：

```ts
/**
 * TODO: 待实现
 * 重构自：<原始文件相对路径>
 * 推测职责：应用入口
 * 生成时间：<YYYY-MM-DD HH:mm:ss>
 */

// TODO: 待实现
```

> 入口文件的具体实现取决于目标项目的构建工具与框架版本（Vite vs Vue CLI、Vue3 vs Vue2），预填代码极易出错，统一交由用户实现。

## 生成策略

### 文件命名规则

| 场景 | 规则 |
| --- | --- |
| 默认 | 与原始文件同名（含大小写） |
| 跨代际扩展名升级（`.js` → `.ts`） | 按 PLAN.md 文件映射表的「重构路径」列 |
| 用户在确认环节要求改名 | 按用户指示 |

### 目录创建

```bash
# 自动创建所需目录（mkdir -p 语义）
mkdir -p <target>/src/views/user-center/components
```

### 已存在文件处理

默认**跳过并警告**：

```
⚠️ 已存在：<target>/src/router/index.js
```

用 `question` 工具询问用户「跳过 / 覆盖 / 终止」。

### 生成顺序

1. 按 PLAN.md 文件映射表**自顶向下**生成（先建目录，再建文件）。
2. 每生成一个文件打印 `✅ <相对路径>`。
3. 失败时打印 `❌ <相对路径> - <失败原因>`，**继续后续文件**，不中断。
4. 全部完成后统计成功 / 跳过 / 失败数，交回主流程输出汇总（步骤 8）。
