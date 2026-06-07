<template>
  <Transition name="global-toast">
    <div v-if="visible" class="global-toast">
      <article class="global-toast__card" :class="`global-toast__card--${type}`">
        <div class="global-toast__accent"></div>
        <div class="global-toast__content">
          <h3 v-if="title">{{ title }}</h3>
          <p>{{ message }}</p>
        </div>
        <button
          type="button"
          class="global-toast__close"
          aria-label="关闭提示"
          @click="$emit('close')"
        >
          ×
        </button>
      </article>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  visible: boolean;
  title: string;
  message: string;
  type: ParamsDoToast["type"];
}

defineProps<Props>();

defineEmits<{
  close: [];
}>();
</script>

<style scoped lang="scss">
.global-toast {
  position: fixed;
  top: var(--space-24);
  right: var(--space-24);
  z-index: 1020;
  pointer-events: none;
}

.global-toast__card {
  min-width: 3rem;
  max-width: 4.2rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: flex-start;
  gap: var(--space-12);
  padding: var(--space-16);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-float);
  pointer-events: auto;
}

.global-toast__accent {
  width: var(--space-4);
  min-height: 100%;
  border-radius: 999px;
  background: var(--color-secondary);
}

.global-toast__content {
  display: grid;
  gap: var(--space-8);
}

.global-toast__content h3,
.global-toast__content p {
  margin: 0;
}

.global-toast__content h3 {
  color: var(--color-text);
  font-size: 0.14rem;
}

.global-toast__content p {
  color: var(--color-text-muted);
  font-size: 0.13rem;
  line-height: 1.5;
  word-break: break-word;
}

.global-toast__close {
  width: 0.28rem;
  height: 0.28rem;
  border-radius: 50%;
  color: var(--color-text-muted);
  background: transparent;
}

.global-toast__card--success .global-toast__accent {
  background: var(--color-success);
}

.global-toast__card--error .global-toast__accent {
  background: var(--color-danger);
}

.global-toast__card--warning .global-toast__accent {
  background: var(--color-warning);
}

.global-toast__card--info .global-toast__accent {
  background: var(--color-secondary);
}

.global-toast-enter-active,
.global-toast-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.global-toast-enter-from,
.global-toast-leave-to {
  opacity: 0;
  transform: translateY(-0.08rem);
}
</style>
