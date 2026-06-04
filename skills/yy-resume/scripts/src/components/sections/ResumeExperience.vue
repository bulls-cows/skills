<template>
  <!-- 工作经历区块 -->
  <section v-if="experience?.length" class="resume-section">
    <div class="section-header">
      <div class="section-header__left">{{ title }}</div>
    </div>
    <!-- 工作经历循环 -->
    <div v-for="(exp, i) in experience" :key="'exp-' + i" class="exp-item">
      <!-- 经历头部 -->
      <div class="exp-item__header">
        <div class="exp-item__left">
          <div class="exp-item__duration">{{ exp.startDate || '' }} ~ {{ exp.endDate || '' }}</div>
          <a v-if="exp.url" :href="exp.url" target="_blank" class="exp-item__org">{{
            exp.organization
          }}</a>
          <span v-else class="exp-item__org">{{ exp.organization }}</span>
          <span v-if="exp.tags?.length" class="exp-item__tags">
            <span v-for="tag in exp.tags" :key="tag" class="tag">{{ tag }}</span>
          </span>
        </div>
        <div class="exp-item__right">{{ exp.position || '' }}</div>
      </div>
      <!-- 描述列表 -->
      <ul v-if="exp.descriptions?.length" class="desc-list">
        <li v-for="(desc, j) in exp.descriptions" :key="j" v-html="desc"></li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * ResumeExperience - 工作经历组件
 *
 * 职责: 按时间倒序列出工作经历，SectionBox + WorkExperience 风格
 */

defineProps<{
  /** 区块标题 */
  title: string;
  /** 工作经历列表 */
  experience?: Experience[];
}>();
</script>

<style lang="scss" scoped>
@use './section-common';

.exp-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3pt;
  margin-top: 6pt;
}

.exp-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 11pt;
}

.exp-item__left {
  display: inline-flex;
  align-items: center;
  gap: 12pt;
}

.exp-item__duration {
  white-space: nowrap;
}

.exp-item__org {
  font-weight: 400;
  color: #000;
  text-decoration: none;
}

.exp-item__tags {
  display: inline-flex;
  align-items: center;
  gap: 3pt;
}

.exp-item__right {
  font-weight: 400;
  font-size: 11pt;
}

.desc-list {
  font-size: 11pt;
  line-height: 1.8;
  margin-left: 2em;
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 0;
  }

  :deep(strong) {
    font-weight: 600;
  }

  :deep(.num) {
    position: relative;
    top: -1.2pt;
  }
}
</style>
