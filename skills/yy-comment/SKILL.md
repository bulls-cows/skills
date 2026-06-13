---
name: yy-comment
description: >
  为代码添加注释。当用户要求"加注释"、"添加文档注释"、"补充注释"、
  "写 docstring"、"加 Javadoc"、"给模板加注释"、"给样式加注释"时触发。
  不适用于：实现新功能、修改代码逻辑、删除代码，或为每行代码强制加注释。
---

# yy-comment

## 描述

为代码添加注释的通用技能，支持多种编程语言和标记语言。遵循跨语言通用规则，并按语言加载特定注释规范；语言特定规则与通用规则冲突时，以语言特定规则优先。

## 使用场景

当用户表达以下意图时触发：

- 为代码文件或指定函数/类/方法添加注释
- 补充文档注释（docstring、Javadoc、KDoc、PHPDoc 等）
- 为代码逻辑添加解释性注释
- 为 HTML/Vue 模板添加结构注释
- 为 CSS/SCSS/LESS 添加样式注释

不应触发：

- 用户要求实现新功能、修改代码逻辑或删除代码
- 文件已有完整注释且用户未明确要求补充
- 用户要求为每行代码都加注释（过度注释）

## 规则层级

通用规则定义在 `resources/common.md`，语言特定规则定义在 `resources/{语言}.md`。

**当特定语言的规则与通用规则冲突时，以特定语言的规则优先。**

## 支持的语言

- Python → `resources/python.md`
- Java → `resources/java.md`
- C/C++ → `resources/c-cpp.md`
- C# → `resources/csharp.md`
- Go → `resources/go.md`
- Rust → `resources/rust.md`
- Swift → `resources/swift.md`
- Kotlin → `resources/kotlin.md`
- Ruby → `resources/ruby.md`
- PHP → `resources/php.md`
- Shell/Bash → `resources/shell.md`
- SQL → `resources/sql.md`
- JavaScript/TypeScript → `resources/js-ts.md`
- HTML/CSS → `resources/html-css.md`

遇到未列出语言的文件时，使用通用规则和该语言的注释语法常识处理。

## 指令

### 步骤 1. 确定范围

**决策分支**：

- **用户指定文件**：读取目标文件
- **用户指定函数/类/方法**：定位目标
- **用户未指定**：通过 `git diff` 查找变更文件，过滤为支持类型的文件

对于超过 500 行的文件，先告知用户文件规模，确认后再执行。

### 步骤 2. 识别语言并加载规则

- 根据文件扩展名识别语言
- 加载 `resources/common.md` 中的通用规则
- 加载 `resources/{语言}.md` 中的语言特定规则（如存在）
- 当特定语言的规则与通用规则冲突时，以语言特定规则优先

### 步骤 3. 添加注释

按通用规则和语言特定规则执行：

- 为函数/类/方法/接口添加文档注释
- 为重要模块级常量和类型定义添加注释
- 在关键逻辑步骤前添加内部注释（解释"为什么"）
- 跳过自解释代码和显而易见的逻辑
- 已有注释内容正确则保留，仅在缺失处补充；内容过时则修正

### 步骤 4. 输出结果

修改目标文件后，报告：

- 添加了注释的函数/类/接口/模块列表
- 各类注释数量：文档注释 N 处、内部逻辑注释 N 处

## 安全边界

- 不修改代码逻辑、不删除已有代码
- 不删除已有的正确注释
- 不为自解释代码强制添加注释
- 不修改自动生成的代码文件（如构建产物、编译输出）

---

## 相关资源

- `resources/common.md` - 跨语言通用注释规则（判断标准、避免模式、标注约定）
- `resources/{语言}.md` - 各语言特有的注释语法和规范
