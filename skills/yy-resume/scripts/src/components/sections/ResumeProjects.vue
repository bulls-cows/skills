<script setup lang="ts">
/**
 * ResumeProjects - 项目经历组件
 *
 * 职责: 按时间倒序列出项目经历，支持三种变体（tech/submission/tools），每种变体显示不同附加信息
 *
 * 数据流向:
 *   - 父组件通过 Props 传入标题、项目数组（Project[]）和变体类型
 *   - 纯展示组件，无内部状态，无事件派发
 *
 * 核心业务流程:
 *   - projects 为空数组或 undefined 时整个区块不渲染
 *   - 每条项目包含名称（支持链接跳转）、角色、时间范围、变体特定信息和描述列表
 *   - variant 控制附加信息的显示类型：tech→技术栈、submission→申报类型、tools→工具方法
 *   - 描述内容通过 v-html 渲染，支持富文本格式
 */
import type { Project } from '@/types/resume';

defineProps<{
  /** 区块标题 */
  title: string;
  /** 项目经历列表 */
  projects?: Project[];
  /** 项目变体类型，控制附加信息字段的显示 */
  variant?: 'tech' | 'submission' | 'tools';
}>();
</script>

<template>
  <!-- 项目经历区块 -->
  <section v-if="projects?.length" class="resume-projects">
    <h2 class="resume-projects__title">{{ title }}</h2>
    <!-- 项目经历循环 -->
    <div v-for="(proj, i) in projects" :key="i" class="resume-projects__item">
      <!-- 项目头部：名称 + 角色 + 时间 -->
      <div class="resume-projects__item-header">
        <div>
          <div class="resume-projects__name">
            <a v-if="proj.url" :href="proj.url" target="_blank">{{ proj.name }}</a>
            <template v-else>{{ proj.name }}</template>
          </div>
          <div class="resume-projects__role">{{ proj.role || '' }}</div>
        </div>
        <div class="resume-projects__date">
          {{ proj.startDate || '' }} - {{ proj.endDate || '' }}
        </div>
      </div>
      <!-- 变体特定信息 -->
      <div v-if="variant === 'tech' && proj.techStack" class="resume-projects__tech-stack">
        {{ proj.techStack }}
      </div>
      <div
        v-if="variant === 'submission' && proj.submissionType"
        class="resume-projects__submission-type"
      >
        {{ proj.submissionType }}
      </div>
      <div v-if="variant === 'tools' && proj.toolsMethods" class="resume-projects__tools-methods">
        {{ proj.toolsMethods }}
      </div>
      <!-- 项目描述列表 -->
      <ul class="resume-projects__desc-list">
        <li v-for="(desc, j) in proj.descriptions" :key="j" v-html="desc"></li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* 区块容器 */
.resume-projects {
  margin-bottom: 24px;

  @media print {
    break-inside: avoid;
  }
}

/* 区块标题 */
.resume-projects__title {
  font-size: 18px;
  color: var(--primary, #2c3e50);
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
  margin-bottom: 12px;

  @media print {
    break-after: avoid;
  }
}

/* 单条项目 */
.resume-projects__item {
  margin-bottom: 16px;

  @media print {
    break-inside: avoid;
  }
}

/* 项目头部信息行 */
.resume-projects__item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

/* 项目名称 */
.resume-projects__name {
  font-size: 15px;
  font-weight: 600;
  color: #222;
}

/* 角色 */
.resume-projects__role {
  font-size: 14px;
  color: #444;
}

/* 日期 */
.resume-projects__date {
  font-size: 13px;
  color: #888;
}

/* 技术栈 / 申报类型 / 工具方法 */
.resume-projects__tech-stack,
.resume-projects__submission-type,
.resume-projects__tools-methods {
  font-size: 13px;
  color: var(--primary, #2c3e50);
  margin: 4px 0 6px;
}

/* 描述列表 */
.resume-projects__desc-list {
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
