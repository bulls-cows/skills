# Conventional Commits 规范参考

本文件作为 `yy-commit` 技能的通用参考资料，介绍 Conventional Commits 的基础格式与常用 type 类型。仅在项目未定义自有提交规范时使用本规范作为兜底。

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

- `feat` - 新功能
- `fix` - 修复 bug
- `docs` - 文档更新
- `style` - 代码格式调整（不影响功能）
- `refactor` - 重构（既非新功能也非修复）
- `perf` - 性能优化
- `test` - 测试相关
- `build` - 构建系统或外部依赖变更
- `ci` - CI 配置文件和脚本变更
- `chore` - 其他杂项变更（不属于上述类型）
- `revert` - 回滚提交

## Scope（范围）

- 用于标识受影响的模块、组件或功能区域
- 可省略；保留时应能帮助快速定位变更范围

## 通用示例

```text
feat(auth): add JWT user authentication
fix(editor): handle encoding error on file save
docs(readme): update install instructions
refactor(api): simplify request interceptor
```

## 与项目规范的优先级

- 项目若已定义自有提交标题规范（如中文前缀 `功能:`、`重构:`、`文档:`），必须优先使用项目规范
- 项目未定义自有规范时，才回退到本文件描述的 Conventional Commits 规范
