# D07 · 逻辑错误

**严重程度**：🔴 严重

---

## 空指针

检查未判空的属性访问。

---

## 数组越界

检查未校验长度的数组索引访问。

---

## 逻辑判断错误

检查条件判断逻辑是否正确。

---

## 方法内部逻辑顺序

1. 初始化方法：`const initXxx = () => {}`
2. 网络请求：`const getListData/postFormData = async () => {}`
3. 事件处理：`const onClickXxx/onChangeXxx = async () => {}`
4. 特殊计算：`const computedXxx = () => {}`

---

## ref 访问

必须使用 `.value`。
