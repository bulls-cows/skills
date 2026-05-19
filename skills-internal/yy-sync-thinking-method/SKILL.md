# yy-sync-thinking-method

同步维护"AI 思考方式"在多个文件中的一致性。

## 何时使用

当需要新增、修改或删除 AI 思考方式时使用，确保变更同步到所有关联文件。

## 不应使用的情况

- 只是查看 AI 思考方式内容
- 修改与思考方式无关的章节

## 关联文件

"AI 思考方式"分布在以下 3 处，修改时必须同步：

- `AGENTS.md`（`## AI 思考方式` 章节）— 权威来源
- `skills/yy-init/templates/agents-minimal-template.md`（`## AI 思考方式` 章节）— 模板副本，内容应与 AGENTS.md 完全一致
- `skills/yy-optimize/SKILL.md`（步骤 2、3）— 适配版本，将思考方式转化为具体分析方法

## 同步规则

### AGENTS.md 与模板文件

两者的 `## AI 思考方式` 章节内容必须完全一致（逐字匹配）。

### yy-optimize 与权威来源

yy-optimize 中是思考方式的**应用适配**，非直接复制。同步检查标准：

- 权威来源中的每个思考方式，在 yy-optimize 中应有对应的分析方法
- 权威来源新增思考方式时，评估是否需要在 yy-optimize 中新增对应方法
- 权威来源删除思考方式时，yy-optimize 中对应方法应同步移除

## 执行步骤

1. **确定变更内容**
   - 用户指定要新增、修改或删除的思考方式
   - 如果用户未明确指定，询问具体变更内容

2. **更新权威来源**
   - 修改 `AGENTS.md` 的 `## AI 思考方式` 章节

3. **同步模板文件**
   - 将 `AGENTS.md` 的 `## AI 思考方式` 章节完整复制到 `skills/yy-init/templates/agents-minimal-template.md` 对应位置

4. **同步 yy-optimize**
   - **新增思考方式**：评估是否适合嵌入 yy-optimize 的分析步骤，适合则新增对应方法
   - **修改思考方式**：检查 yy-optimize 中对应方法是否需要同步调整
   - **删除思考方式**：移除 yy-optimize 中对应的方法

5. **验证一致性**
   - 确认 AGENTS.md 与模板文件的 AI 思考方式章节内容一致
   - 确认 yy-optimize 中的方法与权威来源的思考方式对应关系正确

## 输出格式

```markdown
## 同步结果

### 变更内容

- [新增/修改/删除]：[思考方式名称]

### 已更新文件

- AGENTS.md: [具体变更]
- skills/yy-init/templates/agents-minimal-template.md: [具体变更]
- skills/yy-optimize/SKILL.md: [具体变更 / 无需变更]

### 一致性验证

- AGENTS.md ↔ 模板文件: ✅ 一致 / ❌ 不一致
- AGENTS.md ↔ yy-optimize: ✅ 对应关系正确 / ❌ 缺少对应
```
