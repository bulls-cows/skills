# 书稿交付约定

## 目录与配置

输出根目录包含 `book-plan.md`、`progress.md`、`book.json`、`chapters/`，按需使用 `images/`。保留已有目录模式；规划列全书章节，book.json 仅列已落盘并准备构建的章节，顺序就是阅读顺序。草稿能否进入配置由规划中的交付要求决定，不能当作成书。

构建器接受 title、language、output 和非空 chapters；theme 可选 eink/reading/technical，authors/cover/identifier 可选。不增加 pageCount 等构建器不支持的字段，篇幅目标写在规划中。

## Markdown

通用层使用标题、段落、列表、引用、行内代码和带语言的围栏代码；窄屏优先短代码、简单表格和文本解释。篇幅长的结构图使用本地图，不强依赖在线渲染。

针对随附 Python-Markdown 构建器，特定层规则优先：允许 Extra 的表格、脚注、定义列表、标题属性；不使用 Mermaid、LaTeX 渲染、视频、脚本或任意内联 CSS。图片使用本地 PNG/JPEG/GIF/SVG，不使用远程图片、外部字体。SVG 不含主动内容或外部引用。

```markdown
## 连接流程 {#connection}

源码：`src/connection.py`，`connect`，读取时第 20–48 行。

参见[下一章](02-protocol.md#packet)。

![数据流](../images/flow.png)
```

跨章链接相对当前 Markdown，目标必须在 book.json 的 chapters 中；标题用稳定显式锚点。源码路径写普通文本/行内代码，不做相对源码超链接，因为通用构建器不打包源码附件。外部参考资料可使用普通 HTTPS 链接。

## 未列转换工具兜底

用户改用其他构建工具时，先核对其支持语法，保留基础 Markdown、纯文本源码定位和本地图片；不凭特定构建器扩展推定其他工具可用。正文内容真源仍是 Markdown，不直接维护生成的 EPUB/HTML。
