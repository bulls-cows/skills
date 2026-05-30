<script setup lang="ts">
/**
 * ResumePublications - 发表物/出版物组件
 *
 * 职责: 以列表形式展示发表物信息，包括标题、作者、期刊和年份
 *
 * 数据流向:
 *   - 父组件通过 Props 传入标题和出版物数组（Publication[]）
 *   - 纯展示组件，无内部状态，无事件派发
 *
 * 核心业务流程:
 *   - publications 为空数组或 undefined 时整个区块不渲染
 *   - 每条发表物显示标题、作者，期刊和年份为可选附加信息
 */
import type { Publication } from '@/types/resume';

defineProps<{
  /** 区块标题 */
  title: string;
  /** 出版物列表 */
  publications?: Publication[];
}>();
</script>

<template>
  <!-- 出版物区块 -->
  <section v-if="publications?.length" class="resume-publications">
    <h2 class="resume-publications__title">{{ title }}</h2>
    <!-- 出版物循环 -->
    <div v-for="(pub, i) in publications" :key="i" class="resume-publications__item">
      <div class="resume-publications__title-text">{{ pub.title || '' }}</div>
      <div class="resume-publications__authors">
        {{ pub.authors || '' }}
        <template v-if="pub.journal">
          · <span class="resume-publications__journal">{{ pub.journal }}</span></template
        >
        <template v-if="pub.year">
          · <span class="resume-publications__year">{{ pub.year }}</span></template
        >
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* 区块容器 */
.resume-publications {
  margin-bottom: 24px;

  @media print {
    break-inside: avoid;
  }
}

/* 区块标题 */
.resume-publications__title {
  font-size: 18px;
  color: var(--primary, #2c3e50);
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
  margin-bottom: 12px;

  @media print {
    break-after: avoid;
  }
}

/* 单条出版物 */
.resume-publications__item {
  margin-bottom: 10px;
  font-size: 14px;
  color: #444;

  @media print {
    break-inside: avoid;
  }
}

/* 出版物标题 */
.resume-publications__title-text {
  font-weight: 600;
  color: #222;
}

/* 作者信息 */
.resume-publications__authors {
  color: #666;
  font-size: 13px;
}

/* 期刊名称 */
.resume-publications__journal {
  color: var(--primary, #2c3e50);
  font-style: italic;
}

/* 发表年份 */
.resume-publications__year {
  color: #888;
}
</style>
