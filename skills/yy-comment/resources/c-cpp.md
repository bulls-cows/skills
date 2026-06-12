# C/C++ 注释规范

适用文件：`.c`、`.cpp`、`.h`、`.hpp`、`.cc`、`.cxx`、`.hxx`

## 注释语法

- 行注释：`//`（C99 及以上、C++）
- 块注释：`/* */`
- 文档注释：Doxygen 风格 `///` 或 `/** */`

## Doxygen 文档注释

### 文件头注释

```cpp
/**
 * @file order_processor.cpp
 * @brief 订单处理器实现
 *
 * 处理订单的状态流转，包括创建、支付确认和发货。
 */
```

### 函数

```cpp
/**
 * @brief 计算订单折扣金额
 *
 * 根据客户等级和促销码计算最终折扣，
 * 折扣不可叠加，取最大值。
 *
 * @param price 商品原价（元）
 * @param level 客户等级，1-5
 * @param promo_code 促销码，可为 NULL
 * @return 折扣金额（元），无折扣时返回 0
 * @throws 无（使用返回值表示错误）
 */
double calculate_discount(double price, int level, const char* promo_code);
```

### 类和结构体

```cpp
/**
 * @brief 订单处理器
 *
 * 负责订单生命周期的状态流转，
 * 包括创建、支付确认、发货和完成。
 */
class OrderProcessor {
public:
    /**
     * @brief 初始化处理器
     * @param config 包含支付网关和仓库接口配置
     */
    explicit OrderProcessor(const Config& config);

private:
    int order_count_;  ///< 当前待处理订单数
};
```

成员变量使用行尾 `///<` 注释：

```cpp
struct Point {
    double x;  ///< 横坐标
    double y;  ///< 纵坐标
};
```

### 模板和泛型

```cpp
/**
 * @brief 根据指定字段对列表去重
 *
 * @tparam T 列表项类型
 * @tparam KeyExtractor 提取键值的函数对象类型
 * @param list 原始列表
 * @param key_extractor 从项中提取用于判断重复的键值
 * @return 去重后的列表
 */
template<typename T, typename KeyExtractor>
std::vector<T> unique_by(const std::vector<T>& list, KeyExtractor key_extractor);
```

### 宏定义

```cpp
/** 请求超时时间（毫秒），与后端网关超时配置保持一致 */
#define REQUEST_TIMEOUT 30000
```

### 枚举

```cpp
/**
 * @brief 订单状态枚举
 *
 * 状态流转：PENDING → PAID → SHIPPED → COMPLETED
 *          PENDING → CANCELLED
 */
enum OrderStatus {
    ORDER_PENDING,    ///< 待支付
    ORDER_PAID,       ///< 已支付
    ORDER_SHIPPED,    ///< 已发货
    ORDER_COMPLETED,  ///< 已完成
    ORDER_CANCELLED   ///< 已取消
};
```

## 常用标签

- `@brief`：简要说明
- `@param`：参数说明
- `@return` / `@returns`：返回值说明
- `@tparam`：模板参数说明
- `@throws` / `@exception`：异常说明
- `@note`：注意事项
- `@warning`：警告信息
- `@see`：关联参考
- `@deprecated`：标记已废弃

## 头文件与实现文件

- 头文件中声明处写文档注释
- 实现文件中不重复文档注释，仅在实现逻辑复杂时添加内部注释

## 避免的注释

```cpp
// ❌ 重复类型信息
/**
 * @param userId 用户 ID，string 类型
 * @return User 对象指针
 */

// ❌ 在实现文件中重复声明处的文档注释
```
