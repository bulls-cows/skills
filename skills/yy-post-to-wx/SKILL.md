---
name: yy-post-to-wx
title: yy-post-to-wx
description: 通过微信公众号 API 直接将本地 Markdown/HTML 文章发布到公众号草稿箱。支持多主题、多颜色预设，自动上传图片。
author: OpenCode
---
通过微信公众号 API 直接将本地 Markdown/HTML 文章发布到公众号草稿箱。支持多主题、多颜色预设，自动上传图片。

## 功能特性

- ✅ 支持 Markdown、HTML、纯文本三种输入
- ✅ 四种主题样式：default、grace、simple、modern
- ✅ 十二种颜色预设，支持自定义颜色
- ✅ 自动上传本地图片到微信素材库
- ✅ 外链默认转换为底部引用
- ✅ 配置文件支持默认作者、评论设置
- ✅ 通过 API 直传，无需浏览器自动化

## 配置

### 首次配置

1. 获取微信公众号 API 凭证：
   - 访问 <https://mp.weixin.qq.com>
   - 进入 开发 → 基本配置
   - 复制 AppID 和 AppSecret

2. 保存凭证到环境变量：
   - 项目级：创建 `.baoyu-skills/.env` 文件
   - 用户级：创建 `~/.baoyu-skills/.env` 文件

```env
WECHAT_APP_ID=your_app_id
WECHAT_APP_SECRET=your_app_secret
```

1. 创建配置文件 `EXTEND.md`（可选）：

```md
default_theme: default
default_color: blue
default_author: 你的名字
need_open_comment: 1
only_fans_can_comment: 0
```

### 配置项说明

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `default_theme` | 默认主题 | `default` |
| `default_color` | 默认颜色 | 主题默认 |
| `default_author` | 默认作者 | 空 |
| `need_open_comment` | 是否开启评论 | `1` |
| `only_fans_can_comment` | 是否仅粉丝可评论 | `0` |

### 主题选项

- `default` - 默认主题，简洁大方
- `grace` - 优雅风格，更大行高
- `simple` - 极简风格，去掉边框阴影
- `modern` - 现代风格，卡片式设计

### 颜色预设

`blue`, `green`, `vermilion`, `yellow`, `purple`, `sky`, `rose`, `olive`, `black`, `gray`, `pink`, `red`, `orange`

也可以使用自定义 hex 颜色值，如 `#ff0000`。

## 使用方法

```bash
# 使用 Bun
bun skills/yy-post-to-wx/scripts/main.ts <file> [options]

# 使用 npx bun
npx -y bun skills/yy-post-to-wx/scripts/main.ts <file> [options]
```

### 参数选项

| 参数 | 说明 | 示例 |
|------|------|------|
| `<file>` | 输入文件路径 | `article.md` |
| `--theme <name>` | 主题名称 | `--theme grace` |
| `--color <color>` | 颜色名称或 hex | `--color green` |
| `--title <title>` | 强制指定标题 | `--title "文章标题"` |
| `--summary <text>` | 强制指定摘要 | `--summary "这是一篇文章"` |
| `--author <name>` | 强制指定作者 | `--author 张三` |
| `--cover <path>` | 指定封面图片 | `--cover ./cover.png` |
| `--no-cite` | 禁用外链转底部引用 | `--no-cite` |

### 示例

```bash
# 发布 Markdown 文件
bun skills/yy-post-to-wx/scripts/main.ts ./my-article.md --theme default --color blue

# 指定作者和封面
bun skills/yy-post-to-wx/scripts/main.ts ./post.md --author "宝玉" --cover ./imgs/cover.png

# 禁用引用转换
bun skills/yy-post-to-wx/scripts/main.ts ./article.md --no-cite
```

## 工作流程

1. **加载配置** - 从 EXTEND.md 和 .env 加载配置
2. **处理输入** - 读取 Markdown/HTML 文件，纯文本自动保存
3. **解析元数据** - 从 frontmatter 提取标题、作者、摘要、封面
4. **转换格式** - Markdown 转换为微信兼容 HTML，应用主题样式
5. **获取 Token** - 通过 API 获取 access_token
6. **上传图片** - 上传封面和正文图片，替换 URL
7. **创建草稿** - 调用 API 创建草稿到公众号
8. **输出结果** - 显示 media_id 和管理链接

## 前置要求

- Node.js 18+ 或 Bun
- 微信公众号 AppID 和 AppSecret
- 公众号已开通开发者权限
- 服务器 IP 已添加到 API 白名单

## 环境检查

首次使用前建议运行环境检查：

```bash
bun skills/yy-post-to-wx/scripts/check-permissions.ts
```

检查内容：

- Bun 运行时
- 环境变量配置
- API 凭证是否存在

## 依赖

- `marked` - Markdown 解析
- `front-matter` - frontmatter 解析

## 限制

- 不支持浏览器自动化发布（仅 API 方式）
- 不支持多账号管理
- 图片大小需符合微信公众号限制
