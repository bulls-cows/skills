---
name: yy-create-vue3
description: >
  创建类似 yak/apps/ui 结构的 Vue 3 + TypeScript + Vite 项目。支持目录结构对齐、命名规范对齐、配置规范对齐。
  新建项目时可直接复制 scripts/ 参考项目，修改优化时可供参考。
---

# yy-create-vue3

## 描述

基于 yak/apps/ui 的项目结构规范，创建 Vue 3 + TypeScript + Vite 的前端项目。自动生成完整的目录结构、配置文件、源码骨架，并确保目录层级和命名规范与参考项目一致。

## 使用场景

- 用户需要创建一个新的 Vue 3 前端项目
- 用户希望项目目录结构和命名规范与 yak/apps/ui 对齐
- 用户需要参考 yak/apps/ui 的项目结构来调整现有项目

不应触发：

- 用户只需要创建单个组件或页面
- 用户正在使用 React、Angular 等其他框架
- 用户只是询问 Vue 3 的用法

## 指令

### 步骤 1. 确认项目基本信息

与用户确认以下信息：

1. **项目名称**：英文短横线命名，如 `my-app`
2. **目标目录**：在哪个目录下创建项目
3. **是否需要 Mock 目录**：`public/mock/`（默认否）
4. **是否需要国际化目录**：`src/languages/`（默认否）
5. **是否需要页面示例**：在 `src/views/` 下创建示例页面（默认是）
6. **需要哪些页面**：列出需要创建的页面视图名称（如 `HomeView`, `LoginView`, `ErrorView`）
7. **项目标题**：`index.html` 中的 `<title>` 内容

### 步骤 2. 创建项目目录结构

在目标目录下创建以下目录结构：

```
project-name/
├── scripts/                          # 构建辅助脚本
├── public/
│   └── static/                       # 静态资源（字体、图片等）
├── src/
│   ├── apis/                         # Bridge API / 后端 API 函数
│   ├── components/                   # 通用组件
│   ├── composables/                  # 组合式函数
│   ├── router/                       # 路由定义
│   ├── scripts/                      # 跨页面复用工具
│   ├── stores/                       # 状态管理
│   ├── styles/                       # 全局样式
│   ├── typings/                      # 类型声明
│   └── views/                        # 页面视图
├── tests/                            # 测试文件
└── public/mock/                      # （可选）Mock 数据
```

### 步骤 3. 创建核心配置文件

参考 `templates/` 目录下的模板，生成以下配置文件：

**3.1 package.json**

使用 `npm` 作为包管理工具。核心依赖：

| 类别   | 包名                                  | 用途            |
| ------ | ------------------------------------- | --------------- |
| 运行时 | `vue` ^3.5                            | Vue 框架        |
| 运行时 | `vue-router` ^4.6                     | 路由            |
| 运行时 | `pinia` ^3.0                          | 状态管理        |
| 开发   | `vite` ^7.3                           | 构建工具        |
| 开发   | `@vitejs/plugin-vue` ^6.0             | Vite Vue 插件   |
| 开发   | `typescript` ~5.9                     | TypeScript      |
| 开发   | `vue-tsc` ^3.2                        | Vue TS 检查     |
| 开发   | `sass` ^1.98                          | SCSS 编译       |
| 开发   | `vitest` ^3.2                         | 单元测试        |
| 开发   | `@vue/test-utils` ^2.4                | Vue 测试工具    |
| 开发   | `jsdom` ^29                           | 测试 DOM 环境   |
| 开发   | `eslint` ^9.38                        | 代码检查        |
| 开发   | `@vue/eslint-config-typescript` ^14.7 | Vue TS ESLint   |
| 开发   | `eslint-plugin-vue` ^10.8             | Vue ESLint 插件 |
| 开发   | `prettier` ^3.8                       | 格式化          |
| 开发   | `@tsconfig/node24` ^24.0              | Node TS 配置    |
| 开发   | `@types/node` ^24.12                  | Node 类型       |
| 开发   | `cross-env` ^10.1                     | 跨平台环境变量  |
| 开发   | `dotenv` ^17.4                        | 环境变量加载    |

npm scripts 规范：

