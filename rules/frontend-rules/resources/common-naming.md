# 前端命名规范

> 本规范是前端开发的统一命名约定，涵盖所有开发场景，必须严格遵守，确保代码可读性和一致性。
> 命名总原则：见名知意，语义优先，简洁准确，避免缩写（通用缩写除外，如 `id`、`url`、`api`、`utils` 等）。

---

## 一、文件与目录命名

---

| 类型                 | 规范                     | 示例                                                     | 说明                                         |
| -------------------- | ------------------------ | -------------------------------------------------------- | -------------------------------------------- |
| Vue/React 组件文件名 | 多单词 + PascalCase      | `UserList.vue`、`UserCard.tsx`                           | 组件名必须多个单词，避免与 HTML 原生元素冲突 |
| 目录命名             | kebab-case（短横线小写） | `src/components/user-profile/`、`src/utils/date-format/` | 所有目录均使用短横线分隔                     |
| 普通 JS/TS 文件      | 小驼峰 camelCase         | `userApi.ts`、`dateUtils.ts`                           | 工具函数、API 封装等普通文件                 |
| 类型定义文件         | 小驼峰 + .d.ts 后缀      | `userType.d.ts`、`api.d.ts`                             | TypeScript 类型定义文件                      |
| 组件使用             | PascalCase               | `<UserCard />`、`<UserList />`                           | 模板中组件名使用大驼峰                       |

---

## 二、函数命名规范

| 类型              | 规范                               | 示例                                              | 说明                                   |
| ----------------- | ---------------------------------- | ------------------------------------------------- | -------------------------------------- |
| API 函数          | `api` + 方法 + 业务含义（小驼峰）  | `apiGetUserInfo`、`apiPostLogin`、`apiDeleteUser` | 前缀明确标识是 API 请求                |
| 事件处理函数      | `on` + 触发元素 + 事件名（小驼峰） | `onSubmitBtnClick`、`onUserNameInputChange`       | 清晰说明触发源和事件类型               |
| 工具函数          | 动词 + 名词（小驼峰）              | `formatDate`、`getUuid`、`parseQuery`             | 明确表示函数的作用                     |
| Vue/React Hooks   | `use` + 功能（小驼峰）             | `useUserInfo`、`useRouterQuery`、`useWindowSize`  | 符合 Hooks 命名规范                    |
| 计算属性/派生函数 | 名词/形容词（小驼峰）              | `fullName`、`isDisabled`、`filteredList`          | 表示是一个值而非动作                   |
| 操作函数          | 动词 + 名词（小驼峰）              | `openDialog`、`closeModal`、`loadData`            | 明确表示执行的动作                     |
| 函数参数          | 小驼峰 camelCase，语义清晰         | `userId`、`userInfo`、`formatter`                 | 与变量命名一致，禁止单字母或无意义命名 |

---

## 三、变量与常量规范

