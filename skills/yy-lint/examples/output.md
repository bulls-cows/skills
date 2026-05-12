# 输出示例

本文档展示 yy-lint 技能的各类输出示例。

## 使用自定义命令成功示例

```text
🔧 执行 Lint 检查...

使用用户指定的命令: npm run eslint:fix
✓ Node.js 版本满足要求 (v22.18.0 >= v22.18.0)

执行 lint 检查...
✓ npm run eslint:fix 执行成功，代码质量检查通过！
```

## 成功示例（自动检测）

```text
🔧 执行 Lint 检查...

检查 lint 脚本可用性...
✓ 发现 lint 脚本: lint:fix
✓ Node.js 版本满足要求 (v22.18.0 >= v22.18.0)

执行 lint 检查...
✓ npm run lint:fix 执行成功，代码质量检查通过！
```

## 无 lint 脚本示例

```text
🔧 执行 Lint 检查...

检查 lint 脚本可用性...
ℹ 未发现 lint 脚本，跳过 lint 检查
```

## Node 版本不满足要求示例

```text
🔧 执行 Lint 检查...

检查 lint 脚本可用性...
✓ 发现 lint 脚本: lint
⚠️ Node.js 版本 (v18.17.0) 低于项目要求 (v20.15.0)，跳过 lint 检查
```

## lint 错误示例

```text
🔧 执行 Lint 检查...

检查 lint 脚本可用性...
✓ 发现 lint 脚本: lint:fix
✓ Node.js 版本满足要求

执行 lint 检查...
✗ npm run lint:fix 发现错误

[显示报错信息（不含警告）]

尝试自动修复报错...
[修复过程和结果]
```
