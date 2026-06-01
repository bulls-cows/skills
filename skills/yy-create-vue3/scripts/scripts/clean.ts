import { access, rm } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const targets = [
  { label: "前端编译产物目录", path: resolve(scriptDir, "../dist") },
  { label: "ESLint 缓存文件", path: resolve(scriptDir, "../.eslintcache") },
];

async function pathExists(targetPath: string) {
  try {
    await access(targetPath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function cleanTarget(target: (typeof targets)[number]) {
  const exists = await pathExists(target.path);

  if (!exists) {
    console.log(`跳过 ${target.label}：${target.path}`);
    return false;
  }

  await rm(target.path, { recursive: true, force: true });
  console.log(`已清理 ${target.label}：${target.path}`);
  return true;
}

const results = await Promise.all(targets.map(cleanTarget));
const cleanedCount = results.filter(Boolean).length;

console.log(`清理完成：共处理 ${cleanedCount} 个目标，总计 ${targets.length} 个`);
