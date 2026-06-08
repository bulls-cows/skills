<template>
  <article class="base-card" :class="{ 'base-card--hoverable': hoverable }">
    <header v-if="title || description" class="base-card__header">
      <h3 v-if="title" class="base-card__title">{{ title }}</h3>
      <p v-if="description" class="base-card__description">{{ description }}</p>
    </header>
    <div class="base-card__body">
      <slot />
    </div>
  </article>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    hoverable?: boolean;
  }>(),
  {
    title: "",
    description: "",
    hoverable: false,
  },
);
</script>

<style scoped lang="scss">
.base-card {
  display: grid;
  gap: var(--space-16);
  padding: var(--space-20);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-panel);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &--hoverable:hover {
    transform: translateY(-0.02rem);
    box-shadow: var(--shadow-float);
  }

  &__header {
    display: grid;
    gap: var(--space-4);
  }

  &__title {
    font-size: 0.18rem;
  }

  &__description {
    color: var(--color-text-muted);
  }

  &__body {
    min-width: 0;
  }
}
</style>
