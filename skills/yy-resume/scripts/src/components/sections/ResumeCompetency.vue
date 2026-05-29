<script setup lang="ts">
defineProps<{
  title: string
  competencies?: string[]
}>()
</script>

<template>
  <section v-if="competencies?.length">
    <h2>{{ title }}</h2>
    <div class="competency-list">
      <span v-for="item in competencies" :key="item" class="competency-tag">{{ item }}</span>
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

.competency-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.competency-tag {
  display: inline-block;
  background: var(--tag-bg, #eef1f5);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  color: var(--primary, #2c3e50);
  border: 1px solid var(--tag-border, #d7dde6);
}
</style>
