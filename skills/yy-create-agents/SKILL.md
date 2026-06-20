---
name: yy-create-agents
description: >
  创建或更新项目的 AGENTS.md 文档。用于：用户提到"初始化项目"、"创建 AGENTS.md"、"项目规范文档"时触发。
  不用于创建 README、规则文件或其他普通文档，也不用于读取或解释已有项目结构。
---

# yy-create-agents

## 描述

创建或更新项目的 AGENTS.md 文档，确保 AI 助手能够理解项目的规范、范围和结构，并主动应用体系化思考方式。

## 使用场景

- 用户提到"初始化项目"、"初始化 AGENTS.md"
- 用户提到"创建 AGENTS.md"、"生成项目规范文档"
- 用户想要为项目添加 AI 助手指导文档
- 用户提到"项目规范"、"AI 理解项目"

不应触发：

- 用户只是查看 AGENTS.md 内容
- 用户要求创建普通文档（如 README.md）
- 用户要求创建规则文件

## 指令

### 步骤 1. 检查 AGENTS.md 状态

检查项目根目录下是否存在 `AGENTS.md` 文件：

- **不存在**：提示用户将创建新文件，继续执行步骤 2
- **存在**：读取现有内容
  - **默认策略**：补充缺失部分，保留现有内容
  - **用户明确要求"完全重写"**：覆盖生成

### 步骤 2. 收集项目信息

分析项目结构，自动识别以下信息：

- **范围**：识别主要编程语言、允许修改目录（如 src/、tests/）、禁止修改目录（如 dist/、node_modules/）
- **改动检查**：检测常见工程配置文件和已定义脚本，包括 `package.json` 中的 lint、test、build 脚本，以及 `pyproject.toml`、`requirements.txt` 等能表明项目检查方式的配置文件
- **终端能力信息**：检查项目根目录是否存在 `.terminal.local.md`；若目标项目缺少该文件，按“终端能力记录处理要求”处理；不得用一次性终端探测结果替代 `终端命令能力识别` 通用章节
- **项目结构**：分析目录结构，最多 4 级

**决策分支**：

- **能自动识别**：直接使用识别结果
- **无法自动识别**：询问用户核心问题：
  1. 项目主要使用什么编程语言？
  2. 有哪些目录禁止修改？

**终端能力记录处理要求：**

- **目标项目缺少 `.terminal.local.md`，且当前环境可用 `yy-detect-terminal`**：直接触发 `yy-detect-terminal` 技能为目标项目创建本机终端能力记录，再继续生成或更新 `AGENTS.md`
- **目标项目缺少 `.terminal.local.md`，且当前环境不可用 `yy-detect-terminal`**：仅记录缺失状态，继续在 `终端命令能力识别` 章节保留通用创建/更新机制；不得自行固化未验证的终端结论

### 步骤 3. 生成 AGENTS.md

参考 `templates/agents-minimal-template.md` 的结构，根据收集的项目信息生成 AGENTS.md 文档。

**通用章节复用要求：**

- `路径格式规范`、`终端命令能力识别` 属于通用代理行为章节，必须直接复用 `templates/agents-minimal-template.md` 中对应章节的核心内容
- 生成 `终端命令能力识别` 章节时，必须保留 `.terminal.local.md` 优先机制和 `yy-detect-terminal` 创建/更新机制
- 添加或更新 `终端命令能力识别` 章节前，如目标项目缺少 `.terminal.local.md` 且当前环境可用 `yy-detect-terminal`，必须先按步骤 2 直接触发 `yy-detect-terminal` 技能
- 禁止把当前机器、当前 shell、当前编码问题、一次性命令探测结果或临时回退写法替代为 `终端命令能力识别` 章节主体内容
- 如目标项目缺少 `.terminal.local.md` 且当前环境不可用 `yy-detect-terminal`，只能在生成内容中保留”优先使用 `yy-detect-terminal` 创建或更新该文件”的通用说明，不得自行固化未验证的终端结论

