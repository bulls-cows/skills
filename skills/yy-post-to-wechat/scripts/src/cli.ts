import fs from 'fs';
import path from 'path';

import { loadConfig, hasCredentials } from './config/loader.js';
import {
  convertMarkdownToWechat,
  parseFrontMatter,
  extractFirstTitle,
  extractFirstParagraph,
  extractImagePaths,
} from './converter/md-to-wechat.js';
import {
  getAccessToken,
  uploadImage,
  uploadThumbMedia,
  createDraft,
} from './api/wechat.js';

function parseCliArgs(): { inputFile: string; options: CliOptions } {
  const args = process.argv.slice(2);
  const options: CliOptions = {
    theme: 'default',
    needCitation: true,
  };

  let inputFile: string | null = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--theme':
        options.theme = args[++i] as ThemeName;
        break;
      case '--color':
        options.color = args[++i];
        break;
      case '--title':
        options.title = args[++i];
        break;
      case '--summary':
        options.summary = args[++i];
        break;
      case '--author':
        options.author = args[++i];
        break;
      case '--cover':
        options.cover = args[++i];
        break;
      case '--no-cite':
        options.needCitation = false;
        break;
      default:
        if (!inputFile) {
          inputFile = arg;
        }
        break;
    }
  }

  if (!inputFile) {
    console.error('❌ 请提供输入文件路径');
    console.error('   用法: node . <file> [options]');
    console.error('   示例: node . article.md --theme default --color blue');
    process.exit(1);
  }

  return { inputFile, options };
}

function resolveInput(inputFile: string): InputResult {
  if (!fs.existsSync(inputFile)) {
    console.error(`❌ 文件不存在: ${inputFile}`);
    process.exit(1);
  }

  const content = fs.readFileSync(inputFile, 'utf-8');
  const isHtml = inputFile.endsWith('.html');
  return { content, filePath: inputFile, isHtml };
}

function resolveMetadata(
  content: string,
  cliOptions: CliOptions,
  config: SkillConfig,
  inputPath: string
): MetadataResult {
  const { attributes, body } = parseFrontMatter<FrontMatterAttributes>(content);

  let title = cliOptions.title || attributes.title || extractFirstTitle(body);
  if (!title) {
    title = path.basename(inputPath, path.extname(inputPath));
  }

  const author = cliOptions.author || attributes.author || config.defaultAuthor || '';

  let digest = cliOptions.summary || attributes.description || attributes.summary || extractFirstParagraph(body);
  if (!digest) {
    digest = title;
  }

  let coverPath: string | null = cliOptions.cover ||
    attributes.cover ||
    attributes.coverImage ||
    attributes.featureImage ||
    attributes.image ||
    null;

  if (!coverPath) {
    const defaultCover = path.join(path.dirname(inputPath), 'imgs', 'cover.png');
    if (fs.existsSync(defaultCover)) {
      coverPath = defaultCover;
    }
  }

  if (coverPath && !path.isAbsolute(coverPath)) {
    coverPath = path.join(path.dirname(inputPath), coverPath);
  }

  return { title, author, digest, coverPath, markdownBody: body };
}

async function replaceImageUrls(
  html: string,
  localPaths: string[],
  accessToken: string
): Promise<string> {
  let result = html;

  for (const localPath of localPaths) {
    try {
      const wechatUrl = await uploadImage(accessToken, localPath);
      const fileName = path.basename(localPath);

      const regex = new RegExp(
        `src=["']([^"']*${escapeRegExp(fileName)})["']`,
        'g'
      );
      result = result.replace(regex, `src="${wechatUrl}"`);
    } catch (error) {
      console.warn(`⚠️  图片 ${localPath} 上传失败: ${(error as Error).message}`);
    }
  }

  return result;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function main() {
  const { inputFile, options } = parseCliArgs();
  const config = loadConfig();

  const theme = options.theme || config.defaultTheme;
  const color = options.color || config.defaultColor || (options.theme === 'default' ? '#576b95' : undefined);

  if (!color) {
    console.error('❌ 请指定颜色，或在配置文件中设置 default_color');
    process.exit(1);
  }

  const { content, filePath, isHtml } = resolveInput(inputFile);
  const baseDir = path.dirname(filePath);
  const metadata = resolveMetadata(content, options, config, filePath);

  let htmlContent: string;
  let imagePaths: string[];

  if (isHtml) {
    htmlContent = content;
    imagePaths = extractImagePaths(htmlContent, baseDir);
  } else {
    if (!metadata.coverPath) {
      console.error('❌ 缺少封面图片，请通过 --cover 指定，或在 frontmatter 中配置，或将其放在 imgs/cover.png');
      process.exit(1);
    }

    const convertResult = convertMarkdownToWechat(
      metadata.markdownBody,
      {
        needCitation: options.needCitation,
        theme,
        color,
        title: metadata.title,
      },
      baseDir
    );

    htmlContent = convertResult.html;
    imagePaths = convertResult.imagePaths;
  }

  console.log(`📝 文章信息:
  标题: ${metadata.title}
  作者: ${metadata.author}
  摘要: ${metadata.digest.slice(0, 50)}${metadata.digest.length > 50 ? '...' : ''}
  封面: ${metadata.coverPath || '(无)'}
  正文图片: ${imagePaths.length} 张
`);

  if (!config.appId || !config.appSecret) {
    console.error('❌ 未找到 API 凭证，请检查配置');
    process.exit(1);
  }

  console.log('🔑 获取 Access Token...');
  const accessToken = await getAccessToken(config.appId, config.appSecret);

  let thumbMediaId = '';
  if (metadata.coverPath) {
    console.log('🖼️  上传封面图片...');
    thumbMediaId = await uploadThumbMedia(accessToken, metadata.coverPath);
  }

  if (imagePaths.length > 0) {
    console.log(`🖼️  上传 ${imagePaths.length} 张正文图片...`);
    htmlContent = await replaceImageUrls(htmlContent, imagePaths, accessToken);
  }

  const needOpenComment = config.needOpenComment ? 1 : 0;
  const onlyFansCanComment = config.onlyFansCanComment ? 1 : 0;

  const article: Article = {
    title: metadata.title,
    author: metadata.author,
    digest: metadata.digest,
    content: htmlContent,
    thumb_media_id: thumbMediaId,
    need_open_comment: needOpenComment,
    only_fans_can_comment: onlyFansCanComment,
  };

  console.log('📝 创建草稿...');
  const mediaId = await createDraft(accessToken, article);

  console.log(`
✅ 发布完成！

输入: ${isHtml ? 'HTML' : 'Markdown'} - ${filePath}
方法: API
主题: ${theme}${color ? ` - ${color}` : ''}

文章:
• 标题: ${metadata.title}
• 作者: ${metadata.author || '(未设置)'}
• 摘要: ${metadata.digest}
• 图片: ${imagePaths.length} 张
• 评论: ${needOpenComment ? '开启' : '关闭'}, ${onlyFansCanComment ? '仅粉丝' : '所有用户'}

结果:
✓ 草稿已保存到微信公众号草稿箱
• media_id: ${mediaId}

下一步:
→ 管理草稿: https://mp.weixin.qq.com (登录后进入「内容管理」→「草稿箱」)
`);
}

main().catch(error => {
  console.error(`❌ 错误: ${error.message}`);
  process.exit(1);
});