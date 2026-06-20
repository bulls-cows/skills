---
name: yy-wechat-to-markdown
description: >
  将微信公众号文章链接转换为 Markdown 格式。当用户提供微信公众号文章链接、
  要求转换微信文章为 Markdown 时触发。
  不用于转换非微信公众号域名的网页、抓取需登录或付费可见的文章，也不用于将本地 Markdown 反向发布到公众号。
---

# yy-wechat-to-markdown

## 描述

将微信公众号文章链接转换为 Markdown 格式，提取标题、作者、正文内容，生成带 YAML frontmatter 的 Markdown 文件。

## 使用场景

- 用户提供微信公众号文章链接，要求转换为 Markdown
- 需要保存微信公众号文章为本地 Markdown 文件
- 需要提取微信文章内容用于归档或编辑

不应触发：

- 非微信公众号域名链接转换
- 用户只需要提取纯文本不要求格式转换
- 需要登录才能访问的付费文章

## 指令

### 步骤 1. 验证输入链接

检查是否为 `mp.weixin.qq.com` 域名的链接。

**决策分支**：

- **有效微信链接**：进入步骤 2
- **非微信链接**：提示仅支持微信公众号文章链接，退出执行

### 步骤 2. 选择执行方式并获取内容

**决策分支**：

- **脚本可用**（`scripts/package.json` 存在且 Node.js >= 22.18.0 可用）：使用脚本执行转换，直接进入步骤 4

  ```bash
  node scripts/ <url> [output-path]
  ```

- **脚本不可用**：手动获取网页内容，进入步骤 3

**脚本不可用时的决策分支**：

- **请求成功**：进入步骤 3
- **请求失败**：输出错误状态码和原因，退出执行

### 步骤 3. 手动提取信息并转换

仅在步骤 2 中脚本不可用时执行此步骤。

1. 提取文章标题和作者/公众号名称
2. 提取 `js_content` 区域的正文 HTML
3. 将 HTML 标签转换为 Markdown 格式（标题、粗体、列表、引用、代码块、链接、图片等）
4. 自动处理微信懒加载图片（`data-src`）和 HTML 实体转义

**决策分支**：

- **正文提取成功**：进入步骤 4
- **正文为空**：提示可能是付费文章或需要登录，退出执行

### 步骤 4. 输出结果

拼装完整 Markdown（包含 YAML frontmatter：title、author、source、date）。

**决策分支**：

- **用户指定输出路径**：保存为文件，输出保存位置和字符统计
- **用户未指定路径**：直接输出 Markdown 文本

## 相关资源

本技能包含以下辅助资源：

- `scripts/src/cli.ts`：CLI 入口脚本
- `scripts/src/parser/html-to-md.ts`：HTML 转 Markdown 模块
- `scripts/src/parser/extract-meta.ts`：文章元信息提取模块
- `scripts/src/parser/extract-body.ts`：正文区域提取模块
