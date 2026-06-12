# Ruby 注释规范

适用文件：`.rb`、`.rake`、`Rakefile`、`Gemfile`

## 注释语法

- 行注释：`#`
- 块注释：`=begin` / `=end`（极少使用，惯例用连续 `#`）
- 文档注释：YARD 格式，放在方法/类定义上方

## YARD 文档注释规范

### 类和模块

```ruby
# 用户认证服务
#
# 负责处理登录、登出和会话管理，
# 支持 JWT 和 Session 两种认证模式。
class AuthService
end
```

### 方法

```ruby
# 计算订单折扣金额
#
# 根据客户等级和促销码计算最终折扣，
# 折扣不可叠加，取最大值。
#
# @param price [Float] 商品原价（元）
# @param level [Integer] 客户等级，1-5
# @param promo_code [String, nil] 促销码，可为 nil
# @return [Float] 折扣金额（元），无折扣时返回 0.0
# @raise [ArgumentError] 客户等级不在 1-5 范围内
def calculate_discount(price, level, promo_code = nil)
end
```

### 属性

```ruby
class User
  # @return [String] 用户唯一标识符
  attr_reader :id

  # @return [String] 用户邮箱
  attr_accessor :email
end
```

### 模块

```ruby
# 可排序功能
#
# 为包含此模块的类提供排序能力，
# 需要实现 <=> 比较方法。
module Sortable
end
```

### 常量

```ruby
# 请求超时时间（毫秒），与后端网关超时配置保持一致
REQUEST_TIMEOUT = 30_000
```

## 常用标签

- `@param`：参数说明，格式 `@param name [Type] 说明`
- `@return`：返回值说明，格式 `@return [Type] 说明`
- `@raise` / `@raise`：异常说明
- `@note`：注意事项
- `@see`：关联参考
- `@since`：引入版本
- `@deprecated`：标记已废弃，说明替代方案
- `@example`：使用示例

```ruby
# @deprecated 使用 {#login_with_token} 替代
# @since v1.2.0
def login(username, password)
end
```

### 示例标签

```ruby
# 格式化金额
#
# @example 基本用法
#   format_amount(99.5)  #=> "¥99.50"
#
# @param amount [Float] 金额
# @return [String] 格式化后的金额字符串
def format_amount(amount)
end
```

### 块参数

```ruby
# 遍历订单并收集结果
#
# @yield [order] 当前遍历的订单对象
# @yieldparam order [Order] 订单对象
# @yieldreturn [Object] 块的返回值
# @return [Array] 块返回值的数组
def each_order
end
```

## Sorbet / RBS 类型标注

已使用 Sorbet 或 RBS 类型标注时，文档注释不重复类型信息：

```ruby
# ❌ 重复类型信息
# @param user_id [String] 用户 ID

# ✅ 补充业务语义
# @param user_id 用户唯一标识符
sig { params(user_id: String).returns(T.nilable(User)) }
def get_user(user_id)
end
```

## 避免的注释

```ruby
# ❌ 重复方法名含义
# calculate_discount
def calculate_discount(price, level)
end

# ❌ 对显而易见的代码加注释
# 返回 true
true

# ❌ 使用 =begin/=end 块注释
```
