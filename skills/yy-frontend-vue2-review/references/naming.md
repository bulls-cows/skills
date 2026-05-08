# 命名规范

**维度**：D04
**严重程度**：🟡 中等
**适用文件**：`.vue`、`.js`

---

## 命名约定总表

| 类型 | 规范 | 示例 |
|------|------|------|
| **API 函数** | `api` + Method + URLPath（小驼峰） | `apiGetUserInfo`、`apiPostLogin` |
| **事件函数** | `on` + EventName（小驼峰） | `onClickSubmit`、`onChangeInput` |
| **常量** | 全大写 + 下划线 | `MAX_RETRY_COUNT`、`APP_CONFIG` |
| **Props** | 小驼峰 | `userName`、`isLoading` |
| **组件名** | PascalCase | `<UserList />`、`<SearchForm />` |
| **组件文件名** | 多个单词 + PascalCase | `UserList.vue`、`SearchForm.vue` |
| **emit 事件** | 小驼峰 | `userChange`、`formSubmit` |
| **普通方法** | 小驼峰（动词开头） | `fetchUserData`、`validateForm` |
| **data 属性** | 小驼峰（名词/形容词） | `userList`、`isLoading` |
| **computed** | 小驼峰（前缀标识类型） | `isDisabled`、`hasPermission` |

---

## 详细说明

### API 函数

- **前缀**：以 `api` 开头
- **中间**：HTTP 方法（Get/Post/Put/Delete 等）
- **结尾**：接口路径的小驼峰形式

```js
// ✅ 正确
apiGetUserInfo()
apiPostLogin()
apiPutUserProfile()
apiDeleteComment()

// ❌ 错误
getUserInfo()      // 缺少 api 前缀
fetchUserData()    // 缺少 api 前缀
api_get_user()     // 下划线命名
```

### 事件函数

- **前缀**：以 `on` 开头，后接事件名称
- 用于 `@click="onClickHandler"` 等模板事件绑定场景

```js
// ✅ 正确
onClickSubmit()
onChangeInput()
onSelectItem()
onOpenDialog()

// ❌ 错误
submitClick()      // 前缀错误
handleInput()      // 建议使用 onChangeInput
clickBtn()         // 语义不清晰
```

### 常量

- 全大写单词用下划线分隔
- 定义在常量文件中的不可变值

```js
// ✅ 正确
const MAX_RETRY_COUNT = 3
const DEFAULT_PAGE_SIZE = 20
const APP_CONFIG = { /* ... */ }

// ❌ 错误
const maxRetryCount = 3  // 小写
const MaxRetryCount = 3  // 大驼峰
```

### Props

- 使用小驼峰（JavaScript 侧）
- 模板中自动转换为 kebab-case

```js
// ✅ 正确
props: {
  userId: String,
  isLoading: Boolean,
  pageSize: Number
}
```

```vue
<!-- ✅ 正确（kebab-case） -->
<UserCard
  :user-id="123"
  :is-loading="true"
  :page-size="20"
/>
```

### 组件命名

- **模板引用**：PascalCase
- **文件名**：多个单词 + PascalCase（避免单单词）

```vue
<!-- ✅ 正确 -->
<UserList />
<SearchForm />
<UserAvatar />

<!-- ❌ 错误 -->
<user-list />   // 应使用 PascalCase
<User />        // 单单词，语义不清晰
```

### emit 事件

- 使用小驼峰
- 应在 emit 白名单范围内或为其合理派生

```js
// ✅ 正确
this.$emit('userChange', newData)
this.$emit('formSubmit', formData)
this.$emit('itemSelect', item)

// ❌ 错误
this.$emit('user-change')   // 横线分隔（Vue2 应使用小驼峰）
this.$emit('onClick')        // 不要加 on 前缀
```

### computed 属性前缀

computed 名称应清晰表达其含义，常用前缀：

| 前缀 | 含义 | 示例 |
|------|------|------|
| `is` | 布尔状态 | `isLoading`、`isValid`、`isDisabled` |
| `has` | 存在性判断 | `hasData`、`hasPermission`、`hasError` |
| `visible` / `show` | 可见性 | `isDialogVisible`、`showSidebar` |
| `formatted` / `parsed` | 数据转换 | `formattedDate`、`parsedJson` |
| `total` / `count` | 统计数量 | `totalCount`、`filteredCount` |
