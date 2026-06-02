# 输出示例

## 示例 1：审核通过（只有轻微问题）

```markdown
## 审核结果：通过

### 问题统计

- 审核文件数：3
- 严重：0 个
- 中等：0 个
- 轻微：2 个

### 轻微问题

1. **问题类型**：调试代码未移除
   - **位置**：src/components/Header.vue:18
   - **描述**：存在 console.log 语句
   - **修复建议**：移除调试代码

2. **问题类型**：类型导入不规范
   - **位置**：src/utils/helper.ts:3
   - **描述**：纯类型导入未使用 `import type`
   - **修复建议**：将 `import { UserInfo }` 改为 `import type { UserInfo }`
```

## 示例 2：审核不通过（存在严重和中等问题）

````markdown
## 审核结果：不通过

### 问题统计

- 审核文件数：4
- 严重：2 个
- 中等：2 个
- 轻微：1 个

### 问题详情

#### 严重问题

1. **问题类型**：XSS 漏洞
   - **位置**：src/components/RichText.vue:25
   - **描述**：使用 `v-html` 渲染用户输入内容，未进行转义处理
   - **影响**：攻击者可注入恶意脚本，窃取用户 Cookie 或执行钓鱼攻击
   - **代码片段**：
     ```vue
     <div v-html="userContent" />
     ```
   - **修复建议**：使用 DOMPurify 等库对内容进行消毒后再渲染，或改用文本插值 `{{ }}`

2. **问题类型**：类型安全绕过
   - **位置**：src/api/user.ts:42
   - **描述**：使用 `as any` 绕过类型检查
   - **影响**：失去类型保护，后续代码访问不存在的属性时无法在编译期发现
   - **代码片段**：
     ```typescript
     const data = response.data as any
     ```
   - **修复建议**：定义 `ApiResponse<T>` 接口，使用泛型替代 `as any`

#### 中等问题

1. **问题类型**：响应式解构丢失响应性
   - **位置**：src/stores/user.ts:15
   - **描述**：从 Pinia store 解构状态时未使用 `storeToRefs`
   - **影响**：解构后的变量丢失响应性，状态变更不会触发组件重渲染
   - **代码片段**：
     ```typescript
     const { name, avatar } = useUserStore()
     ```
   - **修复建议**：改为 `const { name, avatar } = storeToRefs(useUserStore())`

2. **问题类型**：useEffect 依赖数组缺失
   - **位置**：src/hooks/useData.ts:8
   - **描述**：`useEffect` 中引用了 `userId` 但依赖数组为空
   - **影响**：`userId` 变化时不会重新执行 effect，导致数据与用户不匹配
   - **修复建议**：将 `userId` 加入依赖数组 `[userId]`

#### 轻微问题

1. **问题类型**：调试代码未移除
   - **位置**：src/components/Header.vue:18
   - **描述**：存在 console.log 语句
   - **修复建议**：移除调试代码

### 修复优先级

1. 先修复严重问题。
2. 再修复中等问题。
3. 轻微问题可按团队规范决定是否处理。
````

## 示例 3：审核通过（无任何问题）

```markdown
## 审核结果：通过

### 问题统计

- 审核文件数：2
- 严重：0 个
- 中等：0 个
- 轻微：0 个

### 轻微问题

未发现轻微问题。
```

## 示例 4：审核不通过（只有中等问题，无严重问题）

````markdown
## 审核结果：不通过

### 问题统计

- 审核文件数：5
- 严重：0 个
- 中等：2 个
- 轻微：1 个

### 问题详情

#### 中等问题

1. **问题类型**：Vue2 响应式陷阱
   - **位置**：src/views/UserList.vue:67
   - **描述**：直接通过索引修改数组元素 `this.list[0].status = 1`
   - **影响**：Vue2 无法检测数组索引变化，视图不会更新
   - **代码片段**：
     ```javascript
     this.list[0].status = 1
     ```
   - **修复建议**：使用 `this.$set(this.list, 0, { ...this.list[0], status: 1 })` 或 `this.list.splice(0, 1, newItem)`

2. **问题类型**：嵌入内容安全
   - **位置**：src/components/ExternalWidget.vue:12
   - **描述**：iframe 未设置 sandbox 属性
   - **影响**：嵌入的外部页面拥有完整权限，可执行脚本、提交表单、访问同源资源
   - **代码片段**：
     ```vue
     <iframe :src="widgetUrl" width="100%" height="400" />
     ```
   - **修复建议**：添加 `sandbox="allow-scripts allow-same-origin"` 限制权限，并使用 `postMessage` 校验 `origin`

#### 轻微问题

1. **问题类型**：SFC 结构顺序
   - **位置**：src/views/UserList.vue:1
   - **描述**：`<script>` 位于 `<template>` 之前，不符合常见约定
   - **修复建议**：调整为 `<template>` → `<script>` → `<style>` 顺序

### 修复优先级

1. 先修复中等问题。
2. 轻微问题可按团队规范决定是否处理。
````
