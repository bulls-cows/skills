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

function hasReadyScript(dir: string): boolean {
  const pkgPath = path.join(dir, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8')) as {
    scripts?: Record<string, string>
  }
  return pkg.scripts?.ready !== undefined
}

const dirs = findPackageJsonDirs(skillsDir)

if (dirs.length === 0) {
  console.log('No skill directories with package.json found.')
  process.exit(0)
}

let readyCount = 0

for (const dir of dirs) {
  const relative = path.relative(projectRoot, dir)

  if (!hasReadyScript(dir)) {
    console.log(`Skipping ${relative} (no "ready" script defined)`)
    continue
  }

  console.log(`Running ready script in ${relative}...`)
  execSync('npm run ready', { cwd: dir, stdio: 'inherit' })
  readyCount++
}

console.log(`\nDone. Ran ready scripts in ${String(readyCount)} of ${String(dirs.length)} skill directories.`)
