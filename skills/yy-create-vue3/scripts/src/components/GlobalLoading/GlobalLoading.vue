<template>
  <Transition name="global-loading">
    <div v-if="isLoading" class="global-loading" role="status" aria-live="polite">
      <div class="global-loading__panel">
        <div v-if="showAnimation" class="global-loading__circle" aria-hidden="true">
          <div class="global-loading__outer-ring"></div>
        </div>
        <span class="global-loading__tip">
          <span>{{ loadingTip || "加载中" }}</span>
          <span v-if="showAnimation" class="global-loading__point">{{ pointStr }}</span>
        </span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useGlobalLoading } from "@src/composables/useGlobalLoading";
import { useLoadingPoints } from "@src/composables/useLoadingPoints";

const { isLoading, loadingTip, showAnimation } = useGlobalLoading();

const { pointStr, start, stop } = useLoadingPoints({
  interval: 300,
});

watch(
  [isLoading, showAnimation],
  ([loading, animation]) => {
    if (loading && animation) {
      start();
      return;
    }

    stop();
  },
  { immediate: true },
);
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

  &__circle {
    position: relative;
    width: 0.28rem;
    height: 0.28rem;
    --loading-ring-color: var(--color-primary-soft);
    --loading-accent-color: var(--color-primary);
    --loading-ring-width: 0.03rem;
    --loading-accent-start: 296deg;
    --loading-accent-end: 350deg;
  }

  &__outer-ring {
    position: absolute;
    inset: 0;
    border: var(--loading-ring-width) solid var(--loading-ring-color);
    border-radius: 50%;

    &::before {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: conic-gradient(
        from -90deg,
        transparent 0deg var(--loading-accent-start),
        var(--loading-accent-color) var(--loading-accent-start) var(--loading-accent-end),
        transparent var(--loading-accent-end) 360deg
      );
      content: "";
      mask: radial-gradient(
        farthest-side,
        transparent calc(100% - var(--loading-ring-width)),
        #000 calc(100% - var(--loading-ring-width))
      );
      -webkit-mask: radial-gradient(
        farthest-side,
        transparent calc(100% - var(--loading-ring-width)),
        #000 calc(100% - var(--loading-ring-width))
      );
      opacity: 0.9;
      animation: global-loading-rotate 1.65s cubic-bezier(0.65, 0.05, 0.36, 1) infinite;
    }
  }

  &__tip {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  &__point {
    position: absolute;
    left: calc(100% + var(--space-2));
    font-weight: 700;
    letter-spacing: 0.01rem;
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

@keyframes global-loading-rotate {
  0% {
    opacity: 0.72;
    transform: rotate(0deg);
  }

  65% {
    opacity: 1;
    transform: rotate(248deg);
  }

  100% {
    opacity: 0.72;
    transform: rotate(360deg);
  }
}
</style>