```json
{
  "scripts": {
    "clean": "node ./scripts/clean.ts",
    "dev:test": "cross-env NODE_ENV=development MODE=test vite dev --mode development",
    "dev:production": "cross-env NODE_ENV=development MODE=production vite dev --mode development",
    "build:test": "node --run lint && cross-env NODE_ENV=production MODE=test vite build --mode production",
    "build:production": "node --run lint && cross-env NODE_ENV=production MODE=production vite build --mode production",
    "preview": "vite preview",
    "lint": "node --run format && run-s lint:* && node --run type-check && node --run test",
    "type-check": "vue-tsc --build",
    "test": "cross-env NODE_ENV=production MODE=test vitest run --config vitest.config.ts",
    "lint:oxlint": "oxlint . --fix",
    "lint:eslint": "eslint . --fix --cache",
    "lint:lf": "node ./scripts/convert-crlf-to-lf.ts --check",
    "format": "prettier --write --experimental-cli src/ public/mock"
  }
}
```

**3.2 vite.config.ts**

- `base: "./"`
- 使用 `@src` 别名指向 `./src`
- 集成 Vue 插件
- 运行时定义通过 `vite.shared.ts` 管理

```typescript
// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createRuntimeDefines } from './vite.shared'

export default defineConfig({
  base: './',
  plugins: [vue()],
  define: createRuntimeDefines(),
  resolve: {
    alias: {
      '@src': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
  },
  server: {
    host: '0.0.0.0',
    port: 4173,
  },
})
```

**3.3 vite.shared.ts**

管理运行时编译时常量定义：

```typescript
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

const currentDir = dirname(fileURLToPath(import.meta.url))

const MODE = process.env.MODE as TMode
const NODE_ENV = process.env.NODE_ENV as TNodeEnv

dotenv.config({
  path: [
    resolve(currentDir, `.env.${MODE}.local`),
    resolve(currentDir, `.env.${MODE}`),
    resolve(currentDir, `.env.local`),
    resolve(currentDir, `.env`),
  ].filter((path) => existsSync(path)),
})

export function createRuntimeDefines() {
  return {
    __APP_VERSION__: JSON.stringify('0.1.0'),
    __NODE_ENV__: JSON.stringify(NODE_ENV),
    __MODE__: JSON.stringify(MODE),
    __ENABLE_REPORT__: JSON.stringify('0'),
    __MOCK__: JSON.stringify('0'),
    __NEED_AUTH__: JSON.stringify('1'),
    __LOG_LEVEL__: JSON.stringify('INFO'),
  }
}
```

**3.4 tsconfig 系列**

- `tsconfig.json`：项目引用入口，引用 app/node/test 配置
- `tsconfig.app.json`：继承 `@vue/tsconfig/tsconfig.dom.json`，包含 `src/**/*`，配置 `@src` 路径别名
- `tsconfig.node.json`：继承 `@tsconfig/node24`，包含 vite/eslint/scripts 配置
- `tsconfig.test.json`：继承 `@vue/tsconfig/tsconfig.dom.json`，包含 `tests/**/*`

**3.5 代码检查配置**

- `eslint.config.ts`：使用扁平化配置，集成 `eslint-plugin-vue`、`@vue/eslint-config-typescript`、`eslint-plugin-oxlint`
- `.prettierrc.json`：semi: true, singleQuote: false, trailingComma: "all"
- `.editorconfig`：indent_size=2, indent_style=space, charset=utf-8, end_of_line=lf

**3.6 环境变量文件**

创建 `.env` 文件：

```
ENABLE_REPORT=1
MOCK=0
NEED_AUTH=1
LOG_LEVEL=INFO
```

**3.7 .gitignore**

```
node_modules/
dist/
.eslintcache
.env.local
.agents/
.idea/
```

### 步骤 4. 创建 src/ 源码骨架

**4.1 index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>项目标题</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

**4.2 src/main.ts**

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import './styles/main.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#root')
```

**4.3 src/App.vue**

创建根组件，包含：

- `RouterView` 渲染路由页面
- 页面布局插槽（sidebar + main 结构）

```vue
<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100%;
  min-height: 100%;
}
</style>
```

**4.4 src/router/index.ts**

```typescript
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routeConfigList: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  // 根据用户确认的页面列表生成路由配置
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routeConfigList,
})
```

**4.5 src/stores/store.ts**

按功能模块分组，使用 `ref` 管理全局状态：

```typescript
import { ref } from 'vue'

