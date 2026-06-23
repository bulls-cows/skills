# Vue2 组件开发规范

> 本规范仅承载 Vue2 组件开发特有内容。通用规范（JSDoc、模板规则、注释等）通过引用避免重复。

## 前置阅读

- [common-comments.md](./common-comments.md) — 注释规范（含 Script 顶部 JSDoc 模板）
- [common-vue-template.md](./common-vue-template.md) — Vue 模板通用规则

---

## 一、Options API 要求

- 使用 **Options API**（`data()`、`methods`、`computed`、`watch`、生命周期钩子）
- 组件必须声明 `name` 选项

---

## 二、脚本结构顺序

详见 [vue2-order.md](./vue2-order.md#二script-内部结构顺序)

`<script>` 内部内容必须按以下宏观顺序排列：

1. `name` → 2. `components` → 3. `props` → 4. `data()` → 5. `computed` → 6. `watch` → 7. `methods` → 8. 生命周期钩子

---

## 三、Vue 元素特性顺序

详见 [common-vue-template.md](./common-vue-template.md#六模板属性顺序)（Vue2 沿用通用 8 步）。

---

## 四、v-slot 风格

- 使用动态风格（如 `v-slot:[name]`）
- 禁止静态默认插槽写法

---

## 五、模板层轻量化

详见 [common-performance.md](./common-performance.md#渲染性能优化)（模板职责分离、简单逻辑内联原则）。

---

## 六、方法职责

- 方法内部顺序：init → 网络请求 → 事件处理 → 特殊计算
- 一个方法只做一件事，超过 **50 行**必须拆分
- 重复逻辑抽离为公共方法
- **不要过度封装**：简单条件判断直接写在 template 中

---

## 七、页面拆分建议

- 页面组件超过 300 行建议拆分
- 按功能区块拆分：搜索表单、数据表格、分页器、操作按钮组
- 弹窗、表格、表单等复杂模块拆分为独立组件

| 模块 | 处理方式                |
| ---- | ----------------------- |
| 弹窗 | 拆分为独立组件          |
| 表格 | 表格组件 + 业务逻辑分离 |
| 表单 | 表单组件 + 校验逻辑分离 |

---

## 八、事件处理

详见 [vue2-interaction.md](./vue2-interaction.md#二emit-事件规范)（事件白名单、Emit 顺序）。

---

## 九、相关模块引用

| 内容           | 详见                                                              |
| -------------- | ----------------------------------------------------------------- |
| 注释规范       | [common-comments.md](./common-comments.md)                        |
| Props 定义     | [vue2-interaction.md](./vue2-interaction.md#一props-定义规范)     |
| Emit 事件      | [vue2-interaction.md](./vue2-interaction.md#二emit-事件规范)      |
| v-model        | [vue2-interaction.md](./vue2-interaction.md#2-v-model-写法)       |
| 组件通信       | [vue2-interaction.md](./vue2-interaction.md#四组件间通信)         |
| `$refs` 访问   | [vue2-interaction.md](./vue2-interaction.md#三对外暴露与访问)     |
| provide/inject | [vue2-interaction.md](./vue2-interaction.md#1-provideinject-规范) |
| 导入顺序       | [vue2-order.md](./vue2-order.md)                                  |
| 模板规则       | [common-vue-template.md](./common-vue-template.md)                |
