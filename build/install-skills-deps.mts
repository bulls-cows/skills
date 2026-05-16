import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.dirname(__dirname);
const skillsDir = path.join(projectRoot, 'skills');

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.cache']);

function findPackageJsonDirs(root: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(root, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (SKIP_DIRS.has(entry.name)) continue;
    const dirPath = path.join(root, entry.name);
    const pkgPath = path.join(dirPath, 'package.json');

    if (fs.existsSync(pkgPath)) {
      results.push(dirPath);
    }

    results.push(...findPackageJsonDirs(dirPath));
  }

  return results;
}

const dirs = findPackageJsonDirs(skillsDir);

if (dirs.length === 0) {
  console.log('No skill directories with package.json found.');
  process.exit(0);
}

for (const dir of dirs) {
  const relative = path.relative(projectRoot, dir);
  console.log(`Installing dependencies in ${relative}...`);
  execSync('npm install', { cwd: dir, stdio: 'inherit' });
}

console.log(`\nDone. Installed dependencies in ${dirs.length} skill directories.`);
