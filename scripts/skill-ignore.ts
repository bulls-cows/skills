import fs from 'fs'
import path from 'path'
import { minimatch } from 'minimatch'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const projectRoot = path.dirname(__dirname)

export function readSkillIgnore(): string[] {
  const ignorePath = path.join(projectRoot, '.skillignore')
  if (!fs.existsSync(ignorePath)) return []
  return fs
    .readFileSync(ignorePath, 'utf-8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
}

export function isSkillIgnored(skillName: string, patterns: string[]): boolean {
  let ignored = false
  for (const pattern of patterns) {
    if (pattern.startsWith('!')) {
      if (minimatch(skillName, pattern.slice(1))) ignored = false
    } else {
      if (minimatch(skillName, pattern)) ignored = true
    }
  }
  return ignored
}
