# bulls-cows/skills

> 面向 AI 编程助手的规则与技能集合，帮助团队统一编码规范、自动化开发流程，让 AI 成为真正的生产力工具。

**解决什么问题：** AI 编程助手的行为不一致、输出质量参差不齐、重复配置成本高。

**适合谁用：** 使用 Claude Code、OpenCode、Trae、CodeBuddy 等 AI 编程工具的开发团队和个人。

## ⭐ 特性

- 🎯 **规则驱动**：通过规则文件统一 AI 行为，确保输出一致性
- 🚀 **即装即用**：40+ 个实用技能覆盖常见开发场景，一键安装
- 🔧 **高度可定制**：支持按项目配置规则，灵活适配不同团队需求
- 📦 **开箱即规范**：内置前端、Git、Markdown 等编码规范，开箱即用
- 🔄 **持续演进**：活跃维护，定期更新技能和规则

## 📚 仓库链接

- GitHub 仓库：[https://github.com/bulls-cows/skills](https://github.com/bulls-cows/skills)
- Gitee 仓库：[https://gitee.com/bulls-cows/skills](https://gitee.com/bulls-cows/skills)

说明：提 issue 请访问 [https://github.com/bulls-cows/skills/issues](https://github.com/bulls-cows/skills/issues)。

## 📦 环境要求

- **Node.js** >= 22.18.0
- **Python** >= 3
- **AI 编程助手**：Claude Code、OpenCode 或其他支持技能的 AI 工具

安装后，在 AI 编程助手中使用 `/` 或 `$` 命令即可调用技能，例如 `/yy-commit`。

## 📋 Rules 规则

[点击这里](https://github.com/bulls-cows/skills/blob/main/docs/CONFIG_RULE.md) 查看如何使用规则文件。

- [rules/ai-agent-rules](https://github.com/bulls-cows/skills/blob/main/rules/ai-agent-rules/RULE.md)：AI 通用操作规范 - 问题分析、变更执行、一致性维护、文本输出的行为准则
- [rules/file-scope-limit](https://github.com/bulls-cows/skills/blob/main/rules/file-scope-limit/RULE.md)：文件修改范围限制规范 - AI 仅允许修改用户授权的目录范围内的文件
- [rules/frontend-rules](https://github.com/bulls-cows/skills/blob/main/rules/frontend-rules/RULE.md)：速查并输出前端开发规范的结构化清单（按 通用 / Vue2 / Vue3 / React 四组技术栈分表，每条规则标注 🔴 基础 / 🟠 强烈推荐 / 🟢 风格指南 三级优先级）。当用户询问前端编码规范、命名/网络/样式/类型写法、Hooks/组件/状态管理最佳实践、性能优化，或需要确认"应该怎么写才对""有什么要求"类问题时使用——即使没说"规范"二字也应触发。不用于：代码修改/重构、代码审查、执行 lint/构建命令、生成业务文档。
- [rules/markdown](https://github.com/bulls-cows/skills/blob/main/rules/markdown/RULE.md)：Markdown 书写规范
- [rules/npm](https://github.com/bulls-cows/skills/blob/main/rules/npm/RULE.md)：NPM 使用规范
- [rules/nuxt4-best-practices](https://github.com/bulls-cows/skills/blob/main/rules/nuxt4-best-practices/RULE.md)：Nuxt 4 项目最佳实践 - 禁用自动导入、显式引入等核心配置规范
- [rules/sass-best-practices](https://github.com/bulls-cows/skills/blob/main/rules/sass-best-practices/RULE.md)：Sass 废弃语法替代方案与现代 Sass 最佳实践

## 🛠️ Skills 技能

提示：

- 推荐使用 `npx skills add` 命令安装技能。关于 `skills` 命令的详细说明，请查看 [官方文档](https://github.com/vercel-labs/skills)
- 该网站收录了大量的技能，可以搜索查找：[The Agent Skills Directory](https://skills.sh/)

### 📦 本仓库技能

执行 `npx skills add bulls-cows/skills` 可安装以下所有技能。

| 技能                                                                                                                              | 说明                                                 | 安装命令                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------- |
| [yy-anti-distill](https://github.com/bulls-cows/skills/blob/main/skills/yy-anti-distill/SKILL.md)                                 | 反蒸馏清洗 Skill 或知识文档                          | `npx skills add bulls-cows/skills --skill yy-anti-distill`                 |
| [yy-comment](https://github.com/bulls-cows/skills/blob/main/skills/yy-comment/SKILL.md)                                           | 为代码补充清晰、必要的注释                           | `npx skills add bulls-cows/skills --skill yy-comment`                      |
| [yy-commit](https://github.com/bulls-cows/skills/blob/main/skills/yy-commit/SKILL.md)                                             | 生成并执行通用规范的 Git 提交                        | `npx skills add bulls-cows/skills --skill yy-commit`                       |
| [yy-commit-directly](https://github.com/bulls-cows/skills/blob/main/skills/yy-commit-directly/SKILL.md)                           | 免确认提交当前全部 Git 改动                          | `npx skills add bulls-cows/skills --skill yy-commit-directly`              |
| [yy-create-agents](https://github.com/bulls-cows/skills/blob/main/skills/yy-create-agents/SKILL.md)                               | 创建或更新项目 AGENTS.md                             | `npx skills add bulls-cows/skills --skill yy-create-agents`                |
| [yy-create-node-script](https://github.com/bulls-cows/skills/blob/main/skills/yy-create-node-script/SKILL.md)                     | 生成 Node.js 脚本项目骨架                            | `npx skills add bulls-cows/skills --skill yy-create-node-script`           |
| [yy-create-prd](https://github.com/bulls-cows/skills/blob/main/skills/yy-create-prd/SKILL.md)                                     | 创建或更新 AI 全栈 Web 项目的 PRD 产品需求文档       | `npx skills add bulls-cows/skills --skill yy-create-prd`                   |
| [yy-create-python-script](https://github.com/bulls-cows/skills/blob/main/skills/yy-create-python-script/SKILL.md)                 | 生成 Python 脚本项目骨架                             | `npx skills add bulls-cows/skills --skill yy-create-python-script`         |
| [yy-create-readme](https://github.com/bulls-cows/skills/blob/main/skills/yy-create-readme/SKILL.md)                               | 创建或完善项目 README 文档                           | `npx skills add bulls-cows/skills --skill yy-create-readme`                |
| [yy-create-report](https://github.com/bulls-cows/skills/blob/main/skills/yy-create-report/SKILL.md)                               | 生成面向管理视角的工作报告                           | `npx skills add bulls-cows/skills --skill yy-create-report`                |
| [yy-create-rule](https://github.com/bulls-cows/skills/blob/main/skills/yy-create-rule/SKILL.md)                                   | 创建或更新项目规则文档                               | `npx skills add bulls-cows/skills --skill yy-create-rule`                  |
| [yy-create-skill](https://github.com/bulls-cows/skills/blob/main/skills/yy-create-skill/SKILL.md)                                 | 创建或更新可复用的 Skill 技能                        | `npx skills add bulls-cows/skills --skill yy-create-skill`                 |
| [yy-create-template-project](https://github.com/bulls-cows/skills/blob/main/skills/yy-create-template-project/SKILL.md)           | 提炼或完善可复用的脱敏模板项目                       | `npx skills add bulls-cows/skills --skill yy-create-template-project`      |
| [yy-create-vue3](https://github.com/bulls-cows/skills/blob/main/skills/yy-create-vue3/SKILL.md)                                   | 快速生成统一结构的 Vue 3 项目骨架                    | `npx skills add bulls-cows/skills --skill yy-create-vue3`                  |
| [yy-design-ui](https://github.com/bulls-cows/skills/blob/main/skills/yy-design-ui/SKILL.md)                                       | 生成符合国人审美的网页界面设计                       | `npx skills add bulls-cows/skills --skill yy-design-ui`                    |
| [yy-detect-terminal](https://github.com/bulls-cows/skills/blob/main/skills/yy-detect-terminal/SKILL.md)                           | 识别并记录本地终端命令能力                           | `npx skills add bulls-cows/skills --skill yy-detect-terminal`              |
| [yy-distill](https://github.com/bulls-cows/skills/blob/main/skills/yy-distill/SKILL.md)                                           | 提炼或重构 AI 能力模型内容                           | `npx skills add bulls-cows/skills --skill yy-distill`                      |
| [yy-enable-lint](https://github.com/bulls-cows/skills/blob/main/skills/yy-enable-lint/SKILL.md)                                   | 为项目接入 npm lint 流程                             | `npx skills add bulls-cows/skills --skill yy-enable-lint`                  |
| [yy-enable-memory](https://github.com/bulls-cows/skills/blob/main/skills/yy-enable-memory/SKILL.md)                               | 一键启用项目分层记忆管理系统，生成规则、技能和记忆库 | `npx skills add bulls-cows/skills --skill yy-enable-memory`                |
| [yy-frontend-change-log](https://github.com/bulls-cows/skills/blob/main/skills/yy-frontend-change-log/SKILL.md)                   | 为前端文件补充业务说明与改动记录                     | `npx skills add bulls-cows/skills --skill yy-frontend-change-log`          |
| [yy-frontend-code-refine](https://github.com/bulls-cows/skills/blob/main/skills/yy-frontend-code-refine/SKILL.md)                 | 清理并规范前端代码结构与命名                         | `npx skills add bulls-cows/skills --skill yy-frontend-code-refine`         |
| [yy-frontend-refactor-scaffold](https://github.com/bulls-cows/skills/blob/main/skills/yy-frontend-refactor-scaffold/SKILL.md)     | 生成前端重构方案与占位骨架                           | `npx skills add bulls-cows/skills --skill yy-frontend-refactor-scaffold`   |
| [yy-frontend-review](https://github.com/bulls-cows/skills/blob/main/skills/yy-frontend-review/SKILL.md)                           | 审核前端代码改动的质量问题                           | `npx skills add bulls-cows/skills --skill yy-frontend-review`              |
| [yy-frontend-style-bem-optimizer](https://github.com/bulls-cows/skills/blob/main/skills/yy-frontend-style-bem-optimizer/SKILL.md) | 统一前端 BEM 类名与样式结构                          | `npx skills add bulls-cows/skills --skill yy-frontend-style-bem-optimizer` |
| [yy-handoff](https://github.com/bulls-cows/skills/blob/main/skills/yy-handoff/SKILL.md)                                           | 创建或更新项目交接文档                               | `npx skills add bulls-cows/skills --skill yy-handoff`                      |
| [yy-learn-project](https://github.com/bulls-cows/skills/blob/main/skills/yy-learn-project/SKILL.md)                               | 阅读陌生代码库，生成带源码路径的学习文档             | `npx skills add bulls-cows/skills --skill yy-learn-project`                |
| [yy-lint](https://github.com/bulls-cows/skills/blob/main/skills/yy-lint/SKILL.md)                                                 | 执行项目 lint 检查                                   | `npx skills add bulls-cows/skills --skill yy-lint`                         |
| [yy-mode-goal](https://github.com/bulls-cows/skills/blob/main/skills/yy-mode-goal/SKILL.md)                                       | 条件驱动的自主执行模式                               | `npx skills add bulls-cows/skills --skill yy-mode-goal`                    |
| [yy-mode-plan](https://github.com/bulls-cows/skills/blob/main/skills/yy-mode-plan/SKILL.md)                                       | 在实施前先制定并确认执行计划                         | `npx skills add bulls-cows/skills --skill yy-mode-plan`                    |
| [yy-mode-spec](https://github.com/bulls-cows/skills/blob/main/skills/yy-mode-spec/SKILL.md)                                       | 在编码前先制定详细规格说明                           | `npx skills add bulls-cows/skills --skill yy-mode-spec`                    |
| [yy-optimize](https://github.com/bulls-cows/skills/blob/main/skills/yy-optimize/SKILL.md)                                         | 输出可选的优化方案                                   | `npx skills add bulls-cows/skills --skill yy-optimize`                     |
| [yy-post-to-wechat](https://github.com/bulls-cows/skills/blob/main/skills/yy-post-to-wechat/SKILL.md)                             | 将本地文章发布到微信公众号草稿箱                     | `npx skills add bulls-cows/skills --skill yy-post-to-wechat`               |
| [yy-read-pdf](https://github.com/bulls-cows/skills/blob/main/skills/yy-read-pdf/SKILL.md)                                         | 读取并解析 PDF 文档内容                              | `npx skills add bulls-cows/skills --skill yy-read-pdf`                     |
| [yy-read-project](https://github.com/bulls-cows/skills/blob/main/skills/yy-read-project/SKILL.md)                                 | 快速梳理项目结构、职责与技术边界                     | `npx skills add bulls-cows/skills --skill yy-read-project`                 |
| [yy-read-xlsx](https://github.com/bulls-cows/skills/blob/main/skills/yy-read-xlsx/SKILL.md)                                       | 读取并解析 Excel 表格内容                            | `npx skills add bulls-cows/skills --skill yy-read-xlsx`                    |
| [yy-refresh](https://github.com/bulls-cows/skills/blob/main/skills/yy-refresh/SKILL.md)                                           | 刷新 AI 对当前代码的最新理解                         | `npx skills add bulls-cows/skills --skill yy-refresh`                      |
| [yy-review](https://github.com/bulls-cows/skills/blob/main/skills/yy-review/SKILL.md)                                             | 审核代码改动中的质量问题                             | `npx skills add bulls-cows/skills --skill yy-review`                       |
| [yy-run-skills](https://github.com/bulls-cows/skills/blob/main/skills/yy-run-skills/SKILL.md)                                     | 按顺序串行执行多个技能                               | `npx skills add bulls-cows/skills --skill yy-run-skills`                   |
| [yy-skill-to-prompt](https://github.com/bulls-cows/skills/blob/main/skills/yy-skill-to-prompt/SKILL.md)                           | 将技能文件转换为系统提示词                           | `npx skills add bulls-cows/skills --skill yy-skill-to-prompt`              |
| [yy-vitepress](https://github.com/bulls-cows/skills/blob/main/skills/yy-vitepress/SKILL.md)                                       | 处理 VitePress 2 文档的特殊语法与格式约定            | `npx skills add bulls-cows/skills --skill yy-vitepress`                    |
| [yy-wechat-to-markdown](https://github.com/bulls-cows/skills/blob/main/skills/yy-wechat-to-markdown/SKILL.md)                     | 将微信公众号文章转换为 Markdown                      | `npx skills add bulls-cows/skills --skill yy-wechat-to-markdown`           |
| [yy-write](https://github.com/bulls-cows/skills/blob/main/skills/yy-write/SKILL.md)                                               | 撰写技术文章或经验总结类长文                         | `npx skills add bulls-cows/skills --skill yy-write`                        |

### 🌐 推荐外部技能

详见 [推荐外部技能](https://github.com/bulls-cows/skills/blob/main/docs/RECOMMEND_SKILLS.md)。

## 👨‍💻 开发者须知

[开发者须知](https://github.com/bulls-cows/skills/blob/main/docs/DEVELOP.md)。

## 📄 协议

本项目采用 [Apache 2.0](https://github.com/bulls-cows/skills/blob/main/LICENSE) 开源协议。

## ⚠️ 免责声明

本软件按"原样"（AS-IS）提供，不提供任何明示或暗示的保证，包括但不限于对适销性、特定用途适用性和非侵权性的保证。在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，无论是由于合同、侵权或其他方式引起的，由本软件或其使用或其他交易引起、产生或与之相关的。

使用者应自行承担使用本软件的全部风险。在使用前，请确保充分理解软件的功能和潜在影响，并在当地法律允许的范围内合规使用。
