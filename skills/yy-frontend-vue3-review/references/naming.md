# D04 · 命名规范

**严重程度**：🟡 中等

---

## 命名规范表

| 类型       | 规范                               | 示例                             |
| ---------- | ---------------------------------- | -------------------------------- |
| API 函数   | `api` + Method + URLPath（小驼峰） | `apiGetUserInfo`, `apiPostLogin` |
| 事件函数   | `on` + EventName（小驼峰）         | `onClickSubmit`, `onChangeInput` |
| 变量/方法  | 小驼峰                             | `fetchData`, `searchQuery`       |
| 常量       | 全大写 + 下划线                    | `MAX_RETRY_COUNT`, `APP_CONFIG`  |
| Props      | 小驼峰                             | `userName`, `isLoading`          |
| 组件名     | PascalCase                         | `<UserList />`                   |
| 组件文件名 | 多单词 + PascalCase                | `UserList.vue`                   |
| emit 事件  | 小驼峰                             | `userChange`                     |
| Hooks      | `use` + 功能名                     | `useTable`, `useSearchForm`      |
| 布尔值     | `isXX` / `hasXX` / `showXX`        | `isLoading`, `hasPermission`     |

---

## TypeScript 类型约束

`.ts` / `.vue` script 中参数、返回值、变量必须明确类型，禁止使用 `any`（用 `unknown` 或具体类型）。

---

## 禁止无意义命名

如 `data1`、`temp2` 等无意义命名禁止使用。
