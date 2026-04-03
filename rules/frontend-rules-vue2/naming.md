# 架构与命名规范

## 目录与文件结构

- 组件命名：文件名使用 PascalCase（如 UserList.vue），推荐多单词组合。
- 模块化原则：单一职责、高内聚低耦合。

## 命名规范

- API 函数：api + Method + URLPath (小驼峰)，示例 apiGetUserInfo, apiPostLogin
- 事件函数：on + EventName (小驼峰)，示例 onClickSubmit, onChangeInput
- 常量：全大写 + 下划线，示例 MAX_RETRY_COUNT, APP_CONFIG
- Props：小驼峰，示例 userName, isLoading
- 组件名：PascalCase，示例 <UserList />

**组件命名补充**：

- 文件名：多个单词 + PascalCase，示例 UserList.vue
- 组件名：PascalCase，示例 UserList
- 使用：PascalCase，示例 <UserList />
- props：小驼峰（camelCase），示例 userName
- emit 事件：小驼峰（camelCase），示例 userChange