**改动检查章节生成要求：**

- `改动检查` 章节必须基于已识别到的工程配置文件和脚本给出当前确定状态，不使用“通常没有”“未识别到”等会暗示后续会话需要重复识别的模糊表述
- 如果存在工程配置文件且定义了 lint、test 或 build 命令，列出具体命令和用途
- 如果不存在常见工程配置文件，写明“当前未包含 `package.json`、`requirements.txt`、`pyproject.toml` 等工程配置文件，因此没有已定义的 lint、test 或 build 命令；如后续新增工程配置文件，应同步更新本节”
- 不要为了补齐检查命令而建议新增工具链或生成临时工程配置文件

**通用生成原则：**

- 生成的 AGENTS.md 中只描述"做什么"（如执行 lint 检查、读取文件内容、安装依赖），不指定"用什么 AI agent 内置工具做"
- 禁止在生成的 AGENTS.md 中出现 `Write 工具`、`Edit 工具`、`Read 工具`、`WebFetch 工具` 等具体工具名；工具选择是 AI agent/编辑器的实现细节，不应写入项目规范文档

**必须包含的章节**：

1. 项目简介
2. 范围
3. 改动检查
4. 交付格式
5. 项目结构
6. 路径格式规范
7. 终端命令能力识别
8. 需要遵守的规则（含本地配置说明，如有规则目录或内联规则也加到这里）
9. 关键参考

### 步骤 4. 保存并输出结果

保存前必须校验生成内容：

- `终端命令能力识别` 章节必须包含 `.terminal.local.md`
- `终端命令能力识别` 章节必须包含 `yy-detect-terminal`
- `终端命令能力识别` 章节必须包含”执行终端命令前，先读取项目根目录下的 `.terminal.local.md`”
- 若上述任一内容缺失，必须先从 `templates/agents-minimal-template.md` 复用对应章节修正后，才能写入 `AGENTS.md`

将内容保存到 `AGENTS.md` 文件中。

**AGENTS.LOCAL.md 初始化：**

- 检查目标项目根目录下是否存在 `.gitignore` 文件
  - **存在**：检查其中是否包含 `AGENTS.LOCAL.md` 条目，若未包含则追加一行 `AGENTS.LOCAL.md`
  - **不存在**：跳过 `.gitignore` 修改
- 检查目标项目根目录下是否存在 `AGENTS.LOCAL.md` 文件
  - **不存在**：从 `templates/AGENTS.LOCAL.example.md` 复制内容创建 `AGENTS.LOCAL.md`
  - **已存在**：跳过，不修改用户现有内容

输出结果：

```text
✓ 已创建/更新 AGENTS.md
✓ 文件路径: [项目根目录]/AGENTS.md
✓ 包含章节: 项目简介, 范围, 改动检查, 交付格式, 项目结构, 路径格式规范, 终端命令能力识别, 需要遵守的规则, 关键参考
✓ AGENTS.LOCAL.md: 已创建 / 已存在（跳过）
✓ .gitignore: 已更新 / 不需要修改
```

## 注意事项

- 使用正斜杠作为路径分隔符，路径包含空格时使用引号包裹，以确保跨平台兼容性和正确解析
- 保持 AGENTS.md 内容精简，具体规则应存放到 `.agents/rules/` 目录
- 若存在规则目录（如 `.agents/rules/`、`.claude/rules/`），在 AGENTS.md 中添加规则引用
- 项目结构说明最多 4 级，重点说明各目录和文件的作用
- 使用中文编写内容（除非项目文档是英文）
- 更新时默认保留现有内容，仅补充缺失部分

## 相关资源

本技能包含以下辅助资源：

- `examples/input.md`：输入示例，展示用户如何请求初始化项目
- `examples/output.md`：输出示例，展示创建或更新后的预期结果
- `templates/agents-minimal-template.md`：AGENTS.md 基础模板
