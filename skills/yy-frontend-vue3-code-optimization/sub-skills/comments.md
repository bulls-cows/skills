# T02 📝 文档与注释增强（🟢 零风险）

**定位**：🟢 零风险。纯文本添加，只增不改，提升代码可读性与维护性。适用于 `.vue`、`.js`、`.jsx`、`.ts`、`.tsx` 文件。

## 相关规则

执行本任务前，请先阅读以下规则文件（位于 `rules/` 目录），按优先级从高到低排列：

- **`rules/rules.md`**：Vue3 前端项目开发规范总纲（必读）
- **`rules/comments.md`**：模板区/脚本区/样式区注释格式、JSDoc 示例、注释保护原则

## 注释保护原则（核心）

> **已有注释若内容正确或与本次理解相近，禁止改动原有注释。**

注释增强应以**增量补充**为第一原则，仅在以下 **3 种情况**才允许修改原有注释：

| 可修改情况 | 判定标准 | 示例 |
| ---------- | -------- | ---- |
| **注释明显错误** | 注释描述的行为与代码实际行为不一致 | 注释写"获取用户列表"，但实际调用的是 `apiDeleteUser` |
| **业务逻辑已发生实质性变更** | 代码的业务含义已完全不同，旧注释不再适用 | 旧注释"提交订单"，代码已全部改为"提交退款申请" |
| **命名导致注释引用失效** | 注释中引用了已被重命名或删除的标识符 | 注释提到 `oldName`，但变量已更名为 `newName` |

**禁止修改的常见场景**：

- 仅因注释风格不同（如"获取数据" vs "请求用户列表接口"）
- 仅因表述方式有差异但含义一致
- 注释描述正确但不够详细（应在其下方追加补充，而非覆盖）
- 注释中有轻微语法错误但含义清晰的（如错别字但不影响理解）

**修改操作规范**：

- 属于上述 3 种情况的修改，仍应保留原有描述的核心含义，仅在原基础上微调
- 不属于上述情况的，一律**只增不改**——在有注释的代码块附近追加新注释，不触碰旧注释

## JSX/TSX 注释

| 场景     | 注释格式                  | 示例                            |
| -------- | ------------------------- | ------------------------------- |
| 根节点   | `{/* 组件名称 */}`       | `{/* UserCard */}`             |
| 循环节点 | `{/* 循环: 描述 */}`     | `{/* 循环: 用户列表 */}`       |
| 条件分支 | `{/* 条件: 描述 */}`     | `{/* 条件: 有数据时 */}`       |
| 关键区块 | `{/* 区块名称 */}`       | `{/* 操作按钮组 */}`           |

### JSX/TSX 示例

```tsx
// UserCard.tsx
export default defineComponent({
  setup(props) {
    return () => (
      {/* UserCard */}
      <div class="user-card">
        {/* 用户信息区 */}
        <div class="user-card__info">
          <img src={props.avatar} alt="avatar" />
          <span>{props.username}</span>
        </div>

        {/* 条件: 有权限时显示操作按钮 */}
        {props.hasPermission && (
          <div class="user-card__actions">
            {/* 循环: 操作按钮列表 */}
            {props.actions.map((action) => (
              <button key={action.id}>{action.label}</button>
            ))}
          </div>
        )}
      </div>
    );
  },
});
```

## 模板注释

| 场景     | 注释格式                  | 示例                            |
| -------- | ------------------------- | ------------------------------- |
| 根节点   | `<!-- 组件名称 -->`       | `<!-- UserCard -->`             |
| 循环节点 | `<!-- 循环: 描述 -->`     | `<!-- 循环: 用户列表 -->`       |
| 条件分支 | `<!-- 条件: 描述 -->`     | `<!-- 条件: 有数据时 -->`       |
| 关键区块 | `<!-- 区块名称 -->`       | `<!-- 操作按钮组 -->`           |
| 插槽节点 | `<!-- 插槽: name -->`     | `<!-- 插槽: default -->`        |
| 动态组件 | `<!-- 动态组件: 描述 -->` | `<!-- 动态组件: 标签页内容 -->` |

### 模板示例

```html
<template>
  <!-- UserCard -->
  <div class="user-card">
    <!-- 用户信息区 -->
    <div class="user-card__info">
      <img :src="avatar" alt="avatar" />
      <span>{{ username }}</span>
    </div>

    <!-- 条件: 有权限时显示操作按钮 -->
    <div v-if="hasPermission" class="user-card__actions">
      <!-- 循环: 操作按钮列表 -->
      <button v-for="action in actions" :key="action.id">
        {{ action.label }}
      </button>
    </div>

    <!-- 插槽: 默认内容 -->
    <slot name="default"></slot>
  </div>
</template>
```

