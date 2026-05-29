---
name: yy-frontend-style-bem-optimizer
description: >
  前端 BEM 命名规范转换与 CSS 样式优化器。将 HTML/JSX/TSX/Vue 代码中的 class/className 属性
  与对应的 CSS/Sass/Less/Stylus 选择器同步转换为 BEM 命名格式，将 CSS 属性按 csscomb zen 预设顺序排列，
  将扁平 CSS 规则重组为 BEM 嵌套结构，并将样式规则按逻辑域拆分为独立集合。
  当用户要求 BEM 类名转换、CSS 属性排序、样式命名规范化、样式文件拆分、嵌套重组时触发。
  即使用户用口语化表达——"这个 scss 太乱了帮我整理下"、"把 class 名改成规范格式"、
  "CSS 属性顺序排一下"、"这个样式文件拆开吧"——也应触发此技能。
---

# yy-frontend-style-bem-optimizer

## 描述

将 HTML/JSX/TSX/Vue 代码中的 `class`/`className` 属性与对应的 CSS/SCSS/Less/Stylus 选择器同步转换为符合 BEM（Block Element Modifier）规范的格式，对 CSS 属性按 csscomb zen 预设顺序排列，将扁平的 CSS 规则重组为 BEM 嵌套结构，并将 SCSS/Less/Stylus 中的 CSS 规则按逻辑域拆分为独立的样式集合。

## 支持格式

- **标记文件**：`.html`、`.jsx`、`.tsx`、`.vue`
- **样式文件**：`.css`、`.scss`、`.sass`、`.less`、`.styl`、`.stylus`

## 核心能力

1. **BEM 命名转换**：同时处理标记文件的 `class`/`className` 和样式文件的选择器，保持映射一致
2. **CSS 属性排序**：将 CSS 规则中的属性按 csscomb zen 预设顺序排列
3. **BEM 嵌套重组**（可选）：将扁平分散的 BEM 规则重组为 SCSS/Less/Stylus 的 `&` 嵌套结构
4. **逻辑域拆分**（可选）：将 SCSS/Less/Stylus 中的 CSS 规则按业务逻辑域拆分为独立集合

## 使用场景

- 用户要求将类名转换为 BEM 命名规范、重构旧项目样式命名、统一团队 CSS 命名规范
- 用户要求整理 CSS 属性的书写顺序
- 用户要求将扁平的 CSS/SCSS 规则重组为嵌套结构
- 用户要求将臃肿的样式文件按功能模块拆分
- 用户口语化表达如"这个样式太乱了帮我整理下"、"把 class 改规范"、"CSS 顺序排一下"

不应触发：

- 用户只是询问 BEM 是什么或 BEM 规范理论（不涉及实际代码转换）
- 用户要求创建新组件并直接使用 BEM 命名（应在编码时直接使用，无需转换）
- 用户要求修改 CSS 属性值或样式逻辑（不涉及 class 命名转换）
- 用户要求重命名 JavaScript/TypeScript 变量或函数名
- 用户要求后端 API 命名、数据库字段命名或其他非前端类名转换
- 用户要求使用 CSS Modules、CSS-in-JS（styled-components/emotion）等方案重写样式（这些方案不依赖 BEM 类名）
- 用户要求使用 Tailwind CSS 等 utility-first 方案重写样式（utility-first 与 BEM 是不同的方法论）
- 用户只是要求删除或合并冗余 CSS 规则（不涉及命名和结构重组）

## 指令

### 步骤 1. 确定能力范围

根据用户意图判断需要执行哪些能力。用户可能只需要其中一项或多项组合：

| 用户意图                             | 需要的能力   |
| ------------------------------------ | ------------ |
| 转换类名为 BEM 规范、统一命名        | BEM 命名转换 |
| 整理 CSS 属性顺序                    | CSS 属性排序 |
| 重组为嵌套结构、用 `&__element` 组织 | BEM 嵌套重组 |
| 拆分样式文件、按功能分组             | 逻辑域拆分   |
| 整体整理样式（未指定具体项）         | 全部四项     |

**决策分支**：

- 用户明确指定某项能力 → 只执行该项
- 用户要求"整理样式"、"优化样式"等宽泛表述 → 执行 BEM 命名转换和 CSS 属性排序（嵌套重组和逻辑域拆分需要用户明确要求才执行，因为这两项会改变文件结构）
- 用户要求 BEM 命名转换且样式文件为 SCSS/Less/Stylus，且用户要求嵌套 → 同时执行 BEM 嵌套重组。若为纯 `.css` 文件或用户未要求，则跳过
- 用户要求 CSS 属性排序但不涉及命名 → 只执行属性排序

**步骤间执行顺序**：

当需要执行多项能力时，按以下顺序执行，每一步依赖前一步的结果：

1. **BEM 命名转换**（步骤 5）→ 必须最先执行，后续步骤依赖转换后的 BEM 类名
2. **CSS 属性排序**（步骤 6）→ 应在嵌套重组之前执行，因为嵌套后属性更难重排
3. **BEM 嵌套重组**（步骤 7）→ 依赖命名转换完成后的 BEM 类名，用户明确要求时才执行
4. **逻辑域拆分**（步骤 8）→ 应在嵌套重组之后执行，因为嵌套后的完整 Block 才是拆分的最小单元；用户明确要求时才执行

### 步骤 2. 确定转换模式

- **代码片段模式**：用户直接粘贴 HTML/CSS 代码片段
- **单文件模式**：用户指定单个文件路径
- **批量目录模式**：用户指定目录路径，要求批量转换

**决策分支**：

- 用户未明确模式但有代码片段内容 → 按代码片段模式处理
- 用户指定文件路径 → 单文件模式
- 用户指定目录路径 → 批量目录模式
- 用户未明确范围 → 询问用户要转换的范围

### 步骤 3. 读取和解析源内容

根据转换模式读取内容。

**解析规则**：

- 从 HTML/Vue 模板中提取所有 `class` 属性的值，分割为单个类名
- 从 JSX/TSX 中提取所有 `className` 属性的值，分割为单个类名
- 从 CSS/SCSS/Less/Stylus 中提取所有选择器中的类名
- 建立标记文件 class/className 与 CSS 选择器的映射关系
- 识别已符合 BEM 规范的类名（如 `block__element--modifier`），标记为无需转换

