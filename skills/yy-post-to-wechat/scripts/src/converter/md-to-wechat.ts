import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import frontMatter from 'front-matter';

import { getTheme, normalizeColor } from '../themes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function extractImagePaths(html: string, baseDir: string): string[] {
  const imgRegex = /<img[^>]+src="([^"]+)"/g;
  const paths: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1];
    if (!src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('data:')) {
      const fullPath = path.isAbsolute(src) ? src : path.join(baseDir, src);
      if (fs.existsSync(fullPath) && !paths.includes(fullPath)) {
        paths.push(fullPath);
      }
    }
  }

  return paths;
}

export function convertMarkdownToWechat(
  markdown: string,
  options: ConvertOptions,
  baseDir: string
): ConvertResult {
  const citations: Citation[] = [];
  const citationMap = new Map<string, number>();

  const originalRenderer = new marked.Renderer();
  const renderer = new marked.Renderer();

  if (options.needCitation) {
    renderer.link = function (
      href: string,
      title: string | null | undefined,
      text: string
    ): string {
      if (href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://')) {
        let citationIdx: number;
        if (citationMap.has(href)) {
          citationIdx = citationMap.get(href)!;
        } else {
          citationIdx = citations.length + 1;
          citations.push({ index: citationIdx, url: href });
          citationMap.set(href, citationIdx);
        }
        const originalHtml = originalRenderer.link.call(originalRenderer, href, title || '', text);
        return `${originalHtml}<sup>${citationIdx}</sup>`;
      }
      return originalRenderer.link.call(originalRenderer, href, title || '', text);
    };
  }

  const htmlContent = marked(markdown, { renderer }) as string;
  const imagePaths = extractImagePaths(htmlContent, baseDir);

  const themeCss = getTheme(options.theme);
  const primaryColor = normalizeColor(options.color);

  let citationsHtml = '';
  if (citations.length > 0) {
    citationsHtml = `<div class="wechat-citations"><ol>${citations
      .map(c => `<li><a href="${c.url}" target="_blank">${c.url}</a></li>`)
      .join('')}</ol></div>`;
  }

  const templatePath = path.join(__dirname, '..', '..', 'templates', 'base.html');
  let template = fs.readFileSync(templatePath, 'utf-8');

  template = template.replace('{{title}}', escapeHtml(options.title));
  template = template.replace('{{themeCss}}', themeCss);
  template = template.replace('{{primaryColor}}', primaryColor);
  template = template.replace('{{content}}', htmlContent);
  template = template.replace('{{citations}}', citationsHtml);

  return {
    html: template,
    citations: citations.map(c => ({ text: c.url, url: c.url })),
    imagePaths,
  };
}

export function parseFrontMatter<T>(content: string): { attributes: T; body: string } {
  return frontMatter<T>(content);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function extractFirstTitle(markdown: string): string | null {
  const lines = markdown.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      return trimmed.slice(2).trim();
    }
    if (trimmed.startsWith('## ')) {
      return trimmed.slice(3).trim();
    }
  }

  const firstParagraph = lines.find(l => l.trim().length > 0);
  if (firstParagraph) {
    return firstParagraph.trim().slice(0, 50);
  }

  return null;
}

export function extractFirstParagraph(markdown: string): string | null {
  const lines = markdown.split('\n');
  let inFrontMatter = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '---') {
      inFrontMatter = !inFrontMatter;
      continue;
    }
    if (!inFrontMatter && trimmed.length > 0 && !trimmed.startsWith('#')) {
      return trimmed.slice(0, 120);
    }
  }

  return null;
}
