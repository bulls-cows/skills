<script setup lang="ts">
import type { Education } from '@/types/resume';

defineProps<{
  title: string;
  education?: Education[];
}>();
</script>

<template>
  <section v-if="education?.length">
    <h2>{{ title }}</h2>
    <div v-for="(edu, i) in education" :key="i" class="education-item">
      <div class="item-header">
        <div>
          <div class="school">{{ edu.school || '' }}</div>
          <div class="degree">{{ edu.major || '' }}</div>
        </div>
        <div class="date">{{ edu.startDate || '' }} - {{ edu.endDate || '' }}</div>
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

.education-item {
  margin-bottom: 16px;

  @media print {
    break-inside: avoid;
  }
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.school {
  font-size: 15px;
  font-weight: 600;
  color: #222;
}

.degree {
  font-size: 14px;
  color: #444;
}

.date {
  font-size: 13px;
  color: #888;
}
</style>
