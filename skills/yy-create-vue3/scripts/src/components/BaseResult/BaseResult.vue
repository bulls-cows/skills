<template>
  <section class="base-result" :class="`base-result--${status}`">
    <div class="base-result__icon" aria-hidden="true">
      <slot name="icon">{{ statusIcon }}</slot>
    </div>
    <div class="base-result__content">
      <h3 class="base-result__title">{{ title || statusTitle }}</h3>
      <p v-if="description" class="base-result__description">{{ description }}</p>
      <div v-if="$slots.actions" class="base-result__actions">
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

type BaseResultStatus = "success" | "error" | "warning" | "info";

const props = withDefaults(
  defineProps<{
    status?: BaseResultStatus;
    title?: string;
    description?: string;
  }>(),
  {
    status: "info",
    title: "",
    description: "",
  },
);

const statusIconMap: Record<BaseResultStatus, string> = {
  success: "✓",
  error: "!",
  warning: "!",
  info: "i",
};

const statusTitleMap: Record<BaseResultStatus, string> = {
  success: "操作成功",
  error: "操作失败",
  warning: "请注意",
  info: "提示信息",
};

const statusIcon = computed(() => statusIconMap[props.status]);
const statusTitle = computed(() => statusTitleMap[props.status]);
</script>

<style scoped lang="scss">
.base-result {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-16);
  padding: var(--space-24);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-panel);

  &__icon {
    display: grid;
    place-items: center;
    width: 0.48rem;
    height: 0.48rem;
    border-radius: 999px;
    font-size: 0.24rem;
    font-weight: 900;
  }

  &__content {
    display: grid;
    gap: var(--space-8);
  }

  &__title {
    color: var(--color-text);
    font-size: 0.18rem;
  }

  &__description {
    color: var(--color-text-muted);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-8);
    margin-top: var(--space-8);
  }

  &--success &__icon {
    color: var(--color-success);
    background: var(--color-success-soft);
  }

  &--error &__icon {
    color: var(--color-danger);
    background: var(--color-danger-soft);
  }

  &--warning &__icon {
    color: var(--color-warning);
    background: var(--color-warning-soft);
  }

  &--info &__icon {
    color: var(--color-secondary);
    background: var(--color-secondary-soft);
  }
}
</style>
