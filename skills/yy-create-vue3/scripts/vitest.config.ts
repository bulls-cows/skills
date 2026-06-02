import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";
import { createRuntimeDefines } from "./vite.shared";

export default defineConfig({
  plugins: [vue()],
  define: createRuntimeDefines(),
  resolve: {
    alias: {
      "@src": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["tests/**/*.spec.ts", "tests/**/*.test.ts"],
  },
});
