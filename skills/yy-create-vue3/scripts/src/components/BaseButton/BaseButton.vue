<template>
  <button
    class="base-button"
    :class="[
      `base-button--${normalizedVariant}`,
      `base-button--${size}`,
      {
        'base-button--block': block,
        'base-button--loading': loading,
      },
    ]"
    :disabled="isDisabled"
    :type="type"
    @click="handleClick"
  >
    <span v-if="loading" class="base-button__spinner" aria-hidden="true" />
    <span v-else-if="icon || $slots.icon" class="base-button__icon" aria-hidden="true">
      <slot name="icon">{{ icon }}</slot>
    </span>
    <span class="base-button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

type BaseButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "text";
type BaseButtonSize = "small" | "medium" | "large";
type BaseButtonType = "button" | "submit" | "reset";

const props = withDefaults(
  defineProps<{
    variant?: BaseButtonVariant;
    size?: BaseButtonSize;
    type?: BaseButtonType;
    disabled?: boolean;
    loading?: boolean;
    block?: boolean;
    icon?: string;
  }>(),
  {
    variant: "primary",
    size: "medium",
    type: "button",
    disabled: false,
    loading: false,
    block: false,
    icon: "",
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const normalizedVariant = computed(() => (props.variant === "text" ? "ghost" : props.variant));
const isDisabled = computed(() => props.disabled || props.loading);

const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault();
    return;
  }

  emit("click", event);
};
</script>

<style scoped lang="scss">
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-8);
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

  &__spinner {
    width: 0.14rem;
    height: 0.14rem;
    border: 0.02rem solid currentColor;
    border-right-color: transparent;
    border-radius: 999px;
    animation: base-button-spin 0.8s linear infinite;
  }

  &__icon {
    display: inline-grid;
    place-items: center;
    min-width: 0.16rem;
  }

  &__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &--small {
    min-height: 0.32rem;
    padding: 0 var(--space-12);
    font-size: 0.12rem;
  }

  &--medium {
    min-height: 0.4rem;
  }

  &--large {
    min-height: 0.48rem;
    padding: 0 var(--space-20);
    font-size: 0.16rem;
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

  &--ghost {
    color: var(--color-primary);
    background: transparent;
  }

  &--block {
    width: 100%;
  }
}

@keyframes base-button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
