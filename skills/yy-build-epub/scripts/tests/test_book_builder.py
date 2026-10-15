import json
import base64
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from book_builder import BookError, build, validate_epub


class PreviewParser(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.elements = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))


class BookBuilderTest(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.base = Path(self.temporary.name)
        self.source = self.base / "chapter.md"
        self.source.write_text("# 内容\n\n**粗体**和脚注[^a]。\n\n[^a]: 注解。\n", encoding="utf-8")
        self.config = self.base / "book.json"
        self.data = {"title": "通用书", "language": "en", "authors": ["作者"], "output": "out/book.epub", "chapters": [{"file": "chapter.md"}]}
        self.save_config()

    def save_config(self):
        self.config.write_text(json.dumps(self.data, ensure_ascii=False), encoding="utf-8")

    def test_markdown_footnotes_and_language(self):
        output = build(self.config)
        self.assertEqual(validate_epub(output)["spine_items"], 1)
        with zipfile.ZipFile(output) as archive:
            chapter = archive.read("OEBPS/chapter-001.xhtml").decode()
            self.assertIn("<strong>", chapter)
            self.assertIn('id="fn:a"', chapter)
            self.assertIn('lang="en"', chapter)
        self.assertTrue(output.with_suffix(".preview.zip").is_file())
        preview = output.with_suffix(".preview.html").read_text(encoding="utf-8")
        self.assertTrue(preview.startswith("<!DOCTYPE html>"))
        self.assertIn('<html lang="en">', preview)
        self.assertIn('<meta charset="utf-8">', preview)
        self.assertIn('<title>通用书</title>', preview)
        self.assertIn('<strong>粗体</strong>', preview)
        self.assertIn('<style>', preview)
        self.assertNotIn('href="style.css"', preview)

    def test_existing_output_requires_force(self):
        output = build(self.config)
        previous = output.read_bytes()
        with self.assertRaises(BookError):
            build(self.config)
        self.assertEqual(output.read_bytes(), previous)
        build(self.config, force=True)

    def test_broken_link_preserves_existing_book(self):
        output = build(self.config)
        previous = output.read_bytes()
        previous_html = output.with_suffix(".preview.html").read_bytes()
        self.source.write_text("# 内容\n\n[失效](#missing)", encoding="utf-8")
        with self.assertRaises(BookError):
            build(self.config, force=True)
        self.assertEqual(output.read_bytes(), previous)
        self.assertEqual(output.with_suffix(".preview.html").read_bytes(), previous_html)

    def test_existing_html_alone_requires_force(self):
        preview = self.base / "out/book.preview.html"
        preview.parent.mkdir()
        preview.write_text("原有预览", encoding="utf-8")
        with self.assertRaises(BookError):
            build(self.config)
        self.assertEqual(preview.read_text(encoding="utf-8"), "原有预览")
        self.assertFalse((self.base / "out/book.epub").exists())
        build(self.config, force=True)
        self.assertIn("<!DOCTYPE html>", preview.read_text(encoding="utf-8"))

    def test_single_html_unique_ids_and_cross_chapter_links(self):
        second = self.base / "第二章.md"
        content = "# 标题 {#same}\n\n脚注[^a]。\n\n[本章](#same)\n\n[^a]: 注解。\n"
        second.write_text(content + "\n[上一章](chapter.md#same)", encoding="utf-8")
        self.source.write_text(content + "\n[下一章](第二章.md#same)\n\n[章首](第二章.md)\n\n[外部](https://example.com/a#same)", encoding="utf-8")
        self.data["chapters"][0]["title"] = "第一章自定义"
        self.data["chapters"].append({"file": "第二章.md", "title": "第二章自定义"})
        self.save_config()
        output = build(self.config)
        preview = output.with_suffix(".preview.html").read_text(encoding="utf-8")
        elements = PreviewParser(preview).elements
        ids = [attrs["id"] for _, attrs in elements if "id" in attrs]
        self.assertEqual(len(ids), len(set(ids)))
        links = [attrs["href"] for tag, attrs in elements if tag == "a"]
        for link in links:
            if link.startswith("#"):
                self.assertIn(unquote(link[1:]), ids)
        self.assertIn("#book-chapter-002--same", links)
        self.assertIn("#book-chapter-001--same", links)
        self.assertIn("#book-chapter-002", links)
        self.assertIn("#book-chapter-001--fn%3Aa", links)
        self.assertIn("#book-chapter-002--fnref%3Aa", links)
        self.assertIn("https://example.com/a#same", links)
        self.assertIn("第一章自定义", preview)
        self.assertIn("第二章自定义", preview)

    def test_cross_chapter_link_and_table(self):
        second = self.base / "second.md"
        second.write_text("# 二\n\n## 标题 {#target}\n\n| A | B |\n|---|---|\n|1|2|", encoding="utf-8")
        self.source.write_text("# 一\n\n[下一章](second.md#target)", encoding="utf-8")
        self.data["chapters"].append({"file": "second.md"})
        self.save_config()
        output = build(self.config)
        self.assertEqual(validate_epub(output)["spine_items"], 2)
        with zipfile.ZipFile(output) as archive:
            self.assertIn(b"<table>", archive.read("OEBPS/chapter-002.xhtml"))

    def test_image_packaging(self):
        image = self.base / "image.svg"
        image.write_text('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10"/></svg>', encoding="utf-8")
        self.source.write_text("# 一\n\n![图片](image.svg)", encoding="utf-8")
        self.data["cover"] = "image.svg"
        self.save_config()
        output = build(self.config)
        with zipfile.ZipFile(output) as archive:
            self.assertEqual(len([name for name in archive.namelist() if name.startswith("OEBPS/assets/")]), 1)
            self.assertIn(b"cover-image", archive.read("OEBPS/content.opf"))
        preview = output.with_suffix(".preview.html").read_text(encoding="utf-8")
        elements = PreviewParser(preview).elements
        images = [attrs["src"] for tag, attrs in elements if tag == "img"]
        self.assertEqual(len(images), 2)
        for uri in images:
            self.assertTrue(uri.startswith("data:image/svg+xml;base64,"))
            self.assertEqual(base64.b64decode(uri.split(",", 1)[1]), image.read_bytes())
        self.assertIn('id="book-cover"', preview)
        self.assertFalse(any(tag in {"link", "script"} for tag, _ in elements))

    def test_remote_image_and_active_content_rejected(self):
        for text in ("# A\n\n![图片](https://example.com/p.png)", "# A\n\n<script>alert(1)</script>", '# A\n\n<a href="javascript:alert(1)">点击</a>'):
            with self.subTest(text=text):
                self.source.write_text(text, encoding="utf-8")
                with self.assertRaises(BookError):
                    build(self.config)

    def test_invalid_config_and_duplicate_chapters(self):
        self.data["chapters"].append({"file": "chapter.md"})
        self.save_config()
        with self.assertRaises(BookError):
            build(self.config)

    def test_each_theme(self):
        for theme in ("eink", "reading", "technical"):
            self.data["theme"] = theme
            self.save_config()
            build(self.config, force=True)


if __name__ == "__main__":
    unittest.main()
