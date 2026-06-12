# Rust 注释规范

适用文件：`.rs`

## 注释语法

- 行注释：`//`
- 块注释：`/* */`
- 外部文档注释：`///`（作用于紧随其后的项）
- 内部文档注释：`//!`（作用于包含它的项，通常用于模块和 crate）

## 文档注释规范

rustdoc 支持完整的 Markdown 语法。

### 模块和 crate 文档

使用 `//!`，通常放在 `lib.rs` 或 `mod.rs` 顶部：

```rust
//! 订单处理模块
//!
//! 提供订单的创建、支付、发货和售后功能，
//! 与支付网关和库存系统交互。
```

### 结构体和枚举

```rust
/// 订单处理器
///
/// 负责订单生命周期的状态流转，
/// 包括创建、支付确认、发货和完成。
pub struct OrderProcessor {
    /// 当前待处理订单数
    order_count: usize,
}

/// 订单状态枚举
///
/// 状态流转：Pending → Paid → Shipped → Completed
///          Pending → Cancelled
pub enum OrderStatus {
    /// 待支付：订单已创建，等待用户付款
    Pending,
    /// 已支付：付款成功，等待商家发货
    Paid,
    /// 已发货：商家已发货，等待确认收货
    Shipped,
    /// 已完成：用户确认收货
    Completed,
    /// 已取消：用户主动取消或超时未支付
    Cancelled,
}
```

### 函数

````rust
/// 计算订单折扣金额
///
/// 根据客户等级和促销码计算最终折扣，
/// 折扣不可叠加，取最大值。
///
/// # Examples
///
/// ```
/// let discount = calculate_discount(100.0, 3, Some("SUMMER"));
/// assert!(discount > 0.0);
/// ```
///
/// # Panics
///
/// 当客户等级不在 1-5 范围内时 panic。
pub fn calculate_discount(price: f64, level: u32, promo_code: Option<&str>) -> f64 {
````

### 标准章节

按需使用以下标准章节，顺序建议如下：

- `# Examples`：使用示例，含代码块
- `# Panics`：可能 panic 的条件
- `# Errors`：返回 `Result` 时说明可能的错误
- `# Safety`：使用 `unsafe` 时必须说明安全前提
- `# Guarantees`：对外保证的行为约束

```rust
/// 读取文件内容
///
/// # Errors
///
/// 当文件不存在或权限不足时返回 `io::Error`。
///
/// # Panics
///
/// 当路径包含非法 UTF-8 字符时 panic。
pub fn read_file(path: &Path) -> io::Result<String> {
```

### unsafe 代码

`unsafe` 块必须在文档注释的 `# Safety` 章节说明安全前提：

```rust
/// # Safety
///
/// 调用方必须确保 `ptr` 指向有效且对齐的 `u32` 值，
/// 且在读取期间不会被其他线程修改。
unsafe fn read_u32(ptr: *const u32) -> u32 {
```

### 类型参数

泛型参数在描述中说明约束和用途：

```rust
/// 根据指定字段对列表去重
///
/// 类型参数 `T` 为列表项类型，`K` 为键类型。
pub fn unique_by<T, K>(list: &[T], key_fn: impl Fn(&T) -> K) -> Vec<T>
where
    K: Eq + Hash,
{
```

### 常量和静态变量

```rust
/// 请求超时时间（毫秒），与后端网关超时配置保持一致
pub const REQUEST_TIMEOUT: u64 = 30000;
```

## 避免的注释

```rust
// ❌ 重复类型信息
/// 返回 f64 类型的折扣金额

// ❌ 不用标准章节名而用自由格式
/// 会 panic：等级超出范围
// ✅ 应使用 # Panics 章节

// ❌ 对内部实现细节写外部文档注释
// 内部逻辑用普通 // 注释即可
```
