export type ThemeName = 'default' | 'grace' | 'simple' | 'modern';

export const colorPresets: Record<string, string> = {
  blue: '#576b95',
  green: '#009a61',
  vermilion: '#e67e22',
  yellow: '#f1c40f',
  purple: '#9b59b6',
  sky: '#3498db',
  rose: '#e84393',
  olive: '#708b2b',
  black: '#333333',
  gray: '#7f8c8d',
  pink: '#fd79a8',
  red: '#e74c3c',
  orange: '#e67e22',
};

export function getPresetColor(name: string): string | undefined {
  return colorPresets[name.toLowerCase()];
}

export function isHexColor(color: string): boolean {
  return /^#?[0-9A-Fa-f]{6}$/.test(color);
}

export function normalizeColor(color: string): string {
  if (color.startsWith('#')) return color;
  const preset = getPresetColor(color);
  if (preset) return preset;
  if (isHexColor(color)) return `#${color}`;
  return color;
}

const defaultTheme = `
/* Default Theme */
.wechat-article {
  max-width: 100%;
  margin: 0 auto;
  padding: 15px;
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  background: #ffffff;
}

.wechat-article h1 {
  font-size: 22px;
  color: var(--wechat-primary);
  border-bottom: 2px solid var(--wechat-primary);
  padding-bottom: 8px;
  margin: 20px 0 15px;
}

.wechat-article h2 {
  font-size: 20px;
  color: var(--wechat-primary);
  margin: 18px 0 12px;
  border-left: 4px solid var(--wechat-primary);
  padding-left: 10px;
}

.wechat-article h3 {
  font-size: 18px;
  color: var(--wechat-primary);
  margin: 16px 0 10px;
}

.wechat-article p {
  margin: 12px 0;
  text-align: justify;
}

.wechat-article img {
  max-width: 100%;
  display: block;
  margin: 15px auto;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.wechat-article ul, .wechat-article ol {
  margin: 12px 0;
  padding-left: 25px;
}

.wechat-article li {
  margin: 6px 0;
}

.wechat-article blockquote {
  border-left: 4px solid var(--wechat-primary);
  padding: 10px 15px;
  margin: 15px 0;
  background: #f8f9fa;
  color: #666;
}

.wechat-article code {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 14px;
}

.wechat-article pre {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 5px;
  overflow-x: auto;
  margin: 15px 0;
}

.wechat-article pre code {
  background: none;
  padding: 0;
}

.wechat-article a {
  color: var(--wechat-primary);
  text-decoration: none;
}

.wechat-citations {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  font-size: 14px;
  color: #666;
}

.wechat-citations ol {
  padding-left: 20px;
}

.wechat-citations li {
  margin: 5px 0;
}

.wechat-citations a {
  color: var(--wechat-primary);
  word-break: break-all;
}
`;

const graceTheme = `
/* Grace Theme */
.wechat-article {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px 15px;
  font-size: 17px;
  line-height: 2.0;
  color: #2c3e50;
  background: #ffffff;
}

.wechat-article h1 {
  font-size: 24px;
  color: var(--wechat-primary);
  text-align: center;
  margin: 30px 0 25px;
  font-weight: bold;
}

.wechat-article h2 {
  font-size: 21px;
  color: var(--wechat-primary);
  margin: 25px 0 18px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}

.wechat-article h3 {
  font-size: 19px;
  color: var(--wechat-primary);
  margin: 22px 0 15px;
}

.wechat-article p {
  margin: 15px 0;
  text-align: justify;
}

.wechat-article img {
  max-width: 100%;
  display: block;
  margin: 20px auto;
  border-radius: 6px;
}

.wechat-article ul, .wechat-article ol {
  margin: 15px 0;
  padding-left: 30px;
}

.wechat-article li {
  margin: 8px 0;
}

.wechat-article blockquote {
  border: 1px solid var(--wechat-primary);
  border-radius: 4px;
  padding: 15px 20px;
  margin: 20px 0;
  background: #fafafa;
  color: #555;
}

.wechat-article code {
  background: #f8f8f8;
  border: 1px solid #eaeaea;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 14px;
}

.wechat-article pre {
  border: 1px solid #eaeaea;
  border-radius: 5px;
  padding: 15px;
  background: #fafafa;
  overflow-x: auto;
  margin: 20px 0;
}

.wechat-article pre code {
  border: none;
  background: none;
  padding: 0;
}

.wechat-article a {
  color: var(--wechat-primary);
  text-decoration: none;
  border-bottom: 1px dotted var(--wechat-primary);
}

.wechat-citations {
  margin-top: 40px;
  padding-top: 25px;
  border-top: 1px solid #eaeaea;
  font-size: 14px;
  line-height: 1.7;
  color: #7f8c8d;
}

.wechat-citations ol {
  padding-left: 22px;
}
`;

