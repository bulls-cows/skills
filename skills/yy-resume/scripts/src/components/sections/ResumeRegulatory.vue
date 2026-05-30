<script setup lang="ts">
/**
 * ResumeRegulatory - 监管资质/合规体系组件（紧凑标签风格）
 */
import type { SkillCategory } from '@/types/resume';

defineProps<{
  /** 区块标题 */
  title: string;
  /** 监管体系分类列表 */
  regulatorySystems?: SkillCategory[];
}>();
</script>

<template>
  <!-- 监管资质区块 -->
  <section v-if="regulatorySystems?.length" class="resume-section">
    <div class="section-header">
      <div class="section-header__left">{{ title }}</div>
    </div>
    <div v-for="group in regulatorySystems" :key="group.category" class="tag-group">
      <h3 class="tag-group__title">{{ group.category }}</h3>
      <div class="tag-list">
        <span v-for="item in group.items" :key="item" class="tag">{{ item }}</span>
      </div>
    </div>
  </section>
</template>

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
