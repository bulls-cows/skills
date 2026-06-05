# node-script-template

这是一个脱敏的 Node.js + TypeScript 脚本模板项目，用于快速创建命令行脚本、批处理脚本或文件处理流水线。

## 技术栈

- Node.js
- TypeScript
- ESLint
- Prettier
- Node.js 内置测试运行器

## 目录结构

```text
node-script-template/
├── src/
│   ├── constants/
│   ├── steps/
│   ├── typings/
│   └── utils/
└── test/
```

## 使用方式

```bash
npm install
npm run start:example
```

## 环境变量

- `INPUT_FILE`：输入 JSON 文件路径
- `OUTPUT_FILE`：输出 JSON 文件路径
- `DEBUG`：是否输出调试日志，`1` 表示开启

## 验证命令

```bash
npm run typecheck
npm test
npm run lint
```

## 脱敏说明

模板不包含真实业务资源、日志、密钥、可执行程序和运行数据。真实参数应通过目标项目的运行环境自行配置。
