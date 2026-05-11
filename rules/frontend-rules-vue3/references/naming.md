# Vue3 命名规范

本规范涵盖组件、文件、函数、变量、常量、Hooks、TypeScript 类型、状态及 CSS BEM 等全部命名约定。

---

## 一、文件与组件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件名 | 多单词 + PascalCase | `UserList.vue`, `UserCard.vue` |
| 目录命名 | kebab-case（短横线） | `src/components/user-profile/` |
| 组件使用 | PascalCase | `<UserCard />` |

**注意**：组件名应使用多个单词（如 `UserProfile.vue`），避免与 HTML 原生元素冲突。

---

## 二、函数命名体系

| 类型 | 规范 | 示例 |
|------|------|------|
| API 函数 | `api` + Method + URLPath（小驼峰） | `apiGetUserInfo`, `apiPostLogin` |
| 事件函数 | `on` + EventName（小驼峰） | `onClickSubmit`, `onChangeInput` |

## 三、变量与常量规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 常量 | 全大写 + 下划线 | `MAX_RETRY_COUNT`, `APP_CONFIG` |
| Props | camelCase | `userName`, `isLoading` |
| emit 事件 | camelCase | `userChange` |
| 布尔值 | `isXX` / `hasXX` / `showXX` 前缀 | `isVisible`, `hasPermission` |
| 变量/方法 | 有意义的驼峰命名 | 禁止 `data1`, `temp2` |

## 四、Vue3 组合式 API 命名

### ref / reactive 命名

| 类型 | 规范 | 示例 |
|------|------|------|
| ref | camelCase | `isLoading`, `userName` |
| reactive | camelCase | `formData`, `tableData` |
| computed | camelCase | `isSelected`, `totalPage` |

### Hooks 命名规范

**必须以 `use` 开头**，详见 [hooks.md](./hooks.md#一命名与文件组织)（命名、文件组织、返回值、抽离建议）。

| 类型 | 规范 | 示例 |
|------|------|------|
| Hooks | `use` + 功能名 | `useTable`, `useSearchForm`, `useUserFetch` |

## 五、TypeScript 类型命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 类型别名 | `I` + PascalCase | `IUserInfo`, `ITableConfig` |
| 接口 | `I` + PascalCase | `IUser`, `ITable` |
| 泛型参数 | 单字母大写 | `T`, `K`, `V` |

```typescript
// ✅ 正确：类型命名以 I 为前缀
type IUserInfo = {
  id: string;
  name: string;
};

interface ITableConfig {
  columns: ITableColumn[];
}
```

---

## 六、CSS 命名（BEM 规范）

| 类型 | 说明 | 示例 |
|------|------|------|
| 块 | 独立模块 | `card`, `form` |
| 元素 | 块内部子元素 | `card__title`, `form__input` |
| 修饰符 | 状态/样式变体 | `card--dark`, `card__title--large` |

**规则**：全小写、横线连接、无嵌套、类名唯一。
