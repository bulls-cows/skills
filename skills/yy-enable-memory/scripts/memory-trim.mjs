#!/usr/bin/env node

/**
 * memory-trim.mjs - 记忆系统容量检查与修剪脚本
 *
 * 检查各层记忆的容量，发现超限或长期未访问的记忆，并生成报告。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 容量限制配置
const SIZE_LIMITS = {
  'MEMORY.md': 8 * 1024,           // 8KB
  'work-log.md': 50 * 1024,        // 50KB
  'CATALOG.md': 20 * 1024,         // 20KB
};

const HUB_SIZE_LIMIT = 50 * 1024;  // 单个 hub 50KB
const LEAF_SIZE_LIMIT = 5 * 1024;   // 单个 leaf 5KB
const INACTIVE_DAYS = 30;           // 30 天未访问视为可归档

// 路径配置
// 记忆库位于项目根目录 .memory/（个人私有）
const getMemoryDir = () => {
  // 脚本位于 .agents/skills/yy-memory/scripts/
  // 记忆库位于项目根目录 .memory/
  const skillDir = path.resolve(__dirname, '..');
  const agentsDir = path.resolve(skillDir, '..');
  const projectRoot = path.resolve(agentsDir, '..');
  const memoryDir = path.join(projectRoot, '.memory');
  return memoryDir;
};

/**
 * 格式化文件大小
 */
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
}

/**
 * 获取文件信息
 */
function getFileInfo(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    return {
      path: filePath,
      name: path.basename(filePath),
      size: stats.size,
      modified: stats.mtime,
      daysSinceModified: Math.floor((Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24)),
      lines: content.split('\n').length,
    };
  } catch (error) {
    return null;
  }
}

/**
 * 扫描目录获取所有文件
 */
function scanDirectory(dir, results = []) {
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanDirectory(fullPath, results);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const fileInfo = getFileInfo(fullPath);
      if (fileInfo) {
        results.push(fileInfo);
      }
    }
  }

  return results;
}

/**
 * 检查容量限制
 */
function checkSizeLimits(files) {
  const warnings = [];
  const errors = [];

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

    // 检查 hub 和 leaf 大小
    if (file.path.includes('hubs/') && file.size > HUB_SIZE_LIMIT) {
      warnings.push({
        file: file.name,
        size: formatSize(file.size),
        limit: formatSize(HUB_SIZE_LIMIT),
        message: `Hub 文件过大，建议拆分`,
      });
    }

    if (file.path.includes('leaf/') && file.size > LEAF_SIZE_LIMIT) {
      warnings.push({
        file: file.name,
        size: formatSize(file.size),
        limit: formatSize(LEAF_SIZE_LIMIT),
        message: `Leaf 文件过大，建议精简或拆分`,
      });
    }
  }

  return { warnings, errors };
}

/**
 * 检查长期未访问的记忆
 */
function checkInactiveMemories(files) {
  const inactive = [];

  for (const file of files) {
    if (file.daysSinceModified >= INACTIVE_DAYS) {
      inactive.push({
        file: file.name,
        path: file.path.replace(getMemoryDir() + path.sep, ''),
        daysSinceModified: file.daysSinceModified,
        lastModified: file.modified.toISOString().split('T')[0],
        suggestion: file.path.includes('leaf/')
          ? '建议移入 ARCHIVE.md'
          : '考虑是否需要更新或归档',
      });
    }
  }

  return inactive;
}

/**
 * 生成报告
 */
function generateReport(memoryDir) {
  const files = scanDirectory(memoryDir);
  const { warnings, errors } = checkSizeLimits(files);
  const inactive = checkInactiveMemories(files);

  const summary = {
    totalFiles: files.length,
    totalSize: formatSize(files.reduce((sum, f) => sum + f.size, 0)),
    hubsCount: files.filter(f => f.path.includes('hubs/')).length,
    leafsCount: files.filter(f => f.path.includes('leaf/')).length,
    errors: errors.length,
    warnings: warnings.length,
    inactiveCount: inactive.length,
  };

  console.log('\n========================================');
  console.log('         记忆系统容量检查报告');
  console.log('========================================\n');

  console.log('【统计概览】');
  console.log(`  总文件数：${summary.totalFiles}`);
  console.log(`  总大小：${summary.totalSize}`);
  console.log(`  Hub 数量：${summary.hubsCount}`);
  console.log(`  Leaf 数量：${summary.leafsCount}`);
  console.log('');

  if (errors.length > 0) {
    console.log('【容量错误】');
    for (const err of errors) {
      console.log(`  [错误] ${err.file}: ${err.message}`);
    }
    console.log('');
  }

  if (warnings.length > 0) {
    console.log('【容量警告】');
    for (const warn of warnings) {
      console.log(`  [警告] ${warn.file}: ${warn.message}`);
    }
    console.log('');
  }

  if (inactive.length > 0) {
    console.log(`【长期未访问】(${INACTIVE_DAYS} 天以上)`);
    for (const item of inactive) {
      console.log(`  ${item.path}`);
      console.log(`    - 未访问：${item.daysSinceModified} 天`);
      console.log(`    - 建议：${item.suggestion}`);
    }
    console.log('');
  }

  if (errors.length === 0 && warnings.length === 0 && inactive.length === 0) {
    console.log('【状态】所有检查通过，记忆系统运行正常。\n');
  }

  console.log('========================================\n');

  return {
    summary,
    errors,
    warnings,
    inactive,
  };
}

/**
 * 主函数
 */
function main() {
  const memoryDir = getMemoryDir();

  console.log(`记忆库路径: ${memoryDir}\n`);

  if (!fs.existsSync(memoryDir)) {
    console.log('错误: 记忆库目录不存在');
    process.exit(1);
  }

  const report = generateReport(memoryDir);

  // 根据检查结果返回退出码
  if (report.errors.length > 0) {
    process.exit(1);
  }

  process.exit(0);
}

main();