<script setup lang="ts">
/**
 * ResumeEducation - 教育经历组件
 *
 * 职责: 按时间倒序列出教育经历，包括学校名称、专业和时间范围
 *
 * 数据流向:
 *   - 父组件通过 Props 传入标题和教育经历数组（Education[]）
 *   - 纯展示组件，无内部状态，无事件派发
 *
 * 核心业务流程:
 *   - education 为空数组或 undefined 时整个区块不渲染
 *   - 每条教育经历包含学校、专业和时间范围
 */
import type { Education } from '@/types/resume';

defineProps<{
  /** 区块标题 */
  title: string;
  /** 教育经历列表 */
  education?: Education[];
}>();
</script>

<template>
  <!-- 教育经历区块 -->
  <section v-if="education?.length" class="resume-education">
    <h2 class="resume-education__title">{{ title }}</h2>
    <!-- 教育经历循环 -->
    <div v-for="(edu, i) in education" :key="i" class="resume-education__item">
      <!-- 教育头部：学校 + 专业 + 时间 -->
      <div class="resume-education__item-header">
        <div>
          <div class="resume-education__school">{{ edu.school || '' }}</div>
          <div class="resume-education__degree">{{ edu.major || '' }}</div>
        </div>
        <div class="resume-education__date">
          {{ edu.startDate || '' }} - {{ edu.endDate || '' }}
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* 区块容器 */
.resume-education {
  margin-bottom: 24px;

  @media print {
    break-inside: avoid;
  }
}

/* 区块标题 */
.resume-education__title {
  font-size: 18px;
  color: var(--primary, #2c3e50);
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
  margin-bottom: 12px;

  @media print {
    break-after: avoid;
  }
}

/* 单条教育经历 */
.resume-education__item {
  margin-bottom: 16px;

  @media print {
    break-inside: avoid;
  }
}

/* 教育头部信息行 */
.resume-education__item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

/* 学校名称 */
.resume-education__school {
  font-size: 15px;
  font-weight: 600;
  color: #222;
}

/* 专业/学位 */
.resume-education__degree {
  font-size: 14px;
  color: #444;
}

/* 日期 */
.resume-education__date {
  font-size: 13px;
  color: #888;
}
</style>
