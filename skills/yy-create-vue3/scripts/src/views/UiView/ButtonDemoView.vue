<template>
  <UiDemoLayout
    title="按钮 BaseButton"
    description="用于触发即时操作，支持多种视觉层级、禁用态和块级展示。"
    :usage-code="usageCode"
    :prop-rows="propRows"
    preview-variant="inline"
  >
    <BaseButton>主要按钮</BaseButton>
    <BaseButton variant="secondary">次要按钮</BaseButton>
    <BaseButton variant="danger">危险按钮</BaseButton>
    <BaseButton variant="text">文本按钮</BaseButton>
    <BaseButton disabled>禁用按钮</BaseButton>
  </UiDemoLayout>
</template>

<script setup lang="ts">
import BaseButton from "@src/components/BaseButton/BaseButton.vue";
import UiDemoLayout from "./_components/UiDemoLayout.vue";

const usageCode = `<BaseButton>主要按钮</BaseButton>
<BaseButton variant="secondary">次要按钮</BaseButton>
<BaseButton variant="danger" :disabled="isSubmitting">删除</BaseButton>`;

const propRows = [
  {
    name: "variant",
    description: "按钮视觉类型",
    optionalValues: "primary / secondary / danger / text",
    defaultValue: "primary",
  },
  {
    name: "disabled",
    description: "是否禁用按钮",
    optionalValues: "boolean",
    defaultValue: "false",
  },
  {
    name: "block",
    description: "是否撑满父容器宽度",
    optionalValues: "boolean",
    defaultValue: "false",
  },
];
</script>
