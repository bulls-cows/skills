# 随附书稿构建器使用说明

## 工具位置与安装

`../scripts/` 是可独立复制的工具目录，来自用户维护的通用书稿构建器。脚本和主题是此技能打包时的快照，不会自动同步原项目；更新副本前比较接口、测试并取得覆盖授权。没有固定机器路径依赖。

要求 Python 3.10+。book_builder.py 使用 requirements.txt 中固定的 Python-Markdown；html_to_pdf.py 只用标准库，但需要本机 Chrome/Edge/Chromium。下面假设已将 scripts/ 复制到授权工作目录的 `ebook-tool/`，书稿在 `manuscript/`，从两者的父目录执行：

```powershell
py -m venv ebook-tool/.venv
ebook-tool/.venv/Scripts/python.exe -m pip install -r ebook-tool/requirements.txt
ebook-tool/.venv/Scripts/python.exe -X utf8 ebook-tool/book_builder.py build manuscript/book.json
ebook-tool/.venv/Scripts/python.exe -X utf8 ebook-tool/book_builder.py check manuscript/output/book.epub
```

Linux/macOS 用 `python3 -m venv ebook-tool/.venv` 创建环境，再将 Python 路径换成 `ebook-tool/.venv/bin/python`。已存在虚拟环境时检查 Python 与依赖，不覆盖环境。直接运行随附脚本时也可使用授权目录中的虚拟环境，无需写入技能安装目录。

## 配置与输入

book.json 必填 `title`、`language`、以 .epub 结尾的 `output` 及非空 `chapters`。每章是含 `file` 的对象，可指定 `title`；省略时取第一个一级标题，再兜底文件名。chapters 数组顺序是阅读顺序，文件不能重复。

可选：`authors` 字符串数组、`theme`（默认 eink，可选 reading/technical）、本地 `cover`、自定义 `identifier`。未指定 identifier 时由书名与作者生成稳定标识；构建时间变化，因此二进制不保证完全相同。

配置路径相对 book.json；章节图片和跨章链接相对 Markdown。支持本地 PNG/JPEG/GIF/SVG，按内容摘要打包去重；禁止远程图片、主动 SVG、脚本、内联 CSS 和外部字体。输入是可信本地书稿，不是未知来源内容的安全沙箱。

支持基础 Markdown 与 Python-Markdown Extra：表格、脚注、定义列表、标题属性。Mermaid、公式渲染、视频和任意源码附件不支持；源码路径可写成行内代码。

````markdown
## 协议 {#protocol}

源码：`src/protocol.py`，`parse`，读取时第 20–40 行。

```python
print("长代码按主题折行")
```

![本地图](../images/flow.svg)

参见[下一章](02-details.md#detail)。这里有注解[^note]。

[^note]: 业务背景说明。
````

本地章节链接目标必须在配置中，内部锚点必须存在。HTTP/HTTPS/mailto 保留为外部链接，不自动下载目标。

## 四类默认产物

以 `output/book.epub` 为例，构建会同时生成：

- `book.epub`：EPUB 3，包含导航、阅读顺序、样式及本地图片；不另生成 EPUB 2 NCX。
- `book.preview.html`：全书单文件，内嵌样式和 Base64 图片，目录、跨章与脚注链接改为页内跳转，直接打开即可。
- `book.preview.zip`：分章资源，解压后打开 nav.xhtml；不能只拷贝章节而遗漏图片和样式。
- `book.report.json`：书名、构建时间与本地结构校验结果。

四个目标中任意一个已存在都会拒绝构建，明确授权覆盖后才加 `--force`。即使 force 也不能覆盖配置、章节或图片输入。先在临时目录完成构建并校验，成功后逐文件替换，文件集合不具备跨文件事务性。

三种主题都配置代码与表格折行、图片限宽；HTML 增加章节打印分页，但不是设备排版模拟器。实际页数由设备、字号、字体和纸张决定。大量图片内嵌会增大 HTML 体积及内存占用，人工检查长代码和宽表格。

## 可选 HTML 转 PDF

仅在用户需要 PDF 时运行，使用浏览器无头打印，不是拼接截图：

```powershell
ebook-tool/.venv/Scripts/python.exe -X utf8 ebook-tool/html_to_pdf.py manuscript/output/book.preview.html
ebook-tool/.venv/Scripts/python.exe -X utf8 ebook-tool/html_to_pdf.py manuscript/output/book.preview.html -o manuscript/output/book.pdf --force
```

参数：

- 输入为已有本地 .html/.htm，不接受 URL；路径相对执行目录。
- `-o` / `--output`：默认把 HTML 后缀改成 .pdf，父目录自动创建。
- `--browser`：Chrome/Edge/Chromium 可执行文件路径或命令名，省略时搜索 PATH 和常见安装目录。
- `--force`：明确授权时覆盖旧 PDF，不能覆盖输入 HTML。
- `--timeout`：实际运行超时秒数，默认 60，必须大于 0。
- `--wait-ms`：虚拟时间预算毫秒数，默认 1000，可为 0；不是实际等待时长，不保证异步页面就绪。

脚本使用独立临时浏览器配置，不复用登录状态；默认不显示打印页眉页脚。检查临时 PDF 文件头后替换目标，失败保留旧文件。超时终止本次浏览器进程树，不针对已有用户浏览器进程。

只转换可信 HTML：普通 HTML 可运行脚本、请求网络或读取本地引用，该工具不是安全沙箱；优先使用构建器生成的静态单文件预览。不要自动安装浏览器或添加降低沙箱安全的参数。

纸张、页边距和字体可通过已有主题的 `@page`、`@media print` 调整后重建 HTML，未设置使用浏览器默认值，脚本不提供纸张尺寸参数。PDF 固定分页，不保证与 EPUB 相同、页数目标精确或目录书签可用。检查中文字体、封面、长代码、表格和分页。

## 测试与验证边界

```powershell
ebook-tool/.venv/Scripts/python.exe -X utf8 -m unittest discover -s ebook-tool/tests -v
```

EPUB 本地校验检查 ZIP、XML、元数据、manifest、spine、内部目标及锚点；不替代 EPUBCheck、内容校对或设备实测。PDF 单元测试使用模拟浏览器；实际转换需单独执行。文件头正确不等于 PDF 页面完整或排版合格。成功退出码 0，错误为 1。
