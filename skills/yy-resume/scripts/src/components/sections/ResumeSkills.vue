<script setup lang="ts">
/**
 * ResumeSkills - 技能列表组件
 *
 * 职责: 按分类展示技能标签列表，每类技能包含分类标题和标签项
 *
 * 数据流向:
 *   - 父组件通过 Props 传入标题和技能分类数组（SkillCategory[]）
 *   - 纯展示组件，无内部状态，无事件派发
 *
 * 核心业务流程:
 *   - skills 为空数组或 undefined 时整个区块不渲染
 *   - 每个分类下以标签形式展示技能项
 */
import type { SkillCategory } from '@/types/resume';

defineProps<{
  /** 区块标题 */
  title: string;
  /** 技能分类列表（含分类名称和技能项） */
  skills?: SkillCategory[];
}>();
</script>

<template>
  <!-- 技能列表区块 -->
  <section v-if="skills?.length" class="resume-skills">
    <h2 class="resume-skills__title">{{ title }}</h2>
    <!-- 技能分类循环 -->
    <div v-for="cat in skills" :key="cat.category" class="resume-skills__category">
      <h3 class="resume-skills__category-title">{{ cat.category }}</h3>
      <!-- 技能标签列表 -->
      <div class="resume-skills__list">
        <span v-for="item in cat.items" :key="item" class="resume-skills__tag">{{ item }}</span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* 区块容器 */
.resume-skills {
  margin-bottom: 24px;

  @media print {
    break-inside: avoid;
  }
}

/* 区块标题 */
.resume-skills__title {
  font-size: 18px;
  color: var(--primary, #2c3e50);
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
  margin-bottom: 12px;

  @media print {
    break-after: avoid;
  }
}

/* 技能分类 */
.resume-skills__category {
  margin-bottom: 12px;

  h3 {
    font-size: 14px;
    font-weight: 600;
    color: #444;
    margin-bottom: 6px;
  }
}

/* 技能标签列表 */
.resume-skills__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    display: inline-block;
    background: var(--tag-bg, #eef1f5);
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 13px;
    color: var(--primary, #2c3e50);
    border: 1px solid var(--tag-border, #d7dde6);
  }
}

@media print {
  .resume-skills__category {
    break-inside: avoid;
  }
}
</style>
