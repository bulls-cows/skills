# 语义化命名重构

**定位**：🟡 中风险。涉及标识符的全局替换，需确保引用查找的准确性。

## 函数命名体系

| 类型 | 规范 | 示例 |
| -------- | ---------------------------------- | -------------------------------- |
| API 函数 | `api + Method + URLPath`（小驼峰） | `apiGetUserInfo`, `apiPostLogin` |
| 事件函数 | `on + EventName`（小驼峰） | `onClickSubmit`, `onChangeInput` |

## 变量与常量规范

| 类型 | 规范 | 示例 |
| ------ | -------------------------------- | ----------------------------------------- |
| 常量 | 全大写 + 下划线 | `MAX_RETRY_COUNT`, `APP_CONFIG` |
| Props | camelCase | `userName`, `isLoading` |
| 组件名 | PascalCase | `<UserList />` |
| 布尔值 | `isXX` / `hasXX` / `showXX` 前缀 | `isLoading`, `hasPermission`, `showModal` |

## Hooks 命名规范

| 规范 | 说明 | 示例 |
| ---- | ---- | ---- |
| 必须以 `use` 开头 | PascalCase 格式 | `useTable`, `useSearchForm`, `usePagination` |
| 文件名与函数名一致 | 存放在 `@src/hooks/` | `useTable.ts` → `export const useTable = () => {}` |
| 返回值使用 toRefs | 禁止直接返回 reactive | `return { ...toRefs({ tableData, loading }) }` |

## 禁止项

- 严禁 `data1`、`temp2` 等无意义命名
- 禁止在 `<script setup>` 中使用 `this`
- 禁止使用 Options API 写法（如 `data()`、`methods: {}`）

## 跨文件引用处理

当命名重构涉及跨文件引用时：

1. **列出影响范围**：使用 grep 或 IDE 查找所有引用该符号的文件
2. **提示用户确认**：告知用户影响的文件列表
3. **等待确认后执行**：不自动执行跨文件重构

### 示例

```markdown
命名重构：getUserInfo → fetchUserProfile

影响文件：
- src/views/UserList.vue (调用该函数)
- src/api/user.ts (定义该函数)
- src/utils/format.ts (间接引用)

请确认是否继续执行？
```

## Vue3 特有规范

### ref/reactive 变量命名

- **ref**：使用 camelCase，访问时必须 `.value`
- **reactive**：使用 camelCase，对象内部属性也用 camelCase

```typescript
// ✅ 正确
const tableData = ref([]);
const searchQuery = reactive({
  username: '',
  email: '',
});

// ❌ 禁止
const table_data = ref([]);  // 应使用 camelCase
const SearchQuery = reactive({}); // 应使用 camelCase
```

### TypeScript 类型命名

- **接口/类型别名**：PascalCase（`interface UserInfo`、`type UserList`）
- **泛型参数**：单字母大写或 PascalCase（`T`、`TData`、`TResponse`）

```typescript
// ✅ 正确
interface UserInfo {
  name: string;
  age: number;
}

type UserList = UserInfo[];

// ❌ 禁止
interface userInfo {}  // 应使用 PascalCase
type user_list = UserInfo[]; // 应使用 PascalCase
```

> 📖 更多禁止规则见主技能文档 [SKILL.md](../SKILL.md) 的「禁止规则」章节。
