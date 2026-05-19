# D02 · 最佳实践

**严重程度**：🟢 轻微

---

## 调试代码

清理 `console.log`/`debugger` 等；catch 块中的 `console.warn` 不视为问题。

---

## 样式规范

BEM 命名 + `scoped` 作用域；非 scoped 需标注 `/* 全局 */`。

---

## BEM 命名规则

- **块**：独立模块直接命名（`card`、`form`）
- **元素**：块内子元素用 `__` 连接（`card__title`、`form__input`）
- **修饰符**：状态/样式变体用 `--` 连接（`card--dark`、`card__title--large`）
- 全小写、横线连接、无嵌套、类名唯一不冲突

---

## 未使用变量

需自行清理（ESLint 已关闭检查）。

---

## 函数 try/catch

推荐包裹 computed、函数等，catch 中使用 `console.warn` 打印错误。

---

## Hooks 规范

- 可复用逻辑 >30 行或跨 2+ 组件时，必须抽离为 Hook
- 全局 Hooks 存放在 `@src/hooks/`，局部 Hooks 直接在组件同级目录新建（如 `./useLocalTable.ts`）
- 必须返回对象（推荐 `toRefs` 解构），**禁止直接返回 reactive 对象**
- 禁止将 Hooks 挂载到响应式数据上

---

## Hooks 速查表

| 场景                   | 建议 Hook 名      |
| ---------------------- | ----------------- |
| 表格数据 + 分页 + 加载 | `useTable`        |
| 搜索表单 + 重置 + 查询 | `useSearchForm`   |
| 表单校验逻辑           | `useFormValidate` |
| 弹窗开关 + 状态        | `useDialog`       |
| 文件上传逻辑           | `useUpload`       |
| 权限判断               | `usePermission`   |

---

## 组件拆分

弹窗 → 独立组件，表格/表单 → 与业务逻辑分离（须用户确认后执行）。

---

## defineExpose

明确声明对外暴露的属性和方法。

---

## 组件懒加载

路由和大组件使用 `defineAsyncComponent` 动态导入。

---

## KeepAlive

合理使用 `<KeepAlive>` 页面缓存。

---

## 样式区注释格式

| 场景     | 注释格式              | 示例                    |
| -------- | --------------------- | ----------------------- |
| 模块分组 | `/* 模块名称 */`      | `/* 用户卡片 */`        |
| 子模块   | `/* 模块 > 子模块 */` | `/* 用户卡片 > 头部 */` |
| 响应式   | `/* 响应式 */`        | `/* 响应式 */`          |

---

## CSS 布局推荐

- **定位层级**：`position: relative` 搭配 `z-index: 0` 创建定位上下文，避免子元素 z-index 影响外部
- **padding 方向**：优先使用 `padding-top`、`padding-left`、`padding-right`，避免 `padding-bottom`
- **margin 方向**：优先使用 `margin-bottom`、`margin-left`、`margin-right`，避免 `margin-top`（向下布局更稳定，减少 margin collapse）

---

## CSS 兼容性指南

以下属性存在兼容性风险，需提供降级方案：

| 属性            | 问题                           | 降级方案                            |
| --------------- | ------------------------------ | ----------------------------------- |
| `gap` (Flexbox) | Safari 14.4及以下、IE11 不支持 | margin 负边距                       |
| `aspect-ratio`  | iOS 15.6及以下 Safari 支持不全 | `padding-bottom` 百分比 Hack        |
| `100vh`         | iOS Safari 地址栏导致高度偏差  | JS 动态计算或 `dvh` 单位            |
| `inset`         | 旧浏览器不识别                 | 先写 `top/right/bottom/left` 再覆盖 |
| `will-change`   | 动画结束不重置会占用内存       | 动画结束后设为 `auto`               |

---

## 兼容性开发实践

- 查兼容性：[Can I Use](https://caniuse.com/) 查询属性支持情况
- 自动前缀：配置 Autoprefixer + PostCSS，自动补齐 `-webkit-`、`-ms-` 前缀
- 渐进增强：使用 `@supports` 包裹新属性，不支持浏览器自动忽略
