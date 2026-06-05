/** 社交链接 */
interface Link {
  /** 链接显示名称 */
  label: string;
  /** 链接 URL */
  url: string;
}

/** 技能分类 */
interface SkillCategory {
  /** 技能分类名称，如"前端框架" */
  category: string;
  /** 技能列表 */
  items: string[];
}

/** 工作经历 */
interface Experience {
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
interface Project {
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
interface Education {
  /** 学校名称 */
  school: string;
  /** 学校网址（可选） */
  url?: string;
  /** 专业 */
  major: string;
  /** 开始日期 */
  startDate: string;
  /** 结束日期 */
  endDate: string;
}

/** 证书 */
interface Cert {
  /** 证书名称 */
  name: string;
  /** 颁发机构 */
  issuer: string;
  /** 获取年份 */
  year: string;
}

/** 发表论文 */
interface Publication {
  /** 论文标题 */
  title: string;
  /** 期刊名称 */
  journal: string;
  /** 发表年份 */
  year: string;
  /** 作者列表 */
  authors: string;
}

/** 区块类型 — 对应渲染组件 */
type BlockType =
  | 'header'
  | 'summary'
  | 'skills'
  | 'competency'
  | 'regulatory'
  | 'experience'
  | 'projects'
  | 'education'
  | 'certs'
  | 'publications';

/** 区块配置 */
interface BlockConfig {
  /** 唯一标识 */
  id: string;
  /** 组件类型，决定渲染哪个组件和绑定哪个数据字段 */
  type: BlockType;
  /** 区块标题（可选，覆盖组件默认标题） */
  title?: string;
  /** 区块变体（可选），仅 projects 使用：tech/submission/tools */
  variant?: 'tech' | 'submission' | 'tools';
}

/** 页面配置 */
interface PageConfig {
  /** 唯一标识 */
  id: string;
  /** 页面标签名，如"第 1 页" */
  name: string;
  /** 该页包含的区块列表 */
  blocks: BlockConfig[];
}

/** 简历完整数据结构 */
interface ResumeData {
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
  /** 核心能力列表（可选） */
  competencies?: string[];
  /** 法规体系列表（可选） */
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
  /** 页面配置列表 — 定义简历的多页布局 */
  pages: PageConfig[];
}
