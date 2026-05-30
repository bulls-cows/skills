---
name: yy-resume
description: >
  创建 HTML 格式简历，支持多种职业类型模板，支持 A4 纸张打印。用于用户需要生成专业简历时。
---

# yy-resume

## 描述

生成专业 HTML 简历，支持多种职业类型模板，包含技能、经验、教育等字段，支持 A4 纸张完美打印。

## 使用场景

- 用户需要创建或更新简历
- 用户需要生成可打印的 HTML 格式简历
- 用户需要包含专业内容的简历

不应触发：

- 用户只是询问简历格式或写作建议
- 用户只需要简单的文本简历

## 支持的模板类型

- `general`：通用模板，适用不属于以下特定类型的任意职业
- `frontend`：前端开发，适用于前端工程师、Web 开发等
- `backend`：后端开发，适用于后端工程师、服务端开发等
- `fullstack`：全栈开发，适用于全栈工程师、同时涉及前后端等
- `pharma-regulatory`：国际药品注册，适用于药品注册、注册申报、法规事务等
- `bioinformatics`：生物信息学，适用于生信分析、基因组学、生物信息等

## 前提

使用此技能前，需要确保 `scripts/` 目录下的前端项目依赖已安装。如果尚未安装，先执行：

```bash
cd scripts && npm install
```

## 指令

### 步骤 1. 推断或选择简历模板

根据用户输入的内容推断最适合的模板类型。

**推断规则**：

- **frontend**：用户提到 React、Vue、CSS、前端、UI、页面开发等关键词
- **backend**：用户提到 Java、Go、数据库、后端、服务端、API 开发等关键词
- **fullstack**：用户提到全栈、前后端、同时涉及前端和后端等关键词
- **pharma-regulatory**：用户提到药品注册、注册申报、NDA、ANDA、ICH、FDA、EMA、NMPA、法规事务等关键词
- **bioinformatics**：用户提到生物信息、基因组、测序、BLAST、生信、转录组等关键词

**决策分支**：

- **能推断出唯一模板**：使用推断结果，跳过模板选择步骤，告知用户推断结果
- **无法推断**：向用户展示所有模板类型，请用户选择
- **推断出多个可能**：列出候选项，请用户确认

### 步骤 2. 收集简历信息

根据选定的模板类型，向用户收集对应的信息。用户已提供的信息不再重复收集。

#### 通用内容表达能力

所有模板均支持以下丰富的内容表达方式：

1. **HTML 高亮**：使用 `<strong>` 标签标记关键词，如 `负责<strong>核心业务</strong>迭代`
2. **序号列表**：使用 `① ② ③` 序号标记要点，如 `① 负责团队建设 ② 主导技术升级`
3. **链接**：使用 `<a href="URL" target="_blank">文字</a>` 链接公司或项目
4. **公司标签**：在工作经验中可添加标签如 `["上市", "高新"]`

#### 通用模板（general）

1. **基本信息**：姓名、职位、联系方式（电话、邮箱）、所在城市
2. **个人简介**：1-2 段简短的职业介绍
3. **技能**：按类别列出技能（类别由用户自定义）
4. **工作经验**：公司/机构名称、职位、时间区间、工作描述
5. **项目经验**：项目名称、角色、项目描述、成果（可选）
6. **教育背景**：学校、专业、时间区间、学历
7. **其他**：证书、语言能力等（可选）

#### 前端开发（frontend）

1. **基本信息**：姓名、职位、联系方式（电话、邮箱）、所在城市
2. **社交链接**：GitHub、个人博客、作品集等（可选）
3. **个人简介**：1-2 段简短的职业介绍，支持 HTML 高亮 `<strong>` 和序号 `① ② ③`
4. **技能栈**：前端框架、样式/CSS、构建工具、测试、其他
5. **工作经验**：公司名称、公司标签（可选，如 `["上市", "高新"]`）、职位、时间区间、工作描述（包含技术亮点，支持序号列表）
6. **项目经验**：项目名称（可带链接）、角色、技术栈、项目描述、成果，支持图片（可选）
7. **教育背景**：学校、专业、时间区间
8. **其他**：开源贡献等（可选）

#### 后端开发（backend）

1. **基本信息**：姓名、职位、联系方式（电话、邮箱）、所在城市
2. **社交链接**：GitHub、技术博客等（可选）
3. **个人简介**：1-2 段简短的职业介绍，支持 HTML 高亮 `<strong>` 和序号 `① ② ③`
4. **技能栈**：编程语言、框架、数据库、中间件、DevOps 工具
5. **工作经验**：公司名称、公司标签（可选）、职位、时间区间、工作描述（包含技术亮点，支持序号列表）
6. **项目经验**：项目名称（可带链接）、角色、技术栈、项目描述、成果
7. **教育背景**：学校、专业、时间区间
8. **其他**：开源贡献等（可选）

