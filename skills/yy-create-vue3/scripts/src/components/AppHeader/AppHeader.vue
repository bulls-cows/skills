<template>
  <header class="app-header">
    <div class="app-header__brand">
      <span class="app-header__logo" aria-hidden="true">V3</span>
      <div>
        <p class="app-header__eyebrow">Vue 3 Scaffold</p>
        <h1 class="app-header__title">可复用前端模板</h1>
      </div>
    </div>

    <div class="app-header__meta" aria-label="运行环境">
      <span class="app-header__badge">{{ modeLabel }}</span>
      <span class="app-header__badge">Mock {{ mockLabel }}</span>
      <span class="app-header__version">v{{ APP_VERSION }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { APP_VERSION, MOCK, MODE } from "@src/utils/constantUtils";

const modeLabel = computed(() => MODE || "local");
const mockLabel = computed(() => (MOCK === "1" ? "ON" : "OFF"));
</script>

<style scoped lang="scss">
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-16);
  padding: var(--space-20) var(--space-24);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: var(--shadow-panel);

  &__brand {
    display: flex;
    align-items: center;
    gap: var(--space-12);
    min-width: 0;
  }

  &__logo {
    display: grid;
    flex: 0 0 0.44rem;
    place-items: center;
    width: 0.44rem;
    height: 0.44rem;
    border-radius: var(--radius-md);
    color: #fff;
    font-weight: 800;
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  }

  &__eyebrow,
  &__title {
    margin: 0;
  }

  &__eyebrow {
    color: var(--color-text-muted);
    font-size: 0.12rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__title {
    font-size: 0.2rem;
    font-weight: 800;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: var(--space-8);
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  &__badge,
  &__version {
    padding: var(--space-4) var(--space-8);
    border-radius: 999px;
    color: var(--color-text-muted);
    font-size: 0.12rem;
    font-weight: 700;
    background: var(--color-surface-muted);
  }
}

@media (max-width: 720px) {
  .app-header {
    align-items: flex-start;
    flex-direction: column;

    &__meta {
      justify-content: flex-start;
    }
  }
}
</style>
