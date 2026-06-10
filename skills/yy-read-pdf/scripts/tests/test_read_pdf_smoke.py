import unittest
from pathlib import Path


class ReadPdfSmokeTest(unittest.TestCase):
    def test_read_pdf_script_exists(self) -> None:
        self.assertTrue((Path(__file__).resolve().parents[1] / "read_pdf.py").is_file())
