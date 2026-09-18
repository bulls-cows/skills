---
name: pwsh-command-norms
description: PowerShell/pwsh 终端命令规范：规避 @ 特殊字符导致的 git 命令解析失败，使用完整引用路径
trigger: always_on
alwaysApply: true
---

# PowerShell 命令规范

## git 命令中的特殊字符规避

### 禁止在 pwsh 中直接使用 `@..` 形式的 git 引用区间

**问题描述**：在 PowerShell/pwsh 终端中，命令里的 `@` 会被 PowerShell 解析器当作特殊标记，导致 git 引用区间写法 `@..origin/main` 解析失败。

**错误示例**：

```bash
# ❌ PowerShell 下报错：ParserError: Unrecognized token in source text
git rev-list --count @..origin/main
```

**正确做法**：使用完整的引用名称代替 `@` 简写，或将相关命令拆分为独立顺序操作。

```bash
# ✅ 使用完整分支/引用路径
git rev-list --count HEAD..origin/main

# ✅ 反向区间（本地领先远端几个提交）
git rev-list --count main..HEAD
```

**原因**：PowerShell 将 `@` 视为特殊 token（参数展开/splatting 等语法标记），当 `@` 后直接跟非数组的标识符时会产生解析错误，而 bash/zsh 中 `@` 可被 git 正确解释为 `HEAD` 的简写。

**注意事项**：

- 涉及 git 引用区间、tag 简写等含 `@` 的写法时，统一改用完整引用名（如 `HEAD`、`main`、`origin/main`）。
- 判断提交差异数量时，优先使用 `git rev-list --count <start>..<end>` 的完整形式。
- 若目标终端确实是 bash，则可正常使用 `@` 简写，但为跨终端可移植性仍建议使用完整写法。

## 多行提交信息：避免 heredoc 语法

### 禁止在 pwsh 中直接使用 `$(cat <<'EOF')` heredoc

**问题描述**：在 PowerShell/pwsh 终端中，`$(cat <<'EOF')` 这类 bash heredoc 写法会把 `<<` 解析成重定向运算符，导致多行 `git commit` 信息命令解析失败。

**错误示例**：

```bash
# ❌ PowerShell 下报错：ParserError: Missing file specification after redirection operator
git commit -m "$(cat <<'EOF'
一行说明

详细说明、正文。
EOF
)"
```

**正确做法**：PowerShell 原生不支持 heredoc，改用反引号 `n 换行，或使用多个 `-m` 分别描述标题与正文。

```powershell
# ✅ 使用反引号 `n 作为标题与正文的分行
git commit -m "type(scope): 标题`n`n正文第一行；`n正文第二行。"

# ✅ 多个 -m 分别作为标题与正文，行内使用 `n 拆分段内换行
git commit -m "type(scope): 标题" -m "正文首段；`n第二段。"
```

**原因**：heredoc 是 bash/zsh 的原生语法，PowerShell 将其中的 `<<` 视为重定向、`$()` 视为子表达式，无法按 bash 语义解析，因此必须使用 PowerShell 自身的字符串与参数机制。

**注意事项**：

- 提交信息较长时优先拆分为多个 `-m`，每段互斥语义；单个 `-m` 内的换行用反引号 `` `n ``。
- 反引号在 PowerShell 双引号字符串中才会被解释为换行，单引号字符串不会。
- 若目标终端确实是 bash（如 WSL、Git Bash），可正常使用 heredoc，但为跨终端可移植性仍建议使用 GNU 兼容写法。
