---
name: yy-sync-instructions-from-opencode
description: >
  将 .opencode.json 中的非 OpenCode 专属规则同步到 AGENTS.md。当 .opencode.json 文件发生改动时触发，
  确保通用规则不会仅存在于 .opencode.json 而缺失于 AGENTS.md。
---

# yy-sync-instructions-from-opencode

## 描述

将 `.opencode.json` 中的通用规则同步到 `AGENTS.md`，确保两边规则一致。同步方向为单向：`.opencode.json` → `AGENTS.md`，尽量不修改 `.opencode.json`。

## 使用场景

- `.opencode.json` 文件发生改动后，需要检查是否有通用规则缺失于 AGENTS.md
- 主动检查 `.opencode.json` 与 AGENTS.md 的规则一致性

不应触发：

- 只是查看 `.opencode.json` 内容
- 修改与规则无关的配置项

## 指令

### 1. 读取两个文件

- 读取 `.opencode.json` 的 `instructions` 数组
- 读取 `AGENTS.md` 全文（而非仅"需要遵守的规则"章节），因为部分规则可能已在其他章节中体现

### 2. 逐条分类 instructions 中的规则

对 `instructions` 数组中的每一条，按以下规则分类：

- **文件路径引用**（以 `./` 开头或匹配已知文件名如 `AGENTS.md`）：跳过，AGENTS.md 已通过 `@` 语法引用
- **OpenCode 专属规则**：跳过，这类规则仅适用于 OpenCode 环境。判断标准：
  - 规则内容涉及 OpenCode 工具特有的功能或配置（如 OpenCode 的特定命令、快捷键、UI 行为）
  - 规则内容是对 OpenCode 工具本身的操作约束（而非通用的编码/协作规范）
  - 示例："本地测试后再提交，将技能复制到 OpenCode 并测试调用"——这条规则指定了使用 OpenCode 作为测试工具，属于 OpenCode 专属
- **通用规则**：AGENTS.md 中没有的、且不是 OpenCode 专属的规则，需要同步
  - 判断"AGENTS.md 中没有"时，需检查 AGENTS.md **全文**，而非仅"需要遵守的规则"章节
  - 如果规则内容已在 AGENTS.md 其他章节中体现（语义等价），视为"已有"，无需重复添加

### 3. 同步通用规则到 AGENTS.md

- 将步骤 2 识别出的通用规则，添加到 AGENTS.md 的 `## 需要遵守的规则` 章节末尾
- 保持 AGENTS.md 现有规则的格式和顺序

### 4. 验证一致性

- 确认所有通用规则在 AGENTS.md 中已存在
- 确认未修改 `.opencode.json`
- 确认未将 OpenCode 专属规则同步到 AGENTS.md

### 5. 输出结果

```markdown
## 同步结果

### 规则分类
- 文件路径引用: [数量] 条（已跳过）
- OpenCode 专属规则: [数量] 条（已跳过）
- 通用规则: [数量] 条

### 同步操作
- 新增到 AGENTS.md: [规则内容列表]
- 无需同步: [说明]

### 一致性验证
- 通用规则同步: ✅ 通过 / ❌ 未通过
- .opencode.json 未被修改: ✅ 通过 / ❌ 未通过
```
