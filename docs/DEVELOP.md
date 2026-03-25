# 本地开发调试指南

本仓库有两个目录存放有技能文档：

- `./skills-internal/`: 该目录存放的是私有技能，一般用于维护当前仓库。
- `./skills/`: 该目录存放的是公共技能，对外提供。

如果你是技能开发者，可以通过在本仓库根目录下执行以下命令来调试 `./skills` 目录下的技能：

```bash
npx skills add ./
```

⚠️ **注意**：本地调试会生成以下文件，**不要提交到 Git 仓库**：

- `skills-lock.json` - 已在 `.gitignore` 中配置忽略
- `.agents/skills/` - 已在 `.gitignore` 中配置忽略
