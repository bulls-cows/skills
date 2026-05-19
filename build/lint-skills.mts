import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.dirname(__dirname)
const skillsDir = path.join(projectRoot, 'skills')

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.cache'])

function findPackageJsonDirs(root: string): string[] {
  const results: string[] = []
  const entries = fs.readdirSync(root, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (SKIP_DIRS.has(entry.name)) continue
    const dirPath = path.join(root, entry.name)
    const pkgPath = path.join(dirPath, 'package.json')

    if (fs.existsSync(pkgPath)) {
      results.push(dirPath)
    }

    results.push(...findPackageJsonDirs(dirPath))
  }

  return results
}

const dirs = findPackageJsonDirs(skillsDir)
let hasError = false

for (const dir of dirs) {
  const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf-8')) as {
    scripts?: Record<string, string>
  }
  if (!pkg.scripts?.lint) continue

  const relative = path.relative(projectRoot, dir)
  console.log(`Running lint in ${relative}...`)
  try {
    execSync('node --run lint', { cwd: dir, stdio: 'inherit' })
  } catch {
    hasError = true
  }
}

if (hasError) process.exit(1)
