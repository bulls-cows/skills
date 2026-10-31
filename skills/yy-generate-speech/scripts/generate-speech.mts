import { createHash, randomUUID } from 'node:crypto'
import { access, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { parseArgs } from 'node:util'
import { runQwen, speechTempRoot } from './qwen.mts'
import { DEFAULT_QWEN_RECIPE } from './recipe.mts'
import type { QwenRecipe } from './recipe.mts'
import { inspectAudioDetails } from './audio-inspection.mts'

const { values } = parseArgs({
  options: {
    'project-root': { type: 'string' },
    text: { type: 'string' },
    file: { type: 'string' },
    'output-dir': { type: 'string' },
    seed: { type: 'string' },
    sampling: { type: 'string' },
    inspect: { type: 'string' },
    'dry-run': { type: 'boolean' },
    help: { type: 'boolean' },
  },
})

async function main(): Promise<void> {
  if (values.help) {
    console.log(
      'node generate-speech.mts (--text=中文 | --file=文本.txt或文本数组.json) [--project-root=目标项目] [--output-dir=目录] [--seed=12 --sampling=true --dry-run]\nnode generate-speech.mts --inspect=音频.mp3\nNode >=22.18；模型路径使用 QWEN_TTS_HOME / QWEN_TTS_PYTHON / QWEN_TTS_MODEL_DIR。',
    )
    return
  }
  const projectRoot = resolve(values['project-root'] ?? process.cwd())
  if (values.inspect) {
    console.log(JSON.stringify(await inspectAudioDetails(resolve(projectRoot, values.inspect))))
    return
  }
  if ((values.text === undefined) === (values.file === undefined))
    throw new Error('请选择 --text 或 --file')
  const content = values.file
    ? await readFile(resolve(projectRoot, values.file), 'utf8')
    : values.text!
  const texts: unknown = values.file?.endsWith('.json') ? JSON.parse(content) : [content]
  if (
    !Array.isArray(texts) ||
    !texts.length ||
    !texts.every((text): text is string => typeof text === 'string' && Boolean(text.trim()))
  )
    throw new Error('需要非空文本或非空字符串数组')
  const recipe: QwenRecipe = structuredClone(DEFAULT_QWEN_RECIPE)
  if (values.seed !== undefined) {
    if (!/^\d+$/.test(values.seed) || !Number.isSafeInteger(Number(values.seed)))
      throw new Error('seed 必须是非负安全整数')
    recipe.seed = Number(values.seed)
  }
  if (values.sampling !== undefined) {
    if (!['true', 'false'].includes(values.sampling))
      throw new Error('sampling 必须是 true 或 false')
    recipe.sampling = values.sampling === 'true'
  }
  const outputDirectory =
    values['output-dir'] ?? resolve(speechTempRoot(projectRoot), 'candidates', randomUUID())
  const tasks = texts.map((text, index) => {
    const hash = createHash('sha256')
      .update(JSON.stringify([text, recipe]))
      .digest('hex')
      .slice(0, 16)
    const id = `tts-${index + 1}-${hash}`
    return { id, text, output: resolve(projectRoot, outputDirectory, `${id}.mp3`) }
  })
  console.log(JSON.stringify({ recipe, tasks }, null, 2))
  if (values['dry-run']) return
  for (const task of tasks) {
    for (const path of [task.output, task.output.replace(/\.mp3$/, '.metadata.json')]) {
      const exists = await access(path).then(
        () => true,
        (error: NodeJS.ErrnoException) => {
          if (error.code === 'ENOENT') return false
          throw error
        },
      )
      if (exists) throw new Error(`拒绝覆盖已有文件，请使用新候选目录: ${path}`)
    }
  }
  await runQwen(recipe, tasks, { projectRoot })
}

await main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : '配音失败')
  process.exitCode = 1
})
