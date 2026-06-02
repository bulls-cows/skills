# Vue3 Scaffold

`vue3-scaffold` 是一个用于快速启动 Vue3 应用开发的模板项目，内置 Vite、TypeScript、Vue Router、Pinia、Axios、Vitest、ESLint、Oxlint 和 Prettier 等常用工程能力。

该模板用于减少新项目初始化成本，提供统一的目录结构、运行脚本、环境变量、Mock 请求和基础工具函数，让业务开发可以直接从标准化工程骨架开始。

## 特性

- ⭐ 基于 Vue3、Vite 和 TypeScript 的现代前端开发栈。
- 🚀 内置 `test` 与 `production` 两套运行/构建模式。
- 💡 集成 Vue Router、Pinia 和 Axios，覆盖路由、状态和请求基础能力。
- 🎯 提供 Mock 数据加载、请求封装、存储、时间、字符串、对象等常用工具函数。
- ⚡ 集成 Vitest、ESLint、Oxlint、Prettier、类型检查和换行符检查。

## 技术栈

- 🖥️ 前端框架：Vue 3、Vue Router、Pinia
- 🧰 构建工具：Vite、TypeScript、Sass
- 🧪 测试工具：Vitest、Vue Test Utils、jsdom
- 🧹 代码质量：ESLint、Oxlint、Prettier、vue-tsc
- 🌐 请求能力：Axios

## 环境要求

📦 Node.js 版本要求：

```bash
node >= 22.18.0
```

项目提供 `.nvmrc`，建议使用 nvm 或兼容工具切换 Node.js 版本。

## 安装

在模板项目目录下安装依赖：

```bash
npm install
```

也可以使用项目内置脚本：

```bash
npm run ready
```

## 本地开发

启动测试模式开发服务：

```bash
npm run dev:test
```

启动生产模式开发服务：

```bash
npm run dev:production
```

开发服务默认监听：

```text
http://localhost:4173
```

## 构建

构建测试模式产物：

```bash
npm run build:test
```

构建生产模式产物：

```bash
npm run build:production
```

本地预览构建产物：

```bash
npm run preview
```

## 代码检查

执行完整检查：

```bash
npm run lint
```

该命令会依次执行：

- `npm run format`：格式化 `src/` 与 `public/mock`。
- `npm run lint:oxlint`：执行 Oxlint 自动修复。
- `npm run lint:eslint`：执行 ESLint 自动修复。
- `npm run lint:lf`：检查换行符。
- `npm run type-check`：执行 Vue TypeScript 类型检查。
- `npm run test`：运行 Vitest 测试。

单独运行测试：

```bash
npm run test
```

## 环境变量

默认环境变量位于 `.env`：

| 变量            | 默认值 | 说明                     |
| --------------- | ------ | ------------------------ |
| `ENABLE_REPORT` | `1`    | 是否启用上报相关能力。   |
| `MOCK`          | `0`    | 是否启用本地 Mock 请求。 |
| `NEED_AUTH`     | `1`    | 是否需要鉴权。           |
| `LOG_LEVEL`     | `INFO` | 日志级别。               |

配置加载顺序由 `vite.shared.ts` 维护，会按当前 `MODE` 优先读取：

1. `.env.{MODE}.local`
2. `.env.{MODE}`
3. `.env.local`
4. `.env`

## 目录结构

```text
.
├── public/              # 静态资源与 Mock 数据
│   ├── mock/            # 本地 Mock 数据
│   └── static/          # 静态文件
├── scripts/             # 工程脚本
│   ├── clean.ts         # 清理脚本
│   └── convert-crlf-to-lf.ts
├── src/
│   ├── apis/            # 接口定义
│   ├── components/      # 通用组件
│   ├── composables/     # 组合式逻辑
│   ├── router/          # 路由配置
│   ├── scripts/         # 通用工具函数
│   ├── stores/          # Pinia 状态管理
│   ├── styles/          # 全局样式
│   ├── typings/         # 全局类型声明
│   ├── ugly/            # 外部对接或赶进度时的临时代码隔离区
│   ├── views/           # 页面视图
│   ├── App.vue          # 根组件
│   └── main.ts          # 应用入口
├── tests/               # 单元测试
├── vite.config.ts       # Vite 配置
├── vite.shared.ts       # Vite/Vitest 共享运行时定义
└── vitest.config.ts     # Vitest 配置
```

## 开发约定

- 路径别名：使用 `@src` 指向 `src/`。
- 路由模式：使用 `createWebHashHistory()`。
- 请求封装：统一通过 `src/scripts/requestUtils.ts` 的 `doRequest` 返回 `[error, data]` 结构。
- Mock 规则：开启 `MOCK=1` 后，请求路径会转换为 Mock topic，例如 `/api/example/todo` 对应 `example.todo`。
- 临时代码：外部对接或赶进度产生的临时代码放入 `src/ugly/`，避免污染稳定业务目录。
- 样式：组件样式使用 `scss`，示例页面采用 BEM 风格类名。

## 清理产物

执行清理脚本：

```bash
npm run clean
```

## 协议

📄 当前模板项目随上层仓库发布，协议以仓库根目录 `LICENSE.txt` 为准。
