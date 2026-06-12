# Java 注释规范

适用文件：`.java`

## 注释语法

- 行注释：`//`
- 块注释：`/* */`
- 文档注释：`/** */`

## Javadoc 规范

### 类和接口

```java
/**
 * 用户认证服务
 *
 * <p>负责处理登录、登出和会话管理，
 * 支持 JWT 和 Session 两种认证模式。
 */
public class AuthService {
}
```

### 方法

```java
/**
 * 使用凭证登录并返回会话令牌
 *
 * @param credentials 包含用户名和密码的凭证对象
 * @return 会话令牌字符串
 * @throws AuthException 凭证无效或账户被锁定时抛出
 */
public String login(Credentials credentials) throws AuthException {
}
```

### 字段

简短说明使用单行 Javadoc：

```java
/** 请求超时时间（毫秒），与后端网关超时配置保持一致 */
private static final int REQUEST_TIMEOUT = 30000;
```

### 枚举

枚举类加类级文档，每个常量加行内注释：

```java
/**
 * 订单状态枚举
 *
 * <p>状态流转：PENDING → PAID → SHIPPED → COMPLETED
 *              PENDING → CANCELLED
 */
public enum OrderStatus {
    /** 待支付：订单已创建，等待用户付款 */
    PENDING,
    /** 已支付：付款成功，等待商家发货 */
    PAID,
    /** 已发货：商家已发货，等待用户确认收货 */
    SHIPPED,
    /** 已完成：用户确认收货 */
    COMPLETED,
    /** 已取消：用户主动取消或超时未支付 */
    CANCELLED
}
```

## 常用标签

- `@param`：参数说明，不写参数类型（声明中已有）
- `@return`：返回值说明，无返回值时不写
- `@throws` / `@exception`：异常说明，含触发条件
- `@deprecated`：标记已废弃，说明替代方案
- `@see`：关联参考（类、方法或 URL）
- `@since`：引入版本

```java
/**
 * @deprecated 使用 {@link #loginWithToken(String)} 替代，自 v2.0 起废弃
 */
@Deprecated
public String login(String username, String password) {
}
```

## 覆写方法

覆写方法不加 Javadoc，除非行为与父类不同：

```java
// ❌ 无意义地重复父类文档
/** {@inheritDoc} */
@Override
public String toString() {

// ✅ 行为不同时才补充
/**
 * 自定义 toString，脱敏后输出用户信息，
 * 密码和手机号字段以星号替代。
 */
@Override
public String toString() {
```

## 包文档

通过 `package-info.java` 为包添加文档：

```java
/**
 * 订单处理模块
 *
 * <p>提供订单的创建、支付、发货和售后功能。
 */
package com.example.order;
```

## 避免的注释

```java
// ❌ 重复声明中的类型信息
/**
 * @param userId 用户 ID，String 类型
 * @return User 对象
 */

// ❌ 无意义的 @return
/**
 * @return true 或 false
 */
```
