# 输出示例

本文档展示初始化项目后的预期输出示例。

## 示例 1：创建新 AGENTS.md

### 创建结果

已成功创建 AGENTS.md。

### 文件路径

```text
/path/to/project/AGENTS.md
```

### 包含章节

- 用户特质
- 范围
- 改动检查
- 交付格式
- 项目结构
- 路径格式规范
- 规则引用

---

## 示例 2：更新现有 AGENTS.md

### 更新结果

已成功更新 AGENTS.md，采用补充策略。

### 变更内容

- 新增"改动检查"章节，补充了 lint 和 test 脚本
- 更新"项目结构"章节，添加了新增的 `src/utils/` 目录说明
- 其他章节保持不变

### 文件路径

```text
/path/to/project/AGENTS.md
```

---

## 示例 3：完全重写 AGENTS.md

### 重写结果

已成功重写 AGENTS.md。

### 文件路径

```text
/path/to/project/AGENTS.md
```

### 包含章节

- 用户特质
- 范围
- 改动检查
- 交付格式
- 项目结构
- 路径格式规范
- 规则引用

---

## 示例 4：带规则目录的项目

### 创建结果

已成功创建 AGENTS.md。

### 文件路径

```text
/path/to/project/AGENTS.md
```

### 包含章节

- 用户特质
- 范围
- 改动检查
- 交付格式
- 项目结构
- 路径格式规范
- 规则引用（已自动引用 `.agents/rules/` 目录下的规则文件）

### 规则引用

```markdown
## 规则

- .agents/rules/coding-style.md: 编码风格规范
- .agents/rules/commit-convention.md: 提交信息规范
```
