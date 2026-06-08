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
      <div class="ui-demo__table">
        <div>参数</div>
        <div>说明</div>
        <div>可选值</div>
        <div>默认值</div>
        <template v-for="row in propRows" :key="row.name">
          <div>{{ row.name }}</div>
          <div>{{ row.description }}</div>
          <div>{{ row.optionalValues }}</div>
          <div>{{ row.defaultValue }}</div>
        </template>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";

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

  &__table {
    display: grid;
    grid-template-columns: 0.9rem 1.5fr 2fr 0.9rem;
    overflow: hidden;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
  }

  &__table > div {
    padding: var(--space-8) var(--space-12);
    border-bottom: 1px solid var(--color-border);
  }

  &__table > div:nth-child(-n + 4) {
    color: var(--color-text);
    font-weight: 900;
    background: var(--color-surface-muted);
  }

  &__table > div:nth-last-child(-n + 4) {
    border-bottom: none;
  }
}

@media (max-width: 760px) {
  .ui-demo__preview--grid,
  .ui-demo__table {
    grid-template-columns: 1fr;
  }
}
</style>
