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
        <template v-if="pub.journal">
          · <span class="pub-journal">{{ pub.journal }}</span></template
        >
        <template v-if="pub.year">
          · <span class="pub-year">{{ pub.year }}</span></template
        >
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

.publication-item {
  margin-bottom: 10px;
  font-size: 14px;
  color: #444;

  @media print {
    break-inside: avoid;
  }
}

.pub-title {
  font-weight: 600;
  color: #222;
}

.pub-authors {
  color: #666;
  font-size: 13px;
}

.pub-journal {
  color: var(--primary, #2c3e50);
  font-style: italic;
}

.pub-year {
  color: #888;
}
</style>
