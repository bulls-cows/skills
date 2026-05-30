<script setup lang="ts">
/**
 * ResumeRegulatory - 监管资质/合规体系组件
 *
 * 职责: 按分类展示监管资质或合规体系的标签列表
 *
 * 数据流向:
 *   - 父组件通过 Props 传入标题和监管体系分类数组（SkillCategory[]）
 *   - 纯展示组件，无内部状态，无事件派发
 *
 * 核心业务流程:
 *   - regulatorySystems 为空数组或 undefined 时整个区块不渲染
 *   - 每个分类下以标签形式展示具体资质项
 */
import type { SkillCategory } from '@/types/resume';

defineProps<{
  /** 区块标题 */
  title: string;
  /** 监管体系分类列表 */
  regulatorySystems?: SkillCategory[];
}>();
</script>

<template>
  <!-- 监管资质区块 -->
  <section v-if="regulatorySystems?.length" class="resume-regulatory">
    <h2 class="resume-regulatory__title">{{ title }}</h2>
    <!-- 监管分类循环 -->
    <div v-for="group in regulatorySystems" :key="group.category" class="resume-regulatory__group">
      <h3 class="resume-regulatory__group-title">{{ group.category }}</h3>
      <!-- 资质标签列表 -->
      <div class="resume-regulatory__list">
        <span v-for="item in group.items" :key="item" class="resume-regulatory__tag">{{
          item
        }}</span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* 区块容器 */
.resume-regulatory {
  margin-bottom: 24px;

  @media print {
    break-inside: avoid;
  }
}

/* 区块标题 */
.resume-regulatory__title {
  font-size: 18px;
  color: var(--primary, #2c3e50);
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
  margin-bottom: 12px;

  @media print {
    break-after: avoid;
  }
}

/* 监管分类 */
.resume-regulatory__group {
  margin-bottom: 12px;

  h3 {
    font-size: 14px;
    font-weight: 600;
    color: #444;
    margin-bottom: 6px;
  }
}

/* 资质标签列表 */
.resume-regulatory__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* 资质标签项 */
.resume-regulatory__tag {
  display: inline-block;
  background: var(--tag-bg, #eef1f5);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  color: var(--primary, #2c3e50);
  border: 1px solid var(--tag-border, #d7dde6);
}

@media print {
  .resume-regulatory__group {
    break-inside: avoid;
  }
}
</style>
