# Qwen 本地环境与模型准备

本技能运行时只调用本地模型。安装依赖和下载权重属于首次准备动作，须先取得用户授权；不要在普通配音任务中隐式联网。

## 环境与安装目录

- Node.js 22.18+，用于直接运行 .mts 脚本，无需安装 npm 依赖。
- Python 3.12 独立虚拟环境。安装根目录由用户选择，不要求与项目或技能相邻，也不能放在可随时删除的 .temp/ 中。
- 环境内需要 qwen-tts、torch、numpy、soundfile、huggingface_hub。qwen-tts 0.1.1 为本技能已验证版本；PyTorch 按操作系统选择 CPU 安装包，依赖来源见 [Qwen 官方安装说明](https://github.com/QwenLM/Qwen3-TTS#environment-setup) 和 [PyTorch 安装页](https://pytorch.org/get-started/locally/)。
- FFmpeg 与 ffprobe 须可从进程 PATH 调用，安装方式见 [FFmpeg 官方下载页](https://ffmpeg.org/download.html)。
- 本封装使用 CPU float32 和 SDPA，不要求 CUDA 或 FlashAttention。未验证的依赖组合先用短句核验，成功后保留当地依赖版本快照，不照搬他人的虚拟环境目录。

用户授权后，可用选定的 Python 创建虚拟环境并安装依赖：

```text
python -m venv <安装目录>/.venv
<虚拟环境Python> -m pip install qwen-tts==0.1.1 numpy soundfile huggingface_hub
```

Windows 的虚拟环境 Python 为 .venv/Scripts/python.exe；Linux/macOS 为 .venv/bin/python。CPU 版 PyTorch 按官方平台选项安装，不在此固化平台专用下载源。

## 固定模型与来源记录

默认模型为 [Qwen3-TTS-12Hz-0.6B-CustomVoice](https://huggingface.co/Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice)，revision 与 scripts/recipe.mts 一致。模型卡标注 Apache-2.0；使用及再分发前阅读模型仓库 LICENSE，本技能不附带或代发权重。

在已授权的联网准备阶段，用虚拟环境 Python 执行以下代码，替换安装目录占位符：

```python
from pathlib import Path
import json
from huggingface_hub import snapshot_download

root = Path("<安装目录绝对路径>")
repo = "Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice"
revision = "85e237c12c027371202489a0ec509ded67b5e4b5"
snapshot_download(repo_id=repo, revision=revision, local_dir=str(root / "model"))
(root / "model-source.json").write_text(
    json.dumps({"repo": repo, "revision": revision}, indent=2), encoding="utf-8"
)
```

保留完整模型目录及 model-source.json。运行时要求模型目录内存在 model.safetensors，模型目录旁的来源记录须与配方相符；不要将来源文件误当成权重完整性的独立证明。

## 运行配置

设置进程环境变量，不把实际本机路径写进技能源码：

- QWEN_TTS_HOME：安装根目录；默认使用其 model/ 与 .venv/。
- QWEN_TTS_PYTHON：可选，覆盖虚拟环境 Python 的绝对路径。
- QWEN_TTS_MODEL_DIR：可选，覆盖本地模型目录的绝对路径。
- 未设置 QWEN_TTS_HOME 时，必须同时提供后两项。

```powershell
$env:QWEN_TTS_HOME = "<安装目录绝对路径>"
node "<技能目录>/scripts/generate-speech.mts" --project-root="<目标项目绝对路径>" --text="你好。"
```

Linux/macOS 以对应 shell 的环境变量机制设置相同变量。生成器启用 HF_HUB_OFFLINE 和 TRANSFORMERS_OFFLINE，仅从本地加载，不依赖账号或在线合成服务。缺少模型文件、来源记录或 FFmpeg 时先修复环境，不更换未知来源文件冒充已验证模型。

## 配方与调整范围

默认中文 Serena 音色、seed=12、sampling=true（未显式指定时）、短句末尾补句号，按低能量阈值清理首尾静音。完整参数见 scripts/recipe.mts；逐项只覆盖 seed 与 sampling，保留其余上下文。

模型、音色及语速控制范围受封装限制；不能据模型本身具备其他能力就宣称该技能已支持。当前程序不提供声音克隆、GPU、流式生成或多语言工作流。专业标准音素材应使用独立来源与核验流程。
