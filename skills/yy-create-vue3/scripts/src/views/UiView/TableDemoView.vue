<template>
  <UiDemoLayout
    title="表格 BaseTable"
    description="用于展示结构化列表数据，支持列宽、对齐、加载态、骨架屏、空状态和自定义表头/单元格。"
    :usage-code="usageCode"
    :prop-rows="propRows"
  >
    <BaseTable :columns="tableColumns" :rows="tableRows" row-key="id">
      <template #header-status="{ column }">{{ column.title }} / 标签</template>
      <template #cell-status="{ value }">
        <BaseTag :type="value === '已上线' ? 'success' : 'warning'">
          {{ value }}
        </BaseTag>
      </template>
    </BaseTable>
  </UiDemoLayout>
</template>

<script setup lang="ts">
import BaseTable from "@src/components/BaseTable/BaseTable.vue";
import BaseTag from "@src/components/BaseTag/BaseTag.vue";
import UiDemoLayout from "./_components/UiDemoLayout.vue";

const tableColumns = [
  {
    key: "name",
    title: "组件",
    width: "1.2rem",
  },
  {
    key: "description",
    title: "说明",
  },
  {
    key: "status",
    title: "状态",
    width: "1rem",
    align: "center" as const,
  },
];

const tableRows = [
  {
    id: 1,
    name: "BaseButton",
    description: "触发即时操作，支持多种视觉层级。",
    status: "已上线",
  },
  {
    id: 2,
    name: "BaseInput",
    description: "收集单行文本，支持标签、提示和错误态。",
    status: "已上线",
  },
  {
    id: 3,
    name: "BaseTable",
    description: "展示结构化数据，支持列配置和插槽扩展。",
    status: "新增",
  },
];

const usageCode = `<BaseTable :columns="tableColumns" :rows="tableRows" row-key="id">
  <template #header-status="{ column }">{{ column.title }} / 标签</template>
  <template #cell-status="{ value }">
    <BaseTag :type="value === '已上线' ? 'success' : 'warning'">
      {{ value }}
    </BaseTag>
  </template>
</BaseTable>`;

const propRows = [
  {
    name: "columns",
    description: "表格列配置",
    optionalValues: "BaseTableColumn[]",
    defaultValue: "必填",
  },
  {
    name: "rows",
    description: "表格行数据",
    optionalValues: "BaseTableRow[]",
    defaultValue: "必填",
  },
  {
    name: "rowKey",
    description: "行唯一标识字段",
    optionalValues: "string / function",
    defaultValue: "空字符串",
  },
  {
    name: "loading",
    description: "是否展示骨架屏加载态",
    optionalValues: "boolean",
    defaultValue: "false",
  },
  {
    name: "skeletonRows",
    description: "加载态骨架屏行数",
    optionalValues: "number",
    defaultValue: "4",
  },
  {
    name: "emptyText",
    description: "空数据提示文案",
    optionalValues: "string",
    defaultValue: "暂无数据",
  },
];
</script>
