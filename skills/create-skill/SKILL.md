---
name: create-skill
description: >
  创建新的 Claude Skill（技能）。用于：用户想要创建技能、需要把某个工作流程标准化为技能、想把某个功能打包成可复用的技能。
---

# Create Skill

帮助用户创建规范的 Claude Skill。

## Skill 本质

Skill 是"可按需加载的任务说明书"，用于复用复杂流程。关键特点：

1. **自动发现**：会被自动发现，只在相关时加载，避免上下文膨胀
2. **精确触发**：description 要精确，避免误触发
3. **明确边界**：必须有 When to use 和 Don't use when
4. **固定输出**：输出格式要固定，便于自动化评测

## 创建流程

### 1. 捕获意图

首先理解用户的需求，询问以下问题：

1. 这个技能应该让 Claude 能做什么？
2. 何时应触发这个技能？（什么用户短语/上下文）
3. 预期的输出格式是什么？
4. 是否有不想触发的情况？

### 2. 确定技能名称

使用小写、短横线分隔的命名方式，例如：
- `pr-risk-check`
- `migration-guardian`
- `payment-idempotent`

### 3. 编写 SKILL.md

SKILL.md 包含以下结构：

```markdown
---
name: skill-name
description: >
  精确描述技能做什么以及何时使用。必须是单一、清晰的任务边界。
  包含触发条件说明。
---

## When to use
- 用户要求 X 时
- 涉及 Y 上下文时

## Don't use when
- 用户要求直接实现新功能时
- 简单的 Z 操作时

## Steps
1. 第一步做什么
2. 第二步做什么
3. ...

## Output contract
- 输出格式说明
- 结构化输出定义
```

### 4. 关键编写原则

#### description 编写

**坏例子**：
```yaml
description: Review code
```
问题：太宽泛，会误触发。

**好例子**：
```yaml
description: >
  审查 PR 的逻辑正确性、安全风险、测试覆盖缺口。仅用于审查，不用于直接改代码。
```
优点：路由更精确，避免在"实现需求"任务中误调用。

#### YAML Frontmatter 注意事项

当 `description` 字段值较长时，必须使用 YAML 多行字符串语法：

```yaml
---
name: my-skill
description: >
  这里是详细描述...
---
```

使用 `>`（折叠式）多行字符串，将多行内容合并为一行，适合长段落文本描述。

#### Don't use when 的重要性

必须有明确的负例条件，防止在不应该触发的场景中被调用：

```markdown
## Don't use when
- 用户要求直接实现功能
- 简单读取或查询文件
```

#### 输出格式固定

输出格式必须固定，便于自动化评测：

```markdown
## Output contract

### Risk Report
- Critical: 严重风险列表
- High: 高风险列表
- Medium: 中风险列表
- Low: 低风险列表

每条包含：
- 位置（文件路径和行号）
- 触发条件
- 后果
- 修复建议
```

### 5. 创建目录结构

技能目录规则：
- 如果用户指定了目录，则在用户指定目录下生成技能
- 如果用户未指定目录，则在 `.agents/skills` 目录下生成（没有该目录则创建）

目录结构示例：

```
skill-name/
└── SKILL.md
```

### 6. 示例模板

#### PR 风险审查 Skill

```markdown
---
name: pr-risk-check
description: >
  审查 PR 的逻辑正确性、安全风险、测试覆盖缺口。仅用于 review。
---

## When to use
- 用户要求 review、risk-check、回归风险分析

## Don't use when
- 用户要求直接实现新功能

## Steps
1. 阅读改动文件与调用链
2. 识别逻辑回归、安全边界、并发问题
3. 检查测试是否覆盖关键路径
4. 按严重级别输出

## Output contract
- Critical/High/Medium/Low
- 每条包含: 位置、触发条件、后果、修复建议
```

#### 数据库迁移守护 Skill

```markdown
---
name: migration-guardian
description: >
  审核数据库迁移的兼容性与回滚策略，避免线上不可逆变更。
---

## When to use
- 用户要求审查数据库迁移
- 涉及 schema 变更的 review

## Don't use when
- 普通 code review
- 查询数据库结构

## Steps
1. 检查是否有向后兼容窗口
2. 检查读写路径是否双写/双读
3. 检查是否提供回滚脚本
4. 生成上线前检查清单

## Output contract
- 兼容性分析
- 回滚策略评估
- 上线检查清单
```

### 7. 多 Skill 协作

多个 skill 可以组合使用：

```markdown
需求: 支付重构上线

使用技能:
- migration-guardian（迁移风险）
- pr-risk-check（代码风险）

合并结论后输出
```

### 8. 验收清单

创建技能后，检查：

1. 每个 Skill 都有明确边界与负例（Don't use when）
2. Description 精确，不会误触发
3. 同一任务重复运行，输出结构稳定
4. Skill 能单独被显式调用

### 9. 更新项目配置

创建技能后，需要：

1. 在项目的 README.md 中添加技能说明
2. 如果使用 marketplace.json，添加技能配置
3. 确认技能目录位置：
   - 如果用户指定了目录，在用户指定目录下
   - 如果用户未指定目录，在 `.agents/skills` 目录下

## 常见坑

1. **写成"知识百科"**：Skill 文档必须包含执行步骤，不能只是知识文档
2. **缺少负例**：没有 Don't use when，导致误触发
3. **输出格式不固定**：结果不可自动评测
4. **Description 过宽**：会在不相关的任务中被触发
5. **YAML 语法错误**：长 description 需要使用多行字符串语法

## 技能触发方式

### 自动触发

当用户请求匹配 skill 的 description 时自动触发：

```
请审查这个 PR 的风险
```

### 显式调用

当需要强制触发时：

```Use the pr-risk-check skill to review this branch against main.```
