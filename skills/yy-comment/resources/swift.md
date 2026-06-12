# Swift 注释规范

适用文件：`.swift`

## 注释语法

- 行注释：`//`
- 块注释：`/* */`（支持嵌套）
- 文档注释：`///` 或 `/** */`

## 文档注释规范

Swift 文档注释使用 Markdown 格式，不使用 Javadoc 风格标签。

### 类型

```swift
/// 订单处理器
///
/// 负责订单生命周期的状态流转，
/// 包括创建、支付确认、发货和完成。
struct OrderProcessor {
    /// 当前待处理订单数
    var orderCount: Int
}
```

### 函数

使用 `- Parameter`、`- Returns`、`- Throws` 列表项：

```swift
/// 计算订单折扣金额
///
/// 根据客户等级和促销码计算最终折扣，
/// 折扣不可叠加，取最大值。
///
/// - Parameter price: 商品原价（元）
/// - Parameter level: 客户等级，1-5
/// - Parameter promoCode: 促销码，可为 nil
/// - Returns: 折扣金额（元），无折扣时返回 0
/// - Throws: 当客户等级不在 1-5 范围内时抛出 `OrderError`
func calculateDiscount(price: Double, level: Int, promoCode: String?) throws -> Double {
```

多参数时可合并：

```swift
/// - Parameters:
///   - price: 商品原价（元）
///   - level: 客户等级，1-5
///   - promoCode: 促销码，可为 nil
```

### 枚举

```swift
/// 订单状态枚举
///
/// 状态流转：pending → paid → shipped → completed
///          pending → cancelled
enum OrderStatus {
    /// 待支付：订单已创建，等待用户付款
    case pending
    /// 已支付：付款成功，等待商家发货
    case paid
    /// 已发货：商家已发货，等待确认收货
    case shipped
    /// 已完成：用户确认收货
    case completed
    /// 已取消：用户主动取消或超时未支付
    case cancelled
}
```

带关联值的枚举：

```swift
/// 支付结果
enum PaymentResult {
    /// 支付成功
    /// - Parameter transactionId: 交易流水号
    case success(transactionId: String)
    /// 支付失败
    /// - Parameter reason: 失败原因
    case failed(reason: String)
}
```

### 协议

```swift
/// 支付网关协议
///
/// 定义支付渠道的统一接口，
/// 所有支付渠道必须实现此协议。
protocol PaymentGateway {
    /// 执行扣款
    /// - Parameter amount: 扣款金额（元）
    /// - Parameter currency: 货币代码，如 "CNY"
    /// - Returns: 交易流水号
    /// - Throws: 扣款失败时抛出 `PaymentError`
    func charge(amount: Double, currency: String) throws -> String
}
```

### 扩展

```swift
/// 为 OrderProcessor 添加折扣计算能力
extension OrderProcessor {
    /// 计算客户等级对应的折扣率
    func discountRate(for level: Int) -> Double {
```

### 属性

```swift
/// 请求超时时间（毫秒），与后端网关超时配置保持一致
let requestTimeout: TimeInterval = 30
```

## 代码块示例

文档注释中可包含代码块示例：

```swift
/// 格式化金额
///
/// ```swift
/// let formatted = formatAmount(99.5)  // "¥99.50"
/// ```
func formatAmount(_ amount: Double) -> String {
```

## 避免的注释

```swift
// ❌ 使用 Javadoc 风格标签
/// @param price 商品原价

// ❌ 重复类型信息
/// - Returns: Double 类型的折扣金额

// ❌ 对 trivial 属性加文档注释
/// 名称
var name: String
```
