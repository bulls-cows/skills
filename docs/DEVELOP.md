# 开发者须知

## 本地开发调试

在大模型对话框里指出 `./skills/` 或者 `./skills-internal/` 目录下的特定技能目录, 告知 AI 将该目录作为技能进行执行即可. 不需要特意安装.

## 常用命令

- `npm run ready`：安装依赖，包括根目录和技能子目录的依赖
- `npm run lint`：执行全量检查（格式化、技能校验、Markdown 规范、类型检查、行尾符、市场配置同步、ESLint）
- `npm run install:skills`：将所有技能安装到全局，使其可在任意项目中使用 (不影响其他安装的全局技能,除非技能重名了)

## 忽略安装特定技能

项目根目录下可创建 `.skillignore` 文件，配置使用 `npm run install:skills` 命令时不希望安装到全局的技能。

文件格式与 `.gitignore` 类似，一行一个技能名（不带路径），支持 `#` 注释和 `*` 通配符，`!` 前缀表示否定（取消忽略）。

文件不存在或为空时不生效。

示例参考项目根目录下的 [`.skillignore.example`](../.skillignore.example) 文件。

该文件已通过 `.gitignore` 忽略，不提交到 Git。

## 自定义安装的 Agent 列表

项目根目录下可创建 `.agentsconfig` 文件，自定义 `npm run install:skills` 命令安装技能时支持的 agent 列表。

文件格式：一行一个 agent 名，支持 `#` 开头的注释，空行会被忽略。

文件存在且读取到的列表非空时，会替代 [`scripts/install-skills.ts`](../scripts/install-skills.ts) 中默认的 `defaultAgents` 数组；文件不存在或内容为空时使用默认列表。

示例参考项目根目录下的 [`.agentsconfig.example`](../.agentsconfig.example) 文件。

该文件已通过 `.gitignore` 忽略，不提交到 Git。

## 本地终端能力记录

项目根目录下的 `.terminal.local.md` 用于记录本机终端命令能力（首选 shell、备用 shell、命令判断方式、搜索工具），供 AI 会话优先复用。

项目根目录下的 AGENTS.md 文件会自动触发对该文件的创建/更新，不依赖人工手动维护。不过你也可以使用 `yy-detect-terminal` 技能主动更新。

注：该文件已通过 `.gitignore` 忽略，不提交到 Git。

## 个人偏好配置

项目根目录下的 `AGENTS.LOCAL.md` 用于存放开发者个人偏好配置（如交互确认格式），仅对当前开发者生效，不影响其他开发者。

AI 执行指令前会自动检查并加载该文件中的内容作为补充规则。

如需创建，可参考项目根目录下的 [`AGENTS.LOCAL.example.md`](../AGENTS.LOCAL.example.md) 示例文件。

注：该文件已通过 `.gitignore` 忽略，不提交到 Git。
