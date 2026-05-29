<script setup lang="ts">
import type { SkillCategory } from '@/types/resume'

defineProps<{
  title: string
  regulatorySystems?: SkillCategory[]
}>()
</script>

<template>
  <section v-if="regulatorySystems?.length">
    <h2>{{ title }}</h2>
    <div v-for="group in regulatorySystems" :key="group.category" class="regulatory-group">
      <h3>{{ group.category }}</h3>
      <div class="regulatory-list">
        <span v-for="item in group.items" :key="item" class="regulatory-tag">{{ item }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
@use '../../styles/resume' as *;
</style>
