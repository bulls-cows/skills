# 配置自定义规则

## OpenCode

规则文件需要手动配置才能生效。

将规则文件存放于 `.opencode/rules/` 目录下。

在项目根目录创建 `opencode.json`，添加以下配置：

```json
{
  "instructions": ["AGENTS.md", ".opencode/rules/frontend-rules-vue2/RULE.md"]
}
```

## Claude Code

在 Claude Code 中无需特别配置，只需要在 `CLAUDE.md` 文件中通过 `@path/to/import` 引入规则文件路径即可，被引用的文件中也可以继续使用 `@path/to/import` 引入其他文件（支持最多 5 层递归引用）。

如果你专注于使用 Claude Code 一种编程工具，你可以在 `.claude/rules/` 目录下创建你的规则文件（markdown格式）。注意，你可以在 `rules` 目录下继续创建子目录，claude code 会遍历这些目录里的文件。

```text
your-project/
├── .claude/
│   ├── CLAUDE.md           # Main project instructions
│   └── rules/
│       ├── code-style.md   # Code style guidelines
│       ├── testing.md      # Testing conventions
│       └── security.md     # Security requirements
```

* 参考：[How Claude remembers your project - Claude Code Docs](https://code.claude.com/docs/en/memory)
