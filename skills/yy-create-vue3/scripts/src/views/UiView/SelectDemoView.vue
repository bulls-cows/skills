<template>
  <UiDemoLayout
    title="选择器 BaseSelect"
    description="用于从有限选项中选择一个值，支持 v-model、占位文本、禁用选项和清空操作。"
    :usage-code="usageCode"
    :prop-rows="propRows"
    preview-variant="form"
  >
    <BaseSelect
      v-model="selectedStatus"
      clearable
      label="状态"
      :options="statusOptions"
      placeholder="请选择状态"
    />
    <BaseSelect
      v-model="selectedPriority"
      label="优先级"
      :options="priorityOptions"
      placeholder="请选择优先级"
    />
  </UiDemoLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";

import BaseSelect from "@src/components/BaseSelect/BaseSelect.vue";
import UiDemoLayout from "./_components/UiDemoLayout.vue";

const selectedStatus = ref<string | number | null>("enabled");
const selectedPriority = ref<string | number | null>(null);

const statusOptions = [
  {
    label: "启用",
    value: "enabled",
  },
  {
    label: "停用",
    value: "disabled",
  },
  {
    label: "维护中",
    value: "maintenance",
    disabled: true,
  },
];

const priorityOptions = [
  {
    label: "低",
    value: 1,
  },
  {
    label: "中",
    value: 2,
  },
  {
    label: "高",
    value: 3,
  },
];

const usageCode = `<BaseSelect
  v-model="selectedStatus"
  clearable
  label="状态"
  :options="statusOptions"
  placeholder="请选择状态"
/>`;

const propRows = [
  {
    name: "v-model",
    description: "当前选中的值",
    optionalValues: "string / number / null",
    defaultValue: "null",
  },
  {
    name: "options",
    description: "选项列表，支持 label、value、disabled",
    optionalValues: "BaseSelectOption[]",
    defaultValue: "空数组",
  },
  {
    name: "placeholder",
    description: "未选择时展示的占位文本",
    optionalValues: "string",
    defaultValue: "请选择",
  },
  {
    name: "clearable",
    description: "是否允许清空选中值",
    optionalValues: "boolean",
    defaultValue: "false",
  },
];
</script>
