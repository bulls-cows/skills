<template>
  <label class="base-input">
    <span v-if="label" class="base-input__label">{{ label }}</span>
    <input
      v-model="modelValue"
      class="base-input__control"
      :class="{ 'base-input__control--error': Boolean(error) }"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
    />
    <span v-if="error" class="base-input__message">{{ error }}</span>
    <span v-else-if="description" class="base-input__description">{{ description }}</span>
  </label>
</template>

<script setup lang="ts">
type BaseInputType = "text" | "password" | "email" | "number" | "search" | "tel" | "url";

const modelValue = defineModel<string>({ default: "" });

withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    description?: string;
    error?: string;
    type?: BaseInputType;
    disabled?: boolean;
  }>(),
  {
    label: "",
    placeholder: "",
    description: "",
    error: "",
    type: "text",
    disabled: false,
  },
);
</script>

<style scoped lang="scss">
.base-input {
  display: grid;
  gap: var(--space-8);

  &__label {
    font-weight: 800;
  }

  &__control {
    width: 100%;
    min-height: 0.42rem;
    padding: 0 var(--space-12);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text);
    background: var(--color-surface);
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:focus {
      border-color: var(--color-primary);
      outline: none;
      box-shadow: 0 0 0 0.03rem var(--color-primary-soft);
    }

    &:disabled {
      cursor: not-allowed;
      background: var(--color-surface-muted);
      opacity: 0.7;
    }

    &--error {
      border-color: var(--color-danger);
    }
  }

  &__message,
  &__description {
    font-size: 0.12rem;
  }

  &__message {
    color: var(--color-danger);
  }

  &__description {
    color: var(--color-text-muted);
  }
}
</style>
