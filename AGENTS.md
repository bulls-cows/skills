# AGENTS.md

## 项目简介

- 本仓库维护实用的规则和 AI 技能
- 这是一个 npm 项目，根目录有 package.json
- 技能是主要产出物，每个技能都是独立的 SKILL.md

## 范围

- 本仓库默认语言: Markdown, JSON
- 允许修改目录: .claude-plugin/, scripts/, docs/, rules/, skills/, AGENTS.md, README.md
- 禁止修改目录: 无

## 改动检查

**改动后按条件执行:**

- 如果改动涉及 `交互确认格式`、`路径格式规范` 或 `终端命令能力识别` 的调整，执行技能 [@skills-internal/yy-check-agents-consistency/SKILL.md](./skills-internal/yy-check-agents-consistency/SKILL.md)
- 如果 `.opencode.json` 文件有改动，执行技能 [@skills-internal/yy-sync-instructions-from-opencode/SKILL.md](./skills-internal/yy-sync-instructions-from-opencode/SKILL.md)
- 如果 `rules/` 目录下的文件有改动，执行技能 [@skills-internal/yy-check-rules-consistency/SKILL.md](./skills-internal/yy-check-rules-consistency/SKILL.md)
- 当有技能名的变更、技能描述的变更、技能的增删时，执行技能 [@skills-internal/yy-check-skills-consistency/SKILL.md](./skills-internal/yy-check-skills-consistency/SKILL.md)

**改动后提示用户是否执行（默认不执行）:**

- 执行 `npm run lint` 检测代码和文档

## 交付格式

- 修改后先说明修改原因和影响范围
- 所有文件引用都要带路径和行号
- 对于技能变更，说明变更后对用户的影响

## 交互确认格式

- 当需要用户确认、取消或从多个选项中选择时，必须以编号列表给出选项，并说明每个编号的含义
- 用户可只回复编号完成选择，不要求输入完整选项文案
- 二元对立选项默认使用 `1` 表示肯定意义的选项，使用 `0` 表示否定意义的选项
- 示例：`1. 确认提交`、`0. 暂不提交`

## 项目结构

- `skills/`：对外发布的所有技能的根目录
- `skills-internal/`：内部技能目录，不对外发布
- `rules/`：自定义规则目录
- `scripts/`：构建脚本目录
- `docs/`：项目文档目录
- `types/`：TypeScript 类型定义目录(不适用于 `skills/` 和 `skills-internal/` 目录下的脚本)
- `.claude-plugin/`：claude code 插件市场配置目录
  - `marketplace.json`：技能市场配置文件，定义插件和技能分组
- `README.md`：项目说明文档
- `AGENTS.md`：AI 代理的项目规范说明文档
- `LICENSE.txt`：开源许可证文件

## 路径格式规范

- 在文档中提及文件路径时，优先使用相对路径，以保持跨设备下的通用性
- 在终端中提及文件路径时，优先使用绝对路径，以方便终端/IDE 将其识别为可点击的链接
- 使用正斜杠作为路径分隔符，路径包含空格时使用引号包裹，以确保跨平台兼容性和正确解析

## 终端命令能力识别

执行终端命令前，先读取项目根目录下的 `.terminal.local.md`，并优先使用其中记录的已验证 shell 启动入口、命令可用性和命令写法。

- 在读取 `.terminal.local.md` 前，优先使用 Agent 原生文件读取能力；若不可用，则直接使用 `node` 进程读取文件内容，不通过 shell 包装。
- 只有原生读取与 `node` 读取均不可用时，才按固定优先级执行最小 shell 读取探测；该阶段只用于判断文件是否存在并读取内容，不代表终端能力结论。
- 如果 `.terminal.local.md` 不存在、内容为空或记录与实际执行结果不一致，优先使用 `yy-detect-terminal` 技能创建或更新该文件。
- 如果 `yy-detect-terminal` 技能不可用，使用最小化本地回退规则：先确认可用 shell，再确认命令存在性判断方式，最后记录首选 shell、备用 shell、不可用 shell 和搜索命令选择。
- `.terminal.local.md` 只描述本机环境，不代表其他开发者环境；发现记录失效时应立即更新。

## 需要遵守的规则

- 中文是主要语言，描述和文档使用中文
- 无论用户使用何种语言提问，请始终使用简体中文进行解释和回答
- 除非用户明确要求提交。否则禁止你使用git
- 在输出最终结果前，请务必进行自我审查：你是否对既定的术语、格式或规则描述进行了任何形式的同义替换、过度解释或冗余补充？如果是，请立即撤回修改，严格保持原始定义不变。
- 不要手动修改 marketplace.json，由 `scripts/sync-marketplace.ts` 自动生成
- 增删或更新 npm 依赖时，禁止直接手动修改 `package.json` 和 `package-lock.json`；必须执行 `npm install`、`npm uninstall`、`npm update` 等 npm 命令，由 npm 自动更新相关文件
- 修改 `package.json` 中的 npm 脚本时，优先使用 `npm pkg set` 等 npm 命令，由 npm 自动更新文件
- [文件修改范围限制规范 @rules/file-scope-limit/RULE.md](./rules/file-scope-limit/RULE.md)
- [Markdown书写规范 @rules/markdown/RULE.md](./rules/markdown/RULE.md)
- [文本表达规范 @rules/text/RULE.md](./rules/text/RULE.md)
- [AI 通用操作规范 @rules/ai-agent-rules/RULE.md](./rules/ai-agent-rules/RULE.md)：分析问题、执行变更、维护一致性时遵守

## 关键参考

- `skills/yy-review/SKILL.md` - 代码质量检查工作流
- `skills/yy-git-commit/SKILL.md` - Git 提交约定
- `skills/yy-lint/SKILL.md` - 代码风格检查工作流
- `skills/yy-create-skill/SKILL.md` - 技能创建指南
- `scripts/sync-marketplace.ts` - 技能市场配置同步脚本
- `.claude-plugin/marketplace.json` - 技能市场配置
- `.editorconfig` - 通用编辑器配置文件, 编写内容时需遵循
- `README.md` - 项目说明文档
