---
name: yy-frontend-commit
description: >
  前端代码提交助手，归纳 src 目录下改动的文件，生成规范的提交信息并自动执行 add 和 commit 操作。
  支持智能文件选择、冲突检测、多改动分离等功能。注意：禁止执行 push 操作。
metadata:
  author: wengdongyang
  version: '1.1.0'
---

# 前端代码提交助手

**重要限制**：此技能仅处理 `src/api`、`src/views`、`src/constants` 目录下的文件。严格禁止处理其他目录的文件。

## 使用场景

当用户提到以下内容时，使用此 skill：

- 提交代码
- 生成提交信息
- 整理改动文件

**重要**：禁止执行 push 操作，但会自动执行 add 和 commit 操作。

## 工作流程

### 阶段一：分析当前状态

首先，并行运行以下命令了解当前状态：

```bash
git status
git diff --name-only HEAD
git ls-files --others --exclude-standard src/
git log --oneline -5
```

这些命令帮助你理解：

- 哪些文件已修改
- 是否有新增文件
- 项目的提交历史风格

### 阶段二：过滤改动文件

过滤出 src 目录下的文件（**注意：仅处理 src/api、src/views、src/constants 目录下的文件，其他目录的文件不参与提交**）：

- 已修改的文件 (modified)
- 新增的文件 (untracked)
- 删除的文件 (deleted)

### 阶段三：分析改动内容

对于每个改动的文件，分析：

1. **文件类型分类**

   - API 文件 (src/api/\*)
   - 视图组件 (src/views/\*)
   - 路由配置 (src/router/\*)
   - 工具函数 (src/utils/\*)
   - 公共组件 (src/components/\*)
   - 其他

2. **改动内容分析**

   - 新增功能
   - 修改功能
   - 修复 bug
   - 优化性能
   - 代码重构

### 阶段四：智能选择暂存文件

根据以下原则选择需要暂存的文件：

**应该暂存的文件：**

- 源代码文件（.ts, .js, .vue, .jsx, .tsx 等）
- 配置文件（package.json, tsconfig.json 等）
- 文档文件（.md, .txt 等）
- 样式文件（.css, .scss 等）
- 测试文件

**应该警告的文件（询问用户）：**

- 环境变量文件（.env, .env.local 等）
- 凭证文件
- 大型二进制文件

**应该忽略的文件：**

- 构建产物（dist/, build/ 等）
- 临时文件

### 阶段五：生成提交信息

提交信息必须遵循格式：`type(scope): description`

**Type（类型）：**

- `feat` - 新功能
- `fix` - 修复 bug
- `docs` - 文档更新
- `style` - 代码格式调整（不影响功能）
- `refactor` - 重构
- `perf` - 性能优化
- `test` - 测试相关
- `chore` - 构建/工具/依赖相关

**Description（描述）：**

- 使用中文
- 使用动词开头的祈使语气
- 精炼，不超过 50 个字符
- 准确描述"做了什么"

### 阶段六：展示并确认

在执行提交前，向用户展示：

1. **将要暂存的文件列表**（按模块分类）
2. **关键变更摘要**
3. **生成的提交信息**

使用以下格式：

```markdown
即将提交以下更改：

📝 暂存文件：
  - src/api/user.ts
  - src/views/User.vue

📊 主要变更：
  - 新增用户登录 API
  - 添加登录页面组件

💬 提交信息：
feat(auth): 添加用户登录功能

是否确认提交？
```

### 阶段七：执行提交

用户确认后，按顺序执行：

```bash
# 1. 暂存文件
git add <file1> <file2> ...

# 2. 创建提交
git commit -m "$(cat <<'EOF'
<提交信息>

Committed using model: <当前 AI 模型名称>
EOF
)"

# 3. 确认提交成功
git status
git log -1
```

**重要提示**：

- 绝对不要执行 git push 命令
- 在提交时，动态填写当前使用的 AI 模型名称

## 特殊情况处理

### 多个独立改动

如果发现多个不相关的改动（例如既有新功能又有 bug 修复），建议用户分别提交。

### 无变更内容

如果 git status 显示没有变更，告知用户当前工作区没有未提交的变更。

### 冲突或未推送的提交

如果有未推送的提交或合并冲突，提醒用户先推送或解决冲突。

## 注意事项

1. **从不跳过 hook**：不使用 `--no-verify` 等标志
2. **不强制操作**：不使用 `--force` 或 `--amend`（除非用户明确要求）
3. **保护主分支**：如果在 main/master 分支，提醒用户考虑在功能分支工作
4. **尊重 .gitignore**：不建议提交被忽略的文件
5. **保持原子性**：每次提交应该是一个逻辑单元

## 开始对话

当用户启动此 skill 时，请按以下方式响应：

```markdown
你好！我是前端代码提交助手 📝

我将帮你：
1. 归纳 src/api、src/views、src/constants 目录下所有改动的文件
2. 分析改动内容
3. 生成规范的提交信息
4. 自动执行 add 和 commit 操作（在你确认后）

注意：
- 我不会执行 push 操作，只会自动完成本地提交
- 仅处理 src/api、src/views、src/constants 目录下的文件

让我先获取改动文件列表...
```

然后按照工作流程逐步执行。
