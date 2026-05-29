<script setup lang="ts">
import type { Link } from '@/types/resume'

defineProps<{
  name?: string
  title?: string
  city?: string
  phone?: string
  email?: string
  links?: Link[]
  showLinks?: boolean
}>()
</script>

<template>
  <header class="header">
    <div class="name">{{ name || '' }}</div>
    <div class="title">{{ title || '' }}</div>
    <div class="contact">
      <span>{{ city || '' }}</span>
      <span>|</span>
      <span>{{ phone || '' }}</span>
      <span>|</span>
      <span>{{ email || '' }}</span>
    </div>
    <div v-if="showLinks && links?.length" class="links">
      <a v-for="link in links" :key="link.label" :href="link.url" target="_blank">
        {{ link.label }}
      </a>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  text-align: center;
  border-bottom: 2px solid var(--primary, #2c3e50);
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.name {
  font-size: 32px;
  font-weight: bold;
  color: #222;
  margin-bottom: 8px;
}

.title {
  font-size: 18px;
  color: var(--primary, #2c3e50);
  margin-bottom: 12px;
}

.contact {
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

.links {
  font-size: 14px;
  margin-top: 8px;

  a {
    color: var(--primary, #2c3e50);
    text-decoration: none;
    margin-right: 16px;
  }
}
</style>
