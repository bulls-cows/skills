# Vue3 组合式函数（Hooks）规范

本规范涵盖 Hooks 的命名、文件组织、返回值、使用方式及抽离建议。

---

## 一、命名与文件组织

- 必须以 `use` 开头（如 `useTable`、`useSearchForm`）。
- 文件名与函数名一致，存放在 `src/hooks/` 目录（全局放在 `@src/hooks/`，局部放在组件同级目录）。

---

## 二、返回值规范

- 统一返回对象
- 禁止直接返回 `reactive` 对象。
- 禁止将 Hooks 挂载到响应式数据上（如 `const state = reactive(useXxx())`）。

---

## 三、使用规范

- 组件中通过 `const { ... } = useXxx()` 解构使用。
- **禁止**在 Hooks 内部直接调用生命周期钩子（除非 Hooks 本身在组件顶层执行）。
- 组件引入后按 **注释规范**（详见 `comments.md`）标注：`// hook: Hook名`。

---

## 四、抽离建议

可复用逻辑超过 30 行或跨 2 个以上组件使用时，必须抽离为 Hook。

| 场景                   | 处理方式          |
| ---------------------- | ----------------- |
| 表格数据 + 分页 + 加载 | `useTable`        |
| 搜索表单 + 重置 + 查询 | `useSearchForm`   |
| 表单校验逻辑           | `useFormValidate` |
| 弹窗开关 + 状态        | `useDialog`       |
| 文件上传逻辑           | `useUpload`       |
| 权限判断               | `usePermission`   |
