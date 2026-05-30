<script setup lang="ts">
/**
 * ResumeCerts - 证书/资质组件
 *
 * 职责: 以列表形式展示证书或资质信息，包括证书名称、颁发机构和年份
 *
 * 数据流向:
 *   - 父组件通过 Props 传入标题和证书数组（Cert[]）
 *   - 纯展示组件，无内部状态，无事件派发
 *
 * 核心业务流程:
 *   - certs 为空数组或 undefined 时整个区块不渲染
 *   - 每条证书显示名称、颁发机构，年份为可选附加信息
 */
import type { Cert } from '@/types/resume';

defineProps<{
  /** 区块标题 */
  title: string;
  /** 证书列表 */
  certs?: Cert[];
}>();
</script>

<template>
  <!-- 证书资质区块 -->
  <section v-if="certs?.length" class="resume-certs">
    <h2 class="resume-certs__title">{{ title }}</h2>
    <!-- 证书循环 -->
    <div v-for="(cert, i) in certs" :key="i" class="resume-certs__item">
      <div class="resume-certs__name">{{ cert.name || '' }}</div>
      <div class="resume-certs__detail">
        {{ cert.issuer || '' }}<template v-if="cert.year"> · {{ cert.year }}</template>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* 区块容器 */
.resume-certs {
  margin-bottom: 24px;

  @media print {
    break-inside: avoid;
  }
}

/* 区块标题 */
.resume-certs__title {
  font-size: 18px;
  color: var(--primary, #2c3e50);
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
  margin-bottom: 12px;

  @media print {
    break-after: avoid;
  }
}

/* 单条证书 */
.resume-certs__item {
  margin-bottom: 10px;
  font-size: 14px;
  color: #444;

  @media print {
    break-inside: avoid;
  }
}

/* 证书名称 */
.resume-certs__name {
  font-weight: 600;
  color: #222;
}

/* 证书详情（颁发机构 · 年份） */
.resume-certs__detail {
  color: #666;
  font-size: 13px;
}
</style>
