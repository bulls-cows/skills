# TypeScript 配置引用

## 权威来源

- `../scripts/tsconfig.json`
- `../scripts/tsconfig.app.json`
- `../scripts/tsconfig.node.json`
- `../scripts/tsconfig.test.json`

## 使用方式

- 创建项目时整组复制 `tsconfig*.json`，不要手写拆分。
- 仅在路径或包含范围与目标项目实际结构不一致时做最小调整。
- `@src/*` 路径映射必须与 `vite.config.ts` 保持一致。

## 关键检查点

- `tsconfig.json` 负责引用入口。
- `tsconfig.app.json` 覆盖应用源码和 `src/typings`。
- `tsconfig.node.json` 覆盖 Vite、ESLint 和脚本侧配置。
- `tsconfig.test.json` 覆盖测试文件，并与应用侧路径别名保持同步。