### 步骤 4. 确定配置

**默认配置**：

- 元素分隔符：`__`（双下划线）
- 修饰符分隔符：`--`（双横线）
- 无统一前缀
- 忽略类名：`ant-*`、`el-*`、`mui-*`、`v-*`、`is-*`、`has-*`、`js-*`、`no-*`、`global-*`、Tailwind 等 utility-first 类名

**自定义配置来源**（按优先级）：

1. 用户明确指定的配置参数
2. 项目根目录下的 `.bemrc` 或 `bem.config.js` 配置文件
3. 使用默认配置

#### 配置项

##### 基础配置

| 配置项              | 类型     | 默认值                                                                  | 说明                                                                                                  |
| ------------------- | -------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `elementSeparator`  | string   | `__`                                                                    | Block 与 Element 之间的分隔符，可选 `_`、`-` 等                                                       |
| `modifierSeparator` | string   | `--`                                                                    | Block/Element 与 Modifier 之间的分隔符，可选 `_`、`-` 等                                              |
| `prefix`            | string   | `""`                                                                    | 统一前缀，添加到所有 Block 前。示例：`"my-"` 使 `button` → `my-button`                                |
| `ignore`            | string[] | `["ant-", "el-", "mui-", "v-", "is-", "has-", "js-", "no-", "global-"]` | 忽略的类名前缀列表。Utility-first 类名（如 Tailwind 的 `flex`、`text-sm`、`bg-blue-500`）应加入此列表 |
| `ignorePattern`     | string   | `""`                                                                    | 忽略类名的正则表达式。示例：`"^(is-\|has-\|js-)"` 保留 `is-active`、`has-error`、`js-toggle`          |

##### domainSplit：CSS 规则逻辑域拆分配置

| 子配置项      | 类型                     | 默认值                              | 说明                                                                                    |
| ------------- | ------------------------ | ----------------------------------- | --------------------------------------------------------------------------------------- |
| `mode`        | string                   | `"inline"`                          | 拆分模式：`"inline"` 同文件内注释分隔；`"files"` 拆为独立子文件                         |
| `domains`     | Record<string, string[]> | —                                   | 自定义逻辑域映射，键为域名，值为 Block 名称列表。用户自定义域与默认域合并，用户配置优先 |
| `domainOrder` | string[]                 | `["layout", ..., "modal", "other"]` | 域的排列顺序。未配置时使用：布局 → 用户域（按配置顺序）→ 通用组件 → 弹窗 → 其他         |

##### nesting：BEM 嵌套结构重组配置

| 子配置项   | 类型    | 默认值  | 说明                                                         |
| ---------- | ------- | ------- | ------------------------------------------------------------ |
| `enabled`  | boolean | `false` | 是否启用嵌套重组。`true` 时执行 `&` 嵌套转换                 |
| `maxDepth` | number  | `4`     | 最大嵌套深度。示例：Block → Element → Modifier → 伪类 = 4 层 |

##### 配置文件示例

**基础 `.bemrc` 示例**：

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

**Tailwind CSS / Windi CSS / UnoCSS 项目忽略配置**：

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

### 步骤 5. 执行 BEM 命名转换

> 仅在能力范围包含"BEM 命名转换"时执行。

**HTML/Vue 转换**：

- 遍历所有 `class` 属性，将每个类名按转换策略映射为 BEM 格式
- 保留被忽略的类名不变（包括第三方 UI 库类名和 utility-first 类名）

**JSX/TSX 转换**：

- 遍历所有 `className` 属性（包括字符串字面量和模板字符串）
- 对于动态拼接的类名字符串（如 ``className={`btn-${variant}`}``），在报告中标记需人工确认，不自动转换

**CSS/SCSS/Less/Stylus 转换**：

- 遍历所有类选择器，将选择器中的每个类名按相同映射规则转换
- 保留被忽略的类名不变

**同步约束**：HTML 和 CSS 中的同一类名必须使用相同的 BEM 转换结果，转换过程中维护类名映射表确保一致性。

**示例映射**：

| 原始类名             | BEM 转换结果           | 推导逻辑                         |
| -------------------- | ---------------------- | -------------------------------- |
| `header`             | `header`               | Block，无变化                    |
| `header-title`       | `header__title`        | 嵌套于 header 下，识别为 Element |
| `header-title-large` | `header__title--large` | 状态/尺寸类，识别为 Modifier     |
| `btn`                | `btn`                  | Block，无变化                    |
| `btn-primary`        | `btn--primary`         | 变种类，识别为 Modifier          |
| `card-body-padding`  | `card__body--padding`  | Element + Modifier               |

**转换策略判断**：

- 分析类名结构，识别潜在的 Block、Element、Modifier 关系
- 嵌套结构优先按层级推导 Element 关系
- 状态类名（如 `active`、`disabled`、`open`）优先识别为 Modifier
- 对于无法自动推断的类名，保留原样并在报告中标记

**边界规则**（避免推导歧义和违反 BEM 规范）：

- **禁止 Element 嵌套 Element**：BEM 规范不允许 `block__elem1__elem2` 格式。即使 DOM 中 `elem2` 嵌套在 `elem1` 内，也应扁平化为 `block__elem2`。例如 `card-header-title` 转换为 `card__title`（而非 `card__header__title`），因为 Element 描述的是组件的语义部分，而非 DOM 层级
- **多段连字符歧义消解**：当类名包含多段连字符（如 `user-profile-card-body`）时，取第一段或前两段为 Block 名称，其余部分结合上下文判断 Element 或 Modifier。消解优先级：1）CSS 中是否存在匹配的 Block 选择器 → 确认 Block 边界；2）DOM 中是否嵌套在已知 Block 内 → 确认 Element 归属；3）无法消解 → 保留原样并标记
- **已有 BEM 类名的重转换**：若项目使用不同于配置的分隔符（如当前类名为 `block_elem_mod`，但目标配置为 `__`/`--`），应识别其 BEM 结构后按新分隔符重新输出，而非当作非 BEM 类名重新推导
- **混合 BEM 实体（Mix）**：一个 DOM 节点同时属于两个 Block（如 `class="block1 block2__elem"`）时，两个 BEM 实体独立转换，不交叉推导 Element 归属

