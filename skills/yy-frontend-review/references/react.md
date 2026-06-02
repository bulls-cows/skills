# React 专项审核规则

仅在识别到 React 特征时适用，与通用规则合并使用。

## 严重

- Hooks 规则违反：在条件语句、循环或嵌套函数中调用 Hooks
- 渲染错误：`key` 不稳定（如使用随机值或 `Math.random()`）

## 中等

- 渲染性能：内联函数/对象在渲染中重复创建导致子组件不必要重渲染
- 组件设计缺陷：默认值未通过 `defaultProps` 或参数默认值处理
- Hooks 使用不当：`useEffect` 依赖数组缺失或多余；在渲染阶段触发副作用；`useRef` 滥用替代 `useState`；自定义 Hook 返回值不稳定（每次渲染返回新的引用）
- 生命周期使用不当：`useEffect` 依赖数组配置错误导致无限循环或缺失执行；`useLayoutEffect` 在服务端渲染中未替换为 `useEffect`
- 卸载后状态更新：组件卸载后仍调用 `setState`，缺少 `useEffect` 清理逻辑中的取消机制（如 `AbortController`、标志位）
- Server Components 违规：在 Server Components 中使用了 `useState`、`useEffect` 等客户端 Hook，或访问了浏览器 API（`window`、`document`）
- `React.memo` 误用：对 props 频繁变化或内部状态复杂的组件使用 `React.memo`，记忆化收益低于浅比较开销

## 轻微

- 组件文件命名：组件文件名与默认导出的组件名不一致
- 条件渲染不一致：同一组件内混用 `&&`、三元表达式和 `if/else` 进行条件渲染，缺乏统一风格
- Props 透传：组件接收大量无关 props 直接透传给子组件，应考虑组合模式或 `children` 替代