const simpleTheme = `
/* Simple Theme */
.wechat-article {
  max-width: 100%;
  margin: 0 auto;
  padding: 10px 15px;
  font-size: 16px;
  line-height: 1.7;
  color: #333;
  background: #ffffff;
}

.wechat-article h1 {
  font-size: 24px;
  color: var(--wechat-primary);
  margin: 20px 0 15px;
  font-weight: bold;
}

.wechat-article h2 {
  font-size: 20px;
  color: var(--wechat-primary);
  margin: 18px 0 12px;
}

.wechat-article h3 {
  font-size: 18px;
  color: var(--wechat-primary);
  margin: 16px 0 10px;
}

.wechat-article p {
  margin: 10px 0;
}

.wechat-article img {
  max-width: 100%;
  display: block;
  margin: 15px auto;
}

.wechat-article ul, .wechat-article ol {
  margin: 10px 0;
  padding-left: 25px;
}

.wechat-article li {
  margin: 5px 0;
}

.wechat-article blockquote {
  border-left: 3px solid var(--wechat-primary);
  padding: 5px 12px;
  margin: 12px 0;
  color: #666;
}

.wechat-article code {
  background: #f5f5f5;
  padding: 1px 4px;
  border-radius: 2px;
  font-size: 14px;
}

.wechat-article pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 3px;
  overflow-x: auto;
  margin: 12px 0;
}

.wechat-article pre code {
  background: none;
  padding: 0;
}

.wechat-article a {
  color: var(--wechat-primary);
  text-decoration: none;
}

.wechat-citations {
  margin-top: 25px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  font-size: 13px;
  color: #666;
}

.wechat-citations ol {
  padding-left: 18px;
}
`;

const modernTheme = `
/* Modern Theme */
.wechat-article {
  max-width: 100%;
  margin: 0 auto;
  padding: 15px;
  font-size: 16px;
  line-height: 1.8;
  color: #2c3e50;
  background: #ffffff;
}

.wechat-article h1 {
  font-size: 26px;
  color: #ffffff;
  background: var(--wechat-primary);
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0 25px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.wechat-article h2 {
  font-size: 22px;
  color: var(--wechat-primary);
  margin: 25px 0 15px;
  padding: 10px 15px;
  background: rgba(87, 107, 149, 0.05);
  border-radius: 4px;
}

.wechat-article h3 {
  font-size: 19px;
  color: var(--wechat-primary);
  margin: 20px 0 12px;
}

.wechat-article p {
  margin: 15px 0;
  text-align: justify;
}

.wechat-article img {
  max-width: 100%;
  display: block;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.wechat-article ul, .wechat-article ol {
  margin: 15px 0;
  padding-left: 30px;
}

.wechat-article li {
  margin: 8px 0;
}

.wechat-article blockquote {
  background: rgba(87, 107, 149, 0.05);
  border-radius: 4px;
  padding: 15px 20px;
  margin: 20px 0;
  border: none;
  color: #555;
}

.wechat-article code {
  background: rgba(87, 107, 149, 0.08);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 14px;
  color: var(--wechat-primary);
}

.wechat-article pre {
  background: #2c3e50;
  border-radius: 8px;
  padding: 15px;
  overflow-x: auto;
  margin: 20px 0;
}

.wechat-article pre code {
  background: none;
  color: #ecf0f1;
}

.wechat-article a {
  color: var(--wechat-primary);
  text-decoration: none;
}

.wechat-citations {
  margin-top: 35px;
  padding: 20px;
  background: rgba(87, 107, 149, 0.05);
  border-radius: 8px;
  font-size: 14px;
  color: #7f8c8d;
}

.wechat-citations ol {
  padding-left: 20px;
  margin: 0;
}

.wechat-citations li {
  margin: 6px 0;
}

.wechat-citations a {
  color: var(--wechat-primary);
}
`;

export function getTheme(themeName: ThemeName): string {
  switch (themeName) {
    case 'default':
      return defaultTheme;
    case 'grace':
      return graceTheme;
    case 'simple':
      return simpleTheme;
    case 'modern':
      return modernTheme;
    default:
      return defaultTheme;
  }
}
