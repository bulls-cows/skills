import fs from "node:fs";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { createRuntimeDefines } from "./vite.shared";

function excludePublicMock(): Plugin {
  return {
    name: "exclude-public-mock",
    closeBundle() {
      const mockDir = fileURLToPath(new URL("./dist/mock", import.meta.url));
      fs.rmSync(mockDir, { recursive: true, force: true });
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [vue(), vueDevTools(), excludePublicMock()],
  define: createRuntimeDefines(),
  resolve: {
    alias: {
      "@src": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
  },
  server: {
    host: "0.0.0.0",
    port: 4173,
  },
});
