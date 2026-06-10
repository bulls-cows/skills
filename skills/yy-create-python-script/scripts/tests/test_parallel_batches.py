from __future__ import annotations

import sys
import unittest
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = PROJECT_ROOT / "src"

if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from python_script_template.__main__ import build_parallel_batches


class ParallelBatchTests(unittest.TestCase):
    def test_same_work_dir_is_split_into_different_batches(self) -> None:
        rows = [
            (1, {"WorkDir": r"D:\case-a\input.csv"}),
            (2, {"WorkDir": r"D:\case-a\input.csv"}),
            (3, {"WorkDir": r"D:\case-b\input.csv"}),
        ]

        batches = build_parallel_batches(rows, Path(r"D:\csv"), worker_count=2)

        self.assertEqual([[1, 3], [2]], [[row_index for row_index, _ in batch] for batch in batches])


if __name__ == "__main__":
    unittest.main()
