<template>
  <UiDemoLayout
    title="空状态 BaseEmpty"
    description="用于列表、搜索或详情内容为空时给出明确反馈，可通过操作插槽承载下一步动作。"
    :usage-code="usageCode"
    :prop-rows="propRows"
  >
    <BaseEmpty title="暂无搜索结果" description="请更换关键词后重新查询。" icon="?">
      <template #action>
        <BaseButton variant="secondary">重置条件</BaseButton>
      </template>
    </BaseEmpty>
  </UiDemoLayout>
</template>

<script setup lang="ts">
import BaseButton from "@src/components/BaseButton/BaseButton.vue";
import BaseEmpty from "@src/components/BaseEmpty/BaseEmpty.vue";
import UiDemoLayout from "./_components/UiDemoLayout.vue";

const usageCode = `<BaseEmpty title="暂无搜索结果" description="请更换关键词后重新查询。">
  <template #action>
    <BaseButton variant="secondary">重置条件</BaseButton>
  </template>
</BaseEmpty>`;

const propRows = [
  {
    name: "title",
    description: "空状态标题",
    optionalValues: "string",
    defaultValue: "暂无数据",
  },
  {
    name: "description",
    description: "空状态说明",
    optionalValues: "string",
    defaultValue: "当前没有可展示的内容。",
  },
  {
    name: "icon",
    description: "图标文本",
    optionalValues: "string",
    defaultValue: "∅",
  },
];
</script>
