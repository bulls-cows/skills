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

## lint 错误并成功修复示例（小规模改动）

```text
🔧 执行 Lint 检查...

检查 lint 脚本可用性...
✓ 发现 lint 脚本: lint:fix
✓ Node.js 版本满足要求

执行 lint 检查...
✗ npm run lint:fix 发现 3 个报错

定位报错根因...
✓ 3 个报错均为同一根因：src/utils/format.ts 中未使用的导入
✓ 修复规模评估：涉及 1 个文件，属于小规模改动

修复报错...
✓ 已移除未使用的导入
✓ 重新执行 lint 验证通过
```

## 无法定位根因示例

```text
🔧 执行 Lint 检查...

检查 lint 脚本可用性...
✓ 发现 lint 脚本: lint
✓ Node.js 版本满足要求

执行 lint 检查...
✗ npm run lint 发现 12 个报错

定位报错根因...
⚠ 未能定位以下报错的根因，未修改任何文件：

报错清单（按文件分组）：
- src/services/api.ts: TS2345 类型不匹配（3 处）
- src/components/List.tsx: TS2322 类型不可分配（9 处）

已排查方向：
- 报错涉及的类型定义来自 node_modules 中的 @types/foo，源码中未找到对应声明
- 疑似 @types/foo 版本与 foo 运行时版本不匹配

建议人工检查：
- 确认 foo 与 @types/foo 的版本是否匹配
- 如需我尝试升级依赖修复，请确认后执行
```

## 大规模修复方案确认示例

```text
🔧 执行 Lint 检查...

检查 lint 脚本可用性...
✓ 发现 lint 脚本: lint
✓ Node.js 版本满足要求

执行 lint 检查...
✗ npm run lint 发现 45 个报错

定位报错根因...
✓ 报错归为 2 类根因：
  1. 40 处：全项目未使用变量/导入（涉及 32 个文件）
  2. 5 处：tsconfig 未开启 noUnusedLocals 与现有规则冲突

修复规模评估：⚠ 涉及 32 个文件且需修改 tsconfig.json，属于大规模改动

修复方案（待确认）：
- 第 1 类：逐文件移除未使用的变量和导入，涉及 src/ 下 32 个文件
- 第 2 类：在 tsconfig.json 中开启 noUnusedLocals，与 ESLint 规则对齐
- 不修改任何业务逻辑

是否采纳该修复方案？确认后开始修改；如需调整范围或方式请告知。
```
