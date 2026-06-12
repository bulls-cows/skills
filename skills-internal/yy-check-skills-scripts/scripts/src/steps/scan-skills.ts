import { readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

export interface ScanResult {
  skillsDir: string;
  skillName: string;
  scriptsPath: string;
  relativePath: string;
}

async function hasScriptsDir(dirPath: string): Promise<boolean> {
  try {
    const scriptsPath = join(dirPath, 'scripts');
    const stats = await stat(scriptsPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

async function scanDirectory(
  baseDir: string,
  dirName: string,
): Promise<ScanResult[]> {
  const dirPath = join(baseDir, dirName);
  const results: ScanResult[] = [];

  try {
    const entries = await readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const skillPath = join(dirPath, entry.name);
      const hasScripts = await hasScriptsDir(skillPath);

      if (hasScripts) {
        results.push({
          skillsDir: dirName,
          skillName: entry.name,
          scriptsPath: join(skillPath, 'scripts'),
          relativePath: relative(baseDir, join(skillPath, 'scripts')),
        });
      }
    }
  } catch {
    // Directory doesn't exist, skip
  }

  return results;
}

export async function scanSkillsWithScripts(
  projectRoot: string,
): Promise<ScanResult[]> {
  const [skillsResults, internalResults] = await Promise.all([
    scanDirectory(projectRoot, 'skills'),
    scanDirectory(projectRoot, 'skills-internal'),
  ]);

  return [...skillsResults, ...internalResults];
}
