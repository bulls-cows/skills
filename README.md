# bulls-cows/skills

<div align="center">
  <img width="200" src="https://cdn.verysites.com/verysites/static/img/logo.svg" alt="牛气腾腾的logo" />
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

- [rules/frontend-rules-vue2](./rules/frontend-rules-vue2/RULE.md)：前端 Vue2 项目开发规范，包含代码风格、组件规范、API 规范等
- [rules/frontend-rules-vue3](./rules/frontend-rules-vue3/RULE.md)：前端 Vue3 项目开发规范，包含 `<script setup>` 组合式 API 规范、Hooks 规范、代码风格、组件规范、API 规范等

## Skills 技能

提示：

- 推荐使用 `npx skills add` 命令安装技能。关于 `skills` 命令的详细说明，请查看 [官方文档](https://github.com/vercel-labs/skills)
- 该网站收录了大量的技能，可以搜索查找：[The Agent Skills Directory](https://skills.sh/)

### 本仓库技能

执行 `npx skills add bulls-cows/skills` 可安装以下所有技能。如果你使用 Claude Code，可以[通过插件市场安装这些技能](./docs/CLAUDE_CODE_SKILL.md)。

#### 通用技能

适用于大多数 Git 项目，对项目目录结构没有特殊要求。

| 技能                                                                       | 说明                                                                                                                             | 安装命令                                                              |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [yy-comment](./skills/yy-comment/SKILL.md)                                 | 为代码添加注释。可为整个文件或指定函数添加 JSDoc 注释和内部逻辑注释                                                              | `npx skills add bulls-cows/skills --skill yy-comment`                 |
| [yy-commit](./skills/yy-commit/SKILL.md)                                   | 帮助用户创建规范的 Git 提交                                                                                                     | `npx skills add bulls-cows/skills --skill yy-commit`                  |
| [yy-create-readme](./skills/yy-create-readme/SKILL.md)                     | 创建或更新项目根目录下的 README.md 文件。自动分析项目结构，生成专业、清晰的 README 文档                                          | `npx skills add bulls-cows/skills --skill yy-create-readme`           |
| [yy-create-report](./skills/yy-create-report/SKILL.md)                     | 生成工作报告                                                                                                                     | `npx skills add bulls-cows/skills --skill yy-create-report`           |
| [yy-create-rule](./skills/yy-create-rule/SKILL.md)                         | 创建或更新规则文档，并更新 AGENTS.md 中的引用关系                                                                                | `npx skills add bulls-cows/skills --skill yy-create-rule`             |
| [yy-create-skill](./skills/yy-create-skill/SKILL.md)                       | 创建或更新 Skill（技能）                                                                                                        | `npx skills add bulls-cows/skills --skill yy-create-skill`            |
| [yy-create-wiki](./skills/yy-create-wiki/SKILL.md)                         | 为项目生成结构化的 Wiki 文档                                                                                                     | `npx skills add bulls-cows/skills --skill yy-create-wiki`             |
| [yy-design-ui](./skills/yy-design-ui/SKILL.md)                             | 创建符合国人审美的网页界面设计，专注于简洁、精致、和谐的设计风格，生成可直接使用的前端代码                                       | `npx skills add bulls-cows/skills --skill yy-design-ui`               |
| [yy-distill](./skills/yy-distill/SKILL.md)                                 | 从用户指定的内容中提炼思维方式                                                                                                   | `npx skills add bulls-cows/skills --skill yy-distill`                 |
| [yy-handoff](./skills/yy-handoff/SKILL.md)                                 | 创建或更新项目交接文档 handoff.md，用于跨会话续接当前任务                                                                        | `npx skills add bulls-cows/skills --skill yy-handoff`                 |
| [yy-init](./skills/yy-init/SKILL.md)                                       | 初始化或更新项目的 AGENTS.md 文档                                                                                                | `npx skills add bulls-cows/skills --skill yy-init`                    |
| [yy-lint](./skills/yy-lint/SKILL.md)                                       | 执行代码 lint 检查                                                                                                               | `npx skills add bulls-cows/skills --skill yy-lint`                    |
| [yy-mode-plan](./skills/yy-mode-plan/SKILL.md)                             | 计划优先执行模式，在实施变更前先制定计划                                                                                         | `npx skills add bulls-cows/skills --skill yy-mode-plan`               |
| [yy-mode-spec](./skills/yy-mode-spec/SKILL.md)                             | 规格优先开发模式，在编码前制定详细规格说明                                                                                       | `npx skills add bulls-cows/skills --skill yy-mode-spec`               |
| [yy-optimize](./skills/yy-optimize/SKILL.md)                               | 优化方案生成器，用于代码、架构、流程、文档等各类优化场景。仅输出优化方案供用户选择，不直接执行改动                                | `npx skills add bulls-cows/skills --skill yy-optimize`                |
| [yy-post-to-wechat](./skills/yy-post-to-wechat/SKILL.md)                   | 通过微信公众号 API 将本地 Markdown/HTML 文章发布到公众号草稿箱                                                                  | `npx skills add bulls-cows/skills --skill yy-post-to-wechat`          |
| [yy-read-pdf](./skills/yy-read-pdf/SKILL.md)                               | 读取并解析 PDF 文件内容，提取文本、表格和结构化信息                                                                              | `npx skills add bulls-cows/skills --skill yy-read-pdf`                |
| [yy-refresh](./skills/yy-refresh/SKILL.md)                                 | 刷新 AI 对代码的理解，对比所有改动文件并重新解析关键代码，确保 AI 的上下文与最新代码状态同步                                     | `npx skills add bulls-cows/skills --skill yy-refresh`                 |
| [yy-review](./skills/yy-review/SKILL.md)                                   | 代码审核，审核 git 变动文件的语法错误、逻辑错误、安全漏洞和最佳实践                                                              | `npx skills add bulls-cows/skills --skill yy-review`                  |
| [yy-run-skills](./skills/yy-run-skills/SKILL.md)                           | 串行执行多个技能。技能名称之间支持使用空格、英文逗号(,)、中文逗号(，)、中文顿号(、)作为分隔符                                   | `npx skills add bulls-cows/skills --skill yy-run-skills`              |
| [yy-skills-reverse-analysis](./skills/yy-skills-reverse-analysis/SKILL.md) | 技能逆向解析工程师，将用户提供的技能文件内容逆向还原成完整、可直接使用的系统提示词                                               | `npx skills add bulls-cows/skills --skill yy-skills-reverse-analysis` |
| [yy-wechat-to-markdown](./skills/yy-wechat-to-markdown/SKILL.md)           | 将微信公众号文章链接转换为 Markdown 格式                                                                                         | `npx skills add bulls-cows/skills --skill yy-wechat-to-markdown`      |

#### 特定技能

**注意**：以下技能对目录结构有特定要求：

- 项目需要包含：`src` 目录

代码提交和审核时会自动聚焦于上述目录下的源代码文件，**其他目录的文件不会被处理**。

| 技能                                                                                       | 说明                                                                                                                               | 安装命令                                                                      |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [yy-frontend-commit](./skills/yy-frontend-commit/SKILL.md)                                 | 前端代码提交助手，归纳 src 目录下改动的文件，生成规范的提交信息并自动执行 add 和 commit 操作。支持禁止目录过滤、智能文件选择、冲突检测、多改动分离等功能。注意：禁止执行 push 操作 | `npx skills add bulls-cows/skills --skill yy-frontend-commit`                 |
| [yy-frontend-vue2-code-optimization](./skills/yy-frontend-vue2-code-optimization/SKILL.md) | Vue2 前端代码标准化与优化技能。支持 .vue(Options API)、.js、.css、.scss、.less 文件。Vue3 项目请使用 yy-frontend-vue3-code-optimization | `npx skills add bulls-cows/skills --skill yy-frontend-vue2-code-optimization` |
| [yy-frontend-vue2-review](./skills/yy-frontend-vue2-review/SKILL.md)                       | Vue2 前端代码审核助手，基于 Vue2 开发规范检查组件规范、代码风格、逻辑错误和安全漏洞                                                | `npx skills add bulls-cows/skills --skill yy-frontend-vue2-review`            |
| [yy-frontend-vue3-code-optimization](./skills/yy-frontend-vue3-code-optimization/SKILL.md) | Vue3 前端代码标准化与优化。统一 script setup 结构、BEM 样式、语义化命名、Hooks 规范、async/await、TypeScript 类型、注释增强。支持 .vue .js .jsx .ts .tsx .css .scss .less | `npx skills add bulls-cows/skills --skill yy-frontend-vue3-code-optimization` |
| [yy-frontend-vue3-review](./skills/yy-frontend-vue3-review/SKILL.md)                       | Vue3 前端代码审核助手，审核 Vue3 项目 src 目录下所有改动文件，基于 Vue3 开发规范逐项检查并生成审核清单                             | `npx skills add bulls-cows/skills --skill yy-frontend-vue3-review`            |

### 推荐外部技能

详见 [推荐外部技能](./docs/RECOMMEND_SKILLS.md)。

## 开发者须知

[本地开发调试指南](./docs/DEVELOP.md)。

## 协议

本项目采用 [Apache 2.0](./LICENSE.txt) 开源协议。

## 免责声明

本软件按"原样"（AS-IS）提供，不提供任何明示或暗示的保证，包括但不限于对适销性、特定用途适用性和非侵权性的保证。在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，无论是由于合同、侵权或其他方式引起的，由本软件或其使用或其他交易引起、产生或与之相关的。

使用者应自行承担使用本软件的全部风险。在使用前，请确保充分理解软件的功能和潜在影响，并在当地法律允许的范围内合规使用。
