<script setup lang="ts">
import type { Publication } from '@/types/resume'

defineProps<{
  title: string
  publications?: Publication[]
}>()
</script>

<template>
  <section v-if="publications?.length">
    <h2>{{ title }}</h2>
    <div v-for="(pub, i) in publications" :key="i" class="publication-item">
      <div class="pub-title">{{ pub.title || '' }}</div>
      <div class="pub-authors">
        {{ pub.authors || '' }}
        <template v-if="pub.journal"> · <span class="pub-journal">{{ pub.journal }}</span></template>
        <template v-if="pub.year"> · <span class="pub-year">{{ pub.year }}</span></template>
      </div>
    </div>
  </section>
</template>

<style scoped>
@use '../../styles/resume' as *;
</style>
