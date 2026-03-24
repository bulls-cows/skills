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
