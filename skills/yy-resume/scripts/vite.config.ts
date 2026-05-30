import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import type { ServerResponse } from 'http'

/**
 * 终止开发服务器的 Vite 插件。
 * 注册 /__stop-server 端点，供前端"停止服务"按钮调用。
 */
function stopServerPlugin() {
  return {
    name: 'stop-server',
    configureServer(server: { middlewares: { use: (path: string, handler: (req: import('http').IncomingMessage, res: ServerResponse) => void) => void } }) {
      server.middlewares.use('/__stop-server', (_req, res) => {
        res.end('Server is stopping...')
        setTimeout(() => process.exit(0), 100)
      })
    },
  }
}

export default defineConfig({
  plugins: [vue(), stopServerPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
