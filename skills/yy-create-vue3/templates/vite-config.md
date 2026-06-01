# Vite 配置模板

## vite.config.ts

```typescript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createRuntimeDefines } from './vite.shared'

export default defineConfig({
  base: './',
  plugins: [vue()],
  define: createRuntimeDefines(),
  resolve: {
    alias: {
      '@src': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
  },
  server: {
    host: '0.0.0.0',
    port: 4173,
  },
})
```

### 关键配置说明

| 配置项            | 值               | 说明                                 |
| ----------------- | ---------------- | ------------------------------------ |
| `base`            | `"./"`           | 相对路径构建，适配 Electron/WebView2 |
| `resolve.alias`   | `@src` → `./src` | 路径别名，便于 AI agent 识别路径     |
| `build.sourcemap` | `true`           | 生成 sourcemap 便于调试              |
| `server.host`     | `"0.0.0.0"`      | 允许局域网访问                       |

## vite.shared.ts

```typescript
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

const currentDir = dirname(fileURLToPath(import.meta.url))

const MODE = process.env.MODE as TMode
const NODE_ENV = process.env.NODE_ENV as TNodeEnv

dotenv.config({
  path: [
    resolve(currentDir, `.env.${MODE}.local`),
    resolve(currentDir, `.env.${MODE}`),
    resolve(currentDir, `.env.local`),
    resolve(currentDir, `.env`),
  ].filter((path) => existsSync(path)),
})

export function createRuntimeDefines() {
  return {
    __APP_VERSION__: JSON.stringify('0.1.0'),
    __NODE_ENV__: JSON.stringify(NODE_ENV),
    __MODE__: JSON.stringify(MODE),
    __ENABLE_REPORT__: JSON.stringify('0'),
    __MOCK__: JSON.stringify('0'),
    __NEED_AUTH__: JSON.stringify('1'),
    __LOG_LEVEL__: JSON.stringify('INFO'),
  }
}
```

### 运行时定义说明

| 常量              | 来源         | 用途                   |
| ----------------- | ------------ | ---------------------- |
| `__APP_VERSION__` | package.json | 应用版本号             |
| `__NODE_ENV__`    | 环境变量     | development/production |
| `__MODE__`        | 环境变量     | test/production        |
| `__MOCK__`        | .env         | 是否启用 Mock 数据     |
| `__NEED_AUTH__`   | .env         | 是否需要登录认证       |
| `__LOG_LEVEL__`   | .env         | 日志级别               |
