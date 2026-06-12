---
name: yy-check-skills-scripts
description: >
  同步技能源码变更到所有含 scripts/ 子目录的技能项目。当 yy-create-agents、yy-create-readme 或 yy-enable-lint 技能发生变更时触发，
  遍历 skills/ 和 skills-internal/ 目录下所有 scripts/ 子目录，逐个触发对应技能更新项目文件。
---

# yy-check-skills-scripts

## 描述

当 `yy-create-agents`、`yy-create-readme` 或 `yy-enable-lint` 技能源码发生变更时，遍历 `skills/` 和 `skills-internal/` 目录下所有含 `scripts/` 子目录的技能项目，逐个触发对应技能来生成或更新项目文件。

## 使用场景

- `skills/yy-create-agents` 技能发生变更，需要同步更新所有 scripts 项目的 AGENTS.md
- `skills/yy-create-readme` 技能发生变更，需要同步更新所有 scripts 项目的 README.md
- `skills/yy-enable-lint` 技能发生变更，需要同步为所有 scripts 项目添加 lint 支持

不应触发：

- 只是查看技能源码内容
- 技能变更不影响 scripts 项目（如只修改了 description）
- 非 yy-create-agents、yy-create-readme、yy-enable-lint 技能的变更

## 指令

### 步骤 1. 扫描 scripts 目录

遍历 `skills/` 和 `skills-internal/` 目录，找出所有含 `scripts/` 子目录的技能目录：

- 列出 `skills/` 和 `skills-internal/` 下的所有子目录
- 检查每个子目录是否包含 `scripts/` 子目录
- 记录所有符合条件的技能目录路径

### 步骤 2. 检测变更的技能

根据触发上下文，确定哪些技能源码发生了变更：

**决策分支**：

- **yy-create-agents 有变更**：需要对所有 scripts 项目执行 AGENTS.md 生成/更新
- **yy-create-readme 有变更**：需要对所有 scripts 项目执行 README.md 生成/更新
- **yy-enable-lint 有变更**：需要对所有 scripts 项目执行 lint 支持添加
- **多个技能同时有变更**：依次执行对应的同步操作

### 步骤 3. 执行同步操作

对步骤 1 中扫描到的每个 scripts 目录，根据步骤 2 的变更类型执行对应操作：

**yy-create-agents 变更时**：

- 对每个 scripts 目录，触发 `yy-create-agents` 技能
- 目标目录为 scripts 目录所在的技能项目根目录
- 该技能会自动检测并生成/更新 AGENTS.md

**yy-create-readme 变更时**：

- 对每个 scripts 目录，触发 `yy-create-readme` 技能
- 目标目录为 scripts 目录所在的技能项目根目录
- 该技能会自动检测并生成/更新 README.md

**yy-enable-lint 变更时**：

- 对每个 scripts 目录，触发 `yy-enable-lint` 技能
- 目标目录为 scripts 目录所在的技能项目根目录
- 该技能会自动检测并添加 lint 支持

### 步骤 4. 输出结果

```markdown
## 同步结果

### 扫描统计

- skills/ 目录下含 scripts/ 的技能: [数量] 个
- skills-internal/ 目录下含 scripts/ 的技能: [数量] 个

### 同步操作

- yy-create-agents 同步: [已执行 / 跳过]
  - 更新项目: [项目列表]
- yy-create-readme 同步: [已执行 / 跳过]
  - 更新项目: [项目列表]
- yy-enable-lint 同步: [已执行 / 跳过]
  - 更新项目: [项目列表]

### 执行结果

- 成功: [数量] 个项目
- 失败: [数量] 个项目（列出失败原因）
```

## 注意事项

- 只处理包含 `scripts/` 子目录的技能项目
- 同步操作以 scripts 目录所在的技能项目根目录为目标
- 每个 scripts 项目独立触发对应技能，互不影响
- 若某个项目触发失败，记录错误并继续处理其他项目
