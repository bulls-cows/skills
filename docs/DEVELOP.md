# 本地开发调试技能

如果你是技能开发者，可以通过在项目根目录下（本仓库）执行以下命令来本地调试仓库里的技能：

```bash
npx skills add ./
```

⚠️ **注意**：本地调试会生成以下文件，**不要提交到 Git 仓库**：

- `skills-lock.json` - 已在 `.gitignore` 中配置忽略
- `.agents/skills/` - 已在 `.gitignore` 中配置忽略
