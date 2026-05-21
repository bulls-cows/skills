# AGENTS.md

## 项目简介

- 本仓库维护实用的规则和 AI 技能
- 这是一个 npm 项目，根目录有 package.json
- 技能是主要产出物，每个技能都是独立的 SKILL.md

## 范围

- 本仓库默认语言: Markdown, JSON
- 允许修改目录: .claude-plugin/, build/, docs/, rules/, skills/, AGENTS.md, README.md
- 禁止修改目录: 无

## 改动检查

**改动后必须执行:**

- 执行技能 [@skills-internal/yy-check-skills-consistency/SKILL.md](./skills-internal/yy-check-skills-consistency/SKILL.md)。
- 如果改动涉及 AI 思考方式的调整，执行技能 [@skills-internal/yy-sync-thinking-method/SKILL.md](./skills-internal/yy-sync-thinking-method/SKILL.md)。
- 如果 `.opencode.json` 文件有改动，执行技能 [@skills-internal/yy-sync-instructions-from-opencode/SKILL.md](./skills-internal/yy-sync-instructions-from-opencode/SKILL.md)。
- 如果 `rules/` 目录下的文件有改动，执行技能 [@skills-internal/yy-check-rules-consistency/SKILL.md](./skills-internal/yy-check-rules-consistency/SKILL.md)。
- 执行 `npm run lint` 检测代码和文档。

**检查项:**

- 验证 README.md 中技能列表是否按字母顺序排序
- 验证 README.md 中技能列表与 skills/ 目录技能内容一致
- 修复上述验证过程中发现的错误

## 交付格式

- 修改后先说明修改原因和影响范围
- 所有文件引用都要带路径和行号
- 对于技能变更，说明变更后对用户的影响

## 项目结构

- `skills/`：对外发布的所有技能的根目录
- `skills-internal/`：内部技能目录，不对外发布
- `rules/`：自定义规则目录
- `build/`：构建脚本目录
- `docs/`：项目文档目录
- `types/`：TypeScript 类型定义目录(不适用于 `skills/` 和 `skills-internal/` 目录下的脚本)
- `.claude-plugin/`：claude code 插件市场配置目录
  - `marketplace.json`：技能市场配置文件，定义插件和技能分组
- `README.md`：项目说明文档
- `AGENTS.md`：AI 代理的项目规范说明文档
- `LICENSE.txt`：开源许可证文件

## AI 能力模型

### 感知能力

- **隐性前提强制暴露**：在行动前将隐含的假设和决策分支强制暴露为可见规则，拒绝容忍模糊地带。

### 学习能力

- **多源交叉比对定位矛盾**：对同一信息的多个来源进行系统性比对，将零散差异归类为结构性矛盾而非孤立问题。
- **偏移回退而非修正**：检测到偏离时回退到原始定义，而非在偏移后的版本上修补。

### 推理能力

- **逆向验证驱动**：从预期结果或期望行为反向推导规则是否合理，而非顺着规则正向核对。

### 决策能力

- **最小干预原则**：以"是否影响执行质量"为唯一筛选标准，克制改动冲动，只做必须做的事。
- **目标闭环推进**：将任务转化为可验证目标，循环推进直到验证通过，强调"目标-执行-验证"闭环。

### 其他能力

- **命名与层级对齐**：确保命名精确反映实际范围，且同一逻辑在不同呈现形式中层级一致。

## 路径格式规范

- 在文档中提及文件路径时，优先使用相对路径，以保持跨设备下的通用性
- 在终端中提及文件路径时，优先使用绝对路径，以方便终端/IDE 将其识别为可点击的链接
- 使用正斜杠作为路径分隔符，路径包含空格时使用引号包裹，以确保跨平台兼容性和正确解析

## 需要遵守的规则

- 中文是主要语言，描述和文档使用中文
- 无论用户使用何种语言提问，请始终使用简体中文进行解释和回答
- 除非用户明确要求提交。否则禁止你使用git
- 不要手动修改 marketplace.json，由 `build/lint.mts` 自动生成
- [文件修改范围限制规范 @rules/file-scope-limit/RULE.md](./rules/file-scope-limit/RULE.md)
- [Markdown书写规范 @rules/markdown/RULE.md](./rules/markdown/RULE.md)
- [文本表达规范 @rules/text/RULE.md](./rules/text/RULE.md)

## 关键参考

- `skills/yy-review/SKILL.md` - 代码质量检查工作流
- `skills/yy-commit/SKILL.md` - Git 提交约定
- `skills/yy-lint/SKILL.md` - 代码风格检查工作流
- `skills/yy-create-skill/SKILL.md` - 技能创建指南
- `build/lint.mts` - lint 入口脚本
- `.claude-plugin/marketplace.json` - 技能市场配置
- `.editorconfig` - 通用编辑器配置文件, 编写内容时需遵循
- `README.md` - 项目说明文档
