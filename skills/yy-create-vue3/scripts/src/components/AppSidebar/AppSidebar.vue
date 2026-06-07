<template>
  <aside class="app-sidebar" :class="{ 'app-sidebar--collapsed': sidebarCollapsed }">
    <button class="app-sidebar__toggle" type="button" @click="toggleCollapsed">
      {{ sidebarCollapsed ? "展开导航" : "收起导航" }}
    </button>

    <nav class="app-sidebar__nav" aria-label="主导航">
      <RouterLink
        v-for="item in appNavigationItems"
        :key="item.path"
        class="app-sidebar__link"
        active-class="app-sidebar__link--active"
        :to="item.path"
      >
        <span class="app-sidebar__label">{{ item.label }}</span>
        <span class="app-sidebar__description">{{ item.description }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAppNavigation } from "@src/composables/useAppNavigation";
import { sidebarCollapsed } from "@src/stores/store";

const { appNavigationItems } = useAppNavigation();

function toggleCollapsed() {
  sidebarCollapsed.value = !sidebarCollapsed.value;
}
</script>

<style scoped lang="scss">
.app-sidebar {
  display: grid;
  align-content: start;
  gap: var(--space-12);
  min-width: 2.2rem;
  padding: var(--space-16);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: var(--shadow-panel);

  &__toggle {
    justify-self: stretch;
    padding: var(--space-8) var(--space-12);
    border-radius: var(--radius-sm);
    color: var(--color-primary);
    font-weight: 700;
    background: var(--color-primary-soft);
  }

  &__nav {
    display: grid;
    gap: var(--space-8);
  }

  &__link {
    display: grid;
    gap: var(--space-4);
    padding: var(--space-12);
    border-radius: var(--radius-md);
    background: transparent;
    transition:
      color 0.2s ease,
      background 0.2s ease;
  }

  &__link--active,
  &__link:hover {
    color: var(--color-primary);
    background: var(--color-primary-soft);
  }

  &__label {
    font-weight: 800;
  }

  &__description {
    color: var(--color-text-muted);
    font-size: 0.12rem;
  }

  &--collapsed {
    min-width: 1.2rem;

    .app-sidebar__description {
      display: none;
    }
  }
}

@media (max-width: 960px) {
  .app-sidebar {
    min-width: 0;
  }
}
</style>
