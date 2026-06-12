---
name: yy-create-vue3
description: >
  创建基于当前技能 `scripts/` 参考工程的 Vue 3 + TypeScript + Vite 项目骨架，或按同一结构补齐空白/轻量项目。
  当用户需要快速落地统一目录、配置和页面骨架时触发，不用于复杂迁移、重构或通用 Vue 问答。
---

# yy-create-vue3

## 描述

基于当前技能目录下 `scripts/` 的权威参考工程，创建或补齐 Vue 3 + TypeScript + Vite 项目。优先复用现成参考文件，只做与项目名称、页面列表、可选目录和验证动作直接相关的最小调整。

## 使用场景

- 用户需要新建 Vue 3 + TypeScript + Vite 前端项目
- 用户需要生成与当前技能 `scripts/` 参考工程一致的目录结构、配置文件和源码骨架
- 用户需要在空白或轻量项目中补齐标准化的 Vue 3 工程基础设施

不应触发：

- 用户只需要单个组件、页面或样式片段
- 用户要处理 React、Vue 2、Angular 或非 Vite 项目
- 用户要对成熟现有项目做大规模迁移、重构或架构改造
- 用户只是询问 Vue 3、TypeScript 或 Vite 的概念和用法

## 指令

### 步骤 1. 确认任务边界与最小输入

收集完成任务所需的最小信息：

- 项目名称，使用英文短横线命名，如 `my-app`
- 目标目录
- 项目标题
- 页面列表，默认至少包含 `HomeView`
- 是否需要 `public/mock/`，默认否
- 是否需要 `src/languages/`，默认否
- 是否执行依赖安装与验证
- 目标目录是新目录、空目录还是已有项目目录

**决策分支**：

- **用户已提供关键信息**：直接进入步骤 2
- **仅缺少少量必要信息**：只追问缺失项，不重复确认已明确内容
- **目标目录已有内容但处理边界不明**：先确认只做补齐或对齐，不默认覆盖、删除或清空现有文件

### 步骤 2. 判定生成模式

以当前技能目录下的 `scripts/` 为唯一权威参考，以 `templates/` 中的轻量说明为快速校准材料。

**决策分支**：

- **目标目录不存在或为空目录**：按“新建项目”模式处理，复制参考工程的基础骨架，再做最小定制
- **目标目录已有少量工程文件，且用户明确要求对齐结构**：按“补齐项目”模式处理，只新增缺失文件或修改与本次目标直接相关的文件
- **目标目录已有成熟工程内容**：说明该技能只适合脚手架创建和轻量对齐，要求用户缩小范围后再继续

### 步骤 3. 复制参考工程并过滤无效产物

从 `scripts/` 复制项目骨架时，只保留可作为脚手架的一次性源文件，不复制缓存和安装产物。

**决策分支**：

- **新建项目模式**：复制 `scripts/` 中的基础目录和配置文件，保留 `public/`、`src/`、`tests/`、构建脚本和根配置
- **补齐项目模式**：逐项对照 `scripts/`，只补齐缺失的目录、配置和基础源码文件

**禁止复制的内容**：

- `node_modules/`
- `.eslintcache`
- 其他缓存、临时目录和本地安装产物

**建议处理方式**：

- `package-lock.json` 默认不复制，优先通过后续 `npm install` 重新生成
- `package.json`、`vite.config.ts`、`vite.shared.ts`、`tsconfig*.json`、`eslint.config.ts`、`.prettierrc.json`、`.editorconfig`、`.gitignore`、`index.html` 直接以 `scripts/` 同名文件为基准

### 步骤 4. 生成目录结构与基础配置

确保目标项目至少具备与参考工程一致的基础目录结构：

```text
project-name/
├── public/
├── scripts/
├── src/
│   ├── apis/
│   ├── components/
│   ├── composables/
│   ├── router/
│   ├── utils/
│   ├── stores/
│   ├── styles/
│   ├── typings/
│   └── views/
└── tests/
```

**决策分支**：

- **用户需要 Mock 数据目录**：补充 `public/mock/`
- **用户需要国际化目录**：补充 `src/languages/`
- **用户未提出额外目录要求**：保持与 `scripts/` 参考工程一致，不自行扩展更多目录

配置文件处理规则：

