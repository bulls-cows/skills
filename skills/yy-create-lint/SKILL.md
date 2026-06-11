---
name: yy-create-lint
description: >
  为项目添加可通过 npm run lint 执行的 lint 支持。用于需要为前端、Node.js 或 Python 项目接入格式化、代码检查、Markdown 检查、类型检测和测试流程时触发；不用于只运行已有 lint 命令或只修复 lint 报错。
---

# yy-create-lint

## 描述

为项目补齐 `npm run lint` 入口，使 lint 流程覆盖格式化、代码文件检查、Markdown 文件检查、类型检测和测试用例执行。支持前端项目、Node.js 项目和 Python 项目；没有 `package.json` 的项目也要创建最小化 `package.json` 作为统一命令入口。

## 使用场景

- 用户要求给项目添加 lint 支持
- 用户要求补齐 `npm run lint` 命令
- 用户要求统一格式化、代码检查、Markdown 检查、类型检测和测试流程
- 用户要求为前端、Node.js 或 Python 项目接入基础质量检查

不应触发：

- 用户只是要求运行已有 lint 命令
- 用户只是要求修复 lint 报错
- 用户只是要求新增业务测试用例
- 用户要求接入非 `npm run lint` 的质量检查入口

## 指令

### 步骤 1. 确认目标项目

确定需要接入 lint 的项目根目录，并读取项目说明、依赖清单和现有配置。

**必须检查的文件或目录**：

- `package.json`
- `pyproject.toml`、`requirements.txt`、`setup.cfg`、`tox.ini`
- `tsconfig.json`、`tsconfig.*.json`、`jsconfig.json`
- `src/`、`test/`、`tests/`、`__tests__/`
- 已存在的 ESLint、Prettier、markdownlint、Ruff、pytest、unittest、Vitest、Jest、Node.js test runner、`tsc`、`vue-tsc`、mypy 或 pyright 配置

**决策分支**：

- **存在项目规范文件**：先读取并遵守项目规范，再继续后续步骤
- **不存在 `package.json`**：创建最小化 `package.json`，用于承载 `npm run lint` 统一入口
- **项目类型无法判断**：只创建通用 Markdown 检查和格式化入口，并明确标记代码检查、类型检测和测试流程需要用户补充技术栈信息

### 步骤 2. 识别项目类型

根据文件结构和依赖判断项目类型，允许同时命中多个类型。

**决策分支**：

- **前端项目**：存在 Vite、Vue、React、Next.js、Nuxt、Svelte、Astro 或浏览器端构建配置时，按前端项目处理
- **Node.js 项目**：存在 Node.js 入口、脚本、库代码或 `package.json` 依赖，但不属于纯前端项目时，按 Node.js 项目处理
- **Python 项目**：存在 Python 源码、`pyproject.toml`、`requirements.txt` 或 `tests/` 中的 Python 测试时，按 Python 项目处理
- **混合项目**：同时保留各语言的检查与测试入口，并由 `npm run lint` 统一串联

### 步骤 3. 设计 lint 脚本

在 `package.json` 中补齐脚本，保证 `npm run lint` 同时覆盖格式化、代码检查、Markdown 检查、类型检测和测试流程。

脚本片段可参考 `templates/lint-script-patterns.md`，但必须按目标项目已有脚本、依赖和配置裁剪，不得无差别复制模板。

**推荐脚本结构**：

- `lint`：串联执行 `format`、`lint:code`、`lint:markdown`、`typecheck`、`test`
- `format`：格式化代码、配置文件和 Markdown 文件
- `lint:code`：检查项目代码文件
- `lint:markdown`：检查 Markdown 文件
- `typecheck`：执行 TypeScript、Vue 或 Python 类型检测
- `test`：执行项目测试用例

**脚本组织规则**：

- **已有 `node --run` 风格**：优先沿用 `node --run <script>` 串联脚本
- **已有 `npm run` 风格**：优先沿用 `npm run <script>` 串联脚本
- **已有 `run-s`、`npm-run-all2` 或通配脚本**：可复用并保持原有并行或串行策略
- **Python 项目只有 npm 包装入口**：保持 `package.json` 轻量，只把 Python 工具命令包装到 npm 脚本中
- **混合项目**：将各语言检查拆成清晰子脚本，再由 `lint` 串联，避免单个长命令难以维护

