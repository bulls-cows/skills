/**
 * 从 HTML 中提取正文区域
 */
export function extractBody(html: string): string {
  // 微信正文固定在 id="js_content" 的 div 中
  const patterns = [
    /id="js_content"[^>]*>([\s\S]*?)<\/div>\s*(?:<div|<\/div>)/,
    /class="rich_media_content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div|<script)/,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1].trim().length > 100) {
      return match[1];
    }
  }

  // 兜底：取 <article> 标签
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) return articleMatch[1];

  return '';
}
