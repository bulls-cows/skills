# Go 注释规范

适用文件：`.go`

## 注释语法

- 行注释：`//`（Go 只有行注释，无块注释语法，`/* */` 存在但惯例使用 `//`）
- 文档注释：紧邻声明上方的 `//` 注释，会被 godoc 提取

## 文档注释规范

Go 没有正式的文档标签格式，遵循 godoc 惯例。

### 包文档

在包的第一个文件中，`package` 语句上方写包文档。也可以使用 `doc.go` 文件集中放置包文档：

```go
// Package order 提供订单的创建、支付、发货和售后功能。
//
// 订单状态流转：
//   Pending → Paid → Shipped → Completed
//   Pending → Cancelled
package order
```

首句以 `Package 包名` 开头，这是 godoc 的约定。

### 导出函数

文档注释的首句应以函数名开头：

```go
// CalculateDiscount 根据客户等级和促销码计算折扣金额。
// 折扣不可叠加，取最大值。
//
// price 为商品原价（元），level 为客户等级（1-5），
// promoCode 为促销码，可为空字符串。
// 返回折扣金额（元），无折扣时返回 0。
func CalculateDiscount(price float64, level int, promoCode string) float64 {
```

### 导出类型

```go
// OrderProcessor 负责订单生命周期的状态流转，
// 包括创建、支付确认、发货和完成。
type OrderProcessor struct {
    orderCount int // 当前待处理订单数
}
```

导出字段的注释放在同一行或上方：

```go
type Config struct {
    // Timeout 是请求超时时间（毫秒），与后端网关超时配置保持一致。
    Timeout int
}
```

### 接口

```go
// PaymentGateway 定义支付网关的统一接口，
// 所有支付渠道必须实现此接口。
type PaymentGateway interface {
    // Charge 执行扣款，返回交易 ID。
    Charge(amount float64, currency string) (string, error)
}
```

### 导出常量和变量

```go
// RequestTimeout 是请求超时时间（毫秒），与后端网关超时配置保持一致。
const RequestTimeout = 30000
```

### 枚举模式（iota）

```go
// OrderStatus 表示订单状态。
type OrderStatus int

const (
    // OrderPending 是待支付状态：订单已创建，等待用户付款。
    OrderPending OrderStatus = iota
    // OrderPaid 是已支付状态：付款成功，等待商家发货。
    OrderPaid
    // OrderShipped 是已发货状态：商家已发货，等待确认收货。
    OrderShipped
    // OrderCompleted 是已完成状态：用户确认收货。
    OrderCompleted
    // OrderCancelled 是已取消状态：用户主动取消或超时未支付。
    OrderCancelled
)
```

## Bug 文档

使用 `BUG(who)` 格式记录已知问题，godoc 会单独提取：

```go
// BUG(yakima): 并发场景下可能出现竞态，需加锁
```

## Deprecated 标记

```go
// Deprecated: 使用 LoginWithToken 替代，自 v2.0 起废弃。
func Login(username, password string) (string, error) {
```

## 避免的注释

```go
// ❌ 首句不以声明的名称开头
// 这个函数计算折扣
func CalculateDiscount(price float64, level int) float64 {

// ❌ 重复参数类型
// price float64 - 商品原价

// ❌ 对未导出的符号写文档注释（godoc 不会提取）
```
