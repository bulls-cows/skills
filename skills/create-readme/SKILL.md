---
name: create-readme
description: >
  创建或更新项目根目录下的 README.md 文件。自动分析项目结构，
  生成符合项目特点的 README 文档，或根据用户需求更新现有 README。
icon: 📄
examples:
  - /create-readme
  - 帮我创建项目的 README 文件
  - 更新 README.md
---

# Create README

创建或更新项目根目录下的 README.md 文件。

## When to use

- 用户要求创建 README.md 文件
- 用户要求更新或完善 README.md
- 项目缺少文档说明时
- 用户说"帮我写个 README"

## Don't use when

- 用户要求创建其他文档（如 CHANGELOG、CONTRIBUTING 等）
- 简单的文件读取操作
- 用户要求修改代码
- 用户只是想查看 README 内容

## Steps

### 步骤 1：分析项目结构

扫描项目根目录，识别关键文件和目录：

- **包管理文件**：`package.json`、`pom.xml`、`build.gradle`、`requirements.txt`、`Cargo.toml`、`go.mod` 等
- **配置文件**：`tsconfig.json`、`.eslintrc`、`pyproject.toml` 等
- **源码目录**：`src/`、`lib/`、`app/`、`main/` 等
- **文档目录**：`docs/`、`examples/` 等
- **测试目录**：`test/`、`tests/`、`__tests__/` 等
- **协议文件**：`LICENSE`、`LICENSE.txt` 等

根据识别的文件判断项目类型：
- Node.js/前端项目
- Python 项目
- Java 项目
- Go 项目
- Rust 项目
- 其他类型

### 步骤 2：检查现有 README.md

检查项目根目录下是否已存在 README.md 文件：

**情况 A：README.md 不存在**

- 直接进入步骤 3 收集项目信息
- 准备创建新的 README.md

**情况 B：README.md 已存在**

- 读取现有 README.md 内容
- 分析现有结构和内容
- 询问用户更新策略：
  1. **覆盖**：完全重新生成
  2. **补充**：保留现有内容，补充缺失部分
  3. **优化**：优化现有内容的结构和表达

### 步骤 3：收集项目信息

根据项目类型收集以下信息：

**基本信息：**
- 项目名称（从 package.json、目录名等获取）
- 项目描述（从配置文件或询问用户）
- 版本号（从配置文件获取）

**技术信息：**
- 主要技术栈和框架
- 运行环境要求（Node 版本、Python 版本等）
- 依赖项（主要依赖，不需要列出全部）

**使用信息：**
- 安装方式
- 使用方法/启动命令
- 配置说明（如有必要）

**其他信息：**
- 开源协议（从 LICENSE 文件获取）
- 作者/维护者信息
- 贡献指南（如有）

### 步骤 4：生成或更新 README.md

根据收集的信息生成 README.md 内容。

**标准结构模板：**

```markdown
# 项目名称

简短的项目描述

## 特性

- 特性 1
- 特性 2
- ...

## 环境要求

- Node.js >= x.x.x
- 或其他环境要求

## 安装

安装命令

## 使用

使用说明和示例

## 配置

配置说明（如适用）

## 开发

开发相关命令和说明

## 协议

开源协议信息
```

**编写原则：**

1. **简洁明了**：避免冗长，突出重点
2. **结构清晰**：使用合理的标题层级
3. **示例完整**：代码示例要可直接运行
4. **链接有效**：确保所有链接可访问
5. **语言规范**：
   - 中文项目使用中文
   - 专有名词保留英文（如 Vue、TypeScript、API）
   - 代码块标注语言类型

### 步骤 5：确认并写入

1. 向用户展示生成的 README.md 内容预览
2. 询问用户是否满意，是否需要调整
3. 根据用户反馈进行修改
4. 确认后写入文件

## Output contract

生成的 README.md 文件应包含：

### 必要内容

- 项目名称和描述
- 安装方式
- 基本使用方法

### 推荐内容

- 环境要求
- 特性列表
- 配置说明
- 开发指南
- 开源协议

### 可选内容

- 贡献指南
- 变更日志链接
- 联系方式
- 致谢

## 输出示例

```
📄 正在分析项目结构...

检测到项目类型：Node.js
发现关键文件：
- package.json
- tsconfig.json
- src/

📄 检查现有 README.md...
README.md 不存在，将创建新文件

📄 收集项目信息...
- 项目名称：my-project
- 版本：1.0.0
- 描述：一个示例项目
- 主要依赖：express, typescript

📄 生成 README.md 内容...

[显示生成的 README.md 内容预览]

✓ README.md 已创建：/path/to/README.md
```

## 注意事项

- 不要假设项目使用未发现的框架或工具
- 如果无法确定某些信息，主动询问用户
- 保持 README 的简洁性，不要过度详细
- 对于复杂项目，建议将详细文档放在 `docs/` 目录
- 尊重用户现有的 README 结构偏好
