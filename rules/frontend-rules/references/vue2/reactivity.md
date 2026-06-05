---
title: Vue2 响应式陷阱
version: 2.0.0
lastUpdated: 2026-06-03
priority: 🔴 基础规范（强制执行）
maintainer: bulls-cows team
---

# Vue2 响应式陷阱

Vue2 使用 `Object.defineProperty` 实现响应式，以下场景必须使用 `$set` 或替代方案，否则新增属性或数组索引赋值不会触发视图更新。

---

## 一、新增对象属性

直接使用普通赋值给对象新增属性，Vue2 无法追踪该属性的变化。

| 场景         | 错误写法                | 正确写法                             |
| ------------ | ----------------------- | ------------------------------------ |
| 新增对象属性 | `this.obj.newKey = val` | `this.$set(this.obj, 'newKey', val)` |

```javascript
export default {
  data() {
    return {
      user: {
        name: '张三',
      },
    }
  },
  methods: {
    updateUser() {
      // ❌ 错误：不会触发视图更新
      this.user.age = 25

      // ✅ 正确：使用 $set
      this.$set(this.user, 'age', 25)
    },
  },
}
```

---

## 二、数组索引赋值

直接通过索引修改数组元素，Vue2 无法检测到变化。

| 场景         | 错误写法            | 正确写法                      |
| ------------ | ------------------- | ----------------------------- |
| 数组索引赋值 | `this.arr[i] = val` | `this.$set(this.arr, i, val)` |

```javascript
export default {
  data() {
    return {
      list: ['a', 'b', 'c'],
    }
  },
  methods: {
    updateItem() {
      // ❌ 错误：不会触发视图更新
      this.list[1] = 'updated'

      // ✅ 正确：使用 $set
      this.$set(this.list, 1, 'updated')
    },
  },
}
```

---

## 三、数组长度修改

直接修改数组的 `length` 属性不会触发视图更新，应使用 `splice` 方法。

| 场景         | 错误写法              | 正确写法             |
| ------------ | --------------------- | -------------------- |
| 数组长度修改 | `this.arr.length = n` | `this.arr.splice(n)` |

```javascript
export default {
  data() {
    return {
      list: ['a', 'b', 'c', 'd', 'e'],
    }
  },
  methods: {
    trimList() {
      // ❌ 错误：不会触发视图更新
      this.list.length = 3

      // ✅ 正确：使用 splice
      this.list.splice(3)
    },
  },
}
```

---

## 四、速查表

| 场景         | 错误写法                | 正确写法                             |
| ------------ | ----------------------- | ------------------------------------ |
| 新增对象属性 | `this.obj.newKey = val` | `this.$set(this.obj, 'newKey', val)` |
| 数组索引赋值 | `this.arr[i] = val`     | `this.$set(this.arr, i, val)`        |
| 数组长度修改 | `this.arr.length = n`   | `this.arr.splice(n)`                 |
