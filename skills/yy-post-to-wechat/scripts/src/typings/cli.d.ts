/**
 * CLI 相关类型声明
 */

interface CliOptions {
  theme: ThemeName;
  color?: string;
  title?: string;
  summary?: string;
  author?: string;
  cover?: string;
  needCitation: boolean;
}

interface FrontMatterAttributes {
  title?: string;
  author?: string;
  description?: string;
  summary?: string;
  cover?: string;
  coverImage?: string;
  featureImage?: string;
  image?: string;
}

interface MetadataResult {
  title: string;
  author: string;
  digest: string;
  coverPath: string | null;
  markdownBody: string;
}

interface InputResult {
  content: string;
  filePath: string;
  isHtml: boolean;
}
