<script setup lang="ts">
defineProps<{
  title: string
  summary?: string
}>()
</script>

<template>
  <section v-if="summary">
    <h2>{{ title }}</h2>
    <div class="summary" v-html="summary"></div>
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

.summary {
  font-size: 14px;
  color: #444;
}

.summary strong {
  font-weight: 600;
}
</style>
