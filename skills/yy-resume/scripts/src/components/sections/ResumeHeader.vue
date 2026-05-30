<script setup lang="ts">
/**
 * ResumeHeader - 简历头部组件
 *
 * 职责: 展示简历顶部个人信息区，包含姓名、职位头衔、联系方式（城市/电话/邮箱）和社交链接
 *
 * 数据流向:
 *   - 父组件通过 Props 传入个人信息和链接数据
 *   - 纯展示组件，无内部状态，无事件派发
 *
 * 交互关系:
 *   - showLinks 控制链接区块显示/隐藏
 *   - 链接以 <a> 标签渲染，支持在新标签页打开
 */
import type { Link } from '@/types/resume';

defineProps<{
  /** 姓名 */
  name?: string;
  /** 职位头衔 */
  title?: string;
  /** 所在城市 */
  city?: string;
  /** 联系电话 */
  phone?: string;
  /** 电子邮箱 */
  email?: string;
  /** 社交链接列表 */
  links?: Link[];
  /** 是否显示社交链接 */
  showLinks?: boolean;
}>();
</script>

<template>
  <!-- 简历头部：个人信息展示区 -->
  <header class="header">
    <div class="header__name">{{ name || '' }}</div>
    <div class="header__title">{{ title || '' }}</div>
    <!-- 联系方式：城市 | 电话 | 邮箱 -->
    <div class="header__contact">
      <span>{{ city || '' }}</span>
      <span>|</span>
      <span>{{ phone || '' }}</span>
      <span>|</span>
      <span>{{ email || '' }}</span>
    </div>
    <!-- 社交链接列表 -->
    <div v-if="showLinks && links?.length" class="header__links">
      <a v-for="link in links" :key="link.label" :href="link.url" target="_blank">
        {{ link.label }}
      </a>
    </div>
  </header>
</template>

<style lang="scss" scoped>
/* 头部容器 */
.header {
  text-align: center;
  border-bottom: 2px solid var(--primary, #2c3e50);
  padding-bottom: 20px;
  margin-bottom: 20px;
}

/* 姓名 */
.header__name {
  font-size: 32px;
  font-weight: bold;
  color: #222;
  margin-bottom: 8px;
}

/* 职位头衔 */
.header__title {
  font-size: 18px;
  color: var(--primary, #2c3e50);
  margin-bottom: 12px;
}

/* 联系方式 */
.header__contact {
  font-size: 14px;
  color: #666;

  a {
    color: var(--primary, #2c3e50);
    text-decoration: none;
  }

  span {
    margin: 0 8px;
  }
}

/* 社交链接 */
.header__links {
  font-size: 14px;
  margin-top: 8px;

  a {
    color: var(--primary, #2c3e50);
    text-decoration: none;
    margin-right: 16px;
  }
}
</style>
