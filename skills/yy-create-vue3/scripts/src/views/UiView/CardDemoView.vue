<template>
  <UiDemoLayout
    title="卡片 BaseCard"
    description="用于承载一组信息内容，可作为列表项、说明块或操作区域的基础容器。"
    :usage-code="usageCode"
    :prop-rows="propRows"
    preview-variant="grid"
  >
    <BaseCard title="标准卡片" description="展示标题、描述和默认内容。">
      <p>这里可以放置任意业务内容。</p>
    </BaseCard>
    <BaseCard title="悬浮卡片" description="hoverable 开启后支持悬浮反馈。" hoverable>
      <p>适合可点击列表或入口卡片。</p>
    </BaseCard>
  </UiDemoLayout>
</template>

<script setup lang="ts">
import BaseCard from "@src/components/BaseCard/BaseCard.vue";
import UiDemoLayout from "./_components/UiDemoLayout.vue";

const usageCode = `<BaseCard title="标准卡片" description="展示标题、描述和默认内容。">
  <p>这里可以放置任意业务内容。</p>
</BaseCard>`;

const propRows = [
  {
    name: "title",
    description: "卡片标题",
    optionalValues: "string",
    defaultValue: "空字符串",
  },
  {
    name: "description",
    description: "卡片描述",
    optionalValues: "string",
    defaultValue: "空字符串",
  },
  {
    name: "hoverable",
    description: "是否启用悬浮反馈",
    optionalValues: "boolean",
    defaultValue: "false",
  },
];
</script>
