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
  metadata?: {
    author?: string;
    version?: string;
    [key: string]: any;
  };
}

interface MetadataJson {
  version?: string;
  date?: string;
  author?: string;
  abstract?: string;
  references?: string[];
  tags?: string[];
}

interface ValidationResult {
  skillName: string;
  hasErrors: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * 将多行 YAML 描述转换为单行字符串
 */
function multilineToSingleLine(text: string): string {
  if (!text) return '';
  // 替换换行符为空格，并压缩多个连续空格
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * 验证 SKILL.md 文件
 */
function validateSkillMd(filePath: string, skillName: string, metadataJsonPath?: string): ValidationResult {
  const result: ValidationResult = {
    skillName,
    hasErrors: false,
    errors: [],
    warnings: [],
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

    // 如果存在 metadata.json 文件，进行对比检查
    if (metadataJsonPath && fs.existsSync(metadataJsonPath)) {
      validateMetadataJson(metadataJsonPath, metadata, result);
    }

    return result;
  } catch (error) {
    result.hasErrors = true;
    result.errors.push(`YAML 解析错误: ${error instanceof Error ? error.message : String(error)}`);
    return result;
  }
}

/**
 * 验证 metadata.json 与 SKILL.md 的一致性
 */
function validateMetadataJson(metadataJsonPath: string, skillMetadata: SkillMetadata, result: ValidationResult) {
  try {
    const jsonContent = fs.readFileSync(metadataJsonPath, 'utf-8');
    const metadataJson: MetadataJson = JSON.parse(jsonContent);

    // 1. 检查 description -> abstract
    if (skillMetadata.description && metadataJson.abstract !== undefined) {
      const descriptionSingleLine = multilineToSingleLine(skillMetadata.description);
      if (metadataJson.abstract !== descriptionSingleLine) {
        result.warnings.push(
          `metadata.json 中 abstract 字段与 SKILL.md 中 description 字段不一致\n` +
          `  - metadata.json.abstract: "${metadataJson.abstract}"\n` +
          `  - SKILL.md.description: "${descriptionSingleLine}"\n` +
          `  建议：将 metadata.json.abstract 更新为 "${descriptionSingleLine}"`
        );
      }
    }

    // 2. 检查 metadata.author -> author
    if (skillMetadata.metadata?.author && metadataJson.author !== undefined) {
      if (metadataJson.author !== skillMetadata.metadata.author) {
        result.warnings.push(
          `metadata.json 中 author 字段与 SKILL.md 中 metadata.author 字段不一致\n` +
          `  - metadata.json.author: "${metadataJson.author}"\n` +
          `  - SKILL.md.metadata.author: "${skillMetadata.metadata.author}"\n` +
          `  建议：将 metadata.json.author 更新为 "${skillMetadata.metadata.author}"`
        );
      }
    }

    // 3. 检查 metadata.version -> version
    if (skillMetadata.metadata?.version && metadataJson.version !== undefined) {
      if (metadataJson.version !== String(skillMetadata.metadata.version)) {
        result.warnings.push(
          `metadata.json 中 version 字段与 SKILL.md 中 metadata.version 字段不一致\n` +
          `  - metadata.json.version: "${metadataJson.version}"\n` +
          `  - SKILL.md.metadata.version: "${skillMetadata.metadata.version}"\n` +
          `  建议：将 metadata.json.version 更新为 "${skillMetadata.metadata.version}"`
        );
      }
    }
  } catch (error) {
    result.hasErrors = true;
    result.errors.push(`metadata.json 解析错误: ${error instanceof Error ? error.message : String(error)}`);
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
  let totalWarnings = 0;
  const results: ValidationResult[] = [];

  for (const skillName of skillDirs) {
    const skillPath = path.join(skillsDir, skillName);
    const skillMdPath = path.join(skillPath, 'SKILL.md');
    const metadataJsonPath = path.join(skillPath, 'metadata.json');

    const result = validateSkillMd(skillMdPath, skillName, metadataJsonPath);
    results.push(result);

    if (result.hasErrors) {
      totalErrors += result.errors.length;
      console.log(`❌ ${skillName}:`);
      result.errors.forEach(error => {
        console.log(`   - ${error}`);
      });
    }

    // 输出警告信息
    if (result.warnings.length > 0) {
      totalWarnings += result.warnings.length;
      console.log(`⚠️  ${skillName} 警告:`);
      result.warnings.forEach(warning => {
        console.log(`   - ${warning}`);
        console.log('')
      });
    }
  }

  console.log(`\n检查完成: ${results.length} 个技能，${totalErrors} 个错误，${totalWarnings} 个警告`);

  if (totalErrors > 0) {
    console.log('\n请修复上述错误后重试。');
    process.exit(1);
  }

  if (totalWarnings > 0) {
    console.log('\n发现警告信息，请根据建议处理 metadata.json 文件。');
  }
}

// 执行主函数
main();