| 类型                 | 规范                            | 示例                                                                      | 说明                                       |
| -------------------- | ------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------ |
| 全局常量             | 全大写 + 下划线分隔             | `MAX_RETRY_COUNT = 3`、`APP_CONFIG = { ... }`                             | 常量值不可修改                             |
| 枚举类型             | PascalCase，成员全大写          | `enum UserStatus { ACTIVE = 'ACTIVE', DISABLED = 'DISABLED' }`            | TypeScript 枚举命名规范                    |
| TypeScript 类型/接口 | PascalCase，接口 `I` 前缀 / 类型别名 `T` 前缀 | `interface IUser { id: number; name: string }`、`type TUserInfo = { ... }` | 代码示例见下方[类型命名代码示例](#类型命名代码示例) |
| 组件传参（Props）    | 小驼峰 camelCase，必须语义化    | `userId`、`userInfo`、`menuList`                                          | 父组件向子组件传递数据，与变量命名规范一致 |
| 组件事件（Emits）    | 小驼峰 camelCase，`on` + 事件名 | `onUserChange`、`onFormSubmit`                                            | 子组件向父组件抛出事件                     |
| 布尔值变量          | `is`/`has` 前缀，或 `isCan`/`visible` 等布尔语义词 | `isVisible`、`hasPermission`、`isCanEdit`、`visibleDialog`               | 从变量名直接判断是布尔类型             |
| 普通变量             | 小驼峰 camelCase，语义优先      | `userInfo`、`menuList`、`totalCount`                                      | 禁止使用无意义的 `data1`、`temp2` 等命名   |
| 路由参数             | 优先小驼峰，短横线兜底          | `userId`（优先）、`user-id`（兜底）                                       | 与后端接口保持一致，无特殊要求时使用小驼峰 |
| 状态管理变量         | 小驼峰，语义清晰                | `userState`、`menuState`                                                  | Pinia/Vuex/Redux 等状态管理中的变量        |

### 类型命名代码示例

```typescript
// ✅ 正确：接口 I 前缀，类型别名 T 前缀
interface IUserInfo {
  id: string
  name: string
}
type TUserList = IUserInfo[]

// ❌ 错误：缺少前缀
interface UserInfo { /* ... */ }
type UserList = IUserInfo[]
```

---

## 四、事件命名规范

| 场景                      | 规范                    | 示例                              | 说明                               |
| ------------------------- | ----------------------- | --------------------------------- | ---------------------------------- |
| Vue 自定义事件            | 事件名（小驼峰）        | `@userChange`、`@formSubmit`      | 模板监听与 emit 定义统一使用小驼峰 |
| React 自定义事件          | `on` + 事件名（小驼峰） | `onUserChange`、`onFormSubmit`    | 与原生事件命名保持一致             |
| 全局事件（EventBus/Mitt） | 业务模块前缀 + 小驼峰事件名 | `user:infoChange`、`form:itemSubmit`    | 避免全局事件名冲突                 |
| 原生事件                  | 遵循 W3C 标准           | `onClick`、`onChange`、`onSubmit` | 与原生事件名保持一致               |

> 统一原则：事件名使用动词或"名词+动词"结构，清晰表达事件的含义和触发时机。

---

## 五、CSS 命名规范（BEM）

> 样式命名必须遵循 BEM 规范，详见 [common-css.md](./common-css.md#三css-命名bem)

### BEM 核心规则

| 类型               | 说明                   | 示例                                                        | 规则                                           |
| ------------------ | ---------------------- | ----------------------------------------------------------- | ---------------------------------------------- |
| Block（块）        | 独立的组件/模块        | `.card`, `.user-form`, `.menu`                              | 全小写，短横线分隔多单词，代表一个独立的功能块 |
| Element（元素）    | 块内部的子元素         | `.card__title`, `.form__input`, `.menu__item`               | 块名 + `__` + 元素名，仅属于当前块             |
| Modifier（修饰符） | 块/元素的状态/样式变体 | `.card--dark`, `.form__input--error`, `.menu__item--active` | 块/元素名 + `--` + 修饰符名，表示特殊状态      |

### 编写规范

```scss
// ✅ 正确写法
.card {
  /* 块 */
}
.card__title {
  /* 元素 */
}
.card--dark {
  /* 块修饰符 */
}
.card__title--large {
  /* 元素修饰符 */
}

// ❌ 错误写法
.card.title {
  /* 避免嵌套选择器 */
}
.card__title__icon {
  /* 避免多级元素嵌套 */
}
```

### 其他约定

1. 全局公共样式：前缀 `g-`，如 `.g-container`、`.g-text-center`
2. 工具类样式：前缀 `u-`，如 `.u-mt-10`、`.u-text-red`
3. 页面级样式：前缀 `p-页面名-`，如 `.p-user-list__container`
4. 状态类：前缀 `is-`/`has-`，如 `.is-active`、`.has-error`

### Vue/React 样式注意

- 优先使用 scoped 样式，避免全局污染
- 全局样式必须在专门的全局样式文件中定义
- 深度选择器写法因框架版本而异（Vue3 `:deep()`、Vue2 `::v-deep`），详见 [common-css.md 作用域穿透章节](./common-css.md#十一作用域穿透vue2vue3react-共享理念)，禁止使用 `/deep/`、`>>>` 等已废弃写法
