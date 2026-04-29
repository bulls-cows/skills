# 命名规范

## API 函数

- 格式：`api` + Method + URLPath（小驼峰）
- 示例：`apiGetUserInfo`, `apiPostLogin`, `apiDeleteItem`

## 事件函数

- 格式：`on` + EventName（小驼峰）
- 示例：`onClickSubmit`, `onChangeInput`, `onBlurValidate`

## 常量

- 格式：全大写 + 下划线
- 示例：`MAX_RETRY_COUNT`, `APP_CONFIG`, `DEFAULT_PAGE_SIZE`

## Props

- 格式：小驼峰（camelCase）
- 示例：`userName`, `isLoading`, `maxCount`

## 组件名

- 格式：PascalCase（允许单个单词，推荐多单词组合）
- 示例：`UserList`, `NavbarLogo`, `SearchForm`

## Hooks

- 格式：`use` + 功能名（PascalCase）
- 示例：`useTable`, `useSearchForm`, `useDialog`

## 布尔值命名

- 统一使用 `isXX` / `hasXX` / `showXX` 前缀
- 示例：`isVisible`, `hasPermission`, `showModal`

## 禁止项

- 无意义命名（如 `data1`, `temp2`, `aaa`）
- 命名与功能不符

## 模块拆分建议

| 场景         | 处理方式                   |
| ------------ | -------------------------- |
| 弹窗         | 拆为独立组件              |
| 表格         | 表格组件 + 业务逻辑分离    |
| 表单         | 表单组件 + 校验分离        |
| 复杂页面     | 按功能区域拆分为子组件    |
