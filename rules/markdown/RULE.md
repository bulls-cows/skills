# Markdown书写规范

## 代码块语言标识

### 所有围栏代码块必须声明语言

**规则**：Markdown 中所有围栏代码块（```` ``` ````）都必须在开头指定语言标识符，不得留空。

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

| 内容类型 | 语言标识 |
|----------|----------|
| Shell 命令 | `bash` |
| YAML 配置 | `yaml` |
| JSON 数据 | `json` |
| TypeScript | `typescript` |
| JavaScript | `javascript` |
| Markdown 源码 | `markdown` |
| 目录树、路径列表、纯文本 | `text` |

**注意**：目录树结构和路径列表是最容易被遗漏语言标识的场景，统一使用 `text`。

## 内容格式选择

### 简单键值对映射应使用列表而非表格

**规则**：对于展示简单的类型、格式、示例等键值对映射关系，应优先使用列表形式而非表格格式。

列表形式更简洁、易读，移动端显示友好，且编辑维护更方便。

**反例（表格形式）：**

```markdown
| 类型 | 格式 | 示例 |
|------|------|------|
| 技能目录 | kebab-case | `create-skill/` |
| 技能名称 | kebab-case，动宾结构，名词单数 | `create-rule`、`read-pdf` |
```

**正确示例（列表形式）：**

```markdownmarkdown
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
