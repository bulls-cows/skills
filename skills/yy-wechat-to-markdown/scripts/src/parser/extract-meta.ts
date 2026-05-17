import type { ArticleMeta } from '../typings/parser.js';

/**
 * 从 HTML 中提取文章元信息（标题、作者）
 */
export function extractMeta(html: string): ArticleMeta {
  // 标题
  let title = '';
  const titleMatch =
    html.match(/<h1[^>]*class="[^"]*rich_media_title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) ||
    html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/) ||
    html.match(/var\s+msg_title\s*=\s*"([^"]+)"/);
  if (titleMatch) {
    title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  // 作者 / 公众号名称
  let author = '';
  const authorMatch =
    html.match(/var\s+nickname\s*=\s*"([^"]+)"/) ||
    html.match(/id="js_name"[^>]*>([\s\S]*?)<\/span>/i) ||
    html.match(/<meta\s+name="author"\s+content="([^"]+)"/i);
  if (authorMatch) {
    author = authorMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  return { title, author };
}
