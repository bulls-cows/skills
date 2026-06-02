# 语义化命名规范（T03 配套）

命名是高风险操作：单个标识符可能被跨文件、跨模块、甚至运行时字符串引用。本文件给出命名规则与示例，T03 执行时按此对照逐项提议。

---

## 命名规则

- API 函数：`api + Method + URLPath`（如 `apiGetUserInfo`、`apiPostLogin`）
- 事件函数：`on + EventName`（如 `onClickSubmit`、`onChangeInput`）
- 常量：全大写 + 下划线（如 `MAX_RETRY_COUNT`、`API_BASE_URL`）
- Props：camelCase（如 `userName`、`isVisible`）
- Hooks：`use + 功能名`（如 `useTable`、`useSearchForm`）
- 布尔值：`isXxx` / `hasXxx` / `showXxx` 前缀（如 `isLoading`、`hasError`）

### 反例 → 正例对照

| 反例                         | 正例                           | 规则                              |
| ---------------------------- | ------------------------------ | --------------------------------- |
| `getUserInfo()`（含 HTTP）   | `apiGetUserInfo()`             | API 函数加 `api` 前缀             |
| `handleClick()`              | `onClickSubmit()`              | 事件函数用 `on` + 具体事件名      |
| `const limit = 10`           | `const MAX_RETRY_COUNT = 10`   | 常量全大写 + 下划线               |
| `Prop: user_name`            | `Prop: userName`               | Props 使用 camelCase              |
| `function tableHook()`       | `function useTable()`          | Hooks 使用 `use` 前缀             |
| `const loading = ref(false)` | `const isLoading = ref(false)` | 布尔值使用 `is`/`has`/`show` 前缀 |

---

## 跨文件引用提醒

涉及跨文件引用的重命名，先告知用户影响范围再获得确认。影响范围至少包括：

- 同名 import / export 的所有文件
- 模板中的属性绑定、事件绑定、插槽名
- 字符串引用（`this[name]`、动态组件名）

模型不一定能 100% 找全字符串引用，要主动提醒"建议人工再 grep 一次确认"。

---

## 避免的命名反模式

- 无意义命名：`data1`、`temp2`、`obj`、`item`（迭代变量除外）。
- 缩写歧义：`info`、`util`、`mgr`——除非业界共识（如 `ctx`、`req`、`res`）。
- 误导前缀：非布尔字段用 `is`/`has` 前缀（如 `isUserList`）。
- API 函数无 `api` 前缀但函数体内含 HTTP 调用——容易在调用方误以为是普通工具函数。
