# AGENTS.md

## 项目简介

- 本项目是 `vue3-scaffold` 模板工程，用于快速启动 Vue3 应用开发。
- 项目内置 Vite、TypeScript、Vue Router、Pinia、Axios、Vitest、ESLint、Oxlint 和 Prettier。
- 目标是提供统一目录结构、通用应用壳层、运行脚本、环境变量、Mock 请求、全局反馈和常用工具函数，让业务开发从标准化工程骨架开始。

## 范围

- 默认语言：TypeScript、Vue、SCSS、Markdown、JSON。
- 允许修改目录：`src/`、`tests/`、`public/`、`scripts/`。
- 允许修改配置文件：`package.json`、`vite.config.ts`、`vite.shared.ts`、`vitest.config.ts`、`eslint.config.ts`、`tsconfig*.json`、`.prettierrc.json`、`.editorconfig`、`.env*`。
- 禁止修改目录：`node_modules/`、`dist/`、`coverage/`。
- Node.js 版本要求：`>=22.18.0`，优先遵循 `.nvmrc` 中的 `v22.18.0`。

## 改动检查

改动后根据影响范围执行以下命令：

- 安装依赖：`npm run ready` 或 `npm install`。
- 本地开发测试模式：`npm run dev:test`。
- 本地开发生产模式：`npm run dev:production`。
- 完整检查：`npm run lint`。
- 类型检查：`npm run type-check`。
- 单元测试：`npm run test`。
- 测试模式构建：`npm run build:test`。
- 生产模式构建：`npm run build:production`。
- 清理产物：`npm run clean`。

`npm run lint` 会依次执行格式化、Oxlint、ESLint、换行符检查、类型检查和 Vitest 测试。

## 交付格式

- 说明修改原因和影响范围。
- 文件引用使用相对路径，并尽量附带行号。
- 说明已执行的检查命令及结果；如未执行，说明原因。
- 不主动提交 Git；只有用户明确要求时才执行提交。

## 项目结构

- `public/`：静态资源与 Mock 数据。
  - `public/mock/`：本地 Mock 数据。
  - `public/static/`：静态文件。
- `scripts/`：工程脚本。
  - `scripts/clean.ts`：清理脚本。
  - `scripts/convert-crlf-to-lf.ts`：换行符检查脚本。
- `src/`：应用源码。
  - `src/apis/`：接口定义。
- `src/components/`：通用组件。
- `src/components/GlobalAlert/GlobalAlert.vue`：全局确认弹窗。
- `src/components/GlobalLoading/GlobalLoading.vue`：全局加载层。
- `src/components/GlobalToast/GlobalToast.vue`：全局消息提示。
  - `src/composables/`：组合式逻辑。
  - `src/router/`：路由配置。
  - `src/utils/`：通用工具函数。
  - `src/stores/`：Pinia 状态管理。
  - `src/styles/`：全局样式。
  - `src/typings/`：全局类型声明。
  - `src/ugly/`：外部对接或赶进度时的临时代码隔离区。
  - `src/views/`：页面视图。
  - `src/App.vue`：根组件。
  - `src/main.ts`：应用入口。
- `tests/`：单元测试。
- `vite.config.ts`：Vite 配置。
- `vite.shared.ts`：Vite 与 Vitest 共享运行时定义。
- `vitest.config.ts`：Vitest 配置。
- `eslint.config.ts`：ESLint 配置。

## AI 能力模型

### 行动前思考

- 明确用户目标、影响范围、成功标准和禁止事项。
- 修改前先识别相关目录、脚本、配置和现有约定。
- 对不确定信息显式标注假设，优先通过项目文件验证。
- 识别关键决策点，例如是否影响构建、路由、状态、请求、测试或样式体系。

### 克制与精简

- 优先采用简单、直接、可回退的方案。
- 只修改与目标直接相关的文件，不顺手重构无关代码。
- 保持现有命名、目录分层、格式化风格和脚本约定。
- 对候选方案按必要性、影响范围和验证成本进行显式分级筛选。

### 验证与比对

- 从目标结果反推必须验证的命令和页面行为。
- 对改动前后进行交叉比对，定位潜在矛盾和遗漏。
- 使用类型检查、单元测试、lint、构建或页面预览验证结果。
- 若验证失败，优先回到错误信息和相关源码定位根因，再做最小修复。

## 路径格式规范

- 文档中使用相对路径，保持跨设备通用性。
- 终端命令中优先使用项目目录内路径，路径包含空格时使用引号包裹。
- 统一使用正斜杠 `/` 作为路径分隔符。
- 源码中优先使用 `@src` 指向 `src/`。

## 需要遵守的规则

- 使用简体中文编写说明和文档。
- 代码使用 2 个空格缩进，遵循 `.editorconfig`。
- 文件统一使用 LF 换行，提交前通过 `npm run lint:lf` 检查。
- 组件样式使用 `scss`，页面示例优先采用 BEM 风格类名。
- 路由使用 `createWebHashHistory()`。
- 路由通过 `meta.layout` 指定 `default`、`fullscreen` 或 `login` 布局。
- 新增页面时同步维护 `src/router/index.ts` 和 `src/composables/useAppNavigation.ts`。
- 请求统一通过 `src/utils/requestUtils.ts` 的 `doRequest` 返回 `[error, data]` 结构。
- 全局反馈统一通过 `src/utils/modalUtils.ts` 调用 Alert、Toast 和 Loading。
- 开启 `MOCK=1` 后，请求路径按 Mock topic 规则映射，例如 `/api/example/todo` 对应 `example.todo`。
- 临时代码放入 `src/ugly/`，避免污染稳定业务目录。

## 关键参考

- `README.md`：项目说明、运行方式、目录结构和开发约定。
- `package.json`：脚本、依赖和 Node.js 版本要求。
- `.nvmrc`：推荐 Node.js 版本。
- `.editorconfig`：编辑器格式约定。
- `vite.shared.ts`：环境变量加载和共享运行时定义。
- `src/utils/requestUtils.ts`：请求封装契约。
- `src/utils/modalUtils.ts`：全局反馈封装契约。
- `tests/`：单元测试示例。
