# 输出示例：monorepo 局部阅读

本文档展示 `yy-read-project` 在 monorepo 局部阅读场景下的预期输出结构。

## 示例 1：`apps/admin` 子项目局部阅读

```markdown
## 一句话定位

这是一个前后端协作的 pnpm monorepo，`apps/admin` 是面向运营或内部管理人员的前端应用，依赖共享 UI、共享契约和后端服务完成业务操作。

## 当前阅读范围

- **阅读模式**：局部阅读
- **目标对象**：`apps/admin`
- **范围说明**：
  - **事实**：本次重点检查了根级 workspace 配置、`apps/admin/`、它直接依赖的 `packages/ui` 与 `packages/contracts`，以及对应服务入口。
  - **推断**：这些位置足以说明 `apps/admin` 的仓库定位、直接上下游和主通信链路。
  - **未确认项**：未逐个展开与 `apps/admin` 无直接关系的工具型子项目。
  - **依据位置**：`pnpm-workspace.yaml`、`apps/admin/package.json`、`packages/contracts/`

## 项目形态

- **项目类型**：monorepo
- **组织方式**：pnpm monorepo
- **主语言栈**：混合
- **根级关键文件**：`pnpm-workspace.yaml`、`package.json`、`apps/admin/package.json`、`packages/contracts/package.json`
- **整体结构判断**：
  - **事实**：仓库按 `apps/`、`packages/`、`services/` 分层。
  - **推断**：`apps/admin` 位于应用层，`packages/contracts` 位于共享契约层。
  - **未确认项**：是否还有未被 `workspace` 纳管的外部服务仓库。
  - **依据位置**：workspace 配置、目录分组

## 结构职责

### monorepo 项目

| 子项目/目录          | 类型    | 主要职责                    | 关键依赖或上下游                         |
| -------------------- | ------- | --------------------------- | ---------------------------------------- |
| `apps/admin`         | app     | 管理后台界面与页面流程      | 依赖 `packages/ui`、`packages/contracts` |
| `packages/ui`        | package | 共享组件与视觉规范          | 被 `apps/admin` 消费                     |
| `packages/contracts` | package | 共享类型、接口契约或 schema | 被前端应用和后端服务共同消费             |
| `services/api`       | service | 提供后台接口                | 消费或实现 `packages/contracts`          |

- **结构补充判断**：
  - **事实**：本次只展开了目标子项目、直接上下游和最小全局组织信息。
  - **推断**：`apps/admin` 处在一条“应用层 -> 共享契约层 -> 服务层”的主链路上。
  - **未确认项**：是否还有中间 BFF 或网关层未被当前范围覆盖。
  - **依据位置**：子项目 manifest、目录分组、依赖声明

## 全局关系

- **独立项目**：不适用
- **monorepo**：`apps/admin` 通过共享 UI 和共享契约接入后端服务，仓库其余子项目可能围绕其他端、工具链或基础设施展开。
- **关系判断**：
  - **事实**：目标子项目直接依赖共享包，后端服务与共享契约层形成上下游。
  - **推断**：共享契约层承担了跨端稳定接口的职责。
  - **未确认项**：是否所有服务都严格实现同一套 contracts。
  - **依据位置**：`package.json` 依赖、服务入口、contracts 定义目录

## 技术栈边界

- **编程语言与运行时**：TypeScript 前端应用 + Node.js 服务端，可能伴随代码生成工具
- **职责分工**：`apps/admin` 负责交互界面，`packages/contracts` 负责共享契约，`services/api` 负责运行时业务处理。
- **技术栈判断**：
  - **事实**：前端应用与共享包采用同一 JS/TS 工具链，服务端作为独立运行时存在。
  - **推断**：共享契约可能被用作类型约束或接口生成输入。
  - **未确认项**：是否还有 Rust、Go 等非 JS 子工程参与主链路。
  - **依据位置**：workspace 配置、各子项目 manifest、构建脚本

## 本地化方案

- **是否存在系统化 i18n**：待确认
- **入口与资源位置**：当前局部阅读未在 `apps/admin` 直接依赖链上发现明确结论
- **切换与加载方式**：待确认
- **文案归属边界**：更可能由应用层定义和消费，`packages/contracts` 不应承载界面翻译资源
- **本地化判断**：
  - **事实**：本次范围内没有足够证据证明存在完整 i18n 框架。
  - **推断**：若存在本地化能力，入口更可能位于 `apps/admin` 自身而不是 contracts 包。
  - **未确认项**：默认语言、语言包目录和格式化策略。
  - **依据位置**：`apps/admin/`、`packages/contracts/`

## 依赖与通信

### 共享契约或共享代码

- `packages/ui` 提供共享组件。
- `packages/contracts` 提供前后端共用的接口契约、类型或 schema。

### 运行时通信

- `apps/admin` 通过 HTTP 或 RPC 调用 `services/api`。
- `services/api` 以 `packages/contracts` 为输入或约束，向前端暴露稳定接口。

- **通信判断**：
  - **事实**：存在工作区内源码级依赖，也存在应用到服务的运行时通信。
  - **推断**：contracts 位于源码复用和运行时边界之间，承担“共享契约层”角色。
  - **未确认项**：是否存在网关、BFF、消息队列等额外通信层。
  - **依据位置**：依赖声明、接口目录、服务入口文件

## 推荐阅读顺序

1. `pnpm-workspace.yaml`
2. `apps/admin/package.json`
3. `packages/contracts` 的入口或 schema 定义
4. `services/api` 的路由或控制器入口

## 未确认项

- `apps/admin` 是否还依赖其他共享状态管理包
- `packages/contracts` 是手写维护还是由 OpenAPI / schema 生成
```
