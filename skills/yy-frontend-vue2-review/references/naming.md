# 命名规范检查细则

## 命名规范

- API 函数：api + Method + URLPath（小驼峰），示例 apiGetUserInfo, apiPostLogin
- 事件函数：on + EventName（小驼峰），示例 onClickSubmit, onChangeInput
- 常量：全大写 + 下划线，示例 MAX_RETRY_COUNT, APP_CONFIG
- Props：小驼峰（camelCase），示例 userName, isLoading
- 组件名：PascalCase，示例 UserList

## 组件命名补充

- 文件名：多个单词 + PascalCase，示例 UserList.vue
- 组件名：PascalCase，示例 UserList
- 使用：PascalCase，示例 `<UserList />`
- props：小驼峰（camelCase），示例 userName
- emit 事件：小驼峰（camelCase），示例 userChange
