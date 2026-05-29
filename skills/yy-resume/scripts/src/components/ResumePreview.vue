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
    <div class="resume-wrapper" :style="{
      '--primary': theme.primary,
      '--tag-bg': theme.tagBg,
      '--tag-border': theme.tagBorder,
    }">
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

<style scoped>
@use '../styles/editor' as *;
@use '../styles/resume';
</style>
