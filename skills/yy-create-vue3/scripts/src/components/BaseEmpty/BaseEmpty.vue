<template>
  <section class="base-empty">
    <div class="base-empty__icon" aria-hidden="true">{{ icon }}</div>
    <h3 class="base-empty__title">{{ title }}</h3>
    <p v-if="description" class="base-empty__description">{{ description }}</p>
    <div v-if="$slots.action" class="base-empty__action">
      <slot name="action" />
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    icon?: string;
  }>(),
  {
    title: "暂无数据",
    description: "当前没有可展示的内容。",
    icon: "∅",
  },
);
</script>

<style scoped lang="scss">
.base-empty {
  display: grid;
  justify-items: center;
  gap: var(--space-12);
  padding: var(--space-40) var(--space-24);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-muted);
  text-align: center;
  background: var(--color-surface);

  &__icon {
    display: grid;
    place-items: center;
    width: 0.56rem;
    height: 0.56rem;
    border-radius: 999px;
    color: var(--color-primary);
    font-size: 0.28rem;
    font-weight: 900;
    background: var(--color-primary-soft);
  }

  &__title {
    color: var(--color-text);
    font-size: 0.18rem;
  }

  &__description {
    max-width: 4.8rem;
  }

  &__action {
    margin-top: var(--space-4);
  }
}
</style>
