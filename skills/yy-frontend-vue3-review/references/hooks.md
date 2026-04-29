# Hooks 规范

## 命名

- 必须以 `use` 开头 + 功能名（小驼峰）。
- 示例：`useTable`, `useSearchForm`, `usePagination`。

## 返回值

- **必须返回对象**，推荐使用 `toRefs` 解构后返回。
- **禁止**直接返回 `reactive` 对象。

## 使用模式

- 可复用逻辑超过 **30 行** 或跨 **2 个以上组件** 时，必须抽离为 Hook。
- Hooks 应放在 `@src/hooks/` 目录。

## 禁止项

- **禁止**将 Hooks 挂载到响应式数据上。

## 拆分条件

满足以下任一条件时必须拆分 Hook：

- 逻辑代码超过 **30 行**。
- 被 **2 个以上组件**复用。

## Hook 内部注释

- Hook 内部必须添加功能说明注释，描述用途、参数、返回值。
- 注释格式示例：

```typescript
/**
 * 表格数据管理 Hook
 * @param apiFn - 数据请求函数
 * @returns { tableData, loading, pagination, fetchData }
 */
export function useTable(apiFn) {
  // ...
}
```
