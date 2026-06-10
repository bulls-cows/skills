---
name: yy-sync-capability-model
description: >
  同步维护"AI 能力模型"在多个文件中的一致性。当需要新增、修改或删除 AI 能力模型时触发，
  确保变更同步到所有关联文件。
---

# yy-sync-capability-model

## 描述

同步维护"AI 能力模型"在多个文件中的一致性，确保变更同步到所有关联文件。

## 使用场景

- 需要新增、修改或删除 AI 能力模型
- 需要确保能力模型变更同步到所有关联文件

不应触发：

- 只是查看 AI 能力模型内容
- 修改与能力模型无关的章节

## 关联文件

"AI 能力模型"分布在以下 3 处，修改时必须同步：

- `AGENTS.md`（`## AI 能力模型` 章节）— 权威来源
- `skills/yy-create-agents/templates/agents-minimal-template.md`（`## AI 能力模型` 章节）— 模板副本，内容应与 AGENTS.md 完全一致
- `skills/yy-optimize/SKILL.md`（步骤 2、3）— 适配版本，将能力模型转化为具体分析方法

## 同步规则

### AGENTS.md 与模板文件

两者的 `## AI 能力模型` 章节内容必须完全一致（逐字匹配）。

### yy-optimize 与权威来源

yy-optimize 中是能力模型的**应用适配**，非直接复制。同步检查标准：

- 权威来源中的每个能力模型，在 yy-optimize 中应有对应的分析方法
- 权威来源新增能力模型时，评估是否需要在 yy-optimize 中新增对应方法
- 权威来源删除能力模型时，yy-optimize 中对应方法应同步移除

## 指令

### 步骤 1. 确定变更内容

**决策分支**：

- **用户明确指定**：按用户指定的新增、修改或删除操作执行
- **用户未明确指定**：询问具体变更内容

### 步骤 2. 更新权威来源

- 修改 `AGENTS.md` 的 `## AI 能力模型` 章节

### 步骤 3. 同步模板文件

- 将 `AGENTS.md` 的 `## AI 能力模型` 章节完整复制到 `skills/yy-create-agents/templates/agents-minimal-template.md` 对应位置

### 步骤 4. 同步 yy-optimize

**决策分支**：

- **新增能力模型**：评估是否适合嵌入 yy-optimize 的分析步骤，适合则新增对应方法
- **修改能力模型**：检查 yy-optimize 中对应方法是否需要同步调整
- **删除能力模型**：移除 yy-optimize 中对应的方法

### 步骤 5. 验证一致性

- 确认 AGENTS.md 与模板文件的 AI 能力模型章节内容一致
- 确认 yy-optimize 中的方法与权威来源的能力模型对应关系正确

### 步骤 6. 输出结果

```markdown
## 同步结果

### 变更内容

- [新增/修改/删除]：[能力模型名称]

### 已更新文件

- AGENTS.md: [具体变更]
- skills/yy-create-agents/templates/agents-minimal-template.md: [具体变更]
- skills/yy-optimize/SKILL.md: [具体变更 / 无需变更]

### 一致性验证

- AGENTS.md ↔ 模板文件: ✅ 一致 / ❌ 不一致
- AGENTS.md ↔ yy-optimize: ✅ 对应关系正确 / ❌ 缺少对应
```