- 复制 `scripts/package.json` 后，仅调整项目名称和用户明确要求的元数据
- 复制 `scripts/vite.config.ts` 与 `scripts/vite.shared.ts`，保持 `base: "./"` 和 `@src -> ./src` 别名不变
- 整组复制 `scripts/tsconfig*.json`，不要手写拆分
- 复制 `scripts/eslint.config.ts`、`scripts/.prettierrc.json`、`scripts/.editorconfig`、`scripts/.gitignore`
- 若用户需要环境变量文件，再按 `vite.shared.ts` 使用到的运行时常量创建最小 `.env`，不要凭空扩展字段

### 步骤 5. 生成源码骨架与页面

优先复制 `scripts/src/` 和 `scripts/tests/` 的基础文件，再围绕用户输入做最小定制。

必须完成的调整：

- `index.html` 的 `<title>` 使用用户提供的项目标题
- `package.json` 的 `name` 使用项目名称
- 路由配置与页面目录根据页面列表同步生成
- 默认页面至少保证存在 `HomeView`

页面生成规则：

- 页面目录与页面文件同名，使用 PascalCase，例如 `HomeView/HomeView.vue`
- 页面专属子组件放在 `_components/` 目录下
- 如果用户未提供页面列表，默认只生成 `HomeView`

**决策分支**：

- **参考工程已有可复用页面**：复制后做最小改名或内容替换
- **参考工程缺少用户指定页面**：按现有页面结构补齐同构目录和基础页面文件
- **用户要求保留已有页面**：仅新增缺失页面，不重写无关页面

### 步骤 6. 安装依赖并执行验证

在目标项目根目录执行安装和验证，默认使用 `npm`。

**决策分支**：

- **用户未禁止安装与验证**：执行 `npm install`、`npm run type-check`、`npm run test`
- **用户明确要求启动开发环境**：额外执行 `npm run dev:test`，以短时启动并确认可正常进入开发态
- **用户明确要求跳过安装或当前环境不适合联网安装**：跳过命令执行，并在结果中说明未验证项

验证时保持以下约束：

- 包管理工具使用 `npm`，不改成 `pnpm`
- 路径别名保持 `@src`，不改成 `@`
- 不额外执行 `build:*`、部署或发布命令，除非用户明确要求

### 步骤 7. 补齐 lint 支持

在项目创建或补齐完成后，检测当前环境是否可用 `yy-enable-lint` 技能，并在可用时触发该技能为项目添加 `npm run lint` 支持。

**决策分支**：

- **当前环境可用 `yy-enable-lint`**：在目标项目目录触发 `yy-enable-lint`，使其按项目技术栈补齐 lint 支持
- **当前环境不可用 `yy-enable-lint`**：不阻塞项目生成，跳过 lint 补齐
- **用户明确要求不补齐 lint 支持**：跳过，仅在交付结果中说明
- **`yy-enable-lint` 执行失败**：记录失败原因，不扩大处理范围

### 步骤 8. 输出结果

输出以下内容：

1. 项目结构，使用 `tree` 或 `text` 代码块展示
2. 本次创建或补齐的核心文件与目录
3. 验证结果，区分已执行、跳过和失败项
4. 关键注意事项，包括包管理工具、路径别名、后续新增页面时需要同步更新路由

## 安全边界

- 不修改当前技能目录下的 `scripts/` 参考工程本身
- 不删除目标目录中的无关现有文件
- 未获用户明确授权时，不覆盖与本次目标无关的已有实现
- 不执行部署、发布、推送或其他与脚手架创建无关的高影响操作

## 相关资源

- `templates/package-json.md`：`package.json` 轻量引用说明，权威来源为 `scripts/package.json`
- `templates/vite-config.md`：Vite 轻量引用说明，权威来源为 `scripts/vite.config.ts` 和 `scripts/vite.shared.ts`
- `templates/tsconfig-templates.md`：TypeScript 轻量引用说明，权威来源为 `scripts/tsconfig*.json`
- `templates/eslint-prettier.md`：代码检查轻量引用说明，权威来源为 `scripts/eslint.config.ts`、`scripts/.prettierrc.json`、`scripts/.editorconfig`
- `scripts/`：完整参考工程，也是目录结构、配置和基础源码的唯一权威来源
