# AGENTS.md

## 项目简介

- 本项目是 `yy-resume` 技能下的简历编辑器脚本项目
- 项目基于 Vue 3、TypeScript 和 Vite 构建
- 主要产出是可视化简历编辑器页面，支持简历内容编辑、预览、导入导出和打印
- 当前目录是独立 npm 项目，根目录包含 `package.json`

## 范围

- 默认语言：Vue、TypeScript、SCSS、Markdown、JSON
- 允许修改目录：`src/`、项目根目录配置文件、`README.md`、`AGENTS.md`
- 谨慎修改文件：`package.json`、`package-lock.json`、`vite.config.ts`、`tsconfig*.json`、`eslint.config.mjs`
- 禁止修改目录：`node_modules/`、`dist/`、`.idea/`
- 禁止手动编辑构建产物；如需更新 `dist/`，通过构建命令生成

## 改动检查

**改动后按条件执行：**

- 修改 Vue、TypeScript 或 SCSS 源码后，建议执行 `npm run lint`
- 修改构建配置或类型配置后，建议执行 `npm run build`
- 修改依赖配置后，建议执行 `npm install` 并确认 `package-lock.json` 同步更新

**可用脚本：**

- `npm run ready`：安装依赖
- `npm run dev`：启动 Vite 开发服务
- `npm run build`：执行类型检查并构建生产产物
- `npm run preview`：预览生产构建结果
- `npm run lint`：依次执行 Prettier、ESLint、Markdown 检查、vue-tsc 检查和 smoke test
- `npm run lint:prettier`：格式化 `src/**/*.ts` 和 `src/**/*.vue`
- `npm run lint:eslint`：检查 `src/**/*.{ts,vue}`
- `npm run lint:type`：执行 Vue TypeScript 类型检查

**改动后提示用户是否执行（默认不执行）：**

- 执行 `npm run lint` 检测代码和文档
- 执行 `npm run build` 验证构建结果

## 交付格式

- 修改后先说明修改原因和影响范围
- 所有文件引用都要带路径和行号
- 如改动影响用户操作流程，说明用户可见变化
- 如未执行检查命令，明确说明未执行原因和建议命令
- 保持交付说明简洁，优先列出已完成内容、验证情况和后续建议

## 项目结构

- `index.html`：Vite 应用 HTML 入口
- `vite.config.ts`：Vite 配置和开发服务停止插件
- `package.json`：项目脚本、依赖和元信息
- `src/App.vue`：应用根组件
- `src/main.ts`：Vue 应用启动入口
- `src/components/`：页面编辑器、预览区、工具栏和简历区块组件
- `src/components/property-editors/`：各类简历区块的属性编辑组件
- `src/components/sections/`：各类简历区块的预览展示组件
- `src/data/`：示例简历数据
- `src/stores/`：简历编辑状态管理
- `src/types/`：简历数据和存储相关类型声明
- `src/utils/`：导出、下载和本地缓存工具
- `dist/`：生产构建产物，不手动修改

## AI 能力模型

### 行动前思考

- **假设显式化**：动手前先说明对目标、输入、输出和限制条件的理解，无法确认的信息标记为待确认。
- **决策点显式化**：遇到多种实现路径时，明确指出关键取舍点、影响范围和推荐方案。
- **目标驱动执行**：从用户目标反推必要改动，只做能直接支撑交付结果的工作。
- **依赖关系识别**：修改组件、类型、数据或工具函数前，先确认调用链和数据流，避免破坏编辑、预览、导入导出闭环。

### 克制与精简

- **简单优先**：优先使用现有 Vue 3、TypeScript、SCSS 和 Vite 结构完成需求，不引入不必要依赖。
- **精确修改**：只修改与任务直接相关的文件和代码块，不借机重构无关组件或统一格式。
- **显式分级筛选**：将问题按严重程度和影响范围分级，优先处理会影响功能、类型、安全和构建的问题。
- **兼容保真**：保持现有数据结构、组件职责和用户操作流程稳定，除非用户明确要求调整。

### 验证与比对

- **交叉比对式矛盾定位**：同时比对组件模板、脚本逻辑、类型声明、样式类名和数据结构，定位不一致来源。
- **逆向逻辑验证**：从最终页面行为和导出结果反查数据写入、状态更新、预览渲染和存储流程是否完整。
- **非回归检查**：确认改动不影响已有编辑、预览、导入、导出、打印和本地缓存能力。
- **验证闭环**：优先运行与改动最相关的检查命令；如未执行，交付时明确说明建议验证方式。

## 路径格式规范

- 在文档中提及文件路径时，优先使用相对路径，以保持跨设备下的通用性
- 在终端中提及文件路径时，优先使用绝对路径，以方便终端或 IDE 将其识别为可点击链接
- 使用正斜杠作为路径分隔符，路径包含空格时使用引号包裹，以确保跨平台兼容性和正确解析

## 终端命令能力识别

执行终端命令前，先读取项目根目录下的 `TERMINAL.LOCAL.md`，并优先使用其中记录的已验证 shell 启动入口、命令可用性和命令写法。

- 在读取 `TERMINAL.LOCAL.md` 前，优先使用 Agent 原生文件读取能力；若不可用，则直接使用 `node` 进程读取文件内容，不通过 shell 包装
- 只有原生读取与 `node` 读取均不可用时，才按固定优先级执行最小 shell 读取探测；该阶段只用于判断文件是否存在并读取内容，不代表终端能力结论
- 如果 `TERMINAL.LOCAL.md` 不存在、内容为空或记录与实际执行结果不一致，优先使用 `yy-detect-terminal` 技能创建或更新该文件
- 如果 `yy-detect-terminal` 技能不可用，使用最小化本地回退规则：先确认可用 shell，再确认命令存在性判断方式，最后记录首选 shell、备用 shell、不可用 shell 和搜索命令选择
- `TERMINAL.LOCAL.md` 只描述本机环境，不代表其他开发者环境；发现记录失效时应立即更新

## 需要遵守的规则

- 中文是主要语言，描述和文档使用中文
- 无论用户使用何种语言提问，请始终使用简体中文进行解释和回答
- 除非用户明确要求提交，否则禁止使用 git 提交相关命令
- 不要手动修改 `node_modules/`、`dist/` 和 `.idea/`
- 修改前端代码时保持组件职责清晰，避免把状态管理、展示逻辑和导出逻辑混在同一层
- 新增或调整简历区块时，同步检查 `src/types/`、`src/data/`、`src/components/property-editors/` 和 `src/components/sections/` 的契约一致性
- 调整本地缓存或导入导出逻辑时，同步检查 `src/stores/` 和 `src/utils/` 中的数据读写路径

## 关键参考

- `README.md`：项目说明、使用方式和目录结构
- `package.json`：脚本、依赖和项目元信息
- `vite.config.ts`：构建配置和开发服务停止逻辑
- `src/types/resume.d.ts`：简历数据结构定义
- `src/data/resume-data.ts`：默认简历数据
- `src/stores/store.ts`：简历编辑状态管理
- `src/utils/export.ts`：HTML/JSON 导出逻辑
- `src/utils/storageUtils.ts`：本地缓存工具
