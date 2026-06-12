# AI 编码助手集成指南

本技能可集成到 AI 编码助手中，在提交代码前自动为变更文件生成业务说明和变更记录。

## OpenCode 集成

### 方式一：通过 instructions 自动触发（推荐）

在 `.opencode.json` 的 `instructions` 中添加提示，使 AI 在提交前自动调用本技能：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": [
    "提交前端代码前，先使用 yy-frontend-change-log 技能为变更文件生成业务说明和变更记录。"
  ]
}
```

### 方式二：通过 command 注册快捷命令

在 `.opencode.json` 中注册自定义命令，方便手动触发：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "command": {
    "changelog": {
      "description": "为变更的前端文件生成业务说明和变更记录",
      "prompt": "使用 yy-frontend-change-log 技能，为当前变更的前端文件生成业务说明和变更记录"
    }
  }
}
```

配置后，在 OpenCode 中输入 `/changelog` 即可触发。

### 方式三：配合 yy-commit 技能联动

如果项目已安装 `yy-commit` 提交技能，可在 instructions 中配置联动：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": [
    "提交前端代码前，先使用 yy-frontend-change-log 技能生成变更记录，再使用 yy-commit 技能提交。"
  ]
}
```

## Claude Code 集成

在项目 `.claude/settings.json` 中添加：

```json
{
  "hooks": {
    "PreCommit": [
      {
        "type": "command",
        "command": "使用 yy-frontend-change-log 技能为变更的前端文件生成业务说明和变更记录"
      }
    ]
  }
}
```

## Cursor 集成

### 方式一：项目规则（推荐）

在 `.cursor/rules/` 目录下创建 `changelog.mdc` 文件：

```markdown
---
description: 提交前端代码前生成变更记录
globs:
  - 'src/**/*.{vue,js,jsx,ts,tsx}'
  - '**/*.{css,scss,less}'
alwaysApply: false
---

## 提交前规则

提交前端代码前，必须先为变更的 .vue / .js / .jsx / .ts / .tsx / .css / .scss / .less 文件生成业务说明和变更记录，注释块追加到文件顶部，格式参考 yy-frontend-change-log 技能。
```

- `description`：规则描述，Cursor 根据此判断是否应用
- `globs`：文件匹配模式，仅当前端文件变更时触发
- `alwaysApply`：设为 `false`，按需触发而非全局生效

### 方式二：旧版 `.cursorrules`

在项目根目录创建 `.cursorrules` 文件（已逐步废弃，建议迁移到方式一）：

```markdown
提交前端代码前，必须先为变更的 .vue / .js / .jsx / .ts / .tsx 文件生成业务说明和变更记录，注释块追加到文件顶部，格式参考 yy-frontend-change-log 技能。
```

## 注意事项

- AI 助手执行技能需要确保技能已安装且可用
- 每次提交前执行可能增加交互轮次，建议根据团队习惯选择自动或手动触发
- 生成注释后需将文件变更加入暂存区，否则注释块不会被包含在本次提交中
