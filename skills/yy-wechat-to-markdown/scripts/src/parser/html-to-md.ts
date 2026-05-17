/**
 * 将 HTML 片段转换为 Markdown 文本
 */
export function htmlToMarkdown(html: string): string {
  return (
    html
      // 换行标签
      .replace(/<br\s*\/?>/gi, '\n')
      // 段落结束
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<p[^>]*>/gi, '')
      // 标题
      .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n')
      .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n')
      .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n')
      .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n')
      .replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '##### $1\n\n')
      .replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '###### $1\n\n')
      // 加粗 / 斜体
      .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
      .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**')
      .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*')
      .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*')
      // 删除线
      .replace(/<(?:s|del|strike)[^>]*>([\s\S]*?)<\/(?:s|del|strike)>/gi, '~~$1~~')
      // 列表
      .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
      .replace(/<[ou]l[^>]*>/gi, '\n')
      .replace(/<\/[ou]l>/gi, '\n')
      // 引用块
      .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner: string) => {
        const lines = inner
          .replace(/<[^>]+>/g, '')
          .trim()
          .split('\n')
          .map((l: string) => `> ${l.trim()}`)
          .join('\n');
        return `${lines}\n\n`;
      })
      // 代码
      .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
      .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '```\n$1\n```\n\n')
      // 链接
      .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
      // 图片（微信用 data-src 做懒加载）
      .replace(/<img[^>]*data-src="([^"]+)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
      .replace(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
      .replace(/<img[^>]*data-src="([^"]+)"[^>]*\/?>/gi, '![]($1)')
      .replace(/<img[^>]*src="([^"]+)"[^>]*\/?>/gi, '![]($1)')
      // 水平线
      .replace(/<hr[^>]*\/?>/gi, '\n---\n\n')
      // 移除所有剩余 HTML 标签
      .replace(/<[^>]+>/g, '')
      // HTML 实体还原
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&mdash;/g, '—')
      .replace(/&ndash;/g, '–')
      .replace(/&hellip;/g, '…')
      .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
      // 整理空行
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}
