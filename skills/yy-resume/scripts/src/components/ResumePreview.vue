<script setup lang="ts">
/**
 * ResumePreview - 简历预览面板
 *
 * 【职责】
 * 根据简历数据和模板配置，动态渲染各章节组件，生成简历预览
 *
 * 【数据流向】
 * - 接收: data (ResumeData 简历数据)
 * - 从 profiles 获取模板配置（章节列表、头部链接显示）
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

// 当前模板的完整配置（章节列表、头部链接等）
const profile = computed(() => {
  return profiles[props.data.template] || profiles.general;
});
</script>

<template>
  <!-- 预览面板根容器 -->
  <div class="resume-preview">
    <!-- A4 页面容器 -->
    <div class="resume-preview__page">
      <!-- 简历标题 -->
      <div class="resume-preview__title">{{ data.name || '' }}的简历</div>

      <!-- 联系信息表 -->
      <div class="resume-preview__meta">
        <div class="meta-item" v-if="data.city">
          <span class="meta-label">坐标：</span>{{ data.city }}
        </div>
        <div class="meta-item" v-if="data.phone">
          <span class="meta-label">手机：</span>{{ data.phone }}
        </div>
        <div class="meta-item" v-if="data.email">
          <span class="meta-label">邮箱：</span>{{ data.email }}
        </div>
        <div class="meta-item" v-if="data.title">
          <span class="meta-label">职位：</span>{{ data.title }}
        </div>
      </div>

      <!-- 社交链接 -->
      <div v-if="profile.headerLinks && data.links?.length" class="resume-preview__links">
        <a v-for="link in data.links" :key="link.label" :href="link.url" target="_blank">
          {{ link.label }}
        </a>
      </div>

      <!-- 按模板配置的章节顺序动态渲染（跳过 header，已在上面直接渲染） -->
      <template v-for="section in profile.sections" :key="section.id">
        <!-- 个人简介 -->
        <ResumeSummary
          v-if="section.id === 'summary'"
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

/* 简历标题 */
.resume-preview__title {
  text-align: center;
  font-size: 20pt;
  line-height: 1.1;
  padding-bottom: 5pt;
}

/* 联系信息表 */
.resume-preview__meta {
  display: flex;
  flex-wrap: wrap;
  border: 0.75pt dashed #000;
  padding: 6pt;
  line-height: 1.8;
  width: 100%;
  gap: 0;
}

.meta-item {
  display: inline-flex;
  width: 50%;
  font-size: 11pt;
}

.meta-label {
  font-weight: 400;
}

/* 社交链接 */
.resume-preview__links {
  font-size: 11pt;
  text-align: center;
  a {
    color: #000;
    margin: 0 8pt;
  }
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
  }
}
</style>
