# C# 注释规范

适用文件：`.cs`

## 注释语法

- 行注释：`//`
- 块注释：`/* */`
- XML 文档注释：`///`

## XML 文档注释规范

### 类和接口

```csharp
/// <summary>
/// 用户认证服务
/// </summary>
/// <remarks>
/// 负责处理登录、登出和会话管理，
/// 支持 JWT 和 Session 两种认证模式。
/// </remarks>
public class AuthService
{
}
```

### 方法

```csharp
/// <summary>
/// 使用凭证登录并返回会话令牌
/// </summary>
/// <param name="credentials">包含用户名和密码的凭证对象</param>
/// <returns>会话令牌字符串</returns>
/// <exception cref="AuthException">凭证无效或账户被锁定时抛出</exception>
public string Login(Credentials credentials)
{
}
```

### 属性

```csharp
/// <summary>
/// 当前登录用户的唯一标识符
/// </summary>
public string CurrentUserId { get; set; }
```

### 枚举

```csharp
/// <summary>
/// 订单状态枚举
/// </summary>
/// <remarks>
/// 状态流转：Pending → Paid → Shipped → Completed
///          Pending → Cancelled
/// </remarks>
public enum OrderStatus
{
    /// <summary>待支付：订单已创建，等待用户付款</summary>
    Pending,
    /// <summary>已支付：付款成功，等待商家发货</summary>
    Paid,
    /// <summary>已发货：商家已发货，等待用户确认收货</summary>
    Shipped,
    /// <summary>已完成：用户确认收货</summary>
    Completed,
    /// <summary>已取消：用户主动取消或超时未支付</summary>
    Cancelled
}
```

### 泛型

```csharp
/// <summary>
/// 根据指定字段对列表去重
/// </summary>
/// <typeparam name="T">列表项类型</typeparam>
/// <param name="list">原始列表</param>
/// <param name="keySelector">用于判断重复的键选择器</param>
/// <returns>去重后的列表</returns>
public static List<T> UniqueBy<T>(List<T> list, Func<T, object> keySelector)
{
}
```

## 常用标签

- `<summary>`：简要说明（必填）
- `<param>`：参数说明，`name` 属性对应参数名
- `<returns>`：返回值说明
- `<exception>`：异常说明，`cref` 属性指定异常类型
- `<remarks>`：补充说明
- `<example>`：使用示例
- `<seealso>`：关联参考
- `<typeparam>`：泛型类型参数说明
- `<value>`：属性值说明
- `<deprecated>`：标记已废弃

## 可空引用类型

启用可空引用类型时，不重复标注可空性：

```csharp
// ❌ 重复可空标注
/// <returns>用户对象，可能为 null</returns>
public User? GetUser(string userId)

// ✅ 补充业务语义
/// <returns>用户完整信息，ID 不存在时返回 null</returns>
public User? GetUser(string userId)
```

## 事件和委托

```csharp
/// <summary>
/// 订单状态变更事件
/// </summary>
/// <param name="sender">触发事件的对象</param>
/// <param name="e">包含新旧状态的事件参数</param>
public event EventHandler<OrderStatusChangedEventArgs> OrderStatusChanged;
```

## 避免的注释

```csharp
// ❌ 重复类型信息
/// <param name="userId">string 类型的用户 ID</param>
/// <returns>User 对象</returns>

// ❌ 空的 summary
/// <summary>
///
/// </summary>
```
