# TypeScript 专项审核规则

仅在识别到 TypeScript 特征时适用，与通用规则合并使用。

## 严重

- 类型安全绕过：`as any` 或双重断言（`as unknown as T`）绕过类型检查，可能导致运行时类型错误
- 错误压制：`@ts-ignore` 或 `@ts-expect-error` 压制了真正的类型错误，且未附带修复说明或 issue 链接

## 中等

- 非必要 `any`：能用更具体类型替代时仍使用 `any`（如已知的 API 响应结构、事件对象类型）
- 类型断言滥用：应使用类型守卫（`typeof`、`instanceof`、`in`）收窄类型时却使用 `as` 断言
- 缺少类型声明：导出函数缺少参数类型或返回类型；组件 Props 缺少 TypeScript 接口定义（Vue3 未使用 `defineProps<T>()`，React 未定义 Props interface）
- 枚举与常量：使用 `enum` 而非联合类型或 `as const` 对象（或反之，取决于项目约定）

## 轻微

- 类型导入：未使用 `import type` 导入纯类型，可能导致不必要的运行时引用
- 未使用的类型声明：已定义但未引用的 interface 或 type
