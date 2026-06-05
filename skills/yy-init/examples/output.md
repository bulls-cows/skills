# 示例输出

## 输入

用户在一个 Vue3 + TypeScript 前端项目中执行 `/yy-init`。

## 输出

```markdown
# AGENTS.md

## 项目简介

- 本仓库是一个 Vue3 + TypeScript 前端项目
- 这是一个 npm 项目，根目录有 package.json

## 范围

- 本仓库默认语言: TypeScript, Vue
- 允许修改目录: src/, tests/, docs/
- 禁止修改目录: dist/, node_modules/

## 改动检查

**改动后必须执行:**

- 执行 `npm run lint` 检测代码风格
- 执行 `npm run type-check` 检测类型错误

**检查项:**

- 验证新增组件是否已注册到路由
- 验证新增 API 是否已添加类型定义

## 交付格式

- 修改后先说明修改原因和影响范围
- 所有文件引用都要带路径和行号

## 项目结构

- `src/` - 源代码目录
  - `components/` - 通用组件
  - `views/` - 页面组件
  - `api/` - API 请求封装
  - `stores/` - Pinia 状态管理
  - `router/` - 路由配置
  - `utils/` - 工具函数
- `tests/` - 测试目录
- `docs/` - 文档目录

## AI 能力模型

[与 AGENTS.md 的 AI 能力模型章节完全一致]

## 路径格式规范

- 在文档中提及文件路径时，优先使用相对路径，以保持跨设备下的通用性
- 在终端中提及文件路径时，优先使用绝对路径，以方便终端/IDE 将其识别为可点击的链接
- 使用正斜杠作为路径分隔符，路径包含空格时使用引号包裹，以确保跨平台兼容性和正确解析

## 终端命令能力识别

执行终端命令前，先识别当前终端能力，再选择命令写法：

1. 优先用当前 shell 的内置能力判断命令是否存在，不要直接试运行可能缺失的命令。
2. PowerShell 环境优先使用 `Get-Command` 判断命令可用性；`$PSVersionTable` 不存在时按 PowerShell v1 兼容处理。
3. PowerShell v1/v5 使用 Windows PowerShell 兼容写法，避免依赖 PowerShell 7 专属语法。
4. PowerShell 7 可使用现代语法，但仍需兼容当前项目命令约束。
5. Windows Git Bash 优先使用 `command -v` 判断命令可用性，并使用 Bash 路径和转义规则。
6. 无法确认终端类型时，使用最保守的基础命令，避免链式命令和 shell 专属语法。
7. 搜索文件或文本时，优先按能力选择：`rg` 可用则用 `rg`；PowerShell 可用则用 `Get-ChildItem` / `Select-String`；Git Bash 可用则用 `find` / `grep`；CMD 可用则用 `dir` / `findstr`。

## 需要遵守的规则

- 始终使用中文交互，无论用户使用何种语言提问，都必须用中文回答
- 组件命名使用 PascalCase，文件命名使用 kebab-case

## 关键参考

- `src/router/index.ts` - 路由配置入口
- `.editorconfig` - 编辑器配置，编写内容时需遵循
- `README.md` - 项目说明文档
```
