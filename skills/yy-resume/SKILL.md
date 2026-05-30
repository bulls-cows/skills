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

### 步骤 2. 用户自行编辑简历

用户打开页面后，编辑器左侧为 JSON 编辑区，已包含示例数据供参考：

1. 用户可直接在 JSON 编辑区修改数据，右侧实时预览简历效果
2. 修改 `template` 字段可切换模板类型（如 `frontend`、`fullstack`、`pharma-regulatory` 等）
3. 工具栏包含操作按钮：
   - **下载 JSON**：导出当前简历数据为 `resume-data.json`
   - **下载简历 HTML**：导出当前简历为独立 HTML 文件 `resume.html`
   - **打印**：调起浏览器打印功能，可选择"另存为 PDF"获得 A4 格式的简历 PDF
   - **停止服务**：终止本地 Vite 开发服务器。编辑完成后建议点击，避免端口占用累积

## 相关资源

- `examples/resume-data.json`：简历数据示例
