#!/usr/bin/env python3
"""Read .xlsx files with Python standard library only."""

from __future__ import annotations

import argparse
import json
import posixpath
import re
import sys
import zipfile
from pathlib import Path
from typing import Any, Protocol, cast
from xml.etree import ElementTree as ET


class TextStreamWithReconfigure(Protocol):
    def reconfigure(self, **kwargs: object) -> None: ...


if hasattr(sys.stdout, "reconfigure"):
    cast(TextStreamWithReconfigure, sys.stdout).reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    cast(TextStreamWithReconfigure, sys.stderr).reconfigure(encoding="utf-8")

MAIN_NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
REL_NS = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
PKG_REL_NS = "{http://schemas.openxmlformats.org/package/2006/relationships}"


def column_index(cell_ref: str) -> int:
    letters = "".join(char for char in cell_ref if char.isalpha())
    index = 0
    for char in letters:
        index = index * 26 + ord(char.upper()) - 64
    return max(index - 1, 0)


def shared_string_text(item: ET.Element) -> str:
    return "".join(text_node.text or "" for text_node in item.iter(MAIN_NS + "t"))


def read_shared_strings(workbook: zipfile.ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in workbook.namelist():
        return []

    root = ET.fromstring(workbook.read("xl/sharedStrings.xml"))
    return [shared_string_text(item) for item in root.findall(MAIN_NS + "si")]


def worksheet_zip_path(target: str) -> str:
    if target.startswith("/"):
        normalized_path = posixpath.normpath(target.lstrip("/"))
    else:
        normalized_path = posixpath.normpath(posixpath.join("xl", target))

    if normalized_path == ".." or normalized_path.startswith("../"):
        raise ValueError(f"工作表路径不合法：{target}")

    return normalized_path


def workbook_sheets(workbook: zipfile.ZipFile) -> list[tuple[str, str]]:
    workbook_root = ET.fromstring(workbook.read("xl/workbook.xml"))
    rels_root = ET.fromstring(workbook.read("xl/_rels/workbook.xml.rels"))
    rel_map = {rel.attrib["Id"]: rel.attrib["Target"] for rel in rels_root.findall(PKG_REL_NS + "Relationship")}

    sheets: list[tuple[str, str]] = []
    sheets_root = workbook_root.find(MAIN_NS + "sheets")
    if sheets_root is None:
        return sheets

    for sheet in sheets_root.findall(MAIN_NS + "sheet"):
        name = sheet.attrib["name"]
        relation_id = sheet.attrib[REL_NS + "id"]
        target = rel_map[relation_id]
        sheets.append((name, worksheet_zip_path(target)))

    return sheets


def cell_value(cell: ET.Element, shared_strings: list[str]) -> str:
    cell_type = cell.attrib.get("t")

    if cell_type == "inlineStr":
        inline = cell.find(MAIN_NS + "is")
        if inline is None:
            return ""
        return "".join(text_node.text or "" for text_node in inline.iter(MAIN_NS + "t"))

    value_node = cell.find(MAIN_NS + "v")
    if value_node is None:
        return ""

    raw_value = value_node.text or ""
    if cell_type == "s" and raw_value.isdigit():
        shared_index = int(raw_value)
        if shared_index < len(shared_strings):
            return shared_strings[shared_index]

    if cell_type == "b":
        return "TRUE" if raw_value == "1" else "FALSE"

    return raw_value


def trim_trailing_empty_cells(rows: list[list[str]]) -> list[list[str]]:
    trimmed_rows = [[cell.strip() for cell in row] for row in rows]
    while trimmed_rows and not any(trimmed_rows[-1]):
        trimmed_rows.pop()

    max_width = 0
    for row in trimmed_rows:
        for index, value in enumerate(row):
            if value:
                max_width = max(max_width, index + 1)

    return [row[:max_width] + [""] * max(0, max_width - len(row)) for row in trimmed_rows]


def read_sheet(
    workbook: zipfile.ZipFile,
    sheet_path: str,
    shared_strings: list[str],
) -> list[list[str]]:
    if sheet_path not in workbook.namelist():
        raise ValueError(f"工作表文件不存在：{sheet_path}")

    root = ET.fromstring(workbook.read(sheet_path))
    rows: list[list[str]] = []

    for row in root.findall(".//" + MAIN_NS + "row"):
        values: dict[int, str] = {}
        for cell in row.findall(MAIN_NS + "c"):
            index = column_index(cell.attrib.get("r", ""))
            values[index] = cell_value(cell, shared_strings).strip()

        if values:
            rows.append([values.get(index, "") for index in range(max(values) + 1)])

    return trim_trailing_empty_cells(rows)


def forward_fill_rows(rows: list[list[str]], columns: list[int]) -> list[list[str]]:
    if not rows or not columns:
        return rows

    filled_rows: list[list[str]] = []
    current_values = {column: "" for column in columns}
    for row in rows:
        next_row = row[:]
        for column in columns:
            if column >= len(next_row):
                continue
            if next_row[column]:
                current_values[column] = next_row[column]
            else:
                next_row[column] = current_values[column]
        filled_rows.append(next_row)

    return filled_rows


def read_xlsx(path: Path, sheet_name: str | None) -> dict[str, Any]:
    with zipfile.ZipFile(path) as workbook:
        shared_strings = read_shared_strings(workbook)
        sheets = workbook_sheets(workbook)
        selected_sheets = [sheet for sheet in sheets if sheet_name is None or sheet[0] == sheet_name]

        if sheet_name is not None and not selected_sheets:
            raise ValueError(f"未找到工作表：{sheet_name}")

        return {
            "file": str(path),
            "sheets": [
                {
                    "name": name,
                    "rows": read_sheet(workbook, sheet_path, shared_strings),
                }
                for name, sheet_path in selected_sheets
            ],
        }


def markdown_cell(value: str) -> str:
    escaped = value.replace("|", "\\|")
    parts = [part.strip() for part in re.split(r"\n+", escaped) if part.strip()]
    return "<br>".join(parts)


def render_markdown(data: dict[str, Any]) -> str:
    blocks: list[str] = []
    for sheet in data["sheets"]:
        rows = sheet["rows"]
        blocks.append(f"### {sheet['name']}")
        if not rows:
            blocks.append("\n未读取到有效数据。")
            continue

        width = max(len(row) for row in rows)
        normalized_rows = [row + [""] * (width - len(row)) for row in rows]
        header = [markdown_cell(value) or f"列{index + 1}" for index, value in enumerate(normalized_rows[0])]
        blocks.append("\n| " + " | ".join(header) + " |")
        blocks.append("|" + "|".join("---" for _ in header) + "|")
        for row in normalized_rows[1:]:
            blocks.append("| " + " | ".join(markdown_cell(value) for value in row) + " |")
        blocks.append("")

    return "\n".join(blocks).rstrip()


def render_text(data: dict[str, Any]) -> str:
    blocks: list[str] = []
    for sheet in data["sheets"]:
        blocks.append(f"[{sheet['name']}]")
        rows = sheet["rows"]
        if not rows:
            blocks.append("未读取到有效数据。")
            continue
        for index, row in enumerate(rows, start=1):
            blocks.append(f"{index}: " + "\t".join(row))
        blocks.append("")
    return "\n".join(blocks).rstrip()


def parse_fill_columns(value: str) -> list[int]:
    if not value:
        return []

    columns: list[int] = []
    for item in value.split(","):
        column = item.strip()
        if not column:
            continue
        if not column.isdigit():
            raise argparse.ArgumentTypeError(f"列索引必须是非负整数：{column}")
        columns.append(int(column))

    return columns


def main() -> int:
    parser = argparse.ArgumentParser(description="Read .xlsx content without third-party packages.")
    parser.add_argument("--file", required=True, help="Path to .xlsx file")
    parser.add_argument("--sheet", help="Only read the named worksheet")
    parser.add_argument("--format", choices=["markdown", "json", "text"], default="markdown")
    parser.add_argument("--forward-fill", action="store_true", help="Forward fill selected columns")
    parser.add_argument(
        "--fill-columns",
        default=[],
        type=parse_fill_columns,
        help="0-based column indexes, for example: 0,1",
    )
    args = parser.parse_args()

    path = Path(args.file)
    if not path.exists():
        print(f"文件不存在：{path}", file=sys.stderr)
        return 1
    if path.suffix.lower() != ".xlsx":
        print(f"仅支持 .xlsx 文件：{path}", file=sys.stderr)
        return 1

    try:
        data = read_xlsx(path, args.sheet)
        if args.forward_fill:
            for sheet in data["sheets"]:
                sheet["rows"] = forward_fill_rows(sheet["rows"], args.fill_columns)
    except (KeyError, ValueError, zipfile.BadZipFile, ET.ParseError) as error:
        print(f"读取失败：{error}", file=sys.stderr)
        return 1

    if args.format == "json":
        print(json.dumps(data, ensure_ascii=False, indent=2))
    elif args.format == "text":
        print(render_text(data))
    else:
        print(render_markdown(data))

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
