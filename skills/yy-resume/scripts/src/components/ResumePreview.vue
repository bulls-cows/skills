<script setup lang="ts">
/**
 * ResumePreview - 简历预览面板
 *
 * 【职责】
 * 根据简历数据和模板配置，动态渲染各章节组件，生成简历预览
 *
 * 【数据流向】
 * - 接收: data (ResumeData 简历数据)
 * - 从 profiles 获取模板配置（主题色、章节列表、头部链接显示）
 *
 * 【交互关系】
 * - 依赖 profiles 数据源获取模板配置
 * - 按 profile.sections 动态渲染对应的章节子组件
 *
 * 【核心流程】
 * 接收 data → 根据 data.template 获取 profile → 遍历 profile.sections → 动态渲染对应章节组件
 */
import { computed } from 'vue';
import type { ResumeData } from '@/types/resume';
import { profiles } from '@/data/profiles';
import ResumeHeader from './sections/ResumeHeader.vue';
import ResumeSummary from './sections/ResumeSummary.vue';
import ResumeSkills from './sections/ResumeSkills.vue';
import ResumeCompetency from './sections/ResumeCompetency.vue';
import ResumeRegulatory from './sections/ResumeRegulatory.vue';
import ResumeExperience from './sections/ResumeExperience.vue';
import ResumeProjects from './sections/ResumeProjects.vue';
import ResumeEducation from './sections/ResumeEducation.vue';
import ResumeCerts from './sections/ResumeCerts.vue';
import ResumePublications from './sections/ResumePublications.vue';

// Props: 接收简历数据
const props = defineProps<{
  data: ResumeData;
}>();

// 当前模板的主题色配置
const theme = computed(() => {
  const profile = profiles[props.data.template] || profiles.general;
  return profile.theme;
});

// 当前模板的完整配置（章节列表、头部链接等）
const profile = computed(() => {
  return profiles[props.data.template] || profiles.general;
});
</script>

<template>
  <!-- 预览面板根容器 -->
  <div class="resume-preview">
    <!-- 简历内容容器，绑定 CSS 变量用于主题色 -->
    <div
      class="resume-preview__wrapper"
      :style="{
        '--primary': theme.primary,
        '--tag-bg': theme.tagBg,
        '--tag-border': theme.tagBorder,
      }"
    >
      <!-- 按模板配置的章节顺序动态渲染 -->
      <template v-for="section in profile.sections" :key="section.id">
        <!-- 个人信息头部 -->
        <ResumeHeader
          v-if="section.id === 'header'"
          :name="data.name"
          :title="data.title"
          :city="data.city"
          :phone="data.phone"
          :email="data.email"
          :links="data.links"
          :show-links="profile.headerLinks"
        />
        <!-- 个人简介 -->
        <ResumeSummary
          v-else-if="section.id === 'summary'"
          :title="section.title || ''"
          :summary="data.summary"
        />
        <!-- 技能列表 -->
        <ResumeSkills
          v-else-if="section.id === 'skills'"
          :title="section.title || ''"
          :skills="data.skills"
        />
        <!-- 核心胜任力 -->
        <ResumeCompetency
          v-else-if="section.id === 'competency'"
          :title="section.title || ''"
          :competencies="data.competencies"
        />
        <!-- 法规体系 -->
        <ResumeRegulatory
          v-else-if="section.id === 'regulatory'"
          :title="section.title || ''"
          :regulatory-systems="data.regulatorySystems"
        />
        <!-- 工作经历 -->
        <ResumeExperience
          v-else-if="section.id === 'experience'"
          :title="section.title || ''"
          :experience="data.experience"
        />
        <!-- 项目经验 -->
        <ResumeProjects
          v-else-if="section.id === 'projects'"
          :title="section.title || ''"
          :projects="data.projects"
          :variant="section.variant"
        />
        <!-- 教育背景 -->
        <ResumeEducation
          v-else-if="section.id === 'education'"
          :title="section.title || ''"
          :education="data.education"
        />
        <!-- 证书资质 -->
        <ResumeCerts
          v-else-if="section.id === 'certs'"
          :title="section.title || ''"
          :certs="data.certs"
        />
        <!-- 出版发表 -->
        <ResumePublications
          v-else-if="section.id === 'publications'"
          :title="section.title || ''"
          :publications="data.publications"
        />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 预览面板根容器 */
.resume-preview {
  width: 50%;
  overflow: auto;
  padding: 20px;
  background: #f0f2f5;
}

/* 简历内容容器，A4 尺寸 */
.resume-preview__wrapper {
  width: 210mm;
  min-height: 297mm;
  background: white;
  margin: 0 auto;
  padding: 20mm;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media print {
    box-shadow: none;
    margin: 0;
    width: 100%;
    height: auto;
    min-height: auto;
  }
}

/* 打印时预览面板全屏显示 */
@media print {
  .resume-preview {
    width: 100%;
    overflow: visible;
    padding: 0;
    background: white;
  }
}
</style>
