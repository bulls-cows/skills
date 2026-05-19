# 规则系统（Rules）

<cite>
**本文引用的文件**
- [rules/file-scope-limit/RULE.md](file://rules/file-scope-limit/RULE.md)
- [rules/markdown/RULE.md](file://rules/markdown/RULE.md)
- [rules/text/RULE.md](file://rules/text/RULE.md)
- [AGENTS.md](file://AGENTS.md)
</cite>

## 目录

- [简介](#简介)
- [项目结构](#项目结构)
- [核心组件](#核心组件)
- [架构总览](#架构总览)
- [详细组件分析](#详细组件分析)
- [依赖分析](#依赖分析)
- [性能考虑](#性能考虑)
- [故障排查指南](#故障排查指南)
- [结论](#结论)
- [附录](#附录)

## 简介

规则是对 AI 行为的约束性文档，以 RULE.md 为载体，通过 `@` 语法在 AGENTS.md 中引用后生效。规则与技能的区别：规则是被动约束，技能是主动工作流。

**章节来源**

- [AGENTS.md:40-50](file://AGENTS.md#L40-L50)

## 项目结构

```text
rules/
├── file-scope-limit/RULE.md
├── frontend-rules-vue2/RULE.md
├── frontend-rules-vue3/RULE.md
├── markdown/RULE.md
├── npm/RULE.md
└── text/RULE.md
```

**章节来源**

- [AGENTS.md:50-60](file://AGENTS.md#L50-L60)

## 核心组件

- **file-scope-limit**：文件修改范围限制，要求 AI 在授权目录内操作，跨目录需获得用户明确授权
- **markdown**：Markdown 书写规范，要求围栏代码块声明语言标识，简单映射优先用列表而非表格
- **text**：文本表达规范，要求默认中文、精简专业、克制客观、面向执行

**章节来源**

- [rules/file-scope-limit/RULE.md:1-10](file://rules/file-scope-limit/RULE.md#L1-L10)
- [rules/markdown/RULE.md:1-10](file://rules/markdown/RULE.md#L1-L10)

## 架构总览

```mermaid
graph TB
    AGENTS[AGENTS.md] -->|@ 引用| R1[file-scope-limit]
    AGENTS -->|@ 引用| R2[markdown]
    AGENTS -->|@ 引用| R3[text]
    AGENTS -->|@ 引用| R4[npm]
    AGENTS -->|@ 引用| R5[frontend-rules-vue3]
```

**图表来源**

- [AGENTS.md:40-60](file://AGENTS.md#L40-L60)

**章节来源**

- [AGENTS.md:40-60](file://AGENTS.md#L40-L60)

## 详细组件分析

### file-scope-limit

- 设计要点：AI 只能修改授权目录内的文件，跨目录操作需获得用户明确授权
- 数据流：用户指定目录 → AI 在授权范围内操作 → 需要跨目录时请求授权

**章节来源**

- [rules/file-scope-limit/RULE.md:1-30](file://rules/file-scope-limit/RULE.md#L1-L30)

### markdown

- 设计要点：所有围栏代码块必须声明语言标识，简单映射优先用列表而非表格
- 数据流：lint 检查 → 发现 MD040 错误 → 修复代码块语言标识

**章节来源**

- [rules/markdown/RULE.md:1-30](file://rules/markdown/RULE.md#L1-L30)

## 依赖分析

- 内部依赖：AGENTS.md（规则引用入口）
- 外部依赖：markdownlint-cli（规则检查工具）

**章节来源**

- [package.json:1-30](file://package.json#L1-L30)

## 性能考虑

- 规则通过 `@` 语法引用，只在需要时加载到上下文
- 规则内容精简，避免上下文膨胀

**章节来源**

- [AGENTS.md:50-60](file://AGENTS.md#L50-L60)

## 故障排查指南

- **规则未生效**：检查 AGENTS.md 中是否正确引用了规则文件
- **lint 报错**：检查 markdownlint 规则，确保所有代码块声明了语言标识

**章节来源**

- [rules/markdown/RULE.md:20-40](file://rules/markdown/RULE.md#L20-L40)

## 结论

规则系统通过 RULE.md 文件和 AGENTS.md 的 `@` 引用机制，实现了对 AI 行为的约束性控制。6 个规则覆盖文件操作范围、Markdown 格式、文本表达等核心约束场景。

**章节来源**

- [AGENTS.md:40-50](file://AGENTS.md#L40-L50)

## 附录

- [file-scope-limit RULE.md](file://rules/file-scope-limit/RULE.md)
- [markdown RULE.md](file://rules/markdown/RULE.md)
- [text RULE.md](file://rules/text/RULE.md)

**章节来源**

- [AGENTS.md:40-60](file://AGENTS.md#L40-L60)
