<template>
  <label class="base-select">
    <span v-if="label" class="base-select__label">{{ label }}</span>
    <span class="base-select__control-wrap">
      <select
        class="base-select__control"
        :disabled="disabled"
        :value="selectValue"
        @change="handleChange"
      >
        <option disabled value="">{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="String(option.value)"
          :disabled="option.disabled"
          :value="String(option.value)"
        >
          {{ option.label }}
        </option>
      </select>
      <button
        v-if="clearable && modelValue !== null && modelValue !== undefined && !disabled"
        class="base-select__clear"
        type="button"
        aria-label="清空选择"
        @click="handleClear"
      >
        ×
      </button>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface BaseSelectOption<TValue extends string | number = string | number> {
  label: string;
  value: TValue;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null;
    options?: BaseSelectOption[];
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
  }>(),
  {
    modelValue: null,
    options: () => [],
    label: "",
    placeholder: "请选择",
    disabled: false,
    clearable: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string | number | null];
  change: [option: BaseSelectOption | null];
}>();

const selectValue = computed(() => (props.modelValue === null ? "" : String(props.modelValue)));

const findOptionByValue = (value: string) => {
  return props.options.find((option) => String(option.value) === value) ?? null;
};

const handleChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  const option = findOptionByValue(value);

  emit("update:modelValue", option?.value ?? null);
  emit("change", option);
};

const handleClear = () => {
  emit("update:modelValue", null);
  emit("change", null);
};
</script>

<style scoped lang="scss">
.base-select {
  display: grid;
  gap: var(--space-8);
  color: var(--color-text);

  &__label {
    color: var(--color-text-muted);
    font-size: 0.13rem;
    font-weight: 800;
  }

  &__control-wrap {
    position: relative;
    display: block;
  }

  &__control {
    width: 100%;
    min-height: 0.4rem;
    padding: 0 var(--space-40) 0 var(--space-12);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text);
    background: var(--color-surface);
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  &__clear {
    position: absolute;
    top: 50%;
    right: var(--space-12);
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 999px;
    color: var(--color-text-muted);
    line-height: 1;
    background: var(--color-surface-muted);
    transform: translateY(-50%);
  }
}
</style>
