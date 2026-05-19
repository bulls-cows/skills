/**
 * Markdown 转换相关类型声明
 */

interface ConvertOptions {
  needCitation: boolean;
  theme: ThemeName;
  color: string;
  title: string;
}

interface ConvertResult {
  html: string;
  citations: Array<{ text: string; url: string }>;
  imagePaths: string[];
}

interface Citation {
  index: number;
  url: string;
}