#### 全栈开发（fullstack）

1. **基本信息**：姓名、职位、联系方式（电话、邮箱）、所在城市
2. **社交链接**：GitHub、LinkedIn、个人博客等（可选）
3. **个人简介**：1-2 段简短的职业介绍，支持 HTML 高亮 `<strong>` 和序号 `① ② ③`
4. **技能栈**：前端、后端、数据库、工具
5. **工作经验**：公司名称、公司标签（可选）、职位、时间区间、工作描述（包含技术亮点，支持序号列表）
6. **项目经验**：项目名称（可带链接）、角色、技术栈、项目描述、成果
7. **教育背景**：学校、专业、时间区间
8. **其他**：证书、开源贡献等（可选）

#### 国际药品注册（pharma-regulatory）

1. **基本信息**：姓名、职位、联系方式（电话、邮箱）、所在城市
2. **个人简介**：1-2 段简短的职业介绍，突出注册领域经验，支持 HTML 高亮 `<strong>` 和序号 `① ② ③`
3. **核心能力**：注册策略、申报管理、合规审查、法规解读等
4. **法规体系**：ICH、FDA、EMA、NMPA 等法规体系
5. **工作经验**：公司名称、公司标签（可选）、职位、时间区间、工作描述（突出注册成果和里程碑，支持序号列表）
6. **项目经验**：项目/产品名称（可带链接）、角色、注册类型、描述、成果
7. **教育背景**：学校、专业、时间区间
8. **资质证书**：RAC、GxP 培训等（可选）

#### 生物信息学（bioinformatics）

1. **基本信息**：姓名、职位、联系方式（电话、邮箱）、所在城市
2. **社交链接**：Google Scholar、GitHub、ORCID 等（可选）
3. **个人简介**：1-2 段简短的职业介绍，支持 HTML 高亮 `<strong>` 和序号 `① ② ③`
4. **技术能力**：编程语言、生信工具/流程、统计方法、数据库
5. **研究经历**：机构名称、职位、时间区间、研究方向与成果
6. **项目经验**：项目名称（可带链接）、角色、工具/方法、描述、成果
7. **发表论文**：标题、期刊、年份、作者排名（可选）
8. **教育背景**：学校、专业、时间区间
9. **其他**：学术奖项等（可选）

### 步骤 3. 启动编辑器和准备数据

使用 `scripts/` 目录下的 Vue3 前端项目启动本地开发服务，支持热更新。

#### 数据契约规则

1. **字段来源**：以 `scripts/src/data/profiles.ts` 中当前 profile 的 `fields` 为准
2. **数组字段**：`skills[]{category,items[]}` 表示技能类别数组，`items[]` 表示该类别下的技能项数组
3. **可选字段**：用户未提供可选字段时，删除对应的条件片段，如 links、tags、variant 扩展字段
4. **变体字段**：根据 `section.variant` 渲染对应项目扩展行：
   - `tech`：渲染 `techStack`
   - `submission`：渲染 `submissionType`
   - `tools`：渲染 `toolsMethods`

#### 内容渲染约束

生成的简历 HTML 必须满足以下要求：

1. **HTML 高亮渲染**：用户输入中的 `<strong>` 标签保留为 HTML 内容
2. **序号样式**：`① ② ③` 序号使用 `<span class="num">①</span>` 包裹
3. **公司标签**：公司或机构标签渲染为 `.company-tag`
4. **链接支持**：公司名称、机构名称、项目名称可渲染为可点击链接

#### A4 分页打印约束

1. **章节不被截断**：每个 `section` 使用 `break-inside: avoid`
2. **条目不被截断**：每个经验/项目/教育/证书/论文条目使用 `break-inside: avoid`
3. **标题不孤悬**：`h2` 使用 `break-after: avoid`
4. **分组不被截断**：每个 `.skills-category` 和 `.regulatory-group` 使用 `break-inside: avoid`

### 步骤 4. 启动开发服务并填充数据

#### 启动前端开发服务

根据选定的模板和用户提供的简历信息，生成结构化的简历 JSON 数据，然后执行以下操作：

