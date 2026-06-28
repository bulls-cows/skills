---
name: npm
description: NPM 使用规范
trigger: always_on
alwaysApply: true
---

# NPM 使用规范

## 依赖安装规范

### 正式依赖与开发依赖的区分

**核心要点**：项目运行时需要使用的依赖必须安装为正式依赖（dependencies），不可安装为开发依赖（devDependencies）。

**详细说明**：

- **正式依赖（dependencies）**：项目在生产环境运行时必需的依赖包
- **开发依赖（devDependencies）**：仅在开发、构建、测试过程中需要的依赖包

**安装命令**：

```bash
# 安装为正式依赖（推荐用于运行时依赖）
npm install -S <package-name>
# 或
npm install --save <package-name>

# 安装为开发依赖（仅用于开发工具）
npm install -D <package-name>
# 或
npm install --save-dev <package-name>
```

**判断标准**：

如果满足以下任一条件，应安装为正式依赖：

- 代码中通过 `import` 或 `require()` 引入使用的包
- 应用程序启动时必需的包
- 提供核心业务功能的包
- 在生产环境运行时会被执行的包

仅在以下情况使用开发依赖：

- 构建工具（webpack、vite、typescript 等）
- 测试框架（jest、vitest 等）
- 代码检查工具（eslint、prettier 等）
- 类型定义包（@types/\*，除非项目是发布的 npm 包）

**注意事项**：

- 错误地将运行时依赖安装为开发依赖会导致服务器部署后运行失败
- 部署时通常使用 `npm install --production` 或类似命令，不会安装 devDependencies
- 如果不确定某个依赖是否在运行时使用，优先安装为正式依赖

## 文件修改规范

### 禁止手动修改 package.json 和 package-lock.json

**规则**：增删或更新 npm 依赖时，禁止直接手动修改 `package.json` 和 `package-lock.json`；必须执行 `npm install`、`npm uninstall`、`npm update` 等 npm 命令，由 npm 自动更新相关文件。

**原因**：

- 手动修改可能导致依赖树不一致
- npm 命令会自动处理版本锁定和依赖解析
- 避免因格式错误导致安装失败

### 优先使用 npm 命令修改脚本

**规则**：修改 `package.json` 中的 npm 脚本时，优先使用 `npm pkg set` 等 npm 命令，由 npm 自动更新文件。

**示例**：

```bash
# 设置脚本
npm pkg set scripts.build="tsc && vite build"
npm pkg set scripts.lint="eslint . --ext .ts"

# 删除脚本
npm pkg delete scripts.old-script
```
