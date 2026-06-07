# 简历编辑器

简历编辑器是一个基于 Vue 3、TypeScript 和 Vite 构建的可视化简历编辑工具，用于快速编辑、预览、导入导出和打印个人简历。

项目面向需要快速生成结构化简历页面的场景，提供多页面布局、区块化编辑、实时预览、本地缓存和 HTML/JSON 导出能力，便于在浏览器中完成简历内容维护。

## 特性

- ⭐ 可视化编辑：通过页面编辑器维护简历区块和内容。
- 🚀 实时预览：编辑内容后即时同步到右侧简历预览区。
- 💡 数据导入导出：支持导入 JSON、导出 JSON 和下载 HTML。
- 🎯 多页简历布局：通过页面和区块配置组织不同简历内容。
- ⚡ 本地缓存：使用 localStorage 保存编辑数据，刷新页面后可恢复。

## 技术栈

- 🖥️ 前端框架：Vue 3
- 🧰 构建工具：Vite
- 🧰 开发语言：TypeScript
- 🧰 样式方案：Sass / SCSS
- 🧰 代码检查：ESLint、Prettier、vue-tsc

## 环境要求

- 📦 Node.js：建议使用 `.nvmrc` 中记录的 `22.18.0`
- 📦 npm：随 Node.js 安装

## 安装

```bash
npm install
```

项目也提供了等价的准备命令：

```bash
npm run ready
```

## 使用方法

启动本地开发服务：

```bash
npm run dev
```

默认开发服务端口为 `5173`，启动后会自动打开浏览器。

常用操作：

- 在页面编辑器中修改简历内容和区块配置。
- 使用工具栏导入 JSON 或导出当前简历数据。
- 下载 HTML 文件或直接打印简历。
- 点击停止服务按钮时，前端会请求 `/__stop-server` 关闭开发服务。

## 构建与预览

构建生产产物：

```bash
npm run build
```

预览构建结果：

```bash
npm run preview
```

## 代码检查

执行完整检查：

```bash
npm run lint
```

该命令会依次执行 Prettier 格式化、ESLint 检查和 TypeScript 类型检查。

## 目录结构

```text
.
├── index.html              # 应用 HTML 入口
├── vite.config.ts          # Vite 配置和停止服务插件
├── src/
│   ├── App.vue             # 应用根组件
│   ├── main.ts             # Vue 应用入口
│   ├── components/         # 编辑器、预览区和工具栏组件
│   ├── data/               # 示例简历数据
│   ├── stores/             # 简历状态管理
│   ├── types/              # 简历与存储类型声明
│   └── utils/              # 导出和本地缓存工具
└── package.json            # 项目脚本和依赖配置
```

## 数据说明

简历数据以 `ResumeData` 结构组织，核心内容包括个人信息、简介、技能、核心能力、法规体系、工作经历、项目经验、教育背景、证书、论文和多页面布局配置。

编辑状态会写入浏览器 localStorage，对应缓存键由 `store.` 前缀和业务键组成。

## 开源协议

📄 本项目随上级仓库发布，协议以 `../../../LICENSE.txt` 为准。
