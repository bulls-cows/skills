# AGENTS.md - 智能体编码指南

## Scope

- 本仓库默认语言: Markdown, JSON
- 允许修改目录: .claude-plugin/, build/, docs/, rules/, skills/, AGENTS.md, README.md
- 禁止修改目录: 无

---

## Quality Gate

**改动后必须执行:**

- 执行 `npm run lint` 检测代码和文档。
- 执行技能 [@skills-internal/yy-check-skills-consistency/SKILL.md](./skills-internal/yy-check-skills-consistency/SKILL.md)。
- 如果改动涉及 AI 思考方式的调整，执行技能 [@skills-internal/yy-sync-thinking-method/SKILL.md](./skills-internal/yy-sync-thinking-method/SKILL.md)。

**检查项:**

- 验证 README.md 中每个技能列表内部是否按字母顺序排序，不跨列表合并判断
- 验证 README.md 中每个技能列表与其对应的 skills/ 目录技能内容一致
- 修复上述验证过程中发现的错误

---

## Delivery Format

- 修改后先说明修改原因和影响范围
- 所有文件引用都要带路径和行号
- 对于技能变更，说明变更后对用户的影响

---

## 项目结构

参考 [@docs/STRUCTURE.md](./docs/STRUCTURE.md)

---

## 编辑器配置

编写内容时，需遵循 [@.editorconfig](./.editorconfig)

---

## AI 思考方式

本节描述 AI 在执行任务时应遵循的思考方式，确保输出质量。

### 交叉比对式矛盾定位

对同一信息的多个来源进行比对，将零散差异归类为结构性矛盾：

- 比较多个文件对同一事项的规定，以差异作为问题发现手段
- 用"类别-数量"方式组织发现，标注矛盾点的具体位置（文件、行号）
- 识别不一致后同步修改关联文件，修改后验证各来源是否一致

### 决策点显式化

将隐含的分支选择转化为明确的规则：

- 不使用"根据情况处理"等模糊表述
- 明确每个条件分支对应的具体行为
- 使用表格或列表格式呈现决策逻辑

### 显式分级筛选

行动前先将发现分为"值得改"和"不值得改"两类，避免过度干预：

- 以"是否影响执行质量"作为筛选标准，而非"是否能改"
- 对不值得改的项，评估其在上下文中是否已足够清晰
- 未发现实质性问题时，主动得出"无需优化"的结论

### 逆向逻辑验证

从预期结果反推规则是否合理，而非顺着规则正向核对格式：

- 从期望行为倒推条件分支是否覆盖完整
- 用示例中的实际场景反推正文中的规则是否自洽
- 从"AI 执行时能否做出正确判断"反推描述是否需要显式化

---

## 智能体重要提示

1. **这是一个 npm 项目** - 根目录有 package.json
2. **运行 lint** - 每次修改后必须执行 `npm run lint`
3. **不要手动修改 marketplace.json** - 由 `build/lint.mts` 自动生成
4. **技能是主要产出物** - 每个技能都是独立的 SKILL.md
5. **中文是主要语言** - 描述和文档使用中文
6. **始终使用中文交互** - 智能体必须始终使用中文与用户进行交流，无论用户使用何种语言提问，都必须用中文回答
7. **本地测试后再提交** - 将技能复制到 OpenCode 并测试调用

---

## 关键参考

- `skills/yy-review/SKILL.md` - 代码质量检查工作流
- `skills/yy-commit/SKILL.md` - Git 提交约定
- `skills/yy-lint/SKILL.md` - 代码风格检查工作流
- `skills/yy-create-skill/SKILL.md` - 技能创建指南
- `build/lint.mts` - lint 入口脚本
- `.claude-plugin/marketplace.json` - 技能市场配置
- `rules/file-scope-limit/RULE.md` - 文件修改范围限制规则

## 需要遵守的规则

- [@rules/markdown/RULE.md](./rules/markdown/RULE.md)
- [@rules/text/RULE.md](./rules/text/RULE.md)

## 路径格式规范

- 在文档中提及文件路径时，优先使用相对路径，以保持跨设备下的通用性
- 在终端中提及文件路径时，优先使用绝对路径，以方便终端/IDE 将其识别为可点击的链接
- 使用正斜杠作为路径分隔符，路径包含空格时使用引号包裹，以确保跨平台兼容性和正确解析
