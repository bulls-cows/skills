# Kotlin 注释规范

适用文件：`.kt`、`.kts`

## 注释语法

- 行注释：`//`
- 块注释：`/* */`
- 文档注释：`/** */`（KDoc）

## KDoc 规范

KDoc 结合了 Javadoc 的标签语法和 Markdown 的内联标记。

### 类

```kotlin
/**
 * 用户认证服务
 *
 * 负责处理登录、登出和会话管理，
 * 支持 JWT 和 Session 两种认证模式。
 */
class AuthService(private val config: Config) {
}
```

### 函数

```kotlin
/**
 * 计算订单折扣金额
 *
 * 根据客户等级和促销码计算最终折扣，
 * 折扣不可叠加，取最大值。
 *
 * @param price 商品原价（元）
 * @param level 客户等级，1-5
 * @param promoCode 促销码，可为 null
 * @return 折扣金额（元），无折扣时返回 0.0
 * @throws IllegalArgumentException 客户等级不在 1-5 范围内
 */
fun calculateDiscount(price: Double, level: Int, promoCode: String? = null): Double {
```

### 属性

```kotlin
/**
 * 当前登录用户的唯一标识符
 */
val currentUserId: String

/** 请求超时时间（毫秒），与后端网关超时配置保持一致 */
const val REQUEST_TIMEOUT = 30000
```

### 枚举

```kotlin
/**
 * 订单状态枚举
 *
 * 状态流转：PENDING → PAID → SHIPPED → COMPLETED
 *          PENDING → CANCELLED
 */
enum class OrderStatus {
    /** 待支付：订单已创建，等待用户付款 */
    PENDING,
    /** 已支付：付款成功，等待商家发货 */
    PAID,
    /** 已发货：商家已发货，等待确认收货 */
    SHIPPED,
    /** 已完成：用户确认收货 */
    COMPLETED,
    /** 已取消：用户主动取消或超时未支付 */
    CANCELLED
}
```

### 泛型

```kotlin
/**
 * 根据指定字段对列表去重
 *
 * @param T 列表项类型
 * @param list 原始列表
 * @param keySelector 用于判断重复的键选择器
 * @return 去重后的列表
 */
fun <T> uniqueBy(list: List<T>, keySelector: (T) -> Any): List<T> {
```

### 数据类

```kotlin
/**
 * 分页查询参数
 *
 * 用于列表接口的分页请求，page 从 1 开始计数
 */
data class PaginationParams(
    /** 当前页码，从 1 开始 */
    val page: Int,
    /** 每页条数，最大 100 */
    val pageSize: Int,
    /** 排序字段 */
    val sortBy: String? = null
)
```

## 常用标签

- `@param`：参数说明
- `@return`：返回值说明
- `@throws`：异常说明，含触发条件
- `@sample`：引用示例函数
- `@see`：关联参考
- `@since`：引入版本
- `@deprecated`：标记已废弃，说明替代方案

## 与 Javadoc 的差异

- KDoc 支持 Markdown 内联标记（如 `[链接]`、`**粗体**`、`代码`）
- 使用 `[类名]` 引用其他类，Dokka 会自动生成链接
- 不支持 Javadoc 的 `{@link}` 语法

## 可空类型

已有可空类型标注时，不重复可空性：

```kotlin
// ❌ 重复可空信息
/** @return 用户对象或 null */

// ✅ 补充业务语义
/** @return 用户完整信息，ID 不存在时返回 null */
fun getUser(userId: String): User?
```

## 避免的注释

```kotlin
// ❌ 重复类型信息
/** @param userId String 类型的用户 ID */

// ❌ 使用 Javadoc 语法
/** {@link AuthService} */

// ❌ 对 trivial getter/setter 加文档注释
```
