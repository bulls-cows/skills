# D04 · 命名规范（🟡 中等）

## 命名约定表

| 类型 | 规范 | 示例 |
|------|------|------|
| API 函数 | `api` + Method + URLPath（小驼峰） | `apiGetUserInfo`, `apiPostLogin` |
| 事件函数 | `on` + EventName（小驼峰） | `onClickSubmit`, `onChangeInput` |
| 变量/方法 | 小驼峰 | `fetchData`, `searchQuery` |
| 常量 | 全大写 + 下划线 | `MAX_RETRY_COUNT`, `APP_CONFIG` |
| Props | 小驼峰 | `userName`, `isLoading` |
| 组件名 | PascalCase | `<UserList />` |
| 组件文件名 | 多单词 + PascalCase | `UserList.vue` |
| emit 事件 | 小驼峰 | `userChange` |
| Hooks | `use` + 功能名 | `useTable`, `useSearchForm` |
| 布尔值 | `isXX` / `hasXX` / `showXX` | `isLoading`, `hasPermission` |

## 命名注意事项

- **禁止无意义命名**：如 `data1`、`temp2` 等
- 组件文件名**必须**使用多单词 PascalCase
- 布尔值前缀必须明确（is/has/show）
