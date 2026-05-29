<script setup lang="ts">
import type { SkillCategory } from '@/types/resume'

defineProps<{
  title: string
  skills?: SkillCategory[]
}>()
</script>

<template>
  <section v-if="skills?.length">
    <h2>{{ title }}</h2>
    <div v-for="cat in skills" :key="cat.category" class="skills-category">
      <h3>{{ cat.category }}</h3>
      <div class="skills-list">
        <span v-for="item in cat.items" :key="item">{{ item }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
@use '../../styles/resume' as *;
</style>
