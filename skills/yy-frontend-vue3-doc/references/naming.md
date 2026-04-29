# 命名约定

## 模板区注释命名

| 场景       | 格式                         | 示例                                    |
| ---------- | ---------------------------- | --------------------------------------- |
| 根节点     | `<!-- 组件名 -->`            | `<!-- UserCard -->`、`<!-- 用户列表 -->` |
| 循环       | `<!-- 循环: 数据描述 -->`    | `<!-- 循环: 用户列表 -->`                |
| 条件       | `<!-- 条件: 判断描述 -->`    | `<!-- 条件: 有数据时 -->`                |
| 区块       | `<!-- 区块: 功能描述 -->`    | `<!-- 区块: 操作按钮组 -->`              |
| 插槽       | `<!-- 插槽: slot-name -->`   | `<!-- 插槽: default -->`                 |
| 具名插槽   | `<!-- 具名插槽: name -->`    | `<!-- 具名插槽: header -->`              |
| 作用域插槽 | `<!-- 作用域插槽: 描述 -->`  | `<!-- 作用域插槽: 表格行数据 -->`        |
| 动态组件   | `<!-- 动态组件: 描述 -->`    | `<!-- 动态组件: 标签页内容 -->`          |

## 脚本区注释命名

### Props

格式：`// prop名: 描述`

```typescript
// user: 用户信息对象
// isLoading: 加载状态
// maxCount: 最大数量限制
```

### Emits

格式：`// emit名: 描述`

```typescript
// submit: 提交表单事件
// cancel: 取消操作事件
// change: 数据变化事件
```

### ref / reactive

格式：`// 变量名: 描述`

```typescript
// searchQuery: 搜索查询参数
// isLoading: 数据加载状态
// formData: 表单响应式数据
```

### computed

格式：`// computed: 描述`（简单）或 TSDoc（关键）

```typescript
// computed: 是否全选
// computed: 过滤后的用户列表
```

### watch / watchEffect

格式：`// watch: 描述`（简单）或 TSDoc（关键）

```typescript
// watch: 监听搜索关键词变化
// watch: 监听用户选择变化
```

### 方法函数

格式：`// 方法名: 描述`（简单）或 TSDoc（关键）

```typescript
// handleSubmit: 提交表单
// fetchUserData: 获取用户数据
// toggleSelect: 切换选中状态
```

### 生命周期

格式：`// lifecycle: 钩子名`

```typescript
// lifecycle: onMounted
// lifecycle: onUnmounted
// lifecycle: onBeforeMount
```

### provide / inject

格式：`// provide: 键名 - 描述` / `// inject: 键名 - 描述`

```typescript
// provide: appConfig - 应用全局配置
// inject: parentData - 父组件传递的数据
```

### defineExpose

格式：`// expose: 名称 - 描述`

```typescript
// expose: validate - 表单验证方法
// expose: resetForm - 重置表单方法
```

### 组合式函数（Composables）

格式：`// hooks: useXxx - 描述`

```typescript
// hooks: useUserStore - 用户状态管理
// hooks: useTable - 表格通用逻辑
// hooks: usePagination - 分页逻辑
```

### 导入语句

格式：`// import: 说明`

```typescript
// import: 用户 API 模块
// import: Element Plus 按钮组件
// import: 表格组合式函数
```

## 样式区注释命名

| 场景         | 格式                          | 示例                    |
| ------------ | ----------------------------- | ----------------------- |
| 模块         | `/* 模块名称 */`              | `/* 用户卡片 */`        |
| 子模块       | `/* 模块 > 子模块 */`         | `/* 用户卡片 > 头部 */` |
| 响应式       | `/* 响应式 */`                | `/* 响应式 */`          |
| 响应式(断点) | `/* 响应式: 设备描述 */`      | `/* 响应式: 平板 */`    |
| CSS 变量绑定 | `/* CSS变量绑定: 变量名 */`   | `/* CSS变量绑定: themeColor */` |
| 全局样式     | `/* 全局 */`                  | `/* 全局 */`            |
