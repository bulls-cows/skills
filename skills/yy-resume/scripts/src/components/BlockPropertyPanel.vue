<script setup lang="ts">
/**
 * BlockPropertyPanel - 区块属性面板
 *
 * 根据选中的区块类型，动态分发到对应的属性编辑器
 * 编辑 resumeData 中对应字段的数据
 */
import type { BlockConfig, ResumeData } from '@/types/resume';
import HeaderEditor from './property-editors/HeaderEditor.vue';
import SummaryEditor from './property-editors/SummaryEditor.vue';
import SkillsEditor from './property-editors/SkillsEditor.vue';
import CompetencyEditor from './property-editors/CompetencyEditor.vue';
import RegulatoryEditor from './property-editors/RegulatoryEditor.vue';
import ExperienceEditor from './property-editors/ExperienceEditor.vue';
import ProjectsEditor from './property-editors/ProjectsEditor.vue';
import EducationEditor from './property-editors/EducationEditor.vue';
import CertsEditor from './property-editors/CertsEditor.vue';
import PublicationsEditor from './property-editors/PublicationsEditor.vue';

const props = defineProps<{
  block: BlockConfig | null;
  data: ResumeData;
}>();

const emit = defineEmits<{
  (e: 'update:data', value: ResumeData): void;
}>();

function updateField(field: string, value: unknown) {
  emit('update:data', { ...props.data, [field]: value });
}

function updateBlock(block: BlockConfig) {
  const pages = props.data.pages.map(page => ({
    ...page,
    blocks: page.blocks.map(b => (b.id === block.id ? block : b)),
  }));
  emit('update:data', { ...props.data, pages });
}
</script>

<template>
  <div class="property-panel">
    <div v-if="!block" class="property-panel__empty">请选择一个区块进行编辑</div>
    <template v-else>
      <!-- header 区块 -->
      <HeaderEditor
        v-if="block.type === 'header'"
        :name="data.name || ''"
        :title="data.title || ''"
        :city="data.city || ''"
        :phone="data.phone || ''"
        :email="data.email || ''"
        :links="data.links || []"
        @update:name="updateField('name', $event)"
        @update:title="updateField('title', $event)"
        @update:city="updateField('city', $event)"
        @update:phone="updateField('phone', $event)"
        @update:email="updateField('email', $event)"
        @update:links="updateField('links', $event)"
      />

      <!-- summary 区块 -->
      <SummaryEditor
        v-else-if="block.type === 'summary'"
        :block-title="block.title || ''"
        :summary="data.summary || ''"
        @update:block-title="updateBlock({ ...block, title: $event })"
        @update:summary="updateField('summary', $event)"
      />

      <!-- skills 区块 -->
      <SkillsEditor
        v-else-if="block.type === 'skills'"
        :block-title="block.title || ''"
        :skills="data.skills || []"
        @update:block-title="updateBlock({ ...block, title: $event })"
        @update:skills="updateField('skills', $event)"
      />

      <!-- competency 区块 -->
      <CompetencyEditor
        v-else-if="block.type === 'competency'"
        :block-title="block.title || ''"
        :competencies="data.competencies || []"
        @update:block-title="updateBlock({ ...block, title: $event })"
        @update:competencies="updateField('competencies', $event)"
      />

      <!-- regulatory 区块 -->
      <RegulatoryEditor
        v-else-if="block.type === 'regulatory'"
        :block-title="block.title || ''"
        :regulatory-systems="data.regulatorySystems || []"
        @update:block-title="updateBlock({ ...block, title: $event })"
        @update:regulatory-systems="updateField('regulatorySystems', $event)"
      />

      <!-- experience 区块 -->
      <ExperienceEditor
        v-else-if="block.type === 'experience'"
        :block-title="block.title || ''"
        :experience="data.experience || []"
        @update:block-title="updateBlock({ ...block, title: $event })"
        @update:experience="updateField('experience', $event)"
      />

      <!-- projects 区块 -->
      <ProjectsEditor
        v-else-if="block.type === 'projects'"
        :block-title="block.title || ''"
        :variant="block.variant || ''"
        :projects="data.projects || []"
        @update:block-title="updateBlock({ ...block, title: $event })"
        @update:variant="
          updateBlock({ ...block, variant: $event as 'tech' | 'submission' | 'tools' | undefined })
        "
        @update:projects="updateField('projects', $event)"
      />

      <!-- education 区块 -->
      <EducationEditor
        v-else-if="block.type === 'education'"
        :block-title="block.title || ''"
        :education="data.education || []"
        @update:block-title="updateBlock({ ...block, title: $event })"
        @update:education="updateField('education', $event)"
      />

      <!-- certs 区块 -->
      <CertsEditor
        v-else-if="block.type === 'certs'"
        :block-title="block.title || ''"
        :certs="data.certs || []"
        @update:block-title="updateBlock({ ...block, title: $event })"
        @update:certs="updateField('certs', $event)"
      />

      <!-- publications 区块 -->
      <PublicationsEditor
        v-else-if="block.type === 'publications'"
        :block-title="block.title || ''"
        :publications="data.publications || []"
        @update:block-title="updateBlock({ ...block, title: $event })"
        @update:publications="updateField('publications', $event)"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.property-panel {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  border-top: 1px solid #e5e7eb;
  background: #fafafa;
}

.property-panel__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #9ca3af;
  font-size: 13px;
}
</style>
