import type { Profile } from '@/types/resume';

/** 简历模板配置集合，key 为模板名称 */
export const profiles: Record<string, Profile> = {
  general: {
    headerLinks: false,
    sections: [
      { id: 'header', fields: ['name', 'title', 'city', 'phone', 'email'] },
      { id: 'summary', title: '个人简介', fields: ['summary'] },
      { id: 'skills', title: '技能', fields: ['skills[]{category,items[]}'] },
      {
        id: 'experience',
        title: '工作经验',
        fields: ['experience[]{organization,url,tags[],position,startDate,endDate,descriptions[]}'],
      },
      {
        id: 'projects',
        title: '项目经验',
        fields: ['projects[]{name,url,role,startDate,endDate,descriptions[]}'],
      },
      {
        id: 'education',
        title: '教育背景',
        fields: ['education[]{school,major,startDate,endDate}'],
      },
      { id: 'certs', title: '证书与其他', fields: ['certs[]{name,issuer,year}'] },
    ],
  },
  frontend: {
    headerLinks: true,
    sections: [
      {
        id: 'header',
        fields: ['name', 'title', 'city', 'phone', 'email', 'links[]{label,url}'],
      },
      { id: 'summary', title: '个人简介', fields: ['summary'] },
      { id: 'skills', title: '技能栈', fields: ['skills[]{category,items[]}'] },
      {
        id: 'experience',
        title: '工作经验',
        fields: ['experience[]{organization,url,tags[],position,startDate,endDate,descriptions[]}'],
      },
      {
        id: 'projects',
        title: '项目经验',
        variant: 'tech',
        fields: ['projects[]{name,url,role,techStack,startDate,endDate,descriptions[]}'],
      },
      {
        id: 'education',
        title: '教育背景',
        fields: ['education[]{school,major,startDate,endDate}'],
      },
    ],
  },
  backend: {
    headerLinks: true,
    sections: [
      {
        id: 'header',
        fields: ['name', 'title', 'city', 'phone', 'email', 'links[]{label,url}'],
      },
      { id: 'summary', title: '个人简介', fields: ['summary'] },
      { id: 'skills', title: '技能栈', fields: ['skills[]{category,items[]}'] },
      {
        id: 'experience',
        title: '工作经验',
        fields: ['experience[]{organization,url,tags[],position,startDate,endDate,descriptions[]}'],
      },
      {
        id: 'projects',
        title: '项目经验',
        variant: 'tech',
        fields: ['projects[]{name,url,role,techStack,startDate,endDate,descriptions[]}'],
      },
      {
        id: 'education',
        title: '教育背景',
        fields: ['education[]{school,major,startDate,endDate}'],
      },
    ],
  },
  fullstack: {
    headerLinks: true,
    sections: [
      {
        id: 'header',
        fields: ['name', 'title', 'city', 'phone', 'email', 'links[]{label,url}'],
      },
      { id: 'summary', title: '个人简介', fields: ['summary'] },
      { id: 'skills', title: '技能栈', fields: ['skills[]{category,items[]}'] },
      {
        id: 'experience',
        title: '工作经验',
        fields: ['experience[]{organization,url,tags[],position,startDate,endDate,descriptions[]}'],
      },
      {
        id: 'projects',
        title: '项目经验',
        variant: 'tech',
        fields: ['projects[]{name,url,role,techStack,startDate,endDate,descriptions[]}'],
      },
      {
        id: 'education',
        title: '教育背景',
        fields: ['education[]{school,major,startDate,endDate}'],
      },
    ],
  },
  'pharma-regulatory': {
    headerLinks: false,
    sections: [
      { id: 'header', fields: ['name', 'title', 'city', 'phone', 'email'] },
      { id: 'summary', title: '个人简介', fields: ['summary'] },
      { id: 'competency', title: '核心能力', fields: ['competencies[]'] },
      {
        id: 'regulatory',
        title: '法规体系',
        fields: ['regulatorySystems[]{category,items[]}'],
      },
      {
        id: 'experience',
        title: '工作经验',
        fields: ['experience[]{organization,url,tags[],position,startDate,endDate,descriptions[]}'],
      },
      {
        id: 'projects',
        title: '项目经验',
        variant: 'submission',
        fields: ['projects[]{name,url,role,submissionType,startDate,endDate,descriptions[]}'],
      },
      {
        id: 'education',
        title: '教育背景',
        fields: ['education[]{school,major,startDate,endDate}'],
      },
      { id: 'certs', title: '资质证书', fields: ['certs[]{name,issuer,year}'] },
    ],
  },
  bioinformatics: {
    headerLinks: true,
    sections: [
      {
        id: 'header',
        fields: ['name', 'title', 'city', 'phone', 'email', 'links[]{label,url}'],
      },
      { id: 'summary', title: '个人简介', fields: ['summary'] },
      { id: 'skills', title: '技术能力', fields: ['skills[]{category,items[]}'] },
      {
        id: 'experience',
        title: '研究经历',
        fields: ['experience[]{organization,url,tags[],position,startDate,endDate,descriptions[]}'],
      },
      {
        id: 'projects',
        title: '项目经验',
        variant: 'tools',
        fields: ['projects[]{name,url,role,toolsMethods,startDate,endDate,descriptions[]}'],
      },
      {
        id: 'publications',
        title: '发表论文',
        fields: ['publications[]{title,journal,year,authors}'],
      },
      {
        id: 'education',
        title: '教育背景',
        fields: ['education[]{school,major,startDate,endDate}'],
      },
    ],
  },
};
