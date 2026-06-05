<template>
  <!-- 教育经历区块 -->
  <section v-if="education?.length" class="resume-section">
    <div class="section-header">
      <div class="section-header__left">{{ title }}</div>
    </div>
    <div v-for="(edu, i) in education" :key="'edu-' + i" class="edu-item">
      <div class="edu-item__header">
        <div class="edu-item__left">
          <div class="edu-item__duration">{{ edu.startDate || '' }} ~ {{ edu.endDate || '' }}</div>
          <span class="edu-item__school">{{ edu.school || '' }}</span>
        </div>
        <div class="edu-item__right">{{ edu.major || '' }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * ResumeEducation - 教育经历组件
 */

defineProps<{
  /** 区块标题 */
  title: string;
  /** 教育经历列表 */
  education?: Education[];
}>();
</script>

<style lang="scss" scoped>
@use './section-common';

.edu-item {
  width: 100%;
  margin-top: 6pt;
}

.edu-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 11pt;
}

.edu-item__left {
  display: inline-flex;
  align-items: center;
  gap: 12pt;
}

.edu-item__duration {
  white-space: nowrap;
}

.edu-item__school {
  font-weight: 400;
}

.edu-item__right {
  font-weight: 400;
  font-size: 11pt;
}
</style>
