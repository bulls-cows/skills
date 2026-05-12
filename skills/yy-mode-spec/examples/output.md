# 输出示例

本文档展示制定规格后的预期输出示例。

## 示例 1：简单需求输出

对于简单需求，直接在对话中输出规格摘要：

**输出内容**：

```text
## 规格摘要

### 功能概述

为用户列表页面添加批量删除功能。

### 需求

- FR-01：支持多选用户记录
- FR-02：支持一键删除选中记录
- FR-03：删除前显示确认对话框

### 涉及文件

- `src/views/UserList.vue`：添加多选和批量删除按钮
- `src/api/user.ts`：添加批量删除接口调用

### 核心代码示例

// src/api/user.ts
export function batchDeleteUsers(ids: string[]): Promise<void> {
  return request.delete('/api/users/batch', { data: { ids } });
}

// src/views/UserList.vue 核心变更
<el-table :data="userList" @selection-change="handleSelectionChange">
  <el-table-column type="selection" width="55" />
</el-table>
<el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
  批量删除 ({{ selectedIds.length }})
</el-button>

---

请确认是否执行此规格。
```

---

## 示例 2：复杂需求输出

对于复杂需求，创建规格文件并展示路径：

**输出内容**：

```text
## 规格已创建

**规格目录**：`.claude/specs/20260324_153045_用户认证系统/`

### 规格摘要

实现基于 JWT 令牌的用户认证功能，包含登录、登出、token 刷新。

### 任务概览

- 阶段一：基础设施（2 个任务）
- 阶段二：核心功能（2 个任务）
- 总计：4 个任务

---

请确认是否执行此规格。
```

---

## 示例 3：规格文件内容

### spec.md 内容

```text
# 用户认证系统 规格说明书

## 1. 功能概述

实现基于 JWT 令牌的用户认证功能，包含登录、登出、token 刷新。

## 2. 需求分析

### 2.1 功能性需求

| 需求ID | 描述 | 优先级 | 验收条件 |
|--------|------|--------|----------|
| FR-01 | 用户登录功能 | P0 | 能正确验证用户名密码 |
| FR-02 | Token 刷新 | P1 | 过期前自动刷新 |

### 2.2 非功能性需求

| 需求ID | 描述 | 指标 |
|--------|------|------|
| NFR-01 | 性能 | 响应时间 < 200ms |
| NFR-02 | 安全 | 密码加密存储 |

## 3. 技术设计

### 3.1 API 规格

| 方法 | 路径 | 请求 | 响应 |
|------|------|------|------|
| POST | /api/auth/login | {username, password} | {token, expiresIn} |

### 3.2 数据模型

interface User {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: Date;
}

### 3.3 核心代码示例

// JWT 工具类核心方法
class JwtService {
  generateToken(user: User): string {
    return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: '7d',
    });
  }

  verifyToken(token: string): UserPayload | null {
    try {
      return jwt.verify(token, SECRET_KEY) as UserPayload;
    } catch {
      return null;
    }
  }
}

// 登录接口核心逻辑
async function login(username: string, password: string) {
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new Error('用户名或密码错误');
  }
  return { token: jwtService.generateToken(user), expiresIn: 604800 };
}
```

### tasks.md 内容

```text
# 用户认证系统 任务分解

## 任务列表

### 阶段一：基础设施

| 任务ID | 描述 | 依赖 | 预估复杂度 | 验收标准 |
|--------|------|------|------------|----------|
| T-01 | 安装 jsonwebtoken | - | 低 | package.json 包含依赖 |
| T-02 | 创建 JWT 工具类 | T-01 | 中 | 单元测试通过 |

### 阶段二：核心功能

| 任务ID | 描述 | 依赖 | 预估复杂度 | 验收标准 |
|--------|------|------|------------|----------|
| T-03 | 实现登录接口 | T-02 | 中 | 返回有效 Token |
| T-04 | 实现验证中间件 | T-02 | 高 | 正确拦截未授权请求 |

## 任务依赖图

T-01 → T-02 → T-03
            ↘ T-04
```

### checklist.md 内容

```text
# 用户认证系统 验证清单

## 实施前检查

- [ ] 代码评审通过
- [ ] 测试用例编写完成
- [ ] 开发环境就绪

## 实施中检查

- [ ] 每个任务完成后更新任务状态
- [ ] 遇到阻塞及时升级

## 实施后验证

- [ ] 所有任务完成
- [ ] 单元测试覆盖率 > 70%
- [ ] API 文档已更新
- [ ] 集成测试通过

## 质量门禁

- [ ] lint 检查通过
- [ ] TypeScript 编译无错误
- [ ] 安全扫描通过
```
