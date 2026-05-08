# D05 · 网络请求规范（🟡 中等）

## 必须使用

- `async/await` + `try/catch/finally`

## 禁止

- 多层 try/catch 嵌套，异步操作需扁平化
- 禁止连续解构：禁止 `...data.data` 等连续解构

## 统一响应处理模式

```typescript
const { code, data, msg } = await apiXXX();
if (code === 0) {
  // 处理成功逻辑
} else {
  // 处理失败逻辑
}
```

## Vue3 Composition API 中的使用模式

在 `<script setup>` 中，应将网络请求与响应式状态配合使用：

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { apiGetUserList } from '@src/api/user';

const userList = ref<User[]>([]);
const loading = ref(false);

const fetchUserList = async () => {
  loading.value = true;
  try {
    const { code, data, msg } = await apiGetUserList();
    if (code === 0) {
      userList.value = data;
    } else {
      console.warn('获取用户列表失败:', msg);
    }
  } catch (error) {
    console.error('请求异常:', error);
  } finally {
    loading.value = false;
  }
};
</script>
```

**审核要点**：

- loading 状态管理是否在 try/finally 中正确维护
- catch 中应有错误日志输出
- 响应数据应在 code 判断后再使用，不直接使用 `data`
