from __future__ import annotations

import csv
import sys
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = PROJECT_ROOT / "src"

if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from python_script_template.__main__ import process_csv, ScriptConfig


class CsvPipelineTests(unittest.TestCase):
    def test_process_csv_writes_status_columns(self) -> None:
        with TemporaryDirectory() as tmp_dir:
            tmp_path = Path(tmp_dir)
            input_path = tmp_path / "input.csv"
            output_path = tmp_path / "output.csv"
            input_path.write_text("Name,Value\ncase-a,1\n", encoding="utf-8-sig")

            process_csv(
                ScriptConfig(
                    input_path=input_path,
                    output_path=output_path,
                    workers=1,
                    command=None,
                    timeout_seconds=0,
                )
            )

            with output_path.open("r", encoding="utf-8-sig", newline="") as file:
                rows = list(csv.DictReader(file))

        self.assertEqual("success", rows[0]["Status"])
        self.assertEqual("已完成模板示例处理", rows[0]["Message"])


if __name__ == "__main__":
    unittest.main()
