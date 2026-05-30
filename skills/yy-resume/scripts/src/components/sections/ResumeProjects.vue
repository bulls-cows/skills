<script setup lang="ts">
import type { Project } from '@/types/resume';

defineProps<{
  title: string;
  projects?: Project[];
  variant?: 'tech' | 'submission' | 'tools';
}>();
</script>

<template>
  <section v-if="projects?.length">
    <h2>{{ title }}</h2>
    <div v-for="(proj, i) in projects" :key="i" class="project-item">
      <div class="item-header">
        <div>
          <div class="project-name">
            <a v-if="proj.url" :href="proj.url" target="_blank">{{ proj.name }}</a>
            <template v-else>{{ proj.name }}</template>
          </div>
          <div class="role">{{ proj.role || '' }}</div>
        </div>
        <div class="date">{{ proj.startDate || '' }} - {{ proj.endDate || '' }}</div>
      </div>
      <div v-if="variant === 'tech' && proj.techStack" class="tech-stack">{{ proj.techStack }}</div>
      <div v-if="variant === 'submission' && proj.submissionType" class="submission-type">
        {{ proj.submissionType }}
      </div>
      <div v-if="variant === 'tools' && proj.toolsMethods" class="tools-methods">
        {{ proj.toolsMethods }}
      </div>
      <ul class="desc-list">
        <li v-for="(desc, j) in proj.descriptions" :key="j" v-html="desc"></li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-bottom: 24px;

  @media print {
    break-inside: avoid;
  }
}

h2 {
  font-size: 18px;
  color: var(--primary, #2c3e50);
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
  margin-bottom: 12px;

  @media print {
    break-after: avoid;
  }
}

.project-item {
  margin-bottom: 16px;

  @media print {
    break-inside: avoid;
  }
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.project-name {
  font-size: 15px;
  font-weight: 600;
  color: #222;
}

.role {
  font-size: 14px;
  color: #444;
}

.date {
  font-size: 13px;
  color: #888;
}

.tech-stack,
.submission-type,
.tools-methods {
  font-size: 13px;
  color: var(--primary, #2c3e50);
  margin: 4px 0 6px;
}

.desc-list {
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
