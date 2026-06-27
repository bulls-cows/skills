---
name: yy-enable-memory
description: >
  在目标项目中一键启用分层记忆管理系统，生成项目私有的 yy-memory 技能和记忆库结构。
  仅在用户明确要求为项目添加记忆功能时使用，不用于查询记忆、更新现有记忆或初始化普通配置文件。
---

# yy-enable-memory

## 描述

在目标项目根目录下创建分层记忆管理系统，包括：
- 项目私有技能 `.agents/skills/yy-memory/SKILL.md`
- 记忆库结构 `.agents/skills/yy-memory/resources/memory/`
- 容量修剪脚本 `.agents/skills/yy-memory/scripts/memory-trim.mjs`
- 在 `AGENTS.md` 中注入记忆管理规则引用

## 使用场景

- 用户提到"添加记忆功能"、"启用记忆管理"、"让我这个项目有记忆能力"
- 用户提到"创建 yy-memory 技能"、"给项目加上长期记忆"

不应触发：

- 用户要求查询或读取现有记忆内容
- 用户要求更新或修改现有记忆
- 用户只是询问记忆系统是什么
- 用户要求为非项目目录（如桌面、下载文件夹）添加记忆

## 指令

### 步骤 1. 确认目标项目

**决策分支**：

- **用户指定了目标项目路径**：使用用户指定的路径，跳到步骤 2
- **用户未指定目标项目路径**：使用当前工作目录（cwd）作为目标项目

### 步骤 2. 检测目标项目环境

检查目标项目根目录下是否存在：

- `AGENTS.md` 文件（必须存在，否则提示用户先创建）
- `.agents/skills/` 目录（不存在则创建）
- `.agents/skills/yy-memory/` 目录

**决策分支**：

- **AGENTS.md 不存在**：提示用户"目标项目缺少 AGENTS.md 文件，请先创建"，中止操作
- **yy-memory 已存在**：询问用户"目标项目已存在记忆系统，是覆盖还是更新？"，用户确认后继续

### 步骤 3. 检测目标项目结构

读取目标项目的 `AGENTS.md`，判断其结构特点：

- 是否已有"需要遵守的规则"章节
- 是否已有记忆相关的规则引用

### 步骤 4. 创建项目私有 yy-memory 技能

从 `templates/yy-memory-skill.md` 模板生成技能文件：

- 目标路径：`.agents/skills/yy-memory/SKILL.md`
- 如已存在，先读取后判断是覆盖还是追加

### 步骤 5. 初始化记忆库结构

按以下顺序创建记忆库文件：

1. 创建 `.agents/skills/yy-memory/resources/memory/` 目录
2. 从 `templates/memory-md.md` 生成 `MEMORY.md`
3. 从 `templates/catalog-md.md` 生成 `CATALOG.md`
4. 从 `templates/archive-md.md` 生成 `ARCHIVE.md`
5. 创建 `memory/hubs/` 目录，从 `templates/hub-template.md` 生成 5 个主题 hub
6. 创建 `memory/leaf/` 目录，从 `templates/leaf-template.md` 生成示例 leaf

**Hub 主题命名**（5个）：

- `hub-1-project-knowledge.md` - 项目知识
- `hub-2-architecture-decisions.md` - 架构决策
- `hub-3-user-preferences.md` - 用户偏好
- `hub-4-business-rules.md` - 业务规则
- `hub-5-tool-usage.md` - 工具用法

### 步骤 6. 创建修剪脚本

从 `scripts/memory-trim.mjs` 复制到目标项目：

- 目标路径：`.agents/skills/yy-memory/scripts/memory-trim.mjs`

### 步骤 7. 注入 AGENTS.md 规则引用

读取 `resources/agentes-rule-snippet.md` 中的片段，插入到 `AGENTS.md` 的适当位置：

- 如已有"需要遵守的规则"章节，在该章节末尾添加
- 如没有该章节，在文件末尾添加
- 保持原有内容不变，只追加新内容

### 步骤 8. 输出结果

必须输出以下内容：

1. **创建结果**：操作类型（新建/更新）
2. **生成的目录结构**：使用树形结构展示
3. **记忆库路径**：`.agents/skills/yy-memory/resources/memory/`
4. **触发方式**：commit 后自动触发，Agent 会读取 yy-memory 技能执行记忆更新
5. **使用提醒**：建议用户如何验证安装成功

## 安全边界

- 只能在有效的项目目录（包含 AGENTS.md）下创建记忆系统
- 不覆盖用户已有的 AGENTS.md 内容，只追加规则引用
- 不修改目标项目中的其他任何文件
- 记忆库初始化时只生成模板文件，不生成用户业务相关的具体记忆内容

## 相关资源

- `templates/yy-memory-skill.md`：yy-memory 项目私有技能模板
- `templates/memory-md.md`：MEMORY.md 核心路由模板
- `templates/catalog-md.md`：CATALOG.md 完整目录模板
- `templates/archive-md.md`：ARCHIVE.md 归档库模板
- `templates/hub-template.md`：hub 主题枢纽模板
- `templates/leaf-template.md`：leaf 叶子记忆模板
- `resources/agentes-rule-snippet.md`：AGENTS.md 注入片段
- `scripts/memory-trim.mjs`：容量修剪脚本
