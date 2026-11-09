import fs from 'fs'

const ignoredSkills = [
  'yy-frontend-change-log',
  'yy-frontend-code-refine',
  'yy-frontend-refactor-scaffold',
  'yy-frontend-review',
  'yy-frontend-style-bem-optimizer',
  'yy-anti-distill',
]

fs.writeFileSync(
  new URL('../.skillignore', import.meta.url),
  ['# 忽略安装特定技能，一行一个技能名', ...ignoredSkills, ''].join('\n'),
)

fs.writeFileSync(new URL('../.agentsconfig', import.meta.url), 'opencode\n')
