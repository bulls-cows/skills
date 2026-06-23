# 配置自定义规则

不同 AI 编辑器对“规则”的命名不同，常见名称包括 Rules、Memory、Custom instructions、Context files。建议优先把团队共享规则放在项目目录中，并通过对应工具的官方入口显式配置或引用。

## Claude Code

Claude Code 通过记忆文件加载项目说明，项目级常用入口是 `CLAUDE.md`。

### 推荐配置

在项目根目录创建 `CLAUDE.md`，直接写入规则内容，或使用 `@path/to/import` 引入其他 Markdown 文件：

```markdown
# 项目规则

@.claude/rules/code-style.md
@.claude/rules/testing.md
@.claude/rules/security.md
```

`.claude/rules/` 可以作为规则文件存放目录，但需要在 `CLAUDE.md` 中显式引用。Claude Code 支持递归导入，最多 5 层。

### 参考链接

- [How Claude remembers your project - Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/memory)

## Cline

Cline 支持 Rules，用于让 AI 在项目中遵守固定约束。

### 推荐配置

在项目根目录创建 `.clinerules`，或使用 `.clinerules/` 目录拆分多份规则：

```text
your-project/
├── .clinerules
└── .clinerules/
    ├── code-style.md
    ├── testing.md
    └── security.md
```

单文件适合小项目；目录形式适合把编码规范、测试要求、安全要求分开维护。

### 参考链接

