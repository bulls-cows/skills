export interface Link {
  label: string
  url: string
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface Experience {
  organization: string
  url?: string
  tags?: string[]
  position: string
  startDate: string
  endDate: string
  descriptions: string[]
}

export interface Project {
  name: string
  url?: string
  role: string
  techStack?: string
  submissionType?: string
  toolsMethods?: string
  startDate: string
  endDate: string
  descriptions: string[]
}

export interface Education {
  school: string
  major: string
  startDate: string
  endDate: string
}

export interface Cert {
  name: string
  issuer: string
  year: string
}

export interface Publication {
  title: string
  journal: string
  year: string
  authors: string
}

export interface ResumeData {
  template: string
  name: string
  title: string
  city: string
  phone: string
  email: string
  links?: Link[]
  summary?: string
  skills?: SkillCategory[]
  competencies?: string[]
  regulatorySystems?: SkillCategory[]
  experience?: Experience[]
  projects?: Project[]
  education?: Education[]
  certs?: Cert[]
  publications?: Publication[]
}

export interface SectionConfig {
  id: string
  title?: string
  fields: string[]
  variant?: 'tech' | 'submission' | 'tools'
}

export interface ThemeConfig {
  primary: string
  tagBg: string
  tagBorder: string
}

export interface Profile {
  theme: ThemeConfig
  headerLinks: boolean
  sections: SectionConfig[]
}
