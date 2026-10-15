import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from html_to_pdf import PdfError, convert, find_browser, run_browser


class HtmlToPdfTest(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.base = Path(self.temporary.name)
        self.html = self.base / "中文 预览.html"
        self.html.write_text("<!DOCTYPE html><html><body>测试</body></html>", encoding="utf-8")
        self.output = self.html.with_suffix(".pdf")

    def fake_browser(self, command, timeout):
        self.assertIn(self.html.as_uri(), command)
        self.assertIn("--no-pdf-header-footer", command)
        target = next(value.split("=", 1)[1] for value in command if value.startswith("--print-to-pdf="))
        Path(target).write_bytes(b"%PDF-1.7\nmock")

    def test_conversion_and_force(self):
        with patch("html_to_pdf.find_browser", return_value=Path("browser")), patch("html_to_pdf.run_browser", side_effect=self.fake_browser):
            self.assertEqual(convert(self.html), self.output)
            with self.assertRaises(PdfError):
                convert(self.html)
            convert(self.html, force=True)

    def test_failure_preserves_existing_pdf(self):
        self.output.write_bytes(b"old pdf")
        for effect in (PdfError("失败"), None):
            with self.subTest(effect=effect), patch("html_to_pdf.find_browser", return_value=Path("browser")), patch("html_to_pdf.run_browser", side_effect=effect):
                with self.assertRaises(PdfError):
                    convert(self.html, force=True)
                self.assertEqual(self.output.read_bytes(), b"old pdf")

    def test_invalid_output_and_parameters(self):
        for options in ({"output": self.html}, {"timeout": 0}, {"wait_ms": -1}, {"output": self.base / "out.txt"}):
            with self.subTest(options=options), self.assertRaises(PdfError):
                convert(self.html, **options)
        with self.assertRaises(PdfError):
            convert(self.base / "missing.html")

    def test_explicit_browser(self):
        self.assertEqual(find_browser(str(self.html)), self.html)
        with patch("html_to_pdf.shutil.which", return_value=None), self.assertRaises(PdfError):
            find_browser(str(self.base / "missing.exe"))

    def test_browser_exit_failure(self):
        with patch("html_to_pdf.subprocess.Popen") as popen:
            process = popen.return_value.__enter__.return_value
            process.communicate.return_value = (b"", b"failed")
            process.returncode = 1
            with self.assertRaises(PdfError):
                run_browser(["browser"], 10)

    def test_browser_timeout(self):
        import subprocess
        with patch("html_to_pdf.subprocess.Popen") as popen, patch("html_to_pdf.subprocess.run") as terminate, patch("html_to_pdf.os.killpg", create=True) as kill:
            process = popen.return_value.__enter__.return_value
            process.pid = 123
            process.communicate.side_effect = [subprocess.TimeoutExpired("browser", 1), (b"", b"")]
            with self.assertRaises(PdfError):
                run_browser(["browser"], 1)
            self.assertTrue(terminate.called or kill.called)

    def test_invalid_pdf_preserves_old_output(self):
        def invalid_browser(command, timeout):
            target = next(value.split("=", 1)[1] for value in command if value.startswith("--print-to-pdf="))
            Path(target).write_bytes(b"not a pdf")
        self.output.write_bytes(b"old pdf")
        with patch("html_to_pdf.find_browser", return_value=Path("browser")), patch("html_to_pdf.run_browser", side_effect=invalid_browser):
            with self.assertRaises(PdfError):
                convert(self.html, force=True)
        self.assertEqual(self.output.read_bytes(), b"old pdf")


if __name__ == "__main__":
    unittest.main()
