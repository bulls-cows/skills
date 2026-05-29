<script setup lang="ts">
import type { Link } from '@/types/resume'

defineProps<{
  name?: string
  title?: string
  city?: string
  phone?: string
  email?: string
  links?: Link[]
  showLinks?: boolean
}>()
</script>

<template>
  <header class="header">
    <div class="name">{{ name || '' }}</div>
    <div class="title">{{ title || '' }}</div>
    <div class="contact">
      <span>{{ city || '' }}</span>
      <span>|</span>
      <span>{{ phone || '' }}</span>
      <span>|</span>
      <span>{{ email || '' }}</span>
    </div>
    <div v-if="showLinks && links?.length" class="links">
      <a v-for="link in links" :key="link.label" :href="link.url" target="_blank">
        {{ link.label }}
      </a>
    </div>
  </header>
</template>

<style scoped>
@use '../../styles/resume' as *;
</style>
