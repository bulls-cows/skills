# 架构与命名规范审核细则

## 目录与文件结构

- 组件命名：文件名使用 PascalCase（如 `UserList.vue`），推荐多单词组合
- 模块化原则：单一职责、高内聚低耦合

## 命名规范

| 类型 | 规范 | 示例 |
| ---- | ---- | ---- |
| API 函数 | api + Method + URLPath (小驼峰) | `apiGetUserInfo`, `apiPostLogin` |
| 事件函数 | on + EventName (小驼峰) | `onClickSubmit`, `onChangeInput` |
| 变量/方法 | 小驼峰 | `fetchData`, `searchQuery` |
| 常量 | 全大写 + 下划线 | `MAX_RETRY_COUNT`, `APP_CONFIG` |
| Props | 小驼峰 | `userName`, `isLoading` |
| 组件名 | PascalCase | `<UserList />` |

### Props 规范

- 必须使用 camelCase
- 必须明确指定参数类型
- 必须添加注释说明参数含义

```typescript
const props = defineProps<{
  // userId: 用户ID
  userId: string | number;
  // isLoading: 加载状态
  isLoading?: boolean;
}>();
```

### emit 事件命名白名单

change, click, select, expand, input, clear, remove, add, open, close, show, hide, cancel, confirm, ok, editSuccess, error

### 布尔值命名

- `isXX` / `hasXX` / `showXX`

### 禁止

- 无意义命名（如 `data1`、`temp2`）
