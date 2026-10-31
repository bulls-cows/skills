import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join, resolve, sep } from 'node:path'
import { parseEnv } from 'node:util'
import { test } from 'node:test'
import {
  checkEnvironment,
  findGitRoot,
  mergeEnv,
  persistValidatedEnvironment,
  resolveEnvironment,
} from './environment.mts'
import { DEFAULT_QWEN_RECIPE } from './recipe.mts'

const temporaryRoot = resolve('.temp/speech-tests')
async function fixture(run: (directory: string) => Promise<void>) {
  await mkdir(temporaryRoot, { recursive: true })
  const directory = await mkdtemp(join(temporaryRoot, 'environment-'))
  try {
    await run(directory)
  } finally {
    assert.ok(directory.startsWith(temporaryRoot + sep))
    await rm(directory, { recursive: true, force: true })
  }
}
const forward = (path: string) => path.replaceAll('\\', '/')

test('Git 根目录定位兼容子目录、嵌套仓库、worktree 和非仓库', () =>
  fixture(async (dir) => {
    const root = join(dir, 'repo')
    const nested = join(root, 'nested')
    const child = join(nested, 'child')
    const tree = join(dir, 'tree')
    await mkdir(join(root, '.git'), { recursive: true })
    await mkdir(child, { recursive: true })
    assert.equal(await findGitRoot(child), root)
    await mkdir(join(nested, '.git'))
    assert.equal(await findGitRoot(child), nested)
    await mkdir(tree)
    await writeFile(join(tree, '.git'), 'gitdir: ../repo/.git\n')
    assert.equal(await findGitRoot(tree), tree)
    // fixture 目录本身位于仓库内，使用文件系统根目录验证非仓库。
    assert.equal(await findGitRoot(resolve(dir, '/')), undefined)
  }))

test('配置优先级、HOME 展开、空白值与相对路径', () =>
  fixture(async (dir) => {
    await mkdir(join(dir, '.git'))
    const cwd = join(dir, 'child')
    await mkdir(cwd)
    await writeFile(
      join(dir, '.env'),
      'UNRELATED_SECRET=hidden\nQWEN_TTS_HOME="./local"\nQWEN_TTS_FFMPEG=   \n',
    )
    const file = join(dir, 'explicit.json')
    await writeFile(file, JSON.stringify({ QWEN_TTS_MODEL_DIR: './chosen' }))
    const context = await resolveEnvironment({
      cwd,
      configFile: '../explicit.json',
      cacheFile: join(dir, 'cache.json'),
      env: { QWEN_TTS_PYTHON: './lower-python', QWEN_TTS_FFMPEG: './encoder' },
    })
    assert.equal(context.envFile, join(dir, '.env'))
    assert.equal(context.candidates.QWEN_TTS_MODEL_DIR[0]!.path, join(dir, 'chosen'))
    assert.equal(
      context.candidates.QWEN_TTS_PYTHON[0]!.path,
      join(dir, 'local/.venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python'),
    )
    assert.equal(context.candidates.QWEN_TTS_FFMPEG[0]!.path, join(cwd, 'encoder'))
    assert.ok(!JSON.stringify(context).includes('hidden'))
  }))

test('回写保留注释、其他变量、CRLF、有效 HOME 和含 # 的路径', () => {
  const base = resolve('fixture')
  const original =
    '# comment\r\nSECRET=keep\r\nQWEN_TTS_PYTHON="" # empty\r\nQWEN_TTS_FFPROBE="existing"\r\n'
  const updated = mergeEnv(
    original,
    { QWEN_TTS_PYTHON: join(base, 'a # b/python'), QWEN_TTS_FFMPEG: join(base, 'ffmpeg') },
    base,
  )
  assert.ok(updated.startsWith('# comment\r\nSECRET=keep\r\n'))
  assert.ok(updated.includes(' # empty\r\n'))
  assert.equal(parseEnv(updated).QWEN_TTS_PYTHON, forward(join(base, 'a # b/python')))
  assert.ok(updated.includes('QWEN_TTS_FFPROBE="existing"\r\n'))
  assert.ok(!updated.replaceAll('\r\n', '').includes('\n'))
  const home = 'QWEN_TTS_HOME="./tts"\n'
  assert.equal(mergeEnv(home, { QWEN_TTS_PYTHON: join(base, 'other') }, base), home)
  assert.throws(() => mergeEnv('QWEN_TTS_PYTHON=a\nexport QWEN_TTS_PYTHON=b\n', {}, base), /重复/)
  const multiline = mergeEnv(
    'QWEN_TTS_PYTHON="\n" # blank\nOTHER=keep\n',
    { QWEN_TTS_PYTHON: join(base, 'python') },
    base,
  )
  assert.equal(parseEnv(multiline).OTHER, 'keep')
  assert.equal(parseEnv(multiline).QWEN_TTS_PYTHON, forward(join(base, 'python')))
})

