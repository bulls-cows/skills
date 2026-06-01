# 代码检查配置引用

## 权威来源

- `../scripts/eslint.config.ts`
- `../scripts/.prettierrc.json`
- `../scripts/.editorconfig`

## 使用方式

- 创建项目时优先直接复制这 3 个文件。
- 若用户没有额外规范要求，保持 ESLint、Prettier、EditorConfig 三者组合不变。
- 若后续新增规则，以 `scripts/` 中对应文件为唯一维护入口。

## 关键检查点

- ESLint 使用扁平化配置，并保留 Vue、TypeScript、Oxlint 的组合。
- Prettier 维持 `semi: true`、`singleQuote: false`、`trailingComma: "all"`。
- EditorConfig 维持 2 空格缩进、UTF-8、LF 换行。
