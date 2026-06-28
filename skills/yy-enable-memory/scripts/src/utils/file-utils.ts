import { readFileSync, statSync, readdirSync, existsSync } from "node:fs";
import { basename, join } from "node:path";
import type { FileInfo } from "#typings/result";

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
}

export function getFileInfo(filePath: string): FileInfo | null {
  try {
    const stats = statSync(filePath);
    const content = readFileSync(filePath, "utf-8");
    return {
      path: filePath,
      name: basename(filePath),
      size: stats.size,
      modified: stats.mtime,
      daysSinceModified: Math.floor((Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24)),
      lines: content.split("\n").length,
    };
  } catch {
    return null;
  }
}

export function scanDirectory(dir: string, results: FileInfo[] = []): FileInfo[] {
  if (!existsSync(dir)) return results;

  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      scanDirectory(fullPath, results);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const fileInfo = getFileInfo(fullPath);
      if (fileInfo) {
        results.push(fileInfo);
      }
    }
  }

  return results;
}
