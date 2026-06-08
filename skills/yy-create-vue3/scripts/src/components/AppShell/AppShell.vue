<template>
  <div class="app-shell" :class="`app-shell--${layout}`">
    <AppHeader />
    <div class="app-shell__body">
      <AppSidebar v-if="layout !== 'fullscreen'" />
      <main class="app-shell__content">
        <slot />
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from "@src/components/AppFooter/AppFooter.vue";
import AppHeader from "@src/components/AppHeader/AppHeader.vue";
import AppSidebar from "@src/components/AppSidebar/AppSidebar.vue";

defineProps<{
  layout: RouteConfigLayout;
}>();
</script>

<style scoped lang="scss">
.app-shell {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: var(--space-16);
  gap: var(--space-16);

  &--fullscreen {
    width: 100%;
    padding: 0;

    .app-shell__body {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  &__body {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--space-16);
    min-height: 0;
    height: 100%;
    align-items: stretch;
    overflow: hidden;
  }

  &__content {
    height: 100%;
    min-width: 0;
    min-height: 0;
    overflow: auto;
  }

  &__body :deep(.app-sidebar) {
    height: 100%;
    min-height: 0;
    overflow: auto;
  }
}

@media (max-width: 960px) {
  .app-shell {
    width: min(100% - 0.24rem, 12.8rem);
  }
}
</style>
