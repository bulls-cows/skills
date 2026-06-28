---
name: memory
description: 记忆管理规则 - 对话启动时自动加载 MEMORY.md，commit 后自动更新记忆
trigger: always_on
alwaysApply: true
---

# 记忆管理规则

本规则定义项目记忆系统的管理规范，确保记忆内容的质量和容量可控。

记忆库位于项目根目录 `.memory/`（个人私有，不提交到仓库）。

## 触发场景

### 读取触发（每次对话）

- **对话启动时**：自动读取 `.memory/MEMORY.md` 作为核心上下文
- **遇到不熟悉的问题时**：根据问题关键词，从 CATALOG.md 查找相关 hub
- **需要深入理解时**：读取相关 hub 和 leaf，获取详细记忆

### 写入触发（commit 后）

- **代码提交完成后**：自动执行记忆更新流程
- **用户明确要求时**："更新记忆"、"记录这次提交"

## 读取流程

### 步骤 1. 自动加载核心路由

对话启动时，自动读取 `.memory/MEMORY.md`（≤8KB），了解项目：

- 记忆系统结构
- 快速索引（各 hub 的主题和路径）
- 最近更新记录

### 步骤 2. 主题匹配

当用户提出问题时：

1. 提取问题中的关键词
2. 在 MEMORY.md 的快速索引中匹配相关 hub
3. 记录匹配到的 hub 路径

### 步骤 3. 按需读取详细记忆

根据匹配结果：

1. 读取相关 hub 文件
2. 根据 hub 中的引用，读取相关 leaf 文件
3. 将读取的内容注入当前对话上下文

### 步骤 4. 归档检索（可选）

如果在活跃记忆中未找到答案：

1. 在 `.memory/ARCHIVE.md` 中查找相关归档记录
2. 如找到，提示用户"在归档中找到相关记忆"并展示摘要

## 写入流程

触发后按以下顺序执行：

### 步骤 1. 获取提交信息

执行 git 命令获取最近一次提交的信息：

- 提交哈希、消息、作者、日期
- 变更文件统计

### 步骤 2. 分析变更内容

根据 git diff 结果，判断变更类型：

- 功能新增
- Bug 修复
- 文档更新
- 重构优化
- 配置变更

### 步骤 3. 更新 work-log

在 `.memory/work-log.md` 中追加新条目：

```markdown
## {YYYY-MM-DD}

- [{提交类型}] {提交消息摘要}
  - 文件变更：{变更文件数} 个
  - 提交哈希：{短哈希}
```

### 步骤 4. 评估长期记忆

判断是否值得记录为长期记忆：

- 新增了重要的项目约定或规范
- 修改了核心架构或设计模式
- 引入了新的技术栈或工具
- 发现了重要的 bug 并修复
- 发布了新的版本或里程碑

如需记录，创建 leaf 文件并更新 hub 和 CATALOG.md。

### 步骤 5. 容量检查

执行 `.agents/skills/yy-memory/scripts/memory-trim.mjs`：

- 检查 MEMORY.md 是否 ≤8KB
- 检查各 hub 和 leaf 的活跃度
- 识别可归档的记忆

### 步骤 6. 归档建议

如有长期未访问的记忆：

- 超过 30 天未修改的 leaf
- 内容已被新决策替代的记忆
- 相关功能已废弃的记忆

建议用户移入 ARCHIVE.md。

## 记忆系统架构

### 目录结构

```
.memory/                    # 个人私有，不提交到仓库
├── MEMORY.md               # 核心路由（≤8KB）
├── CATALOG.md              # 完整目录
├── ARCHIVE.md              # 归档库
├── work-log.md             # 工作日志
├── hubs/                   # 主题枢纽（5个）
│   ├── hub-1-project-knowledge.md
│   ├── hub-2-architecture-decisions.md
│   ├── hub-3-user-preferences.md
│   ├── hub-4-business-rules.md
│   └── hub-5-tool-usage.md
└── leaf/                   # 叶子记忆
    └── *.md
```

### 各组件说明

| 组件 | 作用 | 容量限制 |
|------|------|----------|
| MEMORY.md | 核心路由，快速定位记忆 | ≤8KB |
| CATALOG.md | 完整目录索引 | ≤20KB |
| work-log.md | 工作日志，记录每次提交 | ≤50KB |
| hub 文件 | 主题聚类，关联叶子记忆 | ≤50KB/个 |
| leaf 文件 | 具体记忆内容 | ≤5KB/个 |

## 容量管理规则

### 硬限制

- MEMORY.md 超过 8KB 时，必须整理精简
- 任何单个文件超过 100KB 时，必须拆分

### 软限制

- MEMORY.md 超过 6KB（80%）时，警告提醒整理
- 单个 hub 超过 40KB（80%）时，建议拆分

### 归档规则

- 超过 30 天未访问的 leaf 记忆，移入 ARCHIVE.md
- 内容已被新决策替代的记忆，移入 ARCHIVE.md
- 相关功能已废弃的记忆，移入 ARCHIVE.md

## 相关资源

- 技能：[.agents/skills/yy-memory/SKILL.md](../.agents/skills/yy-memory/SKILL.md)
- 脚本：[.agents/skills/yy-memory/scripts/memory-trim.mjs](../.agents/skills/yy-memory/scripts/memory-trim.mjs)
- 记忆库：`.memory/`（个人私有）