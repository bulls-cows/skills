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

### 步骤 1. 启动本地开发服务

1. 进入 `scripts/` 目录并确保依赖已安装，如果尚未安装则执行 `npm install`
2. 使用 Bash 工具在后台启动 Vite 开发服务器：`cd scripts && npm run dev`（使用 `run_in_background: true`）
3. 开发服务器启动后，从控制台输出日志中提取实际可用的访问地址（Vite 会自动输出 `Local: http://localhost:XXXX/` 格式的 URL，端口号可能不是 `5173`）
4. 将提取到的 URL 告知用户，提示用户在浏览器中打开该地址

### 步骤 2. 编辑简历数据

用户打开页面后，编辑器左侧为 JSON 编辑区，已包含示例数据供参考：

1. 用户可直接在 JSON 编辑区修改数据，右侧实时预览简历效果
2. 修改 `template` 字段可切换模板类型（如 `frontend`、`fullstack`、`pharma-regulatory` 等）
3. 工具栏包含操作按钮：
   - **下载 JSON**：导出当前简历数据为 `resume-data.json`
   - **下载简历 HTML**：导出当前简历为独立 HTML 文件 `resume.html`
   - **打印**：调起浏览器打印功能，可选择"另存为 PDF"获得 A4 格式的简历 PDF
   - **停止服务**：终止本地 Vite 开发服务器。编辑完成后建议点击，避免端口占用累积

#### JSON 数据字段参考

| 字段                                      | 说明                                    |
| ----------------------------------------- | --------------------------------------- |
| `template`                                | 模板类型，如 `frontend`、`fullstack` 等 |
| `name`, `title`, `city`, `phone`, `email` | 基本信息                                |
| `links[]`                                 | 社交链接，含 `label` 和 `url`           |
| `summary`                                 | 个人简介（支持 HTML `<strong>` 高亮）   |
| `skills[]{category,items[]}`              | 技能类别                                |
| `experience[]{organization,position,...}` | 工作经验，含 `descriptions[]`           |
| `projects[]{name,role,...}`               | 项目经验                                |
| `education[]{school,major,...}`           | 教育背景                                |
| `certs[]{name,issuer,year}`               | 证书资质                                |
| `publications[]{title,journal,year,...}`  | 发表论文                                |

详细字段契约见 `scripts/src/data/profiles.ts` 中各 profile 的 `fields` 定义。

## 相关资源

### 前端项目（scripts/）

前端项目是一个独立的 Vue3 + TypeScript + Sass 应用，使用 Vite 构建，支持热更新开发。

**输入**：用户在左侧 JSON 编辑器中编辑简历数据
**处理**：`src/data/profiles.ts` 定义模板配置，`src/types/resume.ts` 定义数据结构
**渲染**：`src/components/sections/*.vue` 将数据渲染为简历 HTML 片段
**输出**：右侧实时预览 + 导出 JSON/HTML/PDF

**项目结构：**

- `scripts/`：前端 Vue3 + TypeScript 项目，使用 Vite 构建
  - 入口：`src/main.ts`
  - 模板配置与数据定义：`src/data/profiles.ts`、`src/types/resume.ts`
  - 编辑器组件：`src/components/`
  - 样式文件：`src/styles/`
  - 导出工具：`src/utils/export.ts`
- `examples/`：输入示例和简历数据示例

- `examples/input.md`：输入示例
- `examples/resume-data.json`：简历数据示例
