---
description: 前端项目开发规范与架构指南
alwaysApply: true
---

# 前端项目开发规范

## 📌 AI 行为约束

| 行为    | 说明                                                      |
| ------- | --------------------------------------------------------- |
| ✅ 允许 | 直接在对话中输出文字说明和总结                            |
| ✅ 允许 | 修改代码中的注释和 JSDoc                                  |
| ✅ 允许 | 仅在用户明确要求时才创建文档文件                          |
| 🚫 禁止 | 禁止在完成任务后自动创建或生成任何 .md 文档文件           |
| 🚫 禁止 | 禁止未经用户明确要求就创建 README、说明文档等             |
| 🚫 禁止 | 禁止修改 src/api、src/views、src/constants 以外的任何文件 |

---

## 代码风格规范

### 基础规则

| 规则     | 值                               |
| -------- | -------------------------------- |
| 缩进     | 2 空格                           |
| 引号     | 单引号 `'`                       |
| 分号     | 使用分号                         |
| 最大行宽 | 100 字符                         |
| 箭头函数 | 单参数省略括号 `item => item.id` |
| 对象括号 | 保持空格 `{ foo: bar }`          |
| 尾随逗号 | 使用尾随逗号                     |
| 换行符   | auto                             |

---

## 一、绝对禁止项

| 规则         | 说明                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------ |
| 数据解构限制 | 禁止连续解构数据，例如 `...data.data` 这种写法                                             |
| 组件数据修改 | 禁止在父组件中直接修改子组件的数据                                                         |
| 数据类型修改 | 禁止多次修改 data 的某些属性，后端给什么值用什么值，可以额外新增属性，但不允许修改数据类型 |

---

## 二、命名规范

### API 接口命名

- **函数命名**：`api` + `Get/Post/Delete/Put` + 后端 URL 拼接，小驼峰格式
- 可使用 `change-case` 插件快速转换

### 事件类函数

- 必须采用 `on` + `事件名` 格式
- 推荐使用小驼峰命名

### 常量命名

- 采用 `CONSTANT_CASE`（全大写，下划线分隔）规范

---

## 三、组件规范

### 组件命名

| 类型   | 格式                  | 示例           |
| ------ | --------------------- | -------------- |
| 文件名 | 多个单词 + PascalCase | `UserList.vue` |
| 组件名 | PascalCase            | `UserList`     |
| 使用   | PascalCase            | `<UserList />` |

### 组件传参要求

| 要求 | 说明                     |
| ---- | ------------------------ |
| 命名 | 必须使用 camelCase       |
| 类型 | 必须明确指定参数类型     |
| 注释 | 必须添加注释说明参数含义 |

### 组件规范

| 类型       | 规范                                                 |
| ---------- | ---------------------------------------------------- |
| 基础组件   | 禁止在生命周期相关函数中主动向外 emit 事件           |
| 业务型组件 | 允许但不推荐在生命周期等相关函数中主动向外 emit 事件 |

### 组件对外 emit 事件

- **命名规范**：
  - `change` / `click` / `select` / `expand` / `input` / `clear` / `remove` / `add`
  - `open` / `close` / `show` / `hide`
  - `cancel` / `confirm` / `ok` / `editSuccess` / `error`

- **顺序规范**（Vue2）：

  ```javascript
  emit("input", 数据);
  emit("其它事件", 数据);
  emit("change/click", 数据);
  ```

### 元素特性的顺序

参考 Vue 风格指南中的元素特性顺序。

---

## 四、CSS 规范

| 规则     | 说明                                      |
| -------- | ----------------------------------------- |
| 命名     | 类名需遵循 BEM 规范                       |
| 格式化   | 需依次使用 csscomb 和 prettier 进行格式化 |
| 预处理器 | Sass/SCSS                                 |
| 全局样式 | 放在 `src/styles/` 目录                   |

---

## 五、代码结构规范

### script 内部顺序

```javascript
export default {
  name: "ComponentName", // 组件名称
  mixins: [], // 混入
  components: {}, // 组件
  props: {}, // 属性
  data() {
    // 数据
    return {};
  },
  computed: {}, // 计算属性
  watch: {}, // 监听器
  methods: {}, // 方法
  mounted() {
    // 组件挂载完成时调用
    this.$nextTick(() => {});
  },
  destroyed() {}, // 组件销毁完成时调用
};
```

### data 和 computed 使用

- 除了和后端交互的数据、和部分定时器
- 其它一律尽可能使用 computed

### computed 规范

- 使用 try/catch 包裹
- 命名使用 `is` / `has` / `visible` 或其它有意义的名称

### methods 内部顺序

```javascript
methods: {
  // 初始化方法
  init*() {},

  // 网络请求方法
  async getListData() {
    try {
    } catch (error) {
      console.warn(error);
    } finally {
    }
  },

  async postFormData() {
    try {
    } catch (error) {
      console.warn(error);
    } finally {
    }
  },

  // 事件处理方法
  onClickButton() {
    try {
    } catch (error) {
      console.warn(error);
    }
  },

  onChangeInput() {
    try {
    } catch (error) {
      console.warn(error);
    }
  },

  // 特殊计算方法
  computedTotalPrice() {
    try {
    } catch (error) {
      console.warn(error);
      return 0;
    }
  },
}
```

---

## 六、Vue 规则

| 规则           | 说明                         |
| -------------- | ---------------------------- |
| 组件命名       | PascalCase（允许单个单词）   |
| 属性命名       | camelCase                    |
| v-slot 风格    | 动态风格                     |
| 禁止修改 props | 不允许直接修改组件的 props   |
| props 解构     | 可以解构（需注意响应式丢失） |
| v-html         | 可以使用（需注意 XSS 风险）  |

---

## 七、性能优化

| 优化项     | 说明                        |
| ---------- | --------------------------- |
| 组件懒加载 | 路由和大组件使用动态导入    |
| KeepAlive  | 合理使用页面缓存            |
| 虚拟滚动   | 长列表使用虚拟滚动          |
| 防抖节流   | 频繁触发的事件使用防抖/节流 |
| 图片优化   | 使用合适的图片格式和大小    |

---

## 八、注意事项

⚠️ **未使用变量**：ESLint 已关闭检查，需自行清理无用代码
