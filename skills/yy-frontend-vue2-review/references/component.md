# Vue2 组件规范

## 1. 脚本结构顺序

Vue2 组件的 `export default` 内部必须严格遵循以下顺序：

1. `name`
2. `components`
3. `props`
4. `data`
5. `computed`
6. `watch`
7. `methods`
8. 生命周期钩子

## 2. 元素特性顺序

模板中元素特性必须按以下顺序排列：

1. `is`
2. `v-for`
3. `v-if` / `v-else-if` / `v-else`
4. `v-show` / `v-cloak`
5. `id`
6. `props` / `attrs`
7. `v-on`（事件监听）
8. `v-html` / `v-text`

## 3. Props 规范

- 使用 camelCase 命名。
- 类型必须明确指定（`String`、`Number`、`Boolean`、`Array`、`Object`、`Function`）。
- 必须添加含义注释说明用途。
- 组件传参同样遵循 camelCase、类型明确、添加含义注释。

## 4. Emit 事件规范

### 顺序

`input` → 其它自定义事件 → `change` / `click` 等交互事件。

### 白名单

Emit 事件名必须在以下白名单范围内或为其合理派生：

- **交互类**：`change`、`click`、`select`、`expand`、`input`、`clear`、`remove`、`add`
- **弹窗类**：`open`、`close`、`show`、`hide`
- **操作类**：`cancel`、`confirm`、`ok`、`editSuccess`、`error`

### 生命周期 emit 限制

- **基础组件**：禁止在生命周期钩子中 emit 事件。
- **业务组件**：允许但不推荐在生命周期中 emit。

## 5. v-slot

使用动态风格（`#` 或 `v-slot:`），避免废弃语法。

## 6. 组件命名

- 使用 PascalCase，如 `<UserList />`。
- 允许单个单词，但推荐多单词组合以增强语义。
- 文件名必须为多个单词 + PascalCase，如 `UserList.vue`。

## 7. data / computed 使用

- 除后端交互数据和部分定时器场景外，其它数据一律尽可能使用 `computed`。
- 避免在 `data` 中存储可推导的值。

## 8. 模块化

- 单一职责原则：每个组件只做一件事。
- 高内聚低耦合：相关逻辑内聚，无关逻辑分离。
