# bulls-cows/skills

<div align="center">
  <img width="200" src="./logo.svg" alt="牛气腾腾的logo" />
</div>

> 本仓库维护了一些实用的规则和AI技能。

- GitHub 仓库：[https://github.com/bulls-cows/skills](https://github.com/bulls-cows/skills)
- Gitee 仓库：[https://gitee.com/bulls-cows/skills](https://gitee.com/bulls-cows/skills)

## Rules 规则

[点击这里](./docs/CONFIG_RULE.md) 查看如何使用规则文件。

### 通用规则

- [rules/file-scope-limit](./rules/file-scope-limit/RULE.md)：文件修改范围限制规则，AI 仅允许修改用户授权的目录范围内的文件

### 特定规则

**注意**：以下规则对项目目录结构有特定要求

- **React 项目**需要包含：`src/api`、`src/components`、`src/constants` 目录
- **Vue2/Vue3 项目**需要包含：`src/api`、`src/views`、`src/constants` 目录

AI 仅允许修改上述目录范围内的源代码文件，**其他目录的文件不会被处理**。

- [rules/frontend-rules-react](./rules/frontend-rules-react/RULE.md)：前端 React 项目开发规范，包含代码风格、组件规范、Hooks 规范等
- [rules/frontend-rules-vue2](./rules/frontend-rules-vue2/RULE.md)：前端 Vue2 项目开发规范，包含代码风格、组件规范、API 规范等
- [rules/frontend-rules-vue3](./rules/frontend-rules-vue3/RULE.md)：前端 Vue3 项目开发规范，包含代码风格、组件规范、Composition API 规范等

## Skills 技能

### 本地开发

**如果你是技能开发者，请查看 [本地开发调试技能指南](./docs/DEVELOP.md)。**

推荐使用 `npx skills add` 命令安装技能。关于 `skills` 命令的详细说明，请查看 [官方文档](https://github.com/vercel-labs/skills) 。

### 本仓库技能

执行 `npx skills add bulls-cows/skills` 可安装以下所有技能。如果你使用 Claude Code，可以[通过插件市场安装这些技能](./docs/CLAUDE_CODE_SKILL.md)。

#### 通用技能

适用于大多数 Git 项目，对项目目录结构没有特殊要求。

| 技能 | 说明 | 安装命令 |
| ---- | ---- | -------- |
| [yy-commit](./skills/yy-commit/SKILL.md) | Git 代码提交助手，生成规范的提交信息并执行提交操作 | `npx skills add bulls-cows/skills --skill yy-commit` |
| [yy-create-readme](./skills/yy-create-readme/SKILL.md) | 创建或更新项目根目录下的 README.md 文件 | `npx skills add bulls-cows/skills --skill yy-create-readme` |
| [yy-create-rule](./skills/yy-create-rule/SKILL.md) | 创建或更新规则文档，并更新 AGENTS.md 中的引用关系 | `npx skills add bulls-cows/skills --skill yy-create-rule` |
| [yy-create-skill](./skills/yy-create-skill/SKILL.md) | 创建或更新规范的 Claude Skill | `npx skills add bulls-cows/skills --skill yy-create-skill` |
| [yy-design-ui](./skills/yy-design-ui/SKILL.md) | 创建符合国人审美的网页界面设计，专注于简洁、精致、和谐的设计风格 | `npx skills add bulls-cows/skills --skill yy-design-ui` |
| [yy-frontend-weekly-report](./skills/yy-frontend-weekly-report/SKILL.md) | 自动读取 git 提交记录，按功能开发、代码优化、问题修复等分类归纳，生成结构化周报 | `npx skills add bulls-cows/skills --skill yy-frontend-weekly-report` |
| [yy-init](./skills/yy-init/SKILL.md) | 初始化项目 AGENTS.md 文档，用于指导 AI 助手理解项目规范、范围和结构 | `npx skills add bulls-cows/skills --skill yy-init` |
| [yy-lint](./skills/yy-lint/SKILL.md) | 执行代码 lint 检查，包括检测 lint 脚本、验证 Node 版本、执行 lint 检查并尝试自动修复错误 | `npx skills add bulls-cows/skills --skill yy-lint` |
| [yy-mode-plan](./skills/yy-mode-plan/SKILL.md) | 计划优先执行模式，要求在做出任何变更前必须获得用户确认 | `npx skills add bulls-cows/skills --skill yy-mode-plan` |
| [yy-mode-spec](./skills/yy-mode-spec/SKILL.md) | 规格优先开发模式，要求在实施前完成详细文档编写 | `npx skills add bulls-cows/skills --skill yy-mode-spec` |
| [yy-read-pdf](./skills/yy-read-pdf/SKILL.md) | 读取并解析 PDF 文件内容，提取文本、表格和结构化信息 | `npx skills add bulls-cows/skills --skill yy-read-pdf` |
| [yy-refresh](./skills/yy-refresh/SKILL.md) | 刷新 AI 对代码的理解，对比所有改动文件并重新解析关键代码 | `npx skills add bulls-cows/skills --skill yy-refresh` |
| [yy-review](./skills/yy-review/SKILL.md) | 执行代码审核，包括语法错误、逻辑错误、安全漏洞和最佳实践检查 | `npx skills add bulls-cows/skills --skill yy-review` |

#### 特定技能

**注意**：以下技能对目录结构有特定要求：

- `src/api`
- `src/components`
- `src/constants`
- `src/views`
- `src/pages`

代码提交和审核时会自动聚焦于上述目录下的源代码文件，**其他目录的文件不会被处理**。

| 技能 | 说明 | 安装命令 |
| ---- | ---- | -------- |
| [yy-frontend-commit](./skills/yy-frontend-commit/SKILL.md) | 前端代码提交助手，归纳 src 目录下改动的文件，生成规范的提交信息并自动执行 add 和 commit 操作 | `npx skills add bulls-cows/skills --skill yy-frontend-commit` |
| [yy-frontend-review](./skills/yy-frontend-review/SKILL.md) | 前端代码审核助手，检查代码语法、逻辑、安全漏洞和最佳实践 | `npx skills add bulls-cows/skills --skill yy-frontend-review` |

### 推荐外部技能

以下技能来自外部仓库。

#### 前端开发

| 技能 | 说明 | 安装命令 |
| ---- | ---- | -------- |
| frontend-design | 网页 / 移动端界面设计、布局、样式、交互逻辑、前端视觉方案 | `npx skills add anthropics/skills --skill frontend-design` |
| web-design-guidelines | 色彩、字体、间距、响应式、组件规范、设计系统输出 | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` |
| ui-ux-pro-max | 高保真界面设计、用户体验流程、交互原型、可用性优化 | `npx skills add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max` |
| canvas-design | 基于 Canvas 实现可视化、图表、动画、海报生成、交互式图形 | `npx skills add anthropics/skills --skill canvas-design` |
| vercel-react-best-practices | Vercel 官方 React/Next.js 最佳实践 | `npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices` |
| vercel-composition-patterns | Vercel 官方 React 组件组合模式 | `npx skills add vercel-labs/agent-skills --skill vercel-composition-patterns` |

#### 浏览器与自动化

| 技能 | 说明 | 安装命令 |
| ---- | ---- | -------- |
| agent-browser | 自动模拟浏览器行为、网页抓取、页面交互、自动化测试 | `npx skills add vercel-labs/agent-browser --skill agent-browser` |

#### 网站分析

| 技能 | 说明 | 安装命令 |
| ---- | ---- | -------- |
| audit-website | 对网站做整体检测：性能、SEO、安全、兼容性、加载速度、错误排查 | `npx skills add squirrelscan/skills --skill audit-website` |
| seo-audit | 关键词、标题、描述、外链、收录、排名、流量优化分析 | `npx skills add coreyhaines31/marketingskills --skill seo-audit` |

#### 营销与内容

| 技能 | 说明 | 安装命令 |
| ---- | ---- | -------- |
| copywriting | 自动生成营销文案、广告语、推文、标题、短视频文案、宣传稿 | `npx skills add coreyhaines31/marketingskills --skill copywriting` |
| social-content | 小红书、抖音、微博、朋友圈等平台文案 / 脚本 / 选题 | `npx skills add coreyhaines31/marketingskills --skill social-content` |

#### 工具与效率

##### 效率工具

| 技能 | 说明 | 安装命令 |
| ---- | ---- | -------- |
| find-skills | 根据需求自动匹配、推荐合适的技能、工具、能力模块 | `npx skills add vercel-labs/skills --skill find-skills` |
| skill-creator | 自定义生成新技能、配置流程、搭建专属工具 / 能力 | `npx skills add anthropics/skills --skill skill-creator` |
| planning-with-files | 结合文档 / 文件做项目规划、排期、流程设计、方案输出 | `npx skills add othmanadi/planning-with-files --skill planning-with-files` |

##### Vue 全栈

| 技能 | 说明 | 安装命令 |
| ---- | ---- | -------- |
| vue-best-practices | Vue 3 最佳实践，强烈推荐使用 Composition API 和 TypeScript | `npx skills add hyf0/vue-skills --skill vue-best-practices` |
| vue-debug-guides | Vue 3 调试和错误处理，用于运行时错误、警告、异步失败和 SSR 问题 | `npx skills add hyf0/vue-skills --skill vue-debug-guides` |
| vue-jsx-best-practices | Vue 中的 JSX 语法，与 React JSX 的区别 | `npx skills add hyf0/vue-skills --skill vue-jsx-best-practices` |
| vue-options-api-best-practices | Vue 3 Options API 风格，data()、methods、this 上下文 | `npx skills add hyf0/vue-skills --skill vue-options-api-best-practices` |
| vue-pinia-best-practices | Pinia 存储、状态管理模式、存储设置和响应式处理 | `npx skills add hyf0/vue-skills --skill vue-pinia-best-practices` |
| vue-router-best-practices | Vue Router 4 模式、导航守卫、路由参数和生命周期交互 | `npx skills add hyf0/vue-skills --skill vue-router-best-practices` |
| vue-testing-best-practices | Vue.js 测试，涵盖 Vitest、Vue Test Utils、Playwright | `npx skills add hyf0/vue-skills --skill vue-testing-best-practices` |
| create-adaptable-composable | 创建库级别的 Vue composable，接受 MaybeRef / MaybeRefOrGetter 输入 | `npx skills add hyf0/vue-skills --skill create-adaptable-composable` |

##### Superpowers

| 技能 | 说明 | 安装命令 |
| ---- | ---- | -------- |
| brainstorming | 任何创造性工作之前使用——创建功能、构建组件、添加功能或修改行为 | `npx skills add obra/superpowers --skill brainstorming` |
| writing-plans | 多步骤任务规范或需求，在接触代码之前使用 | `npx skills add obra/superpowers --skill writing-plans` |
| writing-skills | 创建新技能、编辑现有技能或验证技能工作时使用 | `npx skills add obra/superpowers --skill writing-skills` |
| executing-plans | 书面实施计划需要在单独会话中执行并有审查检查点时使用 | `npx skills add obra/superpowers --skill executing-plans` |
| dispatching-parallel-agents | 2+ 个独立任务，可以在没有共享状态或顺序依赖的情况下工作 | `npx skills add obra/superpowers --skill dispatching-parallel-agents` |
| subagent-driven-development | 在当前会话中执行具有独立任务的实现计划时使用 | `npx skills add obra/superpowers --skill subagent-driven-development` |
| finishing-a-development-branch | 实施完成、所有测试通过，需要决定如何整合工作时使用 | `npx skills add obra/superpowers --skill finishing-a-development-branch` |
| requesting-code-review | 完成任务、实现主要功能或在合并前使用 | `npx skills add obra/superpowers --skill requesting-code-review` |
| receiving-code-review | 收到代码审查反馈时使用，在实现建议之前 | `npx skills add obra/superpowers --skill receiving-code-review` |
| systematic-debugging | 遇到任何 bug、测试失败或意外行为时使用 | `npx skills add obra/superpowers --skill systematic-debugging` |
| test-driven-development | 实现任何功能或 bugfix 时使用，在写实现代码之前 | `npx skills add obra/superpowers --skill test-driven-development` |
| verification-before-completion | 声称工作完成、修复或通过时使用，在提交或创建 PR 之前 | `npx skills add obra/superpowers --skill verification-before-completion` |
| using-git-worktrees | 开始需要与当前工作区隔离的功能工作时使用 | `npx skills add obra/superpowers --skill using-git-worktrees` |
| using-superpowers | 开始任何对话时使用——建立如何查找和使用技能 | `npx skills add obra/superpowers --skill using-superpowers` |

## 协议

本项目采用 [Apache 2.0](./LICENSE.txt) 开源协议。

## 免责声明

本软件按"原样"（AS-IS）提供，不提供任何明示或暗示的保证，包括但不限于对适销性、特定用途适用性和非侵权性的保证。在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，无论是由于合同、侵权或其他方式引起的，由本软件或其使用或其他交易引起、产生或与之相关的。

使用者应自行承担使用本软件的全部风险。在使用前，请确保充分理解软件的功能和潜在影响，并在当地法律允许的范围内合规使用。
