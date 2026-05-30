<script setup lang="ts">
import type { Experience } from '@/types/resume';

defineProps<{
  title: string;
  experience?: Experience[];
}>();
</script>

<template>
  <section v-if="experience?.length">
    <h2>{{ title }}</h2>
    <div v-for="(exp, i) in experience" :key="i" class="experience-item">
      <div class="item-header">
        <div>
          <div class="company">
            <a v-if="exp.url" :href="exp.url" target="_blank">{{ exp.organization }}</a>
            <template v-else>{{ exp.organization }}</template>
            <span v-if="exp.tags?.length" class="company-tags">
              <span v-for="tag in exp.tags" :key="tag" class="company-tag">{{ tag }}</span>
            </span>
          </div>
          <div class="position">{{ exp.position || '' }}</div>
        </div>
        <div class="date">{{ exp.startDate || '' }} - {{ exp.endDate || '' }}</div>
      </div>
      <ul class="desc-list">
        <li v-for="(desc, j) in exp.descriptions" :key="j" v-html="desc"></li>
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

.experience-item {
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

.company {
  font-size: 15px;
  font-weight: 600;
  color: #222;
}

.position {
  font-size: 14px;
  color: #444;
}

.date {
  font-size: 13px;
  color: #888;
}

.company-tags {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 12px;
}

.company-tag {
  font-size: 9px;
  padding: 0 3px;
  border: 1px solid #333;
  color: #333;
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
