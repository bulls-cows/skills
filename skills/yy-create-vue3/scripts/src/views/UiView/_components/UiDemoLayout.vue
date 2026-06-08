<template>
  <article class="ui-demo">
    <section class="ui-demo__section">
      <h2>{{ title }}</h2>
      <p class="ui-demo__description">{{ description }}</p>
      <div class="ui-demo__preview" :class="previewClassName">
        <slot />
      </div>
    </section>

    <section class="ui-demo__section">
      <h3>使用示例</h3>
      <pre class="ui-demo__code"><code>{{ usageCode }}</code></pre>
    </section>

    <section class="ui-demo__section">
      <h3>参数说明</h3>
      <BaseTable :columns="propColumns" :rows="propRows" row-key="name" />
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BaseTable from "@src/components/BaseTable/BaseTable.vue";

type UiDemoPreviewVariant = "" | "inline" | "grid" | "form";

interface UiDemoPropRow {
  name: string;
  description: string;
  optionalValues: string;
  defaultValue: string;
}

const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
    usageCode: string;
    propRows: UiDemoPropRow[];
    previewVariant?: UiDemoPreviewVariant;
  }>(),
  {
    previewVariant: "",
  },
);

const previewClassName = computed<string>(() => {
  if (!props.previewVariant) {
    return "";
  }

  return `ui-demo__preview--${props.previewVariant}`;
});

const propColumns = [
  {
    key: "name",
    title: "参数",
    width: "0.9rem",
  },
  {
    key: "description",
    title: "说明",
  },
  {
    key: "optionalValues",
    title: "可选值",
  },
  {
    key: "defaultValue",
    title: "默认值",
    width: "0.9rem",
  },
];
</script>

<style scoped lang="scss">
.ui-demo {
  display: grid;
  gap: var(--space-16);

  &__section {
    display: grid;
    gap: var(--space-12);
    padding: var(--space-24);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    box-shadow: var(--shadow-panel);
  }

  &__description {
    color: var(--color-text-muted);
  }

  &__preview {
    padding: var(--space-20);
    border-radius: var(--radius-md);
    background: var(--color-surface-muted);
  }

  &__preview--inline {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-12);
    align-items: center;
  }

  &__preview--grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-16);
  }

  &__preview--form {
    display: grid;
    gap: var(--space-16);
    max-width: 4.8rem;
  }

  &__code {
    overflow: auto;
    padding: var(--space-16);
    border-radius: var(--radius-md);
    color: var(--color-primary-soft);
    background: var(--color-text);
    user-select: text;
  }

  &__code code {
    user-select: text;
  }
}

@media (max-width: 760px) {
  .ui-demo__preview--grid {
    grid-template-columns: 1fr;
  }
}
</style>
