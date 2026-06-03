# 命名规范

本规范涵盖组件、文件、函数、变量、常量、事件、状态及 CSS BEM 等全部命名约定。

---

## 一、文件与组件命名

| 类型       | 规范                | 示例                           |
| ---------- | ------------------- | ------------------------------ |
| 组件文件名 | 多单词 + PascalCase | `UserList.vue`, `UserCard.vue` |
| 目录命名   | kebab-case（短横）  | `src/components/user-profile/` |
| 组件使用   | PascalCase          | `<UserCard />`                 |

**注意**：组件名应使用多个单词（如 `UserProfile.vue`），避免与 HTML 原生元素冲突。

---

## 二、函数命名体系

| 类型     | 规范                               | 示例                             |
| -------- | ---------------------------------- | -------------------------------- |
| API 函数 | `api` + Method + URLPath（小驼峰） | `apiGetUserInfo`, `apiPostLogin` |
| 事件函数 | `on` + EventName（小驼峰）         | `onClickSubmit`, `onChangeInput` |

---

## 三、变量与常量规范

| 类型        | 规范                         | 示例                            |
| ----------- | ---------------------------- | ------------------------------- |
| 常量        | 全大写 + 下划线              | `MAX_RETRY_COUNT`, `APP_CONFIG` |
| Props/Emits | camelCase，必须注释          | `userId`, `userChange`          |
| 布尔值      | `isXX`/`hasXX`/`showXX` 前缀 | `isVisible`, `hasPermission`    |
| 变量/方法   | 有意义的驼峰命名             | 禁止 `data1`, `temp2`           |

---

## 四、事件命名

- 自定义事件名使用 camelCase：`userChange`
- 全局事件名使用小驼峰：`userChange`, `formSubmit`

---

## 五、CSS 命名（BEM 规范）

| 类型               | 说明          | 示例                                 |
| ------------------ | ------------- | ------------------------------------ |
| Block（块）        | 独立组件/模块 | `.card`, `.form`                     |
| Element（元素）    | 块内部子元素  | `.card__title`, `.form__input`       |
| Modifier（修饰符） | 状态/样式变体 | `.card--dark`, `.card__title--large` |

**规则**：全小写、`__` 连接元素、`--` 连接修饰符、类名唯一，禁止使用 `_`（除 `__` 外）。

```scss
.card {
} // 块
.card__title {
} // 元素
.card--dark {
} // 修饰符
.card__title--large {
} // 元素修饰符
```
