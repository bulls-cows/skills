# 输出示例

本文档展示创建或更新技能后的预期输出格式示例。

## 示例 1：简单技能输出

### 创建/更新结果

- 技能名称：`format-code`
- 操作类型：创建

### 目录结构

```text
.agents/skills/format-code/
└── SKILL.md
```

### 提示词派生产物状态

- `prompts/skill-prompts.md`：未生成
- 处理方式：跳过
- 原因：当前环境未安装 `yy-skill-to-prompt`

### SKILL.md 内容摘要

- description：

  ```text
  在提交代码前自动格式化代码。用于格式化代码风格，不用于重构代码逻辑或修改代码功能。
  ```

- 指令步骤概要：
  - `步骤 1. 检测项目使用的语言和格式化工具`
  - `步骤 2. 运行相应的格式化命令`
  - `步骤 3. 输出格式化结果`

---

## 示例 2：带模板的技能输出

### 创建/更新结果

- 技能名称：`generate-readme`
- 操作类型：创建

### 目录结构

```text
.agents/skills/generate-readme/
├── SKILL.md
└── templates/
    └── readme-template.md
```

### 提示词派生产物状态

- `prompts/skill-prompts.md`：已生成
- 处理方式：`yy-skill-to-prompt`

### SKILL.md 内容摘要

- description：

  ```text
  为项目生成标准 README 文档。用于创建或更新 README，不用于编写其他类型文档或修改代码。
  ```

- 指令步骤概要：
  - `步骤 1. 读取项目配置文件`
  - `步骤 2. 分析项目结构和依赖`
  - `步骤 3. 参考模板生成文档`
  - `步骤 4. 输出结果`

---

## 示例 3：更新技能输出

### 创建/更新结果

- 技能名称：`lint-code`
- 操作类型：更新

### 目录结构

```text
.agents/skills/lint-code/
└── SKILL.md
```

### 提示词派生产物状态

- `prompts/skill-prompts.md`：未更新
- 处理方式：跳过
- 原因：技能目录下不存在 `prompts/skill-prompts.md`，且当前环境未安装 `yy-skill-to-prompt`

### SKILL.md 内容摘要

- description：

  ```text
  检查代码质量，包括语法错误、风格问题、潜在 bug。仅在用户明确要求检查代码质量时触发，不用于直接修复代码或执行格式化。
  ```

- 指令步骤概要：
  - `步骤 1. 获取待检查范围`
  - `步骤 2. 执行代码质量检查`
  - `步骤 3. 输出检查结果`

---

## 示例 4：复杂技能输出

### 创建/更新结果

- 技能名称：`api-test`
- 操作类型：创建

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

### 提示词派生产物状态

- `prompts/skill-prompts.md`：已生成
- 处理方式：本地最小回退流程

### SKILL.md 内容摘要

- description：

  ```text
  基于 OpenAPI/Swagger 规范自动生成并执行 API 测试。用于测试 REST API 和验证 API 规范，不用于编写单元测试或测试前端功能。
  ```

- 指令步骤概要：
  - `步骤 1. 读取 OpenAPI/Swagger 规范文件`
  - `步骤 2. 解析 API 端点和参数定义`
  - `步骤 3. 生成测试用例`
  - `步骤 4. 执行测试请求`
  - `步骤 5. 生成测试报告`
  - `步骤 6. 输出测试结果`
