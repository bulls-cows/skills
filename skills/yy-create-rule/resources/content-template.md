# 规则内容结构模板

本文档提供规则内容的格式模板，用于规范规则文档的编写。

## Frontmatter

新建规则文档时，必须在文件开头添加 frontmatter：

```yaml
---
description: [规则简要描述]
alwaysApply: true
---
```

## 基础结构

```markdown
### [章节标题]

**[子标题或要点]**

[详细描述]

**[示例/代码]**（如果适用）

\`\`\`[语言]
[代码示例]
\`\`\`

**[注意事项]**（如果适用）

- 注意事项1
- 注意事项2
```

## 插入位置优先级

1. 如果存在明确相关的章节，插入到该章节内
2. 如果是新的主题，创建新的章节
3. 保持文档的层级结构一致性

## 示例

### 最佳实践类

```markdown
### Vue 组件规范

**Props 修改原则**

Vue 组件中不要直接修改 props，要通过 emit 事件通知父组件修改。

\`\`\`vue
// ❌ 错误：直接修改 props
this.value = newValue

// ✅ 正确：通过 emit 通知父组件
this.$emit('update:value', newValue)
\`\`\`

**注意事项**

- 对于复杂对象，可以使用 v-model.sync 实现双向绑定
- 修改 props 会导致 Vue 警告，且数据流难以追踪
```

### Bug 修复经验类

```markdown
### 移动端兼容性问题

**iOS WebView 中 position:fixed 在软键盘弹起时会失效**

**问题描述**

在 iOS WebView 中，当软键盘弹起时，使用 `position: fixed` 定位的元素会出现位置错乱。

**解决方案**

使用 `position: absolute` 替代，或将固定定位元素移到键盘弹起时不可见的区域。

\`\`\`css
/_ ❌ 可能有问题 _/
.fixed-header {
position: fixed;
top: 0;
}

/_ ✅ 更稳定的方案 _/
.header-container {
position: absolute;
top: 0;
}
\`\`\`

**注意事项**

- 此问题在 iOS 12+ 有所改善，但仍需测试
- 临时方案：监听键盘事件，动态调整布局
```

### 架构决策类

```markdown
### API 调用规范

**统一错误处理**

所有 API 错误都要用统一的错误处理器，不能自己 catch 后静默忽略。

\`\`\`javascript
// ❌ 错误：静默忽略错误
try {
const data = await api.getData()
} catch (e) {
// 什么都不做
}

// ✅ 正确：统一错误处理
try {
const data = await api.getData()
} catch (e) {
handleError(e)
}
\`\`\`

**注意事项**

- 使用全局错误处理器记录日志和上报
- 对于预期内的错误，可以在处理后返回默认值
```
