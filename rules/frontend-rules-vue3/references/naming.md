# 架构与命名规范

## 目录与文件结构

- **组件文件名**：多个单词 + PascalCase，示例 `UserList.vue`
- **组件名**：PascalCase，示例 `UserList`
- **组件使用**：PascalCase，示例 `<UserList />`
- **模块化原则**：单一职责、高内聚低耦合

## 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| API 函数 | api + Method + URLPath（小驼峰） | `apiGetUserInfo`, `apiPostLogin` |
| 事件函数 | on + EventName（小驼峰） | `onClickSubmit`, `onChangeInput` |
| 常量 | 全大写 + 下划线 | `MAX_RETRY_COUNT`, `APP_CONFIG` |
| Props | camelCase | `userName`, `isLoading` |
| emit 事件 | camelCase | `userChange` |
| 布尔值 | `isXX` / `hasXX` / `showXX` 前缀 | `isVisible`, `hasPermission` |
| Hooks | `use` + 功能名 | `useTable`, `useSearchForm` |

**禁止**：无意义命名（如 `data1`、`temp2`）

## Props/Emit/组件通信

详见 [interaction.md](./interaction.md)
