# AGENTS.md - 智能体编码指南

## Scope

- 本仓库默认语言: Markdown, JSON
- 允许修改目录: skills/, .claude-plugin/, README.md, AGENTS.md, LICENSE.txt
- 禁止修改目录: 无

---

## Quality Gate

**改动后必须执行:**

```bash
npm run lint
```

该命令会依次执行：

1. `node ./build/lint.mts` - 同步 marketplace.json（自动更新 skills 列表、版本、描述）
2. `markdownlint "**/*.md" --fix` - Markdown 格式检查和自动修复
3. `tsc --noEmit` - TypeScript 类型检查

**检查项:**

- 验证 SKILL.md 格式（YAML 头部 + Markdown 正文）
- 验证 marketplace.json 的 JSON 格式
- 验证 skills 列表是否按字母顺序排序
- 验证 README.md 中的技能列表与 skills/ 目录实际内容一致
- 验证 marketplace.json 中的 skills 路径是否正确

---

## Delivery Format

- 修改后先说明修改原因和影响范围
- 所有文件引用都要带路径和行号
- 对于技能变更，说明变更后对用户的影响

---

## 项目结构

```
frontend-skills-group/
├── .claude-plugin/           # 插件市场配置
│   └── marketplace.json      # 技能市场配置（自动生成）
├── .editorconfig             # 编辑器配置
├── .gitignore
├── .nvmrc                    # Node 版本要求 (v22.18.0)
├── .markdownlint.json        # Markdown lint 配置
├── .npmrc
├── build/                    # 构建脚本
│   └── lint.mts              # lint 入口脚本
├── package.json              # npm 项目配置
├── tsconfig.json             # TypeScript 配置
├── skills/                   # 技能目录（11个技能）
│   ├── commit/              # Git 提交辅助
│   ├── create-readme/       # README 创建
│   ├── create-rule/        # 规则创建
│   ├── create-skill/       # 技能创建
│   ├── design-ui/           # UI 设计
│   ├── init/                # 项目初始化
│   ├── lint/                # 代码质量检查
│   ├── lint-and-commit/     # 检查 + 提交
│   ├── plan/                # 任务规划
│   ├── read-pdf/            # PDF 读取
│   └── spec/                # 规范文档
├── README.md                 # 项目说明
├── AGENTS.md                 # 本文件
└── LICENSE.txt              # 许可证
```

---

## 构建/检查/测试命令

### 运行完整 lint 检查

```bash
npm run lint
```

### 单独运行各检查项

```bash
# 1. 同步 marketplace.json
node ./build/lint.mts

# 2. Markdown 检查（自动修复）
markdownlint "**/*.md" --fix

# 3. TypeScript 类型检查
tsc --noEmit
```

### Node 版本检查

```bash
node --version  # 需 >= v22.18.0
```

---

## 代码风格指南

### 1. SKILL.md 格式（YAML Frontmatter）

SKILL.md 文件必须以有效的 YAML frontmatter 开头：

```yaml
---
name: skill-name
description: >
  描述文本在这里。使用 > 表示折叠多行字符串。
  这样保持 YAML 有效。
icon: 🔧
examples:
  - /command
---
```

**关键规则：**
- **禁止**将长描述放在键的同一行：
  ```yaml
  # 错误 - 导致 YAML 解析错误
  name: skill-name
  description: 这是一个很长的描述，超过了...
  ```
  
  ```yaml
  # 正确 - 使用 > 或 | 表示多行
  name: skill-name
  description: >
    这是一个很长的描述，使用折叠样式。
    换行符会转换为空格。
  ```

- 使用 `>`（折叠式）处理长段落 - 换行符转换为空格
- 使用 `|`（保留式）处理代码块或列表 - 保留换行符

### 2. 文件命名规范

| 类型 | 约定 | 示例 |
|------|------|------|
| SKILL.md 文件 | kebab-case | `create-skill/SKILL.md` |
| 技能目录 | kebab-case | `lint-and-commit/` |
| 脚本文件 | snake_case | `lint.mts` |
| 参考文档 | kebab-case | `references/schemas.md` |

### 3. Markdown 指南

- **SKILL.md 应该控制在 500 行以内** - 更长的内容使用 references
- 使用祈使语气："做 X"而非"你应该做 X"
- 使用中文描述（本仓库主要使用中文）
- 包含语言标签的代码示例：
  ```markdown
  ```bash
  npm run lint
  ```
  ```

### 4. 目录结构约定

每个技能遵循以下结构：

```
skill-name/
├── SKILL.md                    # 技能定义（必需）
├── references/                 # 参考文档（可选）
│   └── *.md
├── scripts/                    # 脚本文件（可选）
│   └── *.mts / *.py
├── assets/                     # 静态资源（可选）
│   └── *
└── evals/                      # 测试用例（可选）
    └── evals.json
```

### 5. JSON 文件规范

- **marketplace.json**: 自动生成，**不要手动修改**，由 `build/lint.mts` 生成
- **evals.json**: 测试用例，使用以下结构：

```json
{
  "skill_name": "example-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "用户的任务提示",
      "expected_output": "预期结果的描述",
      "files": [],
      "assertions": []
    }
  ]
}
```

### 6. TypeScript/JavaScript 代码风格

- 使用 **ESM** (`"type": "module"` in package.json)
- 函数/变量使用 **camelCase**
- 类使用 **PascalCase**
- 建议为公共 API 添加类型提示
- 示例：
  ```typescript
  function aggregateBenchmark(workspace: string, skillName: string): Record<string, unknown> {
      const results: Record<string, unknown> = {};
      // ... implementation
      return results;
  }
  ```

### 7. 错误处理原则

- **禁止**使用 `any` 类型来抑制错误
- **禁止**删除未完成的代码来消除报错
- **应当**理解错误的根本原因并进行正确修复
- **应当**用中文向用户解释错误

### 8. Git 提交约定

提交更改时，遵循以下格式：

```
type(scope): 描述
```

**类型：**
- `feat` - 新功能
- `fix` - Bug 修复
- `docs` - 文档更新
- `style` - 格式调整（不影响功能）
- `refactor` - 重构
- `perf` - 性能优化
- `test` - 测试相关
- `chore` - 构建/工具/依赖相关
- `revert` - 回滚

**示例：**
```
feat(create-skill): 添加评估功能
fix(lint): 修复 Node 版本检查逻辑
docs(readme): 更新插件安装说明
```

### 9. 编辑器配置

项目使用以下编辑器配置（见 `.editorconfig`）：

```editorconfig
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

---

## 智能体重要提示

1. **这是一个 npm 项目** - 根目录有 package.json
2. **运行 lint** - 每次修改后必须执行 `npm run lint`
3. **不要手动修改 marketplace.json** - 由 `build/lint.mts` 自动生成
4. **技能是主要产出物** - 每个技能都是独立的 SKILL.md
5. **中文是主要语言** - 描述和文档使用中文
6. **本地测试后再提交** - 将技能复制到 OpenCode 并测试调用

---

## Cursor/Copilot 规则

本仓库不存在 Cursor 规则（`.cursor/rules/` 或 `.cursorrules`）或 Copilot 规则（`.github/copilot-instructions.md`）。

---

## 关键参考

- `skills/lint/SKILL.md` - 代码质量检查工作流
- `skills/commit/SKILL.md` - Git 提交约定
- `skills/create-skill/SKILL.md` - 技能创建指南
- `build/lint.mts` - lint 入口脚本
- `.claude-plugin/marketplace.json` - 技能市场配置
