#!/usr/bin/env bun

import { loadConfig, hasCredentials } from './config-loader';

declare var Bun: any;

console.log('🔍 yy-post-to-wechat 环境检查\n');

const config = loadConfig();
let allPassed = true;

console.log('📋 配置检查:');
console.log(`  默认主题: ${config.defaultTheme}`);
console.log(`  默认颜色: ${config.defaultColor || '(使用主题默认)'}`);
console.log(`  默认作者: ${config.defaultAuthor || '(未设置)'}`);
console.log(`  开启评论: ${config.needOpenComment ? '✓' : '✗'}`);
console.log(`  仅粉丝评论: ${config.onlyFansCanComment ? '✓' : '✗'}`);
console.log();

console.log('🔑 API 凭证检查:');
if (hasCredentials(config)) {
  console.log('  ✓ AppID 和 AppSecret 已配置');
} else {
  console.log('  ✗ AppID 或 AppSecret 未找到');
  console.log('    请在 .yy-skills/.env 或 ~/.yy-skills/.env 中设置:');
  console.log('    WECHAT_APP_ID=your_app_id');
  console.log('    WECHAT_APP_SECRET=your_app_secret');
  allPassed = false;
}
console.log();

console.log('🧹 Node.js 版本检查:');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0], 10);
if (majorVersion >= 18) {
  console.log(`  ✓ Node.js 版本 ${nodeVersion} 满足要求 (>= 18)`);
} else {
  console.log(`  ✗ Node.js 版本 ${nodeVersion} 过低，需要 >= 18`);
  allPassed = false;
}
console.log();

console.log('Bun 运行时检查:');
if (typeof Bun !== 'undefined') {
  console.log('  ✓ 使用 Bun 运行时');
} else {
  console.log('  ⚠  不是 Bun 运行时，使用 Node.js 也可继续');
}
console.log();

if (allPassed) {
  console.log('✅ 所有检查通过，可以开始发布文章！');
  process.exit(0);
} else {
  console.log('❌ 存在一些问题，请修复后重试');
  process.exit(1);
}
