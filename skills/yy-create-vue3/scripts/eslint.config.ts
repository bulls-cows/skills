import pluginVue from "eslint-plugin-vue";
import eslintPluginOxlint from "eslint-plugin-oxlint";
import vueTs from "@vue/eslint-config-typescript";

export default [
  ...pluginVue.configs["flat/essential"],
  ...vueTs(),
  ...eslintPluginOxlint.configs["flat/all"],
  {
    files: ["src/**/*.{ts,vue}"],
    rules: {
      "vue/multi-word-component-names": "error",
    },
  },
];
