# 逻辑错误与网络请求规范

## 1. 逻辑错误

### 1.1 空指针引用

- 访问对象属性前检查对象是否存在。
- 可选链 `?.` 或短路 `&&` 用于安全访问。

### 1.2 数组越界

- 访问数组元素前检查索引是否在有效范围内。
- 使用 `arr[index]` 时确保 `index >= 0 && index < arr.length`。

### 1.3 逻辑判断错误

- 条件判断逻辑正确，无遗漏分支。
- `if/else` 覆盖所有预期情况。
- 布尔表达式无冗余或矛盾。

### 1.4 方法内部逻辑顺序

方法内部逻辑应按以下顺序组织：

1. 初始化方法（变量初始化、状态准备）
2. 网络请求（数据获取）
3. 事件处理（交互响应）
4. 特殊计算（数据处理、转换）

## 2. 网络请求规范

### 2.1 必须使用 async/await + try/catch/finally

```js
async function fetchData() {
  try {
    const { code, data, msg } = await apiGetXXX();
    if (code === 0) {
      this.$message.success(msg || '操作成功');
    } else {
      this.$message.error(msg);
    }
  } catch (error) {
    console.warn('请求失败:', error);
  } finally {
    // 清理操作
  }
}
```

### 2.2 禁止多层 try/catch 嵌套

- 异步操作需扁平化处理。
- 避免在 try 块内再嵌套 try/catch。
- 使用 `async/await` 替代 `.then()` 链式调用来降低嵌套深度。

### 2.3 统一响应处理模式

所有网络请求必须遵循统一响应模式：

```js
const { code, data, msg } = await apiXXX();
if (code === 0) {
  this.$message.success(msg || '操作成功');
} else {
  this.$message.error(msg);
}
```

- `code === 0` 表示成功，调用 `this.$message.success()`。
- 非零 `code` 表示失败，调用 `this.$message.error()`。
- `msg` 为空时使用默认文案。

## 3. computed 规范

### 3.1 必须使用 try/catch

所有 `computed` 属性内部必须用 `try/catch` 包裹：

```js
computed: {
  formattedData() {
    try {
      return this.rawData.map(item => item.name);
    } catch (error) {
      console.warn('computed 计算失败:', error);
      return [];
    }
  }
}
```

### 3.2 有意义的命名

computed 名称应清晰表达其含义，常用前缀：

- `is`：布尔状态，如 `isLoading`、`isValid`
- `has`：存在性判断，如 `hasData`、`hasPermission`
- `visible`：可见性，如 `isDialogVisible`
- `formatted` / `parsed`：数据转换，如 `formattedDate`
