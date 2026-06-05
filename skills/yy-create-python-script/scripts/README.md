# python-script-template

这是一个脱敏后的 Python 脚本项目模板，适合快速创建命令行脚本、CSV/文件处理流水线和可选 PyInstaller 打包项目。

## 功能

- 使用 `argparse` 解析命令行参数
- 使用 `main.py` 作为可冻结入口，兼容 PyInstaller 和 multiprocessing
- 支持常见 CSV 编码回退读取，并以 `utf-8-sig` 写出结果
- 支持串行处理和按工作目录分组的并发处理
- 支持外部命令调用、超时控制和子进程清理
- 使用 `unittest` 提供基础测试，无需额外测试依赖

## 快速开始

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m unittest discover -s tests
.\.venv\Scripts\python.exe main.py .\resources\input.csv --output .\resources\output.csv
```

## 常用命令

```powershell
python main.py resources/input.csv --output resources/output.csv
python main.py resources/input.csv --workers 4
python main.py resources/input.csv --command "python helper.py" --timeout 30
./build.ps1
```

## 目录结构

```text
python-script-template/
├── main.py
├── pyproject.toml
├── requirements.txt
├── build.ps1
├── resources/
├── src/
│   └── python_script_template/
└── tests/
```

## 模板替换建议

- 将 `python-script-template` 替换为目标项目名称
- 将 `python_script_template` 替换为目标包名
- 在 `src/python_script_template/__main__.py` 的 `process_row()` 中替换示例处理逻辑
- 如需外部命令调用，调整 `build_external_command_env()` 和 `parse_external_command_result()`
