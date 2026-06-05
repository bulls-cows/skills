from __future__ import annotations

import argparse
import atexit
import csv
import io
import json
import os
import shlex
import signal
import subprocess
import sys
from concurrent.futures import Future, ProcessPoolExecutor, as_completed
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


PROJECT_ROOT = Path(__file__).resolve().parents[2]
STATUS_COLUMN = "Status"
MESSAGE_COLUMN = "Message"
WORK_DIR_COLUMN = "WorkDir"
CSV_FALLBACK_ENCODINGS = ("utf-8-sig", "utf-8", "gb18030", "gbk", "big5")
CSV_UTF16_ENCODINGS = ("utf-16", "utf-16-le", "utf-16-be")
ACTIVE_CHILD_PIDS: set[int] = set()


class ExternalCommandTimeout(Exception):
    def __init__(self, timeout_seconds: int, completed: subprocess.CompletedProcess[str]) -> None:
        super().__init__(f"外部命令超时：{timeout_seconds} 秒")
        self.timeout_seconds = timeout_seconds
        self.completed = completed


@dataclass(frozen=True)
class ScriptConfig:
    input_path: Path
    output_path: Path
    workers: int
    command: str | None
    timeout_seconds: int


@dataclass(frozen=True)
class ExternalCommandResult:
    status: bool
    message: str
    stdout: str = ""
    stderr: str = ""


@dataclass(frozen=True)
class RowProcessResult:
    row_index: int
    row_name: str
    row: dict[str, str]
    command_result: ExternalCommandResult


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    config = build_config(args)
    atexit.register(cleanup_active_child_processes)

    try:
        process_csv(config)
    except Exception as exc:
        print(f"处理失败：{exc}", file=sys.stderr)
        return 1
    finally:
        cleanup_active_child_processes()

    print(f"处理完成：{config.output_path}")
    return 0


def parse_args(argv: list[str] | None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="读取 CSV 并执行通用 Python 脚本流水线")
    parser.add_argument("input", type=Path, help="输入 CSV 路径")
    parser.add_argument("--output", type=Path, default=None, help="输出 CSV 路径")
    parser.add_argument("--workers", type=int, default=0, help="并发进程数，0 表示自动选择")
    parser.add_argument("--command", default=None, help="可选外部命令，命令会对每一行执行一次")
    parser.add_argument("--timeout", type=int, default=0, help="单行外部命令超时时间，0 表示不限制")
    return parser.parse_args(argv)


def build_config(args: argparse.Namespace) -> ScriptConfig:
    input_path = args.input.resolve()
    output_path = args.output.resolve() if args.output else input_path.with_name(f"{input_path.stem}_output.csv")

    return ScriptConfig(
        input_path=input_path,
        output_path=output_path,
        workers=args.workers,
        command=args.command,
        timeout_seconds=args.timeout,
    )


def get_runtime_base_dir() -> Path:
    if getattr(sys, "frozen", False):
        return Path(sys.executable).resolve().parent

    return PROJECT_ROOT


def process_csv(config: ScriptConfig) -> None:
    if not config.input_path.exists():
        raise FileNotFoundError(f"输入 CSV 不存在：{config.input_path}")

    rows, fieldnames = read_csv(config.input_path)
    output_fieldnames = append_result_columns(fieldnames)
    row_results = run_rows(rows, config)
    output_rows = build_output_rows(row_results)
    write_csv(config.output_path, output_fieldnames, output_rows)


def run_rows(rows: list[dict[str, str]], config: ScriptConfig) -> list[RowProcessResult]:
    worker_count = resolve_worker_count(len(rows), config.workers)
    if worker_count <= 1:
        return run_rows_serial(rows, config)

    return run_rows_parallel(rows, config, worker_count)


def resolve_worker_count(total_count: int, requested_workers: int) -> int:
    if total_count <= 1:
        return 1
    if requested_workers > 0:
        return min(requested_workers, total_count)

    cpu_count = os.cpu_count() or 1
    return min(cpu_count, total_count)


def run_rows_serial(rows: list[dict[str, str]], config: ScriptConfig) -> list[RowProcessResult]:
    results: list[RowProcessResult] = []
    total_count = len(rows)

    for row_index, row in enumerate(rows, start=1):
        result = process_row(row_index, row, config)
        print_row_result(result, len(results) + 1, total_count)
        results.append(result)

    return results


