---
description: 前端React项目开发规范与架构指南
alwaysApply: true
---

# 前端 React 项目开发规范

## 📌 AI 行为约束

| 行为    | 说明                                                      |
| ------- | --------------------------------------------------------- |
| ✅ 允许 | 直接在对话中输出文字说明和总结                            |
| ✅ 允许 | 修改代码中的注释和 JSDoc                                  |
| ✅ 允许 | 仅在用户明确要求时才创建文档文件                          |
| 🚫 禁止 | 禁止在完成任务后自动创建或生成任何 .md 文档文件           |
| 🚫 禁止 | 禁止未经用户明确要求就创建 README、说明文档等             |
| 🚫 禁止 | 禁止修改 src/api、src/components、src/constants 以外的任何文件 |

---

## 代码风格规范

### 基础规则

| 规则     | 值                               |
| -------- | -------------------------------- |
| 缩进     | 2 空格                           |
| 引号     | 单引号 `'`                       |
| 分号     | 使用分号                         |
| 最大行宽 | 100 字符                         |
| 箭头函数 | 单参数省略括号 `item => item.id` |
| 对象括号 | 保持空格 `{ foo: bar }`          |
| 尾随逗号 | 使用尾随逗号                     |
| 换行符   | auto                             |

---

## 一、绝对禁止项

| 规则         | 说明                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------ |
| 数据解构限制 | 禁止连续解构数据，例如 `...data.data` 这种写法                                             |
| 组件数据修改 | 禁止在父组件中直接修改子组件的数据                                                         |
| 数据类型修改 | 禁止多次修改 data 的某些属性，后端给什么值用什么值，可以额外新增属性，但不允许修改数据类型 |

---

## 二、命名规范

### API 接口命名

- **函数命名**：`api` + `Get/Post/Delete/Put` + 后端 URL 拼接，小驼峰格式
- 可使用 `change-case` 插件快速转换

### 事件类函数

- 必须采用 `handle` + `事件名` 格式
- 推荐使用小驼峰命名

### 常量命名

- 采用 `CONSTANT_CASE`（全大写，下划线分隔）规范

---

## 三、组件规范

### 组件命名

| 类型   | 格式                  | 示例              |
| ------ | --------------------- | ----------------- |
| 文件名 | 多个单词 + PascalCase | `UserList.tsx`    |
| 组件名 | PascalCase            | `UserList`        |
| 使用   | PascalCase            | `<UserList />`    |

### 组件传参要求

| 要求 | 说明                     |
| ---- | ------------------------ |
| 命名 | 必须使用 camelCase       |
| 类型 | 必须明确指定参数类型     |
| 注释 | 必须添加注释说明参数含义 |

### 组件规范

| 类型       | 说明                                                   |
| ---------- | ------------------------------------------------------ |
| 函数组件   | 优先使用函数组件 + Hooks                               |
| 纯组件     | 使用 `React.memo` 优化无需重新渲染的组件              |
| 受控组件   | 表单元素的值由 state 控制                              |

### 事件处理命名

- **命名规范**：
  - `handle` + `事件名` + `Click/Change/Submit` 等
  - 例如：`handleClick`、`handleChange`、`handleSubmit`

- **顺序规范**：

  ```javascript
  const handleInput = (value: string) => {
    setValue(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInput(e.target.value);
  };
  ```

### 元素特性的顺序

参考 React 风格指南中的元素特性顺序。

---

## 四、CSS 规范

| 规则     | 说明                                      |
| -------- | ----------------------------------------- |
| 命名     | 类名需遵循 BEM 规范或 CSS Modules        |
| 格式化   | 需使用 prettier 进行格式化                |
| 预处理器 | Sass/SCSS / CSS Modules / Tailwind        |
| 全局样式 | 放在 `src/styles/` 目录                   |

---

## 五、代码结构规范

### 函数组件内部顺序

```tsx
import React, { useState, useEffect, useCallback } from "react";
import type { FC } from "react";

// 1. 类型定义
interface UserListProps {
  title: string;
  count?: number;
  onChange?: (value: number) => void;
}

// 2. 组件定义
const UserList: FC<UserListProps> = (props) => {
  // 3. State
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  // 4. Effect
  useEffect(() => {
    console.log("mounted");
  }, []);

  // 5. Computed / Memo
  const isEmpty = data.length === 0;

  // 6. Callback
  const handleClick = useCallback(() => {
    props.onChange?.(1);
  }, [props.onChange]);

  // 7. Render
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
};

export default UserList;
```

### State 和 Memo 使用

- 除了和后端交互的数据、和部分定时器
- 其它一律尽可能使用 useMemo / useCallback 优化
- 频繁变化的状态应考虑是否可以使用 useReducer

### Hooks 规范

- 使用 try/catch 包裹可能抛出异常的逻辑
- 命名使用 `use` 前缀
- 遵循 Hooks 规则（不在循环、条件、嵌套函数中调用）

### methods 内部顺序

```javascript
// 初始化方法
const init = () => {};

// 网络请求方法
const fetchData = async () => {
  try {
    setLoading(true);
  } catch (error) {
    console.warn(error);
  } finally {
    setLoading(false);
  }
};

// 事件处理方法
const handleClick = () => {
  try {
  } catch (error) {
    console.warn(error);
  }
};
```

---

## 六、React 特有规则

| 规则            | 说明                           |
| --------------- | ------------------------------ |
| 组件命名        | PascalCase（允许单个单词）     |
| 属性命名        | camelCase                     |
| 组件类型        | 优先使用函数组件               |
| 状态管理        | 根据场景选择 useState/useReducer |
| TypeScript      | 建议启用，提供更好的类型推导   |
| JSX             | 使用自闭合标签                 |
| key             | 列表渲染时必须提供唯一 key    |

### React Hooks 规范

- 使用 `useState` 定义组件状态
- 使用 `useEffect` 处理副作用
- 使用 `useMemo` 缓存计算结果
- 使用 `useCallback` 缓存函数
- 使用 `useRef` 访问 DOM 或存储不需要触发渲染的可变值

---

## 七、性能优化

| 优化项      | 说明                         |
| ----------- | ---------------------------- |
| 组件懒加载  | 使用 React.lazy 和 Suspense |
| 纯组件      | 使用 React.memo 避免重复渲染 |
| 虚拟列表    | 长列表使用 react-window      |
| 防抖节流    | 频繁触发的事件使用防抖/节流  |
| 图片优化    | 使用合适的图片格式和大小     |
| useMemo     | 合理使用 useMemo 优化计算    |
| useCallback | 合理使用 useCallback 优化函数 |

---

## 八、注意事项

⚠️ **未使用变量**：ESLint 已关闭检查，需自行清理无用代码
