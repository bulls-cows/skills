<template>
  <!-- 技能列表区块 -->
  <section v-if="skills?.length" class="resume-section">
    <div class="section-header">
      <div class="section-header__left">{{ title }}</div>
    </div>
    <div v-for="cat in skills" :key="cat.category" class="tag-group">
      <h3 class="tag-group__title">{{ cat.category }}</h3>
      <div class="tag-list">
        <span v-for="item in cat.items" :key="item" class="tag">{{ item }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * ResumeSkills - 技能列表组件（紧凑标签风格）
 */
import type { SkillCategory } from '@/types/resume';

defineProps<{
  /** 区块标题 */
  title: string;
  /** 技能分类列表 */
  skills?: SkillCategory[];
}>();
</script>

<style lang="scss" scoped>
@use './section-common';

.tag-group {
  margin-bottom: 6pt;
}

.tag-group__title {
  font-size: 11pt;
  font-weight: 600;
  margin-bottom: 3pt;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3pt;
}
</style>
