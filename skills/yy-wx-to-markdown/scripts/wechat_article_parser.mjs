/**
 * 微信公众号文章转 Markdown
 * 入参：微信公众号文章链接
 * 出参：Markdown 文本内容
 */

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

/**
 * 将 HTML 片段转换为 Markdown 文本
 */
function htmlToMarkdown(html) {
  return (
    html
      // 换行标签
      .replace(/<br\s*\/?>/gi, "\n")
      // 段落结束
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<p[^>]*>/gi, "")
      // 标题
      .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "# $1\n\n")
      .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "## $1\n\n")
      .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "### $1\n\n")
      .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "#### $1\n\n")
      .replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, "##### $1\n\n")
      .replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, "###### $1\n\n")
      // 加粗 / 斜体
      .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
      .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**")
      .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*")
      .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*")
      // 删除线
      .replace(/<(?:s|del|strike)[^>]*>([\s\S]*?)<\/(?:s|del|strike)>/gi, "~~$1~~")
      // 列表
      .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n")
      .replace(/<[ou]l[^>]*>/gi, "\n")
      .replace(/<\/[ou]l>/gi, "\n")
      // 引用块
      .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner) => {
        const lines = inner
          .replace(/<[^>]+>/g, "")
          .trim()
          .split("\n")
          .map((l) => `> ${l.trim()}`)
          .join("\n");
        return `${lines}\n\n`;
      })
      // 代码
      .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`")
      .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, "```\n$1\n```\n\n")
      // 链接
      .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
      // 图片（微信用 data-src 做懒加载）
      .replace(/<img[^>]*data-src="([^"]+)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)")
      .replace(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)")
      .replace(/<img[^>]*data-src="([^"]+)"[^>]*\/?>/gi, "![]($1)")
      .replace(/<img[^>]*src="([^"]+)"[^>]*\/?>/gi, "![]($1)")
      // 水平线
      .replace(/<hr[^>]*\/?>/gi, "\n---\n\n")
      // 移除所有剩余 HTML 标签
      .replace(/<[^>]+>/g, "")
      // HTML 实体还原
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&mdash;/g, "—")
      .replace(/&ndash;/g, "–")
      .replace(/&hellip;/g, "…")
      .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
      // 整理空行
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

/**
 * 从 HTML 中提取文章元信息（标题、作者）
 */
function extractMeta(html) {
  // 标题
  let title = "";
  const titleMatch =
    html.match(/<h1[^>]*class="[^"]*rich_media_title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) ||
    html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/) ||
    html.match(/var\s+msg_title\s*=\s*"([^"]+)"/);
  if (titleMatch) {
    title = titleMatch[1].replace(/<[^>]+>/g, "").trim();
  }

  // 作者 / 公众号名称
  let author = "";
  const authorMatch =
    html.match(/var\s+nickname\s*=\s*"([^"]+)"/) ||
    html.match(/id="js_name"[^>]*>([\s\S]*?)<\/span>/i) ||
    html.match(/<meta\s+name="author"\s+content="([^"]+)"/i);
  if (authorMatch) {
    author = authorMatch[1].replace(/<[^>]+>/g, "").trim();
  }

  return { title, author };
}

/**
 * 从 HTML 中提取正文区域
 */
function extractBody(html) {
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

  return "";
}

/**
 * 主函数：微信公众号文章链接 → Markdown 文本
 * @param url 微信公众号文章链接，如 https://mp.weixin.qq.com/s/xxx
 * @returns Markdown 文本内容
 */
export async function wxArticleToMarkdown(url) {
  // 1. 请求文章页面 HTML（全部在内存中，不落盘）
  const response = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "zh-CN,zh;q=0.9",
      "Cache-Control": "no-cache",
    },
    redirect: "follow",
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
    throw new Error("未能提取到正文内容，可能是付费文章或需要登录");
  }

  // 4. 转换为 Markdown
  const bodyMd = htmlToMarkdown(bodyHtml);

  // 5. 拼装完整 Markdown（含 frontmatter）
  const lines = [];

  // frontmatter
  lines.push("---");
  if (title) lines.push(`title: "${title}"`);
  if (author) lines.push(`author: "${author}"`);
  lines.push(`source: "${url}"`);
  lines.push(`date: "${new Date().toISOString().slice(0, 10)}"`);
  lines.push("---");
  lines.push("");

  // 正文标题
  if (title) {
    lines.push(`# ${title}`);
    lines.push("");
  }
  if (author) {
    lines.push(`> 作者：${author}`);
    lines.push("");
  }
  lines.push("---");
  lines.push("");
  lines.push(bodyMd);

  return lines.join("\n");
}
