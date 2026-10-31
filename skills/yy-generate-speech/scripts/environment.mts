import { execFile } from 'node:child_process'
import { constants } from 'node:fs'
import { access, mkdir, open, readFile, rename, rm, stat, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { delimiter, dirname, isAbsolute, join, resolve } from 'node:path'
import { parseEnv, promisify } from 'node:util'
import { randomUUID } from 'node:crypto'
import { DEFAULT_QWEN_RECIPE } from './recipe.mts'

const execute = promisify(execFile)
const keys = [
  'QWEN_TTS_PYTHON',
  'QWEN_TTS_MODEL_DIR',
  'QWEN_TTS_FFMPEG',
  'QWEN_TTS_FFPROBE',
] as const
type Key = (typeof keys)[number]
type Config = Partial<Record<Key | 'QWEN_TTS_HOME', string>>
type Candidate = { path: string; source: string; explicit: boolean }
export type Environment = {
  python: string
  modelDirectory: string
  ffmpeg: string
  ffprobe: string
}
export interface EnvironmentContext {
  candidates: Record<Key, Candidate[]>
  envFile?: string
  cacheFile: string
  cacheWritable: boolean
  warnings: string[]
}
export interface EnvironmentReport {
  ok: boolean
  components: {
    name: string
    ok: boolean
    source?: string
    path?: string
    version?: string
    error?: string
  }[]
  warnings: string[]
  environment: Environment
}

async function optionalText(path: string): Promise<string | undefined> {
  try {
    return await readFile(path, 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return undefined
    throw error
  }
}

export async function findGitRoot(cwd: string): Promise<string | undefined> {
  for (let directory = resolve(cwd); ; directory = dirname(directory)) {
    const marker = join(directory, '.git')
    try {
      const info = await stat(marker)
      if (info.isDirectory()) return directory
      if (info.isFile()) {
        const match = /^gitdir:\s*(.+)\s*$/m.exec(await readFile(marker, 'utf8'))
        if (match && (await stat(resolve(directory, match[1]!.trim()))).isDirectory())
          return directory
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    }
    if (dirname(directory) === directory) return undefined
  }
}

function normalize(raw: unknown, base: string): Config {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('配置必须为 JSON 对象')
  const config: Config = {}
  for (const key of ['QWEN_TTS_HOME', ...keys] as const) {
    const value = (raw as Record<string, unknown>)[key]
    if (value === undefined) continue
    if (typeof value !== 'string') throw new Error(`${key} 必须是字符串`)
    if (value.trim()) config[key] = resolve(base, value.trim())
  }
  if (config.QWEN_TTS_HOME) {
    config.QWEN_TTS_PYTHON ??= join(
      config.QWEN_TTS_HOME,
      '.venv',
      process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python',
    )
    config.QWEN_TTS_MODEL_DIR ??= join(config.QWEN_TTS_HOME, 'model')
  }
  return config
}

export function historyFile(env = process.env): string {
  const base =
    process.platform === 'win32'
      ? env.LOCALAPPDATA || join(homedir(), 'AppData/Local')
      : env.XDG_CONFIG_HOME || join(homedir(), '.config')
  return join(base, 'yy-generate-speech/config.json')
}

async function pathCommands(
  names: string[],
  env: NodeJS.ProcessEnv,
  cwd: string,
): Promise<string[]> {
  const found: string[] = []
  for (const directory of (env.PATH ?? env.Path ?? '').split(delimiter).filter(Boolean)) {
    for (const name of names) {
      const path = resolve(cwd, directory, name + (process.platform === 'win32' ? '.exe' : ''))
      try {
        await access(path, process.platform === 'win32' ? constants.F_OK : constants.X_OK)
        if ((await stat(path)).isFile() && !found.includes(path)) found.push(path)
      } catch {
        /* PATH 中无效的条目不作为候选。 */
      }
    }
  }
  return found
}

export async function resolveEnvironment(
  options: {
    cwd?: string
    configFile?: string
    env?: NodeJS.ProcessEnv
    cacheFile?: string
  } = {},
): Promise<EnvironmentContext> {
  const cwd = resolve(options.cwd ?? process.cwd())
  const env = options.env ?? process.env
  const context: EnvironmentContext = {
    candidates: Object.fromEntries(
      keys.map((key) => [key, [] as Candidate[]]),
    ) as EnvironmentContext['candidates'],
    cacheFile: options.cacheFile ?? historyFile(env),
    cacheWritable: true,
    warnings: [],
  }
  const add = (config: Config, source: string, explicit: boolean) => {
    for (const key of keys)
      if (config[key]) context.candidates[key].push({ path: config[key]!, source, explicit })
  }
  if (options.configFile) {
    const path = resolve(cwd, options.configFile)
    add(normalize(JSON.parse(await readFile(path, 'utf8')), dirname(path)), '--config', true)
  }
  const root = await findGitRoot(cwd)
  if (root) {
    const path = join(root, '.env')
    const text = await optionalText(path)
    if (text !== undefined) {
      context.envFile = path
      add(normalize(parseEnv(text), root), '.env', true)
    }
  }
  add(normalize(env, cwd), '进程环境变量', true)
  const cached = await optionalText(context.cacheFile)
  if (cached !== undefined) {
    try {
      const data = JSON.parse(cached)
      if (data.schemaVersion !== 1) throw new Error('未知版本')
      for (const key of keys)
        if (data[key] !== undefined && (typeof data[key] !== 'string' || !isAbsolute(data[key])))
          throw new Error('历史路径必须为绝对路径')
      add(normalize(data, dirname(context.cacheFile)), '本机历史配置', false)
    } catch {
      context.cacheWritable = false
      context.warnings.push('历史配置格式错误，已忽略且不会覆盖原文件')
    }
  }
  for (const [key, names] of [
    ['QWEN_TTS_PYTHON', ['python3.12', 'python3', 'python']],
    ['QWEN_TTS_FFMPEG', ['ffmpeg']],
    ['QWEN_TTS_FFPROBE', ['ffprobe']],
  ] as const) {
    for (const path of await pathCommands([...names], env, cwd))
      add({ [key]: path }, 'PATH 探测', false)
  }
  if (
    process.platform === 'win32' &&
    !context.candidates.QWEN_TTS_PYTHON.some((item) => item.explicit)
  ) {
    for (const launcher of await pathCommands(['py'], env, cwd)) {
      try {
        const result = await execute(
          launcher,
          ['-3.12', '-c', 'import sys; print(sys.executable)'],
          { timeout: 15000, windowsHide: true },
        )
        const path = result.stdout.trim()
        if (isAbsolute(path)) add({ QWEN_TTS_PYTHON: path }, 'py -3.12 探测', false)
      } catch {
        /* 启动器未安装 Python 3.12 时继续报告缺失。 */
      }
    }
  }
  return context
}

const pythonCheck = `import sys, json, importlib, importlib.metadata
result = {"python": sys.version.split()[0], "packages": {}, "errors": []}
for package, module in [("qwen-tts", "qwen_tts"), ("torch", "torch"), ("numpy", "numpy"), ("soundfile", "soundfile"), ("huggingface_hub", "huggingface_hub")]:
    try:
        importlib.import_module(module)
        result["packages"][package] = importlib.metadata.version(package)
    except Exception:
        result["errors"].append(package + " 不可导入")
print(json.dumps(result))`

type Probe = (
  file: string,
  args: string[],
  options: { timeout: number; windowsHide: boolean; maxBuffer?: number; env?: NodeJS.ProcessEnv },
) => Promise<{ stdout: string }>

export async function checkEnvironment(
  context: EnvironmentContext,
  audioOnly = false,
  probe: Probe = execute,
  recipe = DEFAULT_QWEN_RECIPE,
): Promise<EnvironmentReport> {
  const report: EnvironmentReport = {
    ok: true,
    components: [],
    warnings: [...context.warnings],
    environment: { python: '', modelDirectory: '', ffmpeg: '', ffprobe: '' },
  }
  const [major, minor] = process.versions.node.split('.').map(Number)
  report.components.push({
    name: 'Node.js',
    ok: major! > 22 || (major === 22 && minor! >= 18),
    version: process.versions.node,
  })
  const fields = {
    QWEN_TTS_PYTHON: 'python',
    QWEN_TTS_MODEL_DIR: 'modelDirectory',
    QWEN_TTS_FFMPEG: 'ffmpeg',
    QWEN_TTS_FFPROBE: 'ffprobe',
  } as const
  for (const key of keys) {
    if (audioOnly && (key === 'QWEN_TTS_PYTHON' || key === 'QWEN_TTS_MODEL_DIR')) continue
    const candidates = context.candidates[key]
    const explicit = candidates.find((item) => item.explicit)
    const valid: { candidate: Candidate; version: string; warnings: string[] }[] = []
    let lastError = '未找到配置或可用候选，请配置 QWEN_TTS_HOME 或对应路径'
    for (const candidate of explicit ? [explicit] : candidates) {
      try {
        await access(candidate.path)
        let version = ''
        const warnings: string[] = []
        if (key === 'QWEN_TTS_MODEL_DIR') {
          await access(join(candidate.path, 'model.safetensors'))
          const source = JSON.parse(
            await readFile(join(candidate.path, '../model-source.json'), 'utf8'),
          )
          if (source.repo !== recipe.model || source.revision !== recipe.revision)
            throw new Error('模型来源记录与配方不一致')
          version = source.revision
        } else if (key === 'QWEN_TTS_PYTHON') {
          const result = await probe(candidate.path, ['-c', pythonCheck], {
            timeout: 60000,
            windowsHide: true,
            maxBuffer: 1024 * 1024,
            env: {
              ...process.env,
              HF_HUB_OFFLINE: '1',
              TRANSFORMERS_OFFLINE: '1',
              PYTHONIOENCODING: 'utf-8',
            },
          })
          const info = JSON.parse(result.stdout.trim().split(/\r?\n/).at(-1)!)
          if (!/^3\.12\./.test(info.python)) throw new Error('需要 Python 3.12')
          if (info.errors.length) throw new Error(info.errors.join('、'))
          version = JSON.stringify(info)
          if (info.packages['qwen-tts'] !== '0.1.1')
            warnings.push('qwen-tts 不是已验证的 0.1.1，需要短句核验')
        } else {
          const result = await probe(candidate.path, ['-version'], {
            timeout: 15000,
            windowsHide: true,
          })
          version = result.stdout.split(/\r?\n/)[0] ?? ''
          if (!version.startsWith(key === 'QWEN_TTS_FFMPEG' ? 'ffmpeg version' : 'ffprobe version'))
            throw new Error('命令版本输出不匹配')
        }
        if (!valid.some((item) => item.candidate.path === candidate.path))
          valid.push({ candidate, version, warnings })
        if (explicit || candidate.source === '本机历史配置') break
      } catch (error) {
        const code = (error as NodeJS.ErrnoException).code
        lastError = code
          ? `路径不可用或命令失败（${code}）`
          : error instanceof Error
            ? error.message
            : '检查失败'
        if (candidate.source === '本机历史配置')
          report.warnings.push(`${key} 历史配置失效，继续有限探测`)
      }
    }
    if (valid.length === 1) {
      const item = valid[0]!
      report.environment[fields[key]] = item.candidate.path
      report.components.push({
        name: key,
        ok: true,
        path: item.candidate.path,
        source: item.candidate.source,
        version: item.version,
      })
      report.warnings.push(...item.warnings)
    } else
      report.components.push({
        name: key,
        ok: false,
        source: explicit?.source,
        error: valid.length > 1 ? '存在多个可用候选，请明确配置路径' : lastError,
      })
  }
  report.ok = report.components.every((item) => item.ok)
  return report
}

export function assertEnvironmentReady(report: EnvironmentReport): void {
  if (!report.ok)
    throw new Error(
      report.components
        .filter((item) => !item.ok)
        .map(
          (item) =>
            `${item.name}（${item.source ?? '自动探测'}）：${item.error ?? '版本不满足要求'}`,
        )
        .join('\n'),
    )
}

/** 仅改变缺失或空白的白名单变量，其他原文保持不动。 */
export function mergeEnv(text: string, config: Config, base: string): string {
  const parsed = parseEnv(text)
  const effective = normalize(parsed, base)
  const newline = text.includes('\r\n') ? '\r\n' : '\n'
  let updated = text
  for (const key of ['QWEN_TTS_HOME', ...keys]) {
    const pattern = new RegExp(`^(?:[ \\t]*export[ \\t]+)?[ \\t]*${key}[ \\t]*=.*$`, 'gm')
    const matches = [...text.matchAll(pattern)]
    if (matches.length > 1) throw new Error(`.env 中 ${key} 重复，已跳过回写`)
  }
  for (const key of keys) {
    if (effective[key] || !config[key]) continue
    const value = config[key]!.replaceAll('\\', '/')
    const quote = value.includes('"') ? "'" : '"'
    if (value.includes(quote) || /[\r\n]/.test(value))
      throw new Error(`${key} 路径无法安全写入 .env`)
    const line = `${key}=${quote}${value}${quote}`
    const pattern = new RegExp(
      `^([ \\t]*(?:export[ \\t]+)?${key}[ \\t]*=[ \\t]*)(?:"[^"]*"|'[^']*'|[^\\r\\n#]*?)([ \\t]*(?:#[^\\r\\n]*)?)(\\r?)$`,
      'gm',
    )
    if (Object.hasOwn(parsed, key)) {
      if (![...updated.matchAll(pattern)].length) throw new Error(`${key} 赋值格式无法安全回写`)
      updated = updated.replace(
        pattern,
        (_match, prefix: string, suffix: string, ending: string) =>
          prefix + quote + value + quote + suffix + ending,
      )
    } else updated += (updated && !updated.endsWith('\n') ? newline : '') + line + newline
  }
  return updated
}

export async function persistValidatedEnvironment(
  context: EnvironmentContext,
  report: EnvironmentReport,
): Promise<string[]> {
  assertEnvironmentReady(report)
  const warnings: string[] = []
  const config: Config = {
    QWEN_TTS_PYTHON: report.environment.python,
    QWEN_TTS_MODEL_DIR: report.environment.modelDirectory,
    QWEN_TTS_FFMPEG: report.environment.ffmpeg,
    QWEN_TTS_FFPROBE: report.environment.ffprobe,
  }
  if (context.envFile) {
    try {
      let saved = false
      for (let attempt = 0; attempt < 3 && !saved; attempt++) {
        // r+ 保证文件删除后不会意外重建；仅在原文未改变时写入。
        const handle = await open(context.envFile, 'r+')
        try {
          const before = await handle.readFile('utf8')
          const updated = mergeEnv(before, config, dirname(context.envFile))
          if (updated === before) {
            saved = true
            break
          }
          if ((await readFile(context.envFile, 'utf8')) !== before) continue
          const originalStat = await handle.stat()
          const currentStat = await stat(context.envFile)
          if (originalStat.ino !== currentStat.ino || originalStat.mtimeMs !== currentStat.mtimeMs)
            continue
          await handle.write(Buffer.from(updated), 0, Buffer.byteLength(updated), 0)
          await handle.truncate(Buffer.byteLength(updated))
          saved = true
        } finally {
          await handle.close()
        }
      }
      if (!saved) throw new Error('.env 并发变化，未保存')
    } catch (error) {
      warnings.push(`.env 未保存：${error instanceof Error ? error.message : '写入失败'}`)
    }
  }
  if (context.cacheWritable) {
    const temporary = context.cacheFile + '.' + randomUUID() + '.tmp'
    try {
      await mkdir(dirname(context.cacheFile), { recursive: true })
      await writeFile(
        temporary,
        JSON.stringify(
          { schemaVersion: 1, verifiedAt: new Date().toISOString(), ...config },
          null,
          2,
        ) + '\n',
        { flag: 'wx', mode: 0o600 },
      )
      await rename(temporary, context.cacheFile)
    } catch {
      warnings.push('本机历史配置未保存，本次仍可生成')
    } finally {
      await rm(temporary, { force: true }).catch(() => {})
    }
  }
  return warnings
}
