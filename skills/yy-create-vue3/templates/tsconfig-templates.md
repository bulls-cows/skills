# TypeScript 配置模板

## tsconfig.json（项目引用入口）

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.node.json"
    },
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.test.json"
    }
  ]
}
```

## tsconfig.app.json（应用代码配置）

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["src/**/*", "src/**/*.vue", "src/typings/**/*.d.ts"],
  "exclude": ["src/**/__tests__/*", "tests/**/*"],
  "compilerOptions": {
    "noUncheckedIndexedAccess": true,
    "verbatimModuleSyntax": false,
    "paths": {
      "@src/*": ["./src/*"]
    },
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo"
  }
}
```

## tsconfig.node.json（Node 端配置）

```json
{
  "extends": "@tsconfig/node24/tsconfig.json",
  "include": [
    "vite.config.*",
    "vitest.config.*",
    "eslint.config.*",
    "scripts/**/*.ts",
    "src/typings/**/*.d.ts"
  ],
  "compilerOptions": {
    "module": "preserve",
    "moduleResolution": "bundler",
    "types": ["node"],
    "noEmit": true,
    "verbatimModuleSyntax": false,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo"
  }
}
```

## tsconfig.test.json（测试配置）

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": [
    "tests/**/*.spec.ts",
    "tests/**/*.test.ts",
    "src/**/*",
    "src/**/*.vue",
    "src/typings/**/*.d.ts"
  ],
  "compilerOptions": {
    "noUncheckedIndexedAccess": true,
    "verbatimModuleSyntax": false,
    "paths": {
      "@src/*": ["./src/*"]
    },
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.test.tsbuildinfo"
  }
}
```

## 关键说明

| 配置项                     | 说明                                |
| -------------------------- | ----------------------------------- |
| `extends`                  | 继承社区标准配置，减少重复声明      |
| `paths`                    | `@src/*` 别名，与 Vite 配置保持一致 |
| `noUncheckedIndexedAccess` | 开启数组/对象索引访问的类型检查     |
| `verbatimModuleSyntax`     | 关闭，保持与 ESLint 兼容            |
| `tsBuildInfoFile`          | 增量构建缓存，加速后续编译          |
