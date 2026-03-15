---
name: yy-create-skill
description: >
  创建或更新 Skill（技能）。用于：用户想要创建新技能、更新现有技能、需要把某个工作流程标准化为技能、想把某个功能打包成可复用的技能。
---

# Create Skill

帮助用户创建或更新规范的 Skill。

## Skill 本质

Skill 是"可按需加载的任务说明书"，用于复用复杂流程。关键特点：

1. **自动发现**：会被自动发现，只在相关时加载，避免上下文膨胀
2. **精确触发**：description 要精确，避免误触发
3. **明确边界**：必须有 When to use 和 Don't use when
4. **固定输出**：输出格式要固定，便于自动化评测

## 创建/更新流程

### 1. 捕获意图

首先理解用户的需求，确定是创建新技能还是更新现有技能。

对于**创建新技能**，询问以下问题：

1. 这个技能应该让 AI 助手能做什么？
2. 何时应触发这个技能？（什么用户短语/上下文）
3. 预期的输出格式是什么？
4. 是否有不想触发的情况？

对于**更新现有技能**，先读取现有 SKILL.md 内容，然后询问：

1. 想要更新技能的哪些部分？（description、When to use、Steps、Output contract 等）
2. 更新后的预期行为是什么？

### 2. 确定技能目标

- **创建新技能**：使用小写、短横线分隔的命名方式，遵循以下原则：
  - **名词使用单数形式**：如 `create-skill` 而非 `create-skills`
  - **优先动宾结构**：如 `create-skill`、`read-pdf`、`lint-code` 而非 `skills-creator`、`pdf-reader`

  示例：
  - `create-rule`
  - `read-pdf`
  - `lint-and-commit`

- **更新现有技能**：直接使用现有技能目录

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

### 5. 创建/更新目录结构

**创建新技能**的目录规则：

- 如果用户指定了目录，则在用户指定目录下生成技能
- 如果用户未指定目录，则在 `.agents/skills` 目录下生成（没有该目录则创建）

**更新现有技能**：直接在现有目录中修改 SKILL.md 文件

#### 目录结构规范

一个完整的技能可以包含以下结构：

```text
skill-name/
├── SKILL.md               # （必须）智能体的核心指令
├── examples/              # （可选）输入/输出示例
│   ├── input.md
│   └── output.md
├── templates/             # （可选）可复用的模板
│   └── template-name.md
└── resources/             # （可选）参考文件、运行脚本或素材
    └── reference.md
```

**何时使用各目录：**

| 目录 | 使用场景 |
|------|----------|
| `examples/` | 技能使用方式不直观，需要示例说明 |
| `templates/` | 需要生成特定格式的文件，或模板超过 20 行 |
| `resources/` | 需要参考文档、脚本或素材文件 |

#### 基础目录结构

```text
skill-name/
└── SKILL.md
```

#### 带模板文件的目录结构

当技能需要生成文件或包含较长的示例模板时，应使用独立的模板文件：

```text
skill-name/
├── SKILL.md
└── templates/
    └── example-template.md
```

**何时使用独立模板文件：**

1. **生成文件类技能**：技能需要生成特定格式的文件（如 README、配置文件等）
2. **长示例内容**：示例模板超过 20 行，会打断 SKILL.md 的阅读流畅性
3. **避免标题层级混乱**：模板内容包含 Markdown 标题，会导致 SKILL.md 的标题层级混乱
4. **复用模板**：多个技能可能共用同一模板

**模板文件编写规范：**

1. 模板文件放在 `templates/` 目录下
2. 文件命名使用小写、短横线分隔，如 `readme-template.md`
3. 模板内容应该是可直接使用的完整示例
4. 在 SKILL.md 中使用相对路径引用：`templates/xxx-template.md`

**示例引用方式：**

```markdown
### 步骤 X：生成文件

根据收集的信息生成文件内容。参考 `templates/readme-template.md` 的结构生成文档。
```

**注意事项：**

- 不要在 SKILL.md 中内嵌过长的模板代码块
- 模板文件应该是独立的 Markdown 文件，便于维护和复用
- 在 SKILL.md 的注意事项中提醒使用模板文件

### 6. 示例模板

本技能提供了以下模板文件，位于 `templates/` 目录：

