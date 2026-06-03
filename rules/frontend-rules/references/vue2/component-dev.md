# Vue2 组件开发规范

本模块整合 Vue2 组件开发的核心规范，基于 Options API 风格。

## 核心要求

### Options API 要求

- 使用 **Options API**（`data()`、`methods`、`computed`、`watch`、生命周期钩子）
- 组件必须声明 `name` 选项

### 脚本结构顺序

详见 [order.md](./order.md#二script-内部结构顺序)

`<script>` 内部内容必须按以下宏观顺序排列：

1. `name` → 2. `components` → 3. `props` → 4. `data()` → 5. `computed` → 6. `watch` → 7. `methods` → 8. 生命周期钩子

### 完整示例

详见 [order.md](./order.md#二script-内部结构顺序)（包含完整的 3 组 import 分组、Options API 结构）。

### Script 顶部 JSDoc

详见 [../comments.md](../comments.md#二脚本区注释)

```javascript
/**
 * 组件名称
 * @description 页面职责说明
 * @description 核心业务流程简述
 * @description 关键数据来源
 */
export default {
  name: 'ComponentName',
  // ...
}
```

### Vue 元素特性顺序

详见 [directives.md](./directives.md#五模板属性顺序)（9 步完整顺序：`is` → `v-for` → `v-if/else` → `v-show` → `id` → `props/attrs` → `v-on` → `v-html/v-text`）。

### v-slot 风格

- 使用动态风格（如 `v-slot:[name]`）
- 禁止静态默认插槽写法

### 模板层轻量化

详见 [../performance.md](../performance.md#七模板层轻量化)（模板职责分离、简单逻辑内联原则）。

### 注释规范

详见 [../comments.md](../comments.md)

### 方法职责

- 方法内部顺序：init → 网络请求 → 事件处理 → 特殊计算
- 一个方法只做一件事，超过 **50 行**必须拆分
- 重复逻辑抽离为公共方法
- **不要过度封装**：简单条件判断直接写在 template 中

### 页面拆分建议

- 页面组件超过 300 行建议拆分
- 按功能区块拆分：搜索表单、数据表格、分页器、操作按钮组
- 弹窗、表格、表单等复杂模块拆分为独立组件

| 模块 | 处理方式                |
| ---- | ----------------------- |
| 弹窗 | 拆分为独立组件          |
| 表格 | 表格组件 + 业务逻辑分离 |
| 表单 | 表单组件 + 校验逻辑分离 |

### 事件处理

详见 [interaction.md](./interaction.md#二emit-事件规范)（事件白名单、Emit 顺序）。

## 相关模块引用

| 内容           | 详见                                                    |
| -------------- | ------------------------------------------------------- |
| Props 定义     | [interaction.md](./interaction.md#一props-定义规范)     |
| Emit 事件      | [interaction.md](./interaction.md#二emit-事件规范)      |
| v-model        | [interaction.md](./interaction.md#二v-model-写法)       |
| 组件通信       | [interaction.md](./interaction.md#四组件间通信)         |
| `$refs` 访问   | [interaction.md](./interaction.md#三对外暴露与访问)     |
| provide/inject | [interaction.md](./interaction.md#三provideinject-规范) |
| 导入顺序       | [order.md](./order.md)                                  |
