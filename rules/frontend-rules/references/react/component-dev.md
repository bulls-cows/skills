# React 组件开发规范

本规范涵盖 React 函数组件的声明方式、命名、文件组织、结构顺序及导出规范。

---

## 一、组件声明方式

### 必须使用函数组件

- 使用箭头函数或函数声明定义组件
- **禁止**使用 Class 组件

```typescript
// ✅ 正确：箭头函数
const UserCard = ({ userId, userName }: IUserCardProps) => {
  return (
    <div className="user-card">
      <span>{userName}</span>
    </div>
  )
}

// ✅ 正确：函数声明
function UserCard({ userId, userName }: IUserCardProps) {
  return (
    <div className="user-card">
      <span>{userName}</span>
    </div>
  )
}

// ❌ 错误：Class 组件
class UserCard extends React.Component {
  render() {
    return <div>{this.props.userName}</div>
  }
}
```

---

## 二、组件命名

| 类型       | 规范                     | 示例                             |
| ---------- | ------------------------ | -------------------------------- |
| 组件名     | PascalCase，多单词       | `UserList`, `SearchForm`         |
| 组件文件名 | PascalCase，与组件名一致 | `UserList.tsx`, `SearchForm.tsx` |
| 目录命名   | kebab-case（短横线）     | `src/components/user-profile/`   |

**注意**：组件名必须使用多个单词，避免与 HTML 原生元素冲突。

---

## 三、组件结构顺序

组件内部必须按以下宏观顺序排列：

| 步骤 | 内容          | 说明                             |
| ---- | ------------- | -------------------------------- |
| 1    | `imports`     | 导入依赖（4 组分组）             |
| 2    | `types`       | 类型定义（Props、内部类型）      |
| 3    | 组件声明      | 函数组件声明                     |
| 4    | Hooks         | useState / useEffect / useRef 等 |
| 5    | 状态声明      | useState 初始值                  |
| 6    | 派生值        | useMemo / computed 值            |
| 7    | 副作用        | useEffect（含清理函数）          |
| 8    | 事件处理函数  | onXxx 命名的事件处理             |
| 9    | render（JSX） | 返回 JSX                         |

### 完整示例

```typescript
import { useState, useEffect, useMemo, useCallback } from 'react'
import type { IUserInfo } from '@src/types'
import { apiGetUserInfo } from '@src/api/user'
import { formatDate } from '@src/utils/date'

// types: 组件 Props 定义
interface IUserCardProps {
  userId: string
  showAvatar?: boolean
}

/**
 * 用户卡片组件
 * @description 展示用户基本信息与头像
 * @description 点击卡片跳转用户详情页
 */
const UserCard = ({ userId, showAvatar = true }: IUserCardProps) => {
  // hooks: useState
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)
  const [loading, setLoading] = useState(false)

  // derived: 格式化后的创建时间
  const formattedDate = useMemo(() => {
    if (!userInfo?.createdAt) return '-'
    return formatDate(userInfo.createdAt)
  }, [userInfo?.createdAt])

  // effect: 获取用户数据
  useEffect(() => {
    let isMounted = true

    const fetchUserInfo = async () => {
      setLoading(true)
      try {
        const { code, data } = await apiGetUserInfo(userId)
        if (code === 0 && isMounted) {
          setUserInfo(data)
        }
      } catch (error) {
        console.warn('获取用户信息失败:', error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchUserInfo()

    // cleanup: 防止内存泄漏
    return () => {
      isMounted = false
    }
  }, [userId])

  // methods: 点击卡片
  const handleClick = useCallback(() => {
    window.location.href = `/user/${userId}`
  }, [userId])

  // render
  return (
    <div className="user-card" onClick={handleClick}>
      {showAvatar && <img className="user-card__avatar" src={userInfo?.avatar} alt="" />}
      <div className="user-card__info">
        <span className="user-card__name">{userInfo?.name}</span>
        <span className="user-card__date">{formattedDate}</span>
      </div>
    </div>
  )
}

export { UserCard }
```

---

## 四、Script 顶部 JSDoc

每个组件文件顶部必须添加 JSDoc 注释，说明组件职责：

```typescript
/**
 * 组件名称
 * @description 页面职责说明
 * @description 核心业务流程简述
 * @description 关键数据来源
 */
```

