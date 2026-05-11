# Vue3 指令规范

本规范涵盖 Vue3 指令的使用、排列、简写及安全注意事项。

---

## 一、v-for 与 key

- 在组件上**必须**使用 `key` 属性配合 `v-for`，以维护组件内部状态。
- `key` 必须用唯一 ID，**禁止**使用 `index` 作为 key。

---

## 二、v-if 与 v-for 冲突

- **禁止**将 `v-if` 和 `v-for` 同时用在同一个元素上。

---

## 三、v-html 安全

- 可使用，但**必须**用 DOMPurify 过滤 HTML，防止 XSS 攻击。
- 避免直接操作未过滤的字符串。

---

## 四、指令简写

统一使用指令简写形式，使模板更简洁：

| 指令     | 简写 | 示例                          |
|----------|------|-------------------------------|
| `v-bind` | `:`  | `:class="className"`          |
| `v-on`   | `@`  | `@click="handleClick"`        |
| `v-slot` | `#`  | `#default="{ data }"`         |

---

## 五、模板属性顺序

HTML 元素上的属性顺序应保持统一：

`is` → `v-for` → `v-if/v-else-if/v-else` → `v-show/v-cloak` → `id` → `props/attrs` → `v-on` → `v-html/v-text` → 动态 `v-slot`

---

## 六、v-model 写法

- **Vue 3 标准**：使用 `modelValue` 配合 `emit('update:modelValue')`。
- **Ant Design Vue 风格**：使用 `value` 配合 `emit('update:value')`（即 `v-model:value`）。
