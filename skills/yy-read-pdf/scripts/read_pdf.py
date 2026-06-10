"""读取 PDF 文件内容，提取文本、表格等结构化信息并输出 JSON。"""

import argparse
import json
import sys
from collections.abc import Iterable
from typing import Protocol, cast


class StdoutWithReconfigure(Protocol):
    def reconfigure(self, **kwargs: object) -> None: ...


class PdfTable(Protocol):
    def extract(self) -> list[list[object]]: ...


class PdfPage(Protocol):
    def get_text(self) -> str: ...

    def find_tables(self) -> Iterable[PdfTable]: ...


if hasattr(sys.stdout, "reconfigure"):
    cast(StdoutWithReconfigure, sys.stdout).reconfigure(encoding="utf-8")


def main():
    parser = argparse.ArgumentParser(description="读取 PDF 文件内容")
    parser.add_argument("--file", required=True, help="PDF 文件路径")
    parser.add_argument(
        "--start", type=int, default=0, help="起始页码（0-indexed，默认 0）"
    )
    parser.add_argument(
        "--end", type=int, default=None, help="结束页码（不含，默认读取到末页）"
    )
    args = parser.parse_args()

    try:
        import fitz
    except ImportError:
        print(
            json.dumps(
                {"error": "pymupdf 未安装，请执行 pip install pymupdf"},
                ensure_ascii=False,
            )
        )
        sys.exit(1)

    try:
        doc = fitz.open(args.file)
    except Exception as e:
        print(json.dumps({"error": f"无法打开文件: {e}"}, ensure_ascii=False))
        sys.exit(1)

    end = args.end if args.end is not None else doc.page_count
    result = {
        "page_count": doc.page_count,
        "metadata": doc.metadata,
        "pages": [],
    }

    for i in range(args.start, min(end, doc.page_count)):
        page = cast(PdfPage, doc[i])
        text = page.get_text()
        tables = [t.extract() for t in page.find_tables()]
        result["pages"].append({"page_num": i + 1, "text": text, "tables": tables})

    doc.close()
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
