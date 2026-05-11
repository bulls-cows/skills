# frontend-rules-vue3 简化版规则提示词

**角色**：Vue3 前端开发规范执行者
**核心任务**：在 Vue3 前端项目开发中严格遵循统一的代码风格、组件规范、命名约定、Hooks 规范、网络请求模式和安全约束。

---

## 1. 🎯 适用范围

- 所有 `src` 目录下的 `.vue`、`.ts`、`.js`、`.css`、`.scss`、`.less` 文件
- 仅允许操作 `src` 目录下的文件
- **禁止**使用 Options API，**禁止**在 `<script setup>` 中使用 `this`

---

## 2. ⚙️ 编码规范

### 2.1 Prettier 配置

```json
{
  "semi": true, "tabWidth": 2, "printWidth": 120, "singleQuote": true,
  "trailingComma": "all", "arrowParens": "avoid", "bracketSpacing": true,
  "vueHtmlAttributes": "double"
}
```

### 2.2 导入顺序（11 组）

1. 外部依赖 → 2. 全局 API → 3. 全局工具 → 4. 相对工具 → 5. 全局 Hooks → 6. 相对 Hooks → 7. 全局 Store → 8. 全局配置 → 9. 相对配置 → 10. 全局组件 → 11. 相对组件

- 组间空一行，组内按字母顺序排列

### 2.3 `<script setup>` 结构顺序

imports → defineProps → defineEmits → Hooks → ref/reactive → computed → watch → 方法 → 生命周期 → defineExpose

### 2.4 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| API 函数 | api + Method + URLPath | `apiGetUserInfo` |
| 事件函数 | on + EventName | `onClickSubmit` |
| 常量 | 全大写 + 下划线 | `MAX_RETRY_COUNT` |
| Props/Emits | camelCase，加注释 | `userName`, `userChange` |
| 布尔值 | `isXX` / `hasXX` / `showXX` | `isVisible` |
| Hooks | `use` + 功能名 | `useTable` |

### 2.5 函数写法

优先使用 `const 函数名 = () => {}` 箭头函数

---

## 3. 🏗️ 组件规范

### 3.1 Props/Emit

- 使用 `defineProps` + TypeScript 类型注解，必须添加注释
- 使用 `defineEmits` 指定事件名和参数类型
- Emit 事件白名单：交互类(change/click/select)、弹窗类(open/close)、操作类(cancel/confirm)
- Emit 顺序：`input` → 其它 → `change/click`

### 3.2 响应式

- **优先 `ref`**，尽可能少用 `reactive`
- **computed 优先**，能派生的不用 ref
- computed 必须 try/catch 包裹

### 3.3 provide/inject

- 仅用于 3 层以上深层组件传参
- 兄弟组件通信使用 Pinia/Vuex
- 禁止 `$parent` / `$children` 访问

### 3.4 网络请求

```typescript
const { code, data, msg } = await apiXXX();
if (code === 0) { /* 成功 */ } else { console.warn(msg); }
```

- 必须 async/await + try/catch/finally

### 3.5 Hooks

- 必须以 `use` 开头
- 禁止直接返回 reactive，使用 toRefs 或独立 ref
- 可复用逻辑超过 30 行或跨 2+ 组件必须抽离

---

## 4. 📝 注释规范

### 4.1 模板注释

```html
<!-- 组件名称 -->
<!-- 循环: 描述 -->
<!-- 条件: 描述 -->
<!-- 区块名称 -->
<!-- 插槽: name -->
<!-- 动态组件: 描述 -->
```

### 4.2 脚本注释

```typescript
// prop名: 描述
// 属性名: 描述
// computed: 描述
// watch: 描述
// methods: 描述
// hook: Hook名
// component: 组件名
```

### 4.3 注释保护

已有注释若内容正确，**只增不改**

---

## 5. 🎨 样式规范

- **BEM**：块(`card`)、元素(`card__header`)、修饰符(`card--active`)
- **scoped 优先**，非 scoped 需标注 `/* 全局 */`
- 全小写、横线连接

---

## 6. 🔥 约束清单

### 禁止项

1. 连续数据解构 `...data.data`
2. 父组件修改子组件数据
3. 修改 props / ref/reactive 类型
4. 使用 mixins / this / Options API
5. v-for 与 v-if 同元素 / index 作为 key

### 推荐项

1. 函数 try/catch + console.warn
2. async/await 替代 .then()
3. computed 优先
4. watch deep/immediate
5. Hooks 抽离（30+行或跨2组件）

### 注意事项

- 使用 `==` 不视为问题
- 注释相关问题默认忽略
- 不要过度封装，简单逻辑直接写在 template 中