def run_rows_parallel(
    rows: list[dict[str, str]],
    config: ScriptConfig,
    worker_count: int,
) -> list[RowProcessResult]:
    indexed_rows = list(enumerate(rows, start=1))
    batches = build_parallel_batches(indexed_rows, config.input_path.parent, worker_count)
    results: list[RowProcessResult] = []
    futures: dict[Future[list[RowProcessResult]], None] = {}
    total_count = len(rows)

    with ProcessPoolExecutor(max_workers=worker_count) as executor:
        for batch in batches:
            futures[executor.submit(process_batch, batch, config)] = None

        for future in as_completed(futures):
            for result in future.result():
                print_row_result(result, len(results) + 1, total_count)
                results.append(result)

    return sorted(results, key=lambda item: item.row_index)


def build_parallel_batches(
    indexed_rows: list[tuple[int, dict[str, str]]],
    input_dir: Path,
    worker_count: int,
) -> list[list[tuple[int, dict[str, str]]]]:
    batches: list[list[tuple[int, dict[str, str]]]] = [[] for _ in range(worker_count)]
    last_batch_by_work_key: dict[str, int] = {}

    for row_index, row in indexed_rows:
        work_key = get_row_work_dir_key(row, input_dir)
        candidate_indexes = sorted(range(worker_count), key=lambda index: len(batches[index]))

        selected_index = candidate_indexes[0]
        for candidate_index in candidate_indexes:
            if last_batch_by_work_key.get(work_key) != candidate_index:
                selected_index = candidate_index
                break

        batches[selected_index].append((row_index, row))
        last_batch_by_work_key[work_key] = selected_index

    return [batch for batch in batches if batch]


def process_batch(indexed_rows: list[tuple[int, dict[str, str]]], config: ScriptConfig) -> list[RowProcessResult]:
    return [process_row(row_index, row, config) for row_index, row in indexed_rows]


def process_row(row_index: int, row: dict[str, str], config: ScriptConfig) -> RowProcessResult:
    row_name = get_row_name(row, row_index)
    normalized_row = dict(row)

    if config.command:
        command_result = run_external_command_for_row(normalized_row, config)
    else:
        command_result = ExternalCommandResult(status=True, message="已完成模板示例处理")

    normalized_row[STATUS_COLUMN] = "success" if command_result.status else "failed"
    normalized_row[MESSAGE_COLUMN] = command_result.message

    return RowProcessResult(
        row_index=row_index,
        row_name=row_name,
        row=normalized_row,
        command_result=command_result,
    )


def run_external_command_for_row(row: dict[str, str], config: ScriptConfig) -> ExternalCommandResult:
    if not config.command:
        return ExternalCommandResult(status=True, message="未配置外部命令")

    command = shlex.split(config.command, posix=os.name != "nt")
    completed = run_process_with_cleanup(
        command=command,
        cwd=config.input_path.parent,
        timeout_seconds=config.timeout_seconds,
        env=build_external_command_env(row),
    )

    return parse_external_command_result(completed)


def build_external_command_env(row: dict[str, str]) -> dict[str, str]:
    env = os.environ.copy()
    env["SCRIPT_ROW_JSON"] = json.dumps(row, ensure_ascii=False)
    return env


def parse_external_command_result(completed: subprocess.CompletedProcess[str]) -> ExternalCommandResult:
    message = completed.stdout.strip() or completed.stderr.strip() or f"退出码：{completed.returncode}"
    return ExternalCommandResult(
        status=completed.returncode == 0,
        message=message,
        stdout=completed.stdout,
        stderr=completed.stderr,
    )


def print_row_result(result: RowProcessResult, completed_count: int, total_count: int) -> None:
    status_text = "成功" if result.command_result.status else "失败"
    print(f"[{completed_count}/{total_count}] {result.row_name}：{status_text} - {result.command_result.message}")


def build_output_rows(row_results: list[RowProcessResult]) -> list[dict[str, str]]:
    return [result.row for result in sorted(row_results, key=lambda item: item.row_index)]


def get_row_name(row: dict[str, str], row_index: int) -> str:
    for key in ("Name", "Title", "Id", "ID", "id"):
        if row.get(key):
            return row[key]

    return f"第 {row_index} 行"


def read_csv(csv_path: Path) -> tuple[list[dict[str, str]], list[str]]:
    text = decode_csv_text(csv_path)
    reader = csv.DictReader(io.StringIO(text))
    fieldnames = list(reader.fieldnames or [])
    rows = [normalize_row(row) for row in reader]
    return rows, fieldnames


