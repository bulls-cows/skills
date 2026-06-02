<template>
  <div class="resume-preview">
    <div v-for="page in data.pages" :key="page.id" class="resume-preview__page">
      <div
        v-for="block in page.blocks"
        :key="block.id"
        :ref="el => setBlockElement(page.id, block.id, el)"
        class="resume-preview__block"
        :class="{
          'resume-preview__block--active': isActiveBlock(page.id, block.id),
        }"
      >
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
      </div>
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
import { nextTick, watch, type ComponentPublicInstance } from 'vue';
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

const props = defineProps<{
  data: ResumeData;
  activeTarget: { pageId: string; blockId: string } | null;
}>();

const blockElements = new Map<string, Element>();

function getBlockKey(pageId: string, blockId: string) {
  return `${pageId}:${blockId}`;
}

function setBlockElement(
  pageId: string,
  blockId: string,
  el: Element | ComponentPublicInstance | null
) {
  const key = getBlockKey(pageId, blockId);
  const element = el instanceof Element ? el : el?.$el;
  if (element instanceof Element) {
    blockElements.set(key, element);
    return;
  }
  blockElements.delete(key);
}

function isActiveBlock(pageId: string, blockId: string) {
  return props.activeTarget?.pageId === pageId && props.activeTarget.blockId === blockId;
}

watch(
  () => props.activeTarget,
  async target => {
    if (!target) return;
    await nextTick();
    blockElements.get(getBlockKey(target.pageId, target.blockId))?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
);
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

/* 预览区块容器 */
.resume-preview__block {
  margin: -3pt;
  padding: 3pt;
  border-radius: 4pt;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.resume-preview__block--active {
  background: rgba(59, 130, 246, 0.08);
  box-shadow: 0 0 0 2pt rgba(59, 130, 246, 0.65);
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
  overflow: hidden;
}

/* 打印样式 */
@media print {
  .resume-preview {
    width: 100%;
    overflow: visible;
    padding: 0;
    background: #fff;
  }

  .resume-preview__block--active {
    background: transparent;
    box-shadow: none;
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
