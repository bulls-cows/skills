---
name: yy-frontend-react-doc
description: >
  为 React 组件（函数组件/Class 组件）自动生成规范注释。
  解析组件结构、props、state、生命周期等，添加结构化注释。
  仅在用户提供 .tsx/.jsx 文件内容或明确要求为组件添加注释时触发。
icon: 📝
---

# yy-frontend-react-doc

为 React 组件自动生成规范注释，使代码结构更清晰、可维护性更高。

## 使用场景

- 用户提供了 `.tsx`/`.jsx` 文件内容，要求添加注释
- 用户要求为组件补充文档注释
- Code Review 时需要解读组件结构

**不触发**：用户要求生成新组件、修改组件逻辑、生成提交信息等。

## 注释规范

### JSX 区

**注释策略**：

| 场景 | 注释格式 | 示例 |
|------|----------|------|
| 组件名注释 | `{/* 组件名称 */}` | `{/* UserCard */}` |
| 循环节点 | `{/* 循环: 描述 */}` | `{/* 循环: 用户列表 */}` |
| 条件分支 | `{/* 条件: 描述 */}` | `{/* 条件: 有数据时 */}` |
| 关键区块 | `{/* 区块名称 */}` | `{/* 操作按钮组 */}` |
| 插槽/children | `{/* children */}` | `{/* children */}` |

**示例**：

```tsx
const UserCard = ({ user, children }) => {
  return (
    <div className="user-card">
      {/* UserCard */}
      {/* 用户信息区 */}
      <div className="user-info">
        <img src={avatar} alt="avatar" />
        <span>{username}</span>
      </div>

      {/* 条件: 有权限时显示操作按钮 */}
      {hasPermission && (
        <div className="actions">
          {/* 循环: 操作按钮列表 */}
          {actions.map(action => (
            <button key={action.id}>{action.label}</button>
          ))}
        </div>
      )}

      {/* children */}
      {children}
    </div>
  )
}
```

### 脚本区

**注释策略**：

| 内容 | 注释格式 | 示例 |
|------|----------|------|
| props 接口 | `// props: 描述` | `// props: 用户对象` |
| state | `// state: 描述` | `// state: 表单字段` |
| hooks | `// hook: 描述` | `// hook: useUser` |
| 方法/函数 | `// 方法名`（单行）或 JSDoc（关键方法） | `// submitForm */` |

**JSDoc 格式（关键方法必填）**：

```typescript
/**
 * 方法名称
 * @description 方法的简要描述
 * @param {类型} 参数名 - 参数描述
 * @returns {类型} 返回值描述
 */
```

**示例**：

```tsx
interface UserProps {
  user: User
}

// props: 用户对象
const UserCard: React.FC<UserProps> = ({ user }) => {
  // state: 表单字段
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  // hook: 获取用户数据
  const { data, loading } = useUser(user.id)

  // computed: 是否全选
  const isSelected = selectedItems.length === totalItems

  // lifecycle: useEffect
  useEffect(() => {
    fetchData()
  }, [])

  // submitForm: 提交表单
  const submitForm = () => {
    // ...
  }

  /**
   * 获取用户列表
   * @description 从 API 获取用户数据并更新状态
   * @returns {Promise<void>}
   */
  const fetchData = async () => {
    // ...
  }

  return (
    <div>...</div>
  )
}
```

### Class 组件（如果遇到）

**注释策略**：

| 内容 | 注释格式 | 示例 |
|------|----------|------|
| propTypes | `// propTypes: 描述` | `// propTypes: 用户对象` |
| state | `// state: 描述` | `// state: 加载状态` |
| 生命周期 | `// lifecycle: 阶段` | `// lifecycle: componentDidMount` |
| 方法 | `// 方法名`（单行）或 JSDoc（关键方法） | `// handleSubmit` |

## 工作流程

### 阶段一：解析结构

1. 识别函数组件或 Class 组件
2. 解析 `props` 接口/类型定义
3. 解析 `useState`、`useEffect`、`自定义 hooks` 等
4. 解析 JSX 返回的节点层级

### 阶段二：识别关键节点

**JSX 区需标注**：

- 根节点（组件名称）
- `array.map()` 循环节点
- 条件渲染（`&&`、`? :`）
- `children` / `{children}`
- 关键区块划分

**脚本区需标注**：

- `props` 接口/类型定义
- `useState` 状态声明
- `useEffect` / 生命周期钩子
- 自定义 hooks
- 事件处理函数
- 普通函数定义

### 阶段三：生成注释

按照上述规范，在对应位置添加注释。

**关键原则**：

- **不修改任何代码逻辑**，只添加注释
- **保持原有缩进和格式**
- **注释简洁**，不超过一行（JSX 区），JSDoc 不超过 5 行
- **使用中文**描述（代码标识符除外）

### 阶段四：输出结果

直接输出完整的带注释代码，不包含解释说明。

## 输出格式

直接输出带注释的 React 组件代码，使用代码块包裹：

````markdown
```tsx
const Component = () => {
  return (
    <div>
      ...
    </div>
  )
}
```
````

## 注意事项

1. **不删除原有代码**：只添加注释，原有代码保持不变
2. **不添加空注释**：没有关键内容的区块不强制添加注释
3. **保持简洁**：注释言简意赅，不废话
4. **React 语法**：确保使用 React 语法（函数组件 hooks、Class 组件生命周期等）
