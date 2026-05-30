<script setup lang="ts">
/**
 * ResumeSummary - 简历摘要/概述组件（DescBlock 风格）
 *
 * 职责: 展示简历顶部个人综述段落，使用 DescBlock 样式包装
 */
defineProps<{
  /** 区块标题 */
  title: string;
  /** 个人概述/摘要（支持 HTML 格式） */
  summary?: string;
}>();
</script>

<template>
  <!-- 个人概述区块 -->
  <section v-if="summary" class="resume-section">
    <div class="section-header">
      <div class="section-header__left">{{ title }}</div>
    </div>
    <div class="desc-block" v-html="summary"></div>
  </section>
</template>

<style lang="scss" scoped>
@use './section-common';

.desc-block {
  display: block;
  font-size: 0;
  width: 100%;
  :deep(*) {
    font-size: 11pt;
    font-weight: 400;
    line-height: 1.8;
  }
  :deep(strong) {
    font-weight: 600;
  }
}
</style>
