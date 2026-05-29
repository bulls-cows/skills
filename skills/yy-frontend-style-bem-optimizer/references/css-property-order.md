# CSS 属性分层排列规则

## 分层原则

每条 CSS 规则中的声明按语义重新排列，分为**布局层**和**功能层**。布局层属性影响元素在页面中的位置、空间和流式关系，排在前面；功能层属性影响元素的视觉表现、交互反馈和内容渲染，排在后面。

> ⚠️ 标记表示该属性在当前主流浏览器（Last 2 versions of Chrome/Firefox/Safari/Edge）中存在兼容性限制，详见文末「兼容性警告」章节。若项目有 `.browserslistrc` 配置，以项目实际兼容性要求为准。

## 布局层属性（按以下顺序排列）

1. **定位**：`position`、`top`、`right`、`bottom`、`left`、`z-index`
2. **显示模式**：`display`、`flex`、`flex-direction`、`flex-wrap`、`flex-flow`、`justify-content`、`align-items`、`align-content`、`align-self`、`flex-grow`、`flex-shrink`、`flex-basis`、`flex`、`grid`、`grid-template-columns`、`grid-template-rows`、`grid-template-areas`、`grid-template`、`grid-auto-columns`、`grid-auto-rows`、`grid-auto-flow`、`grid-column`、`grid-row`、`grid-area`、`grid-column-start`、`grid-column-end`、`grid-row-start`、`grid-row-end`、`gap`、`row-gap`、`column-gap`、`place-items`、`place-content`、`place-self`
3. **盒模型**：`box-sizing`、`width`、`min-width`、`max-width`、`height`、`min-height`、`max-height`、`margin`、`margin-top`、`margin-right`、`margin-bottom`、`margin-left`、`padding`、`padding-top`、`padding-right`、`padding-bottom`、`padding-left`
4. **溢出与裁切**：`overflow`、`overflow-x`、`overflow-y`、`clip`、`clip-path`
5. **浮动**：`float`、`clear`

## 功能层属性（按以下顺序排列）

1. **排版**：`font`、`font-family`、`font-size`、`font-weight`、`font-style`、`font-variant`、`line-height`、`letter-spacing`、`word-spacing`、`word-break`、`word-wrap`、`overflow-wrap`、`white-space`、`text-align`、`text-decoration`、`text-transform`、`text-indent`、`text-overflow`、`text-shadow`、`vertical-align`、`color`、`direction`、`writing-mode`
2. **背景**：`background`、`background-color`、`background-image`、`background-repeat`、`background-position`、`background-size`、`background-attachment`、`background-origin`、`background-clip`、`background-blend-mode`
3. **边框**：`border`、`border-width`、`border-style`、`border-color`、`border-radius`、`border-top`、`border-right`、`border-bottom`、`border-left`、`outline`、`outline-width`、`outline-style`、`outline-color`、`outline-offset`
4. **视觉效果**：`opacity`、`box-shadow`、`filter`、`backdrop-filter`、`mix-blend-mode`、`visibility`
5. **变换与过渡**：`transform`、`transform-origin`、`transition`、`transition-property`、`transition-duration`、`transition-timing-function`、`transition-delay`、`animation`、`animation-name`、`animation-duration`、`animation-timing-function`、`animation-delay`、`animation-iteration-count`、`animation-direction`、`animation-fill-mode`、`animation-play-state`
6. **交互**：`cursor`、`pointer-events`、`user-select`、`resize`
7. **其他**：`content`、`counter-*`、`list-style`、`table-layout`、`border-collapse`

## 执行规则

- 每条 CSS 规则内的属性按上述分层顺序重新排列
- 布局层属性整体排在功能层属性之前
- 同一层内按上述子类顺序排列
- 不在上述列表中的属性保持原位置，排在功能层末尾
- 若某条规则仅包含单层属性（如只有布局属性），不强制添加分隔
- 每条规则内布局层与功能层之间使用空行分隔（仅当两层属性同时存在时）
- 遇到 CSS 简写属性（如 `margin: 0`）时，视为对应的逻辑分类，不拆分为子属性
- SCSS/Less/Stylus 中的变量、mixin 调用等非标准声明，视为「其他」类排在功能层末尾
- 兼容性检查与属性分层同步执行，详见「兼容性警告」章节

## 兼容性警告

### 默认基准：现代浏览器

默认兼容性基准为最近 2 个主要版本的 Chrome、Firefox、Safari、Edge。在此基准下，以下属性仍存在兼容性限制：

| 属性                           | 严重程度 | 问题描述                                                                          |
| ------------------------------ | -------- | --------------------------------------------------------------------------------- |
| `backdrop-filter`              | 🟡       | Firefox 103+ 支持，Safari 需 `-webkit-` 前缀（较旧版本），旧版 Firefox 完全不支持 |
| `clip-path`（复杂形状）        | 🟡       | Safari 对 `path()` 和复杂 `polygon()` 的支持晚于 Chrome/Firefox                   |
| `container` / `container-type` | 🟡       | Container Queries 在 Safari 16+ 支持，更旧版本不支持                              |
| `color-mix()`                  | 🟡       | CSS 颜色函数，Safari 16.2+ 支持，部分旧版浏览器不支持                             |
| `:has()` 选择器                | 🟡       | Safari 15.4+ 支持，Firefox 121+ 支持，更旧版本不支持                              |
| `@layer`                       | 🟡       | CSS Cascade Layers，Safari 15.4+ 支持，更旧版本不支持                             |
| `anchor-positioning`           | 🔴       | CSS Anchor Positioning 仍为实验性特性，仅 Chrome 125+ 部分支持                    |
| `view-transitions`             | 🔴       | View Transitions API 仅 Chrome 111+ 支持，Firefox/Safari 尚不支持                 |

### 兼容性检查流程

1. 检查项目是否有 `.browserslistrc` 或 `package.json` 中的 `browserslist` 配置
2. 若有，以项目配置为准进行兼容性判断
3. 若无，使用上述默认基准
4. 扫描当前处理的每条 CSS 规则，比对待检查属性列表
5. 发现匹配时，将该属性、所在规则、严重程度记入兼容性警告清单
6. 此清单将作为报告的固定输出项

### 旧浏览器兼容性（仅供参考）

若项目需要支持较旧的浏览器（如 IE11 或 2020 年前的 Chrome/Safari 版本），以下属性在旧环境中存在严重兼容性问题。执行属性分层时，若检测到项目 `.browserslistrc` 包含旧浏览器目标，应额外输出这些警告：

| 属性                                               | 严重程度 | 旧环境问题                                             |
| -------------------------------------------------- | -------- | ------------------------------------------------------ |
| `display: grid` 及所有 `grid-*` 属性               | 🔴       | IE11 不支持（有 `-ms-grid` 旧实现但语法不兼容）        |
| `--custom-property`（CSS 自定义属性）              | 🔴       | IE11 完全不支持                                        |
| `position: sticky`                                 | 🔴       | IE11 不支持                                            |
| `object-fit`                                       | 🔴       | IE11 不支持                                            |
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
- **gap（Flexbox）** → 子元素 `margin` 方案
- **filter / backdrop-filter** → 渐进增强，提供 fallback 背景色
- **clip-path** → 渐进增强，使用 `overflow: hidden` 或 PNG 遮罩降级
