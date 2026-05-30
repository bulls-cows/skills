<script setup lang="ts">
/**
 * ResumePublications - 发表物/出版物组件
 */
import type { Publication } from '@/types/resume';

defineProps<{
  /** 区块标题 */
  title: string;
  /** 出版物列表 */
  publications?: Publication[];
}>();
</script>

<template>
  <!-- 出版物区块 -->
  <section v-if="publications?.length" class="resume-section">
    <div class="section-header">
      <div class="section-header__left">{{ title }}</div>
    </div>
    <div v-for="(pub, i) in publications" :key="i" class="pub-item">
      <div class="pub-item__title">{{ pub.title || '' }}</div>
      <div class="pub-item__authors">
        {{ pub.authors || '' }}
        <template v-if="pub.journal"> · {{ pub.journal }}</template>
        <template v-if="pub.year"> · {{ pub.year }}</template>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use './section-common';

.pub-item {
  font-size: 11pt;
  line-height: 1.8;
  width: 100%;
  margin-top: 3pt;
}

.pub-item__title {
  font-weight: 600;
}

.pub-item__authors {
  font-size: 11pt;
}
</style>