def decode_csv_text(csv_path: Path) -> str:
    csv_bytes = csv_path.read_bytes()
    for encoding in get_csv_encoding_candidates(csv_bytes):
        try:
            text = csv_bytes.decode(encoding)
        except UnicodeDecodeError:
            continue
        if is_plausible_csv_text(text):
            return text

    raise UnicodeDecodeError("csv", csv_bytes, 0, len(csv_bytes), "无法识别 CSV 编码")


def get_csv_encoding_candidates(csv_bytes: bytes) -> tuple[str, ...]:
    if csv_bytes.startswith((b"\xff\xfe", b"\xfe\xff")):
        return (*CSV_UTF16_ENCODINGS, *CSV_FALLBACK_ENCODINGS)

    sample = csv_bytes[:200]
    if sample.count(b"\x00") > 0:
        return (*CSV_UTF16_ENCODINGS, *CSV_FALLBACK_ENCODINGS)

    return CSV_FALLBACK_ENCODINGS


def is_plausible_csv_text(text: str) -> bool:
    if not text.strip("\ufeff\r\n\t "):
        return False

    first_line = text.splitlines()[0] if text.splitlines() else ""
    return "\x00" not in first_line


def write_csv(output_path: Path, fieldnames: list[str], rows: Iterable[dict[str, str]]) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def normalize_row(row: dict[str, str | None]) -> dict[str, str]:
    return {key: value or "" for key, value in row.items()}


def append_result_columns(fieldnames: list[str]) -> list[str]:
    output_fieldnames = list(fieldnames)
    for column in [STATUS_COLUMN, MESSAGE_COLUMN]:
        if column not in output_fieldnames:
            output_fieldnames.append(column)

    return output_fieldnames


def get_row_work_dir_key(row: dict[str, str], input_dir: Path) -> str:
    work_dir_value = row.get(WORK_DIR_COLUMN, "")
    if work_dir_value:
        work_dir = resolve_csv_path(input_dir, work_dir_value)
        return str(work_dir.parent if work_dir.is_file() else work_dir)

    return str(input_dir)


def resolve_csv_path(csv_dir: Path, value: str) -> Path:
    path = Path(value)
    if not path.is_absolute():
        path = csv_dir / path


    return path.resolve()


def run_process_with_cleanup(
    command: list[str],
    cwd: Path,
    timeout_seconds: int,
    env: dict[str, str] | None = None,
) -> subprocess.CompletedProcess[str]:
    process = subprocess.Popen(
        command,
        cwd=cwd,
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        stdin=subprocess.DEVNULL,
        text=True,
        encoding="utf-8",
        errors="replace",
        **build_popen_process_group_kwargs(),
    )
    register_active_child_process(process.pid)

    try:
        stdout, stderr = process.communicate(timeout=timeout_seconds or None)
    except subprocess.TimeoutExpired as exc:
        completed = kill_process_and_collect_output(process, command)
        raise ExternalCommandTimeout(timeout_seconds, completed) from exc
    except BaseException:
        kill_process_and_collect_output(process, command)
        raise
    finally:
        unregister_active_child_process(process.pid)

    return subprocess.CompletedProcess(command, process.returncode, stdout, stderr)


def build_popen_process_group_kwargs() -> dict[str, int | bool]:
    if os.name == "nt":
        return {"creationflags": subprocess.CREATE_NEW_PROCESS_GROUP}
    return {"start_new_session": True}


def kill_process_and_collect_output(
    process: subprocess.Popen[str],
    command: list[str],
) -> subprocess.CompletedProcess[str]:
    kill_process_tree(process.pid)
    stdout, stderr = process.communicate()
    return subprocess.CompletedProcess(command, process.returncode, stdout, stderr)


def register_active_child_process(pid: int) -> None:
    ACTIVE_CHILD_PIDS.add(pid)


def unregister_active_child_process(pid: int) -> None:
    ACTIVE_CHILD_PIDS.discard(pid)


def cleanup_active_child_processes() -> None:
    for pid in list(ACTIVE_CHILD_PIDS):
        kill_process_tree(pid)
        unregister_active_child_process(pid)


def kill_process_tree(pid: int) -> None:
    if os.name == "nt":
        subprocess.run(
            ["taskkill", "/F", "/T", "/PID", str(pid)],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=False,
        )
        return

    try:
        os.killpg(pid, signal.SIGTERM)
    except ProcessLookupError:
        return
