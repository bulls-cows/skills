# lint 脚本模式参考

本文件提供 `yy-create-lint` 接入 `npm run lint` 时可参考的脚本模式。使用时必须先读取目标项目已有脚本、依赖和配置，再按项目现状裁剪；不要无差别复制全部片段。

## 通用约束

- `npm run lint` 或等价入口必须覆盖格式化、代码检查、Markdown 检查、类型检测和测试流程。
- 已有脚本命名、包管理器和串联方式可用时优先复用，不强制改成模板命名。
- 接入完成后不主动执行 `npm run lint`，只在输出中说明后续验证建议。
- 没有 `package.json` 的项目可创建最小化 `package.json` 承载统一入口。

## Node.js 或 TypeScript 项目

适用于普通 Node.js、TypeScript 脚本和库项目。

```json
{
  "scripts": {
    "lint": "node --run format && node --run lint:code && node --run lint:markdown && node --run typecheck && node --run test",
    "format": "prettier . --write",
    "lint:code": "eslint . --fix",
    "lint:markdown": "markdownlint \"**/*.md\" --fix",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test": "node --test test/**/*.test.ts"
  }
}
```

## Vue 或前端项目

适用于已有 Vite、Vue、Vitest、`vue-tsc` 或 `run-s` 风格的前端项目。

```json
{
  "scripts": {
    "lint": "node --run format && run-s lint:* && node --run type-check && node --run test",
    "format": "prettier --write src public",
    "lint:eslint": "eslint . --fix --cache",
    "lint:markdown": "markdownlint \"**/*.md\" --fix",
    "type-check": "vue-tsc --build",
    "test": "vitest run"
  }
}
```

## Python 项目

适用于已有 `pyproject.toml`、Ruff、pytest 或 unittest 的 Python 项目。`package.json` 只作为 npm 统一入口，Python 依赖仍优先放在 `pyproject.toml`。

```json
{
  "scripts": {
    "lint": "node --run format && node --run lint:code && node --run lint:markdown && node --run typecheck && node --run test",
    "format": "python -m ruff format .",
    "lint:code": "python -m ruff check . --fix",
    "lint:markdown": "markdownlint \"**/*.md\" --fix",
    "typecheck": "python -m pyright .",
    "test": "python -m unittest discover -s tests"
  }
}
```

如果项目没有类型检测依赖，但已有类型标注和依赖声明，可优先复用 mypy 或 pyright；如果类型信息不足，应在输出中说明暂不接入类型检测的原因和后续补齐建议。

## 混合项目

适用于同时包含前端、Node.js 和 Python 的项目。建议先拆分语言级子脚本，再由统一入口串联。

```json
{
  "scripts": {
    "lint": "node --run format && node --run lint:code && node --run lint:markdown && node --run typecheck && node --run test",
    "format": "prettier . --write && python -m ruff format .",
    "lint:code": "eslint . --fix && python -m ruff check . --fix",
    "lint:markdown": "markdownlint \"**/*.md\" --fix",
    "typecheck": "tsc -p tsconfig.json --noEmit && python -m pyright .",
    "test": "node --test test/**/*.test.ts && python -m unittest discover -s tests"
  }
}
```

## Markdown 检查范围

Markdown 检查应排除依赖目录、构建产物、虚拟环境和缓存目录。可优先复用项目已有 markdownlint 配置；缺失配置时再新增最小配置。

```json
{
  "scripts": {
    "lint:markdown": "markdownlint \"**/*.md\" --ignore node_modules --ignore dist --ignore build --ignore .venv --fix"
  }
}
```

## 最小测试入口

如果项目没有测试用例，只创建用于跑通流程的 smoke test，不添加业务断言。

- Node.js：优先使用 `node --test`，没有 TypeScript 运行条件时使用 `.js` 测试文件。
- 前端：优先复用项目已有 Vitest 或 Jest 配置。
- Python：优先复用 pytest 或 unittest；没有依赖管理时优先使用标准库 `unittest`。
