---
name: yy-read-pdf
description: >
  读取并解析PDF文件内容，提取文本、表格和结构化信息。
  用于：用户需要读取PDF文件、提取PDF内容、分析PDF文档结构。
---

# yy-read-pdf

## 描述

读取和解析 PDF 文件内容，提取文本、表格等结构化信息并输出。

## 使用场景

- 用户提供 PDF 文件路径并要求读取内容
- 用户需要提取 PDF 中的文本或表格
- 用户需要分析 PDF 文档结构
- 用户询问 PDF 文件中的特定信息

不应触发：

- 用户要求创建或编辑 PDF 文件
- 用户要求转换其他格式文件（如 Word、Excel）
- 用户没有提供 PDF 文件路径

## 指令

### 1. 确认文件路径

- 验证用户提供的 PDF 文件路径是否存在
- 确认文件扩展名为 `.pdf`

**决策分支**：

- **路径存在且为 PDF**：进入步骤 2
- **路径不存在**：提示用户提供正确的文件路径，退出执行
- **扩展名不是 `.pdf`**：提示用户仅支持 PDF 格式，退出执行

### 2. 读取 PDF 内容

按优先级尝试以下方式读取 PDF 文件：

1. **Read 工具**：使用 Read 工具读取 PDF 文件
2. **Python 工具**：使用 `pymupdf` 提取文本（通过 `python -c "import fitz"` 检测是否已安装）
3. **未安装 pymupdf**：请求用户授权后执行 `pip install -r skills/yy-read-pdf/scripts/requirements.txt` 安装，安装后重试

pymupdf 使用方式（通过脚本调用，AI 只需传入参数）：

```bash
# 全量读取
python skills/yy-read-pdf/scripts/read_pdf.py --file "文件路径"

# 分段读取（第 0-19 页，超过 10 页时使用，每次最多 20 页）
python skills/yy-read-pdf/scripts/read_pdf.py --file "文件路径" --start 0 --end 20
```

参数说明：

- `--file`：PDF 文件路径（必需）
- `--start`：起始页码，0-indexed（默认 0）
- `--end`：结束页码，不含该页（默认读取到末页）

**决策分支**：

- **10 页以内的 PDF**：直接读取全部内容（不传 `--start`/`--end`）
- **超过 10 页的 PDF**：分段读取，每次最多 20 页（Read 工具使用 `pages` 参数；pymupdf 传入 `--start` 和 `--end` 参数）
- **Read 工具失败（非加密、非扫描）**：降级到 pymupdf 方式重试
- **读取失败（加密 PDF）**：提示用户需要先解密，退出执行
- **读取内容为空或乱码（扫描版 PDF）**：提示用户该 PDF 为扫描版，需要 OCR 工具处理，退出执行

### 3. 输出解析结果

根据用户需求格式化输出内容：

**决策分支**：

- **用户要求完整内容**：输出所有页面内容
- **用户要求特定页面**：只输出指定页面
- **用户要求表格数据**：识别表格结构，以 Markdown 表格格式输出

输出格式：

```markdown
## PDF 文件信息

- 文件名：xxx.pdf
- 页数：N 页
- 格式：PDF x.x
- 标题：xxx
- 作者：xxx

## 提取内容

### 第 X 页

[页面内容]
```

## 相关资源

本技能包含以下辅助资源：

- `scripts/read_pdf.py`：pymupdf 读取 PDF 的执行脚本
- `examples/output.md`：使用 pymupdf 读取 PDF 的输出示例
- `resources/sample.pdf`：用于测试的示例 PDF 文件
