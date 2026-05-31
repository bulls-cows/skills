<script setup lang="ts">
/**
 * ResumeProjects - 项目经历组件
 *
 * 职责: 按时间倒序列出项目经历，支持三种变体
 */
import type { Project } from '@/types/resume';

defineProps<{
  /** 区块标题 */
  title: string;
  /** 项目经历列表 */
  projects?: Project[];
  /** 项目变体类型 */
  variant?: 'tech' | 'submission' | 'tools';
}>();
</script>

<template>
  <!-- 项目经历区块 -->
  <section v-if="projects?.length" class="resume-section">
    <div class="section-header">
      <div class="section-header__left">{{ title }}</div>
    </div>
    <!-- 项目经历循环 -->
    <div v-for="(proj, i) in projects" :key="'proj-' + i" class="proj-item">
      <!-- 项目头部 -->
      <div class="proj-item__header">
        <div class="proj-item__left">
          <div class="proj-item__duration">
            {{ proj.startDate || '' }} ~ {{ proj.endDate || '' }}
          </div>
          <a v-if="proj.url" :href="proj.url" target="_blank" class="proj-item__name">{{
            proj.name
          }}</a>
          <span v-else class="proj-item__name">{{ proj.name }}</span>
        </div>
        <div class="proj-item__right">{{ proj.role || '' }}</div>
      </div>
      <!-- 变体特定信息 -->
      <div v-if="variant === 'tech' && proj.techStack" class="proj-item__variant">
        {{ proj.techStack }}
      </div>
      <div v-if="variant === 'submission' && proj.submissionType" class="proj-item__variant">
        {{ proj.submissionType }}
      </div>
      <div v-if="variant === 'tools' && proj.toolsMethods" class="proj-item__variant">
        {{ proj.toolsMethods }}
      </div>
      <!-- 描述列表 -->
      <ul v-if="proj.descriptions?.length" class="desc-list">
        <li v-for="(desc, j) in proj.descriptions" :key="j" v-html="desc"></li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use './section-common';

.proj-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3pt;
  margin-top: 6pt;
}

.proj-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 11pt;
}

.proj-item__left {
  display: inline-flex;
  align-items: center;
  gap: 12pt;
}

.proj-item__duration {
  white-space: nowrap;
}

.proj-item__name {
  font-weight: 600;
  color: #000;
  text-decoration: none;
}

.proj-item__right {
  font-weight: 600;
  font-size: 11pt;
}

.proj-item__variant {
  font-size: 11pt;
  margin-left: 2em;
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
