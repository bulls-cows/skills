# 转换示例

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

## 示例 1：基础 BEM 命名转换

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

## 示例 2：带修饰符和嵌套

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

## 示例 3：忽略第三方类名

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

## 示例 4：CSS 属性排序

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

## 示例 5：BEM 嵌套结构重组

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

**转换后 SCSS/Less/Stylus**（重组为 BEM 嵌套结构，属性已排序）：

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

## 示例 6：SCSS 按逻辑域拆分（单文件内拆分）

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

## 示例 7：JSX + SCSS 同步转换

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

**转换后 SCSS/Less/Stylus**（BEM 嵌套结构，属性已排序）：

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
