# Vue3 Scaffold

`vue3-scaffold` 是一个用于快速启动 Vue3 应用开发的模板项目，内置 Vite、TypeScript、Vue Router、Pinia、Axios、Vitest、ESLint、Oxlint 和 Prettier 等常用工程能力。

该模板用于减少新项目初始化成本，提供统一的目录结构、运行脚本、环境变量、Mock 请求、全局反馈和基础工具函数，让业务开发可以直接从标准化工程骨架开始。

## 特性

- ⭐ 基于 Vue3、Vite 和 TypeScript 的现代前端开发栈。
- 🚀 内置 `test` 与 `production` 两套运行/构建模式。
- 💡 集成 Vue Router、Pinia 和 Axios，覆盖路由、状态和请求基础能力。
- 🧩 内置通用应用壳层，包含页头、侧边导航、内容区、页脚和全局反馈。
- 🧱 提供按钮、表格、选择器、结果展示、输入框、卡片、标签和空状态等基础组件。
- 🎯 提供 Mock 数据加载、请求封装、存储、时间、字符串、对象、定时器和加载点动画等常用工具函数。
- 🌐 内置最小 i18n 骨架，提供中英文示例词典、语言状态和 `t()` 翻译函数。
- ⚡ 集成 Vitest、ESLint、Oxlint、Prettier、类型检查和换行符检查。

## 技术栈

- 🖥️ 前端框架：Vue 3、Vue Router、Pinia
- 🧰 构建工具：Vite、TypeScript、Sass
- 🧪 测试工具：Vitest、Vue Test Utils、jsdom
- 🧹 代码质量：ESLint、Oxlint、Prettier、vue-tsc
- 🌐 请求能力：Axios
- 🧱 基础布局：`AppShell`、`MainPageLayout`、`AppHeader`、`AppSidebar`、`AppFooter`、`GlobalLoading`、`GlobalAlert`、`GlobalToast`

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

请先复制 `.env.example` 为 `.env`，再按需修改：

```bash
cp .env.example .env
```

如果在 Windows PowerShell 中执行，可以使用：

```powershell
Copy-Item .env.example .env
```

`.env.example` 中提供了默认环境变量：

| 变量            | 默认值 | 说明                     |
| --------------- | ------ | ------------------------ |
| `ENABLE_REPORT` | `0`    | 是否启用上报相关能力。   |
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
│   ├── i18n/            # 最小国际化词典与翻译函数
│   ├── router/          # 路由配置
│   ├── utils/           # 通用工具函数，包含请求、日志和全局反馈封装
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

## 应用壳层

模板内置一套中性、可复用的页面壳层，适合从轻量管理后台、工具台或桌面壳 WebView 页面继续扩展：

- `src/App.vue`：根据路由 `meta.layout` 选择布局，并挂载全局 Loading、Alert 和 Toast。
- `src/components/AppShell/AppShell.vue`：组合默认布局、全屏布局和登录布局。
- `src/components/MainPageLayout/MainPageLayout.vue`：提供标题、返回、描述、右侧操作区和滚动内容区的通用页面结构。
- `src/components/AppHeader/AppHeader.vue`：展示模板名称、运行模式、Mock 状态和版本号。
- `src/components/AppSidebar/AppSidebar.vue`：读取 `useAppNavigation()` 的导航配置，并持久化折叠状态。
- `src/components/AppFooter/AppFooter.vue`：展示模板技术栈摘要。
- `src/components/GlobalLoading/GlobalLoading.vue`：读取 `globalLoading` 状态展示全局加载层。
- `src/components/GlobalAlert/GlobalAlert.vue`：展示全局确认弹窗。
- `src/components/GlobalToast/GlobalToast.vue`：展示全局消息提示。
- `src/composables/useAppNavigation.ts`：集中维护导航项，新增页面时优先同步这里和 `src/router/index.ts`。
- `src/utils/modalUtils.ts`：提供 `doAlert`、`doToastSuccess`、`doToastError`、`doToastWarning`、`doToastInfo`、`doGlobalLoading`、`doGlobalStatic` 和 `doHideGlobalLoading`。

## 通用能力

- 基础组件：`src/components/BaseButton/` 支持视觉类型、尺寸、图标和加载态；`src/components/BaseTable/` 支持列配置、骨架屏和插槽扩展；`src/components/BaseSelect/` 和 `src/components/BaseResult/` 提供选择器和结果展示骨架。
- 组合式逻辑：`src/composables/useInterval.ts`、`src/composables/useTimeout.ts` 和 `src/composables/useLoadingPoints.ts` 提供可自动清理的定时器与加载点动画。
- 最小 i18n：`src/i18n/messages.ts` 维护中性示例词典，`src/i18n/index.ts` 暴露 `currentLocale`、`setLocale` 和 `t()`。
- 示例页面：`src/views/UiView/` 展示基础组件、插槽和 i18n 的最小使用方式。

## 开发约定

- 路径别名：使用 `@src` 指向 `src/`。
- 路由模式：使用 `createWebHashHistory()`。
- 布局控制：路由通过 `meta.layout` 指定 `default`、`fullscreen` 或 `login`。
- 请求封装：统一通过 `src/utils/requestUtils.ts` 的 `doRequest` 返回 `[error, data]` 结构。
- 全局反馈：统一通过 `src/utils/modalUtils.ts` 调用 Alert、Toast 和 Loading，避免页面直接维护全局反馈状态。
- 国际化：通用文案优先放入 `src/i18n/messages.ts`，业务项目接入后再替换为真实词典或成熟 i18n 方案。
- Mock 规则：开启 `MOCK=1` 后，请求路径会转换为 Mock topic，例如 `/api/example/todo` 对应 `example.todo`。
- 临时代码：外部对接或赶进度产生的临时代码放入 `src/ugly/`，避免污染稳定业务目录。
- 样式：组件样式使用 `scss`，示例页面采用 BEM 风格类名。

## 脱敏边界

该目录是模板项目，不是任何业务项目的完整复制版本。模板只保留通用工程结构、布局骨架、Mock 示例和工具函数，不包含真实 `.env`、密钥、令牌、账号、客户素材、接口地址、运行日志、安装产物或构建产物。

如需替换为真实项目，请优先替换以下内容：

- `package.json` 中的包名和版本。
- `index.html` 中的页面标题。
- `src/composables/useAppNavigation.ts` 中的导航配置。
- `src/router/index.ts` 中的路由配置。
- `src/i18n/messages.ts` 中的中性示例词典。
- `public/mock/` 中的中性 Mock 示例数据。

## 清理产物

执行清理脚本：

```bash
npm run clean
```

## 协议

📄 当前模板项目随上层仓库发布，协议以仓库根目录 `LICENSE.txt` 为准。
