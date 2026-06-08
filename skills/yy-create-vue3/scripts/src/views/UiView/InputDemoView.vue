<template>
  <UiDemoLayout
    title="输入框 BaseInput"
    description="用于收集单行文本，内置标签、辅助说明、错误提示和 v-model 双向绑定。"
    :usage-code="usageCode"
    :prop-rows="propRows"
    preview-variant="form"
  >
    <BaseInput
      v-model="username"
      label="用户名"
      placeholder="请输入用户名"
      description="支持 2-20 个字符"
    />
    <BaseInput
      v-model="email"
      label="邮箱"
      placeholder="请输入邮箱"
      error="邮箱格式不正确"
      type="email"
    />
  </UiDemoLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "@src/components/BaseInput/BaseInput.vue";
import UiDemoLayout from "./_components/UiDemoLayout.vue";

const username = ref("zhangsan");
const email = ref("demo@example");
const usageCode = `<BaseInput v-model="username" label="用户名" placeholder="请输入用户名" />
<BaseInput v-model="email" label="邮箱" error="邮箱格式不正确" type="email" />`;

const propRows = [
  {
    name: "v-model",
    description: "输入框绑定值",
    optionalValues: "string",
    defaultValue: "空字符串",
  },
  {
    name: "label",
    description: "输入框标题",
    optionalValues: "string",
    defaultValue: "空字符串",
  },
  {
    name: "error",
    description: "错误提示文案",
    optionalValues: "string",
    defaultValue: "空字符串",
  },
];
</script>