## 脚本注释

- **JSDoc**：关键方法必填（包含参数、返回值、简要描述）
- **行内注释**：复杂逻辑补充 `// prop名:` / `// 属性名:` / `// computed:` 等说明
- **要求**：中文描述，行内注释 ≤1 行，JSDoc ≤5 行

### `<script setup>` 注释对照表

| 内容         | 注释格式               | 示例                              |
| ------------ | ---------------------- | --------------------------------- |
| Props        | `// prop名: 描述`      | `// userId: 用户ID`               |
| ref          | `// ref名: 描述`       | `// searchQuery: 搜索查询参数`    |
| reactive     | `// reactive名: 描述`  | `// formData: 表单数据`           |
| computed     | `// computed: 描述`    | `// computed: 是否全选`           |
| watch        | `// watch: 描述`       | `// watch: 监听用户输入`          |
| 方法         | `// 方法名: 描述`      | `// handleSubmit: 提交表单`       |
| Hooks        | `// Hook名: 描述`      | `// useTable: 表格逻辑 Hook`      |
| 生命周期     | `// 生命周期名: 描述`  | `// onMounted: 初始化数据`        |

### Props 注释示例

```typescript
<script setup lang="ts">
// Props 定义
const props = defineProps<{
  // userId: 用户ID
  userId: string;
  // isLoading: 加载状态
  isLoading?: boolean;
}>();

// 使用 withDefaults 时
const props = withDefaults(
  defineProps<{
    // pageSize: 分页大小
    pageSize?: number;
  }>(),
  {
    pageSize: 20,
  }
);
</script>
```

### `<script setup>` 区完整示例

```typescript
<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { apiGetUserList } from "@src/api/user";
import type { IUserInfo } from "@src/types/user";

// Props 定义
const props = defineProps<{
  // user: 用户信息
  user: IUserInfo;
}>();

// Emits 定义
const emit = defineEmits<{
  // select: 选中用户
  (e: "select", user: IUserInfo): void;
}>();

// ref: 搜索查询参数
const searchQuery = ref({
  username: "", // 用户名
  email: "", // 邮箱
});

// computed: 是否全选
const isSelected = computed(() => selectedItems.value.length === totalItems.value);

// watch: 监听用户输入变化
watch(
  () => searchQuery.value,
  (newVal) => {
    // 处理搜索关键词变化
  },
  { immediate: true }
);

/**
 * 提交表单
 * @description 提交用户表单数据到服务器
 * @returns {Promise<void>}
 */
const submitForm = async () => {
  // ...
};

/**
 * 获取用户列表
 * @description 从 API 获取用户数据并更新状态
 * @returns {Promise<void>}
 */
const fetchData = async () => {
  // ...
};

// onMounted: 初始化数据
onMounted(() => {
  fetchData();
});
</script>
```

## 关键注释场景映射

| 场景         | 注释方式               |
| ------------ | ---------------------- |
| 接口请求     | JSDoc + 行内说明目的   |
| 复杂判断     | 行内注释说明条件       |
| 特殊业务逻辑 | JSDoc 说明为什么这么做 |
| 兼容处理     | 行内注释说明兼容逻辑   |
| Hooks 使用   | 行内注释说明 Hook 功能 |

## 样式注释

| 场景     | 注释格式              | 示例                    |
| -------- | --------------------- | ----------------------- |
| 模块分组 | `/* 模块名称 */`      | `/* 用户卡片 */`        |
| 子模块   | `/* 模块 > 子模块 */` | `/* 用户卡片 > 头部 */` |
| 响应式   | `/* 响应式 */`        | `/* 响应式 */`          |

### 样式注释示例

```scss
<style scoped>
/* 用户卡片 */
.user-card {
  padding: 16px;
  border-radius: 8px;

  /* 用户卡片 > 头部 */
  .user-card__header {
    font-weight: bold;

    /* 响应式 */
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
}
</style>
```

## TypeScript 类型注释规范

- **类型定义**：使用 `type` 或 `interface` 定义类型，添加 JSDoc 描述
- **导出类型**：必须添加描述性注释

```typescript
// 类型定义示例
/**
 * 用户信息类型
 * @description 包含用户基本信息和状态
 */
interface IUserInfo {
  id: string;
  username: string;
  email: string;
  active: boolean;
}

/**
 * 表格列配置类型
 * @description 定义表格列的显示配置
 */
type ITableColumn = {
  key: string;
  title: string;
  width?: number;
  sortable?: boolean;
};
```
