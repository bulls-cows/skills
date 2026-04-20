# Vue2 组件开发规范

## 脚本结构顺序（强制）

按固定顺序排列，保证所有页面结构一致：

```text
1. name (组件名)
2. components
3. props
4. data()
5. computed
6. watch
7. methods
8. 生命周期钩子 (mounted, destroyed 等)
```

```javascript
export default {
  name: 'ComponentName',
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

## Script 顶部注释

在 `<script>` 开头添加组件逻辑说明：

```javascript
/**
 * 组件名称
 * @description 页面职责说明
 * @description 核心业务流程简述
 * @description 关键数据来源
 */
export default {
  name: 'UserList',
  // ...
}
```

## Vue 元素特性顺序

1. 定义 (is)
2. 列表渲染 (v-for)
3. 条件渲染 (v-if/v-else-if/v-else)
4. 渲染方式 (v-show/v-cloak)
5. 全局属性 (id)
6. 特性 (props/attrs)
7. 事件 (v-on)
8. 内容 (v-html/v-text)

## data 和 computed 使用

- 除了和后端交互的数据和部分定时器外
- 其它一律尽可能使用 computed

## computed 规范

- 使用 try/catch 包裹
- 命名使用 is / has / visible 或其它有意义的名称

## 方法内部逻辑顺序

1. 初始化方法：init...()
2. 网络请求：async getListData(), async postFormData()
3. 事件处理：async onClick...(), async onChange...()
4. 特殊计算：computed...()

## 网络请求开发规范

- 异步处理：所有网络请求函数必须使用 async/await
- 错误处理：必须 try/catch/finally
- 数据解构：单次解构，禁止 ...data.data
- 统一响应处理：推荐统一使用解构 + 状态判断 + 消息提示

```javascript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  // 处理成功逻辑
  this.$message.success(msg || '操作成功');
} else {
  this.$message.error(msg);
}
```

## 组件对外 emit 事件顺序

```javascript
this.$emit('input', 数据);
this.$emit('其它事件', 数据);
this.$emit('change/click', 数据);
```

## 方法职责单一化

1. **一个方法只做一件事**，避免巨型函数（超过 50 行考虑拆分）
2. **重复逻辑抽离**为公共方法
3. **职责明确**，每个方法专注于单一功能

## Vue 基础规则

- 组件命名：PascalCase（允许单个单词）
- 属性命名：camelCase
- v-slot 风格：动态风格

## 复杂页面拆分建议

| 模块 | 处理方式 |
| ---- | -------- |
| 弹窗 | 拆分为独立组件 |
| 表格 | 表格组件 + 业务逻辑分离 |
| 表单 | 表单组件 + 校验逻辑分离 |
