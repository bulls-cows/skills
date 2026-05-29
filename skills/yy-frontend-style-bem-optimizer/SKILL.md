---
name: yy-frontend-style-bem-optimizer
description: >
  前端 BEM 命名规范转换与 CSS 样式优化器。将 HTML/JSX/TSX/Vue 代码中的
  class/className 属性与对应的 CSS/Sass/Less/Stylus 选择器同步转换为 BEM 命名格式，
  将 CSS 属性按布局层和功能层进行合理分层，将扁平的 CSS 规则重组为 BEM 嵌套结构，
  并将 SCSS/Less/Stylus 中的 CSS 规则按逻辑域拆分为独立集合。
  当用户提到 BEM、类名转换、样式命名规范、CSS 属性排序、样式文件拆分、嵌套重组时触发。
  即使用户只是说"帮我整理一下这个组件的样式"、"这个 scss 文件太乱了想整理下"、
  "把 class 名改成规范格式"、"CSS 属性顺序太乱帮我排一下"、"这个样式文件拆开吧"，
  也应触发此技能。
---

# yy-frontend-style-bem-optimizer

## 描述

将 HTML/JSX/TSX/Vue 代码中的 `class`/`className` 属性与对应的 CSS/SCSS/Less/Stylus 选择器同步转换为符合 BEM（Block Element Modifier）规范的格式，对 CSS 属性按布局层和功能层进行合理分层排列，将扁平的 CSS 规则重组为 BEM 嵌套结构，并将 SCSS/Less/Stylus 中的 CSS 规则按逻辑域拆分为独立的样式集合。

## 支持格式

- **标记文件**：`.html`、`.jsx`、`.tsx`、`.vue`
- **样式文件**：`.css`、`.scss`、`.sass`、`.less`、`.styl`、`.stylus`

## 核心能力

1. **BEM 命名转换**：同时处理标记文件的 `class`/`className` 和样式文件的选择器，保持映射一致
2. **CSS 属性分层**：将 CSS 规则中的属性按布局层和功能层合理分组排列
3. **BEM 嵌套重组**：将扁平分散的 BEM 规则重组为 SCSS/Less/Stylus 的 `&` 嵌套结构
4. **逻辑域拆分**：将 SCSS/Less/Stylus 中的 CSS 规则按业务逻辑域拆分为独立集合

## 使用场景

- 用户要求将类名转换为 BEM 命名规范、重构旧项目样式命名、统一团队 CSS 命名规范
- 用户要求整理 CSS 属性的书写顺序，按布局和功能分层
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
- 用户要求使用 CSS Modules、CSS-in-JS（styled-components/emotion）等方案重写样式（这些方案不需要 BEM 类名转换）
- 用户要求使用 Tailwind CSS 等 utility-first 框架重写样式（应直接使用 utility 类，无需 BEM 转换）
- 用户只是要求删除或合并 CSS 规则（不涉及命名和结构重组）

## 指令

### 步骤 1. 确定能力范围

根据用户意图判断需要执行哪些能力。用户可能只需要其中一项或多项组合：

| 用户意图                             | 需要的能力   |
| ------------------------------------ | ------------ |
| 转换类名为 BEM 规范、统一命名        | BEM 命名转换 |
| 整理 CSS 属性顺序、分层排列          | CSS 属性分层 |
| 重组为嵌套结构、用 `&__element` 组织 | BEM 嵌套重组 |
| 拆分样式文件、按功能分组             | 逻辑域拆分   |
| 整体整理样式（未指定具体项）         | 全部四项     |

**决策分支**：

- 用户明确指定某项能力 → 只执行该项
- 用户要求"整理样式"、"优化样式"等宽泛表述 → 执行全部四项
- 用户要求 BEM 命名转换 → 必须同时执行 BEM 嵌套重组（嵌套依赖命名转换完成后的结果）
- 用户要求 CSS 属性分层但不涉及命名 → 只执行属性分层

**步骤间执行顺序**：

当需要执行多项能力时，按以下顺序执行，每一步依赖前一步的结果：

1. **BEM 命名转换**（步骤 5）→ 必须最先执行，后续步骤依赖转换后的 BEM 类名
2. **CSS 属性分层**（步骤 6）→ 应在嵌套重组之前执行，因为嵌套后属性更难重排
3. **BEM 嵌套重组**（步骤 7）→ 依赖命名转换完成后的 BEM 类名，在属性分层之后执行
4. **逻辑域拆分**（步骤 8）→ 应在嵌套重组之后执行，因为嵌套后的完整 Block 才是拆分的最小单元

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

