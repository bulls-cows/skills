<template>
  <div class="resume-preview">
    <div v-for="page in data.pages" :key="page.id" class="resume-preview__page">
      <template v-for="block in page.blocks" :key="block.id">
        <!-- 头部信息 -->
        <ResumeHeader v-if="block.type === 'header'" :data="data" />
        <!-- 个人简介 -->
        <ResumeSummary
          v-else-if="block.type === 'summary'"
          :title="block.title || ''"
          :summary="data.summary"
        />
        <!-- 技能列表 -->
        <ResumeSkills
          v-else-if="block.type === 'skills'"
          :title="block.title || ''"
          :skills="data.skills"
        />
        <!-- 核心胜任力 -->
        <ResumeCompetency
          v-else-if="block.type === 'competency'"
          :title="block.title || ''"
          :competencies="data.competencies"
        />
        <!-- 法规体系 -->
        <ResumeRegulatory
          v-else-if="block.type === 'regulatory'"
          :title="block.title || ''"
          :regulatory-systems="data.regulatorySystems"
        />
        <!-- 工作经历 -->
        <ResumeExperience
          v-else-if="block.type === 'experience'"
          :title="block.title || ''"
          :experience="data.experience"
        />
        <!-- 项目经验 -->
        <ResumeProjects
          v-else-if="block.type === 'projects'"
          :title="block.title || ''"
          :projects="data.projects"
          :variant="block.variant"
        />
        <!-- 教育背景 -->
        <ResumeEducation
          v-else-if="block.type === 'education'"
          :title="block.title || ''"
          :education="data.education"
        />
        <!-- 证书资质 -->
        <ResumeCerts
          v-else-if="block.type === 'certs'"
          :title="block.title || ''"
          :certs="data.certs"
        />
        <!-- 出版发表 -->
        <ResumePublications
          v-else-if="block.type === 'publications'"
          :title="block.title || ''"
          :publications="data.publications"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ResumePreview - 简历预览面板
 *
 * 【职责】
 * 根据 pages 配置动态渲染多页简历，每页渲染对应的区块组件
 *
 * 【数据流向】
 * - 接收: data (ResumeData 简历数据)
 * - 根据 data.pages 遍历渲染每个页面的区块
 *
 * 【核心流程】
 * 接收 data → 遍历 data.pages → 每页遍历 blocks → 按 type 分发到对应章节组件
 */
import type { ResumeData } from '@/types/resume';
import ResumeHeader from './ResumeHeader.vue';
import ResumeSummary from './sections/ResumeSummary.vue';
import ResumeSkills from './sections/ResumeSkills.vue';
import ResumeCompetency from './sections/ResumeCompetency.vue';
import ResumeRegulatory from './sections/ResumeRegulatory.vue';
import ResumeExperience from './sections/ResumeExperience.vue';
import ResumeProjects from './sections/ResumeProjects.vue';
import ResumeEducation from './sections/ResumeEducation.vue';
import ResumeCerts from './sections/ResumeCerts.vue';
import ResumePublications from './sections/ResumePublications.vue';

defineProps<{
  data: ResumeData;
}>();
</script>

<style lang="scss" scoped>
/* 预览面板根容器 */
.resume-preview {
  flex: none;
  width: auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 50px 20px;
  background: #464646;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* A4 页面容器 */
.resume-preview__page {
  width: 190mm;
  min-height: 277mm;
  padding: 10mm;
  box-sizing: content-box;
  background: #fff;
  border: 0.75pt solid #666;
  display: flex;
  flex-direction: column;
  gap: 6pt;
  font-size: 12pt;
  line-height: 1.5;
  color: #000;
}

/* 打印样式 */
@media print {
  .resume-preview {
    width: 100%;
    overflow: visible;
    padding: 0;
    background: #fff;
  }

  .resume-preview__page {
    border: none;
    padding: 0;
    box-shadow: none;
    margin: 0;
    width: 100%;
    height: auto;
    min-height: auto;
    page-break-after: always;
  }

  .resume-preview__page:last-child {
    page-break-after: auto;
  }
}
</style>
