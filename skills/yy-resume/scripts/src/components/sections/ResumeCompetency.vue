<script setup lang="ts">
defineProps<{
  title: string
  competencies?: string[]
}>()
</script>

<template>
  <section v-if="competencies?.length">
    <h2>{{ title }}</h2>
    <div class="competency-list">
      <span v-for="item in competencies" :key="item" class="competency-tag">{{ item }}</span>
    </div>
  </section>
</template>

<style scoped>
@use '../../styles/resume' as *;
</style>
