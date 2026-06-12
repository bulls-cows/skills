# Python 注释规范

适用文件：`.py`、`.pyw`

## 注释语法

- 行注释：`#`
- 文档字符串（docstring）：三引号 `"""` 或 `'''`

## Docstring 规范

遵循 PEP 257。

### 模块 docstring

位于文件顶部（shebang 和模块注释之后），说明模块用途：

```python
"""订单处理模块

提供订单的创建、查询、更新和取消功能，
与支付网关和库存系统交互。
"""
```

### 类 docstring

说明类的用途和关键行为：

```python
class OrderProcessor:
    """订单处理器

    负责订单生命周期的状态流转，
    包括创建、支付确认、发货和完成。
    """

    def __init__(self, config):
        """初始化处理器

        Args:
            config: 包含支付网关和仓库接口配置的字典
        """
```

### 函数/方法 docstring

使用 Google 风格（默认），项目已有 NumPy 或 Sphinx 风格时保持一致：

```python
def calculate_discount(price, customer_level, promo_code=None):
    """计算订单折扣金额

    根据客户等级和促销码计算最终折扣，
    折扣不可叠加，取最大值。

    Args:
        price: 商品原价（元）
        customer_level: 客户等级，1-5
        promo_code: 促销码，可选

    Returns:
        折扣金额（元），无折扣时返回 0

    Raises:
        ValueError: 客户等级不在 1-5 范围内
    """
```

NumPy 风格示例（项目已使用时遵循）：

```python
def calculate_discount(price, customer_level, promo_code=None):
    """计算订单折扣金额

    根据客户等级和促销码计算最终折扣，
    折扣不可叠加，取最大值。

    Parameters
    ----------
    price : float
        商品原价（元）
    customer_level : int
        客户等级，1-5
    promo_code : str, optional
        促销码

    Returns
    -------
    float
        折扣金额（元），无折扣时返回 0

    Raises
    ------
    ValueError
        客户等级不在 1-5 范围内
    """
```

### 类型提示与 docstring

已有类型提示时，docstring 不重复类型信息，只补充业务语义：

```python
# ❌ 重复类型信息
def get_user(user_id: str) -> User | None:
    """获取用户

    Args:
        user_id (str): 用户 ID 字符串

    Returns:
        User | None: 用户对象或 None
    """

# ✅ 补充业务语义
def get_user(user_id: str) -> User | None:
    """根据用户 ID 获取用户信息

    Args:
        user_id: 用户唯一标识符

    Returns:
        用户完整信息，不存在则返回 None
    """
```

### 单行 docstring

简单函数可使用单行 docstring，以句号结尾：

```python
def is_valid_email(email: str) -> bool:
    """检查邮箱地址格式是否合法。"""
```

## 装饰器注释

装饰器上方添加注释说明其用途：

```python
# 限流：同一 IP 每分钟最多 60 次请求
@rate_limit(max_requests=60, window=60)
def handle_request(request):
    ...
```

## 避免的注释

```python
# ❌ 重复函数名含义
# 计算折扣
def calculate_discount(price, level):
    ...

# ❌ 对 self 参数加 docstring
def method(self):
    """方法说明

    Args:
        self: 实例自身
    """
```
