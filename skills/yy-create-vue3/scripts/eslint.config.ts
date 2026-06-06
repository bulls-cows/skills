import { fileURLToPath } from "node:url";
import pluginVue from "eslint-plugin-vue";
import eslintPluginOxlint from "eslint-plugin-oxlint";
import {
  configureVueProject,
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

configureVueProject({
  rootDir: __dirname,
});

export default [
  ...defineConfigWithVueTs(pluginVue.configs["flat/essential"], vueTsConfigs.recommended),
  ...eslintPluginOxlint.configs["flat/all"],
  {
    files: ["src/**/*.{ts,vue}"],
    rules: {
      "vue/multi-word-component-names": "error",
    },
  },
];