---

## 五、Props 规范

### 使用 interface / type 定义 Props

```typescript
// ✅ 正确：接口定义 Props
interface IUserListProps {
  userList: IUserInfo[]
  isLoading?: boolean
  onSelect?: (userId: string) => void
}

// ✅ 正确：类型别名定义 Props
type TUserListProps = {
  userList: IUserInfo[]
  isLoading?: boolean
}
```

### 参数解构

```typescript
// ✅ 正确：Props 在参数中解构
const UserCard = ({ userId, userName, isActive = false }: IUserCardProps) => {
  return <div>{userName}</div>
}

// ❌ 错误：不解构，直接使用 props.xxx
const UserCard = (props: IUserCardProps) => {
  return <div>{props.userName}</div>
}
```

### 默认值（解构默认值）

```typescript
// ✅ 正确：解构时设置默认值
const UserCard = ({ showAvatar = true, maxCount = 10 }: IUserCardProps) => {
  // ...
}

// ❌ 错误：在函数体内判断
const UserCard = (props: IUserCardProps) => {
  const showAvatar = props.showAvatar ?? true
  // ...
}
```

---

## 六、导出规范

### 使用命名导出

- **禁止**使用默认导出（`export default`）
- 统一使用命名导出（`export { ComponentName }`）

```typescript
// ✅ 正确：命名导出
export { UserCard }

// ✅ 正确：直接导出
export const UserCard = () => {
  return <div>用户卡片</div>
}

// ❌ 错误：默认导出
export default UserCard
```

---

## 七、组件拆分原则

### 一个文件一个组件

- 每个文件只导出一个主要组件
- 小型关联组件可放在同一文件

```typescript
// ✅ 正确：主组件 + 小型子组件
interface IIconProps {
  name: string
}

const Icon = ({ name }: IIconProps) => {
  return <span className={`icon icon--${name}`} />
}

export const UserCard = ({ userId }: IUserCardProps) => {
  return (
    <div>
      <Icon name="user" />
      <span>{userId}</span>
    </div>
  )
}
```

### 页面拆分建议

- 组件超过 250 行时，建议拆分独立子组件
- 按功能区块拆分：搜索表单、数据表格、分页器、操作按钮组

| 模块 | 处理方式                |
| ---- | ----------------------- |
| 弹窗 | 拆分为独立组件          |
| 表格 | 表格组件 + 业务逻辑分离 |
| 表单 | 表单组件 + 校验逻辑分离 |

---

## 八、方法职责

- 每个方法职责单一，函数名语义清晰
- 方法超过 20 行考虑拆分
- 重复逻辑抽离为公共方法或自定义 Hook

---

## 九、Import 分组排序

将 `import` 分为四组，**组间空一行，组内按字母顺序排列**：

1. **node_modules（外部依赖）**：`react`、`lodash` 等第三方库
2. **types（类型导入）**：所有 `import type` 导入的纯类型
3. **内部全局依赖**：`@src/` 开头的路径（API、工具、Hooks、Store、常量、组件等）
4. **内部相对依赖**：`./` 或 `../` 开头的相对路径

```typescript
// 1. node_modules（外部依赖）
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

// 2. types（类型导入）
import type { IUserInfo, ITableConfig } from '@src/types'

// 3. 内部全局依赖（@src/）
import { apiGetUserInfo } from '@src/api/user'
import { useTable } from '@src/hooks/useTable'
import UserAvatar from '@src/components/UserAvatar'

// 4. 内部相对依赖（./）
import { localHelper } from './utils/helper'
import styles from './UserCard.module.scss'
```

**排序原则**：外部优先 → 类型次之 → 全局在前 → 相对在后 → 组内按字母顺序排列。

---

## 十、相关模块引用

| 内容       | 详见                                 |
| ---------- | ------------------------------------ |
| Hooks 规范 | [hooks.md](./hooks.md)               |
| 状态管理   | [state.md](./state.md)               |
| JSX 规范   | [jsx.md](./jsx.md)                   |
| TypeScript | [typescript.md](./typescript.md)     |
| 命名规范   | [../naming.md](../naming.md)         |
| 网络请求   | [../network.md](../network.md)       |
| 代码风格   | [../code-style.md](../code-style.md) |
| 注释规范   | [../comments.md](../comments.md)     |
