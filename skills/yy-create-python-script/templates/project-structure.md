# 项目结构说明

`scripts/` 是该技能的唯一权威模板工程。创建目标项目时，以 `scripts/` 下的实际文件为准，本文件仅用于快速理解目录职责。

```text
project-name/
├── .editorconfig
├── .gitignore
├── build.ps1
├── main.py
├── package.json
├── pyproject.toml
├── python-script-template.spec
├── README.md
├── requirements.txt
├── resources/
├── src/
│   └── python_script_template/
└── tests/
```

## 职责说明

- `main.py`：可冻结入口，处理 `src/` 路径注入和 `multiprocessing.freeze_support()`
- `src/python_script_template/__main__.py`：统一脚本入口，包含 CLI、CSV 读写、并发批次、子进程清理和结果写入
- `src/python_script_template/__init__.py`：包版本占位
- `tests/`：`unittest` 测试用例，覆盖 CSV 处理、运行路径解析和并发批次分配
- `resources/`：本地运行资源占位目录，模板只保留 `.gitkeep`
- `package.json`：npm 命令入口，包含 `lint` 和 `ready` 命令
- `pyproject.toml`：项目元数据、脚本入口和基础构建说明
- `requirements.txt`：打包依赖，默认包含 PyInstaller
- `build.ps1`：Windows PowerShell 打包脚本，负责创建虚拟环境、安装依赖并执行 PyInstaller
- `python-script-template.spec`：PyInstaller 打包配置
