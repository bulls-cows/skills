---
name: yy-frontend-style-bem-optimizer
description: >
  前端 BEM 命名规范转换与 CSS 样式优化器。将 HTML/JSX/TSX/Vue 代码中的 class/className 属性
  与对应的 CSS/Sass/Less/Stylus 选择器同步转换为 BEM 命名格式，将 CSS 属性按 csscomb zen 预设顺序排列，
  将扁平 CSS 规则重组为 BEM 嵌套结构，并将样式规则按逻辑域拆分为独立集合。
  即使用户口语化表达——"这个 scss 太乱了帮我整理下"、"把 class 名改成规范格式"、
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

1. **BEM 命名转换** → 必须最先执行，后续步骤依赖转换后的 BEM 类名
2. **CSS 属性排序** → 应在嵌套重组之前执行。先排序可以确保所有声明的顺序统一，嵌套重组只移动规则位置、不改变每个规则块内的声明顺序，从而避免在嵌套后的多层 `&` 结构中逐层重排
3. **BEM 嵌套重组** → 依赖命名转换完成后的 BEM 类名，用户明确要求时才执行
4. **逻辑域拆分** → 应在嵌套重组之后执行，因为嵌套后的完整 Block 才是拆分的最小单元；用户明确要求时才执行

### 步骤 2. 确定转换模式

- **代码片段模式**：用户直接粘贴 HTML/CSS 代码片段
- **单文件模式**：用户指定单个文件路径
- **批量目录模式**：用户指定目录路径，要求批量转换

**决策分支**：

- 用户未明确模式但有代码片段内容 → 按代码片段模式处理
- 用户指定文件路径 → 单文件模式
- 用户指定目录路径 → 批量目录模式
- 用户未明确范围 → 使用 git 命令获取变更文件，合并去重后按支持格式过滤：

  ```bash
  git diff --name-only HEAD
  git diff --cached --name-only
  ```

  **默认处理的文件类型**：

  | 类别     | 扩展名                                                |
  | -------- | ----------------------------------------------------- |
  | 标记文件 | `.html`、`.jsx`、`.tsx`、`.vue`                       |
  | 样式文件 | `.css`、`.scss`、`.sass`、`.less`、`.styl`、`.stylus` |

  **异常降级**：
  - **项目无 git**：提示用户手动指定文件范围，或使用当前目录下所有匹配文件。
  - **git diff 失败**：提示用户手动指定文件范围。
  - **无匹配文件**：回复"当前没有需要处理的变更文件。"并终止。

- 代码片段模式下用户仅提供了标记代码（HTML/JSX/Vue）而未提供样式代码（CSS/SCSS 等）→ 询问用户是否同时提供样式内容，以确保 BEM 命名转换在标记和样式之间保持一致。若用户明确表示只需转换标记代码，则跳过样式文件处理。

### 步骤 3. 读取和解析源内容

根据转换模式读取内容。

**解析规则**：

- 从 HTML/Vue 模板中提取所有 `class` 属性的值，分割为单个类名
- 从 JSX/TSX 中提取所有 `className` 属性的值，分割为单个类名
- 从 CSS/SCSS/Less/Stylus 中提取所有选择器中的类名
- 建立标记文件 class/className 与 CSS 选择器的映射关系
- 识别已符合 BEM 规范的类名（如 `block__element--modifier`），标记为无需转换

### 步骤 4. 确定配置

详细配置项、配置文件示例、Tailwind/Windi CSS/UnoCSS 忽略配置见 `references/config-reference.md`。该文件包含 `.bemrc` 完整示例和 utility-first 框架忽略配置模板。

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

详细排序规则、兼容性检查和浏览器前缀处理见 `references/css-property-order.md`。

### 步骤 7. 执行 BEM 嵌套重组

> 仅在用户明确要求"嵌套"或"用 & 组织"时执行。嵌套是 SCSS/Less/Stylus 的语法糖，不是 BEM 规范的一部分。纯 `.css` 文件不执行（除非用户明确要求且项目支持 CSS 原生嵌套）。

详细嵌套层级结构、执行规则、约束和特异性验证见 `references/bem-nesting.md`。

### 步骤 8. 执行逻辑域拆分

> 仅在用户明确要求"拆分文件"或"按功能分组"时执行。且仅适用于 SCSS/Less/Stylus 文件。

详细拆分触发条件、逻辑域识别方式、分类表和拆分执行规则见 `references/domain-splitting.md`。

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
映射表按文件分组，每个文件下按 Block 聚合展示。同一 Block 的 Element 和 Modifier 映射缩进排列在其 Block 行下方。

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

| 示例   | 对应步骤       | 展示内容                                                 |
| ------ | -------------- | -------------------------------------------------------- |
| 示例 1 | 步骤 5 + 7     | 基础 BEM 命名转换 + 嵌套重组                             |
| 示例 2 | 步骤 5 + 7     | 带修饰符的 BEM 转换 + 嵌套                               |
| 示例 3 | 步骤 4 + 5     | 忽略第三方类名                                           |
| 示例 4 | 步骤 6         | CSS 属性排序                                             |
| 示例 5 | 步骤 5 + 6 + 7 | BEM 转换 + 属性排序 + 嵌套重组（全流程）                 |
| 示例 6 | 步骤 5 + 7 + 8 | 逻辑域拆分（单文件内注释分隔）                           |
| 示例 7 | 步骤 5 + 7     | JSX + SCSS 同步转换 + 动态类名处理                       |
| 示例 8 | 步骤 5 + 6     | 纯 CSS 文件：BEM 命名转换 + 属性排序，保持扁平结构不嵌套 |

完整示例代码见 `references/examples.md`。

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
