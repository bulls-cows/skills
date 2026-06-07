<template>
  <div class="app">
    <AppShell :layout="layout">
      <RouterView />
    </AppShell>
    <GlobalLoading />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import AppShell from "@src/components/AppShell/AppShell.vue";
import GlobalLoading from "@src/components/GlobalLoading/GlobalLoading.vue";

const route = useRoute();
const layout = computed(() => route.meta.layout ?? "default");
</script>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100%;
  min-height: 100%;
}
</style>