**决策分支**：

- **已有同名脚本且语义一致**：优先复用原脚本，只补齐缺失的子脚本或串联关系
- **已有同名脚本但语义冲突**：保留原脚本，新增更具体的子脚本名称，并将 `lint` 调整为统一入口
- **缺少 Markdown 检查**：新增 `markdownlint-cli2` 配置或脚本
- **缺少格式化**：新增 Prettier、Ruff 或项目已有格式化工具入口
- **缺少类型检测**：按项目类型新增 `typecheck` 脚本和必要配置
- **缺少测试脚本**：按步骤 5 创建最小化测试用例和测试入口

### 步骤 4. 接入检查工具

优先复用项目已有工具；缺失时按项目类型补齐最小依赖和配置。

**前端与 Node.js 项目**：

- 代码检查优先使用已有 ESLint 配置
- 缺少 ESLint 时，按项目语言和框架补齐最小 ESLint 配置
- 格式化优先使用 Prettier
- TypeScript 项目使用 `tsc -p tsconfig.json --noEmit`；Vue 项目优先使用 `vue-tsc --build`
- JavaScript 项目只有在已有 `jsconfig.json`、`tsconfig.json` 或 `checkJs` 约定时接入类型检测
- 测试优先复用已有 Vitest、Jest、Playwright 或 Node.js test runner

**Python 项目**：

- 代码检查优先使用 Ruff
- 格式化优先使用 Ruff format；存在 Black 配置时可复用 Black
- 类型检测优先复用已有 mypy 或 pyright 配置；缺失时根据项目依赖和类型标注规模补齐最小 typecheck 入口
- Python 项目中只要存在 `package.json` 文件，pyright 配置就必须排除 `node_modules`，不以目录是否已存在作为判断条件
- 测试优先复用已有 pytest 或 unittest
- 通过 `package.json` 脚本调用 Python 工具，保持 `npm run lint` 作为统一入口

**Markdown 文件**：

- 优先使用 `markdownlint-cli2`
- 检查范围应排除依赖目录、构建产物、虚拟环境和缓存目录，脚本写法参考 `markdownlint-cli2 "**/*.md" "#node_modules" "#dist" --fix`
- 格式化可由 Prettier 覆盖 Markdown 文件

### 步骤 5. 补齐最小测试

检查项目是否已有可由命令执行的测试用例。

**决策分支**：

- **已有测试用例和测试命令**：复用现有测试命令，不新增测试文件
- **前端或 Node.js 项目无测试**：创建最小化 smoke test，验证项目基础文件或公开入口可访问
- **Python 项目无测试**：在 `tests/` 下创建最小化 pytest 测试，验证项目基础导入或项目根目录存在
- **混合项目无测试**：分别为命中的技术栈创建最小测试，并由 `npm run test` 串联执行

最小测试只用于跑通测试流程，不应引入业务断言或改变业务代码。

### 步骤 6. 修改项目文件

按最小必要改动落地配置和脚本。

**允许修改的文件类型**：

- `package.json` 和必要的锁文件
- ESLint、Prettier、markdownlint、Ruff、pytest 或测试框架配置文件
- TypeScript、Vue、mypy、pyright 或其他类型检测配置文件
- 最小化测试文件
- 必要的开发依赖清单文件

**修改原则**：

- 不删除已有脚本、配置和测试
- 不重写无关配置项
- 不把 lint 接入扩散成项目重构
- 不手动修改自动生成文件，除非依赖安装命令生成或更新
- 新增配置优先使用项目已采用的文件格式和命名风格

### 步骤 7. 输出结果

输出内容必须包含：

1. 修改原因和影响范围
2. 新增或更新的文件列表
3. `npm run lint` 覆盖的流程，必须说明类型检测入口
4. 测试用例处理方式
5. 后续验证建议和注意事项

## 安全边界

- 不主动执行发布、部署、清理缓存或删除文件命令
- 不在接入完成后主动执行 `npm run lint`，避免格式化产生大量额外改动
- 不为通过 lint 而删除业务代码、跳过测试或降低规则强度
- 不在未确认的情况下引入大型框架迁移或替换项目既有工具链
- 不把最小测试写成依赖外部网络、真实账号或生产数据的测试

## 相关资源

- `templates/lint-script-patterns.md`：不同类型项目的 `npm run lint` 脚本模式参考
