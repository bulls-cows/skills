# Handoff 交接文档

## 任务位置

- 项目目录：`C:/workspace/develop/skills`
- 权威文档：`AGENTS.md`、`README.md`
- 当前无 `spec.md`、`tasks.md`、`checklist.md`

## 开工前必读

- `AGENTS.md`：项目规范、目录结构、改动检查规则
- `README.md`：项目说明、技能列表
- `skills/yy-create-skill/SKILL.md`：技能编写规范（验收清单在步骤 7 和 `resources/skill-guide.md`）

## 任务目标

对 `skills/` 和 `skills-internal/` 目录下所有技能执行合规性检查（yy-check-skill-compliance），并根据用户选择逐步修复发现的问题。

## 已确认约束

- 目录命名规范：技能子目录只能使用 `scripts/`、`examples/`、`templates/`、`resources/`、`prompts/`
- 检查标准以 `skills/yy-create-skill` 的验收清单为权威来源
- 修复操作通过调用 `yy-create-skill` 技能完成，不直接修改技能文件（目录重命名除外）
- `references/` 是非规范目录名，应重命名为 `resources/`

## 当前状态

### 已完成

- **合规性检查**：扫描了 42 个技能（skills/ 36 个 + skills-internal/ 6 个），发现 22 个存在问题
- **问题分类**：
  - 非规范目录名 `references/`：4 个技能（已修复）
  - 缺少 `## 描述` 章节：4 个技能（已修复）
  - 缺少 `## 使用场景` 章节：3 个技能（已修复）
  - 指令章节命名不规范：1 个技能（已修复）
  - 指令步骤格式不规范：10 个技能（已修复）
  - description 缺少排除条件：26 个技能
- **已修复并提交**：
  - 4 个技能的 `references/` 目录重命名为 `resources/`（commit `c8571f0`）
  - 4 个技能补充 `## 描述` 和 `## 使用场景` 章节（commit `9b880fa`）
  - 10 个技能统一指令格式规范（commit `4581494`）

### 未完成

- **选项 4**：description 排除条件（26 个技能，建议逐个优化）

## 接力要求

- 继续执行用户选择的修复选项时，优先使用 `yy-create-skill` 技能
- 修改技能前必须先读取现有内容
- 不要自行推断约束，只写入从权威文档或用户明确告知的约束
- 每次修复后按 `AGENTS.md` 的改动检查规则判断是否需要触发其他检查技能

## 建议起步顺序

1. 逐个读取 26 个技能的 description
2. 为每个技能添加排除条件（"不应触发"场景）
3. 修复后使用 yy-commit 提交

## 可直接发给新会话的提示词

```text
我在执行 yy-check-skill-compliance 检查，已完成以下修复：
- 选项 1：4 个技能 references/ 目录重命名（已提交）
- 选项 2：4 个技能补充必需章节（已提交）
- 选项 3：10 个技能指令格式统一（已提交）

剩余问题：
- 选项 4：26 个技能 description 缺少排除条件

请帮我继续修复选项 4。修复时使用 yy-create-skill 的验收清单作为标准，先读取现有 SKILL.md 再修改。每个技能的 description 应包含"不应触发"场景。
```
