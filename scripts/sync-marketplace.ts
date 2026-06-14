import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { readSkillIgnore, isSkillIgnored } from '#scripts/skill-ignore'
import { logSuccess } from '#scripts/utils'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.dirname(__dirname)

const packageJsonPath = path.join(projectRoot, 'package.json')
const marketplaceJsonPath = path.join(projectRoot, '.claude-plugin', 'marketplace.json')
const skillsDir = path.join(projectRoot, 'skills')

// 读取 package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as PackageJson

// 读取 marketplace.json
const marketplaceJson = JSON.parse(fs.readFileSync(marketplaceJsonPath, 'utf-8')) as MarketplaceJson

// 1. 同步 name
marketplaceJson.name = packageJson.name
marketplaceJson.plugins[0].name = packageJson.name

// 2. 同步 version
marketplaceJson.metadata.version = packageJson.version

// 3. 同步 description
marketplaceJson.metadata.description = packageJson.description

// 4. 同步 author
marketplaceJson.owner.name = packageJson.author

// 5. 读取 skills 目录，过滤空目录并按字母顺序排序
const skillNames = fs
  .readdirSync(skillsDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .filter((name) => {
    const skillPath = path.join(skillsDir, name)
    const files = fs.readdirSync(skillPath)
    if (files.length === 0) {
      fs.rmdirSync(skillPath)
      logSuccess(`✓ 已删除空目录: ${name}`)
      return false
    }
    return true
  })
  .sort()

const ignorePatterns = readSkillIgnore()
const filteredSkillNames = skillNames.filter((name) => !isSkillIgnored(name, ignorePatterns))

const skillsList = filteredSkillNames.map((name) => `./skills/${name}`)

const openSkillsPlugin = marketplaceJson.plugins.find((plugin) => plugin.name === 'open-skills')
if (openSkillsPlugin) {
  openSkillsPlugin.skills = skillsList
  openSkillsPlugin.description = '本仓库维护的技能'
}

// 6. 读取 skills-internal 目录，过滤空目录并按字母顺序排序
const skillsInternalDir = path.join(projectRoot, 'skills-internal')
const internalSkillNames = fs
  .readdirSync(skillsInternalDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .filter((name) => {
    const skillPath = path.join(skillsInternalDir, name)
    const files = fs.readdirSync(skillPath)
    if (files.length === 0) {
      fs.rmdirSync(skillPath)
      logSuccess(`✓ 已删除空目录: ${name}`)
      return false
    }
    return true
  })
  .sort()

const internalSkillsList = internalSkillNames.map((name) => `./skills-internal/${name}`)
const internalSkillsPlugin = marketplaceJson.plugins.find(
  (plugin) => plugin.name === 'internal-skills',
)
if (internalSkillsPlugin) {
  internalSkillsPlugin.skills = internalSkillsList
}

// 写入 marketplace.json
fs.writeFileSync(marketplaceJsonPath, JSON.stringify(marketplaceJson, null, 2) + '\n', 'utf-8')

logSuccess('✓ 已同步 marketplace.json')
