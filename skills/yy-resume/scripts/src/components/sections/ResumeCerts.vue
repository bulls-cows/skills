<script setup lang="ts">
/**
 * ResumeCerts - 证书/资质组件
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
  <section v-if="certs?.length" class="resume-section">
    <div class="section-header">
      <div class="section-header__left">{{ title }}</div>
    </div>
    <div v-for="(cert, i) in certs" :key="i" class="cert-item">
      <span class="cert-item__name">{{ cert.name || '' }}</span>
      <span class="cert-item__detail">
        {{ cert.issuer || '' }}<template v-if="cert.year"> · {{ cert.year }}</template>
      </span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use './section-common';

.cert-item {
  font-size: 11pt;
  line-height: 1.8;
  width: 100%;
  margin-top: 3pt;
}

.cert-item__name {
  font-weight: 600;
}

.cert-item__detail {
  font-size: 11pt;
}
</style>
