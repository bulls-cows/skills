---
name: yy-lint
description: >
  执行代码 lint 检查，包括检测 lint 脚本、验证 Node 版本、执行 lint 检查
  并尝试自动修复错误。支持自定义命令。
icon: 🔧
examples:
  - /yy-lint
  - /yy-lint npm run eslint:fix
  - /yy-lint npm run type-check
---

# yy-lint

执行代码 lint 检查，包括检测 lint 脚本、验证 Node 版本、执行 lint 检查并尝试自动修复错误。支持自定义命令。

## 功能特性

- 支持自定义命令：优先使用用户明确指定的命令
- 自动检测 `package.json` 中的 `lint:fix` 或 `lint` 脚本
- 命令优先级：用户指定命令 > `lint:fix` > `lint`
- 验证 Node.js 版本是否满足项目 `.nvmrc` 要求
- 执行 lint 进行代码风格和类型检查
- 尝试自动修复 lint 错误

## 使用方式

### 默认方式

直接调用 `/yy-lint`，自动检测并执行 `lint:fix` 或 `lint` 命令。

### 指定命令

调用 `/yy-lint <command>`，使用指定的命令执行：

- `/yy-lint npm run eslint:fix`
- `/yy-lint npm run type-check`
- `/yy-lint pnpm run lint`

## 工作流程

### 阶段一：确定要执行的命令

**优先级顺序（从高到低）：**

1. 用户明确指定的命令
2. `package.json` 中的 `lint:fix` 脚本
3. `package.json` 中的 `lint` 脚本

**执行逻辑：**

1. 检查用户是否提供了自定义命令参数
   - 如果有，直接使用该命令，跳过步骤 2-3，进入阶段二
2. 检查项目根目录下是否存在 `package.json` 文件
   - 如果存在，读取 `package.json` 中的 `scripts` 字段
3. 检查是否定义了 `lint:fix` 或 `lint` 命令（优先 `lint:fix`）

**情况 1：用户指定了自定义命令**

- 使用用户指定的命令
- 进入阶段二

**情况 2：package.json 不存在或无 lint 相关脚本**

- 显示提示信息，跳过 lint 检查
- 结束执行

**情况 3：存在 lint 相关脚本**

- 记录要执行的命令（`npm run lint:fix` 或 `npm run lint`）
- 进入阶段二

### 阶段二：验证 Node 版本

1. 检查项目根目录下是否存在 `.nvmrc` 文件
2. 如果存在，读取文件内容获取要求的 Node.js 版本
3. 使用 `node --version` 获取当前 Node.js 版本
4. 比较版本是否满足要求

**情况 1：.nvmrc 不存在或无法读取**

- 继续执行 lint 检查

**情况 2：Node 版本满足要求**

- 继续执行阶段三

**情况 3：Node 版本不满足要求**

- 显示警告信息（包含当前版本和要求版本）
- 跳过 lint 检查，结束执行

### 阶段三：执行命令检查

执行阶段一确定的命令（可能是用户指定的自定义命令或自动检测到的 lint 命令）。

**情况 1：命令执行成功，无错误**

- 显示成功消息
- 结束执行

**情况 2：命令执行发现错误**

- 显示错误信息
- 尝试自动修复错误
- 报告修复结果
- 结束执行

## 错误修复原则

修复 lint 报错时必须**正面解决问题**，不得回避：

- **不能**随意给变量添加 `any` 类型声明来绕过类型检查——这只是掩盖了潜在的类型错误
- **不能**删除未开发完毕的功能代码来消除报错——这会破坏用户的工作进度
- **应当**理解报错的实际含义，针对根本问题进行修复

## 并行任务时的例外

若当前有多个任务**正在并行执行**（多个子任务同时修改文件），**不要**在此期间执行 lint。

原因：lint 命令可能会自动修改本地代码（格式化等），若某个并行任务正在写入文件，可能导致文件内容异常或冲突。

等所有并行任务完成后，再统一执行一次 lint。

## 禁止主动执行的命令

- 除 lint 相关命令（`npm run lint:fix` 或 `npm run lint`）外的 `package.json` 中定义的其他命令
- 编译命令、构建命令、部署命令
- 任何自动执行的测试命令
- 除 `node --version` 外的其他 `npx` 命令

## 输出示例

### 使用自定义命令成功示例

```text
🔧 执行 Lint 检查...

使用用户指定的命令: npm run eslint:fix
✓ Node.js 版本满足要求 (v22.18.0 >= v22.18.0)

执行 lint 检查...
✓ npm run eslint:fix 执行成功，代码质量检查通过！
```

### 成功示例（自动检测）

```text
🔧 执行 Lint 检查...

检查 lint 脚本可用性...
✓ 发现 lint 脚本: lint:fix
✓ Node.js 版本满足要求 (v22.18.0 >= v22.18.0)

执行 lint 检查...
✓ npm run lint:fix 执行成功，代码质量检查通过！
```

### 无 lint 脚本示例

```text
🔧 执行 Lint 检查...

检查 lint 脚本可用性...
ℹ 未发现 lint 脚本，跳过 lint 检查
```

### Node 版本不满足要求示例

```text
🔧 执行 Lint 检查...

检查 lint 脚本可用性...
✓ 发现 lint 脚本: lint
⚠️ Node.js 版本 (v18.17.0) 低于项目要求 (v20.15.0)，跳过 lint 检查
```

### lint 错误示例

```text
🔧 执行 Lint 检查...

检查 lint 脚本可用性...
✓ 发现 lint 脚本: lint:fix
✓ Node.js 版本满足要求

执行 lint 检查...
✗ npm run lint:fix 发现错误

[显示错误信息]

尝试自动修复...
[修复过程和结果]
```
