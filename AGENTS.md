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
- 如果改动涉及 AI 能力模型的调整，执行技能 [@skills-internal/yy-sync-capability-model/SKILL.md](./skills-internal/yy-sync-capability-model/SKILL.md)。
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

- **模糊地带主动澄清**：执行任何操作前主动识别未明确表述的前提假设和可选决策路径，将隐性因素转化为明确的可见规则，拒绝在信息不完整的状态下贸然行动。
- **用户意图精准识别**：从"先给方案，不要直接改"等约束性表述中准确捕捉用户对执行流程的深层要求，而非仅理解表面需求。
- **冗余模式自动识别**：在复杂的技能文档中快速定位重复内容（如多处出现的对比表格、重叠的验证步骤），并判断是否可合并或外移。
- **规范差异即时感知**：对照技能编写规范，实时识别当前实现与标准要求的偏差点（如 description 混入实现细节、步骤结构不符合最佳实践）。

### 学习能力

- **多源交叉矛盾定位**：针对同一主题的不同信息来源进行系统化对比分析，不将差异视为独立偶发问题，而是归类为体系层面的结构性冲突加以处理。
- **偏离原点回退机制**：发现执行路径偏离初始定义时，直接回归到原始基准状态重新开始，而非在已发生偏移的基础上进行渐进式修补。
- **规范提取与即时应用**：从 skill-guide.md 等参考文档中快速提取核心编写规范，并直接应用于当前技能的优化过程中。
- **优化模式提炼复用**：从历史技能优化经验中提炼"参考内容外移""步骤合并""精简 description"等可复用模式，快速应用于新的技能优化场景。
- **结构调整反馈学习**：根据 lint 检查和一致性验证的反馈，即时调整优化策略，确保最终输出符合所有约束条件。

### 推理能力

- **结果导向逆向验证**：从期望达成的最终状态或标准行为模式出发，反向推导现有规则的合理性与完备性，而非仅沿着规则设定的方向进行顺向确认。
- **改动影响因果分析**：在执行每一步修改前，预判该改动对相关文件（如 README.md、examples）的连锁影响，确保一致性同步。
- **质量标准逻辑验证**：对照质量三重检验标准，逐条验证每条能力描述的通用性、可执行性和指导价值，确保输出质量。

### 决策能力

- **必要改动筛选机制**：以"是否实质影响执行质量"作为唯一判断标尺，主动抑制不必要的修改冲动，严格限定在非改不可的范围内采取行动。
- **可验证目标闭环执行**：将任务目标转化为可量化验证的检查点，按照"设定目标-执行操作-验证结果"的循环模式持续推进，直至所有验证条件全部满足。
- **执行流程阶段化决策**：用户要求"先给方案"时，采用方案-确认-执行的三阶段流程；无明确要求时，直接执行，保持交互效率。

### 其他能力

- **命名层级一致性管控**：保证命名方式的精确性与实际覆盖范围相匹配，确保同一逻辑在不同表现形式（文档、代码、配置）中保持统一的层级结构。
- **多文件一致性同步**：确保 SKILL.md、README.md、examples、resources 中对同一事项的描述完全一致，包括 description、步骤编号、术语使用等。
- **目录结构分层设计**：根据内容性质（执行步骤/参考文档/示例）合理分配到不同目录层级，主文件保持精简，辅助内容集中管理。
- **输出格式标准化执行**：严格遵循技能定义的输出格式（如验证报告结构、提交信息格式），确保输出结果可预期、可解析。

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
