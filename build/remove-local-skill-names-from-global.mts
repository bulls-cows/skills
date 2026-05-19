import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.dirname(__dirname)
const skillDirs = [path.join(projectRoot, 'skills'), path.join(projectRoot, 'skills-internal')]
const npxCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx'

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

function removeSkillFromGlobal(skillName: string): boolean {
  const result = spawnSync(npxCommand, ['skills', 'remove', skillName, '-g', '-y', '--all'], {
    encoding: 'utf8',
    shell: true,
  })

  if (result.error) {
    throw result.error
  }

  const output = `${result.stdout}${result.stderr}`

  if (result.status === 0) {
    console.log(`已移除全局技能: ${skillName}`)
    return true
  }

  if (isMissingSkill(output)) {
    console.log(`跳过未安装的全局技能: ${skillName}`)
    return true
  }

  console.error(`移除全局技能失败: ${skillName}`)
  if (result.stdout) console.error(result.stdout)
  if (result.stderr) console.error(result.stderr)
  return false
}

function main() {
  const skillNames = [...new Set(skillDirs.flatMap((dir) => readSkillNames(dir)))].sort((a, b) =>
    a.localeCompare(b),
  )

  if (skillNames.length === 0) {
    console.log('未找到需要移除的本地技能。')
    return
  }

  let hasError = false

  for (const skillName of skillNames) {
    const ok = removeSkillFromGlobal(skillName)
    if (!ok) hasError = true
  }

  if (hasError) {
    process.exit(1)
  }
}

main()
