"""运行于 Qwen 独立环境：验证首尾处理不改写内部发音或停顿。"""
from pathlib import Path
import runpy
import unittest
import json
import tempfile
import numpy as np

worker = runpy.run_path(str(Path(__file__).with_name("qwen-worker.py")))
trim = worker["trim_outer_silence"]
TEMP_ROOT = Path.cwd() / ".temp" / "tts"
RECIPE = {"windowSeconds": 0.01, "absoluteThreshold": 0.003,
          "relativeThreshold": 0.035, "beforeSeconds": 0.06, "afterSeconds": 0.10}


class TrimTest(unittest.TestCase):
    def setUp(self):
        self.sr = 24000
        self.tone = np.sin(np.arange(4800) * 2 * np.pi * 440 / self.sr) * 0.2

    def test_outer_silence_only(self):
        original = np.concatenate([np.zeros(7200), self.tone, np.zeros(12000)])
        result = trim(original, self.sr, RECIPE)
        self.assertLess(len(result), len(original))
        np.testing.assert_array_equal(result[result != 0], original[original != 0])

    def test_preserves_internal_pause_and_both_syllables(self):
        content = np.concatenate([self.tone, np.zeros(3600), self.tone])
        original = np.concatenate([np.zeros(7200), content, np.zeros(12000)])
        result = trim(original, self.sr, RECIPE)
        self.assertGreaterEqual(len(result), len(content))
        np.testing.assert_array_equal(result[result != 0], content[content != 0])

    def test_rejects_silence_and_invalid_waveform(self):
        for original in [np.zeros(2400), np.array([np.nan]), np.array([])]:
            with self.assertRaises(ValueError):
                trim(original, self.sr, RECIPE)

    def test_per_entry_seed_and_sampling_keep_global_recipe_unchanged(self):
        calls = []
        tone = self.tone

        class Model:
            def generate_custom_voice(self, **kwargs):
                calls.append(kwargs)
                return [tone], 24000

        recipe = {"seed": 12, "appendPeriod": True, "speaker": "serena", "maxNewTokens": 256,
                  "temperature": 0.7, "topP": 0.85, "subtalkerTemperature": 0.7, "trim": RECIPE}
        TEMP_ROOT.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(prefix="speech-profile-test-", dir=TEMP_ROOT) as directory:
            output = Path(directory) / "test.mp3"
            task = {"id": "test", "text": "九", "output": str(output), "qwen": {"seed": 24, "sampling": False}}
            worker["generate_one"](Model(), task, recipe, TEMP_ROOT)
            metadata = json.loads(output.with_suffix(".metadata.json").read_text(encoding="utf-8"))
            self.assertEqual(metadata["recipe"]["seed"], 24)
            self.assertFalse(calls[0]["do_sample"])
            self.assertFalse(calls[0]["subtalker_dosample"])
            self.assertEqual(calls[0]["text"], "九。")
            self.assertEqual(recipe["seed"], 12)
            self.assertNotIn("sampling", recipe)


if __name__ == "__main__":
    unittest.main()
