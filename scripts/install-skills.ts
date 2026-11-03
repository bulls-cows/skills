import { spawn } from 'child_process'
import { readSkillIgnore, isSkillIgnored } from '#scripts/skill-ignore'
import { logError, logInfo, logSuccess, timeStart } from '#scripts/utils'
import {
  agents,
  npxCommand,
  oldSkillNamesToDelete,
  projectRoot,
  readSkillNames,
  removeSkillFromGlobal,
  skillDirs,
} from '#scripts/remove-skills'

async function main() {
  const stopTotal = timeStart('整体流程')
  const skillNames = [...new Set(skillDirs.flatMap((dir) => readSkillNames(dir)))].sort((a, b) =>
    a.localeCompare(b),
  )
  skillNames.push(...oldSkillNamesToDelete)

  const stopInstall = timeStart('安装技能')
  await installSkills()
  stopInstall()

  const ignorePatterns = readSkillIgnore()
  const ignoredSkills = skillNames.filter((name) => isSkillIgnored(name, ignorePatterns))
  if (ignoredSkills.length > 0) {
    logInfo(`忽略技能: ${ignoredSkills.join(', ')}`)
    const removePromises = ignoredSkills.map((name) =>
      removeSkillFromGlobal(name).then((result) => {
        if (result.missing) {
          logInfo(`跳过未安装的忽略技能: ${result.skillName}`)
          return result
        }
        if (result.success) {
          logSuccess(`已移除忽略技能: ${result.skillName}`)
          return result
        }
        logError(`移除忽略技能失败: ${result.skillName}`)
        return result
      }),
    )
    const removeResults = await Promise.all(removePromises)
    if (removeResults.some((r) => !r.success && !r.missing)) {
      stopTotal()
      process.exit(1)
    }
  }

  stopTotal()
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
        logSuccess('技能安装完成。')
        resolve()
      } else {
        logError(`技能安装失败，退出码: ${String(code ?? 'unknown')}`)
        process.exit(1)
      }
    })
  })
}

await main()
