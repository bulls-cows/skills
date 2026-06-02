<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100%;
  min-height: 100%;
}
</style>
