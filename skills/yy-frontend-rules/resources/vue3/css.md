
# Vue3 CSS 样式差异（Vue3 特有）

> 通用 CSS 样式规范（预处理器、注释、作用域、BEM 命名、布局推荐、兼容性指南、属性排序、SCSS、单位、动画等）详见 [css.md](../common/css.md)，本文件仅承载 Vue3 与通用规范不同的内容。

## 一、scoped 与 v-html 的样式失效（`:deep()` 穿透）

**现象**：在 `<style scoped>` 中直接写选择器（如 `.section-content a`），无法作用于通过 `v-html` 注入的 DOM 节点，样式不生效。

**原因**：`scoped` 编译会给选择器追加 `[data-v-xxx]` 属性约束，编译后形如 `.section-content[data-v-xxx] a[data-v-xxx]`。而 `v-html` 注入的内容是原始 HTML 字符串，渲染出的 DOM 节点不会携带当前组件的 `data-v-xxx` 属性，因此后代选择器中的 `a[data-v-xxx]` 永远匹配不到，样式失效。

**适用场景**：凡是通过 `v-html` 渲染富文本的容器（如富文本编辑器输出、Markdown 转 HTML、接口返回的 HTML 片段），其内部子元素均受此限制。

**正确做法**：使用 `:deep()` 伪类穿透作用域，让样式作用于 v-html 注入的子节点。

```vue
<template>
  <div class="rich-content" v-html="htmlString" />
</template>

<style scoped lang="scss">
/* ✅ 正确：用 :deep() 穿透，作用于 v-html 注入的 <a> */
.rich-content {
  :deep(a) {
    color: #3b82f6;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

/* ❌ 错误：直接写 a，编译后为 a[data-v-xxx]，无法匹配 v-html 注入的 <a> */
.rich-content {
  a {
    color: #3b82f6;
  }
}
</style>
```

**注意事项**：

- `:deep()` 只穿透一层作用域，若 v-html 内容内部还有嵌套组件根节点，需评估是否真的需要继续穿透
- 不要为了省事对整个容器用 `:deep(.rich-content)`，应尽量收窄到具体子元素，避免污染后代组件
- 若 v-html 内容来自用户输入，必须先做 XSS 过滤，样式穿透本身不解决安全问题

---

## 二、自定义指令清理（unmounted 钩子）

Vue3 自定义指令在 `unmounted` 钩子中必须清理事件监听器和定时器，避免内存泄漏：

```typescript
const vFocus = {
  mounted(el: HTMLInputElement) {
    el.focus()
  },
  unmounted(el: HTMLInputElement) {
    // 清理逻辑（事件监听、定时器等）
  },
}
```

> Vue3 指令钩子名与 Vue2 不同：Vue3 使用 `mounted`/`unmounted`，Vue2 使用 `inserted`/`unbind`。

---

## 三、相关模块引用

| 模块         | 路径                            |
| ------------ | ------------------------------- |
| 通用 CSS 规范 | [css.md](../common/css.md)      |
| Vue3 性能    | [performance.md](./performance.md) |