### 步骤 6. 执行 CSS 属性排序

> 仅在能力范围包含"CSS 属性排序"时执行。

按 csscomb zen 预设顺序重新排列每个 CSS 规则中的声明。zen 预设按属性对布局的影响力由大到小排列（定位 → 盒模型 → 排版 → 视觉 → 动效），是可验证的社区标准——排序结果可用 `csscomb` CLI 工具直接校验。

**兼容性检查子步骤**（与属性排序同步执行）：

1. 检查项目是否有 `.browserslistrc` 或 `package.json` 中的 `browserslist` 配置
2. 根据项目兼容性目标，读取下文兼容性警告章节
3. 扫描当前处理的每条 CSS 规则，比对兼容性风险属性列表
4. 发现匹配时，将该属性、所在规则、严重程度和降级建议记入兼容性警告清单

兼容性警告是属性排序的核心附加价值，不输出警告等于排序只做了一半。

#### CSS 属性排列规则

##### 排序方法论

CSS 属性按 [csscomb](https://github.com/csscomb/csscomb.js) zen 预设顺序排列。该预设的核心哲学是：按属性对布局的影响力由大到小排列（定位 → 盒模型 → 排版 → 视觉 → 动效）。本规则在 csscomb zen 预设基础上：

- 补充了 zen 预设未覆盖的现代 CSS 属性（CSS Grid、Container Queries、逻辑属性等）
- 移除了已过时的 IE 前缀 hack（`filter:progid:DXImageTransform.*` 等）
- 排序结果可用 `csscomb` CLI 工具验证

##### 属性排列顺序（csscomb zen 预设 + 现代属性补充）

按以下序列排列每个 CSS 规则内的声明：

1. **定位**：`position`、`top`、`right`、`bottom`、`left`、`inset`、`z-index`
2. **显示模式**：`display`、`visibility`、`flex`、`flex-direction`、`flex-wrap`、`flex-flow`、`justify-content`、`align-items`、`align-content`、`align-self`、`flex-grow`、`flex-shrink`、`flex-basis`、`order`、`grid`、`grid-template-columns`、`grid-template-rows`、`grid-template-areas`、`grid-template`、`grid-auto-columns`、`grid-auto-rows`、`grid-auto-flow`、`grid-column`、`grid-row`、`grid-area`、`grid-column-start`、`grid-column-end`、`grid-row-start`、`grid-row-end`、`gap`、`row-gap`、`column-gap`、`place-items`、`place-content`、`place-self`、`container`、`container-type`、`container-name`、`columns`、`column-width`、`column-count`、`column-fill`、`column-rule`、`column-span`、`object-fit`、`object-position`
3. **盒模型**：`box-sizing`、`aspect-ratio`、`width`、`min-width`、`max-width`、`height`、`min-height`、`max-height`、`margin`、`margin-top`、`margin-right`、`margin-bottom`、`margin-left`、`padding`、`padding-top`、`padding-right`、`padding-bottom`、`padding-left`
4. **溢出与裁切**：`overflow`、`overflow-x`、`overflow-y`、`clip`、`clip-path`、`scroll-behavior`、`scroll-snap-type`、`scroll-snap-align`、`scroll-snap-stop`、`overscroll-behavior`、`overscroll-behavior-x`、`overscroll-behavior-y`
5. **浮动**：`float`、`clear`
6. **排版**：`font`、`font-family`、`font-size`、`font-weight`、`font-style`、`font-variant`、`line-height`、`letter-spacing`、`word-spacing`、`word-break`、`word-wrap`、`overflow-wrap`、`white-space`、`text-align`、`text-decoration`、`text-transform`、`text-indent`、`text-overflow`、`text-shadow`、`vertical-align`、`color`、`direction`、`writing-mode`、`unicode-bidi`
7. **背景**：`background`、`background-color`、`background-image`、`background-repeat`、`background-position`、`background-size`、`background-attachment`、`background-origin`、`background-clip`、`background-blend-mode`
8. **边框**：`border`、`border-width`、`border-style`、`border-color`、`border-radius`、`border-top`、`border-right`、`border-bottom`、`border-left`、`outline`、`outline-width`、`outline-style`、`outline-color`、`outline-offset`
9. **视觉效果**：`opacity`、`box-shadow`、`filter`、`backdrop-filter`、`mix-blend-mode`、`isolation`、`contain`
10. **变换与过渡**：`transform`、`transform-origin`、`transition`、`transition-property`、`transition-duration`、`transition-timing-function`、`transition-delay`、`animation`、`animation-name`、`animation-duration`、`animation-timing-function`、`animation-delay`、`animation-iteration-count`、`animation-direction`、`animation-fill-mode`、`animation-play-state`
11. **交互**：`cursor`、`pointer-events`、`user-select`、`resize`
12. **其他**：`content`、`counter-reset`、`counter-increment`、`list-style`、`list-style-position`、`list-style-type`、`list-style-image`、`table-layout`、`border-collapse`、`border-spacing`、`caption-side`、`empty-cells`、`quotes`、`page-break-before`、`page-break-inside`、`page-break-after`、`break-before`、`break-inside`、`break-after`、`orphans`、`widows`

> ⚠️ 标记表示该属性在当前主流浏览器（Last 2 versions of Chrome/Firefox/Safari/Edge）中存在兼容性限制，详见下文「兼容性警告」章节。若项目有 `.browserslistrc` 配置，以项目实际兼容性要求为准。

##### 执行规则

- 每条 CSS 规则内的属性按上述顺序重新排列，各逻辑层之间保留一个空行分隔（定位/显示/盒模型 → 空行 → 排版/背景/边框/视觉/动效/交互/其他）
- 不在上述列表中的属性排在各逻辑层末尾
- 遇到 CSS 简写属性（如 `margin: 0`）时，视为对应的分类，不拆分为子属性
- SCSS/Less/Stylus 中的变量、mixin 调用等非标准声明，排在末尾

##### 浏览器前缀排序规则

当 CSS 规则中同时存在带前缀和不带前缀的同一属性时，按以下规则排列：

- 带前缀的属性紧跟对应的标准属性之前，按 `-webkit-` → `-moz-` → `-ms-` → `-o-` → 标准属性 顺序排列
- 示例：`-webkit-transform`、`-moz-transform`、`-ms-transform`、`-o-transform`、`transform`
- 若标准属性不在上述属性列表中（如仍在实验阶段的属性），带前缀的变体与标准属性一起排在功能层末尾
- SCSS/Less/Stylus 中的 mixin 或函数自动处理前缀的情况（如 `@include transform(...)`），不适用此规则

##### 兼容性警告

###### 默认基准：现代浏览器

默认兼容性基准为最近 2 个主要版本的 Chrome、Firefox、Safari、Edge。在此基准下，以下属性仍存在兼容性限制：

| 属性                           | 严重程度 | 问题描述                                                                          |
| ------------------------------ | -------- | --------------------------------------------------------------------------------- |
| `backdrop-filter`              | 🟡       | Firefox 103+ 支持，Safari 需 `-webkit-` 前缀（较旧版本），旧版 Firefox 完全不支持 |
| `clip-path`（复杂形状）        | 🟡       | Safari 对 `path()` 和复杂 `polygon()` 的支持晚于 Chrome/Firefox                   |
| `container` / `container-type` | 🟡       | Container Queries 在 Safari 16+ 支持，更旧版本不支持                              |
| `aspect-ratio`                 | 🟡       | Safari 15+ 支持，旧版不支持，需 `padding-top` hack 降级                           |
| `scroll-snap-type`             | 🟡       | 所有现代浏览器均支持，旧版 Safari 需 `-webkit-` 前缀                              |
| `overscroll-behavior`          | 🟡       | Safari 16+ 支持，Firefox 和 Chrome 已全面支持                                     |
| `color-mix()`                  | 🟡       | CSS 颜色函数，Safari 16.2+ 支持，部分旧版浏览器不支持                             |
| `:has()` 选择器                | 🟡       | Safari 15.4+ 支持，Firefox 121+ 支持，更旧版本不支持                              |
| `@layer`                       | 🟡       | CSS Cascade Layers，Safari 15.4+ 支持，更旧版本不支持                             |
| `anchor-positioning`           | 🔴       | CSS Anchor Positioning 仍为实验性特性，仅 Chrome 125+ 部分支持                    |
| `view-transitions`             | 🔴       | View Transitions API 仅 Chrome 111+ 支持，Firefox/Safari 尚不支持                 |

###### 兼容性检查流程

1. 检查项目是否有 `.browserslistrc` 或 `package.json` 中的 `browserslist` 配置
2. 若有，以项目配置为准进行兼容性判断
3. 若无，使用上述默认基准
4. 扫描当前处理的每条 CSS 规则，比对待检查属性列表
5. 发现匹配时，将该属性、所在规则、严重程度记入兼容性警告清单
6. 此清单将作为报告的固定输出项

###### 旧浏览器兼容性（仅供参考）

若项目需要支持较旧的浏览器（如 IE11 或 2020 年前的 Chrome/Safari 版本），以下属性在旧环境中存在严重兼容性问题。执行属性分层时，若检测到项目 `.browserslistrc` 包含旧浏览器目标，应额外输出这些警告：

| 属性                                               | 严重程度 | 旧环境问题                                             |
| -------------------------------------------------- | -------- | ------------------------------------------------------ |
| `display: grid` 及所有 `grid-*` 属性               | 🔴       | IE11 不支持（有 `-ms-grid` 旧实现但语法不兼容）        |
| `--custom-property`（CSS 自定义属性）              | 🔴       | IE11 完全不支持                                        |
| `position: sticky`                                 | 🔴       | IE11 不支持                                            |
| `object-fit`                                       | 🔴       | IE11 不支持                                            |
| `aspect-ratio`                                     | 🔴       | IE11 和 2020 年前的所有浏览器不支持                    |
| `gap` / `row-gap` / `column-gap`（Flexbox 上下文） | 🔴       | IE11 和 Chrome 84 以下不支持                           |
| `filter` / `backdrop-filter`                       | 🔴       | IE11 完全不支持，旧版 Chrome/Safari 需 `-webkit-` 前缀 |
| `clip-path`（basic-shape 值）                      | 🔴       | IE11 不支持，旧版 Chrome 需 `-webkit-` 前缀            |
| `mix-blend-mode` / `background-blend-mode`         | 🔴       | IE11 不支持                                            |
| `display: contents`                                | 🔴       | IE11 和旧版 Chrome/Safari 不支持                       |
| `writing-mode`                                     | 🟡       | IE11 仅支持非标准语法                                  |
| `text-overflow: ellipsis`（多行截断）              | 🟡       | 多行截断需 `-webkit-line-clamp`，IE11 不支持           |
| `position: fixed`（在 transform/filter 祖先内）    | 🟡       | 旧浏览器中 `fixed` 会退化为 `absolute` 行为            |

旧浏览器的降级策略提示：

- **Grid 布局** → Flexbox 或 `-ms-grid` 旧语法
- **CSS 变量** → 编译时替换为硬编码值（PostCSS 插件 `postcss-custom-properties`）
- **sticky 定位** → `position: relative` + JavaScript 滚动监听
- **object-fit** → 背景图 `background-size: cover/contain` 方案
- **aspect-ratio** → `padding-top` 百分比 hack 方案
- **gap（Flexbox）** → 子元素 `margin` 方案
- **filter / backdrop-filter** → 渐进增强，提供 fallback 背景色
- **clip-path** → 渐进增强，使用 `overflow: hidden` 或 PNG 遮罩降级

### 步骤 7. 执行 BEM 嵌套重组

> 仅在用户明确要求"嵌套"或"用 & 组织"时执行。嵌套是 SCSS/Less/Stylus 的语法糖，不是 BEM 规范的一部分。纯 `.css` 文件不执行（除非用户明确要求且项目支持 CSS 原生嵌套）。

将扁平分散的 BEM 规则（属于同一个 Block 的 Element 和 Modifier）重组为 `&` 嵌套结构，使样式的层级关系与组件 DOM 结构对应。

嵌套规则要点：

- Block 自身属性排在最前面，其后按「Modifier → 伪类/伪元素 → 媒体查询 → Element」顺序排列
- 嵌套深度不超过 4 层
- 嵌套后的选择器特异性必须与嵌套前完全一致

#### BEM 嵌套结构重组规则

##### 适用条件

- 样式文件为 SCSS（`.scss`、`.sass`）、Less（`.less`）或 Stylus（`.styl`、`.stylus`）
- 纯 `.css` 文件不执行嵌套重组（除非用户明确要求且项目支持 CSS 原生嵌套）

##### 识别同一 Block 下的规则

- 所有以同一 Block 名称开头的规则归为一组
- `.block` → Block 自身的规则，作为嵌套根
- `.block__element` → 嵌套为 `&__element`
- `.block--modifier` → 嵌套为 `&--modifier`
- `.block__element--modifier` → 嵌套为 `&__element` 内的 `&--modifier`

##### 嵌套层级结构

按以下顺序排列 Block 的子规则：

```scss
.block {
  // Block 自身属性（已按布局层 → 功能层排列）

  // 1. Block 级 Modifier
  &--modifier { ... }

  // 2. Block 级伪类/伪元素
  &:hover { ... }
  &::before { ... }
  &::after { ... }

  // 3. Block 级媒体查询
  @media (...) { ... }

  // 4. Element（按 DOM 出现顺序或字母顺序排列）
  &__element {
    // Element 自身属性

    // 4a. Element 级 Modifier
    &--modifier { ... }

    // 4b. Element 级伪类/伪元素
    &:hover { ... }
    &::before { ... }

    // 4c. Element 级媒体查询
    @media (...) { ... }
  }

  &__another-element { ... }
}
```

##### 执行规则

- Block 自身属性排在最前面，其后按「Modifier → 伪类/伪元素 → 媒体查询 → Element」顺序排列
- 同一层内多个 Element 按 DOM 出现顺序排列；若无法确定 DOM 顺序，按字母顺序排列
- 同一层内多个 Modifier 按字母顺序排列
- 嵌套深度不超过 4 层（Block → Element → Modifier → 伪类/状态）。若超过 4 层，最内层保持扁平
- 每个 Block 嵌套组之间保留一个空行
- 多个 Block 之间保留两个空行
- 如果某个 Element 被多个 Block 引用（跨 Block 复用），保持扁平不嵌套，在报告中标记
- `@keyframes` 动画定义不嵌套，保持在 Block 外部
- SCSS 的 `@extend`、`@include` 等 at-rule 随其所属的选择器嵌套
- 嵌套重组后的代码必须通过编译验证——确保重组前后编译产物一致

##### 嵌套约束

- 不同 Block 的规则不可交叉嵌套
- 已存在嵌套结构的规则先展平再重新嵌套，确保嵌套格式统一
- 嵌套后的选择器特异性（specificity）必须与嵌套前完全一致
- 若原始代码中存在刻意保持扁平的注释标记（如 `// flat` 或 `// no-nest`），保留其扁平状态不嵌套

##### 特异性验证

嵌套重组前后，选择器的特异性必须完全一致。以下是验证方法和常见陷阱。

**验证方法**：

1. 嵌套前记录每条规则的完整选择器路径和特异性（ID 数、类数、元素数）
2. 嵌套后将 `&` 展开为完整选择器，重新计算特异性
3. 逐条比对，确保特异性三元组完全一致

**常见陷阱**：

- `.block__element`（特异性 0,1,0）嵌套为 `.block { &__element {} }` 后，展开为 `.block__element`（特异性 0,1,0），特异性不变 ✅
- 如果原始代码中是 `.block .block__element`（后代选择器，特异性 0,2,0），不可简单嵌套为 `.block { &__element {} }`，因为展开后变成 `.block__element`（特异性 0,1,0），特异性降低了。需要保持原始的后代关系
- `.block--modifier` 嵌套为 `.block { &--modifier {} }` 展开为 `.block--modifier`，特异性不变 ✅

**关键规则**：SCSS/Less 的 `&` 在选择器之间不插入空格。`.block { &__element {} }` 展开为 `.block__element`（无空格），与原始扁平写法一致。只有当原始代码显式使用后代选择器（有空格）时，才需要特别注意特异性变化。

##### Element 嵌套约束

BEM 规范禁止 Element 嵌套 Element（如 `block__elem1__elem2`）。在嵌套重组时同样遵循此规则：

- `&__element` 内部不可再嵌套 `&__sub-element`——这会生成 `block__element__sub-element`，违反 BEM 规范
- 所有 Element 直接嵌套在 Block 根下，不按 DOM 层级嵌套
- Element 的 Modifier（如 `&__element { &--modifier {} }`）是允许的，这生成 `block__element--modifier`

### 步骤 8. 执行逻辑域拆分

> 仅在用户明确要求"拆分文件"或"按功能分组"时执行。且仅适用于 SCSS/Less/Stylus 文件。

将 CSS 规则按业务逻辑域（如布局、搜索、表单、表格、弹窗等）分组整理，用注释分隔块组织或拆分为独立文件。

拆分要点：

- 同一个 Block 及其 Element/Modifier 规则必须归入同一个逻辑域，不可拆散
- 默认使用单文件内注释分隔块组织；用户指定时拆分为多文件
- 常见域分类：布局、检索/搜索、表单、表格/列表、弹窗/反馈、卡片/内容、按钮/操作

#### CSS 规则按逻辑域拆分规则

##### 拆分触发条件

- 样式文件中包含属于不同业务功能区域的规则（如页面布局、搜索区域、表单区域、表格区域等）
- 用户明确要求按功能模块拆分样式
- 单个样式文件规则数量过多（超过 50 条规则建议拆分）

##### 逻辑域识别方式

按以下优先级从高到低识别域归属。当多种方式产生矛盾时，以高优先级的结果为准：

1. **用户指定**（优先级最高）：用户明确给出拆分规则（如"把布局、搜索、表单分开"）。用户指定的映射不可被自动推导覆盖
2. **配置文件映射**：按 `.bemrc` 中 `domainSplit.domains` 的键值对归类，用户自定义域优先于默认域分类
3. **Block 前缀推导**：根据 BEM Block 名称前缀或完整名称匹配域分类表（如 `search-bar` → 检索域、`form-container` → 表单域）。匹配规则：完整匹配优先于前缀匹配
4. **DOM 结构推导**：根据 HTML 中元素的嵌套关系和所属区域推导归属。当 Block 嵌套在某个已知域的 Block 内时，推导为同一域
5. **文件路径推导**（优先级最低）：根据样式文件所在目录或文件名推断所属模块

**冲突消解规则**：

- 用户指定与自动推导矛盾 → 以用户指定为准
- 配置文件映射与 Block 前缀推导矛盾 → 以配置文件映射为准
- Block 前缀推导与 DOM 结构推导矛盾 → 以前缀推导为准（Block 名称是更稳定的归属标识）
- DOM 结构推导与文件路径推导矛盾 → 以 DOM 结构推导为准（运行时结构比文件组织更可靠）
- 所有自动推导方式都无法归类 → 归入「其他」域

##### 常见逻辑域分类

| 域分类              | 说明                         | 典型 Block 名称示例                                                                            |
| ------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------- |
| 布局（layout）      | 页面整体骨架、容器、网格系统 | `page`、`layout`、`container`、`wrapper`、`grid`、`sidebar`、`header`、`footer`、`main`、`nav` |
| 检索/搜索（search） | 搜索栏、筛选条件、过滤面板   | `search`、`filter`、`query`、`criteria`、`sorter`、`result`                                    |
| 表单（form）        | 表单容器、输入控件、校验反馈 | `form`、`input`、`select`、`checkbox`、`radio`、`textarea`、`field`、`upload`、`validator`     |
| 表格/列表（table）  | 数据表格、列表展示、分页     | `table`、`list`、`grid-view`、`pagination`、`cell`、`row`                                      |
| 弹窗/反馈（modal）  | 对话框、提示、通知           | `dialog`、`modal`、`toast`、`alert`、`confirm`、`popover`、`tooltip`                           |
| 卡片/内容（card）   | 内容卡片、信息展示块         | `card`、`article`、`post`、`item`、`detail`、`profile`                                         |
| 按钮/操作（action） | 按钮组、工具栏、操作面板     | `btn`、`button`、`toolbar`、`action`、`dropdown`、`menu`                                       |
| 自定义域            | 用户定义的其他逻辑域         | 由用户在配置中指定 Block 名称到域的映射                                                        |

##### 拆分执行规则

###### 单文件内拆分（默认模式）

在同一文件内用注释分隔块组织不同逻辑域的规则：

- 每个域以注释块标识，格式：`// ─── 域名称 ───────────────────────`
- 域之间保留一个空行
- 无法归类的规则放在最后的「其他」域中

###### 多文件拆分（用户指定时）

将规则拆分到不同文件中：

- 文件命名规则：`_域名称.scss`（SCSS）、`_域名称.less`（Less）、`域名称.styl`（Stylus）
- 原文件改为入口文件，通过 `@import`/`@use` 引入各子文件
- 变量和 mixin 定义提取到独立的 `_variables`/`_mixins` 文件中
- 如果原文件包含入口文件同名的规则，入口文件保留这些规则和所有 `@import`/`@use` 语句
- 子文件中引用的变量和 mixin 统一在入口文件中导入，子文件不再重复导入

##### 拆分顺序（域的排列顺序）

1. 变量与工具（variables、mixins、functions）
2. 布局（layout）
3. 具体业务域（按用户指定或自动识别的顺序排列）
4. 通用组件（action、card 等跨域复用的组件）
5. 弹窗与反馈（modal）
6. 其他（无法归类的规则）

##### 拆分约束

- 仅对 SCSS/Less/Stylus 预处理器文件执行拆分，不拆分纯 `.css` 文件
- BEM 嵌套规则（如 `&__element`）作为整体移动，不拆散 Block 的内部结构
- 同一个 Block 及其所有 Element/Modifier 规则必须归入同一个逻辑域，不可拆散
- 媒体查询（`@media`）随其所属的 Block 归类，不单独拆出
- `@keyframes` 动画定义随其首次引用的 Block 归类
- 若某个 Block 的规则数量极少（≤ 2 条）且不属于明确的功能域，归入「其他」域

### 步骤 9. 预览、确认、应用

默认先输出预览（转换前后对比 + 类名映射表），用户确认后再写入文件。输出包含：

```
转换摘要
─────────────────────
处理文件：N 个
类名转换：N 个（自动推断 N，需人工确认 N）
属性重排：N 条规则
嵌套重组：N 个 Block
域拆分  ：N 个域
忽略类名：N 个（第三方 N，utility-first N）
兼容性警告：N 个（🔴/🟡）

类名映射
─────────────────────
original-class → bem-class
...

兼容性警告（仅在属性排序启用时输出）
─────────────────────
⚠️  /path/to/file.scss
┌ 第 N 行  .selector
│   🟡 backdrop-filter → 降级建议：Safari 需 `-webkit-` 前缀
│   🔴 view-transitions → 降级建议：仅 Chrome 111+ 支持，Firefox/Safari 不支持
└ 第 M 行  .selector
    🟡 aspect-ratio → 降级建议：Safari 15 以下需 `padding-top` hack 降级

需人工确认项
─────────────────────
- /path/to/Component.tsx 第 N 行：`className={`dialog-${size}`}` 为动态拼接，已标记为 `dialog--${size}`，请验证运行时行为
```

**安全约束**：

- 默认预览，用户确认后才写入；默认不覆盖原文件，优先保存到新文件
- 批量模式下先试运行单个文件，输出受影响文件清单由用户确认
- 不修改除 class 名以外的任何代码逻辑和样式属性

## 转换示例

各示例对应的处理步骤：

| 示例   | 对应步骤       | 展示内容                                 |
| ------ | -------------- | ---------------------------------------- |
| 示例 1 | 步骤 5 + 7     | 基础 BEM 命名转换 + 嵌套重组             |
| 示例 2 | 步骤 5 + 7     | 带修饰符的 BEM 转换 + 嵌套               |
| 示例 3 | 步骤 4 + 5     | 忽略第三方类名                           |
| 示例 4 | 步骤 6         | CSS 属性排序                             |
| 示例 5 | 步骤 5 + 6 + 7 | BEM 转换 + 属性排序 + 嵌套重组（全流程） |
| 示例 6 | 步骤 5 + 7 + 8 | 逻辑域拆分（单文件内注释分隔）           |
| 示例 7 | 步骤 5 + 7     | JSX + SCSS 同步转换 + 动态类名处理       |

### 示例 1：基础 BEM 命名转换

**转换前 HTML**：

```html
<div class="card">
  <div class="card-header">
    <h2 class="card-title">标题</h2>
  </div>
  <div class="card-body">
    <p class="card-text">内容</p>
    <button class="btn btn-primary">按钮</button>
  </div>
</div>
```

**转换前 SCSS/Less/Stylus**：

```scss
.card {
  border: 1px solid #ccc;
}

.card-header {
  padding: 16px;
}

.card-title {
  font-size: 18px;
}

.card-body {
  padding: 16px;
}

.card-text {
  color: #333;
}

.btn {
  padding: 8px 16px;
}

.btn-primary {
  background: blue;
  color: white;
}
```

**转换后 HTML**：

```html
<div class="card">
  <div class="card__header">
    <h2 class="card__title">标题</h2>
  </div>
  <div class="card__body">
    <p class="card__text">内容</p>
    <button class="btn btn--primary">按钮</button>
  </div>
</div>
```

**转换后 SCSS/Less/Stylus**（BEM 嵌套结构）：

```scss
.card {
  border: 1px solid #ccc;

  &__header {
    padding: 16px;
  }

  &__title {
    font-size: 18px;
  }

  &__body {
    padding: 16px;
  }

  &__text {
    color: #333;
  }
}

.btn {
  padding: 8px 16px;

  &--primary {
    background: blue;
    color: white;
  }
}
```

### 示例 2：带修饰符和嵌套

**转换前**：

```html
<div class="dialog dialog-large">
  <div class="dialog-header">
    <button class="dialog-close">关闭</button>
  </div>
  <div class="dialog-content dialog-content-scrollable">
    <p class="dialog-message dialog-message-error">错误信息</p>
  </div>
</div>
```

**转换后**：

```html
<div class="dialog dialog--large">
  <div class="dialog__header">
    <button class="dialog__close">关闭</button>
  </div>
  <div class="dialog__content dialog__content--scrollable">
    <p class="dialog__message dialog__message--error">错误信息</p>
  </div>
</div>
```

### 示例 3：忽略第三方类名

**配置**：`ignore: ["el-"]`

**转换前**：

```html
<div class="card el-card">
  <button class="btn el-button el-button-primary">提交</button>
</div>
```

**转换后**：

```html
<div class="card el-card">
  <button class="btn el-button el-button--primary">提交</button>
</div>
```

**说明**：`el-card`、`el-button` 因匹配 `el-*` 忽略规则而被保留；`card` 和 `btn` 被转换为 BEM 格式。第三方 UI 库类名整体保留，不做部分转换。

### 示例 4：CSS 属性排序

**转换前 SCSS/Less/Stylus**（属性顺序混乱）：

```scss
.card {
  color: #333;
  position: relative;
  background: #fff;
  padding: 16px;
  border: 1px solid #ccc;
  display: flex;
  font-size: 14px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  border-radius: 8px;
}

.card__header {
  font-weight: bold;
  display: flex;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}

.card__body {
  color: #666;
  padding: 16px;
  flex: 1;
  line-height: 1.6;
  overflow-y: auto;
}
```

**转换后 SCSS/Less/Stylus**（按定位/显示/盒模型 → 排版/背景/边框/视觉/动效顺序排列，逻辑层间空行分隔）：

```scss
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 16px;

  color: #333;
  font-size: 14px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;

  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}

.card__body {
  flex: 1;
  padding: 16px;
  overflow-y: auto;

  color: #666;
  line-height: 1.6;
}
```

### 示例 5：BEM 嵌套结构重组

**转换前 SCSS/Less/Stylus**（扁平分散的 BEM 规则）：

```scss
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 16px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card--large {
  width: 500px;
  padding: 24px;
}

.card:hover {
  border-color: #1890ff;
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}

.card__header--compact {
  padding: 8px 12px;
  font-size: 14px;
}

.card__title {
  font-size: 18px;
  color: #333;
}

.card__body {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  color: #666;
  line-height: 1.6;
}

.card__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #eee;
}
```

**转换后 SCSS/Less/Stylus**（重组为 BEM 嵌套结构，属性已分层）：

```scss
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 16px;

  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  // Block 级 Modifier
  &--large {
    width: 500px;
    padding: 24px;
  }

  // Block 级伪类
  &:hover {
    border-color: #1890ff;
  }

  // Element: header
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;

    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #eee;

    // Element 级 Modifier
    &--compact {
      padding: 8px 12px;
      font-size: 14px;
    }
  }

  // Element: title
  &__title {
    font-size: 18px;
    color: #333;
  }

  // Element: body
  &__body {
    flex: 1;
    padding: 16px;
    overflow-y: auto;

    color: #666;
    line-height: 1.6;
  }

  // Element: footer
  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px 16px;

    border-top: 1px solid #eee;
  }
}
```

### 示例 6：SCSS 按逻辑域拆分（单文件内拆分）

**转换前 SCSS/Less/Stylus**（所有规则混合在一起）：

```scss
// 变量
$primary-color: #1890ff;
$border-radius: 4px;

.page-wrapper {
  display: flex;
  min-height: 100vh;
}

.page-sidebar {
  width: 240px;
  background: #f5f5f5;
}

.search-bar {
  display: flex;
  padding: 12px 16px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: $border-radius;
}

.search-bar__input {
  flex: 1;
  padding: 8px 12px;
  border: none;
  font-size: 14px;
}

.search-bar__btn {
  padding: 8px 16px;
  background: $primary-color;
  color: #fff;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
}

.form-container {
  padding: 24px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: $border-radius;
}

.form-container__field {
  margin-bottom: 16px;
}

.form-container__label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.form-container__input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: $border-radius;
  font-size: 14px;
}

.form-container__input--error {
  border-color: #ff4d4f;
}

.form-container__error-msg {
  margin-top: 4px;
  font-size: 12px;
  color: #ff4d4f;
}

.result-table {
  width: 100%;
  border-collapse: collapse;
}

.result-table__header {
  background: #fafafa;
  font-weight: 600;
}

.result-table__cell {
  padding: 12px 16px;
  border-bottom: 1px solid #e8e8e8;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.45);
}

.dialog {
  position: relative;
  width: 520px;
  margin: 100px auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
}
```

**转换后 SCSS/Less/Stylus**（BEM 嵌套 + 逻辑域拆分，注释分隔块组织）：

```scss
// 变量
$primary-color: #1890ff;
$border-radius: 4px;

// ─── 布局（Layout）─────────────────────

.page-wrapper {
  display: flex;
  min-height: 100vh;

  &__sidebar {
    width: 240px;
    background: #f5f5f5;
  }
}

// ─── 检索（Search）─────────────────────

.search-bar {
  display: flex;
  padding: 12px 16px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: $border-radius;

  &__input {
    flex: 1;
    padding: 8px 12px;
    border: none;
    font-size: 14px;
  }

  &__btn {
    padding: 8px 16px;
    background: $primary-color;
    color: #fff;
    border: none;
    border-radius: $border-radius;
    cursor: pointer;
  }
}

// ─── 表单（Form）─────────────────────

.form-container {
  padding: 24px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: $border-radius;

  &__field {
    margin-bottom: 16px;
  }

  &__label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  &__input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d9d9d9;
    border-radius: $border-radius;
    font-size: 14px;

    &--error {
      border-color: #ff4d4f;
    }
  }

  &__error-msg {
    margin-top: 4px;
    font-size: 12px;
    color: #ff4d4f;
  }
}

// ─── 表格（Table）─────────────────────

.result-table {
  width: 100%;
  border-collapse: collapse;

  &__header {
    background: #fafafa;
    font-weight: 600;
  }

  &__cell {
    padding: 12px 16px;
    border-bottom: 1px solid #e8e8e8;
  }
}

// ─── 弹窗（Modal）─────────────────────

.dialog-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.45);
}

.dialog {
  position: relative;
  width: 520px;
  margin: 100px auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
}
```

### 示例 7：JSX + SCSS 同步转换

**转换前 JSX**：

```jsx
function Dialog({ size, type }) {
  return (
    <div className={`dialog dialog-${size}`}>
      <div className="dialog-header">
        <h3 className="dialog-title dialog-title-primary">标题</h3>
        <button className="dialog-close">×</button>
      </div>
      <div className="dialog-body">
        <p className="dialog-message dialog-message-error">错误内容</p>
      </div>
    </div>
  )
}
```

**转换前 SCSS/Less/Stylus**：

```scss
.dialog {
  border: 1px solid #ddd;

  &.dialog-large {
    width: 800px;
  }

  .dialog-header {
    padding: 16px;
  }
  .dialog-title {
    font-size: 18px;
  }
  .dialog-title-primary {
    color: blue;
  }
  .dialog-close {
    float: right;
  }
  .dialog-body {
    padding: 16px;
  }
  .dialog-message {
    color: #333;
  }
  .dialog-message-error {
    color: red;
  }
}
```

**转换后 JSX**：

```jsx
function Dialog({ size, type }) {
  return (
    <div className={`dialog dialog--${size}`}>
      <div className="dialog__header">
        <h3 className="dialog__title dialog__title--primary">标题</h3>
        <button className="dialog__close">×</button>
      </div>
      <div className="dialog__body">
        <p className="dialog__message dialog__message--error">错误内容</p>
      </div>
    </div>
  )
}
```

> **注意**：`dialog--${size}` 为动态拼接类名，在转换报告中标记为需人工确认。

**转换后 SCSS/Less/Stylus**（BEM 嵌套结构，属性已分层）：

```scss
.dialog {
  border: 1px solid #ddd;

  // Block 级 Modifier
  &--large {
    width: 800px;
  }

  // Element: header
  &__header {
    padding: 16px;
  }

  // Element: title
  &__title {
    font-size: 18px;

    // Element 级 Modifier
    &--primary {
      color: blue;
    }
  }

  // Element: close
  &__close {
    float: right;
  }

  // Element: body
  &__body {
    padding: 16px;
  }

  // Element: message
  &__message {
    color: #333;

    // Element 级 Modifier
    &--error {
      color: red;
    }
  }
}
```

## 限制

### BEM 命名转换

- 仅转换 `class`/`className` 属性值和 CSS 选择器中的类名，不转换 JavaScript/TypeScript 中的逻辑类名字符串（如变量名、对象键）
- 不自动推断组件间继承关系，每个文件独立分析块名
- 动态拼接的类名字符串在报告中标记需人工确认，不自动转换
- 不处理非前端文件中的命名（如后端模板、配置文件、脚本语言类名）
- Utility-first 框架（Tailwind CSS 等）的类名应加入忽略列表，不做转换
- **CSS Modules**：仅处理模板中字符串形式的类名引用（如 `class="card"` 或 `className="card"`），不处理对象属性形式的引用（如 `styles.card`）。CSS Modules 的类名由构建工具自动处理，手动转换会破坏模块隔离。若项目使用对象引用方式，需手动将 `styles.xxx` 还原为字符串类名后再转换
- **CSS-in-JS（styled-components / Emotion）**：不处理 CSS-in-JS 方案中的样式定义，因为这类方案不使用 `class`/`className` 属性，BEM 命名规范不适用
- **Vue SFC `<style scoped>`**：转换类名后 scoped 属性（`data-v-xxx`）由 Vue 编译器自动处理，无需额外干预。scoped 样式会自动添加 `data-v-xxx` 属性选择器，BEM 转换不影响 scoped 行为，但转换后应验证样式是否仍然正确应用

### BEM 嵌套重组

- Sass/Less/Stylus 中的嵌套选择器展开后按 BEM 规范重组，可能改变嵌套层级
- 纯 `.css` 文件不执行嵌套重组（除非用户明确要求且项目支持 CSS 原生嵌套）

### 逻辑域拆分

- 不修改构建配置或导入路径，仅处理类名和选择器文本

## 相关资源

- BEM 官方规范：<http://getbem.com/naming/>
- csscomb zen 预设：<https://github.com/csscomb/csscomb.js/blob/master/config/zen.json>
