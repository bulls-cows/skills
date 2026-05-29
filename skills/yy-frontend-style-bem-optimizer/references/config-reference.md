# 配置选项参考

## 配置来源（按优先级）

1. 用户明确指定的配置参数
2. 项目根目录下的 `.bemrc` 或 `bem.config.js` 配置文件
3. 使用默认配置

## 默认配置

- 元素分隔符：`__`（双下划线）
- 修饰符分隔符：`--`（双横线）
- 无统一前缀
- 忽略类名：`ant-*`、`el-*`、`mui-*`、`v-*`、`is-*`、`has-*`、`js-*`、`no-*`、`global-*`、Tailwind 等 utility-first 类名

## 配置项

### 基础配置

| 配置项              | 类型     | 默认值                                                                  | 说明                                                                                                  |
| ------------------- | -------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `elementSeparator`  | string   | `__`                                                                    | Block 与 Element 之间的分隔符，可选 `_`、`-` 等                                                       |
| `modifierSeparator` | string   | `--`                                                                    | Block/Element 与 Modifier 之间的分隔符，可选 `_`、`-` 等                                              |
| `prefix`            | string   | `""`                                                                    | 统一前缀，添加到所有 Block 前。示例：`"my-"` 使 `button` → `my-button`                                |
| `ignore`            | string[] | `["ant-", "el-", "mui-", "v-", "is-", "has-", "js-", "no-", "global-"]` | 忽略的类名前缀列表。Utility-first 类名（如 Tailwind 的 `flex`、`text-sm`、`bg-blue-500`）应加入此列表 |
| `ignorePattern`     | string   | `""`                                                                    | 忽略类名的正则表达式。示例：`"^(is-\|has-\|js-)"` 保留 `is-active`、`has-error`、`js-toggle`          |

### domainSplit：CSS 规则逻辑域拆分配置

| 子配置项      | 类型                     | 默认值                              | 说明                                                                                    |
| ------------- | ------------------------ | ----------------------------------- | --------------------------------------------------------------------------------------- |
| `mode`        | string                   | `"inline"`                          | 拆分模式：`"inline"` 同文件内注释分隔；`"files"` 拆为独立子文件                         |
| `domains`     | Record<string, string[]> | —                                   | 自定义逻辑域映射，键为域名，值为 Block 名称列表。用户自定义域与默认域合并，用户配置优先 |
| `domainOrder` | string[]                 | `["layout", ..., "modal", "other"]` | 域的排列顺序。未配置时使用：布局 → 用户域（按配置顺序）→ 通用组件 → 弹窗 → 其他         |

### nesting：BEM 嵌套结构重组配置

| 子配置项   | 类型    | 默认值  | 说明                                                         |
| ---------- | ------- | ------- | ------------------------------------------------------------ |
| `enabled`  | boolean | `false` | 是否启用嵌套重组。`true` 时执行 `&` 嵌套转换                 |
| `maxDepth` | number  | `4`     | 最大嵌套深度。示例：Block → Element → Modifier → 伪类 = 4 层 |

## 配置文件示例

### 基础 `.bemrc` 示例

```json
{
  "elementSeparator": "__",
  "modifierSeparator": "--",
  "prefix": "",
  "ignore": ["el-", "ant-", "fa-", "icon-"],
  "ignorePattern": "^(is-|has-|js-)",
  "domainSplit": {
    "mode": "inline",
    "domains": {
      "layout": [
        "page",
        "layout",
        "container",
        "wrapper",
        "sidebar",
        "header",
        "footer",
        "main",
        "nav"
      ],
      "search": ["search", "filter", "query", "criteria", "sorter"],
      "form": ["form", "input", "select", "checkbox", "radio", "textarea", "field", "upload"],
      "table": ["table", "list", "grid-view", "pagination"],
      "modal": ["dialog", "modal", "toast", "alert", "confirm", "popover", "tooltip"]
    },
    "domainOrder": ["layout", "search", "form", "table", "modal", "other"]
  },
  "nesting": {
    "enabled": false,
    "maxDepth": 4
  }
}
```

### Tailwind CSS / Windi CSS / UnoCSS 项目忽略配置

若项目使用 utility-first 框架，建议将 utility 类名加入 `ignore` 和 `ignorePattern`：

```json
{
  "ignore": [
    "ant-",
    "el-",
    "mui-",
    "v-",
    "is-",
    "has-",
    "js-",
    "no-",
    "global-",
    "fa-",
    "icon-",
    "material-icons"
  ],
  "ignorePattern": "^(p-|m-|w-|h-|text-|bg-|flex|grid|border-|rounded-|shadow-|space-|gap-|inset-|top-|right-|bottom-|left-|z-|opacity-|hover:|focus:|active:|disabled:|sm:|md:|lg:|xl:|2xl:)"
}
```
