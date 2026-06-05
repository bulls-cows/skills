---
title: React 代码组织与顺序规范
version: 2.0.0
lastUpdated: 2026-06-03
priority: 🟠 强烈推荐（必须遵循）
maintainer: bulls-cows team
---

# React 代码组织与顺序规范

本规范定义 `.tsx`/`.jsx` 文件结构、组件内部代码顺序、Imports 分组及 JSX 属性排列顺序。

---

## 一、文件结构顺序

`.tsx`/`.jsx` 文件内部从上到下顺序必须保持一致：

1. `imports`（4 组） → 2. `types`（Props/内部类型） → 3. `常量` → 4. `子组件`（可选） → 5. `主组件`（`export`）

> CSS Modules 的 `import styles from './xxx.module.scss'` 属于第 4 组相对导入，归在 `imports` 中，**不**单独放在文件末尾。

---

## 二、组件内部结构顺序

函数组件内部必须按以下宏观顺序排列：

| 步骤 | 内容          | 说明                                         |
| ---- | ------------- | -------------------------------------------- |
| 1    | Hooks 调用    | 自定义 Hook / `useState` / `useRef` 等       |
| 2    | 派生值        | `useMemo` / 渲染时计算的变量                 |
| 3    | 副作用        | `useEffect`（含清理函数）                    |
| 4    | 事件处理函数  | `onXxx` 命名的方法（必要时用 `useCallback`） |
| 5    | render（JSX） | 返回 JSX                                     |

### 功能模块分组

当组件逻辑较多时，**同一类别的逻辑应按功能模块分组**（用空行或注释分隔），避免杂乱堆砌。每个模块内部通常遵循：

`useState` → `useMemo` → `useEffect` → 事件处理

### 完整示例

> **注意**：第 1~4 步之间可根据功能模块分组，每组内部遵循 `useState` → `useMemo` → `useEffect` → 事件处理的顺序。

```tsx
import { useState, useEffect, useMemo, useCallback } from 'react'
import type { IUserInfo } from '@src/types'
import { apiGetUserInfo } from '@src/api/user'
import { formatDate } from '@src/utils/date'
import { useTable } from '@src/hooks/useTable'
import styles from './UserCard.module.scss'
import Avatar from './Avatar'

// types: 组件 Props 定义
interface IUserCardProps {
  userId: string
  showAvatar?: boolean
}

// constants: 默认头像
const DEFAULT_AVATAR = '/default-avatar.png'

// 子组件: 卡片操作按钮
const CardAction = ({ onEdit }: { onEdit: () => void }) => {
  return <button onClick={onEdit}>编辑</button>
}

/**
 * 用户卡片组件
 * @description 展示用户基本信息与头像
 * @description 点击卡片跳转用户详情页
 */
export const UserCard = ({ userId, showAvatar = true }: IUserCardProps) => {
  // hooks: useTable
  const { dataSource, getDataSourceTotal } = useTable()

  // --- 业务逻辑：用户信息模块 ---
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)
  const [loading, setLoading] = useState(false)

  const formattedDate = useMemo(() => {
    if (!userInfo?.createdAt) return '-'
    return formatDate(userInfo.createdAt)
  }, [userInfo?.createdAt])

  useEffect(() => {
    let isMounted = true

    const fetchUserInfo = async () => {
      setLoading(true)
      try {
        const { code, data } = await apiGetUserInfo(userId)
        if (code === 0 && isMounted) {
          setUserInfo(data)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchUserInfo()

    // cleanup: 防止内存泄漏
    return () => {
      isMounted = false
    }
  }, [userId])

  // --- 业务逻辑：交互模块 ---
  const handleClick = useCallback(() => {
    window.location.href = `/user/${userId}`
  }, [userId])

  const handleEdit = useCallback(() => {
    // ...
  }, [])

  // render
  return (
    <div className={styles.userCard} onClick={handleClick}>
      {showAvatar && <Avatar src={userInfo?.avatar ?? DEFAULT_AVATAR} />}
      <span className={styles.name}>{userInfo?.name}</span>
      <span className={styles.date}>{formattedDate}</span>
      <CardAction onEdit={handleEdit} />
      <span className={styles.total}>{getDataSourceTotal()}</span>
    </div>
  )
}
```

---

## 三、Import 分组排序（4 组）

将 `import` 分为四组，**组间空一行，组内按字母顺序排列**：

1. **node_modules（外部依赖）**：`react`, `dayjs`, `lodash` 等第三方库。
2. **types（类型导入）**：所有 `import type` 导入的纯类型。
3. **内部全局依赖**：`@src/` 开头的路径（包括 API、工具、Hooks、Store、常量、组件等）。
4. **内部相对依赖**：`./` 或 `../` 开头的相对路径（包括工具、Hooks、常量、组件、样式等）。

**排序原则**：外部优先 → 类型次之 → 全局在前 → 相对在后 → 组内按字母顺序排列。

```tsx
// 1. node_modules（外部依赖）
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { debounce } from 'lodash'

// 2. types（类型导入）
import type { IUserInfo, ITableConfig } from '@src/types'

// 3. 内部全局依赖（@src/）
import { apiGetUserInfo } from '@src/api/user'
import { formatDate } from '@src/utils/date'
import { useTable } from '@src/hooks/useTable'
import UserAvatar from '@src/components/UserAvatar'

// 4. 内部相对依赖（./）
import { localHelper } from './utils/helper'
import { MAX_RETRY_COUNT } from './constants'
import styles from './UserCard.module.scss'
```

> 通用导入分组规则详见 [@rules/frontend-rules/references/code-style.md](../code-style.md#二导入排序规范)

---

## 四、JSX 属性顺序

JSX 元素上的多个属性建议按以下顺序排列（同一元素出现多类属性时）：

1. `key`（列表渲染标识）
2. `ref`（DOM/实例引用）
3. 展开属性 `{...props}`
4. 事件处理（`onClick`、`onChange`、`onSubmit` 等）
5. 数据/配置 props（普通属性）
6. 样式属性（`className`、`style`）
7. 无障碍/数据属性（`aria-*`、`data-*`）

> `children` 作为嵌套内容自然写在标签内部最后，不参与属性排序。

```tsx
// ✅ 正确：按顺序排列
<li
  key={user.id}
  ref={itemRef}
  onClick={handleClick}
  draggable={false}
  className={styles.item}
  data-user-id={user.id}
>
  {user.name}
</li>

// ❌ 错误：属性顺序混乱
<li
  className={styles.item}
  data-user-id={user.id}
  key={user.id}
  onClick={handleClick}
  ref={itemRef}
  draggable={false}
>
  {user.name}
</li>
```

> 通用 Props 传递规则（camelCase、布尔简写、字符串引号等）详见 [jsx.md](./jsx.md#五props-传递)。

---

## 五、文件与目录命名

详见 [naming.md](../naming.md#一文件与目录命名)。