- [Cline Rules](https://docs.cline.bot/features/cline-rules)

## CodeBuddy

CodeBuddy IDE 支持项目规则和用户规则。项目规则存放在代码库中，适合团队共享；用户规则在本机全局生效，适合个人偏好。

### 推荐配置

在项目中使用 `.codebuddy/rules/` 存放项目规则，每条规则对应一个包含 `RULE.mdc` 的文件夹：

```text
your-project/
└── .codebuddy/
    └── rules/
        ├── code-style/
        │   └── RULE.mdc
        ├── testing/
        │   └── RULE.mdc
        └── security/
            └── RULE.mdc
```

`RULE.mdc` 使用 Markdown 格式，可以在 frontmatter 中配置 `description`、`alwaysApply`、`enabled` 等字段。CodeBuddy 规则支持“总是”“智能体请求”“手动”三种应用类型。

如果只需要简单项目说明，也可以在项目根目录创建 `CODEBUDDY.md`。当项目根目录存在 `AGENTS.md` 且不存在 `CODEBUDDY.md` 时，CodeBuddy 会兼容加载 `AGENTS.md`。

创建或修改规则后，需要新建对话会话才能让规则生效。

### 参考链接

- [CodeBuddy Rules](https://www.codebuddy.cn/docs/ide/User-guide/Rules)

## Cursor

Cursor 使用 Rules 为 Agent 提供项目级上下文，推荐把共享规则放在 `.cursor/rules/` 中。

### 推荐配置

在 `.cursor/rules/` 目录下创建 `.mdc` 文件：

```text
your-project/
└── .cursor/
    └── rules/
        ├── code-style.mdc
        ├── testing.mdc
        └── security.mdc
```

`.mdc` 文件可以在 frontmatter 中配置 `alwaysApply`、`description`、`globs` 等字段，用于控制规则是始终生效、由 Agent 按描述选择，还是按文件模式自动附加。

### 参考链接

- [Cursor Rules](https://docs.cursor.com/context/rules)

## Gemini CLI

Gemini CLI 使用上下文文件为模型提供分层项目说明，默认文件名是 `GEMINI.md`。

### 推荐配置

在项目根目录创建 `GEMINI.md`：

```text
your-project/
└── GEMINI.md
```

`GEMINI.md` 适合写项目约束、编码规范、测试命令和注意事项。Gemini CLI 会按层级加载上下文文件，也可以通过配置修改默认上下文文件名。

### 参考链接

- [Gemini CLI Configuration](https://github.com/google-gemini/gemini-cli/blob/main/docs/reference/configuration.md)
- [Gemini CLI Memory Commands](https://github.com/google-gemini/gemini-cli/blob/main/docs/reference/commands.md)

## GitHub Copilot

GitHub Copilot 支持仓库级自定义指令，适合配置团队共享的编码规范。

### 推荐配置

在仓库根目录创建 `.github/copilot-instructions.md`：

```text
your-project/
└── .github/
    └── copilot-instructions.md
```

把项目语言、代码风格、测试要求、提交约定等长期规则写入该文件。它面向支持仓库自定义指令的 Copilot 场景，不等同于所有编辑器插件都会自动读取任意规则目录。

### 参考链接

- [Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)

## OpenAI Codex CLI

Codex CLI 使用 `AGENTS.md` 作为项目自定义指令文件。

### 推荐配置

在项目根目录创建 `AGENTS.md`：

```text
your-project/
└── AGENTS.md
```

如果是大型仓库，可以在子目录继续放置更细粒度的 `AGENTS.md`。更深层目录的说明只作用于对应目录树，适合为不同模块配置不同规则。

### 参考链接

- [Custom instructions with AGENTS.md - Codex](https://developers.openai.com/codex/guides/agents-md)

## OpenCode

OpenCode 支持通过项目配置文件指定要加载的指令文件。

### 推荐配置

在项目根目录创建 `.opencode.json`，通过 `instructions` 字段引用规则文件：

```json
{
  "instructions": ["AGENTS.md", ".opencode/rules/frontend-rules/RULE.md"]
}
```

可以把 OpenCode 专用规则存放在 `.opencode/rules/` 目录下，但目录本身不是自动生效入口，需要在 `.opencode.json` 中显式引用。

### 参考链接

- [OpenCode Config](https://opencode.ai/docs/config/)
- [OpenCode Rules](https://opencode.ai/docs/rules/)

## Roo Code

Roo Code 支持自定义指令，并支持项目级规则文件。

### 推荐配置

优先使用 `.roo/rules/` 目录拆分规则；需要兼容旧项目时，可以继续保留 `.roorules`：

```text
your-project/
├── .roo/
│   └── rules/
│       ├── code-style.md
│       ├── testing.md
│       └── security.md
└── .roorules
```

如果同时存在多种入口，建议在团队内约定一个主入口，避免同一规则重复或冲突。

### 参考链接

- [Roo Code Custom Instructions](https://docs.roocode.com/features/custom-instructions)

## Trae

Trae 支持用户规则与项目规则，适合把个人偏好和团队项目规范分开维护。

### 推荐配置

在 Trae 的 AI Management 中进入 Rules 创建规则。项目规则通常会落到项目内的 `.trae/rules/` 目录或项目规则文件中：

```text
your-project/
└── .trae/
    └── rules/
        └── project_rules.md
```

个人偏好放入用户规则，团队共享规范放入项目规则。Trae 官方文章说明的优先级是：用户输入、Custom Agent prompts、`user_rules.md`、`project_rules.md`。

### 参考链接

- [Best Practices for TRAE Rules](https://www.trae.ai/blog/trae_tutorial_0825?v=1)
- [TRAE Changelog](https://www.trae.ai/changelog)

## Windsurf

Windsurf 的 Cascade 使用 Memories 与 Rules 为 AI 提供持续上下文，项目规则建议放在工作区规则入口中。

### 推荐配置

在项目中使用 `.windsurf/rules/` 存放规则文件：

```text
your-project/
└── .windsurf/
    └── rules/
        ├── code-style.md
        ├── testing.md
        └── security.md
```

如果项目中仍有旧版 `.windsurfrules`，建议按官方说明迁移到 `.windsurf/rules/`。不同版本的 Windsurf 对 Memories 与 Rules 的入口可能不同，团队应以当前客户端的 Rules 设置页为准。

### 参考链接

- [Windsurf Memories & Rules](https://docs.windsurf.com/windsurf/cascade/memories)
