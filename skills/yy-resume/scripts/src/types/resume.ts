/** 社交链接 */
export interface Link {
  /** 链接显示名称 */
  label: string;
  /** 链接 URL */
  url: string;
}

/** 技能分类 */
export interface SkillCategory {
  /** 技能分类名称，如"前端框架" */
  category: string;
  /** 技能列表 */
  items: string[];
}

/** 工作经历 */
export interface Experience {
  /** 公司/组织名称 */
  organization: string;
  /** 公司网址（可选） */
  url?: string;
  /** 公司标签（如"上市"、"高新"） */
  tags?: string[];
  /** 职位 */
  position: string;
  /** 开始日期 */
  startDate: string;
  /** 结束日期 */
  endDate: string;
  /** 工作描述列表 */
  descriptions: string[];
}

/** 项目经验 */
export interface Project {
  /** 项目名称 */
  name: string;
  /** 项目链接（可选） */
  url?: string;
  /** 担任角色 */
  role: string;
  /** 技术栈（tech 变体用） */
  techStack?: string;
  /** 申报类型（submission 变体用） */
  submissionType?: string;
  /** 工具与方法（tools 变体用） */
  toolsMethods?: string;
  /** 开始日期 */
  startDate: string;
  /** 结束日期 */
  endDate: string;
  /** 项目描述列表 */
  descriptions: string[];
}

/** 教育背景 */
export interface Education {
  /** 学校名称 */
  school: string;
  /** 专业 */
  major: string;
  /** 开始日期 */
  startDate: string;
  /** 结束日期 */
  endDate: string;
}

/** 证书 */
export interface Cert {
  /** 证书名称 */
  name: string;
  /** 颁发机构 */
  issuer: string;
  /** 获取年份 */
  year: string;
}

/** 发表论文 */
export interface Publication {
  /** 论文标题 */
  title: string;
  /** 期刊名称 */
  journal: string;
  /** 发表年份 */
  year: string;
  /** 作者列表 */
  authors: string;
}

/** 简历完整数据结构 */
export interface ResumeData {
  /** 模板名称，对应 profiles 中的 key */
  template: string;
  /** 姓名 */
  name: string;
  /** 职位头衔 */
  title: string;
  /** 所在城市 */
  city: string;
  /** 手机号 */
  phone: string;
  /** 邮箱 */
  email: string;
  /** 社交链接列表（可选） */
  links?: Link[];
  /** 个人简介（可选） */
  summary?: string;
  /** 技能分类列表（可选） */
  skills?: SkillCategory[];
  /** 核心能力列表（可选，pharma-regulatory 模板用） */
  competencies?: string[];
  /** 法规体系列表（可选，pharma-regulatory 模板用） */
  regulatorySystems?: SkillCategory[];
  /** 工作经历列表（可选） */
  experience?: Experience[];
  /** 项目经验列表（可选） */
  projects?: Project[];
  /** 教育背景列表（可选） */
  education?: Education[];
  /** 证书列表（可选） */
  certs?: Cert[];
  /** 发表论文列表（可选） */
  publications?: Publication[];
}

/** 简历章节配置 */
export interface SectionConfig {
  /** 章节 ID，对应渲染逻辑中的 switch case */
  id: string;
  /** 章节标题（可选） */
  title?: string;
  /** 字段路径列表，描述数据提取方式 */
  fields: string[];
  /** 章节变体（可选），影响渲染内容：tech/submission/tools */
  variant?: 'tech' | 'submission' | 'tools';
}

/** 主题颜色配置 */
export interface ThemeConfig {
  /** 主题色 */
  primary: string;
  /** 标签背景色 */
  tagBg: string;
  /** 标签边框色 */
  tagBorder: string;
}

/** 简历模板配置 */
export interface Profile {
  /** 主题颜色配置 */
  theme: ThemeConfig;
  /** 是否在页眉显示社交链接 */
  headerLinks: boolean;
  /** 章节配置列表 */
  sections: SectionConfig[];
}
