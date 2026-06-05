# 项目结构说明

`scripts/` 是该技能的唯一权威模板工程。创建目标项目时，以 `scripts/` 下的实际文件为准，本文件仅用于快速理解目录职责。

```text
project-name/
├── .editorconfig
├── .env.example
├── .gitignore
├── .npmrc
├── .nvmrc
├── .prettierrc.json
├── eslint.config.mjs
├── package.json
├── README.md
├── tsconfig.json
├── resources/
├── src/
│   ├── constants/
│   ├── steps/
│   ├── typings/
│   └── utils/
└── test/
```

## 职责说明

- `src/main.ts`：统一入口，串联环境变量读取、输入处理、转换处理、输出写入和退出码控制
- `src/constants/`：环境变量和运行常量
- `src/steps/`：按步骤拆分脚本流水线，默认包含输入、转换和输出
- `src/utils/`：文件、日志、进程和字符串工具
- `src/typings/`：跨模块复用类型
- `test/`：Node.js 内置测试运行器的测试用例
- `resources/`：本地运行资源占位目录，模板只保留 `.gitkeep`
