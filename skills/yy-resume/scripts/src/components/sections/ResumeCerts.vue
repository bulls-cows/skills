<script setup lang="ts">
import type { Cert } from '@/types/resume'

defineProps<{
  title: string
  certs?: Cert[]
}>()
</script>

<template>
  <section v-if="certs?.length">
    <h2>{{ title }}</h2>
    <div v-for="(cert, i) in certs" :key="i" class="cert-item">
      <div class="cert-name">{{ cert.name || '' }}</div>
      <div class="cert-detail">{{ cert.issuer || '' }}<template v-if="cert.year"> · {{ cert.year }}</template></div>
    </div>
  </section>
</template>

<style scoped>
@use '../../styles/resume' as *;
</style>
