<script setup lang="ts">
import type { ResumeData, SectionConfig } from '@/types/resume'
import { profiles } from '@/data/profiles'
import ResumeHeader from './sections/ResumeHeader.vue'
import ResumeSummary from './sections/ResumeSummary.vue'
import ResumeSkills from './sections/ResumeSkills.vue'
import ResumeCompetency from './sections/ResumeCompetency.vue'
import ResumeRegulatory from './sections/ResumeRegulatory.vue'
import ResumeExperience from './sections/ResumeExperience.vue'
import ResumeProjects from './sections/ResumeProjects.vue'
import ResumeEducation from './sections/ResumeEducation.vue'
import ResumeCerts from './sections/ResumeCerts.vue'
import ResumePublications from './sections/ResumePublications.vue'
import { computed } from 'vue'

const props = defineProps<{
  data: ResumeData
}>()

const theme = computed(() => {
  const profile = profiles[props.data.template] || profiles.general
  return profile.theme
})

const profile = computed(() => {
  return profiles[props.data.template] || profiles.general
})
</script>

<template>
  <div class="preview-pane">
    <div
      class="resume-wrapper"
      :style="{
        '--primary': theme.primary,
        '--tag-bg': theme.tagBg,
        '--tag-border': theme.tagBorder,
      }"
    >
      <template v-for="section in profile.sections" :key="section.id">
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
        <ResumeSummary
          v-else-if="section.id === 'summary'"
          :title="section.title || ''"
          :summary="data.summary"
        />
        <ResumeSkills
          v-else-if="section.id === 'skills'"
          :title="section.title || ''"
          :skills="data.skills"
        />
        <ResumeCompetency
          v-else-if="section.id === 'competency'"
          :title="section.title || ''"
          :competencies="data.competencies"
        />
        <ResumeRegulatory
          v-else-if="section.id === 'regulatory'"
          :title="section.title || ''"
          :regulatory-systems="data.regulatorySystems"
        />
        <ResumeExperience
          v-else-if="section.id === 'experience'"
          :title="section.title || ''"
          :experience="data.experience"
        />
        <ResumeProjects
          v-else-if="section.id === 'projects'"
          :title="section.title || ''"
          :projects="data.projects"
          :variant="section.variant"
        />
        <ResumeEducation
          v-else-if="section.id === 'education'"
          :title="section.title || ''"
          :education="data.education"
        />
        <ResumeCerts
          v-else-if="section.id === 'certs'"
          :title="section.title || ''"
          :certs="data.certs"
        />
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
.preview-pane {
  width: 50%;
  overflow: auto;
  padding: 20px;
  background: #f0f2f5;
}

.resume-wrapper {
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

@media print {
  .preview-pane {
    width: 100%;
    overflow: visible;
    padding: 0;
    background: white;
  }
}
</style>
