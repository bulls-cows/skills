# 输出示例

本文档展示创建交接文档后的预期输出示例。

## 示例 1：新建交接文档

### 创建结果

已新建 `handoff.md`：

- 路径：`D:/project/.claude/specs/20260326_120000_some-task/handoff.md`
- 操作：新建

### 已写入的核心信息

- 当前任务目标
- 必读文件顺序
- 已确认的路由、目录、样式、命名规则
- 当前尚未开始开发
- 新会话可直接复制使用的提示词

### 未确认项

无。新会话可直接接力。

---

## 示例 2：更新交接文档

### 更新结果

已更新 `handoff.md`：

- 路径：`D:/project/.claude/specs/20260326_120000_some-task/handoff.md`
- 操作：更新

### 变更内容

- 当前状态：已完成步骤 1-3，待执行步骤 4
- 接力要求：从步骤 4 开始

### 未确认项

无。新会话可直接接力。

---

## 示例 3：handoff.md 内容示例

```text
# handoff.md

## 任务位置

- 项目目录：D:/project
- 规格目录：D:/project/.claude/specs/20260326_120000_some-task

## 开工前必读

1. AGENTS.md
2. spec.md
3. tasks.md
4. checklist.md

## 任务目标

实现用户登录功能，包含表单验证和错误提示。

## 已确认约束

- 使用 Vue 2 + Options API
- 样式使用 BEM 命名
- 表单验证使用 vee-validate
- 不使用 TypeScript

## 当前状态

- 已完成：规格文档、任务拆解
- 未开始：开发实现

## 接力要求

- 先阅读 spec.md 理解需求
- 从 tasks.md 中的第一个未完成任务开始
- 完成每个任务后更新 checklist.md

## 建议起步顺序

1. 阅读 AGENTS.md 了解项目规范
2. 阅读 spec.md 理解需求细节
3. 查看 tasks.md 确认当前进度
4. 开始执行第一个未完成任务

## 可直接发给新会话的提示词

请阅读 D:/project/.claude/specs/20260326_120000_some-task/handoff.md，
理解当前任务状态后继续开发。
```
