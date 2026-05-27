# Vue2 专属规则

识别条件：`.vue` 文件使用 Options API（`export default { data(), methods, computed, ... }`）。

## 核心属性分析

- `data()`：列出所有响应式属性，说明类型、初始值和用途。
- `props`：逐个列出属性名、类型（`type`）、是否必填（`required`）、默认值（`default`）、验证器（`validator`）。
- `computed`：每个计算属性的依赖来源和计算逻辑概述。

## 生命周期分析

- 列出所有使用的生命周期钩子（`beforeCreate / created / beforeMount / mounted / beforeUpdate / updated / beforeDestroy / destroyed`），说明各钩子的用途和执行时机。
- 标注异步操作所在的生命周期位置。

## 方法分析

- `methods` 中每个方法的用途、参数、调用链和触发的状态变更。
- 识别被模板引用的事件处理方法。

## 侦听器分析

- `watch` 中每个侦听器的目标属性、`immediate` / `deep` 配置和处理逻辑。

## Mixin 与继承

- 引入的 `mixin` 文件路径及其注入的属性/方法/生命周期。
- `extends` 继承的组件及其注入内容。
- 命名冲突时的覆盖策略（后引入优先规则）。

## 状态管理（Vuex）

| 辅助函数       | 说明                        | 导入方式                              |
| -------------- | --------------------------- | ------------------------------------- |
| `mapState`     | 映射 state 到组件计算属性   | `import { mapState } from 'vuex'`     |
| `mapGetters`   | 映射 getters 到组件计算属性 | `import { mapGetters } from 'vuex'`   |
| `mapMutations` | 映射 mutations 到组件方法   | `import { mapMutations } from 'vuex'` |
| `mapActions`   | 映射 actions 到组件方法     | `import { mapActions } from 'vuex'`   |

- 使用的辅助函数（`mapState / mapGetters / mapMutations / mapActions`）。
- 绑定的 store 模块、state 字段、getter、mutation 和 action。

## 组件通信

- `$emit` 事件列表（事件名、载荷参数、触发条件）。
- `$refs` 引用的子组件及其调用的方法。
- `$parent / $children` 依赖（标记为反模式）。
- 事件总线（`event bus`）使用。
- `.sync` 修饰符和 `v-model` 实现的双向绑定。

## 指令与过滤器

- 自定义指令（`directives`）的名称、钩子和用途。
- 过滤器（`filters`）的名称和转换逻辑（Vue2 特有）。

## 模板分析

- 条件渲染（`v-if / v-else-if / v-else / v-show`）的条件和分支内容。
- 列表渲染（`v-for`）的数据源和 `key` 绑定。
- 插槽（`slot`、`slot-scope`）的名称和作用域变量。
- 动态组件（`<component :is="">`）的使用场景。

## 配置项冲突处理

- `data` 冲突：组件自身的 `data` 会覆盖 mixin 中的 `data`
- `methods` 冲突：组件自身的方法会覆盖 mixin 中的方法
- `computed` 冲突：组件自身的计算属性会覆盖 mixin 中的计算属性
- 生命周期钩子冲突：mixin 和组件自身的钩子都会被调用，mixin 的钩子先执行

## 路由依赖

- `$route`：获取路由参数（query、params）
- `$router`：编程式导航（push、replace、go）
- 路由守卫：`beforeEach`、`afterEach` 可访问 store

## 异常处理

- `errorCaptured`：捕获子组件错误
  - 参数：`err`（错误对象）、`vm`（引发错误的组件实例）、`info`（错误来源信息）
  - 返回值：`false` 可阻止错误传播
- `Vue.config.errorHandler`：全局错误处理器
- `Vue.config.warnHandler`：警告处理器（开发环境）
