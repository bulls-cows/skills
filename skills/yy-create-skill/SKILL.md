---
name: yy-create-skill
description: >
  创建或更新 Skill（技能）。用于：用户想要创建新技能、更新现有技能、需要把某个工作流程标准化为技能、想把某个功能打包成可复用的技能。
---

# yy-create-skill

帮助用户创建或更新规范的 Skill。

## 描述

帮助用户创建或更新符合规范的 Skill 技能文件，包含完整的目录结构、YAML 元数据和可执行的指令步骤。

## 使用场景

- 用户想要创建新技能
- 用户想要更新现有技能
- 用户需要把某个工作流程标准化为技能
- 用户想把某个功能打包成可复用的技能

不应触发：

- 用户只是询问技能是什么
- 用户要求创建普通文件
- 用户要求创建规则文件（应使用 yy-create-rule）

## 创建/更新流程

### 1. 捕获意图

首先理解用户的需求，确定是创建新技能还是更新现有技能。

对于**创建新技能**，询问以下问题：

1. 这个技能应该让 AI 助手能做什么？
2. 何时应触发这个技能？（什么用户短语/上下文）
3. 预期的输出格式是什么？
4. 是否有不想触发的情况？

对于**更新现有技能**，先读取现有 SKILL.md 内容，然后询问：

1. 想要更新技能的哪些部分？（描述、使用场景、指令、示例等）
2. 更新后的预期行为是什么？

### 2. 确定技能目录

- **创建新技能**：使用小写、短横线分隔的命名方式，遵循以下原则：
  - **名词使用单数形式**：如 `create-skill` 而非 `create-skills`
  - **优先动宾结构**：如 `create-skill`、`read-pdf`、`lint-code` 而非 `skills-creator`、`pdf-reader`

- **更新现有技能**：直接使用现有技能目录

命名规范详见 `resources/skill-best-practices.md`。

### 3. 编写 SKILL.md

SKILL.md 的编写原则和模板请参考 `templates/skill-template.md`。

**交互设计原则**：减少不必要的交互轮次，默认采用最常见策略。详见 `resources/skill-best-practices.md` 中的"交互设计原则"章节。

其中 `description` 只用于给 AI 判断是否触发技能：

- 只写技能用途和触发场景
- 保持简短，避免堆叠步骤、规则、例外和实现细节
- 具体约束写在正文，如使用场景、指令、示例
- 如果 `description` 已经开始解释"怎么做"，通常说明写宽了

### 4. 创建/更新目录结构

**创建新技能**的目录规则：

- 如果用户指定了目录，则在用户指定目录下生成技能
- 如果用户未指定目录，则在 `.agents/skills` 目录下生成（没有该目录则创建）

目录结构规范详见 `resources/skill-best-practices.md`。

### 5. 验收清单

详细验收清单见 `resources/skill-best-practices.md`。

## 相关资源

本技能包含以下辅助资源：

- `examples/input.md`：输入示例，展示用户如何请求创建技能
- `examples/output.md`：输出示例，展示创建技能后的预期结果
- `templates/skill-template.md`：基础技能模板
- `resources/skill-writing-guide.md`：技能编写指南（命名规范、YAML 语法、章节编写原则）
- `resources/skill-best-practices.md`：技能编写最佳实践（交互设计、常见问题、验收清单）
