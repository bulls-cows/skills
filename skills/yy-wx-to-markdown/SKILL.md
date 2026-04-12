---
name: yy-wx-to-markdown
description: >
  将微信公众号文章链接转换为 Markdown 格式。
  支持提取标题、作者、正文，并生成带 frontmatter 的 Markdown 文件。
---

# yy-wx-to-markdown - 微信公众号文章转 Markdown

## When to use

- 用户提供微信公众号文章链接，要求转换为 Markdown 时
- 需要保存微信公众号文章为本地 Markdown 文件时
- 需要提取微信文章内容用于归档或编辑时

## Don't use when

- 非微信公众号域名链接转换时
- 用户只需要提取纯文本不要求格式转换时
- 需要登录才能访问的付费文章

## Steps

1. **验证输入链接**：检查是否为 `mp.weixin.qq.com` 域名的链接
2. **获取网页内容**：使用自定义 User-Agent 请求网页获取 HTML
3. **提取信息**：
   - 提取文章标题和作者/公众号名称
   - 提取 `js_content` 区域的正文 HTML
4. **HTML 转 Markdown**：使用规则转换常见 HTML 标签为 Markdown 格式
5. **输出结果**：
   - 拼装完整 Markdown（包含 frontmatter 元数据）
   - 如果指定输出路径，保存为文件；否则直接输出文本

## Output contract

- **转换结果**：完整的 Markdown 文本，包含 YAML frontmatter
- **文件保存**：如果用户指定输出路径，说明保存位置和字符统计
- **错误处理**：请求失败或无法提取正文时输出错误信息

## Usage Examples

### CLI 使用

```bash
# 直接输出到终端
node skills/yy-wx-to-markdown/scripts/run_cli.mjs https://mp.weixin.qq.com/s/xxx

# 保存到文件
node skills/yy-wx-to-markdown/scripts/run_cli.mjs https://mp.weixin.qq.com/s/xxx output.md
```

### 程序化调用

```javascript
import { wxArticleToMarkdown } from './skills/yy-wx-to-markdown/scripts/wechat_article_parser.mjs';

const markdown = await wxArticleToMarkdown('https://mp.weixin.qq.com/s/xxx');
console.log(markdown);
```

## 转换特性

支持转换以下 HTML 元素：

- 标题（h1-h6 → # 到 ######）
- 粗体、斜体、删除线
- 有序/无序列表
- 引用块
- 行内代码和代码块
- 链接
- 图片（支持微信懒加载 `data-src`）
- 水平线
- 自动处理 HTML 实体转义
- 自动生成 YAML frontmatter 包含标题、作者、来源链接、日期
