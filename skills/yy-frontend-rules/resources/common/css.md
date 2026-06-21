
# 🎨 CSS样式规范

> 本规范统一前端样式开发标准，确保样式可维护、可扩展、兼容性好。所有样式必须遵循BEM命名规范，优先使用scoped作用域。

## 🛠️ 一、CSS基础配置

- 预处理器：优先使用Sass/SCSS，Less为辅
- 格式化：Prettier + stylelint统一格式化，禁止手动调整格式
- 全局样式：统一放在`src/styles/`目录下，包括变量、混合、重置样式、公共类等
- 组件样式：优先使用scoped作用域，避免全局样式污染

## 二、样式区注释与作用域

### 注释格式

| 场景     | 注释格式              | 示例                    |
| -------- | --------------------- | ----------------------- |
| 模块分组 | `/* 模块名称 */`      | `/* 用户卡片 */`        |
| 子模块   | `/* 模块 > 子模块 */` | `/* 用户卡片 > 头部 */` |
| 响应式   | `/* 响应式 */`        | `/* 响应式 */`          |

### 作用域

- `scoped`：仅作用于当前组件
- 非 `scoped`：需标注 `/* 全局 */`
- 优先使用 `scoped`

## 三、CSS 命名（BEM）

详见 [naming.md](./naming.md#-五css-命名规范bem)（块/元素/修饰符命名规则）。

## 四、CSS 布局推荐

### 定位层级

- `position: relative` 搭配 `z-index: 0` 创建定位上下文，避免子元素 `z-index` 影响外部元素

### 外边距与内边距方向

- **padding**：优先使用 `padding-top`、`padding-left`、`padding-right`，避免 `padding-bottom`
- **margin**：优先使用 `margin-bottom`、`margin-left`、`margin-right`，避免 `margin-top`

**原因**：向下布局更稳定，减少相邻元素的间距叠加问题（margin collapse）。

## 五、CSS 兼容性指南

### 常见兼容性属性

以下属性存在兼容性风险，需提供降级方案：

| 属性                 | 问题                           | 降级方案                            |
| -------------------- | ------------------------------ | ----------------------------------- |
| `gap` (Flexbox)      | Safari 14.4及以下、IE11 不支持 | margin 负边距                       |
| `aspect-ratio`       | iOS 15.6及以下 Safari 支持不全 | `padding-bottom` 百分比 Hack        |
| `100vh`              | iOS Safari 地址栏导致高度偏差  | JS 动态计算或 `dvh` 单位            |
| `inset`              | 旧浏览器不识别                 | 先写 `top/right/bottom/left` 再覆盖 |
| `will-change`        | 动画结束不重置会占用内存       | 动画结束后设为 `auto`               |
| `content-visibility` | 仅 Chromium 支持               | 仅作性能增强，不影响核心布局        |
| `subgrid`            | 浏览器支持不完善               | 传统 Grid/Flex 降级                 |

---

## 🔢 六、CSS属性排序规范

属性必须按以下顺序排列，相关属性分组，组之间空一行分隔：

1. **布局定位属性**：display / position / top / right / bottom / left / float / clear / z-index / overflow
2. **盒模型属性**：width / height / margin / padding / border / border-radius / box-shadow
3. **文字排版属性**：font / line-height / text-align / color / letter-spacing / text-decoration / text-transform
4. **背景装饰属性**：background / opacity / cursor / transition / transform / animation
5. **其他特殊属性**：content / pointer-events / user-select / will-change / aspect-ratio

```scss
/* ✅ 正确示例 */
.user-card {
  /* 布局定位 */
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 10;
  overflow: hidden;

  /* 盒模型 */
  width: 300px;
  height: 400px;
  margin-bottom: 16px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  /* 文字排版 */
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  text-align: center;

  /* 背景装饰 */
  background: #fff;
  transition: all 0.3s ease;
  cursor: pointer;

  /* 特殊属性 */
  user-select: none;
}
```

---

## 📦 七、SCSS最佳实践

### 变量使用

- 全局变量统一放在`src/styles/variables.scss`中，包括颜色、字体、间距、圆角等通用变量
- 组件内可定义组件级变量，命名前缀加`$组件名-变量名`，如`$user-card-avatar-size: 48px;`
- 颜色使用语义化变量，禁止直接写色值：`$color-primary: #4080ff;` 而不是`color: #4080ff;`

### 混合宏（@mixin）

- 公共样式抽取为混合宏，复用性高的放在全局，组件内专用的放在组件内
- 混合宏命名使用动词开头，如`@mixin ellipsis($line: 1) { ... }`
- 避免过度使用混合宏，简单的复用优先使用类名复用

### 嵌套规则

- 嵌套层级最多不超过3层，禁止过度嵌套导致选择器权重过高
- &仅用于伪类、伪元素、修饰符，禁止普通子选择器
- 嵌套顺序：伪类 > 修饰符 > 子元素

```scss
/* ✅ 正确示例 */
.user-card {
  &:hover {
    /* 伪类 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
  &--disabled {
    /* 修饰符 */
    opacity: 0.6;
    cursor: not-allowed;
  }
  &__avatar {
    /* 子元素 */
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
}
```

### 继承@extend

- 优先使用@extend复用样式，避免重复代码
- 仅继承的样式必须是通用的、无副作用的公共样式

---

## 📏 八、单位规范

- 长度单位：优先使用`px`，响应式场景使用`rem`/`vw`，移动端适配使用`rpx`（小程序）
- 字体单位：字体大小使用`px`，行高优先使用无单位数值，如`line-height: 1.5;`
- 百分比单位：宽度百分比基于父元素宽度，高度百分比需要父元素有固定高度
- 特殊单位：`dvh`/`dvw`用于移动端适配，避免`100vh`在iOS Safari的问题
- 禁止使用魔法数值，所有数值基于设计稿对应设计规范

---

## ✨ 九、动画规范

- 动画优先使用CSS3 transition/animation实现，避免JS动画
- 动画属性优先使用transform和opacity，触发GPU加速，性能更好
- 动画时长控制在0.3s以内，避免过长动画影响用户体验
- 动画结束后及时重置will-change属性，释放内存
- 禁止使用影响性能的属性动画，如width/height/top/left等会触发重排的属性

---

## 🤝 十、兼容性开发实践

- **查兼容性**：使用[Can I use](https://caniuse.com/)查询属性支持情况，新属性必须做兼容性检查
- **自动前缀**：配置Autoprefixer + PostCSS，自动补齐厂商前缀，不需要手动写-webkit-等前缀
- **渐进增强**：使用`@supports`包裹新属性，不支持的浏览器自动忽略，不影响核心功能
- **降级方案**：新属性必须提供降级方案，确保在低版本浏览器中布局正常
- **浏览器支持**：最低兼容到Chrome 90+、Safari 14+、Edge 90+，不需要兼容IE浏览器
