<script setup lang="ts">
import type { Project } from '@/types/resume'

const props = defineProps<{
  title: string
  projects?: Project[]
  variant?: 'tech' | 'submission' | 'tools'
}>()
</script>

<template>
  <section v-if="projects?.length">
    <h2>{{ title }}</h2>
    <div v-for="(proj, i) in projects" :key="i" class="project-item">
      <div class="item-header">
        <div>
          <div class="project-name">
            <a v-if="proj.url" :href="proj.url" target="_blank">{{ proj.name }}</a>
            <template v-else>{{ proj.name }}</template>
          </div>
          <div class="role">{{ proj.role || '' }}</div>
        </div>
        <div class="date">{{ proj.startDate || '' }} - {{ proj.endDate || '' }}</div>
      </div>
      <div v-if="variant === 'tech' && proj.techStack" class="tech-stack">{{ proj.techStack }}</div>
      <div v-if="variant === 'submission' && proj.submissionType" class="submission-type">{{ proj.submissionType }}</div>
      <div v-if="variant === 'tools' && proj.toolsMethods" class="tools-methods">{{ proj.toolsMethods }}</div>
      <ul class="desc-list">
        <li v-for="(desc, j) in proj.descriptions" :key="j" v-html="desc"></li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
@use '../../styles/resume' as *;
</style>
