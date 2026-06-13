import fs from 'fs'
import path from 'path'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { readSkillIgnore, isSkillIgnored } from '#scripts/skill-ignore'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.dirname(__dirname)
const skillDirs = [path.join(projectRoot, 'skills'), path.join(projectRoot, 'skills-internal')]
const npxCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx'

// 列出常用的 agent, 注意对于安装目录相同的 agent 不要重复列出, 比如 Codex 和 Antigravity 的全局技能安装目录都是 `.agents/skills/`, 所以写一个就可以了
const agents = [
  'claude-code',
  'codex',
  'opencode',
  'trae-cn',
  'codebuddy',
  'openclaw',
  'qoder',
  'qwen-code',
  'windsurf',
  'zencoder',
]

const oldSkillNamesToDelete = [
  'yy-frontend-commit',
  'yy-skills-reverse-analysis',
  'yy-init',
  'yy-create-init',
  'yy-git-commit',
  'yy-git-commit-directly',
  'yy-sync-capability-model',
  'yy-create-lint',
  'yy-create-comment',
]

function readSkillNames(dir: string): string[] {
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(dir, entry.name, 'SKILL.md')))
    .map((entry) => entry.name)
}

function isMissingSkill(output: string): boolean {
  return [
    /not installed/i,
    /not found/i,
    /does not exist/i,
    /no such skill/i,
    /unknown skill/i,
  ].some((pattern) => pattern.test(output))
}

interface RemoveResult {
  skillName: string
  success: boolean
  output: string
  missing: boolean
}

async function removeSkillFromGlobal(skillName: string): Promise<RemoveResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(
      npxCommand,
      ['skills', 'remove', skillName, '-g', '-y', ...agents.flatMap((a) => ['-a', a])],
      {
        shell: true,
      },
    )

    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (data: Buffer) => {
      stdout += data.toString()
    })
    child.stderr.on('data', (data: Buffer) => {
      stderr += data.toString()
    })

    child.on('error', (err) => {
      reject(err)
    })

    child.on('close', (code) => {
      const output = `${stdout}${stderr}`
      const missing = isMissingSkill(output)

      if (code === 0) {
        resolve({ skillName, success: true, output, missing })
      } else if (missing) {
        resolve({ skillName, success: true, output, missing })
      } else {
        resolve({ skillName, success: false, output, missing })
      }
    })
  })
}

async function main() {
  const skillNames = [...new Set(skillDirs.flatMap((dir) => readSkillNames(dir)))].sort((a, b) =>
    a.localeCompare(b),
  )

  // 已删除或重命名的旧技能，确保能从全局卸载
  skillNames.push(...oldSkillNamesToDelete)

  if (skillNames.length === 0) {
    console.log('未找到需要移除的本地技能。')
    return
  }

  const promises = skillNames.map((name) =>
    removeSkillFromGlobal(name).then((result) => {
      if (result.missing) {
        console.log(`跳过未安装的全局技能: ${result.skillName}`)
        return result
      }

      if (result.success) {
        console.log(`已移除全局技能: ${result.skillName}`)
        return result
      }

      console.error(`移除全局技能失败: ${result.skillName}`)
      if (result.output) console.error(result.output)
      return result
    }),
  )

  const results = await Promise.all(promises)

  if (results.some((r) => !r.success)) {
    process.exit(1)
  }

  await installSkills()

  const ignorePatterns = readSkillIgnore()
  const ignoredSkills = skillNames.filter((name) => isSkillIgnored(name, ignorePatterns))
  if (ignoredSkills.length > 0) {
    console.log(`忽略技能: ${ignoredSkills.join(', ')}`)
    const removePromises = ignoredSkills.map((name) =>
      removeSkillFromGlobal(name).then((result) => {
        if (result.missing) {
          console.log(`跳过未安装的忽略技能: ${result.skillName}`)
          return result
        }
        if (result.success) {
          console.log(`已移除忽略技能: ${result.skillName}`)
          return result
        }
        console.error(`移除忽略技能失败: ${result.skillName}`)
        return result
      }),
    )
    const removeResults = await Promise.all(removePromises)
    if (removeResults.some((r) => !r.success && !r.missing)) {
      process.exit(1)
    }
  }
}

async function installSkills(): Promise<void> {
  const args = ['skills', 'add', projectRoot, '-g', '-y', ...agents.flatMap((a) => ['-a', a])]

  return new Promise((resolve, reject) => {
    const child = spawn(npxCommand, args, { shell: true, stdio: 'inherit' })

    child.on('error', (err) => {
      reject(err)
    })
    child.on('close', (code) => {
      if (code === 0) {
        console.log('技能安装完成。')
        resolve()
      } else {
        console.error(`技能安装失败，退出码: ${String(code ?? 'unknown')}`)
        process.exit(1)
      }
    })
  })
}

void main()
