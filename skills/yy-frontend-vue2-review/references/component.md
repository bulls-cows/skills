# Vue2 组件规范检查细则

## 脚本结构顺序

export default 内部属性需按以下顺序排列：

1. name（组件名）
2. components
3. props
4. data()
5. computed
6. watch
7. methods
8. 生命周期钩子（mounted, destroyed 等）

**完整示例结构**：

```javascript
export default {
  name: "ComponentName",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {},
  destroyed() {},
};
```

## Vue 元素特性顺序

参考 Vue 官方风格指南，元素特性按以下顺序排列：

1. 定义（is）
2. 列表渲染（v-for）
3. 条件渲染（v-if/v-else-if/v-else）
4. 渲染方式（v-show/v-cloak）
5. 全局属性（id）
6. 特性（props/attrs）
7. 事件（v-on）
8. 内容（v-html/v-text）

## v-slot 风格

- 使用动态风格

## 组件命名

- 使用 PascalCase（允许单个单词）
- 推荐多单词组合

## Props 规范

- 命名：必须使用 camelCase
- 类型：必须明确指定参数类型
- 注释：必须添加注释说明参数含义
- 解构：可以解构但需注意响应式丢失

## 禁止修改 props

不允许直接修改组件的 props。

## data 和 computed 使用

- 除了和后端交互的数据和部分定时器
- 其它一律尽可能使用 computed

## computed 规范

- 必须使用 try/catch 包裹
- 命名使用 `is` / `has` / `visible` 或其它有意义的名称

## 方法内部逻辑顺序

方法内部的属性和方法应按以下顺序排列：

1. 初始化方法：init...()
2. 网络请求：async getListData(), async postFormData()
3. 事件处理：async onClick...(), async onChange...()
4. 特殊计算：computed...()

## 网络请求开发规范

- **异步处理**：所有网络请求函数必须使用 async/await
- **错误处理**：必须 try/catch/finally
- **数据解构**：单次解构，禁止 `...data.data` 这种写法
- **统一响应处理**：推荐统一使用解构 + 状态判断 + 消息提示

```javascript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  // 处理成功逻辑
  this.$message.success(msg || "操作成功");
} else {
  this.$message.error(msg);
}
```

## 组件对外 emit 事件

- 命名：使用小驼峰（camelCase），如 userChange
- 命名白名单：change, click, select, expand, input, clear, remove, add, open, close, show, hide, cancel, confirm, ok, editSuccess, error
- 顺序规范（Vue2）：

```javascript
emit("input", 数据);
emit("其它事件", 数据);
emit("change/click", 数据);
```

## 组件生命周期 emit 限制

- 基础组件：禁止在生命周期相关函数中主动向外 emit 事件
- 业务型组件：允许但不推荐在生命周期相关函数中主动向外 emit 事件

## 模块化原则

- 单一职责、高内聚低耦合
