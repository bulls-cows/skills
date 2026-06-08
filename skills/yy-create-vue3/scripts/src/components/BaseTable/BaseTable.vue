<template>
  <div class="base-table">
    <table class="base-table__content">
      <colgroup v-if="columns.length">
        <col v-for="column in columns" :key="column.key" :style="getColumnStyle(column)" />
      </colgroup>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="`base-table__cell--${column.align ?? 'left'}`"
            scope="col"
          >
            <slot :name="`header-${column.key}`" :column="column">
              {{ column.title }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody v-if="loading">
        <tr v-for="rowIndex in skeletonRows" :key="rowIndex">
          <td
            v-for="column in columns"
            :key="column.key"
            :class="`base-table__cell--${column.align ?? 'left'}`"
          >
            <slot :name="`skeleton-${column.key}`" :column="column">
              <span class="base-table__skeleton" />
            </slot>
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="rows.length">
        <tr v-for="(row, rowIndex) in rows" :key="getRowKey(row, rowIndex)">
          <td
            v-for="column in columns"
            :key="column.key"
            :class="`base-table__cell--${column.align ?? 'left'}`"
          >
            <slot
              :name="`cell-${column.key}`"
              :column="column"
              :row="row"
              :row-index="rowIndex"
              :value="getCellValue(row, column.key)"
            >
              {{ formatCellValue(resolveCellValue(row, column, rowIndex)) }}
            </slot>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="base-table__empty" :colspan="columns.length || 1">
            <slot name="empty">
              {{ emptyText }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
type BaseTableCellValue = unknown;
type BaseTableRow = object;

interface BaseTableColumn {
  key: string;
  title: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (row: BaseTableRow, rowIndex: number) => BaseTableCellValue;
}

const props = withDefaults(
  defineProps<{
    columns: BaseTableColumn[];
    rows: BaseTableRow[];
    rowKey?: string | ((row: BaseTableRow) => string);
    emptyText?: string;
    loading?: boolean;
    skeletonRows?: number;
  }>(),
  {
    rowKey: "",
    emptyText: "暂无数据",
    loading: false,
    skeletonRows: 4,
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

const getCellValue = (row: BaseTableRow, key: string): BaseTableCellValue => {
  return (row as Record<string, BaseTableCellValue>)[key];
};

const getRowKey = (row: BaseTableRow, rowIndex: number): string => {
  if (typeof props.rowKey === "function") {
    return props.rowKey(row);
  }

  const rowKeyValue = props.rowKey ? getCellValue(row, props.rowKey) : undefined;

  if (rowKeyValue !== undefined) {
    return String(rowKeyValue);
  }

  return String(getCellValue(row, "id") ?? rowIndex);
};

const resolveCellValue = (
  row: BaseTableRow,
  column: BaseTableColumn,
  rowIndex: number,
): BaseTableCellValue => {
  if (column.render) {
    return column.render(row, rowIndex);
  }

  return getCellValue(row, column.key);
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

  &__cell--left {
    text-align: left;
  }

  &__cell--center {
    text-align: center;
  }

  &__cell--right {
    text-align: right;
  }

  &__skeleton {
    display: block;
    width: 100%;
    height: 0.18rem;
    border-radius: var(--radius-xs);
    background: linear-gradient(
      90deg,
      var(--color-surface-muted),
      rgba(255, 255, 255, 0.72),
      var(--color-surface-muted)
    );
    background-size: 200% 100%;
    animation: base-table-skeleton 1.2s ease-in-out infinite;
  }
}

@keyframes base-table-skeleton {
  to {
    background-position: -200% 0;
  }
}
</style>
