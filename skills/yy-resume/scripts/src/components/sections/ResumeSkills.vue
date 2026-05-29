<script setup lang="ts">
import type { SkillCategory } from '@/types/resume'

defineProps<{
  title: string
  skills?: SkillCategory[]
}>()
</script>

<template>
  <section v-if="skills?.length">
    <h2>{{ title }}</h2>
    <div v-for="cat in skills" :key="cat.category" class="skills-category">
      <h3>{{ cat.category }}</h3>
      <div class="skills-list">
        <span v-for="item in cat.items" :key="item">{{ item }}</span>
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

.skills-category {
  margin-bottom: 12px;

  h3 {
    font-size: 14px;
    font-weight: 600;
    color: #444;
    margin-bottom: 6px;
  }
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    display: inline-block;
    background: var(--tag-bg, #eef1f5);
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 13px;
    color: var(--primary, #2c3e50);
    border: 1px solid var(--tag-border, #d7dde6);
  }
}

@media print {
  .skills-category {
    break-inside: avoid;
  }
}
</style>
