import { spawn } from 'node:child_process'
import { access, mkdir, mkdtemp, readFile, rm, rmdir, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import type { QwenRecipe } from './recipe.mts'
import { inspectAudioDetails } from './audio-inspection.mts'

/** 目标项目显式传入，技能可安装在任意位置。 */
export const speechTempRoot = (projectRoot = process.cwd()): string =>
  resolve(projectRoot, '.temp/tts')

export interface SpeechTask {
  id: string
  text: string
  output: string
  qwen?: { seed?: number; sampling?: boolean }
  baseSha256?: string
}

/** 只读取明确配置的本地安装位置，不猜测开发者机器布局。 */
export function qwenPaths(): { python: string; modelDirectory: string } {
  const root = process.env.QWEN_TTS_HOME
  if (!root && (!process.env.QWEN_TTS_PYTHON || !process.env.QWEN_TTS_MODEL_DIR))
    throw new Error('请设置 QWEN_TTS_HOME，或同时设置 QWEN_TTS_PYTHON 和 QWEN_TTS_MODEL_DIR')
  return {
    python: resolve(
      process.env.QWEN_TTS_PYTHON ??
        join(
          root ?? '',
          '.venv',
          process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python',
        ),
    ),
    modelDirectory: resolve(process.env.QWEN_TTS_MODEL_DIR ?? join(root ?? '', 'model')),
  }
}

async function runWorker(python: string, request: string): Promise<void> {
  await new Promise<void>((done, reject) => {
    const child = spawn(python, [join(import.meta.dirname, 'qwen-worker.py'), request], {
      stdio: 'inherit',
      windowsHide: true,
      env: { ...process.env, PYTHONIOENCODING: 'utf-8', PYTHONUNBUFFERED: '1' },
    })
    const timer = setTimeout(
      () => {
        child.kill()
        reject(new Error('Qwen 生成超过两小时，已停止'))
      },
      2 * 60 * 60 * 1000,
    )
    child.once('error', (error) => {
      clearTimeout(timer)
      reject(error)
    })
    child.once('close', (code) => {
      clearTimeout(timer)
      if (code === 0) done()
      else reject(new Error(`本地 Qwen 退出码 ${code}，请检查输出与错误信息`))
    })
  })
}

/** 通用生成层不读写业务清单；调用方负责决定候选与正式版本的关系。 */
export async function runQwen(
  recipe: QwenRecipe,
  tasks: SpeechTask[],
  options: { projectRoot?: string } = {},
): Promise<void> {
  if (!tasks.length) throw new Error('配音任务不能为空')
  const projectRoot = resolve(options.projectRoot ?? process.cwd())
  const temporaryRoot = speechTempRoot(projectRoot)
  const { python, modelDirectory } = qwenPaths()
  await access(python)
  await access(join(modelDirectory, 'model.safetensors'))
  const source = JSON.parse(
    await readFile(resolve(modelDirectory, '../model-source.json'), 'utf8'),
  ) as { repo: string; revision: string }
  if (source.repo !== recipe.model || source.revision !== recipe.revision)
    throw new Error('本地模型版本与配方不一致')
  for (const task of tasks) {
    if (!task.text.trim() || !task.output.endsWith('.mp3'))
      throw new Error('需要非空文本和 MP3 输出路径')
    task.output = resolve(projectRoot, task.output)
    await mkdir(resolve(task.output, '..'), { recursive: true })
  }
  await mkdir(temporaryRoot, { recursive: true })
  const directory = await mkdtemp(join(temporaryRoot, 'request-'))
  try {
    const request = join(directory, 'request.json')
    await writeFile(
      request,
      JSON.stringify({ modelDirectory, recipe, tasks, temporaryDirectory: directory }),
    )
    await runWorker(python, request)
    for (const task of tasks)
      console.log(
        JSON.stringify({ file: task.output, quality: await inspectAudioDetails(task.output) }),
      )
  } finally {
    await rm(join(directory, 'request.json'), { force: true })
    await rmdir(directory)
  }
}
