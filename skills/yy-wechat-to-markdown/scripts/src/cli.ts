#!/usr/bin/env node
/**
 * CLI 入口：微信公众号文章转 Markdown
 * 用法: node . <微信文章URL> [输出文件路径]
 */

import fs from 'fs';
import path from 'path';
import { extractMeta, extractBody, htmlToMarkdown } from './parser/index.js';

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/**
 * 微信公众号文章链接 → Markdown 文本
 */
async function wxArticleToMarkdown(url: string): Promise<string> {
  // 1. 请求文章页面 HTML
  const response = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
    },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`请求失败：${response.status} ${response.statusText}`);
  }

  const html = await response.text();

  // 2. 提取元信息
  const { title, author } = extractMeta(html);

  // 3. 提取正文 HTML 片段
  const bodyHtml = extractBody(html);
  if (!bodyHtml) {
    throw new Error('未能提取到正文内容，可能是付费文章或需要登录');
  }

  // 4. 转换为 Markdown
  const bodyMd = htmlToMarkdown(bodyHtml);

  // 5. 拼装完整 Markdown（含 frontmatter）
  const lines: string[] = [];

  // frontmatter
  lines.push('---');
  if (title) lines.push(`title: "${title}"`);
  if (author) lines.push(`author: "${author}"`);
  lines.push(`source: "${url}"`);
  lines.push(`date: "${new Date().toISOString().slice(0, 10)}"`);
  lines.push('---');
  lines.push('');

  // 正文标题
  if (title) {
    lines.push(`# ${title}`);
    lines.push('');
  }
  if (author) {
    lines.push(`> 作者：${author}`);
    lines.push('');
  }
  lines.push('---');
  lines.push('');
  lines.push(bodyMd);

  return lines.join('\n');
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('用法: node . <微信文章URL> [输出文件路径]');
    console.error('示例: node . https://mp.weixin.qq.com/s/xxx output.md');
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
    console.error(`❌ 转换失败: ${(error as Error).message}`);
    process.exit(1);
  }
}

main();
