<template>
  <footer class="app-footer">
    <span>Vue 3 Scaffold</span>
    <span>Vite · TypeScript · Pinia · Vitest</span>
  </footer>
</template>

<style scoped lang="scss">
.app-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-12);
  color: var(--color-text-muted);
  font-size: 0.12rem;
}

@media (max-width: 720px) {
  .app-footer {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
