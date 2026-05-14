import { loadConfig, hasCredentials } from '../config/loader.js';

const REQUIRED_NODE_VERSION = '22.18.0';

function parseNodeVersion(version: string): { major: number; minor: number; patch: number } {
  const match = version.match(/^v?(\d+)\.(\d+)\.(\d+)/);
  if (!match) {
    return { major: 0, minor: 0, patch: 0 };
  }
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
  };
}

function compareVersions(v1: string, v2: string): number {
  const parsed1 = parseNodeVersion(v1);
  const parsed2 = parseNodeVersion(v2);

  if (parsed1.major !== parsed2.major) return parsed1.major - parsed2.major;
  if (parsed1.minor !== parsed2.minor) return parsed1.minor - parsed2.minor;
  return parsed1.patch - parsed2.patch;
}

function checkEnvironment(): void {
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
  if (compareVersions(nodeVersion, REQUIRED_NODE_VERSION) >= 0) {
    console.log(`  ✓ Node.js 版本 ${nodeVersion} 满足要求 (>= ${REQUIRED_NODE_VERSION})`);
  } else {
    console.log(`  ✗ Node.js 版本 ${nodeVersion} 过低，需要 >= ${REQUIRED_NODE_VERSION}`);
    allPassed = false;
  }
  console.log();

  if (allPassed) {
    console.log('✅ 所有检查通过，可以开始发布文章！');
    process.exit(0);
  } else {
    console.log('❌ 存在一些问题，请修复后重试');
    process.exit(1);
  }
}

checkEnvironment();
