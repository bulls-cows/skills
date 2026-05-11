# Vue3 命名规范

本规范涵盖组件、文件、API、事件、状态等命名约定。

---

## 一、文件与组件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件名 | 多单词 + PascalCase | `UserList.vue`, `UserCard.vue` |
| 目录命名 | kebab-case（短横线） | `src/components/user-profile/` |
| 组件使用 | PascalCase | `<UserCard />` |

**注意**：组件名应使用多个单词（如 `UserProfile.vue`），避免与 HTML 原生元素冲突。

---

## 二、标识符命名

| 类型 | 规范 | 示例 |
|------|------|------|
| API 函数 | `api` + Method + URLPath（小驼峰） | `apiGetUserInfo`, `apiPostLogin` |
| 事件函数 | `on` + EventName（小驼峰） | `onClickSubmit`, `onChangeInput` |
| 常量 | 全大写 + 下划线 | `MAX_RETRY_COUNT`, `APP_CONFIG` |
| Props | camelCase | `userName`, `isLoading` |
| emit 事件 | camelCase | `userChange` |
| 布尔值 | `isXX` / `hasXX` / `showXX` 前缀 | `isVisible`, `hasPermission` |
| Hooks | `use` + 功能名（详见 `hooks.md`） | `useTable`, `useSearchForm` |
| 变量/方法 | 有意义的驼峰命名 | 禁止 `data1`, `temp2` |

---

## 三、CSS 命名（BEM 规范）

| 类型 | 说明 | 示例 |
|------|------|------|
| 块 | 独立模块 | `card`, `form` |
| 元素 | 块内部子元素 | `card__title`, `form__input` |
| 修饰符 | 状态/样式变体 | `card--dark`, `card__title--large` |

**规则**：全小写、横线连接、无嵌套、类名唯一。
