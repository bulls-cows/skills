# 逻辑深度优化

**定位**：🔴 高风险。涉及运行时行为改变，**必须经过任务调度器确认后执行**。

## 相等运算符转换

### 核心原则

**绝对不主动变更 `==` 和 `===`**，保持代码原有写法。即使有接口响应 code 字段，也必须先列入高风险任务清单，用户明确确认后才执行转换。

### 例外情况（需确认后执行）

- **接口响应的 `code` 字段比较**：建议统一使用 `===`（如 `code === 0`），因为后端返回的 code 通常是数字类型。但此转换仍属于高风险，必须展示给用户确认后才执行

### 风险：相等运算符转换

任何 `==` ↔ `===` 之间的转换都属于**逻辑变更**，可能改变代码的实际行为：

- `==` 会进行类型转换，`===` 不会
- `null == undefined` 为 true，但 `null === undefined` 为 false
- `0 == ''` 为 true，但 `0 === ''` 为 false
- 转换前必须逐项确认，展示变更预览

## 异步与网络请求

### 目标结构

```typescript
const fetchData = async () => {
  try {
    const { code, data, msg } = await apiXXX();
    if (code === 0) {
      // 处理成功逻辑
    } else {
      console.warn(msg);
    }
  } catch (err) {
    console.warn('fetchData error:', err);
  }
};
```

### 变更内容

- `.then()` 链式调用转为 `async/await`
- 统一响应模式 `{code, data, msg}` 解构处理
- 错误处理使用 `try/catch + console.warn`

### 变更预览格式规范

展示给用户确认时，**必须使用 diff 格式展示变更前后对比**，示例：

```diff
- // 优化前：Promise 链式调用
- const fetchData = () => {
-   isLoading.value = true
-   getUserInfo(userId.value).then(res => {
-     if (res.code == 200) { /* 数据处理 */ }
-     isLoading.value = false
-   }).catch(err => {
-     console.error(err)
-     isLoading.value = false
-   })
- }

+ // 优化后：Async/Await + try/catch/finally
+ const fetchData = async () => {
+   isLoading.value = true
+   try {
+     const res = await getUserInfo(userId.value)
+     if (res.code === 200) { /* 数据处理 */ }
+   } catch (err) {
+     console.warn(err)
+   } finally {
+     isLoading.value = false  // 只需写一次
+   }
+ }
```

### 风险：异步与网络请求

原代码可能使用不同响应结构；原有错误处理可能不同；`async/await` 改变执行时机。

## 计算属性优先

- 将非副作用的逻辑从方法迁移至 `computed`
- 命名统一用 `is/has/visible` 前缀

> **注意**：computed 是同步 getter 函数，**不应使用 try/catch**。如果逻辑需要异步或错误处理，保留在方法中。

### 风险：计算属性优先

响应式求值时机不同；带副作用的逻辑（如 API 请求、DOM 操作）不能转为 computed。

## Hooks 抽离

### 抽离条件

- 可复用逻辑超过 30 行
- 跨 2 个以上组件使用
- 逻辑独立性高（表格、表单、弹窗等）

### Hook 结构规范

```typescript
import { ref, toRefs } from 'vue';

/**
 * 表格数据管理
 * @description 封装表格数据获取、分页、加载状态等逻辑
 */
export const useTable = () => {
  const tableData = ref<any[]>([]);
  const loading = ref(false);
  const pagination = ref({
    currentPage: 1, // 当前页码
    pageSize: 20,   // 每页条数
    total: 0,       // 总条数
  });

  const getListData = async () => {
    loading.value = true;
    try {
      const { code, data, msg } = await apiGetList({
        page: pagination.value.currentPage,
        size: pagination.value.pageSize,
      });
      if (code === 0) {
        tableData.value = data.list;
        pagination.value.total = data.total;
      } else {
        console.warn(msg);
      }
    } catch (err) {
      console.warn('getListData error:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    ...toRefs({ tableData, loading, pagination }),
    getListData,
  };
};
```

### 风险：Hooks 抽离

拆分后可能引入作用域问题；Hooks 内部禁止直接调用生命周期钩子。

## 逻辑抽离与拆分

- 超过 50 行的方法拆分为子方法
- 重复 ≥2 次的逻辑提取为公共函数或 Hook
- 简单条件判断直接内联到 template，不额外创建函数

### 风险：逻辑抽离与拆分

拆分后可能引入作用域问题；内联表达式改变执行时机。

## Emit 标准化

### Emit 白名单（仅限以下 17 种事件）

| 类别 | 白名单事件 |
| ------ | ------------------------------------------------------------------------ |
| 交互类 | `change`, `click`, `select`, `expand`, `input`, `clear`, `remove`, `add` |
| 弹窗类 | `open`, `close`, `show`, `hide` |
| 操作类 | `cancel`, `confirm`, `ok`, `editSuccess`, `error` |

### Emit 顺序

`input` → 其它 → `change/click`

### 风险：Emit 标准化

父组件监听的自定义事件名可能不在白名单中，改名或替换会导致父组件监听失效。

### 基础组件规范

基础组件生命周期禁止主动 emit；业务型组件允许但不推荐在生命周期中主动 emit。

## Props 增强

### 要求

- 命名必须 camelCase
- 使用 TypeScript 类型注解
- 必须添加注释说明参数含义
- 可选参数使用 `?` 标记

```typescript
const props = defineProps<{
  // userId: 用户ID
  userId: string | number;
  // isLoading: 加载状态
  isLoading?: boolean;
}>();
```

### 风险：Props 增强

缺少可选参数标记可能导致 props 为 undefined 时运行报错；新增类型声明可能触发类型异常。

## 性能优化

- **组件懒加载**：路由和大组件使用 `defineAsyncComponent` 动态导入
- **KeepAlive**：合理使用 `<KeepAlive>` 页面缓存，避免重复渲染
- **虚拟滚动**：长列表使用虚拟滚动组件减少 DOM 节点
- **防抖节流**：频繁触发的事件（搜索、滚动、resize）使用防抖/节流
- **图片优化**：使用合适的图片格式（webp）和尺寸，懒加载非首屏图片
- **computed 优先**：替代 watch 中的派生逻辑，利用缓存机制
- **⚠️ 组件拆分**：弹窗→独立组件、表格→表格组件 + 业务逻辑分离、表单→表单组件 + 校验分离。**这属于架构调整，须用户确认后执行，不会自动创建新文件**

## 其他优化

- `v-html` 必须防范 XSS，避免直接操作未过滤的字符串
- 禁止直接修改 `props` 数据（使用 `props.xxx` 只读访问）
- 禁止连续解构（如 `...data.data`）
- 禁止父组件直接修改子组件数据
- 禁止多次修改 ref/reactive 属性类型（后端给什么值用什么值，可新增属性但不允许修改原始数据类型）

> 📖 更多禁止规则见主技能文档 [SKILL.md](../SKILL.md) 的「禁止规则」章节。
