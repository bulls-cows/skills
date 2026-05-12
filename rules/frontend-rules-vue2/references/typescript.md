# Vue2 TypeScript 规范

本规范定义 TypeScript 在 Vue2 项目中的类型使用约定。

---

## 一、类型注解要求

- **参数**：函数参数必须明确类型
- **返回值**：函数返回值必须明确类型
- **变量**：变量声明必须明确类型

## 二、禁止使用 `any`

**禁止**使用 `any` 类型，应使用以下替代：

- `unknown`：用于类型不确定的场景
- `Record<string, unknown>`：用于动态键值对对象
- 具体类型/接口：定义准确的数据结构

```typescript
// ✅ 正确
const data: unknown = JSON.parse(raw);
const userInfo: IUserInfo = { id: '1', name: 'test' };

// ❌ 错误
const data: any = JSON.parse(raw); // 禁止
```

---

## 三、组件 Props 类型定义

### Options API Props 定义

Vue2 中 Props 使用运行时对象形式定义类型：

```typescript
export default {
  props: {
    // userId: 用户ID
    userId: {
      type: [String, Number] as PropType<string | number>,
      required: true,
    },
    // count: 条数
    count: {
      type: Number,
      default: 10,
    },
  },
};
```

---

## 四、组件 Methods 类型标注

```typescript
// ✅ 正确：显式标注参数和返回值类型
const handleSearch = (query: string): void => {
  // ...
};

const getUserList = async (): Promise<IUserInfo[]> => {
  // ...
};
```

---

## 五、data 返回值类型标注

```typescript
data(): IDataState {
  return {
    searchQuery: '',
    userList: [],
    loading: false,
  };
},

// 对应的类型定义
interface IDataState {
  searchQuery: string;
  userList: IUserInfo[];
  loading: boolean;
}
```

---

## 六、类型压制（不推荐）

**不推荐**使用 `@ts-ignore`、`@ts-expect-error` 等指令掩盖类型错误。应优先修复类型定义或使用 `unknown` 替代。