/**
 * 全局状态
 */
export const globalLoading = ref<boolean>(false)

/**
 * 页面切换状态
 */
export const isPageMounting = ref<boolean>(false)
```

**4.6 src/styles/**

创建以下样式文件：

- `_variables.scss`：CSS 自定义属性（颜色、字体、间距、圆角、阴影）
- `_mixins.scss`：SCSS 混入（panel、text-label、section-title）
- `main.scss`：全局样式（reset、字体定义、滚动条样式）

**4.7 src/typings/**

创建类型声明文件：

- `env.d.ts`：Vite 环境变量类型声明
- `route.d.ts`：路由元信息类型扩展
- `api.d.ts`：API 参数类型
- `bridge.d.ts`：Bridge 通信类型
- `component.d.ts`：组件局部类型

**4.8 src/apis/**

创建 API 调用函数和订阅函数：

- `api.ts`：导出具体的 API 函数，每个函数使用 `doRequest` 封装
- `subscribe.ts`：导出订阅函数，每个函数使用 `subscribe` 封装

### 步骤 5. 创建页面视图

根据步骤 1 中用户确认的页面列表，在 `src/views/` 下创建页面目录：

每个页面视图使用"同名目录 + 同名文件"的组织方式：

```
src/views/HomeView/
├── HomeView.vue
└── _components/              # 页面专属子组件（可选）
```

**页面组件规范**：

- 文件名：PascalCase（如 `HomeView.vue`）
- 目录名：与组件文件同名（如 `HomeView/`）
- 页面专属子组件放在 `_components/` 目录下
- 子组件命名：PascalCase（如 `DialogBindCurrentDevice.vue`）

### 步骤 6. 创建测试骨架

在 `tests/` 目录下创建测试文件：

```typescript
// tests/App.spec.ts
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('creates app successfully', () => {
    expect(true).toBe(true)
  })
})
```

### 步骤 7. 安装依赖并验证

1. 在项目根目录执行 `npm install`
2. 执行 `npm run type-check` 验证 TypeScript 配置
3. 执行 `npm run test` 验证测试框架
4. 执行 `npm run dev:test` 验证开发服务器启动

### 步骤 8. 输出结果

输出以下内容：

1. **项目结构**：使用 tree 格式展示创建的项目目录结构
2. **配置文件清单**：列出所有创建的配置文件及其用途
3. **验证结果**：lint、type-check、test 的执行结果
4. **注意事项**：
   - 包管理工具为 `npm`，非 pnpm
   - 路径别名为 `@src`，非 `@`
   - 如需添加页面，需同时更新路由配置

## 相关资源

本技能包含以下辅助资源：

- `templates/package-json.md`：package.json 配置模板
- `templates/vite-config.md`：Vite 配置模板
- `templates/tsconfig-templates.md`：TypeScript 配置模板
- `templates/eslint-prettier.md`：ESLint + Prettier + Editorconfig 模板
- `scripts/`：完整的可参考项目（可复制使用，也作为优化参考）

## 命名规范参考

| 目录/文件类型       | 命名风格                | 示例                            |
| ------------------- | ----------------------- | ------------------------------- |
| 组件目录 & 文件     | PascalCase              | `CustomButton/CustomButton.vue` |
| 页面视图目录 & 文件 | PascalCase              | `HomeView/HomeView.vue`         |
| 页面子组件          | PascalCase              | `DialogBindCurrentDevice.vue`   |
| Composables         | camelCase (use前缀)     | `useAccount.ts`                 |
| API 函数            | camelCase               | `loginWithPassword`             |
| 工具脚本            | camelCase               | `logUtils.ts`                   |
| Store               | camelCase               | `store.ts`                      |
| 类型声明文件        | camelCase (`*.d.ts`)    | `api.d.ts`                      |
| 语言文件            | camelCase               | `languageEnUS.ts`               |
| SCSS 部分文件       | `_` 前缀 + camelCase    | `_variables.scss`               |
| 路由文件            | camelCase               | `index.ts`                      |
| 测试文件            | camelCase (`*.spec.ts`) | `App.spec.ts`                   |
| 构建脚本            | camelCase               | `clean.ts`                      |
