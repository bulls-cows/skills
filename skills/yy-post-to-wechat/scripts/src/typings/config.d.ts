/**
 * 配置相关类型声明
 */

type ThemeName = 'default' | 'grace' | 'simple' | 'modern';

interface SkillConfig {
  defaultTheme: ThemeName;
  defaultColor?: string;
  defaultAuthor?: string;
  needOpenComment: boolean;
  onlyFansCanComment: boolean;
  appId?: string;
  appSecret?: string;
}