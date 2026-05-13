import fs from 'fs';
import path from 'path';

import type { ThemeName } from './themes';

export interface SkillConfig {
  defaultTheme: ThemeName;
  defaultColor?: string;
  defaultAuthor?: string;
  needOpenComment: boolean;
  onlyFansCanComment: boolean;
  appId?: string;
  appSecret?: string;
}

const defaultConfig: SkillConfig = {
  defaultTheme: 'default',
  needOpenComment: true,
  onlyFansCanComment: false,
};

function parseBoolean(value: any): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    return !['0', 'false', 'no', 'off'].includes(lower);
  }
  return false;
}

function findExtendFile(): string | null {
  const pathsToTry = [
    path.join(process.cwd(), '.yy-skills', 'yy-post-to-wechat', 'EXTEND.md'),
    path.join(process.env.HOME || '', '.yy-skills', 'yy-post-to-wechat', 'EXTEND.md'),
  ];

  for (const p of pathsToTry) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  return null;
}

function parseExtendContent(content: string): Partial<SkillConfig> {
  const config: Partial<SkillConfig> = {};
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmed.slice(0, colonIndex).trim().toLowerCase();
    const value = trimmed.slice(colonIndex + 1).trim();

    switch (key) {
      case 'default_theme':
        if (['default', 'grace', 'simple', 'modern'].includes(value)) {
          config.defaultTheme = value as ThemeName;
        }
        break;
      case 'default_color':
        config.defaultColor = value;
        break;
      case 'default_author':
        config.defaultAuthor = value;
        break;
      case 'need_open_comment':
        config.needOpenComment = parseBoolean(value);
        break;
      case 'only_fans_can_comment':
        config.onlyFansCanComment = parseBoolean(value);
        break;
      case 'app_id':
        config.appId = value;
        break;
      case 'app_secret':
        config.appSecret = value;
        break;
    }
  }

  return config;
}

function loadFromEnv(): Partial<SkillConfig> {
  const config: Partial<SkillConfig> = {};

  const appId = process.env.WECHAT_APP_ID;
  const appSecret = process.env.WECHAT_APP_SECRET;

  if (appId) config.appId = appId;
  if (appSecret) config.appSecret = appSecret;

  return config;
}

function loadFromEnvFile(): Partial<SkillConfig> {
  const envPaths = [
    path.join(process.cwd(), '.yy-skills', '.env'),
    path.join(process.env.HOME || '', '.yy-skills', '.env'),
    path.join(process.cwd(), '.env'),
  ];

  for (const envPath of envPaths) {
    if (!fs.existsSync(envPath)) continue;

    const content = fs.readFileSync(envPath, 'utf-8');
    const lines = content.split('\n');
    const config: Partial<SkillConfig> = {};

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;

      const key = trimmed.slice(0, eqIndex).trim();
      const value = trimmed.slice(eqIndex + 1).trim();

      if (key === 'WECHAT_APP_ID') {
        config.appId = value;
      } else if (key === 'WECHAT_APP_SECRET') {
        config.appSecret = value;
      }
    }

    if (config.appId || config.appSecret) {
      return config;
    }
  }

  return {};
}

export function loadConfig(): SkillConfig {
  let config = { ...defaultConfig };

  const extendPath = findExtendFile();
  if (extendPath) {
    const content = fs.readFileSync(extendPath, 'utf-8');
    const extendConfig = parseExtendContent(content);
    config = { ...config, ...extendConfig };
  }

  const envConfig = loadFromEnv();
  const envFileConfig = loadFromEnvFile();
  config = { ...config, ...envFileConfig, ...envConfig };

  return config;
}

export function hasCredentials(config: SkillConfig): boolean {
  return !!(config.appId && config.appSecret);
}
