# Vue2 组件规范

## 结构顺序

`<script>` 导出对象属性必须按以下顺序排列：

1. `name`
2. `components`
3. `props`
4. `data`
5. `computed`
6. `watch`
7. `methods`
8. 生命周期钩子（`mounted`、`destroyed` 等）

```javascript
export default {
  name: 'Comp',
  components: {},
  props: {},
  data() { return {}; },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  destroyed() {},
};
```

## Template 规范

### 属性顺序

模板元素上的属性必须按以下顺序排列：

1. `is`
2. `v-for`
3. `v-if` / `v-else-if` / `v-else`
4. `v-show` / `v-cloak`
5. `id`
6. props / attrs
7. `v-on`
8. `v-html` / `v-text`
9. 动态 `v-slot`

### 模板职责

- 只负责展示，不写复杂表达式
- 简单逻辑可内联，不为简单逻辑额外创建 methods
- 不要过度封装：简单的条件判断或表达式直接写在 template 中

### 插槽

- 动态风格（如 `v-slot:[name]`）
- 禁止静态默认插槽写法

## Props 规范

- 命名必须使用 camelCase
- 必须明确指定参数类型（`type`）
- 必须声明 `type` 和 `default`（必填项用 `required: true`）
- 必须添加注释说明参数含义

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

## Computed 规范

- **必须使用 `try/catch` 包裹**
- 命名统一使用 `is` / `has` / `visible` 前缀

## Methods 规范

### 方法排序

1. `init...()`
2. `async getListData()` / `async postFormData()`
3. `async onClick...()` / `async onChange...()`
4. `computed...()` 相关方法

### 方法拆分

- 单个方法超过 **50 行**必须拆分
- 重复逻辑抽离为公共方法

## 网络请求规范

统一使用 `async/await` + `try/catch/finally` 与响应处理模式：

```javascript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  this.$message.success(msg || '操作成功');
} else {
  this.$message.error(msg);
}
```

## Emit 规范

### Emit 事件白名单

- **交互类**：`change`、`click`、`select`、`expand`、`input`、`clear`、`remove`、`add`
- **弹窗类**：`open`、`close`、`show`、`hide`
- **操作类**：`cancel`、`confirm`、`ok`、`editSuccess`、`error`

### Emit 顺序

`input` → 其它 → `change` / `click`

### 生命周期 Emit 限制

- **基础组件**：生命周期中禁止主动 emit
- **业务型组件**：允许但不推荐在生命周期中主动 emit

## 数据操作限制

- 禁止连续解构（如 `...data.data`）
- 禁止父组件直接修改子组件数据
- 禁止多次修改 data 属性类型（后端给什么值用什么值，可新增属性但不允许修改原始数据类型）
- 禁止直接修改 props

## 组件结构限制

- 禁止使用 mixins
- 禁止多层 try/catch 嵌套

## Style 作用域

- 优先使用 `scoped`
- 非 `scoped` 样式需标注 `/* 全局 */` 注释
