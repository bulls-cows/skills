---
name: yy-vitepress
description: >
  编写或维护 VitePress 2 文档时处理特殊语法和格式约定。
  用于在 VitePress 2 项目中引用源码代码片段、使用容器折叠代码块、标记源码区域。
  不用于编写普通 Markdown 文档、修改 VitePress 配置或构建脚本。
---

# yy-vitepress

## 描述

在 VitePress 2 项目中，标准的 Markdown 语法之外有一些特殊写法需要遵守，特别是源码代码片段的引用方式。本文档整理了这些约定，确保文档渲染正确且内容与源码保持同步。

## 使用场景

- 在 VitePress 2 文档中引用项目源码中的代码片段
- 需要让代码片段在渲染后默认折叠收起，用户可点击展开
- 需要引用源码中特定区域（如某个函数、某段逻辑）而非整个文件
- 需要在文档中描述源码功能但不确定引用方式是否正确

不应触发：

- 编写不包含代码引用的纯 Markdown 文档
- 修改 VitePress 配置文件（`.vitepress/config.ts`）
- 运行 VitePress 构建或开发服务器
- 在非 VitePress 项目中使用这些语法

## 指令

### 步骤 1. 确定 `@/` 路径的映射目录

VitePress 2 中的 `<<< @/path/file.mts{typescript}` 语法，`@/` 映射到 VitePress 配置中的 `srcDir` 字段。

**决策分支**：

- **配置了 `srcDir`**：读取 `.vitepress/config.ts` 中的 `srcDir` 配置，`@/` 对应 `srcDir` 指定的目录
- **未配置 `srcDir`**：`@/` 默认对应 VitePress 项目的根目录

例如，若 `srcDir` 配置为 `apps-home/systems/src` 且项目根目录为 `/workspace/project`，则 `@/` 对应 `/workspace/project/apps-home/systems/src`。

### 步骤 2. 计算源码引用路径

当需要引用 VitePress 项目外部的源码文件时，基于 `@/` 映射目录与目标源码目录的**相对路径关系**计算引用路径。

```
<<< @/../../../src/path/to/file.mts{typescript}
```

计算方式：从 `@/` 映射目录出发，使用 `../` 向上回溯到共同祖先目录，再向下进入目标源码目录。

例如，`@/` 映射到 `apps-home/systems/src`，目标文件在 `src/services/balance.mts`，则相对路径为 `@/../../../src/services/balance.mts`。

### 步骤 3. 引用整个文件

使用 `<<< @/path/to/file.mts{typescript}` 语法直接引用整个文件。

```markdown
<<< @/../../../src/services/balance.mts{typescript}
```

`{typescript}` 指定代码高亮的语言标识，根据文件类型选择对应的语言标签。

### 步骤 4. 引用源码中的特定区域

当只需要引用文件中的某个函数、类或代码块时，使用 `#region` / `#endregion` 注释标记区域。

**先在源文件中添加标记**：

```typescript
// #region proxyRoute
export function proxyRoute(...) {
  // ...
}
// #endregion proxyRoute
```

`region` 名称使用英文小驼峰命名（如 `proxyRoute`、`handleRechargeSuccess`、`consumeBalance`）。

**然后在文档中引用**：

```markdown
<<< @/../../../src/app.mts#proxyRoute{typescript}
```

`#region` 注释应放在源文件中函数/块定义的**前一行**，`#endregion` 放在**后一行**，这样引用时既不包含 `#region` 注释行本身，又能完整覆盖目标代码。

**严禁**使用 `#L起始行号-结束行号` 语法（如 `#L159-L184`），VitePress 2 不支持此写法。

### 步骤 5. 使用折叠容器包裹代码引用

为了让渲染后的页面默认折叠收起、用户可点击展开，使用 `::: details` 容器包裹代码引用。

```markdown
::: details 合适的标题（@path/to/file.mts）

说明文案（如有，放在代码引用之前）

<<< @/../../../src/path/to/file.mts{typescript}

:::
```

`::: details` 标题中括号内标注文件路径，方便用户快速识别来源。

### 步骤 6. 文档正文中优先使用路径别名引用源码

在文档正文（非代码引用语法、非代码块内部）中指出源码路径时，应优先使用项目 `package.json` 中 `imports` 字段定义的路径别名（`#` 开头）。

**查找路径别名**：

读取项目根目录的 `package.json`，查找 `imports` 字段：

```json
{
  "imports": {
    "#utils": "./src/utils/index.mts",
    "#services/balance": "./src/services/balance.mts"
  }
}
```

**在文档正文中引用**：

```markdown
通过 `#services/balance` 提供的 `getBalance` 方法获取用户余额。
```

**不适用此规则的场景**：

- `<<< @/path/file.mts{typescript}` 等代码引用语法及类似的使用文件路径引用文件内容的场景
- 代码块内部的路径引用

### 步骤 7. 禁止硬编码行号

文档正文中**不得出现**源码的具体行号引用（如"第 10-26 行"、"第 86 行"等），原因如下：

- 源码行号会随改动变化，硬编码行号会迅速过时
- 行号对读者无实际帮助，源码文件路径和功能描述已足够定位
- 如需精准定位，使用 `#region` 方式引用代码片段

将行号引用替换为定性描述：

| 错误写法 | 正确写法 |
|----------|----------|
| `（第 10-26 行）：连接失败后自动重试` | `：连接失败后自动重试` |
| `在 app.mts 第 86 行注册` | `在 app.mts 中注册` |

## 输出格式

完成文档编写后，确认以下检查项：

1. 所有 `<<<` 引用路径正确，文件存在
2. 所有 `#region` 名称在源文件中存在且拼写一致
3. 所有 `:::` 容器正确配对（`::: details` 以 `:::` 结束）
4. 无硬编码行号
5. 无 `#L...` 语法
6. 文档正文中的源码路径优先使用 `package.json` 的 `imports` 字段定义的 `#` 路径别名

## 安全边界

- 不得在源文件中插入与代码逻辑无关的 `#region` 标记（仅用于 VitePress 2 文档引用场景）
- 不得修改源文件中的代码逻辑，仅添加 `#region` / `#endregion` 注释
- 已完成 `#region` 标记的源文件，后续修改代码时需同步更新 `#region` 覆盖范围