async function prepared(dir: string) {
  const model = join(dir, 'model')
  await mkdir(model)
  await writeFile(join(model, 'model.safetensors'), 'fixture')
  await writeFile(
    join(dir, 'model-source.json'),
    JSON.stringify({ repo: DEFAULT_QWEN_RECIPE.model, revision: DEFAULT_QWEN_RECIPE.revision }),
  )
  return resolveEnvironment({
    cwd: dir,
    cacheFile: join(dir, 'history/config.json'),
    env: {
      QWEN_TTS_MODEL_DIR: model,
      QWEN_TTS_PYTHON: process.execPath,
      QWEN_TTS_FFMPEG: process.execPath,
      QWEN_TTS_FFPROBE: process.execPath,
    },
  })
}
const successfulProbe = async (
  _path: string,
  args: string[],
  options: { timeout: number; env?: NodeJS.ProcessEnv },
) => {
  assert.ok(options.timeout > 0)
  if (args[0] === '-c') {
    assert.equal(options.env?.HF_HUB_OFFLINE, '1')
    return {
      stdout: JSON.stringify({ python: '3.12.9', packages: { 'qwen-tts': '0.1.1' }, errors: [] }),
    }
  }
  return { stdout: 'ffmpeg version fixture\n' }
}

test('检查报告、历史复用与已有 .env 补写', () =>
  fixture(async (dir) => {
    await mkdir(join(dir, '.git'))
    await writeFile(join(dir, '.env'), 'OTHER=keep\n')
    const context = await prepared(dir)
    // 分别返回两个工具的版本，验证独立路径。
    const ffprobe = join(dir, 'probe')
    await writeFile(ffprobe, '')
    context.candidates.QWEN_TTS_FFPROBE = [{ path: ffprobe, source: '测试', explicit: true }]
    const probe = async (
      path: string,
      args: string[],
      options: Parameters<typeof successfulProbe>[2],
    ) =>
      path === ffprobe
        ? { stdout: 'ffprobe version fixture' }
        : successfulProbe(path, args, options)
    const report = await checkEnvironment(context, false, probe)
    assert.equal(report.ok, true)
    assert.deepEqual(await persistValidatedEnvironment(context, report), [])
    const text = await readFile(context.envFile!, 'utf8')
    assert.ok(text.startsWith('OTHER=keep\n'))
    assert.equal(parseEnv(text).QWEN_TTS_FFPROBE, forward(ffprobe))
    const cache = JSON.parse(await readFile(context.cacheFile, 'utf8'))
    assert.equal(cache.schemaVersion, 1)
    assert.equal(cache.QWEN_TTS_PYTHON, process.execPath)
    await rm(context.envFile!)
    const next = await resolveEnvironment({ cwd: dir, cacheFile: context.cacheFile, env: {} })
    assert.equal(next.envFile, undefined)
    assert.equal(next.candidates.QWEN_TTS_PYTHON[0]!.source, '本机历史配置')
    const nextReport = await checkEnvironment(next, false, probe)
    assert.equal(nextReport.ok, true)
    await persistValidatedEnvironment(next, nextReport)
    await assert.rejects(readFile(join(dir, '.env')), { code: 'ENOENT' })
  }))

