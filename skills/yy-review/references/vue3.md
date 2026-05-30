# Vue3 专项规则

## 项目类型识别

仅当 `package.json` 中 `dependencies` 或 `devDependencies` 的 `vue` 主版本为 `3` 时，才识别为 Vue3 项目。

## Composition API 识别

目标 `.vue` 文件中出现以下特征之一，即视为使用 Composition API：

- `<script setup>`
- `setup()` 函数
- `defineProps`、`defineEmits`
- `ref`、`reactive`、`computed`、`watch` 等 Composition API

## 技能委托规则

同时满足以下三个条件时，将审查任务委托给 `yy-frontend-vue3-review` 技能：

1. 确认为 Vue3 项目
2. 目标 `.vue` 文件使用 Composition API
3. 当前环境已安装 `yy-frontend-vue3-review`

**条件不满足时**：不进行技能委托，继续执行 yy-review 默认审核逻辑。

### 判断顺序

1. 先读取 `package.json`，仅根据 `dependencies` 或 `devDependencies` 中的 `vue` 主版本是否为 `3` 判断是否为 Vue3 项目。
2. 确认为 Vue3 项目后，再检查目标 `.vue` 文件是否使用 Composition API。
3. 只有同时满足 Vue3 项目、使用 Composition API、已安装 `yy-frontend-vue3-review` 三个条件时，才委托专项技能。