详细配置项说明和 `.bemrc` 示例见 `references/config-reference.md`。

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

### 步骤 6. 执行 CSS 属性分层

> 仅在能力范围包含"CSS 属性分层"时执行。

对每个 CSS 规则中的声明按语义重新排列，分为**布局层**（定位、显示模式、盒模型、溢出、浮动）和**功能层**（排版、背景、边框、视觉效果、变换过渡、交互、其他）。布局层排在前面，功能层排在后面，两层之间用空行分隔。

执行属性分层时，必须读取 `references/css-property-order.md` 获取完整属性排序规则。该文件的兼容性警告基于现代浏览器基线（最近 2 个主要版本的 Chrome/Firefox/Safari/Edge），若项目有 `.browserslistrc` 配置则以项目配置为准。

**兼容性检查子步骤**（与属性分层同步执行）：

1. 检查项目是否有 `.browserslistrc` 或 `package.json` 中的 `browserslist` 配置
2. 根据项目兼容性目标，读取 `references/css-property-order.md` 对应的兼容性警告章节（现代浏览器或旧浏览器）
3. 扫描当前处理的每条 CSS 规则，比对兼容性风险属性列表
4. 发现匹配时，将该属性、所在规则、严重程度和降级建议记入兼容性警告清单
5. 此清单将作为报告的固定输出项（见步骤 11）

这一步不能跳过——兼容性警告是属性分层的核心附加价值，不输出警告等于分层只做了一半。

### 步骤 7. 执行 BEM 嵌套重组

> 仅在能力范围包含"BEM 嵌套重组"时执行。且仅适用于 SCSS/Less/Stylus 文件，纯 `.css` 文件不执行（除非用户明确要求且项目支持 CSS 原生嵌套）。

将扁平分散的 BEM 规则（属于同一个 Block 的 Element 和 Modifier）重组为 `&` 嵌套结构，使样式的层级关系与组件 DOM 结构对应。

嵌套规则要点：

- Block 自身属性排在最前面，其后按「Modifier → 伪类/伪元素 → 媒体查询 → Element」顺序排列
- 嵌套深度不超过 4 层
- 嵌套后的选择器特异性必须与嵌套前完全一致

详细嵌套规则和层级结构模板见 `references/bem-nesting.md`。

### 步骤 8. 执行逻辑域拆分

> 仅在能力范围包含"逻辑域拆分"时执行。且仅适用于 SCSS/Less/Stylus 文件。

将 CSS 规则按业务逻辑域（如布局、搜索、表单、表格、弹窗等）分组整理，用注释分隔块组织或拆分为独立文件。

拆分要点：

- 同一个 Block 及其 Element/Modifier 规则必须归入同一个逻辑域，不可拆散
- 默认使用单文件内注释分隔块组织；用户指定时拆分为多文件
- 常见域分类：布局、检索/搜索、表单、表格/列表、弹窗/反馈、卡片/内容、按钮/操作

详细的域分类表和拆分规则见 `references/domain-splitting.md`。

### 步骤 9. 生成预览和报告

**预览模式**（默认启用）：

- 展示转换前后的代码对比
- 每个文件显示：原类名 → 新类名 的映射列表
- 高亮被忽略的类名，标记无法自动推断的类名

**转换报告内容**：

- 转换文件总数和类名总数
- 每个文件修改的类名列表（原始 → 转换后）
- 被忽略的类名列表及原因
- 无法自动推断的类名列表（建议人工审查）
- 动态拼接类名列表（需人工确认）

### 步骤 10. 应用转换

**用户确认后应用**：

- 代码片段模式：输出转换后的代码内容
- 单文件模式：直接覆盖原文件或保存到新文件（根据用户选择）
- 批量目录模式：批量覆盖原文件或输出到新目录

**安全约束**：

- 默认启用预览模式，必须经用户确认后才写入文件
- 批量转换前建议用户先备份或确认使用版本控制
- 批量目录模式下，应先在单个文件上试运行，用户确认效果后再批量处理
- 批量转换前应输出受影响文件清单，由用户确认范围
- 不修改除 class 名以外的任何代码逻辑和样式属性
- 默认不覆盖原文件，优先保存到新文件或新目录；仅当用户明确要求覆盖时才覆盖原文件

### 步骤 11. 输出结果

输出格式：

