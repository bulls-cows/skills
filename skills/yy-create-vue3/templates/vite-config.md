# Vite 配置引用

## 权威来源

- `../scripts/vite.config.ts`
- `../scripts/vite.shared.ts`

## 使用方式

- `vite.config.ts` 负责基础构建配置、Vue 插件和 `@src` 别名。
- `vite.shared.ts` 负责运行时常量和 `.env` 加载顺序。
- 生成项目时优先复制这两个文件，再按项目名称或环境变量需求做最小调整。

## 关键检查点

- `base` 保持 `./`。
- 路径别名保持 `@src -> ./src`。
- 运行时定义通过 `createRuntimeDefines()` 统一输出，不在多个文件分散声明。
