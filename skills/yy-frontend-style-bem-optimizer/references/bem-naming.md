# BEM 命名转换规则

将 HTML/Vue/JSX/TSX 中的 `class`/`className` 和 CSS/SCSS/Less/Stylus 中的类选择器同步转换为 BEM（Block Element Modifier）格式。

## 转换流程

### 1. HTML/Vue 转换

- 遍历所有 `class` 属性，将每个类名按转换策略映射为 BEM 格式
- 保留被忽略的类名不变（包括第三方 UI 库类名和 utility-first 类名）

### 2. JSX/TSX 转换

- 遍历所有 `className` 属性（包括字符串字面量和模板字符串）
- 对于动态拼接的类名字符串（如 ``className={`btn-${variant}`}``），在报告中标记需人工确认，不自动转换

### 3. CSS/SCSS/Less/Stylus 转换

- 遍历所有类选择器，将选择器中的每个类名按相同映射规则转换
- 保留被忽略的类名不变

### 同步约束

HTML 和 CSS 中的同一类名必须使用相同的 BEM 转换结果。转换过程中维护类名映射表确保一致性——映射表一旦确定，标记文件和样式文件的转换都从同一张表取值，避免两侧出现不同的转换结果。

## 示例映射

| 原始类名             | BEM 转换结果           | 推导逻辑                         |
| -------------------- | ---------------------- | -------------------------------- |
| `header`             | `header`               | Block，无变化                    |
| `header-title`       | `header__title`        | 嵌套于 header 下，识别为 Element |
| `header-title-large` | `header__title--large` | 状态/尺寸类，识别为 Modifier     |
| `btn`                | `btn`                  | Block，无变化                    |
| `btn-primary`        | `btn--primary`         | 变种类，识别为 Modifier          |
| `card-body-padding`  | `card__body--padding`  | Element + Modifier               |

## 转换策略判断

- 分析类名结构，识别潜在的 Block、Element、Modifier 关系
- 嵌套结构优先按层级推导 Element 关系
- 状态类名（如 `active`、`disabled`、`open`）优先识别为 Modifier
- 对于无法自动推断的类名，保留原样并在报告中标记

## 边界规则

以下规则用于避免推导歧义和违反 BEM 规范。每条规则附带设计原因，帮助理解为什么这样约束。

### 禁止 Element 嵌套 Element

BEM 规范不允许 `block__elem1__elem2` 格式。即使 DOM 中 `elem2` 嵌套在 `elem1` 内，也应扁平化为 `block__elem2`。

**原因**：Element 描述的是组件的语义部分，而非 DOM 层级。如果按 DOM 层级映射，则 Element 命名会与内部实现耦合——一旦 DOM 结构调整，所有引用该 Element 的选择器和模板都需要同步修改，违背了 BEM 降低耦合的初衷。

**示例**：`card-header-title` 转换为 `card__title`（而非 `card__header__title`）。

### 多段连字符歧义消解

当类名包含多段连字符（如 `user-profile-card-body`）时，取第一段或前两段为 Block 名称，其余部分结合上下文判断 Element 或 Modifier。

消解优先级：

1. CSS 中是否存在匹配的 Block 选择器 → 确认 Block 边界
2. DOM 中是否嵌套在已知 Block 内 → 确认 Element 归属
3. 无法消解 → 保留原样并标记

### 已有 BEM 类名的重转换

若项目使用不同于配置的分隔符（如当前类名为 `block_elem_mod`，但目标配置为 `__`/`--`），应识别其 BEM 结构后按新分隔符重新输出，而非当作非 BEM 类名重新推导。

**原因**：重新推导可能破坏已确立的 Block/Element/Modifier 归属关系。保留结构只换分隔符是更安全的做法。

### 混合 BEM 实体（Mix）

一个 DOM 节点同时属于两个 Block（如 `class="block1 block2__elem"`）时，两个 BEM 实体独立转换，不交叉推导 Element 归属。

**原因**：Mix 是 BEM 中将不同 Block 的职责组合到同一 DOM 节点的机制。交叉推导会破坏 Block 的封装性——一个 Block 不应该知道另一个 Block 的内部结构。

## 框架特殊处理

### CSS Modules

仅处理模板中字符串形式的类名引用（如 `class="card"` 或 `className="card"`），不处理对象属性形式的引用（如 `styles.card`）。

CSS Modules 的类名由构建工具自动哈希处理，手动转换会破坏模块隔离。若项目使用对象引用方式，需手动将 `styles.xxx` 还原为字符串类名后再转换。

### CSS-in-JS（styled-components / Emotion）

不处理 CSS-in-JS 方案中的样式定义。这类方案不使用 `class`/`className` 属性，BEM 命名规范不适用。

### Vue SFC `<style scoped>`

转换类名后 scoped 属性（`data-v-xxx`）由 Vue 编译器自动处理，无需额外干预。scoped 样式会自动添加 `data-v-xxx` 属性选择器，BEM 转换不影响 scoped 行为，但转换后应验证样式是否仍然正确应用。

### Angular 模板

Angular 的 `class` 绑定语法（`[class.xxx]`、`[ngClass]`）不在处理范围内。Angular 使用组件样式封装（`ViewEncapsulation`），类名转换的适用场景有限。

### Svelte / Astro

Svelte 的 `class:` 指令和 Astro 的 `class` 属性使用标准 HTML 语法，可以处理。但 Svelte 的组件样式默认 scoped（编译时生成哈希类名），与 Vue scoped 行为类似。
