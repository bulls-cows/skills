# PHP 注释规范

适用文件：`.php`、`.phtml`

## 注释语法

- 行注释：`//` 或 `#`
- 块注释：`/* */`
- 文档注释：`/** */`（PHPDoc）

## PHPDoc 规范

### 类

```php
/**
 * 用户认证服务
 *
 * 负责处理登录、登出和会话管理，
 * 支持 JWT 和 Session 两种认证模式。
 */
class AuthService
{
}
```

### 方法

```php
/**
 * 计算订单折扣金额
 *
 * 根据客户等级和促销码计算最终折扣，
 * 折扣不可叠加，取最大值。
 *
 * @param float $price 商品原价（元）
 * @param int $level 客户等级，1-5
 * @param string|null $promoCode 促销码，可为 null
 * @return float 折扣金额（元），无折扣时返回 0.0
 * @throws \InvalidArgumentException 客户等级不在 1-5 范围内
 */
public function calculateDiscount(float $price, int $level, ?string $promoCode = null): float
{
}
```

### 属性

```php
class User
{
    /** @var string 用户唯一标识符 */
    private string $id;

    /** @var int 请求超时时间（毫秒），与后端网关超时配置保持一致 */
    public const REQUEST_TIMEOUT = 30000;
}
```

### 枚举（PHP 8.1+）

```php
/**
 * 订单状态枚举
 *
 * 状态流转：Pending → Paid → Shipped → Completed
 *          Pending → Cancelled
 */
enum OrderStatus: string
{
    /** 待支付：订单已创建，等待用户付款 */
    case Pending = 'pending';
    /** 已支付：付款成功，等待商家发货 */
    case Paid = 'paid';
    /** 已发货：商家已发货，等待确认收货 */
    case Shipped = 'shipped';
    /** 已完成：用户确认收货 */
    case Completed = 'completed';
    /** 已取消：用户主动取消或超时未支付 */
    case Cancelled = 'cancelled';
}
```

## 常用标签

- `@param`：参数说明，格式 `@param Type $name 说明`
- `@return`：返回值说明，格式 `@return Type 说明`
- `@throws`：异常说明，格式 `@throws Type 说明`
- `@var`：属性/常量类型说明
- `@property`：魔术属性说明
- `@method`：魔术方法说明
- `@see`：关联参考
- `@since`：引入版本
- `@deprecated`：标记已废弃，说明替代方案
- `@template`：泛型参数说明

```php
/**
 * @deprecated 使用 loginWithToken() 替代，自 v2.0 起废弃
 */
public function login(string $username, string $password): string
{
}
```

## 类型声明与 PHPDoc

PHP 7.4+ 支持类型声明时，PHPDoc 不重复类型信息：

```php
// ❌ 重复类型信息
/**
 * @param string $userId 字符串类型的用户 ID
 * @return User|null 用户对象或 null
 */
public function getUser(string $userId): ?User

// ✅ 补充业务语义
/**
 * 根据用户 ID 获取用户信息
 *
 * @param string $userId 用户唯一标识符
 * @return User|null 用户完整信息，ID 不存在时返回 null
 */
public function getUser(string $userId): ?User
```

当类型声明已完整表达时，可省略 `@param` 和 `@return`，只保留描述：

```php
/**
 * 根据用户 ID 获取用户信息
 */
public function getUser(string $userId): ?User
```

## 避免的注释

```php
// ❌ 重复类型信息
/** @param string $name */

// ❌ 无意义的文档注释
/** 构造函数 */
public function __construct()

// ❌ 对每个方法都写 @return void
```
