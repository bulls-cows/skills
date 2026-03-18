import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.dirname(__dirname);
const skillsDir = path.join(projectRoot, 'skills');

interface SkillMetadata {
  name?: string;
  description?: string;
  icon?: string;
  examples?: string[];
}

interface ValidationResult {
  skillName: string;
  hasErrors: boolean;
  errors: string[];
}

/**
 * 验证 SKILL.md 文件
 */
function validateSkillMd(filePath: string, skillName: string): ValidationResult {
  const result: ValidationResult = {
    skillName,
    hasErrors: false,
    errors: [],
  };

  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    result.hasErrors = true;
    result.errors.push('SKILL.md 文件不存在');
    return result;
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  // 检查 1: 文件不能为空
  if (!content.trim()) {
    result.hasErrors = true;
    result.errors.push('文件内容为空');
    return result;
  }

  // 检查 2: 必须以 --- 开头
  if (!content.startsWith('---')) {
    result.hasErrors = true;
    result.errors.push('文件必须以 YAML frontmatter 开头 (---)');
    return result;
  }

  // 检查 3: 提取并解析 frontmatter
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n?/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    result.hasErrors = true;
    result.errors.push('YAML frontmatter 格式错误：缺少结束的 ---');
    return result;
  }

  try {
    const metadata = yaml.load(match[1]) as SkillMetadata;

    console.log(`${skillName}技能详情：${JSON.stringify(metadata, null, 2)}`)

    // 检查必需字段
    if (!metadata.name || metadata.name.trim() === '') {
      result.hasErrors = true;
      result.errors.push('缺少必需字段: name');
    }

    if (!metadata.description || metadata.description.trim() === '') {
      result.hasErrors = true;
      result.errors.push('缺少必需字段: description');
    }

    // 检查 name 是否与目录名匹配
    if (metadata.name && metadata.name !== skillName) {
      result.hasErrors = true;
      result.errors.push(`name 字段值 "${metadata.name}" 与目录名 "${skillName}" 不匹配`);
    }

    return result;
  } catch (error) {
    result.hasErrors = true;
    result.errors.push(`YAML 解析错误: ${error instanceof Error ? error.message : String(error)}`);
    return result;
  }
}

/**
 * 主函数
 */
function main() {
  console.log('开始检查 skills 目录下的 SKILL.md 文件...\n');

  // 读取 skills 目录
  const skillDirs = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  let totalErrors = 0;
  const results: ValidationResult[] = [];

  for (const skillName of skillDirs) {
    const skillPath = path.join(skillsDir, skillName);
    const skillMdPath = path.join(skillPath, 'SKILL.md');

    const result = validateSkillMd(skillMdPath, skillName);
    results.push(result);

    if (result.hasErrors) {
      totalErrors += result.errors.length;
      console.log(`❌ ${skillName}:`);
      result.errors.forEach(error => {
        console.log(`   - ${error}`);
      });
    } else {
      console.log(`✓ ${skillName}`);
    }
    console.log('')
  }

  console.log(`\n检查完成: ${results.length} 个技能，${totalErrors} 个错误`);

  if (totalErrors > 0) {
    console.log('\n请修复上述错误后重试。');
    process.exit(1);
  }
}

// 执行主函数
main();
