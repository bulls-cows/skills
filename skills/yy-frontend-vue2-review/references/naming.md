# 命名规范

## 命名约定表

| 类型 | 规范 | 示例 |
| --- | --- | --- |
| API 函数 | `api` + Method + URLPath（小驼峰） | `apiGetUserInfo`、`apiPostLogin`、`apiDeleteUser` |
| 事件函数 | `on` + EventName（小驼峰） | `onClickSubmit`、`onChangeInput`、`onSelectItem` |
| 常量 | 全大写 + 下划线 | `MAX_RETRY_COUNT`、`APP_CONFIG`、`DEFAULT_PAGE_SIZE` |
| Props | 小驼峰 | `userName`、`isLoading`、`pageSize` |
| 组件名 | PascalCase | `<UserList />`、`<SearchForm />` |
| 组件文件名 | 多个单词 + PascalCase | `UserList.vue`、`SearchForm.vue` |
| emit 事件 | 小驼峰 | `userChange`、`formSubmit`、`itemSelect` |

## 说明

- **API 函数**：以 `api` 前缀开头，后接 HTTP 方法（Get/Post/Put/Delete 等）和接口路径的小驼峰形式。
- **事件函数**：以 `on` 前缀开头，后接事件名称的小驼峰形式，用于 `@click="onClickHandler"` 等场景。
- **常量**：定义在常量文件中的不可变值，全大写单词用下划线分隔。
- **Props**：传递给子组件的属性，使用小驼峰，在模板中自动转换为 kebab-case。
- **组件名**：在模板中引用的组件标签名，使用 PascalCase。
- **组件文件名**：`.vue` 文件名使用多个单词组合 + PascalCase，避免单单词文件（如 `User.vue` 应改为 `UserCard.vue`）。
- **emit 事件**：子组件向父组件发送的事件名，使用小驼峰，应在 emit 白名单范围内或为其合理派生。
