<template>
  <UiDemoLayout
    title="按钮 BaseButton"
    description="用于触发即时操作，支持多种视觉层级、尺寸、图标、加载态、禁用态和块级展示。"
    :usage-code="usageCode"
    :prop-rows="propRows"
    preview-variant="inline"
  >
    <BaseButton>主要按钮</BaseButton>
    <BaseButton variant="secondary">次要按钮</BaseButton>
    <BaseButton variant="danger">危险按钮</BaseButton>
    <BaseButton variant="ghost">幽灵按钮</BaseButton>
    <BaseButton size="small" icon="+">小尺寸</BaseButton>
    <BaseButton loading>加载中</BaseButton>
    <BaseButton disabled>禁用按钮</BaseButton>
  </UiDemoLayout>
</template>

<script setup lang="ts">
import BaseButton from "@src/components/BaseButton/BaseButton.vue";
import UiDemoLayout from "./_components/UiDemoLayout.vue";

const usageCode = `<BaseButton>主要按钮</BaseButton>
<BaseButton variant="secondary">次要按钮</BaseButton>
<BaseButton variant="danger" :disabled="isSubmitting">删除</BaseButton>
<BaseButton icon="+" size="small">新增</BaseButton>
<BaseButton loading>提交中</BaseButton>`;

const propRows = [
  {
    name: "variant",
    description: "按钮视觉类型",
    optionalValues: "primary / secondary / ghost / danger / text",
    defaultValue: "primary",
  },
  {
    name: "size",
    description: "按钮尺寸",
    optionalValues: "small / medium / large",
    defaultValue: "medium",
  },
  {
    name: "loading",
    description: "是否展示加载态，加载时不触发点击事件",
    optionalValues: "boolean",
    defaultValue: "false",
  },
  {
    name: "icon",
    description: "按钮图标文本，也可通过 icon 插槽自定义",
    optionalValues: "string",
    defaultValue: "空字符串",
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
