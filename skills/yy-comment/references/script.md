# JavaScript / TypeScript 注释规范

适用文件：`.js`、`.jsx`、`.ts`、`.tsx`、`.vue`（`<script>` 部分）、`.mjs`、`.cjs`

---

## JSDoc 规范

### 基本格式

```javascript
/**
 * 函数功能描述
 * @param paramName - 参数说明
 * @returns 返回值说明
 */
```

### 包含异常说明

```javascript
/**
 * 函数功能描述
 * @param filePath - 文件绝对路径
 * @returns 解析后的对象
 * @throws 若文件不存在或格式错误则抛出错误
 */
```

### 包含多行说明

```javascript
/**
 * 函数功能描述
 *
 * 处理逻辑：
 * 1. 第一步说明
 * 2. 第二步说明
 * 3. 第三步说明
 *
 * @param dirPath - 目录绝对路径
 * @returns 处理结果
 */
```

### 包含使用示例

适用于公共 API、工具函数等需要明确使用方式的场景。

```javascript
/**
 * 格式化日期为指定格式
 * @param date - 日期对象或时间戳
 * @param format - 目标格式，默认 'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 * @example
 * formatDate(new Date()); // '2026-05-07'
 * formatDate(Date.now(), 'YYYY/MM/DD'); // '2026/05/07'
 */
```

## 内部注释规范

### 判断标准

- 业务规则/领域逻辑：✅ 必须注释（涉及特定业务知识，非开发者难以理解）
- 复杂算法：✅ 必须注释（阅读时间 > 30 秒的逻辑）
- 非直观的边界处理：✅ 必须注释（如特殊的数据转换、兼容性处理）
- 纯技术实现：⚠️ 视情况（通用技术模式如循环、映射不需要）
- 自解释代码：❌ 不需要（变量名、函数名已清晰表达意图）

### 添加注释的场景

- 复杂的算法逻辑
- 非直观的业务规则
- 重要的分支判断
- 递归调用
- 特殊处理的边界情况

### 注释格式

```javascript
function processData(data) {
  // 单独处理首条记录，作为基准值
  const baseline = data[0]

  // 递归处理嵌套结构
  for (const item of data) {
    processItem(item)
  }

  // 合并并排序结果
  return sortResults(results)
}
```

### 避免的注释

```javascript
// ❌ 显而易见的注释
i = i + 1 // i 加 1

// ❌ 重复代码的注释
// 遍历数组
for (const item of items) {
  // ...
}
```

## TypeScript 补充规则

### 避免类型信息重复

对于 TypeScript 文件，类型定义本身就是文档：

```typescript
// ❌ 重复类型信息
/**
 * @param userId - 用户ID，字符串类型
 * @returns 用户对象
 */
function getUser(userId: string): User { ... }

// ✅ 补充业务语义
/**
 * 根据用户ID获取用户信息
 * @param userId - 用户唯一标识符
 * @returns 用户完整信息，不存在则返回 null
 */
function getUser(userId: string): User | null { ... }
```

### 类型注释优先级

- 已有类型定义 → JSDoc 只补充业务语义
- 复杂类型 → 可在 JSDoc 中补充说明
- 泛型参数 → 使用 `@template` 标签说明

### 装饰器注释

装饰器的文档注释放在装饰器上方，而非类/方法声明上方：

```typescript
/**
 * 用户控制器：处理用户相关的 HTTP 请求
 */
@Controller('/users')
class UserController {
  /**
   * 获取用户详情
   * @param id - 用户 ID
   */
  @Get('/:id')
  getUser(@Param('id') id: string) { ... }
}
```

## 类与接口文档注释

### 类和类方法

```javascript
/**
 * 用户认证服务
 *
 * 负责处理登录、登出和会话管理
 */
class AuthService {
  /**
   * 使用凭证登录并返回会话令牌
   * @param credentials - 包含用户名和密码的凭证对象
   * @returns 会话令牌字符串
   * @throws 凭证无效时抛出 AuthError
   */
  login(credentials) { ... }
}
```

### interface 和 type

TypeScript 的 interface/type 本身具有自文档性，仅在语义不明确时添加注释：

```typescript
/**
 * 分页查询参数
 *
 * 用于列表接口的分页请求，page 从 1 开始计数
 */
interface PaginationParams {
  /** 当前页码，从 1 开始 */
  page: number
  /** 每页条数，最大 100 */
  pageSize: number
  /** 排序字段 */
  sortBy?: string
}
```

