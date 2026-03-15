import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.dirname(__dirname);

const packageJsonPath = path.join(projectRoot, 'package.json');
const marketplaceJsonPath = path.join(projectRoot, '.claude-plugin', 'marketplace.json');
const skillsDir = path.join(projectRoot, 'skills');

// 读取 package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// 读取 marketplace.json
const marketplaceJson = JSON.parse(fs.readFileSync(marketplaceJsonPath, 'utf-8'));

// 1. 同步 name
marketplaceJson.name = packageJson.name;
marketplaceJson.plugins[0].name = packageJson.name;

// 2. 同步 version
marketplaceJson.metadata.version = packageJson.version;

// 3. 同步 description
marketplaceJson.metadata.description = packageJson.description;
marketplaceJson.plugins[0].description = packageJson.description;

// 4. 读取 skills 目录，过滤空目录并按字母顺序排序
const skillNames = fs.readdirSync(skillsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
  .filter(name => {
    const skillPath = path.join(skillsDir, name);
    const files = fs.readdirSync(skillPath);
    if (files.length === 0) {
      fs.rmdirSync(skillPath);
      console.log(`✓ 已删除空目录: ${name}`);
      return false;
    }
    return true;
  })
  .sort();

const skillsList = skillNames.map(name => `./skills/${name}`);
marketplaceJson.plugins[0].skills = skillsList;

// 写入 marketplace.json
fs.writeFileSync(
  marketplaceJsonPath,
  JSON.stringify(marketplaceJson, null, 2) + '\n',
  'utf-8'
);

console.log('✓ 已同步 marketplace.json');
