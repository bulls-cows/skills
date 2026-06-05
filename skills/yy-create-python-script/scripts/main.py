from __future__ import annotations

import multiprocessing
import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent
SRC_DIR = PROJECT_ROOT / "src"

if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from python_script_template.__main__ import main


if __name__ == "__main__":
    multiprocessing.freeze_support()
    raise SystemExit(main())
