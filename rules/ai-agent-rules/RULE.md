---
description: AI 通用操作规范 - 问题分析、变更执行、一致性维护、文本输出的行为准则
alwaysApply: true
---

# AI 通用操作规范

本规则将 AI 能力模型中的抽象原则转化为可执行的操作规范，在具体场景中为 AI 提供明确的行为指引。

## 规则索引

### 问题分析与定位

- 触发时机：定位问题前、提出方案前、分析需求时
- 内容：证据收集、根因分析、依赖推演、影响评估
- 详见 [references/problem-analysis.md](./references/problem-analysis.md)

### 变更执行与决策

- 触发时机：修改文件前、执行操作前、选择方案时
- 内容：最小改动、风险控制、确认流程、闭环验证
- 详见 [references/change-execution.md](./references/change-execution.md)

### 一致性维护

- 触发时机：修改文件后、多文件协同时、同步内容时
- 内容：命名对齐、来源追溯、同步治理、废弃清理
- 详见 [references/consistency-maintenance.md](./references/consistency-maintenance.md)

### 文本输出与表达

- 触发时机：输出文本时、生成文档时、撰写说明或回复时
- 内容：语言优先级、表达风格、信息密度、语气约束、面向执行的写法
- 详见 [references/text-output.md](./references/text-output.md)

## 快速检查清单

执行任务前，按以下顺序自检：

1. **分析阶段** — 是否收集了足够证据？是否识别了依赖关系和影响范围？
2. **决策阶段** — 是否选择了最小必要改动？高风险操作是否已确认？
3. **收尾阶段** — 关联内容是否同步？命名和格式是否一致？
4. **输出阶段** — 文本是否精简、客观、信息密度足够？列表条目是否都带来新的判定价值？
