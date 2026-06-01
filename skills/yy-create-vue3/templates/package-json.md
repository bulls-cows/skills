# package.json 配置引用

## 权威来源

- `../scripts/package.json`

## 使用方式

- 创建项目时，以 `scripts/package.json` 为基础模板。
- 将 `name` 替换为项目名称，保持英文短横线命名。
- 除非用户明确要求调整构建链路，否则保留现有 `scripts`、依赖和 `engines` 约束。

## 关键检查点

- 包管理工具使用 `npm`，非 `pnpm`。
- `lint` 仍需保持 `format -> lint:* -> type-check -> test` 的完整流水线。
- 若复制后有差异，以 `scripts/package.json` 当前内容为准，不回写到本文件。
