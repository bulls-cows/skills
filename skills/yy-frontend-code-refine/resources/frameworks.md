# 框架专有规则（Vue2 / Vue3 / React）

T02 代码结构排序按框架分别处理。本文件汇总三大框架的具体顺序。模型根据文件类型读对应小节即可。

---

## Vue 模板（`.vue` 通用）

模板属性顺序：

```text
is → v-for → key → v-if/v-else-if/v-else → v-show/v-cloak →
v-model → id → ref → class → style → props/attrs →
v-on（含 @ 简写）→ v-html/v-text → v-slot
```

模板只负责展示，不写复杂表达式。简单逻辑内联，不过度封装。

---

## Vue2 Options API

外层选项顺序：

```text
name → components → props → data → computed → watch → methods →
生命周期（beforeCreate → created → beforeMount → mounted →
beforeUpdate → updated → beforeDestroy → destroyed）
```

`methods` 内部顺序：

```text
init...() → getXxx / postXxx → onXxx → computedXxx
```

含义：

- `init` 前缀：初始化方法
- `getXxx / postXxx`：HTTP 请求方法（注意 T03 会建议改名为 `apiGetXxx / apiPostXxx`）
- `onXxx`：事件响应方法
- `computedXxx`：派生计算方法（注意能用 `computed` 选项就别用方法）

---

## Vue3 `<script setup>`

```text
1. 导入（import）
2. 类型定义（type / interface）
3. Props（defineProps）
4. Emits（defineEmits）
5. 常量（const）
6. 响应式状态（ref / reactive）
7. 计算属性（computed）
8. 监听器（watch / watchEffect）
9. 方法（function）
10. 生命周期钩子（onMounted 等）
```

### 组件名前置检测

检查 `package.json` 或 `node_modules` 是否安装 `unplugin-vue-setup-extend-plus`，最小检测命令：

```bash
# 任一命中即视为已安装
grep -q 'unplugin-vue-setup-extend-plus' package.json && echo installed
test -d node_modules/unplugin-vue-setup-extend-plus && echo installed
```

- 已安装：在 `<script setup>` 上添加 `name="PascalCase组件名"`。
- 未安装：不添加 `name`（否则构建时会报错或被忽略）。

---

## React（`.jsx` / `.tsx`）

```text
1. 导入（import）
2. 类型定义（type / interface）
3. 常量（const）
4. Hooks（useState / useEffect / useCallback / useMemo 等）
5. 工具函数（utils）
6. 组件定义（function / const MyComponent = ...）
7. 样式（styles）
```

注意：

- Hooks 必须放在组件顶层，不能在条件分支或循环内调用。
- 工具函数如果只服务本组件，可放在组件文件内；若被多处使用，建议提取到 `utils/`。
- 样式定义（CSS-in-JS / styled-components）通常放最后，便于一眼看到组件结构。