1. **转换摘要**：文件数、类名转换数、CSS 属性重排数、嵌套重组 Block 数、规则拆分数、忽略数
2. **类名映射表**：原始类名 → BEM 类名的完整对应关系
3. **CSS 分层报告**：列出被重新排列属性顺序的规则及变更明细
4. **嵌套重组报告**：列出被重组的 Block 名称和嵌套前后变化
5. **逻辑域拆分报告**：列出每个域包含的 Block 名称和规则数量
6. **兼容性警告**：列出所有发现的兼容性风险属性，包含所在规则、严重程度（🔴/🟡）、影响范围和降级建议。若未发现兼容性风险，输出"未发现兼容性问题"
7. **转换后代码**（代码片段模式）或**文件路径**（文件/目录模式）
8. **注意事项**：无法自动推断的类名、动态拼接类名、建议人工审查的部分

**转换摘要格式**：

```
转换摘要
├─ 文件数：N
├─ 类名转换：N（其中自动推断 N，需人工确认 N）
├─ CSS 属性重排：N 条规则
├─ BEM 嵌套重组：N 个 Block
├─ 逻辑域拆分：N 个域
└─ 忽略类名：N（第三方 N，utility-first N，其他 N）
```

**类名映射表格式**：

```
类名映射
├─ header-title       → header__title        (Element)
├─ header-title-large → header__title--large  (Element + Modifier)
├─ btn-primary        → btn--primary          (Modifier)
├─ card-body-padding  → ⚠️ 需人工确认        (歧义：padding 可能是 Element 或 Modifier)
└─ el-button          → (已忽略：匹配 el- 前缀)
```

**转换摘要格式模板**：

```
转换摘要
─────────────────────
处理文件：3 个
类名转换：15 个
属性重排：8 条规则
嵌套重组：3 个 Block
域拆分  ：2 个域
忽略类名：6 个
兼容性警告：1 个（🟡）
```

**类名映射表格式模板**：

```
类名映射
─────────────────────
header-title       → header__title
header-title-large → header__title--large
btn-primary        → btn--primary
(已忽略) el-button → el-button (第三方 UI 库)
(待确认) btn-${var}→ 需人工确认 (动态拼接)
```

## 参考文件

需要时按需加载，不要一次性全部读取：

| 文件                               | 何时读取                               |
| ---------------------------------- | -------------------------------------- |
| `references/css-property-order.md` | 执行 CSS 属性分层时                    |
| `references/bem-nesting.md`        | 执行 BEM 嵌套重组时                    |
| `references/domain-splitting.md`   | 执行逻辑域拆分时                       |
| `references/examples.md`           | 需要参考完整转换示例时                 |
| `references/config-reference.md`   | 需要查看配置选项详情或 `.bemrc` 格式时 |

## 限制

- 仅转换 `class`/`className` 属性值和 CSS 选择器中的类名，不转换 JavaScript/TypeScript 中的逻辑类名字符串（如变量名、对象键）
- 不自动推断组件间继承关系，每个文件独立分析块名
- 动态拼接的类名字符串在报告中标记需人工确认，不自动转换
- 不修改构建配置或导入路径，仅处理类名和选择器文本
- Sass/Less/Stylus 中的嵌套选择器展开后按 BEM 规范重组，可能改变嵌套层级
- 不处理非前端文件中的命名（如后端模板、配置文件、脚本语言类名）
- Utility-first 框架（Tailwind CSS 等）的类名应加入忽略列表，不做转换
- **CSS Modules**：仅处理模板中字符串形式的类名引用（如 `class="card"` 或 `className="card"`），不处理对象属性形式的引用（如 `styles.card`）。若项目使用 CSS Modules 的对象引用方式，需手动将 `styles.xxx` 还原为字符串类名后再转换
- **CSS-in-JS（styled-components / Emotion）**：不处理 CSS-in-JS 方案中的样式定义，因为这类方案通常不使用 `class` 属性
- **Vue SFC `<style scoped>`**：转换类名后 scoped 属性（`data-v-xxx`）由 Vue 编译器自动处理，无需额外干预，但需确认转换后的类名不与 scoped 选择器冲突
- 不支持 CSS Modules（如 `styles.cardHeader`）的类名引用转换——CSS Modules 的类名由构建工具自动处理，手动转换会破坏模块隔离
- 不支持 CSS-in-JS（styled-components/emotion）方案——这些方案不使用 `class`/`className` 属性，BEM 命名规范不适用
- Vue SFC `<style scoped>` 下的 BEM 转换需注意：scoped 样式会自动添加 `data-v-xxx` 属性选择器，BEM 转换不影响 scoped 行为，但转换后应验证样式是否仍然正确应用

## 相关资源

- BEM 官方规范：<http://getbem.com/naming/>
