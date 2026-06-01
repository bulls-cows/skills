# package.json 配置模板

## 基础结构

```json
{
  "name": "项目名称（英文短横线命名）",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "clean": "node ./scripts/clean.ts",
    "dev:test": "cross-env NODE_ENV=development MODE=test vite dev --mode development",
    "dev:production": "cross-env NODE_ENV=development MODE=production vite dev --mode development",
    "build:test": "node --run lint && cross-env NODE_ENV=production MODE=test vite build --mode production",
    "build:production": "node --run lint && cross-env NODE_ENV=production MODE=production vite build --mode production",
    "preview": "vite preview",
    "lint": "node --run format && run-s lint:* && node --run type-check && node --run test",
    "type-check": "vue-tsc --build",
    "test": "cross-env NODE_ENV=production MODE=test vitest run --config vitest.config.ts",
    "lint:oxlint": "oxlint . --fix",
    "lint:eslint": "eslint . --fix --cache",
    "lint:lf": "node ./scripts/convert-crlf-to-lf.ts --check",
    "format": "prettier --write --experimental-cli src/ public/mock"
  },
  "dependencies": {
    "vue": "^3.5.30",
    "vue-router": "^4.6.3",
    "pinia": "^3.0.4"
  },
  "devDependencies": {
    "@tsconfig/node24": "^24.0.4",
    "@types/node": "^24.12.0",
    "@vitejs/plugin-vue": "^6.0.4",
    "@vue/eslint-config-typescript": "^14.7.0",
    "@vue/test-utils": "^2.4.6",
    "@vue/tsconfig": "^0.9.0",
    "cross-env": "^10.1.0",
    "dotenv": "^17.4.2",
    "eslint": "^9.38.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-oxlint": "^1.51.0",
    "eslint-plugin-vue": "^10.8.0",
    "jsdom": "^29.0.1",
    "oxlint": "^1.51.0",
    "prettier": "^3.8.1",
    "sass": "^1.98.0",
    "typescript": "~5.9.3",
    "vite": "^7.3.1",
    "vitest": "^3.2.4",
    "vue-tsc": "^3.2.5"
  },
  "engines": {
    "node": ">=22.18.0 <23"
  }
}
```

## 关键说明

- 包管理工具使用 **npm**，非 pnpm
- `type: "module"` 启用 ES Module
- scripts 中的 `cross-env` 用于跨平台设置环境变量
- `lint` 命令包含 format → oxlint → eslint → type-check → test 的完整流水线
- `oxlint` 作为性能优先的 lint 工具，`eslint` 作为补充
- 可根据项目需要添加额外依赖（如字体库、图标库等）
