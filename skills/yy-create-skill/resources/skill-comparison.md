# Agent Skill 规范对比分析

---

## 一、标准概览

| 平台 | 定位 | 与开放标准关系 |
|------|------|----------------|
| [agentskills.io](https://agentskills.io) | 跨平台开放标准，由 Anthropic 发起 | **制定者** |
| [Claude Code](https://code.claude.com/docs/en/skills) | 功能最丰富的实现，兼容并大幅扩展标准 | 超集 |
| [Trae](https://docs.trae.ai/ide/skills) | 强调团队知识共享，兼容标准 | 兼容实现 |
| [OpenCode](https://opencode.ai/docs/skills/) | 多路径兼容，细粒度权限控制 | 兼容实现 |

---

## 二、最小有效结构（各平台通用）

```
skill-name/
└── SKILL.md
```

```yaml
---
name: skill-name
description: 描述做什么及何时使用。
---

Markdown 格式的指令内容...
```

---

## 三、agentskills.io 开放规范

**参考**：[Specification](https://agentskills.io/specification)

### 目录结构

```
skill-name/
├── SKILL.md        # 必须
├── scripts/        # 可执行代码
├── references/     # 参考文档
└── assets/         # 模板、静态资源
```

### Frontmatter 字段

| 字段 | 必须 | 约束 |
|------|:----:|------|
| `name` | ✅ | 1-64字符；小写字母/数字/连字符；不可以 `-` 开头或结尾；不含连续 `--`；须与目录名一致 |
| `description` | ✅ | 1-1024字符；描述功能与触发时机 |
| `license` | — | 许可证名称或文件引用 |
| `compatibility` | — | 1-500字符；说明环境依赖（工具、网络等） |
| `metadata` | — | 任意字符串键值对 |
| `allowed-tools` | — | 空格分隔的预授权工具列表（实验性） |

### Body 推荐内容

- 逐步操作指令
- 输入/输出示例
- 常见边界情况

### 渐进式披露原则

| 阶段 | 内容 | Token 建议 |
|------|------|-----------|
| 启动 | 所有 skill 的 `name` + `description` | ~100 |
| 激活 | 完整 `SKILL.md` body | < 5000（建议不超过 500 行） |
| 按需 | `scripts/`、`references/`、`assets/` 中的文件 | 按需加载 |

---

## 四、Claude Code 扩展规范

**参考**：[Extend Claude with skills](https://code.claude.com/docs/en/skills)

### 完整 Frontmatter 字段（含 Claude Code 扩展）

| 字段 | 说明 |
|------|------|
| `name` | Skill 名称，即 `/slash-command` |
| `description` | 强烈推荐；决定 Claude 是否自动触发 |
| `argument-hint` | 自动补全提示，如 `[issue-number]` |
| `disable-model-invocation` | `true` = 仅用户可触发；description 不进入上下文 |
| `user-invocable` | `false` = 仅 Claude 可触发；不显示在 `/` 菜单 |
| `allowed-tools` | 该 skill 激活时预授权工具 |
| `model` | 指定运行模型 |
| `effort` | 思考力度：`low / medium / high / max` |
| `context` | `fork` = 在独立子 Agent 中运行 |
| `agent` | 子 Agent 类型：`Explore / Plan / general-purpose` 或自定义 |
| `hooks` | Skill 生命周期钩子 |

### 扩展特性

**动态上下文注入**（在 skill 加载前执行 shell 命令并注入结果）：

```yaml
---
name: pr-summary
context: fork
agent: Explore
---
PR diff: !`gh pr diff`
Changed files: !`gh pr diff --name-only`
```

**参数替换**：

| 变量 | 说明 |
|------|------|
| `$ARGUMENTS` | 调用时传入的全部参数 |
| `$ARGUMENTS[N]` / `$N` | 按位置索引取参数 |
| `${CLAUDE_SESSION_ID}` | 当前会话 ID |
| `${CLAUDE_SKILL_DIR}` | Skill 目录绝对路径 |

**多级存储路径**（优先级从高到低）：

```
Enterprise  → 管理员配置
Personal    → ~/.claude/skills/<name>/SKILL.md
Project     → .claude/skills/<name>/SKILL.md
Plugin      → <plugin>/skills/<name>/SKILL.md
```

**两种 Skill 类型示例**：

```yaml
# 知识型：Claude 自动加载
---
name: api-conventions
description: API design patterns for this codebase
---

# 任务型：仅用户手动触发，隔离子 Agent 运行
---
name: deploy
description: Deploy to production
disable-model-invocation: true
context: fork
---
```

---

## 五、Trae 规范

**参考**：[Skills - Trae Documentation](https://docs.trae.ai/ide/skills)

### Body 推荐结构

```markdown
---
name: skill-name
description: 说明做什么及何时触发（关键词影响自动触发率）
---

# Skill 名称

## Description
...

## When to use
...

## Instructions
（按功能分节，如 Structure / Styling / State Management）

## Examples（可选）
输入/输出示例
```

### 核心理念

- Skill = **标准化 Prompt 块**，解决每次从零教 AI 的不一致问题
- **全局 skill**（通用规范）+ **项目 skill**（项目特定）分层叠加
- 团队共享 skill 库，更新一处全员同步

---

## 六、OpenCode 规范

**参考**：[Agent Skills - OpenCode](https://opencode.ai/docs/skills/)

### 多路径发现（优先级从高到低）

```
.opencode/skills/<name>/SKILL.md           # 项目专属
~/.config/opencode/skills/<name>/SKILL.md  # 全局
.claude/skills/<name>/SKILL.md             # Claude 兼容路径
~/.claude/skills/<name>/SKILL.md           # Claude 全局兼容
.agents/skills/<name>/SKILL.md             # 通用 Agent 路径
```

### Frontmatter（在开放标准基础上）

```yaml
---
name: git-release
description: Create consistent releases and changelogs
license: MIT
compatibility: opencode
metadata:
  audience: maintainers
---

## What I do
- 行为列表

## When to use me
- 使用场景
```

### 权限配置（`opencode.json`）

```json
{
  "skills": {
    "internal-*": "allow",
    "experimental-*": "ask",
    "dangerous-*": "deny"
  }
}
```

| 权限值 | 行为 |
|--------|------|
| `allow` | 立即加载 |
| `ask` | 加载前询问用户 |
| `deny` | 对 Agent 隐藏并拒绝访问 |

---

## 七、各平台特性对比

| 特性 | agentskills.io | Claude Code | Trae | OpenCode |
|------|:--------------:|:-----------:|:----:|:--------:|
| `name`（必须） | ✅ | ✅ | ✅ | ✅ |
| `description`（必须） | ✅ | 推荐 | ✅ | ✅ |
| 子 Agent 支持 | — | ✅ `context: fork` | — | — |
| 动态上下文注入 | — | ✅ `` !`cmd` `` | — | — |
| 参数替换 | — | ✅ `$ARGUMENTS` | — | — |
| 调用控制（用户/模型） | — | ✅ 双向控制 | — | — |
| 权限配置 | — | ✅ 规则匹配 | — | ✅ `allow/ask/deny` |
| 多级存储路径 | — | ✅ 4级 | 全局/项目 | ✅ 6路径 |
| 跨工具兼容 | ✅ 核心目标 | 兼容标准 | 兼容 | ✅ 多路径兼容 |

---

## 八、最佳实践总结

1. **description 是关键**：直接决定自动触发率，需包含用户自然语言中会出现的关键词。
2. **控制 SKILL.md 体积**：body 建议不超过 500 行，详细内容移至 `references/`。
3. **渐进式组织**：主文件只写核心指令，通过文件引用实现按需加载。
4. **区分触发方式**：有副作用的任务（deploy、commit）应设置 `disable-model-invocation: true`，避免 AI 自动触发。
5. **跨平台兼容**：遵循 agentskills.io 基础字段（`name` + `description`），可在 Claude Code、OpenCode、Trae 等多平台复用。
