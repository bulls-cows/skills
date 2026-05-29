# CSS 属性排序规则

按 csscomb zen 预设顺序重新排列每个 CSS 规则中的声明。zen 预设按属性对布局的影响力由大到小排列（定位 → 盒模型 → 排版 → 视觉 → 动效），是可验证的社区标准——排序结果可用 `csscomb` CLI 工具直接校验。

## 兼容性检查

与属性排序同步执行。兼容性警告是属性排序的核心附加价值，不输出警告等于排序只做了一半。

1. 检查项目是否有 `.browserslistrc` 或 `package.json` 中的 `browserslist` 配置
2. 根据项目兼容性目标，读取下文兼容性警告章节
3. 扫描当前处理的每条 CSS 规则，比对兼容性风险属性列表
4. 发现匹配时，将该属性、所在规则、严重程度和降级建议记入兼容性警告清单

## 排序方法论

CSS 属性按 [csscomb](https://github.com/csscomb/csscomb.js) zen 预设顺序排列。该预设的核心哲学是：按属性对布局的影响力由大到小排列（定位 → 盒模型 → 排版 → 视觉 → 动效）。本规则在 csscomb zen 预设基础上：

- 补充了 zen 预设未覆盖的现代 CSS 属性（CSS Grid、Container Queries、逻辑属性等）
- 移除了已过时的 IE 前缀 hack（`filter:progid:DXImageTransform.*` 等）
- 排序结果可用 `csscomb` CLI 工具验证

## 属性排列顺序（csscomb zen 预设 + 现代属性补充）

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

## 执行规则

- 每条 CSS 规则内的属性按上述顺序重新排列，各逻辑层之间保留一个空行分隔（定位/显示/盒模型 → 空行 → 排版/背景/边框/视觉/动效/交互/其他）
- 不在上述列表中的属性排在各逻辑层末尾
- 遇到 CSS 简写属性（如 `margin: 0`）时，视为对应的分类，不拆分为子属性
- SCSS/Less/Stylus 中的变量、mixin 调用等非标准声明，排在末尾

## 浏览器前缀排序规则

当 CSS 规则中同时存在带前缀和不带前缀的同一属性时，按以下规则排列：

- 带前缀的属性紧跟对应的标准属性之前，按 `-webkit-` → `-moz-` → `-ms-` → `-o-` → 标准属性 顺序排列
- 示例：`-webkit-transform`、`-moz-transform`、`-ms-transform`、`-o-transform`、`transform`
- 若标准属性不在上述属性列表中（如仍在实验阶段的属性），带前缀的变体与标准属性一起排在功能层末尾
- SCSS/Less/Stylus 中的 mixin 或函数自动处理前缀的情况（如 `@include transform(...)`），不适用此规则

## 兼容性警告

### 默认基准：现代浏览器

默认兼容性基准为最近 2 个主要版本的 Chrome、Firefox、Safari、Edge。在此基准下，以下属性仍存在兼容性限制：

| 属性                    | 严重程度 | 问题描述                                                                          |
| ----------------------- | -------- | --------------------------------------------------------------------------------- |
| `backdrop-filter`       | 🟡       | Firefox 103+ 支持，Safari 需 `-webkit-` 前缀（较旧版本），旧版 Firefox 完全不支持 |
| `clip-path`（复杂形状） | 🟡       | Safari 对 `path()` 和复杂 `polygon()` 的支持晚于 Chrome/Firefox                   |
| `container-type`        | 🟡       | Container Queries 在 Safari 16+ 支持，更旧版本不支持                              |
| `container`             | 🟡       | Container Queries 简写属性，兼容性同 `container-type`                             |
| `aspect-ratio`          | 🟡       | Safari 15+ 支持，旧版不支持，需 `padding-top` hack 降级                           |
| `scroll-snap-type`      | 🟡       | 所有现代浏览器均支持，旧版 Safari 需 `-webkit-` 前缀                              |
| `overscroll-behavior`   | 🟡       | Safari 16+ 支持，Firefox 和 Chrome 已全面支持                                     |
| `color-mix()`           | 🟡       | CSS 颜色函数，Safari 16.2+ 支持，部分旧版浏览器不支持                             |
| `:has()` 选择器         | 🟡       | Safari 15.4+ 支持，Firefox 121+ 支持，更旧版本不支持                              |
| `@layer`                | 🟡       | CSS Cascade Layers，Safari 15.4+ 支持，更旧版本不支持                             |
| `anchor-positioning`    | 🔴       | CSS Anchor Positioning 仍为实验性特性，仅 Chrome 125+ 部分支持                    |
| `view-transitions`      | 🔴       | View Transitions API 仅 Chrome 111+ 支持，Firefox/Safari 尚不支持                 |

### 兼容性检查流程

1. 检查项目是否有 `.browserslistrc` 或 `package.json` 中的 `browserslist` 配置
2. 若有，以项目配置为准进行兼容性判断
3. 若无，使用上述默认基准
4. 扫描当前处理的每条 CSS 规则，比对待检查属性列表
5. 发现匹配时，将该属性、所在规则、严重程度记入兼容性警告清单
6. 此清单将作为报告的固定输出项

### 旧浏览器兼容性（仅供参考）

若项目需要支持较旧的浏览器（如 IE11 或 2020 年前的 Chrome/Safari 版本），以下属性在旧环境中存在严重兼容性问题。执行属性排序时，若检测到项目 `.browserslistrc` 包含旧浏览器目标，应额外输出这些警告：

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
