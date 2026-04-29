# 命名规范

## 命名约定

| 类型 | 规范 | 示例 |
|------|------|------|
| API 函数 | `api` + Method + URLPath（小驼峰） | `apiGetUserInfo`、`apiPostLogin` |
| 事件函数 | `on` + EventName（小驼峰） | `onClickSubmit`、`onChangeInput` |
| 常量 | 全大写 + 下划线 | `MAX_RETRY_COUNT`、`APP_CONFIG` |
| Props | 小驼峰（camelCase） | `userName`、`isLoading` |
| 组件名 | PascalCase | `<UserList />` |
| 布尔值 | `isXX` / `hasXX` / `showXX` 前缀 | `isVisible`、`hasData`、`showModal` |

## 命名禁止项

- 禁止无意义命名（如 `data1`、`temp2`）
- 属性命名使用 camelCase

## 组件拆分建议

- **弹窗**：拆为独立组件
- **表格**：表格组件 + 业务逻辑分离
- **表单**：表单组件 + 校验分离

## 模块化原则

- 单一职责
- 高内聚低耦合
