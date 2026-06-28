---
name: markdown
description: Markdown 书写规范
trigger: always_on
alwaysApply: true
---

# Markdown 书写规范

## 代码块语言标识

### 所有围栏代码块必须声明语言

**规则**：Markdown 中所有围栏代码块（` ``` `）都必须在开头指定语言标识符，不得留空。

这对应 markdownlint 的 MD040 规则，可以使用 markdownlint 检测并报错。

**反例（会导致 MD040 错误）：**

````markdown
```
skill-name/
└── SKILL.md
```
````

**正确示例：**

````markdown
```text
skill-name/
└── SKILL.md
```
````

### 常用语言标识对照

| 内容类型                 | 语言标识     |
| ------------------------ | ------------ |
| Shell 命令               | `bash`       |
| YAML 配置                | `yaml`       |
| JSON 数据                | `json`       |
| TypeScript               | `typescript` |
| JavaScript               | `javascript` |
| Markdown 源码            | `markdown`   |
| 目录树、路径列表、纯文本 | `text`       |

**注意**：目录树结构和路径列表是最容易被遗漏语言标识的场景，统一使用 `text`。

### 不相关内容应使用独立代码块

**规则**：每个代码块应只包含语义上相关的内容。不相关的代码片段应拆分为独立代码块，必要时在代码块前添加简要说明，帮助读者理解上下文。

将多条不相关的代码塞进同一个代码块，会导致读者无法快速识别每条代码的用途，也不利于引用和讨论。

**反例（不相关内容挤在一个代码块中）：**

```text
feat(auth): 添加 JWT 认证以支持无状态会话管理
fix(utf8-editor): 修复 UTF-8 文件保存乱码导致内容丢失
docs(readme): 补充 Node 20 要求以解决安装报错
refactor(request-interceptor): 抽离公共拦截器以减少重复逻辑
```

**正确示例（按语义拆分为独立代码块）：**

带 body 的完整提交：

```text
feat(auth): 添加 JWT 认证以支持无状态会话管理

- 移除服务端 session 存储，改用 JWT token 验证，
- 降低横向扩展时的会话同步开销
```

不带 body 的简洁提交：

```text
fix(utf8-editor): 修复 UTF-8 文件保存乱码导致内容丢失
```

```text
docs(readme): 补充 Node 20 要求以解决安装报错
```

## 内容格式选择

### 简单键值对映射应使用列表而非表格

**规则**：对于展示简单的类型、格式、示例等键值对映射关系，应优先使用列表形式而非表格格式。

列表形式更简洁、易读，移动端显示友好，且编辑维护更方便。

**反例（表格形式）：**

```markdown
| 类型     | 格式                           | 示例                      |
| -------- | ------------------------------ | ------------------------- |
| 技能目录 | kebab-case                     | `create-skill/`           |
| 技能名称 | kebab-case，动宾结构，名词单数 | `create-rule`、`read-pdf` |
```

**正确示例（列表形式）：**

```markdown
- 技能目录：kebab-case（如 `create-skill/`）
- 技能名称：kebab-case，动宾结构，名词单数（如 `create-rule`、`read-pdf`）
```

**适用场景：**

- 命名规范说明
- 配置项说明
- 简单的选项列表
- 参数说明

**何时仍应使用表格：**

- 需要多列对比的复杂数据
- 需要按列对齐展示的数据
- 矩阵式的关系映射
