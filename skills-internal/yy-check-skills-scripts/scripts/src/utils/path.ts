import { stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';

async function hasSkillsDir(dirPath: string): Promise<boolean> {
  try {
    const skillsPath = join(dirPath, 'skills');
    const stats = await stat(skillsPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

export async function findProjectRoot(): Promise<string> {
  let currentDir = process.cwd();
  let parentDir = dirname(currentDir);

  while (currentDir !== parentDir) {
    if (await hasSkillsDir(currentDir)) {
      return currentDir;
    }
    currentDir = parentDir;
    parentDir = dirname(currentDir);
  }

  throw new Error(
    'Could not find project root with skills/ directory. ' +
      'Set PROJECT_ROOT environment variable or run from project directory.',
  );
}
