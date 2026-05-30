<script setup lang="ts">
import type { Cert } from '@/types/resume';

defineProps<{
  title: string;
  certs?: Cert[];
}>();
</script>

<template>
  <section v-if="certs?.length">
    <h2>{{ title }}</h2>
    <div v-for="(cert, i) in certs" :key="i" class="cert-item">
      <div class="cert-name">{{ cert.name || '' }}</div>
      <div class="cert-detail">
        {{ cert.issuer || '' }}<template v-if="cert.year"> · {{ cert.year }}</template>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-bottom: 24px;

  @media print {
    break-inside: avoid;
  }
}

h2 {
  font-size: 18px;
  color: var(--primary, #2c3e50);
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
  margin-bottom: 12px;

  @media print {
    break-after: avoid;
  }
}

.cert-item {
  margin-bottom: 10px;
  font-size: 14px;
  color: #444;

  @media print {
    break-inside: avoid;
  }
}

.cert-name {
  font-weight: 600;
  color: #222;
}

.cert-detail {
  color: #666;
  font-size: 13px;
}
</style>
