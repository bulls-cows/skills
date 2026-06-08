<template>
  <span class="base-tag" :class="`base-tag--${type}`">
    <slot />
  </span>
</template>

<script setup lang="ts">
type BaseTagType = "default" | "primary" | "success" | "warning" | "danger";

withDefaults(
  defineProps<{
    type?: BaseTagType;
  }>(),
  {
    type: "default",
  },
);
</script>

<style scoped lang="scss">
.base-tag {
  display: inline-grid;
  place-items: center;
  min-height: 0.24rem;
  padding: 0 var(--space-8);
  border-radius: 999px;
  color: var(--color-text-muted);
  font-size: 0.12rem;
  font-weight: 800;
  background: var(--color-surface-muted);

  &--primary {
    color: var(--color-primary);
    background: var(--color-primary-soft);
  }

  &--success {
    color: var(--color-success);
    background: var(--color-success-soft);
  }

  &--warning {
    color: var(--color-warning);
    background: var(--color-warning-soft);
  }

  &--danger {
    color: var(--color-danger);
    background: var(--color-danger-soft);
  }
}
</style>
