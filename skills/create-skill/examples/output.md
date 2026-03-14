# 输出示例

本文档展示创建技能后的预期输出示例。

## 示例 1：简单技能输出

### 创建结果

已成功创建技能 `format-code`。

### 目录结构

```text
.agents/skills/format-code/
└── SKILL.md
```

### SKILL.md 内容

```markdown
---
name: format-code
description: >
  在提交代码前自动格式化代码。用于：用户提到"格式化代码"、"代码格式化"、
  "提交前格式化"时触发。
---

## When to use
- 用户提到"格式化代码"、"代码格式化"
- 用户要在提交前整理代码格式
- 用户要求统一代码风格

## Don't use when
- 用户只是查看代码
- 用户要求重构代码逻辑
- 用户要求修改代码功能

## Steps
1. 检测项目使用的语言和格式化工具
2. 运行相应的格式化命令
3. 报告格式化的文件数量和变更

## Output contract
- 格式化工具名称
- 处理的文件数量
- 变更摘要
```

---

## 示例 2：带模板的技能输出

### 创建结果

已成功创建技能 `generate-readme`。

### 目录结构

```text
.agents/skills/generate-readme/
├── SKILL.md
└── templates/
    └── readme-template.md
```

### SKILL.md 内容

```markdown
---
name: generate-readme
description: >
  为项目生成标准 README 文档。用于：用户需要创建或更新项目的 README 文件，
  自动从项目配置中提取信息生成文档。
---

## When to use
- 用户提到"生成 README"、"创建 README"
- 用户需要为项目添加文档说明
- 用户要求更新项目文档

## Don't use when
- 用户只是查看 README 内容
- 用户要求编写其他类型文档
- 用户要求修改代码

## Steps
1. 读取项目配置文件（package.json/Cargo.toml/pyproject.toml）
2. 分析项目结构和依赖
3. 参考 `templates/readme-template.md` 生成文档
4. 输出 README.md 文件

## Output contract
- README.md 文件路径
- 包含的章节列表
- 自动检测到的项目信息摘要
```

---

## 示例 3：更新技能输出

### 更新结果

已成功更新技能 `lint-code` 的 description。

### 变更内容

**更新前：**

```yaml
description: 检查代码质量
```

**更新后：**

```yaml
description: >
  检查代码质量，包括语法错误、风格问题、潜在 bug。
  仅在用户明确要求"检查代码质量"时触发。
```

### 影响说明

- 触发条件更加精确，避免在普通开发对话中误触发
- 需要用户明确表达"检查代码质量"意图才会调用

---

## 示例 4：复杂技能输出

### 创建结果

已成功创建技能 `api-test`。

### 目录结构

```text
.agents/skills/api-test/
├── SKILL.md
├── examples/
│   ├── input.md
│   └── output.md
└── templates/
    └── test-report-template.md
```

### SKILL.md 内容

```markdown
---
name: api-test
description: >
  基于 OpenAPI/Swagger 规范自动生成并执行 API 测试。
  用于：用户需要测试 REST API、验证 API 规范、生成测试报告。
---

## When to use
- 用户提到"测试 API"、"API 测试"
- 用户需要验证 OpenAPI/Swagger 规范
- 用户要求生成 API 测试报告

## Don't use when
- 用户只是查看 API 文档
- 用户要求编写单元测试
- 用户要求测试前端功能

## Steps
1. 读取 OpenAPI/Swagger 规范文件
2. 解析 API 端点和参数定义
3. 生成测试用例
4. 执行测试请求
5. 参考 `templates/test-report-template.md` 生成报告

## Output contract

### Test Report
- Total: 总测试数
- Passed: 通过数
- Failed: 失败数
- Duration: 执行时长

### Failed Test Details
每个失败测试包含：
- API 端点
- 请求参数
- 预期响应
- 实际响应
- 错误信息
```
