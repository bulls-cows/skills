# 架构与命名规范

## 目录与文件结构

- **组件文件名**：多个单词 + PascalCase，示例 `UserList.vue`
- **组件名**：PascalCase，示例 `UserList`
- **组件使用**：PascalCase，示例 `<UserList />`
- **模块化原则**：单一职责、高内聚低耦合

## 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| API 函数 | api + Method + URLPath（小驼峰） | `apiGetUserInfo`, `apiPostLogin` |
| 事件函数 | on + EventName（小驼峰） | `onClickSubmit`, `onChangeInput` |
| 常量 | 全大写 + 下划线 | `MAX_RETRY_COUNT`, `APP_CONFIG` |
| Props | camelCase | `userName`, `isLoading` |
| emit 事件 | camelCase | `userChange` |
| 布尔值 | `isXX` / `hasXX` / `showXX` 前缀 | `isVisible`, `hasPermission` |

**禁止**：无意义命名（如 `data1`、`temp2`）

## Props 规范

- 命名必须 camelCase
- 必须明确指定类型、声明 type 和 default、添加注释

```javascript
props: {
  // userId: 用户ID
  userId: {
    type: [String, Number],
    required: true
  },
  // isLoading: 加载状态
  isLoading: {
    type: Boolean,
    default: false
  }
}
```

## Emit 事件白名单与顺序

### 事件白名单

- **交互类**：`change`, `click`, `select`, `expand`, `input`, `clear`, `remove`, `add`
- **弹窗类**：`open`, `close`, `show`, `hide`
- **操作类**：`cancel`, `confirm`, `ok`, `editSuccess`, `error`

### 对外 emit 顺序

```javascript
emit("input", 数据);
emit("其它事件", 数据);
emit("change/click", 数据);
```

## 组件传参要求

- **命名**：必须使用 camelCase
- **类型**：必须明确指定参数类型
- **注释**：必须添加注释说明参数含义

## provide / inject 规范

- **使用场景**：仅用于深层组件传参（3 层以上），避免逐层传递 props
- **兄弟组件通信**：使用 Vuex 或 eventBus，禁止通过 provide/inject 跨层级滥用
- **响应式传递**：注入对象需保持响应式，使用 `provide() { return { xxx: this.xxx } }`

## 禁用 $parent / $children

- **禁止**通过 `$parent.$parent` 链式访问父组件数据
- **原因**：组件耦合度高，破坏组件独立性
- **替代方案**：使用 props/emit 或状态管理
