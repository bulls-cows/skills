# 技能编写最佳实践

本文档提供技能编写的最佳实践参考，帮助创建高质量、易维护的技能。

## 命名规范

### 基本原则

1. **使用小写字母和短横线**
   - ✅ `create-skill`
   - ❌ `CreateSkill`
   - ❌ `create_skill`

2. **名词使用单数形式**
   - ✅ `create-rule`
   - ❌ `create-rules`

3. **优先动宾结构**
   - ✅ `read-pdf`
   - ✅ `lint-code`
   - ❌ `pdf-reader`
   - ❌ `code-linter`

### 命名示例

| 用途 | 推荐命名 | 不推荐命名 |
|------|----------|------------|
| 创建规则 | `create-rule` | `rule-creator` |
| 读取 PDF | `read-pdf` | `pdf-reader` |
| 代码检查 | `lint-code` | `code-linter` |
| 提交代码 | `commit-code` | `code-commit` |

## Description 编写指南

### 核心原则

Description 是技能路由的关键，必须：

1. **精确**：避免过于宽泛的描述
2. **具体**：明确说明技能做什么
3. **有边界**：暗示技能的适用范围

### 好的 Description 示例

```yaml
description: >
  审查 PR 的逻辑正确性、安全风险、测试覆盖缺口。
  仅用于审查，不用于直接改代码。
```

优点：

- 明确了功能范围（审查 PR）
- 列出了审查维度
- 明确了边界（不直接改代码）

### 不好的 Description 示例

```yaml
description: Review code
```

问题：

- 太宽泛，容易误触发
- 没有明确审查什么
- 没有边界说明

### 多行 Description 写法

当 description 较长时，使用 YAML 多行字符串语法：

```yaml
---
name: my-skill
description: >
  这里是详细描述，
  可以跨越多行，
  最终会被合并为一行。
---
```

使用 `>` 表示折叠式多行字符串，适合长段落文本。

## 触发条件设计

### When to use 编写原则

1. **具体场景**：描述用户会说什么或做什么
2. **上下文线索**：包含相关的关键词
3. **行为意图**：明确用户的意图

```markdown
## When to use
- 用户提到"创建技能"、"添加技能"
- 用户想要把某个工作流程标准化
- 用户提到"技能文件"、"SKILL.md"
```

### Don't use when 的重要性

必须有明确的负例条件，防止误触发：

```markdown
## Don't use when
- 用户只是询问技能是什么
- 用户要求创建普通文件
- 用户要求创建规则文件（应使用 create-rule）
```

### 常见误触发场景

| 技能类型 | 容易误触发的场景 | 解决方案 |
|----------|------------------|----------|
| 代码审查 | 用户要求实现功能 | 添加"不用于直接改代码" |
| 文档生成 | 用户只是查看文档 | 添加"用户要求生成/创建" |
| 测试执行 | 用户询问测试方法 | 添加"用户要求运行/执行测试" |

## 输出格式设计

### 固定格式原则

输出格式必须固定，便于：

1. 自动化评测
2. 结果解析
3. 后续处理

### 结构化输出示例

```markdown
## Output contract

### Risk Report
- Critical: 严重风险列表
- High: 高风险列表
- Medium: 中风险列表
- Low: 低风险列表

每条风险包含：
- 位置（文件路径和行号）
- 触发条件
- 后果
- 修复建议
```

### 输出格式检查清单

- [ ] 输出结构是否固定
- [ ] 字段命名是否一致
- [ ] 是否包含必要的上下文信息
- [ ] 是否便于程序解析

## 目录结构规范

### 基础结构

```text
skill-name/
└── SKILL.md
```

### 带示例的结构

```text
skill-name/
├── SKILL.md
└── examples/
    ├── input.md
    └── output.md
```

### 完整结构

```text
skill-name/
├── SKILL.md
├── examples/
│   ├── input.md
│   └── output.md
├── templates/
│   └── example-template.md
└── resources/
    └── reference.md
```

### 何时使用额外目录

| 目录 | 使用场景 |
|------|----------|
| `examples/` | 技能使用方式不直观，需要示例说明 |
| `templates/` | 需要生成特定格式的文件，或模板超过 20 行 |
| `resources/` | 需要参考文档、脚本或素材文件 |

## 常见问题与解决方案

### 问题 1：技能写成知识文档

**错误做法**：

```markdown
## 什么是技能
技能是一种可复用的任务说明书...

## 技能的优点
1. 可以复用
2. 可以共享
```

**正确做法**：

```markdown
## Steps
1. 理解用户需求
2. 确定技能目标
3. 编写 SKILL.md
4. 验证技能格式
```

### 问题 2：缺少负例

**错误做法**：

```markdown
## When to use
- 用户提到代码审查

（没有 Don't use when）
```

**正确做法**：

```markdown
## When to use
- 用户提到代码审查

## Don't use when
- 用户要求直接修改代码
- 用户只是询问代码问题
```

### 问题 3：输出格式不固定

**错误做法**：

```markdown
## Output contract
根据情况输出不同内容
```

**正确做法**：

```markdown
## Output contract
- 文件路径
- 变更摘要
- 验证结果
```
