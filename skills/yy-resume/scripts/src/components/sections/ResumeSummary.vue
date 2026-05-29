<script setup lang="ts">
defineProps<{
  title: string
  summary?: string
}>()
</script>

<template>
  <section v-if="summary">
    <h2>{{ title }}</h2>
    <div class="summary" v-html="summary"></div>
  </section>
</template>

<style scoped>
@use '../../styles/resume' as *;
</style>
