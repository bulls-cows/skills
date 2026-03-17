import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
 * 提取 YAML frontmatter 内容
 */
function extractFrontmatter(content: string): string | null {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n?/;
  const match = content.match(frontmatterRegex);
  return match ? match[1] : null;
}

/**
 * 解析简单 YAML frontmatter
 * 注意：这是一个简单的解析器，不需要完整的 YAML 解析库
 */
function parseSimpleYaml(yaml: string): SkillMetadata {
  const result: Partial<SkillMetadata> = {};
  const lines = yaml.split('\n');

  // 状态常量
  const STATE_TOP_LEVEL = 0;
  const STATE_IN_MULTILINE_SCALAR = 1;
  const STATE_IN_ARRAY = 2;

  let state = STATE_TOP_LEVEL;
  let currentKey: string | null = null;
  let multilineContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // 跳过注释行
    if (trimmedLine.startsWith('#')) {
      continue;
    }

    switch (state) {
      case STATE_TOP_LEVEL:
        // 跳过空行
        if (!trimmedLine) {
          continue;
        }

        // 检查是否是键值对
        const colonIndex = trimmedLine.indexOf(':');
        if (colonIndex > 0) {
          const key = trimmedLine.substring(0, colonIndex).trim();
          const value = trimmedLine.substring(colonIndex + 1).trim();

          currentKey = key;

          // 检查是否是多行开始符
          if (value === '>' || value === '|') {
            state = STATE_IN_MULTILINE_SCALAR;
            multilineContent = [];
            continue;
          }

          // 检查是否是空值（后面跟着数组）
          if (!value) {
            // 检查下一行是否是数组开始
            if (i + 1 < lines.length && lines[i + 1].trim().startsWith('-')) {
              state = STATE_IN_ARRAY;
              continue;
            }
            // 否则是空字符串
            result[key] = '';
            continue;
          }

          // 简单值
          if (value.startsWith('"') || value.startsWith("'")) {
            result[key] = value.slice(1, -1);
          } else {
            result[key] = value;
          }
        }
        break;

      case STATE_IN_MULTILINE_SCALAR:
        // 检查是否遇到了新的键（多行结束）
        // 只有当行看起来像一个有效的 YAML 键时才结束多行
        const nextColonIndex = trimmedLine.indexOf(':');
        if (nextColonIndex > 0) {
          // 检查冒号前的部分是否是一个有效的键（只包含字母、数字、下划线、连字符）
          const potentialKey = trimmedLine.substring(0, nextColonIndex);
          const isValidKey = /^[a-zA-Z0-9_-]+$/.test(potentialKey);

          if (isValidKey) {
            // 结束多行，进入顶层解析
            const fullValue = multilineContent.join(' ');
            if (currentKey) {
              result[currentKey] = fullValue.trim();
            }
            state = STATE_TOP_LEVEL;
            multilineContent = [];
            // 重新处理这一行
            i--;
            continue;
          }
        }

        // 检查是否遇到了数组（多行结束）
        if (trimmedLine.startsWith('-')) {
          const fullValue = multilineContent.join(' ');
          if (currentKey) {
            result[currentKey] = fullValue.trim();
          }
          state = STATE_IN_ARRAY;
          multilineContent = [];
          // 重新处理这一行
          i--;
          continue;
        }

        // 添加到多行内容
        if (trimmedLine) {
          multilineContent.push(trimmedLine);
        }
        break;

      case STATE_IN_ARRAY:
        // 检查是否遇到了新的键（数组结束）
        const nextColonIndex2 = trimmedLine.indexOf(':');
        if (nextColonIndex2 > 0) {
          // 检查冒号前的部分是否是一个有效的键（只包含字母、数字、下划线、连字符）
          const potentialKey = trimmedLine.substring(0, nextColonIndex2);
          const isValidKey = /^[a-zA-Z0-9_-]+$/.test(potentialKey);

          if (isValidKey) {
            state = STATE_TOP_LEVEL;
            // 重新处理这一行
            i--;
            continue;
          }
        }

        // 处理数组项
        if (trimmedLine.startsWith('-')) {
          const arrayValue = trimmedLine.substring(1).trim();
          if (arrayValue && currentKey) {
            const currentValue = result[currentKey];
            if (Array.isArray(currentValue)) {
              currentValue.push(arrayValue);
            } else if (currentKey === 'examples') {
              result.examples = [arrayValue];
            }
          }
        }
        break;
    }
  }

  // 处理最后的多行内容
  if (state === STATE_IN_MULTILINE_SCALAR && currentKey) {
    const fullValue = multilineContent.join(' ');
    result[currentKey] = fullValue.trim();
  }

  return result as SkillMetadata;
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

  // 检查 3: 提取 frontmatter
  const frontmatter = extractFrontmatter(content);
  if (!frontmatter) {
    result.hasErrors = true;
    result.errors.push('YAML frontmatter 格式错误：缺少结束的 ---');
    return result;
  }

  // 检查 4: 解析 metadata
  const metadata = parseSimpleYaml(frontmatter);

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
  }

  console.log(`\n检查完成: ${results.length} 个技能，${totalErrors} 个错误`);

  if (totalErrors > 0) {
    console.log('\n请修复上述错误后重试。');
    process.exit(1);
  }
}

// 执行主函数
main();
