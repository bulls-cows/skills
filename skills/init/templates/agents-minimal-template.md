# AGENTS.md

## Scope

- 本仓库默认语言: TypeScript
- 允许修改目录: src/, tests/, docs/
- 禁止修改目录: infra/prod/, secrets/

## Quality Gate

- 改动后必须执行:
  - npm run lint
  - npm test

## Delivery Format

- 先给风险摘要，再给修改点，再给测试结果
- 所有文件引用都要带路径和行号

## Project Structure

- 指出项目的目录结构，不要完整列出所有目录和文件，最多4级。
- 重点说明各个文件和目录的作用，尤其是封装公共方法、公共样式、公共请求的文件和目录。
- 对于后端代码，需要指出哪些目录是用于定义接口路由、定义控制器、定义service、定义数据库model的。
