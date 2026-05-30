import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import type { ServerResponse } from 'node:http';

/**
 * 终止开发服务器的 Vite 插件。
 * 注册 /__stop-server 端点，供前端"停止服务"按钮调用。
 */
function stopServerPlugin() {
  return {
    name: 'stop-server',
    configureServer(server: {
      middlewares: {
        use: (
          path: string,
          handler: (req: import('node:http').IncomingMessage, res: ServerResponse) => void
        ) => void;
      };
    }) {
      server.middlewares.use('/__stop-server', (_req, res) => {
        res.end('Server is stopping...');
        setTimeout(() => process.exit(0), 100);
      });
    },
  };
}

export default defineConfig({
  plugins: [vue(), stopServerPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
