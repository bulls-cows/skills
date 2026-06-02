# 输出示例

本文档展示制定计划后的预期输出示例。

## 示例 1：方案方向输出（步骤 4）

```markdown
## 方案方向

**目标**：实现基于 JWT 令牌的用户认证
**方法**：使用 JWT 进行无状态认证，access token 短期有效，refresh token 长期有效
**涉及范围**：src/auth/、src/middleware/

**待确认点**：

- token 存储位置：localStorage 还是 cookie？

---

请确认方向是否正确，或提出调整意见。
```

## 示例 2：简单需求计划输出

对于简单需求，直接在对话中输出计划：

```markdown
## 计划

**目标**：添加日期格式化函数

**步骤**：

1. 在 `src/utils/format.ts` 中添加 `formatDate` 函数
2. 添加单元测试

**涉及文件**：src/utils/format.ts（修改）、src/utils/format.test.ts（新增）

---

请确认是否执行此计划。
```

## 示例 3：复杂需求计划文件输出

计划文件路径：`.claude/plans/20260324_153045_用户认证系统.md`

计划文件内容：

````text
# 用户认证系统 实施计划

## 目标

实现基于 JWT 令牌的用户认证功能，包含登录、登出、token 刷新。

## 方法

使用 JWT 进行无状态认证，access token 短期有效，refresh token 长期有效。

## 步骤

1. 创建 token 生成和验证工具（`src/auth/token.ts`，新增）
2. 实现登录接口（`src/auth/login.ts`，新增）
3. 实现登出接口（`src/auth/logout.ts`，新增）
4. 添加认证中间件（`src/middleware/auth.ts`，新增）
5. 实现 token 刷新机制（`src/auth/refresh.ts`，新增）

## 涉及文件

- `src/auth/token.ts`：新增，Token 生成和验证
- `src/auth/login.ts`：新增，登录接口
- `src/auth/logout.ts`：新增，登出接口
- `src/middleware/auth.ts`：新增，认证中间件
- `src/auth/refresh.ts`：新增，Token 刷新

## 风险与应对

- Token 过期处理：添加 refresh token 机制
- 并发请求竞态：添加请求队列

## 代码示例

```typescript
function generateToken(userId: string): string {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '7d' });
}
```

````

## 示例 4：执行中计划偏移输出

```markdown
## 计划偏移

**偏差**：执行步骤 2 时发现现有接口结构与计划假设不同

**调整方案**：步骤 2 改为先适配现有接口结构，再封装认证逻辑

**影响范围**：步骤 2、步骤 4

---

请确认是否按调整方案继续。
```