1. 切换到 `scripts/` 目录：`cd scripts`
2. 启动 Vite 开发服务器：`npm run dev`
3. 开发者工具将自动在浏览器打开 `http://localhost:5173`
4. 编辑器左侧展示 JSON 编辑区，右侧实时预览简历效果

#### 数据填充说明

初始加载时，编辑器会展示示例数据供参考。根据用户提供的信息，将 JSON 编辑器中的示例数据替换为用户的实际信息，主要字段包括：

| 字段路径                                  | 类型   | 说明                                                                              |
| ----------------------------------------- | ------ | --------------------------------------------------------------------------------- |
| `template`                                | string | 模板类型，与 `scripts/src/data/profiles.ts` 中的 key 对应                         |
| `name`, `title`, `city`, `phone`, `email` | string | 基本信息                                                                          |
| `links[]`                                 | array  | 社交链接，含 `label` 和 `url`                                                     |
| `summary`                                 | string | 个人简介（支持 HTML）                                                             |
| `skills[]`                                | array  | 技能类别，含 `category` 和 `items[]`                                              |
| `competencies[]`                          | array  | 核心能力（字符串数组）                                                            |
| `regulatorySystems[]`                     | array  | 法规体系，含 `category` 和 `items[]`                                              |
| `experience[]`                            | array  | 工作经验，含 `organization`, `position`, `startDate`, `endDate`, `descriptions[]` |
| `projects[]`                              | array  | 项目经验，含 `name`, `role`, `startDate`, `endDate`, `descriptions[]`             |
| `education[]`                             | array  | 教育背景，含 `school`, `major`, `startDate`, `endDate`                            |
| `certs[]`                                 | array  | 证书，含 `name`, `issuer`, `year`                                                 |
| `publications[]`                          | array  | 论文，含 `title`, `journal`, `year`, `authors`                                    |

#### 操作按钮说明

1. **下载 JSON**：导出当前编辑的简历数据为 `resume-data.json`
2. **下载简历 HTML**：导出当前简历为独立 HTML 文件 `resume.html`
3. **打印**：调起浏览器打印功能，可选择"另存为 PDF"获得 A4 格式的简历 PDF
4. **停止服务**：终止本地 Vite 开发服务器，释放 5173 端口。编辑完成后务必点击此按钮，避免端口占用累积

## 相关资源

### 前端项目（scripts/）

前端项目是一个独立的 Vue3 + TypeScript + Sass 应用，使用 Vite 构建，支持热更新开发。

**输入**：用户在左侧 JSON 编辑器中编辑简历数据
**处理**：`src/data/profiles.ts` 定义模板配置，`src/types/resume.ts` 定义数据结构
**渲染**：`src/components/sections/*.vue` 将数据渲染为简历 HTML 片段
**输出**：右侧实时预览 + 导出 JSON/HTML/PDF

**项目结构：**

- `scripts/package.json`：前端项目依赖和脚本
- `scripts/vite.config.ts`：Vite 构建配置
- `scripts/src/main.ts`：应用入口
- `scripts/src/App.vue`：根组件
- `scripts/src/types/resume.ts`：简历数据类型定义
- `scripts/src/data/profiles.ts`：职业类型配置和示例数据
- `scripts/src/utils/export.ts`：导出 JSON/HTML/PDF 工具函数
- `scripts/src/styles/`：SCSS 样式文件
- `scripts/src/components/Toolbar.vue`：工具栏组件
- `scripts/src/components/JsonEditor.vue`：JSON 编辑器组件
- `scripts/src/components/ResumePreview.vue`：简历预览组件
- `scripts/src/components/ResumeEditor.vue`：编辑器主布局组件
- `scripts/src/components/sections/`：简历各章节 Vue 组件
  - `ResumeHeader.vue`：简历头部
  - `ResumeSummary.vue`：个人简介
  - `ResumeSkills.vue`：技能列表
  - `ResumeCompetency.vue`：核心能力
  - `ResumeRegulatory.vue`：法规体系
  - `ResumeExperience.vue`：工作经验
  - `ResumeProjects.vue`：项目经验
  - `ResumeEducation.vue`：教育背景
  - `ResumeCerts.vue`：证书资质
  - `ResumePublications.vue`：发表论文

### 模板资源

- `templates/editor.html`：旧版交互式简历编辑器模板（保留兼容）
- `templates/profiles.json`：职业类型配置、主题配置、章节组合和字段契约
- `templates/base.html`：HTML 骨架和通用 CSS 样式
- `templates/sections/`：旧版 HTML 片段模板（保留兼容）
- `examples/input.md`：输入示例
- `examples/resume-data.json`：简历数据示例
