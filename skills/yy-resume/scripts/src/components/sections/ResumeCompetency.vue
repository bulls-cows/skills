<script setup lang="ts">
/**
 * ResumeCompetency - 核心竞争力组件
 *
 * 职责: 以标签列表形式展示核心竞争力关键词
 *
 * 数据流向:
 *   - 父组件通过 Props 传入标题和核心竞争力字符串数组
 *   - 纯展示组件，无内部状态，无事件派发
 *
 * 核心业务流程:
 *   - competencies 为空数组或 undefined 时整个区块不渲染
 *   - 每个核心竞争力以标签样式展示
 */
defineProps<{
  /** 区块标题 */
  title: string;
  /** 核心竞争力列表 */
  competencies?: string[];
}>();
</script>

<template>
  <!-- 核心竞争力区块 -->
  <section v-if="competencies?.length" class="resume-competency">
    <h2 class="resume-competency__title">{{ title }}</h2>
    <!-- 核心竞争力标签列表 -->
    <div class="resume-competency__list">
      <span v-for="item in competencies" :key="item" class="resume-competency__tag">{{
        item
      }}</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* 区块容器 */
.resume-competency {
  margin-bottom: 24px;

  @media print {
    break-inside: avoid;
  }
}

/* 区块标题 */
.resume-competency__title {
  font-size: 18px;
  color: var(--primary, #2c3e50);
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
  margin-bottom: 12px;

  @media print {
    break-after: avoid;
  }
}

/* 标签列表容器 */
.resume-competency__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* 标签项 */
.resume-competency__tag {
  display: inline-block;
  background: var(--tag-bg, #eef1f5);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  color: var(--primary, #2c3e50);
  border: 1px solid var(--tag-border, #d7dde6);
}
</style>
