# 定制版 Conventional Commits 规范

本文件是 `yy-commit` 技能在通用 Conventional Commits 基础上的定制版规范，在保留通用基础格式与 type 类型的同时，覆盖本仓库特有的 Scope、Description 与 Body 要求。仅在项目未定义自有提交规范时使用本规范作为兜底。

## 基础格式

```text
<type>(<scope>): <description>

<body>
```

- `type`：必填，标识改动性质
- `scope`：可选，标识受影响的模块或功能区域
- `description`：必填，简短描述本次改动
- `body`：可选，进一步说明做了什么、为什么这么做

## Type（类型）

**前缀风格推断**：检查最近 5 条提交记录（`git log --oneline -5`），若普遍使用中文前缀（如 `功能:`、`重构:`），则使用中文 type；默认使用英文 type。

- `feat` / `功能` - 新功能
- `fix` / `修复` - 修复 bug
- `docs` / `文档` - 文档更新
- `style` / `格式` - 代码格式调整（不影响功能）
- `refactor` / `重构` - 重构（既非新功能也非修复）
- `perf` / `性能` - 性能优化
- `test` / `测试` - 测试相关
- `build` / `构建` - 构建系统或外部依赖变更
- `ci` / `CI` - CI 配置文件和脚本变更
- `chore` / `杂项` - 其他杂项变更（不属于上述类型）
- `revert` / `回滚` - 回滚提交

## Scope（范围）

- 用于标识受影响的模块、组件或功能区域
- 可省略；保留时应能帮助快速定位变更范围
- 优先使用具体的组件/模块名称，而不是泛化的类型名称
  - ✅ `DialogInstallationOptions`（具体组件名）
  - ❌ `dialog`（泛化类型）

## Description（描述）

- 使用中文（代码标识符、专有名词除外）
- 使用动词开头的祈使语气
- 精炼，不超过 50 个字符，一句话
- 句末不加句号
- 优先说明"为什么"或"为了解决什么问题"，而不只是"做了什么"
- 精确性原则：当改动内容不多时，要具体描述变更的细节
- 避免使用"统一"、"所有"等绝对性词汇：基于实际修改的文件来描述

## Body 规范

- body 使用列表形式，每项以 `- ` 开头，一项说明一个关键改动或一个关键原因
- body 默认写 2-4 项，优先概括最有信息量的改动点，不机械罗列所有文件
- **仅在改动极小且无法提炼出第 2 个有效信息点时**：退回为不生成 body
- **用户明确要求"只要标题"或"不要 body"**：按用户要求不生成 body
- body 每项简洁明了，一句话说明一个改动点

## 示例

### ✅ 正确示例

带 body 的完整提交：

```text
feat(auth): 添加 JWT 认证以支持无状态会话管理

移除服务端 session 存储，改用 JWT token 验证，
降低横向扩展时的会话同步开销
```

不带 body 的简洁提交：

```text
fix(utf8-editor): 修复 UTF-8 文件保存乱码导致内容丢失
```

```text
docs(readme): 补充 Node 20 要求以解决安装报错
```

```text
refactor(request-interceptor): 抽离公共拦截器以减少重复逻辑
```

```text
refactor: 重命名 plan/spec 技能避免与 trae 编辑器命令冲突
```

### ❌ 反面示例

```text
feat(auth): 添加 JWT 用户认证功能。
```

- description 句末不应加句号
- 只说明了"做了什么"，未说明"为什么"或"解决什么问题"

```text
fix(editor): 修复文件保存时的编码错误
```

- scope `editor` 是泛化类型名称，应使用具体组件名如 `utf8-editor`

```text
refactor(api): 简化请求拦截器逻辑
```

- scope `api` 是泛化类型名称，应使用具体模块名如 `request-interceptor`
- description 只说明了"做了什么"，未说明"为什么"
