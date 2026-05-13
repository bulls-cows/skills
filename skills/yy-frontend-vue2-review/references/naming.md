# 命名规范

**维度**：D04
**严重程度**：🟡 中等
**适用文件**：`.vue`、`.js`

---

## 命名规则表

| 类型 | 规范 | 示例 |
| ---- | ---- | ---- |
| API 函数 | `api` + Method + URLPath（小驼峰） | `apiGetUserInfo`、`apiPostLogin` |
| 事件函数 | `on` + EventName（小驼峰） | `onClickSubmit`、`onChangeInput` |
| 常量 | 全大写 + 下划线 | `MAX_RETRY_COUNT`、`APP_CONFIG` |
| Props | 小驼峰 | `userName`、`isLoading` |
| 组件名 | PascalCase | `<UserList />` |
| 组件文件名 | 多个单词 + PascalCase | `UserList.vue` |
| emit 事件 | 小驼峰 | `userChange`、`formSubmit` |
| 普通方法 | 小驼峰（动词开头） | `fetchUserData`、`calculateTotal` |
| data 属性 | 小驼峰（名词/形容词） | `userList`、`isLoading` |
| computed 属性 | 小驼峰（前缀标识类型） | `isDisabled`、`hasPermission` |

---

## computed 属性前缀约定

| 前缀 | 含义 | 示例 |
| ---- | ---- | ---- |
| `is` | 布尔状态 | `isLoading`、`isValid`、`isDisabled` |
| `has` | 存在性判断 | `hasData`、`hasPermission`、`hasError` |
| `visible` / `show` | 可见性 | `isDialogVisible`、`showSidebar` |
| `formatted` / `parsed` | 数据转换 | `formattedDate`、`parsedJson` |
| `total` / `count` | 统计数量 | `totalCount`、`filteredCount` |
