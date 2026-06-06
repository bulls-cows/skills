import { fileURLToPath } from "node:url";
import pluginVue from "eslint-plugin-vue";
import eslintPluginOxlint from "eslint-plugin-oxlint";
import vueTs from "@vue/eslint-config-typescript";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default [
  ...pluginVue.configs["flat/essential"],
  ...vueTs({
    parserOptions: {
      tsconfigRootDir: __dirname,
    },
  }),
  ...eslintPluginOxlint.configs["flat/all"],
  {
    files: ["src/**/*.{ts,vue}"],
    rules: {
      "vue/multi-word-component-names": "error",
    },
  },
];
