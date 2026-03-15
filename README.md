# bulls-cows/skills

本仓库内部维护了一些好用的技能，并同步了外部社区的一些实用技能。

- GitHub 仓库：[https://github.com/bulls-cows/skills](https://github.com/bulls-cows/skills)
- Gitee 仓库：[https://gitee.com/bulls-cows/skills](https://gitee.com/bulls-cows/skills)

## 项目结构

- `skills/`：所有技能的根目录
- `rules/`：自定义规则目录
- `.opencode/`：OpenCode 配置文件目录
  - `rules/`：规则定义文件（需在 Opencode.json 中配置）
- `.claude-plugin/`：插件市场配置目录
  - `marketplace.json`：技能市场配置文件，定义插件和技能分组
- `README.md`：项目说明文档
- `AGENTS.md`：AI 代理的项目规范说明文档
- `LICENSE.txt`：开源许可证文件

## 使用说明

### 在 Claude Code 中使用

1. 先在终端执行 `claude` 进入 `claude code` 交互模式
2. 输入 `/plugin` 命令并回车
3. 通过方向键切换到 `Marketplaces` tab 下
4. 首次添加仓库，需要选中 `+ Add Marketplace`，并回车，然后输入 `bulls-cows/skills` 再次回车
5. 选中 `Marketplaces` 列表里的名为 `open-skills` 的插件市场，并回车
6. 从列表里选中需要安装的插件，并回车
7. 重启终端或者 `claude code` 衍生插件，通过 `/<技能名>`（如 `/commit`）就可以召唤技能了！

## Rules

### 规则列表

- [rules/frontend-rules-vue2](./rules/frontend-rules-vue2/RULE.md)：AgentM 前端 Vue2 项目开发规范，包含代码风格、组件规范、API 规范等

### 配置自定义规则

#### Claude Code

请自行检索 Claude Code 配置自定义规则的方法。

#### OpenCode

在项目根目录创建 `Opencode.json`，添加以下配置：

```json
{
  "instructions": ["AGENTS.md", ".opencode/rules/frontend-rules-vue2/RULE.md"]
}
```

规则文件存放于 `.opencode/rules/` 目录下。

## Skills

### 本仓库技能

- [commit](./skills/commit/SKILL.md)：帮助用户创建规范的 Git 提交
- [create-readme](./skills/create-readme/SKILL.md)：创建或更新项目根目录下的 README.md 文件
- [create-rule](./skills/create-rule/SKILL.md)：创建或更新规则文档，并更新 AGENTS.md 中的引用关系
- [create-skill](./skills/create-skill/SKILL.md)：创建或更新规范的 Claude Skill
- [design-ui](./skills/design-ui/SKILL.md)：创建符合国人审美的网页界面设计，专注于简洁、精致、和谐的设计风格
- [init](./skills/init/SKILL.md)：初始化项目 AGENTS.md 文档，用于指导 AI 助手理解项目规范、范围和结构
- [frontend-weekly-report](./skills/frontend-weekly-report/SKILL.md)：自动读取 git 提交记录，按功能开发、代码优化、问题修复等分类归纳，生成结构化周报
- [lint](./skills/lint/SKILL.md)：执行代码质量检查，包括 Node 版本验证和 lint 检查
- [lint-and-commit](./skills/lint-and-commit/SKILL.md)：自动执行代码质量检查后提交代码的组合技能
- [plan](./skills/plan/SKILL.md)：计划优先执行模式，要求在做出任何变更前必须获得用户确认
- [read-pdf](./skills/read-pdf/SKILL.md)：读取并解析 PDF 文件内容，提取文本、表格和结构化信息
- [spec](./skills/spec/SKILL.md)：规格优先开发模式，要求在实施前完成详细文档编写

### 推荐外部技能

以下技能来自外部仓库，使用 `npx skills add` 命令安装：

#### 前端开发

| 技能 | 说明 | 安装命令 |
| ---- | ---- | -------- |
| frontend-design | 网页 / 移动端界面设计、布局、样式、交互逻辑、前端视觉方案 | `npx skills add https://github.com/anthropics/skills --skill frontend-design` |
| web-design-guidelines | 色彩、字体、间距、响应式、组件规范、设计系统输出 | `npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines` |
| ui-ux-pro-max | 高保真界面设计、用户体验流程、交互原型、可用性优化 | `npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max` |
| canvas-design | 基于 Canvas 实现可视化、图表、动画、海报生成、交互式图形 | `npx skills add https://github.com/anthropics/skills --skill canvas-design` |
| vue-skills | Vue3 前端开发全套技术能力 | （暂无外部仓库） |
| vercel-react-best-practices | Vercel 官方 React/Next.js 最佳实践 | `npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices` |
| vercel-composition-patterns | Vercel 官方 React 组件组合模式 | `npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-composition-patterns` |

#### 浏览器与自动化

| 技能 | 说明 | 安装命令 |
| ---- | ---- | -------- |
| agent-browser | 自动模拟浏览器行为、网页抓取、页面交互、自动化测试 | `npx skills add https://github.com/vercel-labs/agent-browser --skill agent-browser` |

#### 网站分析

| 技能 | 说明 | 安装命令 |
| ---- | ---- | -------- |
| audit-website | 对网站做整体检测：性能、SEO、安全、兼容性、加载速度、错误排查 | `npx skills add https://github.com/squirrelscan/skills --skill audit-website` |
| seo-audit | 关键词、标题、描述、外链、收录、排名、流量优化分析 | `npx skills add https://github.com/coreyhaines31/marketingskills --skill seo-audit` |

#### 营销与内容

| 技能 | 说明 | 安装命令 |
| ---- | ---- | -------- |
| copywriting | 自动生成营销文案、广告语、推文、标题、短视频文案、宣传稿 | `npx skills add https://github.com/coreyhaines31/marketingskills --skill copywriting` |
| social-content | 小红书、抖音、微博、朋友圈等平台文案 / 脚本 / 选题 | `npx skills add https://github.com/coreyhaines31/marketingskills --skill social-content` |

#### 工具与效率

| 技能 | 说明 | 安装命令 |
| ---- | ---- | -------- |
| find-skills | 根据需求自动匹配、推荐合适的技能、工具、能力模块 | `npx skills add https://github.com/vercel-labs/skills --skill find-skills` |
| skill-creator | 自定义生成新技能、配置流程、搭建专属工具 / 能力 | `npx skills add https://github.com/anthropics/skills --skill skill-creator` |
| planning-with-files | 结合文档 / 文件做项目规划、排期、流程设计、方案输出 | `npx skills add https://github.com/othmanadi/planning-with-files --skill planning-with-files` |
| superpowers | 整合多项高级能力：多任务、复杂推理、跨领域处理、增强版输出 | `npx skills add https://github.com/obra/superpowers --skill brainstorming` |

## 协议

本项目采用 [Apache 2.0](./LICENSE.txt) 开源协议。

## 免责声明

本软件按"原样"（AS-IS）提供，不提供任何明示或暗示的保证，包括但不限于对适销性、特定用途适用性和非侵权性的保证。在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，无论是由于合同、侵权或其他方式引起的，由本软件或其使用或其他交易引起、产生或与之相关的。

使用者应自行承担使用本软件的全部风险。在使用前，请确保充分理解软件的功能和潜在影响，并在当地法律允许的范围内合规使用。
