# 记忆管理规则

对话启动时自动读取 `.memory/MEMORY.md` 作为核心上下文。
代码提交完成后，执行 [.agents/skills/yy-memory/SKILL.md](./.agents/skills/yy-memory/SKILL.md) 更新记忆。
记忆库位于 `.memory/`（个人私有，已加入 .gitignore）。
