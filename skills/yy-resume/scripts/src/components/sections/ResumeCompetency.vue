<script setup lang="ts">
/**
 * ResumeCompetency - 核心竞争力组件（紧凑标签风格）
 */
defineProps<{
  /** 区块标题 */
  title: string;
  /** 核心竞争力列表 */
  competencies?: string[];
}>();
</script>

<template>
  <!-- 核心竞争力区块 -->
  <section v-if="competencies?.length" class="resume-section">
    <div class="section-header">
      <div class="section-header__left">{{ title }}</div>
    </div>
    <div class="tag-list">
      <span v-for="item in competencies" :key="item" class="tag">{{ item }}</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use './section-common';

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3pt;
}
</style>
