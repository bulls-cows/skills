<script setup lang="ts">
/**
 * ResumeHeader - 简历头部区块
 *
 * 展示姓名、联系信息、社交链接
 */
import type { ResumeData } from '@/types/resume';

defineProps<{
  data: ResumeData;
}>();
</script>

<template>
  <div>
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
    <div v-if="data.links?.length" class="resume-preview__links">
      <a v-for="link in data.links" :key="link.label" :href="link.url" target="_blank">
        {{ link.label }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.resume-preview__title {
  text-align: center;
  font-size: 20pt;
  line-height: 1.1;
  padding-bottom: 5pt;
}

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

.resume-preview__links {
  font-size: 11pt;
  text-align: center;
  a {
    color: #000;
    margin: 0 8pt;
  }
}
</style>
