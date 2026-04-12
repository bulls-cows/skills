#!/usr/bin/env node
/**
 * CLI 入口：微信公众号文章转 Markdown
 * 用法: node run_cli.mjs <微信文章URL> [输出文件路径]
 */

import { wxArticleToMarkdown } from './wechat_article_parser.mjs';
import fs from 'fs';
import path from 'path';

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('用法: node run_cli.mjs <微信文章URL> [输出文件路径]');
    console.error('示例: node run_cli.mjs https://mp.weixin.qq.com/s/xxx output.md');
    process.exit(1);
  }

  const url = args[0];
  const outputPath = args[1];

  // 验证 URL
  if (!url.includes('mp.weixin.qq.com')) {
    console.error('错误: 不是有效的微信公众号文章链接');
    process.exit(1);
  }

  try {
    const markdown = await wxArticleToMarkdown(url);

    if (outputPath) {
      // 保存到文件
      fs.writeFileSync(path.resolve(outputPath), markdown, 'utf-8');
      console.log(`✅ 转换完成，已保存到: ${outputPath}`);
      console.log(`📊 统计: ${markdown.length} 字符`);
    } else {
      // 直接输出到 stdout
      console.log(markdown);
    }

    process.exit(0);
  } catch (error) {
    console.error(`❌ 转换失败: ${error.message}`);
    process.exit(1);
  }
}

main();
