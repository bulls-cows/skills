# 配置选项参考

## 配置来源（按优先级）

1. 用户明确指定的配置参数
2. 项目根目录下的 `.bemrc` 或 `bem.config.js` 配置文件
3. 使用默认配置

## 配置项

### elementSeparator

Block 与 Element 之间的分隔符。

- 默认值：`__`
- 可选值：任何字符串，如 `_`、`-` 等

### modifierSeparator

Block/Element 与 Modifier 之间的分隔符。

- 默认值：`--`
- 可选值：任何字符串，如 `_`、`-` 等

### prefix

统一前缀，添加到所有 Block 前。

- 默认值：空字符串
- 示例：`"my-"` 会使 `button` 变为 `my-button`

### ignore

忽略的类名前缀列表。

- 默认值：`["ant-", "el-", "mui-", "v-", "is-", "has-", "js-", "no-", "global-"]`
- 示例：`["el-", "ant-"]` 会保留 `el-button`、`ant-input` 等不变
- Utility-first 类名（如 Tailwind CSS 的 `flex`、`text-sm`、`bg-blue-500` 等）应加入忽略列表，避免误转换

### ignorePattern

忽略类名的正则表达式。

- 默认值：`""`
- 示例：`"^(is-|has-|js-)"` 会保留 `is-active`、`has-error`、`js-toggle` 等不变

### domainSplit

CSS 规则逻辑域拆分配置。

#### mode

拆分模式：

- `"inline"`（默认）：在同一文件内用注释分隔块组织
- `"files"`：拆分为独立的子文件，原文件改为入口文件

#### domains

自定义逻辑域映射，键为域名，值为属于该域的 Block 名称列表。

- 未配置时使用默认域分类
- 用户自定义域会与默认域合并，用户配置优先

#### domainOrder

域的排列顺序。

- 未配置时使用默认顺序：布局 → 用户域（按配置顺序）→ 通用组件 → 弹窗 → 其他

### nesting

BEM 嵌套结构重组配置。

#### enabled

是否启用嵌套重组。

- 默认值：`true`
- `false` 时保持所有规则扁平排列，不执行嵌套

#### maxDepth

最大嵌套深度。

- 默认值：`4`
- 超过此深度的规则保持扁平
- 示例：Block → Element → Modifier → 伪类 = 4 层深度

## .bemrc 配置文件示例

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
    "enabled": true,
    "maxDepth": 4
  }
}
```

## Tailwind CSS 等 Utility-first 框架的忽略配置

若项目使用 Tailwind CSS、Windi CSS、UnoCSS 等 utility-first 框架，建议将以下内容加入 `.bemrc` 的 `ignore` 和 `ignorePattern` 中，避免 utility 类名被误转换：

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
