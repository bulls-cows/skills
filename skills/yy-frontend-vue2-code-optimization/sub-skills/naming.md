# 🔤 语义化命名重构（🟡中风险）

**定位**：🟡 中风险。涉及标识符的全局替换，需确保引用查找的准确性。

---

## 函数命名体系

| 类型     | 规范                               | 示例                             |
| -------- | ---------------------------------- | -------------------------------- |
| API 函数 | `api + Method + URLPath`（小驼峰） | `apiGetUserInfo`, `apiPostLogin` |
| 事件函数 | `on + EventName`（小驼峰）         | `onClickSubmit`, `onChangeInput` |

---

## 变量与常量规范

| 类型   | 规范                             | 示例                                      |
| ------ | -------------------------------- | ----------------------------------------- |
| 常量   | 全大写 + 下划线                  | `MAX_RETRY_COUNT`, `APP_CONFIG`           |
| Props  | camelCase                        | `userName`, `isLoading`                   |
| 组件名 | PascalCase                       | `<UserList />`                            |
| 布尔值 | `isXX` / `hasXX` / `showXX` 前缀 | `isLoading`, `hasPermission`, `showModal` |

---

## 禁止项

- 严禁 `data1`、`temp2` 等无意义命名
- 涉及跨文件引用重命名需提示用户确认
