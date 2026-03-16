# 配置自定义规则

规则文件需要手动配置才能生效。

## OpenCode

将规则文件存放于 `.opencode/rules/` 目录下。

在项目根目录创建 `opencode.json`，添加以下配置：

```json
{
  "instructions": ["AGENTS.md", ".opencode/rules/frontend-rules-vue2/RULE.md"]
}
```
