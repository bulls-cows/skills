"""使用本机 Chromium 浏览器把可信本地 HTML 打印为 PDF，无第三方 Python 依赖。"""

from __future__ import annotations

import argparse
import os
import shutil
import signal
import subprocess
import sys
import tempfile
from pathlib import Path


class PdfError(ValueError):
    pass


def find_browser(explicit: str | None = None) -> Path:
    if explicit:
        candidate = Path(explicit).expanduser()
        if candidate.is_file():
            return candidate.resolve()
        executable = shutil.which(explicit)
        if executable:
            return Path(executable).resolve()
        raise PdfError(f"浏览器不存在：{explicit}")
    for command in ("chrome", "msedge", "google-chrome", "google-chrome-stable", "chromium", "chromium-browser"):
        executable = shutil.which(command)
        if executable:
            return Path(executable).resolve()
    candidates = []
    for variable in ("PROGRAMFILES", "PROGRAMFILES(X86)", "LOCALAPPDATA"):
        if os.environ.get(variable):
            for relative in ("Google/Chrome/Application/chrome.exe", "Microsoft/Edge/Application/msedge.exe"):
                candidates.append(Path(os.environ[variable]) / relative)
    candidates.extend([Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"),
                       Path("/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge")])
    for candidate in candidates:
        if candidate.is_file():
            return candidate.resolve()
    raise PdfError("未找到 Chrome/Edge/Chromium；请安装浏览器，或用 --browser 指定可执行文件")


def run_browser(command: list[str], timeout: int) -> None:
    options = {"start_new_session": True} if os.name != "nt" else {"creationflags": subprocess.CREATE_NO_WINDOW}
    with subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, **options) as process:
        try:
            _, stderr = process.communicate(timeout=timeout)
        except subprocess.TimeoutExpired as error:
            if os.name == "nt":
                subprocess.run(["taskkill", "/PID", str(process.pid), "/T", "/F"],
                               capture_output=True, check=False, timeout=10)
            else:
                os.killpg(process.pid, signal.SIGKILL)
            process.communicate()
            raise PdfError(f"PDF 转换超过 {timeout} 秒；可用 --timeout 增加上限") from error
        if process.returncode:
            detail = stderr.decode("utf-8", errors="replace")[-2000:]
            raise PdfError(f"浏览器退出码 {process.returncode}：{detail}")


def convert(html: Path, output: Path | None = None, browser: str | None = None,
            force: bool = False, timeout: int = 60, wait_ms: int = 1000) -> Path:
    html = html.expanduser().resolve()
    if not html.is_file() or html.suffix.lower() not in {".html", ".htm"}:
        raise PdfError(f"输入必须是已有本地 HTML 文件：{html}")
    output = output.expanduser().resolve() if output else html.with_suffix(".pdf")
    if output == html or output.suffix.lower() != ".pdf":
        raise PdfError("输出必须以 .pdf 结尾，且不能覆盖输入 HTML")
    if timeout <= 0 or wait_ms < 0:
        raise PdfError("timeout 必须大于 0，wait-ms 不能为负数")
    if output.exists() and not force:
        raise PdfError("PDF 已存在；确认覆盖时添加 --force")
    executable = find_browser(browser)
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="html-to-pdf-", dir=output.parent, ignore_cleanup_errors=True) as directory:
        temporary = Path(directory) / "result.pdf"
        command = [str(executable), "--headless", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
                   "--no-pdf-header-footer", f"--user-data-dir={Path(directory) / 'profile'}",
                   f"--print-to-pdf={temporary}", f"--virtual-time-budget={wait_ms}", html.as_uri()]
        run_browser(command, timeout)
        if not temporary.is_file() or temporary.stat().st_size < 5:
            raise PdfError("浏览器未生成 PDF；请检查浏览器版本或 HTML 内容")
        with temporary.open("rb") as stream:
            if stream.read(5) != b"%PDF-":
                raise PdfError("浏览器输出不是 PDF，旧文件未替换")
        os.replace(temporary, output)
    return output


def main() -> int:
    parser = argparse.ArgumentParser(description="将可信本地 HTML 打印成 PDF（需要 Chrome/Edge/Chromium）")
    parser.add_argument("html", type=Path, help="本地 HTML 文件")
    parser.add_argument("-o", "--output", type=Path, help="PDF 路径；默认将 HTML 后缀改为 .pdf")
    parser.add_argument("--browser", help="浏览器可执行文件路径或 PATH 中的命令名")
    parser.add_argument("--force", action="store_true", help="覆盖已有 PDF")
    parser.add_argument("--timeout", type=int, default=60, help="实际运行超时秒数，默认 60")
    parser.add_argument("--wait-ms", type=int, default=1000, help="浏览器虚拟时间预算毫秒数，默认 1000")
    args = parser.parse_args()
    try:
        print(f"PDF 已生成：{convert(args.html, args.output, args.browser, args.force, args.timeout, args.wait_ms)}")
        return 0
    except (ValueError, OSError, subprocess.SubprocessError) as error:
        print(f"错误：{error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
