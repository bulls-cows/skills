<template>
  <div class="base-table">
    <table class="base-table__content">
      <colgroup v-if="columns.length">
        <col v-for="column in columns" :key="column.key" :style="getColumnStyle(column)" />
      </colgroup>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" scope="col">
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody v-if="rows.length">
        <tr v-for="(row, rowIndex) in rows" :key="getRowKey(row, rowIndex)">
          <td v-for="column in columns" :key="column.key">
            <slot
              :name="`cell-${column.key}`"
              :column="column"
              :row="row"
              :value="getCellValue(row, column.key)"
            >
              {{ formatCellValue(getCellValue(row, column.key)) }}
            </slot>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="base-table__empty" :colspan="columns.length || 1">
            {{ emptyText }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
type BaseTableCellValue = unknown;

interface BaseTableColumn {
  key: string;
  title: string;
  width?: string;
}

const props = withDefaults(
  defineProps<{
    columns: BaseTableColumn[];
    rows: object[];
    rowKey?: string;
    emptyText?: string;
  }>(),
  {
    rowKey: "",
    emptyText: "暂无数据",
  },
);

const getColumnStyle = (column: BaseTableColumn): Record<string, string> => {
  if (!column.width) {
    return {};
  }

  return {
    width: column.width,
  };
};

const getCellValue = (row: object, key: string): BaseTableCellValue => {
  return (row as Record<string, BaseTableCellValue>)[key];
};

const getRowKey = (row: object, rowIndex: number): number | string => {
  const rowKeyValue = props.rowKey ? getCellValue(row, props.rowKey) : undefined;

  if (rowKeyValue !== undefined) {
    return String(rowKeyValue);
  }

  return String(getCellValue(row, "id") ?? rowIndex);
};

const formatCellValue = (value: BaseTableCellValue): string => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (typeof value === "boolean") {
    return value ? "是" : "否";
  }

  return String(value);
};
</script>

<style scoped lang="scss">
.base-table {
  overflow: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);

  &__content {
    width: 100%;
    min-width: 6.4rem;
    border-collapse: collapse;
  }

  th,
  td {
    padding: var(--space-8) var(--space-12);
    border-bottom: 1px solid var(--color-border);
    text-align: left;
    vertical-align: top;
  }

  th {
    color: var(--color-text);
    font-weight: 900;
    background: var(--color-surface-muted);
  }

  tr:last-child td {
    border-bottom: none;
  }

  &__empty {
    color: var(--color-text-muted);
    text-align: center;
  }
}
</style>
