---
description: Sass 废弃语法替代方案与现代 Sass 最佳实践
alwaysApply: true
---

# Sass 最佳实践

> Dart Sass 正在逐步移除旧语法，本文档记录已废弃的写法及其替代方案，避免构建时出现警告或升级后报错。

## @import → @use

**问题**

`@import` 将在 Dart Sass 3.0.0 中移除。`@import` 会把所有变量、混入注入全局作用域，容易导致命名冲突和难以追踪的副作用。

**替代方案**

使用 `@use` 加载模块。`@use` 默认创建命名空间，不会污染全局作用域。

```scss
// ❌ 已废弃
@import 'variables';
@import 'mixins';

body {
  color: $text-color;
  @include flex-center;
}

// ✅ 正确
@use 'variables' as *;  // as * 取消命名空间，保持原有用法
@use 'mixins';

body {
  color: $text-color;
  @include flex-center;
}
```

**注意事项**

- `@use` 必须出现在文件顶部，在任何规则或声明之前
- `@use` 的加载顺序不影响输出结果，但建议按依赖关系排列
- 需要访问模块内变量时，使用 `namespace.$variable` 或 `as *` 导入

## 废弃的颜色函数 → color.adjust / color.scale

**问题**

`darken()`、`lighten()`、`saturate()`、`desaturate()`、`adjust-hue()`、`opacify()`、`transparentize()` 等函数已废弃。

**替代方案**

使用 `sass:color` 模块中的 `color.adjust()` 或 `color.scale()`。

```scss
// ❌ 已废弃
a:hover {
  color: darken($primary-color, 10%);
}
.bg {
  background: lighten($bg-color, 5%);
}

// ✅ 正确
@use "sass:color";

a:hover {
  color: color.adjust($primary-color, $lightness: -10%);  // darken = 减少亮度
}
.bg {
  background: color.adjust($bg-color, $lightness: 5%);     // lighten = 增加亮度
}
```

**常用对照表**

| 废弃函数 | 替代方案 |
| --- | --- |
| `darken($color, 10%)` | `color.adjust($color, $lightness: -10%)` |
| `lighten($color, 10%)` | `color.adjust($color, $lightness: 10%)` |
| `saturate($color, 20%)` | `color.adjust($color, $saturation: 20%)` |
| `desaturate($color, 20%)` | `color.adjust($color, $saturation: -20%)` |
| `adjust-hue($color, 30deg)` | `color.adjust($color, $hue: 30deg)` |
| `opacify($color, 0.3)` | `color.adjust($color, $alpha: -0.3)` |
| `transparentize($color, 0.3)` | `color.adjust($color, $alpha: -0.3)` |

**注意事项**

- `color.adjust()` 做绝对调整，`color.scale()` 做相对缩放，根据场景选择
- 调用前必须在文件顶部添加 `@use "sass:color";`

## 避免 additionalData 与手动导入重复

**问题**

在 Vite / Nuxt 项目中，`vite.css.preprocessorOptions.scss.additionalData` 会将指定内容注入到每个 SCSS 文件头部。如果同时在 `main.scss` 中手动 `@import` 或 `@use` 相同模块，会导致重复加载。

**替代方案**

- `additionalData` 已注入的变量/混入，不需要在入口文件中再次导入
- 仅在入口文件中导入 `additionalData` 未覆盖的模块

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/variables" as *;'
        }
      }
    }
  }
})
```

```scss
// main.scss
// ❌ 变量已由 additionalData 注入，不需要重复导入
@use 'variables';
@use 'mixins';
@use 'reset';

// ✅ 只导入 additionalData 未覆盖的模块
@use 'mixins';
@use 'reset';
```

**注意事项**

- 修改 `additionalData` 配置后，检查所有 SCSS 入口文件是否有重复导入
- 如果某个模块仅部分文件使用，考虑在具体文件中按需 `@use`，而非注入 `additionalData`