| 模板文件 | 用途 |
|----------|------|
| `templates/skill-template.md` | 基础技能模板 |
| `templates/rule-skill-template.md` | 规则类技能模板 |
| `templates/pdf-skill-template.md` | PDF 读取类技能模板 |

创建技能时，根据技能类型参考对应的模板文件。

#### 基础技能结构示例

```markdown
---
name: skill-name
description: >
  精确描述技能做什么以及何时使用。
---

## When to use
- 触发条件

## Don't use when
- 不触发条件

## Steps
1. 执行步骤

## Output contract
- 输出格式
```

更多完整示例请参考 `templates/` 目录下的模板文件。

### 7. 多 Skill 协作

多个 skill 可以组合使用：

```markdown
需求: 代码检查后提交

使用技能:
- lint（代码质量检查）
- commit（创建规范提交）

先执行 lint 检查，通过后再执行 commit
```

### 8. 验收清单

**创建技能后**，检查：

1. 每个 Skill 都有明确边界与负例（Don't use when）
2. Description 精确，不会误触发
3. 同一任务重复运行，输出结构稳定
4. Skill 能单独被显式调用
5. YAML 格式正确（使用多行字符串语法处理长 description）
6. 如果有长模板内容，已提取到 `templates/` 目录
7. 如果技能使用方式不直观，已添加 `examples/` 目录
8. 如果有参考文档需求，已添加 `resources/` 目录

**更新技能后**，检查：

1. 更新后的 description 仍然准确反映技能用途
2. When to use 和 Don't use when 仍然明确
3. Steps 步骤仍然完整可执行
4. Output contract 仍然清晰定义
5. YAML 格式正确
6. 如有模板文件，检查是否需要同步更新

### 9. 更新项目配置

**创建新技能后**，需要：

1. 在项目的 README.md 中添加技能说明
2. 如果使用 marketplace.json，添加技能配置
3. 确认技能目录位置：
   - 如果用户指定了目录，在用户指定目录下
   - 如果用户未指定目录，在 `.agents/skills` 目录下

**更新现有技能后**，需要：

1. 如果更改了技能名称，更新 README.md 和 marketplace.json 中的引用
2. 如果变更了功能，检查是否需要更新相关文档

## 常见坑

1. **写成"知识百科"**：Skill 文档必须包含执行步骤，不能只是知识文档
2. **缺少负例**：没有 Don't use when，导致误触发
3. **输出格式不固定**：结果不可自动评测
4. **Description 过宽**：会在不相关的任务中被触发
5. **YAML 语法错误**：长 description 需要使用多行字符串语法
6. **内嵌长模板**：在 SKILL.md 中内嵌过长的模板代码，导致文档结构混乱、标题层级错乱

## 更新现有技能

当用户需要更新现有技能时：

1. 读取现有 SKILL.md 文件
2. 根据用户需求修改相应部分：
   - **更新 description**：调整触发条件和描述，确保更精确
   - **更新 When to use**：添加或移除触发场景
   - **更新 Don't use when**：添加或移除负例
   - **更新 Steps**：改进执行步骤
   - **更新 Output contract**：调整输出格式定义
3. 保存修改后的 SKILL.md
4. 运行验收清单检查

**更新示例场景**：

- 技能触发不够准确，需要调整 description
- 执行步骤需要改进
- 输出格式需要调整
- 发现误触发情况，需要加强 Don't use when

## 技能触发方式

### 自动触发

当用户请求匹配 skill 的 description 时自动触发：

```text
请审查这个 PR 的风险
```

### 显式调用

当需要强制触发时：

```text
Use the pr-risk-check skill to review this branch against main.
```

## 相关资源

本技能包含以下辅助资源：

| 路径 | 说明 |
|------|------|
| `examples/input.md` | 输入示例，展示用户如何请求创建技能 |
| `examples/output.md` | 输出示例，展示创建技能后的预期结果 |
| `templates/skill-template.md` | 基础技能模板 |
| `templates/rule-skill-template.md` | 规则类技能模板 |
| `templates/pdf-skill-template.md` | PDF 读取类技能模板 |
| `resources/skill-best-practices.md` | 技能编写最佳实践参考 |