test('显式失效不降级、缓存失效可回退、多个候选不随机选择', () =>
  fixture(async (dir) => {
    const context = await prepared(dir)
    context.candidates.QWEN_TTS_PYTHON.unshift({
      path: join(dir, 'missing'),
      source: '.env',
      explicit: true,
    })
    let report = await checkEnvironment(context, true, successfulProbe)
    assert.equal(
      report.components.find((item) => item.name === 'QWEN_TTS_PYTHON'),
      undefined,
    )
    report = await checkEnvironment(context, false, successfulProbe)
    assert.equal(report.components.find((item) => item.name === 'QWEN_TTS_PYTHON')!.ok, false)
    context.candidates.QWEN_TTS_PYTHON = [
      { path: join(dir, 'missing'), source: '本机历史配置', explicit: false },
      { path: process.execPath, source: 'PATH 探测', explicit: false },
    ]
    report = await checkEnvironment(context, false, successfulProbe)
    assert.equal(report.components.find((item) => item.name === 'QWEN_TTS_PYTHON')!.ok, true)
    assert.ok(report.warnings.some((item) => item.includes('历史配置失效')))
    const other = join(dir, 'other-python')
    await writeFile(other, '')
    context.candidates.QWEN_TTS_PYTHON.push({ path: other, source: 'PATH 探测', explicit: false })
    report = await checkEnvironment(context, false, successfulProbe)
    assert.match(report.components.find((item) => item.name === 'QWEN_TTS_PYTHON')!.error!, /多个/)
  }))

test('错误缓存不覆盖、删除的 .env 不重建，写入失败作为警告', () =>
  fixture(async (dir) => {
    await mkdir(join(dir, '.git'))
    const context = await prepared(dir)
    const report = await checkEnvironment(context, true, successfulProbe)
    // 构造已验证的完整报告，只验证写入行为，不调用模型。
    report.ok = true
    context.envFile = join(dir, '.env')
    const warnings = await persistValidatedEnvironment(context, report)
    assert.ok(warnings.some((item) => item.includes('.env 未保存')))
    await assert.rejects(readFile(context.envFile), { code: 'ENOENT' })
    await writeFile(context.cacheFile, '{broken')
    const next = await resolveEnvironment({ cwd: dir, env: {}, cacheFile: context.cacheFile })
    assert.equal(next.cacheWritable, false)
    await persistValidatedEnvironment(next, report)
    assert.equal(await readFile(context.cacheFile, 'utf8'), '{broken')
  }))

test('检查命令失败与超时报告不泄露外部命令原文', () =>
  fixture(async (dir) => {
    const context = await prepared(dir)
    const report = await checkEnvironment(context, false, async () => {
      throw Object.assign(new Error('private command'), { code: 'ETIMEDOUT' })
    })
    assert.equal(report.ok, false)
    assert.match(JSON.stringify(report), /ETIMEDOUT/)
    assert.ok(!JSON.stringify(report).includes('private command'))
  }))

test('CLI 检查无文本也可运行，不保存配置，cwd 与 project-root 各自独立', () =>
  fixture(async (dir) => {
    await mkdir(join(dir, '.git'))
    const cwd = join(dir, 'child')
    await mkdir(cwd)
    const envFile = join(dir, '.env')
    const original = 'OTHER=keep\nQWEN_TTS_PYTHON="./missing"\n'
    await writeFile(envFile, original)
    const result = spawnSync(
      process.execPath,
      [join(import.meta.dirname, 'generate-speech.mts'), '--check-env', '--project-root=/other'],
      {
        cwd,
        encoding: 'utf8',
        env: {
          ...process.env,
          PATH: '',
          Path: '',
          LOCALAPPDATA: dir,
          XDG_CONFIG_HOME: dir,
          QWEN_TTS_HOME: '',
          QWEN_TTS_PYTHON: '',
          QWEN_TTS_MODEL_DIR: '',
          QWEN_TTS_FFMPEG: '',
          QWEN_TTS_FFPROBE: '',
        },
      },
    )
    assert.equal(result.status, 1, result.stderr)
    const report = JSON.parse(result.stdout)
    assert.equal(
      report.components.find((item: { name: string }) => item.name === 'QWEN_TTS_PYTHON').source,
      '.env',
    )
    assert.equal(await readFile(envFile, 'utf8'), original)
    await assert.rejects(readFile(join(dir, 'yy-generate-speech/config.json')), { code: 'ENOENT' })
  }))
