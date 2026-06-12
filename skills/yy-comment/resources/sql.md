# SQL 注释规范

适用文件：`.sql`

## 注释语法

- 行注释：`--`
- 块注释：`/* */`

部分数据库方言支持 `#` 行注释（MySQL、MariaDB），但 `--` 是 SQL 标准语法，优先使用。

## 查询文档注释

### 复杂查询

对多表关联、子查询嵌套或业务含义不直观的查询添加注释：

```sql
-- 查询过去 30 天内未下单的活跃用户，用于流失预警
-- 活跃用户定义：最近 90 天内至少登录 3 次
SELECT
    u.id,
    u.name,
    u.last_login_at
FROM users u
WHERE u.status = 'active'
    -- 排除最近 30 天内有订单的用户
    AND u.id NOT IN (
        SELECT DISTINCT user_id
        FROM orders
        WHERE created_at >= NOW() - INTERVAL '30 days'
    )
    -- 活跃用户筛选：90 天内登录 >= 3 次
    AND u.id IN (
        SELECT user_id
        FROM login_logs
        WHERE login_at >= NOW() - INTERVAL '90 days'
        GROUP BY user_id
        HAVING COUNT(*) >= 3
    );
```

### 关键条件

对非直观的 WHERE 条件添加行内注释：

```sql
WHERE
    o.status = 'paid'
    -- 减去已退款金额，得到实际收入
    AND o.amount > COALESCE(o.refund_amount, 0)
```

## DDL 注释

### 表和列注释

优先使用数据库原生的 COMMENT 语法：

```sql
CREATE TABLE orders (
    id          BIGINT PRIMARY KEY COMMENT '订单唯一标识',
    user_id     BIGINT NOT NULL COMMENT '下单用户 ID',
    amount      DECIMAL(10,2) NOT NULL COMMENT '订单金额（元）',
    refund_amount DECIMAL(10,2) DEFAULT 0 COMMENT '已退款金额（元）',
    status      VARCHAR(20) NOT NULL COMMENT '订单状态：pending/paid/shipped/completed/cancelled',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) COMMENT = '订单表';
```

不支持 COMMENT 语法的数据库，使用 SQL 注释：

```sql
-- 订单表：记录用户订单信息
CREATE TABLE orders (
    id          BIGINT PRIMARY KEY,  -- 订单唯一标识
    user_id     BIGINT NOT NULL,     -- 下单用户 ID
    amount      DECIMAL(10,2),       -- 订单金额（元）
    status      VARCHAR(20)          -- 订单状态：pending/paid/shipped/completed/cancelled
);
```

### 视图

```sql
-- 活跃用户视图：最近 90 天内至少登录 3 次的用户
CREATE VIEW active_users AS
SELECT * FROM users
WHERE last_login_at >= CURRENT_DATE - INTERVAL '90 days';
```

### 存储过程和函数

```sql
-- 计算指定用户的累计消费金额
-- 参数：p_user_id - 用户 ID
-- 返回：累计消费金额（元），无消费记录时返回 0
CREATE FUNCTION get_total_spending(p_user_id BIGINT)
RETURNS DECIMAL(10,2)
AS $$
BEGIN
    -- ...
END;
$$ LANGUAGE plpgsql;
```

## 区块分隔

对较长的 SQL 脚本，使用注释分隔逻辑区块：

```sql
/* ========== 初始化基础数据 ========== */

INSERT INTO roles (name) VALUES ('admin');
INSERT INTO roles (name) VALUES ('user');

/* ========== 创建默认管理员 ========== */

INSERT INTO users (name, role_id)
SELECT 'admin', id FROM roles WHERE name = 'admin';
```

## 避免的注释

```sql
-- ❌ 重复列名含义
SELECT id,    -- id
       name   -- name
FROM users;

-- ❌ 对显而易见的条件加注释
-- 等于 1
WHERE status = 1

-- ❌ 对简单查询加注释
-- 查询所有用户
SELECT * FROM users;
```
