# T05 🔤 语义化命名重构（🟡 中风险）

**定位**：🟡 中风险。涉及标识符的全局替换，需确保引用查找的准确性。

## 函数命名体系

| 类型     | 规范                               | 示例                             |
| -------- | ---------------------------------- | -------------------------------- |
| API 函数 | `api + Method + URLPath`（小驼峰） | `apiGetUserInfo`, `apiPostLogin` |
| 事件函数 | `on + EventName`（小驼峰）         | `onClickSubmit`, `onChangeInput` |

## 变量与常量规范

| 类型   | 规范                             | 示例                                      |
| ------ | -------------------------------- | ----------------------------------------- |
| 常量   | 全大写 + 下划线                  | `MAX_RETRY_COUNT`, `APP_CONFIG`           |
| Props  | camelCase                        | `userName`, `isLoading`                   |
| 组件名 | PascalCase                       | `<UserList />`                            |
| 布尔值 | `isXX` / `hasXX` / `showXX` 前缀 | `isLoading`, `hasPermission`, `showModal` |

## Vue3 组合式 API 命名规范

### ref / reactive 命名

| 类型      | 规范          | 示例                     |
| --------- | ------------- | ------------------------ |
| ref       | camelCase     | `isLoading`, `userName`  |
| reactive  | camelCase     | `formData`, `tableData`  |
| computed  | camelCase     | `isSelected`, `totalPage` |

### Hooks 命名规范

**必须以 `use` 开头**，遵循 Vue3 组合式 API 约定：

| 类型            | 规范                    | 示例                              |
| --------------- | ----------------------- | --------------------------------- |
| 表格逻辑 Hook   | `use + 功能名`          | `useTable`                        |
| 表单逻辑 Hook   | `use + 功能名`          | `useSearchForm`                   |
| 请求逻辑 Hook   | `use + 功能名 + Fetch` | `useUserFetch`                    |
| 通用逻辑 Hook   | `use + 功能名`          | `useLocalStorage`                 |

```typescript
// ✅ 正确：Hooks 命名以 use 开头
const { tableData, loading } = useTable();
const { searchQuery, resetForm } = useSearchForm();

// ❌ 错误：不以 use 开头
const { tableData } = tableHook();  // 禁止
```

## TypeScript 类型命名规范

| 类型     | 规范        | 示例               |
| -------- | ----------- | ------------------ |
| 类型别名 | `I` + PascalCase | `IUserInfo`, `ITableConfig` |
| 接口     | `I` + PascalCase | `IUser`, `ITable` |
| 泛型参数 | 单字母大写  | `T`, `K`, `V`      |

```typescript
// ✅ 正确：类型命名以 I 为前缀
type IUserInfo = {
  id: string;
  name: string;
};

interface ITableConfig {
  columns: ITableColumn[];
};

// ❌ 错误：类型命名缺少 I 前缀
type UserInfo = { ... };  // 应为 IUserInfo
interface TableConfig { ... };  // 应为 ITableConfig
```

## 禁止项

- 严禁 `data1`、`temp2` 等无意义命名
- 严禁 Hooks 不以 `use` 开头
- 严禁类型命名使用小驼峰（应为 PascalCase）
- 严禁类型命名缺少 `I` 前缀（`type IUserInfo`、`interface IUser`）

> 📖 更多禁止规则见主技能文档 SKILL.md 的「禁止规则」章节。

## 跨文件引用处理

**⚠️ 重要**：涉及跨文件引用时，需提示用户影响范围并确认：

1. 使用 LSP 的 `find_references` 工具查找所有引用
2. 列出所有引用该符号的文件路径
3. 提示用户确认是否继续执行重构
4. 确认后批量修改所有引用

### 示例

```markdown
⚠️ 命名重构影响范围检测：

`getUserInfo` 函数在以下文件中被引用：
1. src/views/UserList.vue (line 23, 45)
2. src/components/UserCard.vue (line 12)
3. src/api/user.ts (定义位置)

是否继续执行重命名为 `fetchUserProfile`？
```
