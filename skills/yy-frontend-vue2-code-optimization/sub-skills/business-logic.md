# 🔍 业务逻辑梳理（🟢零风险 · 仅 .vue）

**定位**：🟢 零风险。**仅对 `.vue` 文件生效**。纯文本分析，不改变原有运行逻辑。

**目标**：读取 `.vue` 文件内容，理解其业务职责、数据流和交互关系，生成结构化业务说明，插入到 `<script>` 标签的最顶部。

---

## 分析维度

1. **组件职责**：该组件负责什么业务？属于页面级/弹窗级/表单级/独立模块级？
2. **数据流向**：
   - **数据来源**：props 传入、API 请求、Store 注入、本地 data 初始化
   - **数据去向**：emit 传递给父组件、作为参数调用下一个 API
3. **交互关系**：
   - **父→子**：通过哪些 props 接收数据？
   - **子→父**：通过哪些 emit 传递事件？
   - **外部依赖**：使用了哪些 API 接口？引入了哪些第三方组件？
4. **核心业务流程**：关键方法的执行时序（如 init → getList → computed 派生 → 用户操作触发）

---

## 输出格式

在 `<script>` 标签顶部生成以下注释结构（**每次改动都必须包含改动时间和改动内容**）：

```javascript
/**
 * 改动时间: YYYY-MM-DD
 * 改动内容: 生成首次业务逻辑说明 / 更新业务逻辑（新增 API 调用、修改数据流向）
 *
 * ---
 *
 * 组件名称
 * @description 组件职责简述
 * @description 核心业务流程
 *
 * 数据来源:
 * - props: 父组件传入的 XXX
 * - API: xxx 接口获取的 XXX
 * - data: 本地初始化状态 XXX
 *
 * 交互关系:
 * - 接收 props: userName, userInfo
 * - emit 事件: onClickSubmit, onChangeInput
 * - 依赖组件: <DataTable />, <SearchBar />
 */
```

---

## 多次改动示例

```javascript
/**
 * 改动时间: 2026-04-30
 * 改动内容: 优化 computed 优先策略 - 将 getListData 结果派生逻辑从 watch 移至 computed
 *
 * ---
 *
 * 改动时间: 2026-04-28
 * 改动内容: 新增 API 调用 apiExportReport，数据流向增加导出报表接口
 *
 * ---
 *
 * 改动时间: 2026-04-25
 * 改动内容: 生成首次业务逻辑说明
 *
 * ---
 *
 * UserListPage
 * @description 用户列表管理页面，负责数据查询、列表展示、批量操作与导出报表
 * @description 核心业务流程: init → 请求用户列表 → computed 派生分页数据 → 用户操作触发
 *
 * 数据来源:
 * - props: pageSize (分页大小，默认 20)
 * - API: apiGetUserList 接口获取用户列表数据
 * - data: searchQuery (查询条件)、tableData (列表数据)、loading (加载状态)
 *
 * 交互关系:
 * - 接收 props: pageSize, defaultActiveTab
 * - emit 事件: onUserSelect, onChangePage, onExportReport
 * - 依赖组件: <DataTable />, <SearchBar />, <Pagination />
 */
```

---

## 注意事项

- 仅梳理业务逻辑，不修改任何原有代码
- **每次改动必须填写 `改动时间` 和 `改动内容`**，用于追踪业务逻辑变更历史
- 若组件已有同类注释，**追加新记录而非覆盖**，采用倒序排列（最新改动在最上方）
