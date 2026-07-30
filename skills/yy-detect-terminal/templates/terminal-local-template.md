# .terminal.local.md

## 用途

- 记录本机终端命令能力，供后续 AI 会话优先复用。
- 本文件只描述当前机器环境，不代表其他开发者环境。

## 更新时间

- YYYY-MM-DD

## 工作目录

- `[使用正斜杠的工作目录路径]`

## Shell 能力

- 检测入口：`[检测入口 shell 名称]`（AI 工具实际用于执行命令的 shell 环境）
- 首选 shell：`[首选 shell 名称]`
- 首选 shell 选择依据：`[拓扑感知选择 / 固定优先级回退]` — `[简要说明选择理由]`
- 备用 shell：`[备用 shell 名称]`（无备用时填写"无"）
- 不可用 shell：`[不可用 shell 名称]`（仅记录已完成存在性判断和启动验证且失败的候选；无法验证的候选写入待确认）
- 待确认 shell：`[待确认 shell 名称]`（无法完成存在性判断或启动验证的候选；无待确认时省略此行）
- `[首选 shell 名称]` 版本：`[版本号]`

## 命令存在性判断

- PowerShell：`Get-Command <command> -ErrorAction SilentlyContinue`
- Bash：`command -v <name>`
- CMD：`where <command>`

## 搜索命令选择

- 文件搜索：优先使用 `rg --files`，不可用时使用 `[按首选 shell 选择降级方案]`。
- 文本搜索：优先使用 `rg`，不可用时使用 `[按首选 shell 选择降级方案]`。

## 已验证工具

- `[工具名称]`

## 后续命令建议

- 使用 `[首选 shell 启动命令]` 执行后续终端命令。
