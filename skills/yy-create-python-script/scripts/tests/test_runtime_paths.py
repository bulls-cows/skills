from __future__ import annotations

import sys
import unittest
from pathlib import Path
from unittest.mock import patch

PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = PROJECT_ROOT / "src"

if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from python_script_template.__main__ import PROJECT_ROOT as PACKAGE_PROJECT_ROOT
from python_script_template.__main__ import get_runtime_base_dir


class RuntimePathTests(unittest.TestCase):
    def test_get_runtime_base_dir_uses_project_root_in_source_mode(self) -> None:
        self.assertEqual(PACKAGE_PROJECT_ROOT, get_runtime_base_dir())

    def test_get_runtime_base_dir_uses_executable_dir_in_frozen_mode(self) -> None:
        with patch.object(sys, "frozen", True, create=True):
            self.assertEqual(Path(sys.executable).resolve().parent, get_runtime_base_dir())


if __name__ == "__main__":
    unittest.main()