### enum 和常量

```typescript
/**
 * 订单状态枚举
 *
 * 状态流转：PENDING → PAID → SHIPPED → COMPLETED
 *          PENDING → CANCELLED
 */
enum OrderStatus {
  /** 待支付：订单已创建，等待用户付款 */
  PENDING = 'pending',
  /** 已支付：付款成功，等待商家发货 */
  PAID = 'paid',
  /** 已发货：商家已发货，等待用户确认收货 */
  SHIPPED = 'shipped',
  /** 已完成：用户确认收货 */
  COMPLETED = 'completed',
  /** 已取消：用户主动取消或超时未支付 */
  CANCELLED = 'cancelled',
}

/** 请求超时时间（毫秒），与后端网关超时配置保持一致 */
const REQUEST_TIMEOUT = 30000
```

## 常用标签参考

| 标签          | 用途       | 示例                              |
| ------------- | ---------- | --------------------------------- |
| `@deprecated` | 标记已废弃 | `@deprecated 使用 newMethod 替代` |
| `@see`        | 关联参考   | `@see https://docs.example.com`   |
| `@since`      | 引入版本   | `@since v2.1.0`                   |
| `@todo`       | 待办事项   | `@todo 支持批量操作`              |
| `@template`   | 泛型参数   | `@template T - 列表项类型`        |

泛型函数示例：

```typescript
/**
 * 根据指定字段对列表去重
 * @template T - 列表项类型
 * @param list - 原始列表
 * @param key - 用于判断重复的字段名
 * @returns 去重后的列表
 */
function uniqueBy<T>(list: T[], key: keyof T): T[] { ... }
```

## Vue 组件注释

### Vue 3（script setup）

`<script setup>` 中的编译器宏无需逐个注释，在组件顶部用一段注释说明组件职责即可：

```vue
<script setup lang="ts">
/**
 * 商品卡片
 *
 * 用于商品列表页和推荐区域的商品展示
 */

// Props 和 Emits 定义
const props = defineProps<{
  /** 商品唯一标识 */
  id: string
  /** 商品标题 */
  title: string
  /** 价格（分） */
  price: number
}>()

const emit = defineEmits<{
  /** 用户点击加购按钮时触发 */
  addToCart: [id: string, quantity: number]
}>()
</script>
```

### Vue 2（Options API）

组件导出对象使用顶部 JSDoc 说明组件职责，各选项按需注释：

```javascript
/**
 * 商品卡片组件
 *
 * 用于商品列表页和推荐区域的商品展示
 */
export default {
  name: 'ProductCard',

  props: {
    /** 商品唯一标识 */
    id: { type: String, required: true },
    /** 商品标题 */
    title: { type: String, required: true },
    /** 价格（分） */
    price: { type: Number, required: true },
  },

  data() {
    return {
      /** 当前选择的数量 */
      quantity: 1,
    }
  },

  computed: {
    /** 格式化后的价格（元），保留两位小数 */
    formattedPrice() {
      return (this.price / 100).toFixed(2)
    },
  },

  methods: {
    /**
     * 加入购物车
     * @param {number} qty - 购买数量
     * @fires add-to-cart
     */
    addToCart(qty) {
      this.$emit('add-to-cart', this.id, qty)
    },
  },
}
```

Mixins 需在引入处注释说明混入了哪些能力：

```javascript
import formValidation from '@/mixins/formValidation'

export default {
  // 混入表单校验能力：提供 validate()、resetFields() 方法和 errors 对象
  mixins: [formValidation],
}
```

## 注释标注约定

### 格式规范

```javascript
// TODO(责任人): 待办说明 [可选期限]
// FIXME(责任人): 问题说明
// HACK: 临时方案说明，待 xxx 条件满足后移除
```

### 使用场景

- **TODO**：已知需要补充或优化的点，当前不阻塞功能
- **FIXME**：已知的缺陷或隐患，需要尽快修复
- **HACK**：临时绕过方案，必须说明移除条件

### 示例

```javascript
// TODO(zhangsan): 接入新的支付网关后移除旧逻辑 [2026-Q3]
const gateway = useLegacyGateway()

// FIXME(lisi): 并发场景下可能出现竞态，需加锁
let cachedResult = null

// HACK: Safari 不支持 scrollIntoView 的 behavior 选项，手动实现平滑滚动
element.scrollTop = targetOffset
```
