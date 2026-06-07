<template>
  <div class="app-shell" :class="`app-shell--${layout}`">
    <template v-if="layout === 'fullscreen'">
      <slot />
    </template>

    <template v-else-if="layout === 'login'">
      <main class="app-shell__login">
        <slot />
      </main>
    </template>

    <template v-else>
      <AppHeader />
      <div class="app-shell__body">
        <AppSidebar />
        <main class="app-shell__content">
          <slot />
        </main>
      </div>
      <AppFooter />
    </template>
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
  width: min(12.8rem, calc(100% - 0.48rem));
  min-height: 100%;
  margin: 0 auto;
  padding: var(--space-24) 0 var(--space-40);

  &--default {
    display: grid;
    gap: var(--space-20);
  }

  &--fullscreen {
    width: 100%;
    padding: 0;
  }

  &--login {
    display: grid;
    place-items: center;
    width: 100%;
    padding: var(--space-24);
  }

  &__body {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--space-20);
    align-items: start;
  }

  &__content {
    min-width: 0;
  }

  &__login {
    width: min(4.8rem, 100%);
  }
}

@media (max-width: 960px) {
  .app-shell {
    width: min(100% - 0.24rem, 12.8rem);

    &__body {
      grid-template-columns: 1fr;
    }
  }
}
</style>
