export const DEFAULT_QWEN_RECIPE = {
  model: 'Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice',
  revision: '85e237c12c027371202489a0ec509ded67b5e4b5',
  speaker: 'serena',
  seed: 12,
  temperature: 0.7,
  topP: 0.85,
  subtalkerTemperature: 0.7,
  maxNewTokens: 256,
  threads: 8,
  appendPeriod: true,
  trim: {
    windowSeconds: 0.01,
    absoluteThreshold: 0.003,
    relativeThreshold: 0.035,
    beforeSeconds: 0.06,
    afterSeconds: 0.1,
  },
  recipeVersion: 1,
}
export type QwenRecipe = typeof DEFAULT_QWEN_RECIPE & { sampling?: boolean }
