<template>
  <UiDemoLayout
    title="结果展示 BaseResult"
    description="用于展示操作完成后的状态反馈，支持状态、标题、描述、图标插槽和操作区。"
    :usage-code="usageCode"
    :prop-rows="propRows"
    preview-variant="grid"
  >
    <BaseResult
      status="success"
      :title="t('result.success')"
      description="示例流程已完成，可继续执行下一步。"
    >
      <template #actions>
        <BaseButton size="small">继续</BaseButton>
      </template>
    </BaseResult>
    <BaseResult
      status="warning"
      :title="t('result.warning')"
      description="当前信息需要确认后再继续。"
    />
    <BaseResult
      status="error"
      :title="t('result.error')"
      description="示例流程执行失败，请检查输入后重试。"
    />
    <BaseResult status="info" :title="t('result.info')" description="这里展示一条通用提示信息。" />
  </UiDemoLayout>
</template>

<script setup lang="ts">
import BaseButton from "@src/components/BaseButton/BaseButton.vue";
import BaseResult from "@src/components/BaseResult/BaseResult.vue";
import { t } from "@src/i18n";
import UiDemoLayout from "./_components/UiDemoLayout.vue";

const usageCode = `<BaseResult
  status="success"
  title="操作成功"
  description="示例流程已完成，可继续执行下一步。"
>
  <template #actions>
    <BaseButton size="small">继续</BaseButton>
  </template>
</BaseResult>`;

const propRows = [
  {
    name: "status",
    description: "结果状态",
    optionalValues: "success / error / warning / info",
    defaultValue: "info",
  },
  {
    name: "title",
    description: "结果标题，未传入时使用状态默认标题",
    optionalValues: "string",
    defaultValue: "空字符串",
  },
  {
    name: "description",
    description: "结果描述",
    optionalValues: "string",
    defaultValue: "空字符串",
  },
  {
    name: "actions",
    description: "操作区插槽",
    optionalValues: "slot",
    defaultValue: "无",
  },
];
</script>
