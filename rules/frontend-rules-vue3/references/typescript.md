# TypeScript 类型注解规范

本模块定义 Vue3 项目中的 TypeScript 类型注解要求。

## 一、核心原则

- **禁止使用 `any` 类型**
- 参数、返回值、变量必须明确类型注解
- 优先使用 `interface` 或 `type` 定义复杂类型

## 二、变量与函数类型

### 2.1 变量类型注解

```typescript
// ✅ 正确：明确类型
const userName: string = '';
const userId: number = 0;
const isVisible: boolean = false;
const userList: Array<{ id: number; name: string }> = [];

// ❌ 错误：使用 any
const data: any = {};
```

### 2.2 函数类型注解

```typescript
// ✅ 正确：参数和返回值都有类型
const formatUser = (user: User): string => {
  return `${user.name} (${user.email})`;
};

// 箭头函数优先
const handleClick = (id: number): void => {
  // 处理点击事件
};
```

## 三、Props 类型

必须使用 `defineProps` + TypeScript 泛型语法：

```typescript
const props = defineProps<{
  // userId: 用户ID
  userId: string | number;
  // isLoading: 加载状态
  isLoading?: boolean;
}>();
```

## 四、Emits 类型

必须使用 `defineEmits` 指定事件名和参数类型：

```typescript
const emit = defineEmits<{
  input: [value: string];
  change: [value: string];
  click: [id: number];
}>();
```

## 五、Hooks 返回类型

组合式函数应明确返回类型：

```typescript
export const useTable = () => {
  const tableData = ref<User[]>([]);
  const loading = ref(false);

  const getListData = async (): Promise<void> => {
    // ...
  };

  return {
    tableData,
    loading,
    getListData
  };
};
```

## 六、类型导入

使用 `import type` 导入纯类型，减少运行时依赖：

```typescript
import type { User, TableData } from '@src/types';
import { ref, computed } from 'vue';
```
