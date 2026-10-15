"""配置驱动的 Markdown → EPUB 构建器，不负责内容撰写。"""

from __future__ import annotations

import argparse
import base64
import hashlib
import json
import os
import posixpath
import re
import sys
import tempfile
import uuid
import zipfile
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote, unquote, urlsplit
import xml.etree.ElementTree as ET


XHTML = "http://www.w3.org/1999/xhtml"
OPF = "http://www.idpf.org/2007/opf"
EPUB = "http://www.idpf.org/2007/ops"
DC = "http://purl.org/dc/elements/1.1/"
IMAGES = {".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".svg": "image/svg+xml"}
THEMES = {"eink", "reading", "technical"}
ET.register_namespace("", XHTML)
ET.register_namespace("epub", EPUB)


class BookError(ValueError):
    pass


def xml_bytes(root: ET.Element) -> bytes:
    return ET.tostring(root, encoding="utf-8", xml_declaration=True)


def document(title: str, language: str, body: ET.Element) -> bytes:
    root = ET.Element(f"{{{XHTML}}}html", {"lang": language, "{http://www.w3.org/XML/1998/namespace}lang": language})
    head = ET.SubElement(root, f"{{{XHTML}}}head")
    ET.SubElement(head, f"{{{XHTML}}}title").text = title
    ET.SubElement(head, f"{{{XHTML}}}link", {"rel": "stylesheet", "type": "text/css", "href": "style.css"})
    root.append(body)
    return xml_bytes(root)


def merge_preview_chapter(body: ET.Element, name: str, targets: dict, resources: dict) -> ET.Element:
    prefix = targets[name]
    for element in body.iter():
        if element.get("id"):
            element.set("id", prefix + "--" + element.get("id"))
        for attribute in ("aria-labelledby", "aria-describedby", "headers"):
            if element.get(attribute):
                element.set(attribute, " ".join(prefix + "--" + value for value in element.get(attribute).split()))
        if element.tag == f"{{{XHTML}}}img":
            data, media_type = resources[element.attrib["src"]]
            element.set("src", f"data:{media_type};base64," + base64.b64encode(data).decode("ascii"))
        if element.tag == f"{{{XHTML}}}a" and element.get("href"):
            uri = urlsplit(element.get("href"))
            if not uri.scheme and not uri.netloc:
                target = targets[unquote(uri.path)] if uri.path else prefix
                anchor = target + "--" + unquote(uri.fragment) if uri.fragment else target
                element.set("href", "#" + quote(anchor))
        if element.tag.startswith(f"{{{XHTML}}}"):
            element.tag = element.tag.removeprefix(f"{{{XHTML}}}")
        if f"{{{EPUB}}}type" in element.attrib:
            element.set("data-epub-type", element.attrib.pop(f"{{{EPUB}}}type"))
    body.tag = "section"
    body.set("id", prefix)
    body.set("class", "book-chapter")
    return body


def single_file_preview(title: str, language: str, chapters: list, resources: dict, css: bytes) -> bytes:
    root = ET.Element("html", {"lang": language})
    head = ET.SubElement(root, "head")
    ET.SubElement(head, "meta", {"charset": "utf-8"})
    ET.SubElement(head, "meta", {"name": "viewport", "content": "width=device-width, initial-scale=1"})
    ET.SubElement(head, "title").text = title
    ET.SubElement(head, "style").text = css.decode("utf-8-sig") + "\n" + (
        "body { max-width: 52em; margin: 2em auto; padding: 0 1em; }\n"
        ".book-chapter { margin-top: 3em; }\n"
        "@media print { body { max-width: none; margin: 0; padding: 0; } "
        ".book-chapter { break-before: page; page-break-before: always; margin-top: 0; } }\n"
    )
    body = ET.SubElement(root, "body")
    ET.SubElement(body, "h1").text = title
    nav = ET.SubElement(body, "nav", {"id": "book-toc", "aria-label": "全书目录"})
    ET.SubElement(nav, "h2").text = "目录"
    listing = ET.SubElement(nav, "ol")
    targets = {name: "book-" + Path(name).stem for name, _, _ in chapters}
    for name, chapter_title, data in chapters:
        item = ET.SubElement(listing, "li")
        ET.SubElement(item, "a", {"href": "#" + targets[name]}).text = chapter_title
        chapter_body = ET.fromstring(data).find(f"{{{XHTML}}}body")
        body.append(merge_preview_chapter(chapter_body, name, targets, resources))
    # HTML 序列化保留非空元素结束标签，避免浏览器误解析空 section 等元素。
    return b"<!DOCTYPE html>\n" + ET.tostring(root, encoding="utf-8", method="html")


def load_config(config_path: Path) -> dict:
    config_path = config_path.resolve()
    config = json.loads(config_path.read_text(encoding="utf-8-sig"))
    if not isinstance(config, dict):
        raise BookError("配置必须为 JSON 对象")
    for field in ("title", "language", "output"):
        if not isinstance(config.get(field), str) or not config[field].strip():
            raise BookError(f"配置缺少非空字符串：{field}")
    for field in ("cover", "identifier"):
        if field in config and (not isinstance(config[field], str) or not config[field].strip()):
            raise BookError(f"{field} 必须为非空字符串")
    if config.get("theme", "eink") not in THEMES:
        raise BookError("theme 必须为 eink、reading 或 technical")
    authors = config.get("authors", [])
    if not isinstance(authors, list) or any(not isinstance(author, str) or not author.strip() for author in authors):
        raise BookError("authors 必须为非空作者名的数组，可为空数组")
    if not isinstance(config.get("chapters"), list) or not config["chapters"]:
        raise BookError("chapters 必须为有序的非空数组")
    for entry in config["chapters"]:
        if not isinstance(entry, dict) or not isinstance(entry.get("file"), str):
            raise BookError("每章必须为包含 file 的对象")
        if "title" in entry and (not isinstance(entry["title"], str) or not entry["title"].strip()):
            raise BookError("章节 title 必须为非空字符串")
    config["base"] = config_path.parent
    config["config_path"] = config_path
    return config


def resolve_input(base: Path, value: str) -> Path:
    target = (base / value).resolve()
    if not target.is_file():
        raise BookError(f"输入文件不存在：{target}")
    return target


def check_markup(body: ET.Element) -> None:
    forbidden = {"script", "iframe", "object", "embed", "form", "style", "link", "base", "audio", "video", "source", "svg", "math"}
    for element in body.iter():
        tag = element.tag.rsplit("}", 1)[-1]
        if tag in forbidden:
            raise BookError(f"不支持主动内容或嵌入资源：{tag}")
        for attribute, value in element.attrib.items():
            if attribute.lower().startswith("on") or attribute in {"style", "srcset"}:
                raise BookError(f"不支持 HTML 属性：{attribute}")
            if attribute in {"href", "src"} and urlsplit(value).scheme.lower() not in {"", "http", "https", "mailto"}:
                raise BookError(f"不支持链接协议：{value}")


def validate_epub(epub_path: Path) -> dict:
    with zipfile.ZipFile(epub_path) as archive:
        entries = archive.infolist()
        if not entries or entries[0].filename != "mimetype" or entries[0].compress_type != zipfile.ZIP_STORED:
            raise BookError("首条目必须为未压缩 mimetype")
        if archive.read("mimetype") != b"application/epub+zip" or archive.testzip():
            raise BookError("EPUB ZIP 内容损坏")
        names = archive.namelist()
        if len(names) != len(set(names)):
            raise BookError("ZIP 含重复路径")
        for name in names:
            if name.startswith("/") or ".." in name.split("/"):
                raise BookError("ZIP 含不安全路径")
        container = ET.fromstring(archive.read("META-INF/container.xml"))
        rootfile = container.find(".//{urn:oasis:names:tc:opendocument:xmlns:container}rootfile")
        if rootfile is None:
            raise BookError("缺少 rootfile")
        package_path = rootfile.attrib["full-path"]
        package = ET.fromstring(archive.read(package_path))
        package_base = posixpath.dirname(package_path)
        metadata = package.find(f"{{{OPF}}}metadata")
        if metadata is None or not metadata.findtext(f"{{{DC}}}title") or not metadata.findtext(f"{{{DC}}}language"):
            raise BookError("缺少书名或语言")
        if metadata.find(f"{{{OPF}}}meta[@property='dcterms:modified']") is None:
            raise BookError("缺少修改时间")
        manifest = package.findall(f"{{{OPF}}}manifest/{{{OPF}}}item")
        ids = {item.attrib["id"]: item for item in manifest}
        if len(ids) != len(manifest):
            raise BookError("manifest ID 重复")
        parsed = {}
        nav_path = None
        for item in manifest:
            name = posixpath.normpath(posixpath.join(package_base, unquote(item.attrib["href"])))
            if name not in names:
                raise BookError(f"资源不存在：{name}")
            if item.attrib["media-type"] in {"application/xhtml+xml", "application/x-dtbncx+xml", "image/svg+xml"}:
                parsed[name] = ET.fromstring(archive.read(name))
            if "nav" in item.attrib.get("properties", "").split():
                nav_path = name
        if nav_path is None:
            raise BookError("缺少 EPUB 目录")
        spine = package.findall(f"{{{OPF}}}spine/{{{OPF}}}itemref")
        if not spine or any(item.attrib["idref"] not in ids for item in spine):
            raise BookError("阅读顺序无效")
        for name, root in parsed.items():
            anchors = [element.get("id") for element in root.iter() if element.get("id")]
            if len(anchors) != len(set(anchors)):
                raise BookError(f"重复锚点：{name}")
            for element in root.iter():
                for attribute in ("href", "src"):
                    value = element.get(attribute)
                    if not value:
                        continue
                    link = urlsplit(value)
                    if link.scheme or link.netloc:
                        continue
                    target = posixpath.normpath(posixpath.join(posixpath.dirname(name), unquote(link.path))) if link.path else name
                    if target not in names:
                        raise BookError(f"失效链接：{name} → {value}")
                    if link.fragment and (target not in parsed or not any(node.get("id") == unquote(link.fragment) for node in parsed[target].iter())):
                        raise BookError(f"失效锚点：{name} → {value}")
        return {"spine_items": len(spine), "resources": len(manifest), "status": "passed", "scope": "本地结构校验，非 EPUBCheck 或实机认证"}


def build(config_path: Path, force: bool = False) -> Path:
    try:
        import markdown
    except ImportError as error:
        raise BookError("缺少 Markdown 依赖，请安装构建器同目录的 requirements.txt") from error
    config = load_config(config_path)
    base = config["base"]
    output = (base / config["output"]).resolve()
    if output.suffix.lower() != ".epub":
        raise BookError("output 必须以 .epub 结尾")
    sources = [resolve_input(base, entry["file"]) for entry in config["chapters"]]
    if len(sources) != len(set(sources)):
        raise BookError("章节文件不能重复")
    cover = resolve_input(base, config["cover"]) if config.get("cover") else None
    preview = output.with_suffix(".preview.zip")
    preview_html = output.with_suffix(".preview.html")
    report = output.with_suffix(".report.json")
    outputs = (output, preview, preview_html, report)
    inputs = {config["config_path"], *sources, *([cover] if cover else [])}
    if any(target in inputs for target in outputs):
        raise BookError("输出不能覆盖输入文件")
    if not force and any(target.exists() for target in outputs):
        raise BookError("输出已存在；确认覆盖时添加 --force")
    resources = {}
    image_names = {}

    def add_image(path: Path) -> str:
        if path in image_names:
            return image_names[path]
        extension = path.suffix.lower()
        if extension not in IMAGES:
            raise BookError(f"图片类型不支持：{path}")
        data = path.read_bytes()
        if extension == ".svg":
            svg = ET.fromstring(data)
            if svg.tag != "{http://www.w3.org/2000/svg}svg":
                raise BookError("SVG 根元素无效")
            for element in svg.iter():
                if element.tag.rsplit("}", 1)[-1] in {"script", "foreignObject", "style"}:
                    raise BookError("SVG 含主动内容")
                for attribute, value in element.attrib.items():
                    if attribute.lower().startswith("on") or attribute.endswith("href") or "url(" in value:
                        raise BookError("SVG 不支持外部引用或主动属性")
        name = f"assets/{hashlib.sha256(data).hexdigest()}{extension}"
        resources[name] = (data, IMAGES[extension])
        image_names[path] = name
        return name

    chapters = []
    source_targets = {path: f"chapter-{index:03d}.xhtml" for index, path in enumerate(sources, 1)}
    for entry, source in zip(config["chapters"], sources):
        text = source.read_text(encoding="utf-8-sig")
        converter = markdown.Markdown(extensions=["extra", "toc"], output_format="xhtml", extension_configs={"toc": {"permalink": False}})
        body = ET.fromstring(f'<body xmlns="{XHTML}">{converter.convert(text)}</body>')
        check_markup(body)
        heading = body.find(f"{{{XHTML}}}h1")
        title = entry.get("title") or ("".join(heading.itertext()) if heading is not None else source.stem)
        for element in body.iter():
            if element.tag == f"{{{XHTML}}}img":
                uri = urlsplit(element.get("src", ""))
                if uri.scheme or uri.netloc or not uri.path:
                    raise BookError("只支持本地图片，不下载远程资源")
                path = resolve_input(source.parent, unquote(uri.path))
                inputs.add(path)
                element.set("src", add_image(path))
            elif element.tag == f"{{{XHTML}}}a":
                uri = urlsplit(element.get("href", ""))
                if uri.scheme or uri.netloc or not uri.path:
                    continue
                target = (source.parent / unquote(uri.path)).resolve()
                if target not in source_targets:
                    raise BookError(f"本地链接必须指向配置内章节：{source} → {uri.path}")
                element.set("href", source_targets[target] + ("#" + quote(unquote(uri.fragment)) if uri.fragment else ""))
        chapters.append((source_targets[source], title, document(title, config["language"], body)))
    if cover:
        cover_name = add_image(cover)
        body = ET.Element(f"{{{XHTML}}}body")
        ET.SubElement(body, f"{{{XHTML}}}img", {"src": cover_name, "alt": config["title"]})
        chapters.insert(0, ("cover.xhtml", "封面", document(config["title"], config["language"], body)))
    if any(target in inputs for target in outputs):
        raise BookError("输出不能覆盖图片输入")
    css = (Path(__file__).parent / "themes" / (config.get("theme", "eink") + ".css")).read_bytes()
    resources["style.css"] = (css, "text/css")
    for name, _, data in chapters:
        resources[name] = (data, "application/xhtml+xml")
    nav_body = ET.Element(f"{{{XHTML}}}body")
    nav = ET.SubElement(nav_body, f"{{{XHTML}}}nav", {f"{{{EPUB}}}type": "toc", "id": "toc"})
    ET.SubElement(nav, f"{{{XHTML}}}h1").text = "目录"
    listing = ET.SubElement(nav, f"{{{XHTML}}}ol")
    for name, title, _ in chapters:
        item = ET.SubElement(listing, f"{{{XHTML}}}li")
        ET.SubElement(item, f"{{{XHTML}}}a", {"href": name}).text = title
    resources["nav.xhtml"] = (document("目录", config["language"], nav_body), "application/xhtml+xml")
    identifier = config.get("identifier") or "urn:uuid:" + str(uuid.uuid5(uuid.NAMESPACE_URL, config["title"] + "|" + "|".join(config.get("authors", []))))
    modified = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    package = ET.Element(f"{{{OPF}}}package", {"version": "3.0", "unique-identifier": "book-id"})
    metadata = ET.SubElement(package, f"{{{OPF}}}metadata")
    ET.SubElement(metadata, f"{{{DC}}}identifier", {"id": "book-id"}).text = identifier
    ET.SubElement(metadata, f"{{{DC}}}title").text = config["title"]
    ET.SubElement(metadata, f"{{{DC}}}language").text = config["language"]
    for author in config.get("authors", []):
        ET.SubElement(metadata, f"{{{DC}}}creator").text = author
    ET.SubElement(metadata, f"{{{OPF}}}meta", {"property": "dcterms:modified"}).text = modified
    manifest = ET.SubElement(package, f"{{{OPF}}}manifest")
    resource_ids = {}
    for index, (name, (data, media_type)) in enumerate(resources.items()):
        resource_id = f"resource-{index}"
        resource_ids[name] = resource_id
        attributes = {"id": resource_id, "href": name, "media-type": media_type}
        if name == "nav.xhtml":
            attributes["properties"] = "nav"
        elif cover and name == cover_name:
            attributes["properties"] = "cover-image"
        ET.SubElement(manifest, f"{{{OPF}}}item", attributes)
    spine = ET.SubElement(package, f"{{{OPF}}}spine")
    for name, _, _ in chapters:
        ET.SubElement(spine, f"{{{OPF}}}itemref", {"idref": resource_ids[name]})
    container = b'<?xml version="1.0" encoding="UTF-8"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>'
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="book-builder-", dir=output.parent) as directory:
        temporary = Path(directory) / "book.epub"
        with zipfile.ZipFile(temporary, "w") as archive:
            archive.writestr("mimetype", b"application/epub+zip", compress_type=zipfile.ZIP_STORED)
            archive.writestr("META-INF/container.xml", container, compress_type=zipfile.ZIP_DEFLATED)
            archive.writestr("OEBPS/content.opf", xml_bytes(package), compress_type=zipfile.ZIP_DEFLATED)
            for name, (data, _) in resources.items():
                archive.writestr("OEBPS/" + name, data, compress_type=zipfile.ZIP_DEFLATED)
        validation = validate_epub(temporary)
        temporary_preview = Path(directory) / "preview.zip"
        with zipfile.ZipFile(temporary_preview, "w", zipfile.ZIP_DEFLATED) as archive:
            for name, (data, _) in resources.items():
                archive.writestr(name, data)
        temporary_html = Path(directory) / "preview.html"
        temporary_html.write_bytes(single_file_preview(config["title"], config["language"], chapters, resources, css))
        temporary_report = Path(directory) / "report.json"
        temporary_report.write_text(json.dumps({"title": config["title"], "modified": modified, "validation": validation}, ensure_ascii=False, indent=2), encoding="utf-8")
        os.replace(temporary_preview, preview)
        os.replace(temporary_html, preview_html)
        os.replace(temporary_report, report)
        os.replace(temporary, output)
    return output


def main() -> int:
    parser = argparse.ArgumentParser(description="把已有 Markdown 书稿构建为 EPUB，不生成正文")
    commands = parser.add_subparsers(dest="command", required=True)
    build_parser = commands.add_parser("build", help="根据 book.json 构建")
    build_parser.add_argument("config", type=Path)
    build_parser.add_argument("--force", action="store_true", help="覆盖既有输出，不覆盖输入")
    check_parser = commands.add_parser("check", help="通用 EPUB 本地结构校验")
    check_parser.add_argument("epub", type=Path)
    arguments = parser.parse_args()
    try:
        if arguments.command == "build":
            print(f"构建完成：{build(arguments.config, arguments.force)}")
        else:
            print(json.dumps(validate_epub(arguments.epub), ensure_ascii=False, indent=2))
        return 0
    except (ValueError, OSError, KeyError, TypeError, ET.ParseError, zipfile.BadZipFile) as error:
        print(f"错误：{error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
