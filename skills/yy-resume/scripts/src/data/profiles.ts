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

/** 示例简历数据，用于预览与调试 */
export const sampleData = {
  template: 'frontend',
  name: '张三',
  title: '前端开发工程师',
  city: '北京',
  phone: '13800138000',
  email: 'zhangsan@example.com',
  links: [
    { label: 'GitHub', url: 'https://github.com/zhangsan' },
    { label: '博客', url: 'https://blog.zhangsan.dev' },
  ],
  summary:
    '5 年前端开发经验，熟练掌握 React、Vue.js、TypeScript 等技术栈，擅长复杂交互和性能优化。<strong>曾主导多个核心项目</strong>，带领团队完成技术升级。',
  skills: [
    { category: '前端框架', items: ['React', 'Vue.js', 'TypeScript'] },
    { category: '样式/CSS', items: ['Tailwind CSS', 'Sass', 'CSS Modules'] },
    { category: '构建工具', items: ['Vite', 'Webpack'] },
    { category: '测试', items: ['Jest', 'Cypress'] },
  ],
  experience: [
    {
      organization: 'ABC 科技有限公司',
      url: 'https://www.abc-tech.com',
      tags: ['上市', '高新'],
      position: '前端开发工程师',
      startDate: '2021.03',
      endDate: '至今',
      descriptions: [
        '<span class="num">①</span> 负责核心产品前端架构设计与开发',
        '<span class="num">②</span> 主导前端架构升级，将项目从 Vue 2 迁移到 <strong>React 18</strong>',
        '<span class="num">③</span> 优化页面加载速度，首屏加载时间从 3s 降低到 <strong>1.2s</strong>',
      ],
    },
  ],
  projects: [
    {
      name: '在线教育平台',
      url: 'https://edu.example.com',
      role: '前端负责人',
      techStack: 'React, TypeScript, Vite, Tailwind CSS',
      startDate: '2022.01',
      endDate: '至今',
      descriptions: [
        '<span class="num">①</span> 从 0 到 1 搭建在线教育平台前端',
        '<span class="num">②</span> 实现<strong>实时互动课堂</strong>功能，支持万人同时在线',
        '成果：平台上线后 3 个月内用户数达到 <strong>10 万</strong>',
      ],
    },
  ],
  education: [
    {
      school: '北京大学',
      major: '计算机科学与技术',
      startDate: '2015.09',
      endDate: '2019.06',
    },
  ],
};
