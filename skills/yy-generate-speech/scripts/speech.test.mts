import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtemp, mkdir, writeFile, cp, rm } from 'node:fs/promises'
import { join, resolve, sep } from 'node:path'
import { test } from 'node:test'

const temporaryRoot = resolve('.temp/speech-tests')
const entry = join(import.meta.dirname, 'generate-speech.mts')

test('任意安装目录和工作目录下均将输出定位到指定项目', async () => {
  await mkdir(temporaryRoot, { recursive: true })
  const directory = await mkdtemp(join(temporaryRoot, 'portable-'))
  try {
    const installation = join(directory, 'deep/installation/scripts')
    await cp(import.meta.dirname, installation, { recursive: true })
    const target = join(directory, 'target')
    const result = spawnSync(
      process.execPath,
      [
        join(installation, 'generate-speech.mts'),
        '--text=测试文本。',
        `--project-root=${target}`,
        '--dry-run',
      ],
      { cwd: directory, encoding: 'utf8' },
    )
    assert.equal(result.status, 0, result.stderr)
    const request = JSON.parse(result.stdout) as { tasks: { output: string }[] }
    assert.ok(request.tasks[0]!.output.startsWith(join(target, '.temp/tts/candidates') + sep))
  } finally {
    assert.ok(directory.startsWith(temporaryRoot + sep))
    await rm(directory, { recursive: true, force: true })
  }
})

test('批量输入相对目标项目读取，参数进入配方，保持文本顺序', async () => {
  await mkdir(temporaryRoot, { recursive: true })
  const directory = await mkdtemp(join(temporaryRoot, 'batch-'))
  try {
    await writeFile(join(directory, 'texts.json'), JSON.stringify(['第一句。', '第二句。']))
    const result = spawnSync(
      process.execPath,
      [
        entry,
        `--project-root=${directory}`,
        '--file=texts.json',
        '--output-dir=.temp/candidate',
        '--seed=24',
        '--sampling=false',
        '--dry-run',
      ],
      { encoding: 'utf8' },
    )
    assert.equal(result.status, 0, result.stderr)
    const request = JSON.parse(result.stdout) as {
      recipe: { seed: number; sampling: boolean }
      tasks: { text: string; output: string }[]
    }
    assert.deepEqual(
      request.tasks.map((task) => task.text),
      ['第一句。', '第二句。'],
    )
    assert.equal(request.recipe.seed, 24)
    assert.equal(request.recipe.sampling, false)
    assert.ok(
      request.tasks.every((task) =>
        task.output.startsWith(join(directory, '.temp/candidate') + sep),
      ),
    )
  } finally {
    assert.ok(directory.startsWith(temporaryRoot + sep))
    await rm(directory, { recursive: true, force: true })
  }
})

test('非法参数在加载模型前失败', () => {
  for (const argument of ['--seed=-1', '--sampling=yes']) {
    const result = spawnSync(
      process.execPath,
      [entry, '--text=测试文本。', argument, '--dry-run'],
      { encoding: 'utf8' },
    )
    assert.equal(result.status, 1)
    assert.match(result.stderr, /seed|sampling/)
  }
})

test('未配置模型环境时明确失败，不猜测本机安装布局', () => {
  const result = spawnSync(process.execPath, [entry, '--text=测试文本。'], {
    encoding: 'utf8',
    env: { ...process.env, QWEN_TTS_HOME: '', QWEN_TTS_PYTHON: '', QWEN_TTS_MODEL_DIR: '' },
  })
  assert.equal(result.status, 1)
  assert.match(result.stderr, /QWEN_TTS_HOME/)
})
