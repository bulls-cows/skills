import { sep } from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { formatSize, scanDirectory } from "#utils/file-utils";
import type { FileInfo, InactiveMemory, SizeIssue, TrimReport } from "#typings/result";

// 容量限制配置
const SIZE_LIMITS: Record<string, number> = {
  "MEMORY.md": 8 * 1024, // 8KB
  "work-log.md": 50 * 1024, // 50KB
  "CATALOG.md": 20 * 1024, // 20KB
};

const HUB_SIZE_LIMIT = 50 * 1024; // 单个 hub 50KB
const LEAF_SIZE_LIMIT = 5 * 1024; // 单个 leaf 5KB
const INACTIVE_DAYS = 30; // 30 天未访问视为可归档

// 脚本位于 scripts/，记忆库位于项目根目录 .memory/
function getMemoryDir(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const scriptsDir = resolve(__dirname);
  const projectRoot = resolve(scriptsDir, "..");
  return resolve(projectRoot, ".memory");
}

export function checkSizeLimits(files: FileInfo[]): { warnings: SizeIssue[]; errors: SizeIssue[] } {
  const warnings: SizeIssue[] = [];
  const errors: SizeIssue[] = [];

  for (const file of files) {
    const limit = SIZE_LIMITS[file.name];

    if (limit) {
      if (file.size > limit) {
        errors.push({
          file: file.name,
          size: formatSize(file.size),
          limit: formatSize(limit),
          message: `超过容量限制 (${formatSize(file.size)} / ${formatSize(limit)})`,
        });
      } else if (file.size > limit * 0.8) {
        warnings.push({
          file: file.name,
          size: formatSize(file.size),
          limit: formatSize(limit),
          message: `接近容量限制 (${Math.round((file.size / limit) * 100)}%)`,
        });
      }
    }

    if (file.path.includes("hubs/") && file.size > HUB_SIZE_LIMIT) {
      warnings.push({
        file: file.name,
        size: formatSize(file.size),
        limit: formatSize(HUB_SIZE_LIMIT),
        message: "Hub 文件过大，建议拆分",
      });
    }

    if (file.path.includes("leaf/") && file.size > LEAF_SIZE_LIMIT) {
      warnings.push({
        file: file.name,
        size: formatSize(file.size),
        limit: formatSize(LEAF_SIZE_LIMIT),
        message: "Leaf 文件过大，建议精简或拆分",
      });
    }
  }

  return { warnings, errors };
}

export function checkInactiveMemories(files: FileInfo[], memoryDir: string): InactiveMemory[] {
  const inactive: InactiveMemory[] = [];

  for (const file of files) {
    if (file.daysSinceModified >= INACTIVE_DAYS) {
      inactive.push({
        file: file.name,
        path: file.path.replace(memoryDir + sep, ""),
        daysSinceModified: file.daysSinceModified,
        lastModified: file.modified.toISOString().split("T")[0],
        suggestion: file.path.includes("leaf/") ? "建议移入 ARCHIVE.md" : "考虑是否需要更新或归档",
      });
    }
  }

  return inactive;
}

function generateReport(memoryDir: string): TrimReport {
  const files = scanDirectory(memoryDir);
  const { warnings, errors } = checkSizeLimits(files);
  const inactive = checkInactiveMemories(files, memoryDir);

  const summary = {
    totalFiles: files.length,
    totalSize: formatSize(files.reduce((sum, f) => sum + f.size, 0)),
    hubsCount: files.filter((f) => f.path.includes("hubs/")).length,
    leafsCount: files.filter((f) => f.path.includes("leaf/")).length,
    errors: errors.length,
    warnings: warnings.length,
    inactiveCount: inactive.length,
  };

  console.log("\n========================================");
  console.log("         记忆系统容量检查报告");
  console.log("========================================\n");

  console.log("【统计概览】");
  console.log(`  总文件数：${summary.totalFiles}`);
  console.log(`  总大小：${summary.totalSize}`);
  console.log(`  Hub 数量：${summary.hubsCount}`);
  console.log(`  Leaf 数量：${summary.leafsCount}`);
  console.log("");

  if (errors.length > 0) {
    console.log("【容量错误】");
    for (const err of errors) {
      console.log(`  [错误] ${err.file}: ${err.message}`);
    }
    console.log("");
  }

  if (warnings.length > 0) {
    console.log("【容量警告】");
    for (const warn of warnings) {
      console.log(`  [警告] ${warn.file}: ${warn.message}`);
    }
    console.log("");
  }

  if (inactive.length > 0) {
    console.log(`【长期未访问】(${INACTIVE_DAYS} 天以上)`);
    for (const item of inactive) {
      console.log(`  ${item.path}`);
      console.log(`    - 未访问：${item.daysSinceModified} 天`);
      console.log(`    - 建议：${item.suggestion}`);
    }
    console.log("");
  }

  if (errors.length === 0 && warnings.length === 0 && inactive.length === 0) {
    console.log("【状态】所有检查通过，记忆系统运行正常。\n");
  }

  console.log("========================================\n");

  return { summary, errors, warnings, inactive };
}

function main(): void {
  const memoryDir = getMemoryDir();

  console.log(`记忆库路径: ${memoryDir}\n`);

  if (!existsSync(memoryDir)) {
    console.log("错误: 记忆库目录不存在");
    process.exit(1);
  }

  const report = generateReport(memoryDir);

  if (report.errors.length > 0) {
    process.exit(1);
  }

  process.exit(0);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
