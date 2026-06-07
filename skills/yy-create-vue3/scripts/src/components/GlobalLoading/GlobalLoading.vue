<template>
  <Transition name="global-loading">
    <div v-if="globalLoading" class="global-loading" role="status" aria-live="polite">
      <div class="global-loading__panel">
        <span
          v-if="globalLoadingAnimation"
          class="global-loading__spinner"
          aria-hidden="true"
        ></span>
        <span>{{ globalLoadingTip || "加载中..." }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { globalLoading, globalLoadingAnimation, globalLoadingTip } from "@src/stores/store";
</script>

<style scoped lang="scss">
.global-loading {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: var(--color-overlay);

  &__panel {
    display: flex;
    align-items: center;
    gap: var(--space-12);
    padding: var(--space-16) var(--space-20);
    border-radius: var(--radius-lg);
    color: var(--color-text);
    font-weight: 700;
    background: var(--color-surface);
    box-shadow: var(--shadow-float);
  }

  &__spinner {
    width: 0.2rem;
    height: 0.2rem;
    border: 0.03rem solid var(--color-primary-soft);
    border-top-color: var(--color-primary);
    border-radius: 999px;
    animation: global-loading-spin 0.8s linear infinite;
  }
}

.global-loading-enter-active,
.global-loading-leave-active {
  transition: opacity 0.2s ease;
}

.global-loading-enter-from,
.global-loading-leave-to {
  opacity: 0;
}

@keyframes global-loading-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
