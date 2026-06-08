<template>
  <button
    class="base-button"
    :class="[`base-button--${variant}`, { 'base-button--block': block }]"
    :disabled="disabled"
    :type="type"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
type BaseButtonVariant = "primary" | "secondary" | "danger" | "text";
type BaseButtonType = "button" | "submit" | "reset";

withDefaults(
  defineProps<{
    variant?: BaseButtonVariant;
    type?: BaseButtonType;
    disabled?: boolean;
    block?: boolean;
  }>(),
  {
    variant: "primary",
    type: "button",
    disabled: false,
    block: false,
  },
);
</script>

<style scoped lang="scss">
.base-button {
  display: inline-grid;
  place-items: center;
  min-height: 0.4rem;
  padding: 0 var(--space-16);
  border-radius: var(--radius-md);
  font-weight: 800;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;

  &:not(:disabled):hover {
    transform: translateY(-0.01rem);
    box-shadow: var(--shadow-panel);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  &--primary {
    color: #ffffff;
    background: var(--color-primary);
  }

  &--secondary {
    color: var(--color-secondary);
    background: var(--color-secondary-soft);
  }

  &--danger {
    color: var(--color-danger);
    background: var(--color-danger-soft);
  }

  &--text {
    color: var(--color-primary);
    background: transparent;
  }

  &--block {
    width: 100%;
  }
}
</style>
