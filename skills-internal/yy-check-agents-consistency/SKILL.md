---
name: yy-check-agents-consistency
description: >
  检查 AGENTS.md 中的通用章节与 yy-init 生成模板的一致性。当交互确认格式、路径格式规范或终端命令能力识别发生改动时使用，确保 yy-init 后续生成的 AGENTS.md 同步包含相同内容。
---

# yy-check-agents-consistency

## 描述

检查项目根目录 `AGENTS.md` 中与通用代理行为相关的章节是否已同步到 `skills/yy-init`，并修复发现的不一致问题。

## 使用场景

- `AGENTS.md` 中的 `路径格式规范` 章节发生改动
- `AGENTS.md` 中的 `终端命令能力识别` 章节发生改动
- `AGENTS.md` 中的 `交互确认格式` 章节发生改动
- 需要确认 `yy-init` 生成的 `AGENTS.md` 是否与当前项目规范保持一致

不应触发：

- 只修改 `AGENTS.md` 中的项目简介、项目结构或关键参考
- 只修改 AI 能力模型内容
- 只检查 README.md、rules/ 或技能列表一致性

## 指令

### 步骤 1. 读取权威来源

- 读取项目根目录 `AGENTS.md`
- 将 `AGENTS.md` 作为通用章节的权威来源
- 提取以下章节的完整内容：
  - `交互确认格式`
  - `路径格式规范`
  - `终端命令能力识别`

### 步骤 2. 读取 yy-init 关联文件

- 读取 `skills/yy-init/SKILL.md`
- 读取 `skills/yy-init/templates/agents-minimal-template.md`
- 读取 `skills/yy-init/examples/output.md`

### 步骤 3. 检查章节清单一致性

检查 `skills/yy-init/SKILL.md` 是否满足以下要求：

- `必须包含的章节` 列表包含 `路径格式规范`
- `必须包含的章节` 列表包含 `终端命令能力识别`
- `必须包含的章节` 列表包含 `交互确认格式`
- `保存并输出结果` 的章节清单包含 `路径格式规范`
- `保存并输出结果` 的章节清单包含 `终端命令能力识别`
- `保存并输出结果` 的章节清单包含 `交互确认格式`

### 步骤 4. 检查模板内容一致性

检查 `skills/yy-init/templates/agents-minimal-template.md` 是否满足以下要求：

- 包含 `路径格式规范` 章节
- 包含 `终端命令能力识别` 章节
- 包含 `交互确认格式` 章节
- 三个章节的正文与 `AGENTS.md` 中对应章节保持一致
- 三个章节位于 `需要遵守的规则` 章节之前

### 步骤 5. 检查示例输出一致性

检查 `skills/yy-init/examples/output.md` 是否满足以下要求：

- 包含 `路径格式规范` 章节
- 包含 `终端命令能力识别` 章节
- 包含 `交互确认格式` 章节
- 三个章节的正文与 `AGENTS.md` 中对应章节保持一致
- 三个章节位于 `需要遵守的规则` 章节之前

### 步骤 6. 修复不一致问题

**决策分支**：

- **yy-init 章节清单缺失**：更新 `skills/yy-init/SKILL.md` 中的必须包含章节和输出章节清单
- **模板章节缺失或内容不一致**：用 `AGENTS.md` 中的权威章节更新 `skills/yy-init/templates/agents-minimal-template.md`
- **示例章节缺失或内容不一致**：用 `AGENTS.md` 中的权威章节更新 `skills/yy-init/examples/output.md`
- **章节顺序不一致**：调整为 `交互确认格式`、`路径格式规范`、`终端命令能力识别`、`需要遵守的规则` 的顺序
- **无不一致问题**：不修改文件

### 步骤 7. 输出结果

输出以下内容：

```markdown
## 检查结果

### 章节清单

- 状态: 通过 / 已修复 / 未通过
- 详情: [具体说明]

### 模板内容

- 状态: 通过 / 已修复 / 未通过
- 详情: [具体说明]

### 示例输出

- 状态: 通过 / 已修复 / 未通过
- 详情: [具体说明]

### 修改文件

- [文件路径和行号]
```

## 注意事项

- 不修改 AI 能力模型内容，相关同步由专用能力模型同步流程处理
- 不修改 `.claude-plugin/marketplace.json`
- 不检查 README.md 中的技能列表一致性
- 只同步 `AGENTS.md` 中指定通用章节到 `skills/yy-init`
