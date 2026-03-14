---
name: init
description: 初始化项目 AGENTS.md 文档，用于指导 AI 助手理解项目规范、范围和结构
icon: 🚀
examples:
  - /init
---

# Init AGENTS.md

这个技能用于初始化或更新项目的 AGENTS.md 文档，确保 AI 助手能够理解项目的规范、范围和结构。

## 使用方式

用户可以通过以下方式调用这个技能：

- `/init` - 初始化或更新 AGENTS.md 文档

## 工作流程

### 步骤 1：检查 AGENTS.md 是否存在

检查项目根目录下是否存在 `AGENTS.md` 文件：

**情况 1：AGENTS.md 不存在**

- 提示用户：

```text
项目根目录下没有找到 AGENTS.md 文件，正在为您创建...

AGENTS.md 将包含以下核心内容（根据实际项目调整）：
- Scope: 仓库范围、允许/禁止修改的目录
- Quality Gate: 质量门禁要求（如 lint、test）
- Delivery Format: 交付格式规范
- Project Structure: 项目结构说明（精炼，4级以内）
```

- 参考 `templates/agents-minimal-template.md` 的结构创建基础 AGENTS.md
- 询问用户是否需要根据项目特点调整内容
- 继续执行步骤 2

**情况 2：AGENTS.md 存在**

- 读取 AGENTS.md 内容
- 显示当前文件已存在的信息
- 询问用户是否需要更新或补充内容
- 如果用户选择更新，继续执行步骤 2
- 如果用户选择不需要更新，询问是否需要添加对 `.agents/rules/` 目录下规则的引用

### 步骤 2：询问项目信息

根据 AGENTS.md 的模板结构，询问用户以下信息：

1. **Scope（项目范围）**
   - 仓库主要使用的编程语言（如 TypeScript、Python、Go）
   - 允许修改的目录（如 src/、tests/、docs/）
   - 禁止修改的目录（如 infra/prod/、secrets/）

2. **Quality Gate（质量门禁）**
   - 改动后必须执行的命令（如 npm run lint、npm test）
   - 代码质量检查工具（如 ESLint、Prettier、Black）
   - 测试框架（如 Jest、pytest）

3. **Delivery Format（交付格式）**
   - 给用户结果的格式（如先给风险摘要，再给修改点，再给测试结果）
   - 文件引用格式（如所有文件引用都要带路径和行号）

4. **Project Structure（项目结构）**
   - 项目的目录结构（最多4级）
   - 各目录和文件的作用
   - 对于后端代码，指出哪些目录是用于定义接口路由、控制器、service、数据库model的

5. **Rules 引用**
   - 检查 `.agents/rules/` 目录下是否有规则文档
   - 如果有，询问是否需要在 AGENTS.md 中添加对这些规则的引用

### 步骤 3：生成/更新 AGENTS.md

根据用户提供的信息，生成或更新 AGENTS.md 文件：

```markdown
# AGENTS.md

## Scope
- 本仓库默认语言: [编程语言]
- 允许修改目录: [目录列表]
- 禁止修改目录: [目录列表]

## Quality Gate
- 改动后必须执行:
  - [命令1]
  - [命令2]

## Delivery Format
- [交付格式要求]
- [文件引用格式]

## Project Structure

[项目结构说明，最多4级]

## Rules

[如果有 .agents/rules/ 目录下的规则，这里列出]
- .agents/rules/[规则文件名].md: [简要说明]
```

### 步骤 4：确认并保存

显示生成的内容摘要：

```text
✓ 已生成/更新 AGENTS.md
✓ 包含以下章节：
  - Scope
  - Quality Gate
  - Delivery Format
  - Project Structure
  - Rules（如果添加）

AGENTS.md 已保存到项目根目录。
```

使用 Edit 或 Write 工具保存文件。

## 注意事项

- 保持 AGENTS.md 内容精简，具体规则应存放到 `.agents/rules/` 目录
- 项目结构说明最多 4 级，重点说明各目录和文件的作用
- 使用中文编写内容（除非项目文档是英文）
- 在更新文档前，务必先读取文档内容，了解现有结构
- 不要删除或修改现有内容，除非用户明确要求
- 创建 AGENTS.md 时可以参考 `templates/agents-minimal-template.md` 的结构和具体要求
