---
name: yy-lint
description: >
  执行代码 lint 检查。用于：用户提到"lint"、"代码检查"、"代码风格检查"、
  "运行 lint"时触发。
---

# yy-lint

## 描述

执行代码 lint 检查，自动检测 lint 脚本、验证 Node 版本、执行检查并尝试自动修复报错（不修复警告）。支持自定义命令。

## 使用场景

- 用户提到"lint"、"代码检查"、"代码风格检查"
- 用户要求运行 lint 检查
- 用户要求检查代码风格问题
- 用户指定自定义 lint 命令（如 `/yy-lint npm run eslint:fix`）

不应触发：

- 用户只是查看代码
- 用户要求重构代码
- 用户要求修复 bug（除非明确提到 lint）
- 用户要求编写测试

## 指令

### 1. 确定执行命令

按优先级确定要执行的命令：

1. 用户明确指定的命令（如 `/yy-lint npm run eslint:fix`）
2. `package.json` 中的 `lint:fix` 脚本
3. `package.json` 中的 `lint` 脚本

若无可用命令，提示用户并结束执行。

### 2. 验证 Node 版本

- 检查 `.nvmrc` 文件是否存在
- 若不存在，跳过版本验证，继续执行
- 若存在，验证当前 Node 版本是否满足要求
- 若不满足，显示警告并结束执行

### 3. 执行 lint 检查

- 执行确定的命令并捕获 exit code
- **若 exit code 为 0**：显示成功消息，不读取输出日志
- **若 exit code 非 0**：读取错误日志，仅修复报错（error），不修复警告（warning）

### 4. 输出结果

输出格式：执行状态、命令名称、报错数量（如有）、修复结果（如有）。

详细工作流程参考 `resources/workflow.md`，输出示例参考 `examples/output.md`。

## 相关资源

- `examples/output.md`：各类输出示例
- `resources/workflow.md`：详细工作流程和错误修复原则
