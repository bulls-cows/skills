<template>
  <UiDemoLayout
    title="标签 BaseTag"
    description="用于展示状态、分类和轻量标记，支持默认、主要、成功、警告和危险类型。"
    :usage-code="usageCode"
    :prop-rows="propRows"
    preview-variant="inline"
  >
    <BaseTag>默认</BaseTag>
    <BaseTag type="primary">主要</BaseTag>
    <BaseTag type="success">成功</BaseTag>
    <BaseTag type="warning">警告</BaseTag>
    <BaseTag type="danger">危险</BaseTag>
  </UiDemoLayout>
</template>

<script setup lang="ts">
import BaseTag from "@src/components/BaseTag/BaseTag.vue";
import UiDemoLayout from "./_components/UiDemoLayout.vue";

const usageCode = `<BaseTag>默认</BaseTag>
<BaseTag type="success">成功</BaseTag>
<BaseTag type="danger">危险</BaseTag>`;

const propRows = [
  {
    name: "type",
    description: "标签视觉类型",
    optionalValues: "default / primary / success / warning / danger",
    defaultValue: "default",
  },
];
</script>
