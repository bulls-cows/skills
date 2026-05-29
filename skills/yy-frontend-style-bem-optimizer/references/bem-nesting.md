# BEM 嵌套结构重组规则

## 适用条件

- 样式文件为 SCSS（`.scss`、`.sass`）、Less（`.less`）或 Stylus（`.styl`、`.stylus`）
- 纯 `.css` 文件不执行嵌套重组（除非用户明确要求且项目支持 CSS 原生嵌套）

## 识别同一 Block 下的规则

- 所有以同一 Block 名称开头的规则归为一组
- `.block` → Block 自身的规则，作为嵌套根
- `.block__element` → 嵌套为 `&__element`
- `.block--modifier` → 嵌套为 `&--modifier`
- `.block__element--modifier` → 嵌套为 `&__element` 内的 `&--modifier`

## 嵌套层级结构

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

## 执行规则

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

## 嵌套约束

- 不同 Block 的规则不可交叉嵌套
- 已存在嵌套结构的规则先展平再重新嵌套，确保嵌套格式统一
- 嵌套后的选择器特异性（specificity）必须与嵌套前完全一致
- 若原始代码中存在刻意保持扁平的注释标记（如 `// flat` 或 `// no-nest`），保留其扁平状态不嵌套

## 特异性验证

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

## Element 嵌套约束

BEM 规范禁止 Element 嵌套 Element（如 `block__elem1__elem2`）。在嵌套重组时同样遵循此规则：

- `&__element` 内部不可再嵌套 `&__sub-element`——这会生成 `block__element__sub-element`，违反 BEM 规范
- 所有 Element 直接嵌套在 Block 根下，不按 DOM 层级嵌套
- Element 的 Modifier（如 `&__element { &--modifier {} }`）是允许的，这生成 `block__element--modifier`
