---
name: yy-post-to-wechat
description: >
  通过微信公众号 API 将本地 Markdown/HTML 文章发布到公众号草稿箱。
  当用户需要发布文章到微信公众号、推送内容到公众号时触发。
  不用于将公众号文章抓取或转换为本地文件、撰写或润色文章正文，也不用于发布到其他平台或直接群发推送。
---

# yy-post-to-wechat

## 描述

通过微信公众号 API 直接将本地 Markdown/HTML 文章发布到公众号草稿箱，支持多主题、多颜色预设，自动上传图片。

## 使用场景

- 用户需要发布文章到微信公众号
- 用户想要将 Markdown 文件推送到公众号草稿箱
- 用户提到"发布到公众号"、"推送到微信"、"公众号草稿"

不应触发：

- 用户只是询问如何配置公众号 API
- 用户要求编辑或修改文章内容
- 用户要求查看公众号数据统计

## 指令

### 步骤 1. 检查环境配置

验证以下配置是否存在：

- 检查 `.yy-skills/.env` 或 `~/.yy-skills/.env` 中的 `WECHAT_APP_ID` 和 `WECHAT_APP_SECRET`
- 检查可选配置文件 `EXTEND.md`

**决策分支**：

- **配置完整**：进入步骤 2
- **配置缺失**：提示用户按"配置"章节完成配置，退出执行

### 步骤 2. 解析输入文件

读取用户指定的输入文件：

- 支持 `.md`、`.html`、`.txt` 格式
- 从 frontmatter 提取元数据：title、author、summary、cover

**决策分支**：

- **文件存在且格式支持**：进入步骤 3
- **文件不存在**：提示文件路径错误，退出执行
- **格式不支持**：提示支持的格式列表，退出执行

### 步骤 3. 确定发布参数

按以下优先级确定各参数：

- **主题**：命令行 `--theme` > EXTEND.md `default_theme` > `default`
- **颜色**：命令行 `--color` > EXTEND.md `default_color` > 主题默认
- **作者**：命令行 `--author` > frontmatter `author` > EXTEND.md `default_author`
- **标题**：命令行 `--title` > frontmatter `title` > 文件名
- **摘要**：命令行 `--summary` > frontmatter `summary` > 正文前 120 字
- **封面**：命令行 `--cover` > frontmatter `cover` > 无封面

### 步骤 4. 执行发布流程

执行以下操作：

1. 获取微信 access_token
2. 转换 Markdown 为微信兼容 HTML，应用主题样式
3. 上传正文中的本地图片到微信素材库，替换 URL
4. 如指定封面，上传封面图片
5. 调用 API 创建草稿

### 步骤 5. 输出结果

输出以下信息：

- 草稿 media_id
- 公众号管理链接（可在浏览器中预览和发布）
- 发布参数摘要（主题、颜色、作者）

## 配置

### 首次配置

1. 获取微信公众号 API 凭证：
   - 访问 <https://mp.weixin.qq.com>
   - 进入 开发 → 基本配置
   - 复制 AppID 和 AppSecret

2. 保存凭证到环境变量：
   - 项目级：创建 `.yy-skills/.env` 文件
   - 用户级：创建 `~/.yy-skills/.env` 文件

```env
WECHAT_APP_ID=your_app_id
WECHAT_APP_SECRET=your_app_secret
```

1. 创建配置文件 `EXTEND.md`（可选）：
   - 项目级：`.yy-skills/yy-post-to-wechat/EXTEND.md`
   - 用户级：`~/.yy-skills/yy-post-to-wechat/EXTEND.md`

```yaml
default_theme: default
default_color: blue
default_author: 你的名字
need_open_comment: 1
only_fans_can_comment: 0
```

### 配置项说明

- `default_theme`：默认主题，可选 `default`、`grace`、`simple`、`modern`
- `default_color`：默认颜色，可选 `blue`、`green`、`vermilion`、`yellow`、`purple`、`sky`、`rose`、`olive`、`black`、`gray`、`pink`、`red`、`orange` 或自定义 hex 值
- `default_author`：默认作者
- `need_open_comment`：是否开启评论，`1` 开启，`0` 关闭
- `only_fans_can_comment`：是否仅粉丝可评论，`1` 是，`0` 否

## 使用方法

```bash
# 从技能根目录调用
node skills/yy-post-to-wechat/scripts/ <file> [options]

# 在 scripts 目录下调用
cd skills/yy-post-to-wechat/scripts
node . <file> [options]
```

### 参数选项

- `<file>`：输入文件路径（必需）
- `--theme <name>`：主题名称
- `--color <color>`：颜色名称或 hex 值
- `--title <title>`：强制指定标题
- `--summary <text>`：强制指定摘要
- `--author <name>`：强制指定作者
- `--cover <path>`：指定封面图片
- `--no-cite`：禁用外链转底部引用

### 示例

```bash
# 发布 Markdown 文件
node skills/yy-post-to-wechat/scripts/ ./my-article.md --theme default --color blue

# 指定作者和封面
node skills/yy-post-to-wechat/scripts/ ./post.md --author "宝玉" --cover ./imgs/cover.png

# 禁用引用转换
node skills/yy-post-to-wechat/scripts/ ./article.md --no-cite
```

## 前置要求

- Node.js >= 22.18.0（原生支持执行 TypeScript 文件）
- 微信公众号 AppID 和 AppSecret
- 公众号已开通开发者权限
- 服务器 IP 已添加到 API 白名单

## 相关资源

本技能包含以下辅助资源：

- `scripts/src/cli.ts`：主执行脚本
- `scripts/src/utils/check.ts`：环境检查脚本
- `scripts/src/config/loader.ts`：配置加载模块
- `scripts/src/api/wechat.ts`：微信 API 封装
- `scripts/src/converter/md-to-wechat.ts`：Markdown 转换模块
- `scripts/src/themes/index.ts`：主题样式定义
- `templates/base.html`：基础 HTML 模板
