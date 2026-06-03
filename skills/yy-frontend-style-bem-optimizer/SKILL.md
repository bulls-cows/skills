---
name: yy-frontend-style-bem-optimizer
description: >
  前端 BEM 命名规范转换与 CSS 样式优化器。将 HTML/JSX/TSX/Vue/Svelte/Astro 代码中的 class/className 属性
  与对应的 CSS/Sass/Less/Stylus 选择器同步转换为 BEM 命名格式，将 CSS 属性按 csscomb zen 预设顺序排列，
  将扁平 CSS 规则重组为 BEM 嵌套结构，并将样式规则按逻辑域拆分为独立集合。
  触发此技能的场景包括但不限于：
  用户要求将类名转换为 BEM 规范、重构旧项目样式命名、统一团队 CSS 命名规范；
  用户要求整理 CSS 属性的书写顺序、CSS 属性排序；
  用户要求将扁平的 CSS/SCSS 规则重组为嵌套结构、用 & 组织选择器；
  用户要求将臃肿的样式文件按功能模块拆分；
  用户的口语化表达如"这个 scss 太乱了帮我整理下"、"把 class 名改成规范格式"、"把 class 改规范"、
  "CSS 属性顺序排一下"、"这个样式文件拆开吧"、"这个组件的 class 命名不规范帮我改改"、
  "帮我把 scss 里面的选择器整理成 BEM 格式"、"CSS 属性写得太乱了帮我排一下序"。
  不应触发：纯理论问答不涉及代码转换；非前端类名场景（JS/TS 变量名、后端命名、数据库字段）；
  改样式值不改命名；要求用 CSS Modules、CSS-in-JS、Tailwind 等非 BEM 方案重写样式。
---

# yy-frontend-style-bem-optimizer

## 支持格式

- **标记文件**：`.html`、`.jsx`、`.tsx`、`.vue`、`.svelte`、`.astro`
- **样式文件**：`.css`、`.scss`、`.sass`、`.less`、`.styl`、`.stylus`

## 核心能力

1. **BEM 命名转换**：同时处理标记文件的 `class`/`className` 和样式文件的选择器，保持映射一致
2. **CSS 属性排序**：将 CSS 规则中的属性按 csscomb zen 预设顺序排列
3. **BEM 嵌套重组**（可选）：将扁平分散的 BEM 规则重组为 SCSS/Less/Stylus 的 `&` 嵌套结构
4. **逻辑域拆分**（可选）：将 SCSS/Less/Stylus 中的 CSS 规则按业务逻辑域拆分为独立集合

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

  若项目无 git 或 git 命令失败，提示用户手动指定文件范围。若过滤后无匹配文件，回复"当前没有需要处理的变更文件。"并终止。

- 代码片段模式下用户仅提供了标记代码（HTML/JSX/Vue）而未提供样式代码（CSS/SCSS 等）→ 询问用户是否同时提供样式内容，以确保 BEM 命名转换在标记和样式之间保持一致。若用户明确表示只需转换标记代码，则跳过样式文件处理。

### 步骤 3. 读取和解析源内容

根据转换模式读取内容。

**解析规则**：

- 从 HTML/Vue/Svelte/Astro 模板中提取所有 `class` 属性的值，分割为单个类名
- 从 JSX/TSX 中提取所有 `className` 属性的值，分割为单个类名
- 从 CSS/SCSS/Less/Stylus 中提取所有选择器中的类名
- 建立标记文件 class/className 与 CSS 选择器的映射关系
- 识别已符合 BEM 规范的类名（如 `block__element--modifier`），标记为无需转换

### 步骤 4. 确定配置

详细配置项、配置文件示例、Tailwind/Windi CSS/UnoCSS 忽略配置见 `references/config-reference.md`。该文件包含 `.bemrc` 完整示例和 utility-first 框架忽略配置模板。

### 步骤 5. 执行 BEM 命名转换

> 仅在能力范围包含"BEM 命名转换"时执行。

**核心原则**：标记文件（HTML/JSX/Vue 等）和样式文件（CSS/SCSS 等）中的同一类名必须使用相同的 BEM 转换结果，通过维护类名映射表确保一致性。

- HTML/Vue/Svelte/Astro：遍历所有 `class` 属性，将每个类名按转换策略映射为 BEM 格式，保留被忽略的类名不变
- JSX/TSX：遍历所有 `className` 属性。动态拼接的类名字符串（如 ``className={`btn-${variant}`}``）在报告中标记需人工确认，不自动转换
- CSS/SCSS/Less/Stylus：遍历所有类选择器，按相同映射规则转换，保留被忽略的类名不变

详细映射示例、转换策略判断、边界规则（禁止 Element 嵌套 Element、多段连字符消解、已有 BEM 重转换、混合实体）和框架特殊处理（CSS Modules、CSS-in-JS、Vue scoped、Angular、Svelte、Astro）见 `references/bem-naming.md`。

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

```text
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

完整示例代码见 `references/examples.md`，覆盖以下场景：基础 BEM 命名转换 + 嵌套重组、带修饰符的转换、忽略第三方类名、CSS 属性排序、全流程转换、逻辑域拆分、JSX + SCSS 同步转换、纯 CSS 文件处理。

## 限制

- 仅转换 `class`/`className` 属性值和 CSS 选择器中的类名，不转换 JavaScript/TypeScript 中的逻辑类名字符串（如变量名、对象键）
- 不自动推断组件间继承关系，每个文件独立分析块名
- 不处理非前端文件中的命名（如后端模板、配置文件、脚本语言类名）
- Utility-first 框架（Tailwind CSS 等）的类名应加入忽略列表，不做转换
- 不修改构建配置或导入路径，仅处理类名和选择器文本
- 各框架特殊处理的完整说明见 `references/bem-naming.md` 的「框架特殊处理」章节

## 相关资源

- BEM 官方规范：<http://getbem.com/naming/>
- csscomb zen 预设：<https://github.com/csscomb/csscomb.js/blob/master/config/zen.json>
