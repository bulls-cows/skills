<script setup lang="ts">
import type { Education } from '@/types/resume'

defineProps<{
  title: string
  education?: Education[]
}>()
</script>

<template>
  <section v-if="education?.length">
    <h2>{{ title }}</h2>
    <div v-for="(edu, i) in education" :key="i" class="education-item">
      <div class="item-header">
        <div>
          <div class="school">{{ edu.school || '' }}</div>
          <div class="degree">{{ edu.major || '' }}</div>
        </div>
        <div class="date">{{ edu.startDate || '' }} - {{ edu.endDate || '' }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@use '../../styles/resume' as *;
</style>
