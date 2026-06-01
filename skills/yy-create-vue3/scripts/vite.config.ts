import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createRuntimeDefines } from "./vite.shared";

export default defineConfig({
  base: "./",
  plugins: [vue()],
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
