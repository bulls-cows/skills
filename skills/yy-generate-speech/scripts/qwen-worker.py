"""通用本地 CPU 配音生成器；接收与业务项目无关的任务清单。"""
import json
import importlib.metadata
import hashlib
import os
from pathlib import Path
import subprocess
import sys
import time
import tempfile
import shutil

os.environ["HF_HUB_OFFLINE"] = "1"
os.environ["TRANSFORMERS_OFFLINE"] = "1"
os.environ["TOKENIZERS_PARALLELISM"] = "false"

import numpy as np
import soundfile as sf
import torch
from qwen_tts import Qwen3TTSModel


def trim_outer_silence(audio, sample_rate, recipe):
    """只去掉首尾低能量区域，保留全部内部停顿与原始发音速度。"""
    if not len(audio) or not np.all(np.isfinite(audio)):
        raise ValueError("Empty or non-finite waveform")
    window = max(1, int(sample_rate * recipe["windowSeconds"]))
    envelope = np.convolve(np.abs(audio), np.ones(window) / window, mode="same")
    threshold = max(recipe["absoluteThreshold"], float(envelope.max()) * recipe["relativeThreshold"])
    voiced = np.flatnonzero(envelope > threshold)
    if not len(voiced):
        raise ValueError("No audible speech")
    start = max(0, int(voiced[0]) - int(sample_rate * recipe["beforeSeconds"]))
    end = min(len(audio), int(voiced[-1]) + int(sample_rate * recipe["afterSeconds"]))
    return audio[start:end]


def generate_one(model, task, recipe, temporary_root):
    started = time.perf_counter()
    recipe = {**recipe, **task.get("qwen", {})}
    torch.manual_seed(recipe["seed"])
    text = task["text"]
    if recipe["appendPeriod"] and not text.endswith(("。", "！", "？", ".", "!", "?")):
        text += "。"
    with torch.inference_mode():
        wavs, sr = model.generate_custom_voice(
            text=text, language="Chinese", speaker=recipe["speaker"], non_streaming_mode=True,
            max_new_tokens=recipe["maxNewTokens"], do_sample=recipe.get("sampling", True),
            temperature=recipe["temperature"], top_p=recipe["topP"],
            subtalker_dosample=recipe.get("sampling", True), subtalker_temperature=recipe["subtalkerTemperature"],
        )
    audio = np.asarray(wavs[0]).reshape(-1)
    if len(audio) / sr >= recipe["maxNewTokens"] / 12 * 0.95:
        raise ValueError("Possible token-limit truncation; manual review required")
    audio = trim_outer_silence(audio, sr, recipe["trim"])
    output = Path(task["output"])
    temporary_root = Path(temporary_root)
    temporary_root.mkdir(parents=True, exist_ok=True)
    temporary = tempfile.TemporaryDirectory(prefix="encoding-", dir=temporary_root)
    wav = Path(temporary.name) / "audio.wav"
    mp3 = Path(temporary.name) / "audio.mp3"
    try:
        sf.write(str(wav), audio, sr)
        subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(wav),
                        "-ar", "24000", "-ac", "1", "-codec:a", "libmp3lame", "-b:a", "160k", str(mp3)], check=True)
        shutil.move(str(mp3), str(output))
        with output.open("rb") as stream:
            sha256 = hashlib.file_digest(stream, "sha256").hexdigest()
        metadata = {"id": task["id"], "text": text, "recipe": recipe,
                    "spokenText": task["text"], "sha256": sha256, "baseSha256": task.get("baseSha256"),
                    "runtime": {"torch": torch.__version__, "qwenTts": importlib.metadata.version("qwen-tts"), "device": "cpu", "dtype": "float32"},
                    "seconds": round(len(audio) / sr, 3), "generationSeconds": round(time.perf_counter() - started, 2)}
        output.with_suffix(".metadata.json").write_text(json.dumps(metadata, ensure_ascii=False, indent=2), encoding="utf-8")
        print(json.dumps(metadata, ensure_ascii=False), flush=True)
    finally:
        temporary.cleanup()


def main():
    request = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    recipe = request["recipe"]
    torch.set_num_threads(recipe["threads"])
    torch.set_num_interop_threads(2)
    model = Qwen3TTSModel.from_pretrained(request["modelDirectory"], device_map="cpu",
        dtype=torch.float32, attn_implementation="sdpa", local_files_only=True)
    failures = []
    for task in request["tasks"]:
        try:
            generate_one(model, task, recipe, request["temporaryDirectory"])
        except Exception as error:
            failures.append(task["id"])
            print(f"FAILED {task['id']}: {type(error).__name__}: {error}", file=sys.stderr, flush=True)
    if failures:
        raise RuntimeError(f"{len(failures)} audio items failed")


if __name__ == "__main__":
    main()
