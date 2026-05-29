<script setup lang="ts">
import type { Experience } from '@/types/resume'

defineProps<{
  title: string
  experience?: Experience[]
}>()
</script>

<template>
  <section v-if="experience?.length">
    <h2>{{ title }}</h2>
    <div v-for="(exp, i) in experience" :key="i" class="experience-item">
      <div class="item-header">
        <div>
          <div class="company">
            <a v-if="exp.url" :href="exp.url" target="_blank">{{ exp.organization }}</a>
            <template v-else>{{ exp.organization }}</template>
            <span v-if="exp.tags?.length" class="company-tags">
              <span v-for="tag in exp.tags" :key="tag" class="company-tag">{{ tag }}</span>
            </span>
          </div>
          <div class="position">{{ exp.position || '' }}</div>
        </div>
        <div class="date">{{ exp.startDate || '' }} - {{ exp.endDate || '' }}</div>
      </div>
      <ul class="desc-list">
        <li v-for="(desc, j) in exp.descriptions" :key="j" v-html="desc"></li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
@use '../../styles/resume' as *;
</style>
