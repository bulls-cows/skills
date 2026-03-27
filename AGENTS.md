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

编写内容时，需遵循 [.editorconfig](./.editorconfig)

---

## 智能体重要提示

1. **这是一个 npm 项目** - 根目录有 package.json
2. **运行 lint** - 每次修改后必须执行 `npm run lint`
3. **不要手动修改 marketplace.json** - 由 `build/lint.mts` 自动生成
4. **技能是主要产出物** - 每个技能都是独立的 SKILL.md
5. **中文是主要语言** - 描述和文档使用中文
6. **本地测试后再提交** - 将技能复制到 OpenCode 并测试调用

---

## 关键参考

- `skills/yy-review/SKILL.md` - 代码质量检查工作流
- `skills/yy-commit/SKILL.md` - Git 提交约定
- `skills/yy-lint/SKILL.md` - 代码风格检查工作流
- `skills/yy-create-skill/SKILL.md` - 技能创建指南
- `build/lint.mts` - lint 入口脚本
- `.claude-plugin/marketplace.json` - 技能市场配置
- `rules/file-scope-limit/RULE.md` - 文件修改范围限制规则
