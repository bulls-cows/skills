<script setup lang="ts">
/**
 * ResumeExperience - 工作经历组件
 *
 * 职责: 按时间倒序列出工作经历，包括公司名称、职位、时间范围、标签和详细描述
 *
 * 数据流向:
 *   - 父组件通过 Props 传入标题和工作经历数组（Experience[]）
 *   - 纯展示组件，无内部状态，无事件派发
 *
 * 核心业务流程:
 *   - experience 为空数组或 undefined 时整个区块不渲染
 *   - 每条经历包含公司信息（支持链接跳转）、职位、时间范围和描述列表
 *   - 描述内容通过 v-html 渲染，支持富文本格式
 */
import type { Experience } from '@/types/resume';

defineProps<{
  /** 区块标题 */
  title: string;
  /** 工作经历列表 */
  experience?: Experience[];
}>();
</script>

<template>
  <!-- 工作经历区块 -->
  <section v-if="experience?.length" class="resume-experience">
    <h2 class="resume-experience__title">{{ title }}</h2>
    <!-- 工作经历循环 -->
    <div v-for="(exp, i) in experience" :key="i" class="resume-experience__item">
      <!-- 经历头部：公司 + 职位 + 时间 -->
      <div class="resume-experience__item-header">
        <div>
          <div class="resume-experience__company">
            <a v-if="exp.url" :href="exp.url" target="_blank">{{ exp.organization }}</a>
            <template v-else>{{ exp.organization }}</template>
            <!-- 公司标签 -->
            <span v-if="exp.tags?.length" class="resume-experience__company-tags">
              <span v-for="tag in exp.tags" :key="tag" class="resume-experience__company-tag">{{
                tag
              }}</span>
            </span>
          </div>
          <div class="resume-experience__position">{{ exp.position || '' }}</div>
        </div>
        <div class="resume-experience__date">
          {{ exp.startDate || '' }} - {{ exp.endDate || '' }}
        </div>
      </div>
      <!-- 工作描述列表 -->
      <ul class="resume-experience__desc-list">
        <li v-for="(desc, j) in exp.descriptions" :key="j" v-html="desc"></li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* 区块容器 */
.resume-experience {
  margin-bottom: 24px;

  @media print {
    break-inside: avoid;
  }
}

/* 区块标题 */
.resume-experience__title {
  font-size: 18px;
  color: var(--primary, #2c3e50);
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
  margin-bottom: 12px;

  @media print {
    break-after: avoid;
  }
}

/* 单条经历 */
.resume-experience__item {
  margin-bottom: 16px;

  @media print {
    break-inside: avoid;
  }
}

/* 经历头部信息行 */
.resume-experience__item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

/* 公司名称 */
.resume-experience__company {
  font-size: 15px;
  font-weight: 600;
  color: #222;
}

/* 职位 */
.resume-experience__position {
  font-size: 14px;
  color: #444;
}

/* 日期 */
.resume-experience__date {
  font-size: 13px;
  color: #888;
}

/* 公司标签容器 */
.resume-experience__company-tags {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 12px;
}

/* 公司标签项 */
.resume-experience__company-tag {
  font-size: 9px;
  padding: 0 3px;
  border: 1px solid #333;
  color: #333;
}

/* 描述列表 */
.resume-experience__desc-list {
  strong {
    font-weight: 600;
  }

  .num {
    position: relative;
    top: -1.2pt;
  }
}

ul {
  margin-left: 20px;
  font-size: 14px;
  color: #444;
}

li {
  margin-bottom: 4px;
}
</style>
