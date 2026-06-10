from __future__ import annotations

import sys
import unittest
from pathlib import Path

SCRIPTS_DIR = Path(__file__).resolve().parents[1]
if str(SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIR))

import read_xlsx


class ReadXlsxHelperTests(unittest.TestCase):
    def test_column_index_converts_excel_letters(self) -> None:
        self.assertEqual(0, read_xlsx.column_index("A1"))
        self.assertEqual(25, read_xlsx.column_index("Z9"))
        self.assertEqual(26, read_xlsx.column_index("AA10"))

    def test_worksheet_zip_path_normalizes_relative_targets(self) -> None:
        self.assertEqual("xl/worksheets/sheet1.xml", read_xlsx.worksheet_zip_path("worksheets/sheet1.xml"))
        self.assertEqual("xl/worksheets/sheet2.xml", read_xlsx.worksheet_zip_path("/xl/worksheets/sheet2.xml"))
        self.assertEqual("xl/sheet3.xml", read_xlsx.worksheet_zip_path("worksheets/../sheet3.xml"))

    def test_worksheet_zip_path_rejects_escape_targets(self) -> None:
        with self.assertRaises(ValueError):
            read_xlsx.worksheet_zip_path("../../outside.xml")

    def test_parse_fill_columns_accepts_comma_separated_indexes(self) -> None:
        self.assertEqual([0, 2, 4], read_xlsx.parse_fill_columns("0, 2,4"))

    def test_parse_fill_columns_rejects_invalid_indexes(self) -> None:
        with self.assertRaises(read_xlsx.argparse.ArgumentTypeError):
            read_xlsx.parse_fill_columns("0,a")

    def test_forward_fill_rows_fills_selected_columns(self) -> None:
        rows = [["品牌", "门店"], ["A", "一店"], ["", "二店"], ["B", "三店"]]
        self.assertEqual(
            [["品牌", "门店"], ["A", "一店"], ["A", "二店"], ["B", "三店"]],
            read_xlsx.forward_fill_rows(rows, [0]),
        )

    def test_markdown_cell_escapes_pipe_and_line_breaks(self) -> None:
        self.assertEqual("A\\|B<br>C", read_xlsx.markdown_cell("A|B\nC"))


if __name__ == "__main__":
    unittest.main()
