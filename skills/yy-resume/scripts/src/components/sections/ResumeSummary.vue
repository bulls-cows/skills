<script setup lang="ts">
/**
 * ResumeSummary - 简历摘要/概述组件
 *
 * 职责: 展示简历顶部个人综述段落，使用 v-html 支持富文本内容
 *
 * 数据流向:
 *   - 父组件通过 Props 传入标题和 HTML 格式的摘要内容
 *   - 纯展示组件，无内部状态，无事件派发
 *
 * 核心业务流程:
 *   - summary 为空时整个区块不渲染
 *   - 内容通过 v-html 渲染，支持富文本格式
 */
defineProps<{
  /** 区块标题 */
  title: string;
  /** 个人概述/摘要（支持 HTML 格式） */
  summary?: string;
}>();
</script>

<template>
  <!-- 个人概述区块 -->
  <section v-if="summary" class="resume-summary">
    <h2 class="resume-summary__title">{{ title }}</h2>
    <!-- 摘要内容（支持富文本） -->
    <div class="resume-summary__content" v-html="summary"></div>
  </section>
</template>

<style lang="scss" scoped>
/* 区块容器 */
.resume-summary {
  margin-bottom: 24px;

  @media print {
    break-inside: avoid;
  }
}

/* 区块标题 */
.resume-summary__title {
  font-size: 18px;
  color: var(--primary, #2c3e50);
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
  margin-bottom: 12px;

  @media print {
    break-after: avoid;
  }
}

/* 摘要内容 */
.resume-summary__content {
  font-size: 14px;
  color: #444;
}

.resume-summary__content strong {
  font-weight: 600;
}
</style>
