# TypeScript 通用规范（Vue3/React 共享）

> 本规范涵盖 Vue3 与 React 项目共享的 TypeScript 类型使用约定。框架特定的类型定义（如 `defineProps<T>`、`useState<T>`、事件类型、泛型组件）详见各自框架文档。

## 一、类型注解要求

- **参数**：函数参数必须明确类型
- **返回值**：函数返回值必须明确类型
- **变量**：变量声明必须明确类型（尤其初始值为空时）

---

## 二、禁用 `any`

**禁止**使用 `any` 类型，应使用以下替代：

- `unknown`：用于类型不确定的场景
- `Record<string, unknown>`：用于动态键值对对象
- 具体类型/接口：定义准确的数据结构

```typescript
// ✅ 正确
const data: unknown = JSON.parse(raw)
const userInfo: IUserInfo = { id: '1', name: 'test' }
const config: Record<string, unknown> = { key: 'value' }

// ❌ 错误
const data: any = JSON.parse(raw) // 禁止
```

---

## 三、类型命名规范

- 类型别名和接口统一使用 **`I` 前缀 + PascalCase** 命名（详见 [common-naming.md](./common-naming.md#三变量与常量规范)）

```typescript
// ✅ 正确
interface IUserInfo {
  id: string
  name: string
}
type TUserList = IUserInfo[]
```

---

## 四、类型导入

使用 `import type` 导入纯类型，减少运行时依赖：

```typescript
// ✅ 正确：type-only 导入
import type { IUserInfo, ITableConfig } from '@src/types'
import { useState, useEffect } from 'react'
```

**规则**：

- 仅用于类型导入时使用 `import type`
- 值和类型同时导入时分开写（`import type` 和 `import` 分两行）

```typescript
// ✅ 正确：值与类型分开
import type { User } from '@src/types'
import { apiGetUser } from '@src/api/user'

// ❌ 错误：混合导入（不利于 Tree Shaking）
import { User, apiGetUser } from '@src/user'
```

---

## 五、类型文件组织

- **全局类型**：放在 `src/types/` 目录下（如 `src/types/user.d.ts`）
- **组件私有类型**：放在组件同级目录或 SFC/组件文件内 `export type` / `export interface`
- **全局注入**：在 `src/types/index.ts`（或 `index.d.ts`）中统一导出，便于项目全局引用

```text
src/
├── types/
│   ├── user.d.ts      # 全局用户类型
│   ├── api.d.ts       # 接口响应类型
│   └── index.ts       # 统一导出
└── components/
    └── UserCard/
        ├── index.tsx
        └── types.ts   # 组件私有类型
```

---

## 六、类型压制（不推荐）

**不推荐**使用 `as any`、`@ts-ignore`、`@ts-expect-error` 等类型压制操作。应优先通过完善类型定义解决类型问题，仅在特殊场景（如第三方库类型缺失、历史代码迁移过渡期）中使用。

```typescript
// ❌ 不推荐
const data = response as any
// @ts-ignore
const value = obj.property

// ✅ 正确：完善类型定义
interface IApiResponse {
  data: IUserInfo
}
const { data } = response as IApiResponse
```

---

## 七、框架特定差异

| 内容             | Vue3 详见                                                        | React 详见                                                       |
| ---------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| Props 类型定义   | [vue3-typescript.md](./vue3-typescript.md#一组件-props-类型定义) | [react-typescript.md](./react-typescript.md#一props-类型定义)    |
| 响应式状态泛型   | [vue3-typescript.md](./vue3-typescript.md#二响应式类型标注)      | [react-typescript.md](./react-typescript.md#二usestate-类型注解) |
| Emits 类型定义   | [vue3-typescript.md](./vue3-typescript.md#三emits-类型定义)      | 不适用                                                           |
| 事件处理类型     | 不适用（Vue 模板自动推导）                                       | [react-typescript.md](./react-typescript.md#四事件处理类型)      |
| Children 类型    | 不适用（Vue 用 slot）                                            | [react-typescript.md](./react-typescript.md#五children-类型)     |
| 组件返回类型     | 不适用                                                           | [react-typescript.md](./react-typescript.md#六组件返回类型)      |
| Hooks 返回值类型 | [vue3-typescript.md](./vue3-typescript.md#四hooks-返回值类型)    | [react-hooks.md](./react-hooks.md#五react-标准模板)              |
| 泛型组件         | 不适用（Vue 用 `generic` 属性）                                  | [react-typescript.md](./react-typescript.md#七泛型组件)          |
