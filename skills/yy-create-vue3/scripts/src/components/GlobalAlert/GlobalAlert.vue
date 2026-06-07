<template>
  <dialog v-if="visible" open class="global-alert" @click.self="$emit('close')">
    <article class="global-alert__card">
      <header class="global-alert__header">
        <div class="global-alert__copy">
          <h2>{{ title || "提示" }}</h2>
          <p>{{ message }}</p>
        </div>
        <button
          type="button"
          class="global-alert__close"
          aria-label="关闭提示"
          @click="$emit('close')"
        >
          ×
        </button>
      </header>
      <footer class="global-alert__actions">
        <button
          type="button"
          class="global-alert__button global-alert__button--ghost"
          @click="$emit('close')"
        >
          关闭
        </button>
        <button
          type="button"
          class="global-alert__button global-alert__button--primary"
          @click="$emit('confirm')"
        >
          确定
        </button>
      </footer>
    </article>
  </dialog>
</template>

<script setup lang="ts">
interface Props {
  visible: boolean;
  title: string;
  message: string;
}

defineProps<Props>();

defineEmits<{
  close: [];
  confirm: [];
}>();
</script>

<style scoped lang="scss">
.global-alert {
  position: fixed;
  inset: 0;
  z-index: 1010;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-24);
  border: 0;
  background: var(--color-overlay);
}

.global-alert::backdrop {
  background: var(--color-overlay);
}

.global-alert__card {
  width: min(4.6rem, 100%);
  display: grid;
  gap: var(--space-20);
  padding: var(--space-24);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-float);
}

.global-alert__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-12);
}

.global-alert__copy {
  display: grid;
  gap: var(--space-12);
}

.global-alert__copy h2 {
  margin: 0;
  color: var(--color-text);
  font-size: 0.22rem;
}

.global-alert__copy p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.14rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

.global-alert__close {
  width: 0.32rem;
  height: 0.32rem;
  border-radius: 50%;
  color: var(--color-text-muted);
  background: var(--color-surface-muted);
}

.global-alert__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-12);
}

.global-alert__button {
  min-width: 0.88rem;
  min-height: 0.36rem;
  padding: 0 var(--space-16);
  border-radius: var(--radius-sm);
}

.global-alert__button--ghost {
  border: 1px solid var(--color-border);
  color: var(--color-text);
  background: var(--color-surface);
}

.global-alert__button--primary {
  color: #fff;
  background: var(--color-primary);
}
</style>
