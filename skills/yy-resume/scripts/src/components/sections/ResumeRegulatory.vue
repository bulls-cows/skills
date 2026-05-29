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

.regulatory-group {
  margin-bottom: 12px;

  h3 {
    font-size: 14px;
    font-weight: 600;
    color: #444;
    margin-bottom: 6px;
  }
}

.regulatory-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.regulatory-tag {
  display: inline-block;
  background: var(--tag-bg, #eef1f5);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  color: var(--primary, #2c3e50);
  border: 1px solid var(--tag-border, #d7dde6);
}

@media print {
  .regulatory-group {
    break-inside: avoid;
  }
}
</style>
